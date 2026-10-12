"use client";

import * as React from "react";
import {
  FileText,
  Upload,
  Download,
  Eye,
  Search,
  Sparkles,
  HardDrive,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ManualDoc {
  id: string;
  name: string;
  fileName: string;
  driveFileId: string;
  category: string;
  fileSizeFormatted: string;
  uploadedBy: string;
  date: string;
  inKnowledgeBase?: boolean;
}

export default function ManualsPage() {
  const [search, setSearch] = React.useState("");
  const [kbAddedId, setKbAddedId] = React.useState<string | null>(null);

  const manuals: ManualDoc[] = [
    {
      id: "man-1",
      name: "Guía de Instalación y Cableado Teltonika FMB920",
      fileName: "Manual_FMB920_Satelcom_v2.pdf",
      driveFileId: "1AbC89D_GoogleDriveFileId992",
      category: "Hardware GPS",
      fileSizeFormatted: "3.4 MB",
      uploadedBy: "Carlos Mendoza",
      date: "2026-09-15",
      inKnowledgeBase: true,
    },
    {
      id: "man-2",
      name: "Protocolo de Diagnóstico de Pérdida de Señal GPRS",
      fileName: "Protocolo_Falla_GPRS_Satelcom.pdf",
      driveFileId: "1XyZ44R_GoogleDriveFileId441",
      category: "Procedimientos",
      fileSizeFormatted: "1.8 MB",
      uploadedBy: "Ing. Sistemas",
      date: "2026-09-28",
      inKnowledgeBase: false,
    },
    {
      id: "man-3",
      name: "Configuración y Calibración de Sensores de Combustible LLS",
      fileName: "Manual_Sensor_LLS_Omnicomm.pdf",
      driveFileId: "1Omni99_GoogleDriveFileId330",
      category: "Sensores",
      fileSizeFormatted: "5.1 MB",
      uploadedBy: "Pedro Castillo",
      date: "2026-10-02",
      inKnowledgeBase: false,
    },
    {
      id: "man-4",
      name: "Homologación MTC / Reenvío SUTRAN",
      fileName: "Procedimiento_Homologacion_Sutran_2026.pdf",
      driveFileId: "1Sutran_GoogleDriveFileId112",
      category: "Normativa",
      fileSizeFormatted: "2.2 MB",
      uploadedBy: "Jefe de Operaciones",
      date: "2026-10-05",
      inKnowledgeBase: false,
    },
  ];

  const handleAddToKnowledgeBase = (id: string) => {
    setKbAddedId(id);
    setTimeout(() => setKbAddedId(null), 3000);
  };

  const filtered = manuals.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.fileName.toLowerCase().includes(search.toLowerCase()) ||
      m.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <FileText className="size-6 text-primary" />
            Manuales Técnicos & PDFs
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Documentos y esquemas alojados en Google Drive (PostgreSQL almacena únicamente la metadata).
          </p>
        </div>
        <Button size="sm" className="gap-2 cursor-pointer">
          <Upload className="size-4" />
          <span>Subir Nuevo Manual (PDF)</span>
        </Button>
      </div>

      {/* Alerta de arquitectura sobre Google Drive & IA */}
      <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 text-xs text-blue-700 dark:text-blue-300 flex items-start gap-3">
        <HardDrive className="size-5 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">Regla de Almacenamiento & Asistente IA:</span> Los archivos binarios residen en Google Drive para optimizar PostgreSQL. Por arquitectura, un manual NO se indexa a la IA automáticamente; requiere la acción explícita <b className="font-mono text-primary">[Agregar a Knowledge Base]</b>.
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar manuales por título, categoría o archivo..."
          className="pl-9 text-xs"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((doc) => (
          <div
            key={doc.id}
            className="rounded-xl border border-border bg-card p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-lg bg-rose-500/10 text-rose-600 border border-rose-500/20">
                    <FileText className="size-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {doc.category}
                    </span>
                    <h3 className="font-semibold text-sm text-foreground">{doc.name}</h3>
                  </div>
                </div>
              </div>

              {/* Metadata Google Drive */}
              <div className="mt-4 p-3 rounded-lg bg-muted/40 border border-border/60 text-[11px] space-y-1 font-mono text-muted-foreground">
                <div className="flex justify-between">
                  <span>Archivo:</span> <b className="text-foreground">{doc.fileName}</b>
                </div>
                <div className="flex justify-between">
                  <span>Drive ID:</span> <span className="text-primary">{doc.driveFileId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tamaño / Subido por:</span> <span>{doc.fileSizeFormatted} • {doc.uploadedBy}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-border/60 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="text-xs gap-1.5 cursor-pointer">
                  <Eye className="size-3.5" />
                  <span>Visualizar</span>
                </Button>
                <Button size="sm" variant="ghost" className="text-xs gap-1.5 cursor-pointer">
                  <Download className="size-3.5" />
                  <span>Descargar</span>
                </Button>
              </div>

              {/* Acción explícita para Knowledge Base (Regla 16 & 20) */}
              <Button
                size="sm"
                variant={doc.inKnowledgeBase || kbAddedId === doc.id ? "secondary" : "outline"}
                className="text-xs gap-1.5 cursor-pointer"
                onClick={() => handleAddToKnowledgeBase(doc.id)}
              >
                {doc.inKnowledgeBase || kbAddedId === doc.id ? (
                  <>
                    <CheckCircle2 className="size-3.5 text-emerald-500" />
                    <span>En Knowledge Base</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="size-3.5 text-primary" />
                    <span>Agregar a Knowledge Base</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
