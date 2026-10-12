"use client";

import * as React from "react";
import {
  Bot,
  Send,
  Terminal,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sourceUsed?: string;
  suggestedCommand?: {
    name: string;
    command: string;
  };
}

export default function AIAssistantPage() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: "msg-1",
      role: "assistant",
      content:
        "Hola, soy el Asistente Técnico de Support Center. Mis respuestas se basan estrictamente en la base de conocimiento oficial y los comandos técnicos registrados en el sistema.",
    },
  ]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [copiedCmd, setCopiedCmd] = React.useState<string | null>(null);

  const samplePrompts = [
    "¿Cómo reseteo un GPS Teltonika que no transmite?",
    "¿Qué comando uso para consultar los satélites visibles?",
    "¿Cuál es el procedimiento ante pérdida de señal en SIPCOP?",
  ];

  const handleSend = async (queryText?: string) => {
    const text = queryText || input;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Simula consulta al AIService (GeminiService) respetando la base de conocimiento interna
    setTimeout(() => {
      let botResponse: ChatMessage;

      const lower = text.toLowerCase();
      if (lower.includes("reset") || lower.includes("reiniciar") || lower.includes("teltonika")) {
        botResponse = {
          id: `bot-${Date.now()}`,
          role: "assistant",
          content:
            "Para forzar un reinicio del módem GPS Teltonika sin borrar los parámetros en memoria flash, se utiliza el comando de CPU Reset. Este procedimiento obliga al equipo a reiniciar el stack de comunicación GPRS.",
          sourceUsed: "Manual de Procedimientos Técnicos Satelcom v2",
          suggestedCommand: {
            name: "CPU Reset Teltonika",
            command: "stlcm stlcm cpureset",
          },
        };
      } else if (lower.includes("satélite") || lower.includes("satelite") || lower.includes("cobertura") || lower.includes("status")) {
        botResponse = {
          id: `bot-${Date.now()}`,
          role: "assistant",
          content:
            "El estado de cobertura de satélites GNSS y potencia de señal GSM se verifica mediante el comando getstatus. Devolverá el conteo de satélites en vista y la calidad HDOP.",
          sourceUsed: "Guía Rápida de Diagnóstico de Campo",
          suggestedCommand: {
            name: "Check GNSS & GSM Status",
            command: "stlcm stlcm getstatus",
          },
        };
      } else {
        botResponse = {
          id: `bot-${Date.now()}`,
          role: "assistant",
          content:
            "He consultado la base de conocimiento interna. Para esa situación específica se recomienda verificar la alimentación directa del equipo o consultar la sección de Manuales técnicos.",
          sourceUsed: "Base de Conocimiento Satelcom",
        };
      }

      setMessages((prev) => [...prev, botResponse]);
      setLoading(false);
    }, 900);
  };

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Bot className="size-6 text-primary" />
            AI Assistant & Knowledge Base
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Asistente basado en Gemini API y sustentado en información técnica verificada.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
          <Sparkles className="size-3.5" />
          <span>Knowledge Grounding Activo</span>
        </div>
      </div>

      {/* Alerta de regla arquitectónica */}
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3.5 text-xs text-amber-700 dark:text-amber-300 flex items-start gap-2.5">
        <AlertCircle className="size-4 shrink-0 mt-0.5" />
        <span>
          <b>Regla de Conocimiento (Secciones 21 y 22):</b> La IA no inventa comandos ni configuraciones. Toda sugerencia proviene exclusivamente de la base de datos de Commands y de la Knowledge Base interna.
        </span>
      </div>

      {/* Contenedor del Chat */}
      <div className="rounded-xl border border-border bg-card shadow-xs flex flex-col h-[520px]">
        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-2xl ${
                msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              <div
                className={`size-8 rounded-lg flex items-center justify-center shrink-0 ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground font-semibold text-xs"
                    : "bg-sidebar-accent text-primary"
                }`}
              >
                {msg.role === "user" ? "Tú" : <Bot className="size-4" />}
              </div>

              <div
                className={`rounded-xl p-4 text-xs leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/40 border border-border/80 text-foreground"
                }`}
              >
                <p>{msg.content}</p>

                {/* Fuente Oficial Utilizada */}
                {msg.sourceUsed && (
                  <div className="mt-3 pt-2 border-t border-border/60 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <BookOpen className="size-3 text-primary" />
                    <span>Fuente: <b>{msg.sourceUsed}</b></span>
                  </div>
                )}

                {/* Comando Verificado Sugerido (Regla 22) */}
                {msg.suggestedCommand && (
                  <div className="mt-3 rounded-lg bg-card border border-emerald-500/30 p-3 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        Comando verificado en PostgreSQL:
                      </span>
                      <span className="text-muted-foreground">{msg.suggestedCommand.name}</span>
                    </div>
                    <code className="text-xs font-mono bg-muted/60 text-foreground px-2 py-1 rounded block">
                      {msg.suggestedCommand.command}
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full text-xs gap-1.5 cursor-pointer h-7"
                      onClick={() => handleCopy(msg.suggestedCommand!.command)}
                    >
                      {copiedCmd === msg.suggestedCommand.command ? (
                        <>
                          <Check className="size-3 text-emerald-500" />
                          <span className="text-emerald-600">¡Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="size-3" />
                          <span>Copiar Comando Verificado</span>
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Bot className="size-4 animate-spin text-primary" />
              <span>Consultando Knowledge Base y procesando...</span>
            </div>
          )}
        </div>

        {/* Sugerencias Rápidas */}
        <div className="px-4 py-2 border-t border-border/60 bg-muted/20 flex flex-wrap gap-2">
          {samplePrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              className="text-[11px] rounded-full border border-border bg-card px-2.5 py-1 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <div className="p-3 border-t border-border/80 flex items-center gap-2 bg-card">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Escriba su consulta técnica sobre procedimientos o comandos..."
            className="text-xs"
          />
          <Button
            size="sm"
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            className="cursor-pointer gap-1.5"
          >
            <Send className="size-3.5" />
            <span>Enviar</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
