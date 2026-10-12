"use client";

import * as React from "react";
import {
  ClipboardList,
  Copy,
  Check,
  Search,
  Filter,
  Plus,
  Calendar,
  User,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface BitacoraEntry {
  id: string;
  technician: string;
  ticketId?: string;
  date: string;
  time: string;
  type: string;
  client: string;
  equipmentCode: string;
  imei: string;
  description: string;
  result: string;
}

export default function BitacoraPage() {
  const [copiedSummary, setCopiedSummary] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const entries: BitacoraEntry[] = [
    {
      id: "act-1",
      technician: "Carlos Mendoza",
      ticketId: "TK-00125",
      date: "2026-10-12",
      time: "10:45",
      type: "Mantenimiento Correctivo",
      client: "TransMar Express SAC",
      equipmentCode: "TM-204",
      imei: "865412039485721",
      description: "Revisión física del cableado en tracto camión. Fusible de 3A quemado por sobretensión.",
      result: "Fusible reemplazado, porta fusible sellado, equipo reiniciado y reportando tramas en Wialon.",
    },
    {
      id: "act-2",
      technician: "Pedro Castillo",
      ticketId: "TK-00126",
      date: "2026-10-12",
      time: "12:30",
      type: "Calibración Sensores",
      client: "Logística del Pacífico",
      equipmentCode: "LP-881",
      imei: "869912048572019",
      description: "Instalación de varilla de combustible LLS y prueba con 4 cubetas de 20 litros.",
      result: "Tabla de calibración de 8 puntos cargada con éxito en Wialon. Margen de error < 1.5%.",
    },
    {
      id: "act-3",
      technician: "Carlos Mendoza",
      date: "2026-10-12",
      time: "14:10",
      type: "Diagnóstico Remoto",
      client: "Minera Aurífera Sur",
      equipmentCode: "MAS-09",
      imei: "867821034918231",
      description: "Envío de secuencia de diagnóstico Teltonika tras alerta de corte de antena GNSS.",
      result: "Comando cpureset exitoso. Unidad recuperó 14 satélites y reanudó envío a SIPCOP.",
    },
  ];

  const dailySummary = `*📋 RESUMEN DIARIO DE ACTIVIDADES DE SOPORTE - SATELCOM*
*Fecha:* 12 de Octubre de 2026
*Total de Actividades:* 27

• *Mantenimiento Correctivo:* 10
• *Diagnóstico Técnico:* 8
• *Configuración & APN:* 6
• *Otros / Calibración:* 3

*Técnicos de turno:*
- Carlos Mendoza (11)
- Pedro Castillo (9)
- Juan Velarde (7)

_Reporte oficial generado desde Support Center._`;

  const handleCopySummary = () => {
    navigator.clipboard.writeText(dailySummary);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const filteredEntries = entries.filter(
    (e) =>
      e.client.toLowerCase().includes(search.toLowerCase()) ||
      e.equipmentCode.toLowerCase().includes(search.toLowerCase()) ||
      e.technician.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <ClipboardList className="size-6 text-primary" />
            Bitácora Global de Actividades
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Registro unificado de trabajos realizados por el equipo técnico con resumen diario para WhatsApp.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="gap-2 text-xs cursor-pointer"
            onClick={handleCopySummary}
          >
            {copiedSummary ? (
              <>
                <Check className="size-4 text-emerald-500" />
                <span className="text-emerald-600">¡Resumen Copiado!</span>
              </>
            ) : (
              <>
                <Share2 className="size-4" />
                <span>Copiar Resumen Diario</span>
              </>
            )}
          </Button>
          <Button size="sm" className="gap-2 cursor-pointer">
            <Plus className="size-4" />
            <span>Registrar Actividad</span>
          </Button>
        </div>
      </div>

      {/* KPI Resumen Diario (Sección 24) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <span className="text-xs text-muted-foreground">Actividades de Hoy</span>
          <div className="text-2xl font-bold text-foreground mt-1">27</div>
          <span className="text-[11px] text-emerald-600 font-medium">100% registradas</span>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <span className="text-xs text-muted-foreground">Mantenimiento</span>
          <div className="text-2xl font-bold text-blue-600 mt-1">10</div>
          <span className="text-[11px] text-muted-foreground">En taller y ruta</span>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <span className="text-xs text-muted-foreground">Diagnóstico Remoto</span>
          <div className="text-2xl font-bold text-amber-600 mt-1">8</div>
          <span className="text-[11px] text-muted-foreground">Comandos de reset</span>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <span className="text-xs text-muted-foreground">Configuración & Sensores</span>
          <div className="text-2xl font-bold text-purple-600 mt-1">9</div>
          <span className="text-[11px] text-muted-foreground">APN y calibraciones</span>
        </div>
      </div>

      {/* Buscador */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filtrar por técnico, cliente, código, IMEI..."
          className="pl-9 text-xs"
        />
      </div>

      {/* Tabla de Actividades de Bitácora */}
      <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/50 border-b border-border/80 text-muted-foreground font-semibold">
              <tr>
                <th className="py-3 px-4">Hora</th>
                <th className="py-3 px-4">Técnico</th>
                <th className="py-3 px-4">Cliente / Unidad</th>
                <th className="py-3 px-4">Tipo</th>
                <th className="py-3 px-4">Descripción & Resultado</th>
                <th className="py-3 px-4">Ticket</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredEntries.map((item) => (
                <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-medium text-foreground whitespace-nowrap">
                    {item.time}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-foreground whitespace-nowrap">
                    {item.technician}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-foreground">{item.client}</div>
                    <div className="text-[11px] font-mono text-muted-foreground">
                      {item.equipmentCode} • {item.imei}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block bg-muted px-2 py-0.5 rounded text-[11px] font-medium text-foreground">
                      {item.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 max-w-md">
                    <p className="text-foreground">{item.description}</p>
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">
                      <b>Resultado:</b> {item.result}
                    </p>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {item.ticketId ? (
                      <span className="font-mono text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                        #{item.ticketId}
                      </span>
                    ) : (
                      <span className="text-muted-foreground text-[11px]">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
