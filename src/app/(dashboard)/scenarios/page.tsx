"use client";

import * as React from "react";
import { Compass, CheckCircle2, ChevronRight, Layers, Terminal, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScenarioCardItem {
  id: string;
  title: string;
  type: "APPLICATION" | "COMMAND" | "COMBO" | "MANUAL" | "EXTERNAL_LINK";
  desc: string;
  actionText: string;
}

interface Scenario {
  id: string;
  name: string;
  description: string;
  cards: ScenarioCardItem[];
}

export default function ScenariosPage() {
  const scenarios: Scenario[] = [
    {
      id: "sc-1",
      name: "Atención Áreas Priorizadas & Emergencias PNP",
      description: "Recursos concentrados para unidades que patrullan zonas de alta prioridad con alerta de desconexión.",
      cards: [
        { id: "c1", title: "SIPCOP PNP", type: "APPLICATION", desc: "Verificar despacho y última transmisión registrada en la PNP.", actionText: "Abrir SIPCOP" },
        { id: "c2", title: "CPU Reset Teltonika", type: "COMMAND", desc: "Comando de reinicio para forzar enlace GPRS inmediato.", actionText: "Copiar Comando" },
        { id: "c3", title: "Wialon GPS", type: "APPLICATION", desc: "Comprobar retransmisión TCP y satélites en tiempo real.", actionText: "Abrir Wialon" },
        { id: "c4", title: "Manual FMB920 Protocolo de Falla", type: "MANUAL", desc: "Guía paso a paso para descarte de corte de corriente.", actionText: "Ver Manual" },
      ],
    },
    {
      id: "sc-2",
      name: "Instalación y Homologación de Equipo Nuevo en Taller",
      description: "Flujo completo de puesta en marcha para técnicos de laboratorio antes de entrega a campo.",
      cards: [
        { id: "c5", title: "Configurar Servidor y APN", type: "COMMAND", desc: "Envío de cadena de parámetros de red Claro M2M.", actionText: "Copiar Parámetros" },
        { id: "c6", title: "Portal Simcards M2M", type: "APPLICATION", desc: "Comprobar consumo de MB y activación de paquete de datos.", actionText: "Ver Portal" },
        { id: "c7", title: "Combo Diagnóstico Completo", type: "COMBO", desc: "Secuencia de 4 comandos de prueba de sensores y GPS.", actionText: "Copiar Secuencia" },
      ],
    },
  ];

  const [activeScenario, setActiveScenario] = React.useState<Scenario>(scenarios[0]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Compass className="size-6 text-primary" />
          Escenarios de Soporte
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
          Agrupaciones de herramientas, comandos y manuales para resolver incidencias complejas en un solo flujo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Selector de Escenarios */}
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Escenarios Configurables
          </span>
          {scenarios.map((sc) => (
            <button
              key={sc.id}
              onClick={() => setActiveScenario(sc)}
              className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                activeScenario.id === sc.id
                  ? "border-primary bg-primary/5 shadow-xs"
                  : "border-border bg-card hover:bg-muted/30"
              }`}
            >
              <h3 className="font-semibold text-sm text-foreground">{sc.name}</h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {sc.description}
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs text-primary font-medium">
                <span>{sc.cards.length} recursos vinculados</span>
                <ChevronRight className="size-3.5" />
              </div>
            </button>
          ))}
        </div>

        {/* Recursos del Escenario Activo */}
        <div className="md:col-span-2 space-y-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="text-lg font-bold text-foreground">{activeScenario.name}</h2>
            <p className="text-xs text-muted-foreground mt-1">{activeScenario.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activeScenario.cards.map((card) => (
              <div
                key={card.id}
                className="rounded-xl border border-border bg-card p-4 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-muted text-muted-foreground">
                      {card.type}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm text-foreground mt-2">{card.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border/60">
                  <Button size="sm" variant="outline" className="w-full text-xs cursor-pointer">
                    {card.actionText}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
