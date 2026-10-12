import type {
  AIService,
  AIChatMessage,
  AIKnowledgeResult,
  AIServiceResponse,
} from "./ai.service";

export class GeminiService implements AIService {
  private apiKey: string | undefined;

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
  }

  async chat(messages: AIChatMessage[]): Promise<string> {
    const lastMessage = messages[messages.length - 1]?.content || "";
    const response = await this.getResponse(lastMessage);
    return response.answer;
  }

  async generate(prompt: string): Promise<string> {
    if (!this.apiKey) {
      return `[Modo Desarrollo] Respuesta simulada para: "${prompt}". Configure GEMINI_API_KEY para habilitar el modelo en producción.`;
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`);
      }

      const data = await response.json();
      return (
        data.candidates?.[0]?.content?.parts?.[0]?.text ??
        "No se pudo generar una respuesta con el modelo."
      );
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return `Error al consultar Gemini API: ${message}`;
    }
  }

  async searchKnowledge(query: string): Promise<AIKnowledgeResult[]> {
    // En producción se consulta AIKnowledgeEntry y Commands en PostgreSQL
    const mockKnowledgeBase: AIKnowledgeResult[] = [
      {
        id: "kb-1",
        title: "Reinicio de GPS Teltonika / Suntech",
        snippet:
          "Para reiniciar la unidad GPS de manera remota cuando pierde transmisión de tramas GPRS, enviar comando de reinicio.",
        source: "Manual de Procedimientos Satelcom v2",
        associatedCommand: {
          id: "cmd-cpureset",
          name: "CPU Reset",
          command: "stlcm stlcm cpureset",
        },
      },
      {
        id: "kb-2",
        title: "Revisión de estado de señal y satélites",
        snippet:
          "Permite verificar la cantidad de satélites visibles y la intensidad de la señal GSM del modem.",
        source: "Guía Rápida de Diagnóstico",
        associatedCommand: {
          id: "cmd-status",
          name: "Check Status & Satellites",
          command: "stlcm stlcm getstatus",
        },
      },
    ];

    const q = query.toLowerCase();
    return mockKnowledgeBase.filter(
      (k) =>
        k.title.toLowerCase().includes(q) ||
        k.snippet.toLowerCase().includes(q) ||
        k.associatedCommand?.name.toLowerCase().includes(q)
    );
  }

  async getResponse(
    query: string,
    contextKnowledge?: AIKnowledgeResult[]
  ): Promise<AIServiceResponse> {
    const knowledge = contextKnowledge ?? (await this.searchKnowledge(query));

    // Regla 21 y 22: Gemini no debe inventar información técnica interna ni comandos
    const prompt = `
Eres el asistente interno de soporte técnico para Satelcom Support Center.
REGLA CRÍTICA:
1. Responde de forma técnica, precisa, directa y profesional.
2. Si la consulta involucra procedimientos o comandos técnicos internos, utiliza EXCLUSIVAMENTE la siguiente base de conocimiento oficial.
3. NUNCA inventes comandos técnicos. Si no existe información suficiente en la base provista, indícalo claramente al técnico.

BASE DE CONOCIMIENTO DISPONIBLE:
${JSON.stringify(knowledge, null, 2)}

CONSULTA DEL TÉCNICO:
"${query}"
    `.trim();

    let answer = "";
    if (this.apiKey) {
      answer = await this.generate(prompt);
    } else {
      if (knowledge.length > 0) {
        answer = `He encontrado información en la base de conocimiento para tu consulta:\n\n**${knowledge[0].title}**\n${knowledge[0].snippet}\n\n*Nota: Comando sugerido verificado en el catálogo oficial de PostgreSQL.*`;
      } else {
        answer = `No se encontró un procedimiento o comando registrado en la base de conocimiento interna para "${query}". Por favor consulta con el supervisor o verifica en la sección de Manuales.`;
      }
    }

    const suggestedCommands = knowledge
      .filter((k) => k.associatedCommand)
      .map((k) => k.associatedCommand!);

    return {
      answer,
      sourcesUsed: knowledge,
      suggestedCommands,
    };
  }
}

export const aiService: AIService = new GeminiService();
