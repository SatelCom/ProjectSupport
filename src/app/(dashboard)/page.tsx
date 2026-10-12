"use client";

import * as React from "react";
import Link from "next/link";
import {
  Terminal,
  Layers,
  Ticket,
  ClipboardList,
  Bot,
  Copy,
  Check,
  ExternalLink,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const quickStats = [
    { label: "Tickets Pendientes", value: "6", change: "2 alta prioridad", icon: Ticket, color: "text-amber-500 bg-amber-500/10" },
    { label: "Actividades Hoy", value: "24", change: "+8 esta tarde", icon: ClipboardList, color: "text-blue-500 bg-blue-500/10" },
    { label: "Comandos Rápidos", value: "48", change: "Teltonika & Suntech", icon: Terminal, color: "text-emerald-500 bg-emerald-500/10" },
    { label: "Plataformas GPS", value: "7", change: "Todas operativas", icon: Layers, color: "text-purple-500 bg-purple-500/10" },
  ];

  const recentCommands = [
    { id: "cmd-1", name: "CPU Reset (Teltonika)", text: "stlcm stlcm cpureset", category: "Reinicio", model: "FMB920 / FMB120" },
    { id: "cmd-2", name: "Status GPS & Satélites", text: "stlcm stlcm getstatus", category: "Diagnóstico", model: "Universal" },
    { id: "cmd-3", name: "Configurar Servidor APN", text: "stlcm stlcm setparam 2001:claro.pe;2002:claro;2003:claro", category: "Configuración", model: "Claro PE" },
    { id: "cmd-4", name: "Reporte de Batería Interna", text: "stlcm stlcm getver", category: "Hardware", model: "Todos" },
  ];

  const frequentApps = [
    { name: "Wialon Platform", desc: "Plataforma principal de rastreo GPS y monitoreo de flotas", url: "https://hosting.wialon.com", category: "GPS" },
    { name: "SIPCOP PNP", desc: "Plataforma de patrullaje y despacho de la Policía Nacional", url: "https://sipcop.pnp.gob.pe", category: "Operaciones" },
    { name: "Portal GPS Satelcom", desc: "Consola de administración de sims M2M y tramas de red", url: "https://portal.satelcom.pe", category: "M2M" },
  ];

  const pendingTickets = [
    { id: "TK-1042", client: "Transportes San Martín", type: "Mantenimiento", imei: "864201049281723", priority: "ALTA", tech: "Carlos Mendoza" },
    { id: "TK-1045", client: "Minera Aurífera Sur", type: "Pérdida de Señal", imei: "867821034918231", priority: "URGENTE", tech: "Asignación pendiente" },
    { id: "TK-1048", client: "Distribuidora del Norte", type: "Instalación Sensor", imei: "869012384726190", priority: "MEDIA", tech: "Pedro Castillo" },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-border/80 bg-linear-to-r from-card via-card to-muted/40 p-6 shadow-xs">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Satelcom • Monolito Modular
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-1">
            Support Center
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl">
            Centro de control para operaciones técnicas: comandos de reset, plataformas externas, tickets de soporte y bitácora de campo.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button render={<Link href="/tickets" />} size="sm" className="gap-2 cursor-pointer shadow-xs">
            <Ticket className="size-4" />
            <span>Nuevo Ticket</span>
          </Button>
          <Button render={<Link href="/ai" />} variant="outline" size="sm" className="gap-2 cursor-pointer">
            <Bot className="size-4 text-primary" />
            <span>Consultar AI</span>
          </Button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {quickStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card p-4 shadow-2xs transition-all hover:border-sidebar-ring/60 hover:shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">{stat.label}</span>
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <Icon className="size-4" />
                </div>
              </div>
              <div className="mt-3">
                <span className="text-2xl font-bold tracking-tight text-foreground">{stat.value}</span>
                <p className="text-[11px] text-muted-foreground mt-0.5">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sección principal en 2 columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Comandos Rápidos y Frecuentes (2 cols en desktop) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card Comandos Rápidos */}
          <div className="rounded-xl border border-border bg-card shadow-xs">
            <div className="flex items-center justify-between border-b border-border/80 px-5 py-4">
              <div className="flex items-center gap-2">
                <Terminal className="size-4 text-primary" />
                <h2 className="font-semibold text-sm text-foreground">Comandos de Mayor Uso</h2>
              </div>
              <Link href="/commands" className="text-xs text-primary hover:underline flex items-center gap-1 font-medium">
                Ver todos (48) <ArrowRight className="size-3" />
              </Link>
            </div>

            <div className="divide-y divide-border/60">
              {recentCommands.map((cmd) => (
                <div key={cmd.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 hover:bg-muted/30 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-xs sm:text-sm text-foreground">{cmd.name}</span>
                      <span className="text-[10px] font-mono bg-muted px-1.5 py-0.5 rounded text-muted-foreground">
                        {cmd.category}
                      </span>
                    </div>
                    <code className="text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/20 inline-block">
                      {cmd.text}
                    </code>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1.5 text-xs cursor-pointer shrink-0"
                    onClick={() => handleCopy(cmd.id, cmd.text)}
                  >
                    {copiedId === cmd.id ? (
                      <>
                        <Check className="size-3.5 text-emerald-500" />
                        <span className="text-emerald-600">Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5" />
                        <span>Copiar</span>
                      </>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Tickets Pendientes */}
          <div className="rounded-xl border border-border bg-card shadow-xs">
            <div className="flex items-center justify-between border-b border-border/80 px-5 py-4">
              <div className="flex items-center gap-2">
                <Ticket className="size-4 text-amber-500" />
                <h2 className="font-semibold text-sm text-foreground">Tickets Pendientes de Atención</h2>
              </div>
              <Link href="/tickets" className="text-xs text-primary hover:underline flex items-center gap-1 font-medium">
                Gestionar Tickets <ArrowRight className="size-3" />
              </Link>
            </div>

            <div className="divide-y divide-border/60">
              {pendingTickets.map((tk) => (
                <div key={tk.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 hover:bg-muted/30 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-foreground">{tk.id}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        tk.priority === "URGENTE"
                          ? "bg-rose-500/10 text-rose-600 border border-rose-500/20"
                          : tk.priority === "ALTA"
                          ? "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                          : "bg-blue-500/10 text-blue-600 border border-blue-500/20"
                      }`}>
                        {tk.priority}
                      </span>
                      <span className="text-xs text-muted-foreground">{tk.client}</span>
                    </div>
                    <div className="text-[11px] text-muted-foreground flex items-center gap-3">
                      <span>Tipo: <b className="text-foreground font-medium">{tk.type}</b></span>
                      <span>IMEI: <code className="font-mono text-muted-foreground">{tk.imei}</code></span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1 sm:self-center">
                    <Clock className="size-3" />
                    <span>{tk.tech}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Columna derecha: Plataformas Frecuentes & Asistente AI */}
        <div className="space-y-6">
          {/* Plataformas Externas */}
          <div className="rounded-xl border border-border bg-card shadow-xs p-5">
            <div className="flex items-center justify-between pb-3 border-b border-border/80">
              <div className="flex items-center gap-2">
                <Layers className="size-4 text-purple-500" />
                <h2 className="font-semibold text-sm text-foreground">Plataformas GPS</h2>
              </div>
              <Link href="/applications" className="text-xs text-primary hover:underline font-medium">
                Ver todas
              </Link>
            </div>

            <div className="mt-4 space-y-3">
              {frequentApps.map((app) => (
                <div key={app.name} className="rounded-lg border border-border/70 p-3 bg-muted/20 hover:bg-muted/40 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-xs text-foreground">{app.name}</h3>
                    <span className="text-[10px] bg-sidebar-accent px-1.5 py-0.5 rounded text-muted-foreground">
                      {app.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2">
                    {app.desc}
                  </p>
                  <div className="mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full h-7 text-xs gap-1.5 cursor-pointer"
                      onClick={() => window.open(app.url, "_blank")}
                    >
                      <ExternalLink className="size-3" />
                      <span>Acceder a Plataforma</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Banner Card */}
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-5 shadow-xs relative overflow-hidden">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                <Bot className="size-4" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-foreground">AI Knowledge Assistant</h3>
                <span className="text-[11px] text-muted-foreground">Potenciado por Gemini API</span>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
              Consulte procedimientos internos, manuales y resolución de fallas técnicas con respuestas sustentadas en la base de conocimiento oficial.
            </p>
            <div className="mt-4">
              <Button render={<Link href="/ai" />} size="sm" className="w-full text-xs cursor-pointer">
                Abrir Asistente Técnico
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
