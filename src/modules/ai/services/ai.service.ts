export interface AIChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface AIKnowledgeResult {
  id: string;
  title: string;
  snippet: string;
  source: string;
  associatedCommand?: {
    id: string;
    name: string;
    command: string;
  };
}

export interface AIServiceResponse {
  answer: string;
  sourcesUsed: AIKnowledgeResult[];
  suggestedCommands?: Array<{
    id: string;
    name: string;
    command: string;
  }>;
}

/**
 * Contrato base para proveedores de Inteligencia Artificial (AIService).
 * Desacopla la lógica de negocio de Support Center del proveedor concreto (Gemini, Claude, OpenAI, etc.).
 */
export interface AIService {
  chat(messages: AIChatMessage[]): Promise<string>;
  generate(prompt: string): Promise<string>;
  searchKnowledge(query: string): Promise<AIKnowledgeResult[]>;
  getResponse(query: string, contextKnowledge?: AIKnowledgeResult[]): Promise<AIServiceResponse>;
}
