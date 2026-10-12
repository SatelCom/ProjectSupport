"use client";

import * as React from "react";
import {
  ExternalLink,
  Copy,
  Check,
  Terminal,
  Layers,
  Compass,
  FileText,
  Bookmark,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ResourceCardProps, ResourceCardType } from "@/types";

const TYPE_ICONS: Record<ResourceCardType, LucideIcon> = {
  APPLICATION: Layers,
  COMMAND: Terminal,
  COMBO: Layers,
  SCENARIO: Compass,
  MANUAL: FileText,
  MODULE: Shield,
  EXTERNAL_LINK: ExternalLink,
};

const TYPE_BADGES: Record<ResourceCardType, { label: string; className: string }> = {
  APPLICATION: { label: "Aplicación", className: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
  COMMAND: { label: "Comando", className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
  COMBO: { label: "Combo", className: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20" },
  SCENARIO: { label: "Escenario", className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
  MANUAL: { label: "Manual PDF", className: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20" },
  MODULE: { label: "Módulo", className: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20" },
  EXTERNAL_LINK: { label: "Enlace", className: "bg-neutral-500/10 text-neutral-600 dark:text-neutral-400 border-neutral-500/20" },
};

export function ResourceCard({
  title,
  description,
  type,
  actionLabel,
  onAction,
  status = "ACTIVE",
  badge,
  category,
  metadata,
}: ResourceCardProps) {
  const [copied, setCopied] = React.useState(false);
  const IconComponent = TYPE_ICONS[type] || Terminal;
  const typeConfig = TYPE_BADGES[type];

  const handleCopyOrAction = () => {
    if (onAction) {
      onAction();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-xs transition-all duration-200 hover:border-sidebar-ring hover:shadow-md">
      <div>
        {/* Header con Icono y Categoría */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-sidebar-accent text-sidebar-accent-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
              <IconComponent className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium ${typeConfig.className}`}>
                  {badge || typeConfig.label}
                </span>
                {category && (
                  <span className="text-xs text-muted-foreground">
                    {category}
                  </span>
                )}
              </div>
              <h3 className="mt-1 font-semibold text-foreground tracking-tight line-clamp-1">
                {title}
              </h3>
            </div>
          </div>
          {status === "INACTIVE" && (
            <span className="text-[10px] uppercase font-bold text-muted-foreground border rounded px-1.5 py-0.5">
              Inactivo
            </span>
          )}
        </div>

        {/* Descripción */}
        {description && (
          <p className="mt-3 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}

        {/* Metadata opcional */}
        {metadata && Object.keys(metadata).length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 pt-3 border-t border-border/60">
            {Object.entries(metadata).map(([key, val]) => (
              val ? (
                <div key={key} className="text-[11px] bg-muted/60 px-2 py-0.5 rounded font-mono text-muted-foreground">
                  <span className="font-semibold text-foreground/80">{key}:</span> {val}
                </div>
              ) : null
            ))}
          </div>
        )}
      </div>

      {/* Acción inferior */}
      <div className="mt-5 flex items-center justify-between pt-2">
        <Button
          size="sm"
          variant={type === "APPLICATION" ? "default" : "outline"}
          className="w-full gap-2 text-xs font-medium cursor-pointer"
          onClick={handleCopyOrAction}
        >
          {copied ? (
            <>
              <Check className="size-3.5 text-emerald-500" />
              <span>Copiado</span>
            </>
          ) : type === "APPLICATION" || type === "EXTERNAL_LINK" ? (
            <>
              <ExternalLink className="size-3.5" />
              <span>{actionLabel || "Acceder"}</span>
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
              <span>{actionLabel || "Copiar"}</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
