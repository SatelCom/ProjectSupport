"use client";

import * as React from "react";
import {
  FileSpreadsheet,
  Download,
  Plus,
  Settings,
  CheckCircle2,
  Calendar,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReportField {
  fieldName: string;
  label: string;
  type: string;
  order: number;
  visible: boolean;
}

interface ReportConfig {
  id: string;
  name: string;
  description: string;
  fields: ReportField[];
  lastGenerated?: string;
}

export default function ReportsPage() {
  const configs: ReportConfig[] = [
    {
      id: "rep-1",
      name: "Backup General de Flota & Equipos GPS",
      description: "Listado completo de unidades activas, códigos, IMEI, modelo instalado y técnico responsable.",
      lastGenerated: "2026-10-12 08:00",
      fields: [
        { fieldName: "clientName", label: "Nombre Cliente", type: "TEXT", order: 1, visible: true },
        { fieldName: "plateOrCode", label: "Código Unidad", type: "TEXT", order: 2, visible: true },
        { fieldName: "imei", label: "IMEI Modem", type: "TEXT", order: 3, visible: true },
        { fieldName: "model", label: "Modelo GPS", type: "SELECT", order: 4, visible: true },
        { fieldName: "simNumber", label: "Número SIM", type: "TEXT", order: 5, visible: true },
        { fieldName: "technician", label: "Técnico Instalador", type: "TEXT", order: 6, visible: true },
        { fieldName: "installDate", label: "Fecha Instalación", type: "DATE", order: 7, visible: true },
      ],
    },
    {
      id: "rep-2",
      name: "Reporte Mensual de Bitácora e Incidencias",
      description: "Consolidado de mantenimientos correctivos y diagnósticos realizados en campo.",
      lastGenerated: "2026-10-01 18:30",
      fields: [
        { fieldName: "date", label: "Fecha", type: "DATE", order: 1, visible: true },
        { fieldName: "technician", label: "Técnico", type: "TEXT", order: 2, visible: true },
        { fieldName: "client", label: "Cliente", type: "TEXT", order: 3, visible: true },
        { fieldName: "type", label: "Tipo Trabajo", type: "SELECT", order: 4, visible: true },
        { fieldName: "result", label: "Resultado Técnico", type: "TEXT", order: 5, visible: true },
      ],
    },
  ];

  const [activeConfig, setActiveConfig] = React.useState<ReportConfig>(configs[0]);
  const [downloading, setDownloading] = React.useState(false);

  const handleExportExcel = () => {
    setDownloading(true);
    // Simula exportación xlsx con formato solicitado en Sección 30
    setTimeout(() => {
      setDownloading(false);
      alert(`Reporte descargado exitosamente: ${activeConfig.name.replace(/\s+/g, "_")}_2026-10-12.xlsx`);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <FileSpreadsheet className="size-6 text-primary" />
            Report Builder (Exportador Excel XLSX)
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Configuraciones reutilizables de reportes con orden de columnas y filtros nativos.
          </p>
        </div>
        <Button size="sm" className="gap-2 cursor-pointer">
          <Plus className="size-4" />
          <span>Nueva Configuración</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Selector de plantilla de reporte */}
        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Plantillas Guardadas
          </span>
          {configs.map((cfg) => (
            <div
              key={cfg.id}
              onClick={() => setActiveConfig(cfg)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                activeConfig.id === cfg.id
                  ? "border-primary bg-primary/5 shadow-xs"
                  : "border-border bg-card hover:bg-muted/20"
              }`}
            >
              <h3 className="font-semibold text-sm text-foreground">{cfg.name}</h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {cfg.description}
              </p>
              <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground pt-2 border-t border-border/40">
                <span>{cfg.fields.length} columnas configuradas</span>
                <span>Último: {cfg.lastGenerated}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Panel de Columnas y Generación */}
        <div className="md:col-span-2 space-y-4">
          <div className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/80">
              <div>
                <h2 className="font-semibold text-base text-foreground">{activeConfig.name}</h2>
                <p className="text-xs text-muted-foreground mt-0.5">{activeConfig.description}</p>
              </div>
              <Button
                size="sm"
                className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shrink-0"
                onClick={handleExportExcel}
                disabled={downloading}
              >
                <Download className="size-4" />
                <span>{downloading ? "Generando XLSX..." : "Exportar Excel (.xlsx)"}</span>
              </Button>
            </div>

            {/* Configuración de Columnas Activas */}
            <div>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Estructura y Orden de Columnas (.xlsx)
              </span>
              <div className="mt-3 divide-y divide-border/60 border rounded-lg overflow-hidden">
                {activeConfig.fields.map((field) => (
                  <div
                    key={field.fieldName}
                    className="flex items-center justify-between p-3 bg-muted/20 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="size-5 rounded bg-muted flex items-center justify-center font-mono font-bold text-[11px] text-muted-foreground">
                        {field.order}
                      </span>
                      <div>
                        <div className="font-medium text-foreground">{field.label}</div>
                        <code className="text-[10px] text-muted-foreground">{field.fieldName}</code>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-mono bg-muted px-2 py-0.5 rounded text-muted-foreground">
                        {field.type}
                      </span>
                      <span className="text-emerald-600 text-xs flex items-center gap-1 font-medium">
                        <CheckCircle2 className="size-3.5" /> Visible
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
