"use client";

import * as React from "react";
import {
  Ticket as TicketIcon,
  Plus,
  Copy,
  Check,
  Search,
  MessageSquare,
  Clock,
  ArrowRight,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TicketItem {
  id: string;
  type: string;
  client: string;
  code: string;
  imei: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  status: "PENDING" | "ASSIGNED" | "IN_PROGRESS" | "RESOLVED" | "CANCELLED";
  problem: string;
  observations: string;
  technician: string;
  createdAt: string;
}

export default function TicketsPage() {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = React.useState<TicketItem | null>(null);

  const tickets: TicketItem[] = [
    {
      id: "TK-00125",
      type: "Mantenimiento Correctivo",
      client: "TransMar Express SAC",
      code: "TM-204",
      imei: "865412039485721",
      priority: "HIGH",
      status: "IN_PROGRESS",
      problem: "Unidad no reporta ignición desde hace 48 horas.",
      observations: "Revisar fusible de línea y cable amarillo de ignición ACC.",
      technician: "Carlos Mendoza",
      createdAt: "2026-10-12 09:30",
    },
    {
      id: "TK-00126",
      type: "Instalación Sensor Combustible",
      client: "Logística del Pacífico",
      code: "LP-881",
      imei: "869912048572019",
      priority: "MEDIUM",
      status: "ASSIGNED",
      problem: "Calibración de varilla Omnicomm en tanque de 80 galones.",
      observations: "Llevar probeta graduada de 20 litros.",
      technician: "Pedro Castillo",
      createdAt: "2026-10-12 11:15",
    },
    {
      id: "TK-00127",
      type: "Pérdida de Señal GPS",
      client: "Consorcio Vial Andino",
      code: "CVA-10",
      imei: "867721094857102",
      priority: "URGENT",
      status: "PENDING",
      problem: "Unidad detenida en ruta sin tramas GPRS.",
      observations: "Se envió CPU Reset por SMS, no hubo respuesta del modem.",
      technician: "Por Asignar",
      createdAt: "2026-10-12 14:00",
    },
  ];

  // Plantilla oficial configurada para WhatsApp (Sección 19)
  const generateWhatsAppMessage = (tk: TicketItem) => {
    return `*🔔 ASIGNACIÓN DE SOPORTE TÉCNICO - SATELCOM*
*Ticket:* #${tk.id}
*Prioridad:* ${tk.priority}
*Técnico Asignado:* ${tk.technician}
*Cliente:* ${tk.client}
*Código Unidad:* ${tk.code}
*IMEI GPS:* ${tk.imei}
*Tipo de Trabajo:* ${tk.type}
*Motivo/Problema:* ${tk.problem}
*Observaciones:* ${tk.observations}
_Por favor confirmar recepción y registrar avance en Bitácora._`;
  };

  const handleCopyWhatsApp = (tk: TicketItem) => {
    const text = generateWhatsAppMessage(tk);
    navigator.clipboard.writeText(text);
    setCopiedId(tk.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <TicketIcon className="size-6 text-primary" />
            Tickets de Soporte Técnico
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Asignaciones de trabajo de campo con generador automático de plantilla para WhatsApp.
          </p>
        </div>
        <Button size="sm" className="gap-2 cursor-pointer">
          <Plus className="size-4" />
          <span>Crear Ticket</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de Tickets */}
        <div className="lg:col-span-2 space-y-4">
          {tickets.map((tk) => {
            const isSelected = selectedTicket?.id === tk.id;
            return (
              <div
                key={tk.id}
                onClick={() => setSelectedTicket(tk)}
                className={`rounded-xl border p-5 transition-all cursor-pointer ${
                  isSelected
                    ? "border-primary bg-primary/5 shadow-xs"
                    : "border-border bg-card hover:bg-muted/20"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono font-bold text-sm text-foreground">{tk.id}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        tk.priority === "URGENT"
                          ? "bg-rose-500/10 text-rose-600 border-rose-500/20"
                          : tk.priority === "HIGH"
                          ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
                          : "bg-blue-500/10 text-blue-600 border-blue-500/20"
                      }`}
                    >
                      {tk.priority}
                    </span>
                    <span className="text-xs font-medium text-foreground bg-muted px-2 py-0.5 rounded">
                      {tk.status}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">{tk.createdAt}</span>
                </div>

                <div className="mt-3 space-y-1">
                  <h3 className="font-semibold text-sm text-foreground">{tk.client} — {tk.code}</h3>
                  <p className="text-xs text-muted-foreground">
                    <b className="text-foreground">Motivo:</b> {tk.problem}
                  </p>
                  <div className="flex flex-wrap gap-4 text-[11px] text-muted-foreground pt-1">
                    <span>IMEI: <code className="font-mono text-foreground">{tk.imei}</code></span>
                    <span>Técnico: <b className="text-foreground">{tk.technician}</b></span>
                    <span>Trabajo: {tk.type}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {tk.observations}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1.5 text-xs cursor-pointer shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyWhatsApp(tk);
                    }}
                  >
                    {copiedId === tk.id ? (
                      <>
                        <Check className="size-3.5 text-emerald-500" />
                        <span className="text-emerald-600">¡Mensaje Copiado!</span>
                      </>
                    ) : (
                      <>
                        <MessageSquare className="size-3.5 text-emerald-600" />
                        <span>Copiar para WhatsApp</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Generador y Previsualización de Mensaje (Sección 19) */}
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5 shadow-xs sticky top-20">
            <div className="flex items-center gap-2 pb-3 border-b border-border/80">
              <MessageSquare className="size-4 text-emerald-600" />
              <h2 className="font-semibold text-sm text-foreground">
                Plantilla WhatsApp Generada
              </h2>
            </div>

            {selectedTicket ? (
              <div className="mt-4 space-y-4">
                <div className="rounded-lg bg-emerald-950/10 border border-emerald-500/20 p-4 font-mono text-xs whitespace-pre-line text-foreground/90 leading-relaxed">
                  {generateWhatsAppMessage(selectedTicket)}
                </div>

                <Button
                  className="w-full gap-2 text-xs bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                  onClick={() => handleCopyWhatsApp(selectedTicket)}
                >
                  {copiedId === selectedTicket.id ? (
                    <>
                      <Check className="size-4" />
                      <span>¡Copiado al Portapapeles!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-4" />
                      <span>Copiar Formato WhatsApp</span>
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-muted-foreground">
                Seleccione un ticket a la izquierda para previsualizar el mensaje formateado con las variables correspondientes.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
