"use client";

import * as React from "react";
import {
  Terminal,
  Layers,
  Copy,
  Check,
  Search,
  Filter,
  Plus,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CommandItem {
  id: string;
  name: string;
  username: string;
  passwordMasked: string;
  command: string;
  description: string;
  category: string;
  deviceType: string;
}

interface ComboItem {
  id: string;
  name: string;
  description: string;
  category: string;
  commands: { order: number; name: string; fullCommand: string }[];
}

export default function CommandsPage() {
  const [search, setSearch] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("ALL");
  const [activeTab, setActiveTab] = React.useState<"commands" | "combos">("commands");
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const commandsList: CommandItem[] = [
    {
      id: "cmd-1",
      name: "CPU Reset (Reinicio Remoto)",
      username: "stlcm",
      passwordMasked: "••••••••",
      command: "cpureset",
      description: "Fuerza un reinicio suave de la CPU del módem Teltonika sin borrar parámetros de memoria.",
      category: "Reinicio",
      deviceType: "Teltonika FMB920 / FMB120",
    },
    {
      id: "cmd-2",
      name: "Get Status & GNSS Info",
      username: "stlcm",
      passwordMasked: "••••••••",
      command: "getstatus",
      description: "Consulta estado de cobertura GSM, satélites conectados, batería y estado del encendido.",
      category: "Diagnóstico",
      deviceType: "Teltonika Universal",
    },
    {
      id: "cmd-3",
      name: "Configurar Servidor GPRS Principal",
      username: "stlcm",
      passwordMasked: "••••••••",
      command: "setparam 2004:185.213.2.14;2005:20185;2006:0",
      description: "Establece la IP de destino de satelcom y el puerto de telemetría TCP.",
      category: "Configuración",
      deviceType: "Teltonika FMB",
    },
    {
      id: "cmd-4",
      name: "Reset Modo Sleep / Ahorro",
      username: "stlcm",
      passwordMasked: "••••••••",
      command: "setparam 10000:0",
      description: "Desactiva modo ultra deep sleep para forzar reporte continuo durante pruebas de taller.",
      category: "Configuración",
      deviceType: "Teltonika FMB920",
    },
    {
      id: "cmd-5",
      name: "Suntech Unit Reset",
      username: "admin",
      passwordMasked: "••••••••",
      command: "ST300CMD;123456;02;Reset",
      description: "Reinicia equipo Suntech ST310U / ST340.",
      category: "Reinicio",
      deviceType: "Suntech ST300 / ST340",
    },
  ];

  const combosList: ComboItem[] = [
    {
      id: "combo-1",
      name: "Secuencia de Diagnóstico Completo Teltonika",
      description: "Verifica versión de firmware, estado de red, satélites y fuerza sincronización con la plataforma.",
      category: "Diagnóstico",
      commands: [
        { order: 1, name: "Consultar Versión", fullCommand: "stlcm stlcm getver" },
        { order: 2, name: "Consultar Estado Satélites", fullCommand: "stlcm stlcm getgps" },
        { order: 3, name: "Consultar Operador y Señal", fullCommand: "stlcm stlcm getops" },
        { order: 4, name: "Sincronizar RTC / Hora", fullCommand: "stlcm stlcm getsync" },
      ],
    },
    {
      id: "combo-2",
      name: "Procedimiento de Cambio de Chip / APN Claro",
      description: "Ajusta APN, usuario y contraseña de datos para chips M2M de Claro Perú.",
      category: "Configuración",
      commands: [
        { order: 1, name: "Set APN Claro", fullCommand: "stlcm stlcm setparam 2001:claro.pe" },
        { order: 2, name: "Set APN User", fullCommand: "stlcm stlcm setparam 2002:claro" },
        { order: 3, name: "Set APN Password", fullCommand: "stlcm stlcm setparam 2003:claro" },
        { order: 4, name: "Reinicio CPU Post-APN", fullCommand: "stlcm stlcm cpureset" },
      ],
    },
  ];

  const categories = ["ALL", "Reinicio", "Diagnóstico", "Configuración"];

  const filteredCommands = commandsList.filter((cmd) => {
    const matchesSearch =
      cmd.name.toLowerCase().includes(search.toLowerCase()) ||
      cmd.command.toLowerCase().includes(search.toLowerCase()) ||
      cmd.deviceType.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === "ALL" || cmd.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyCombo = (combo: ComboItem) => {
    const fullText = combo.commands.map((c) => c.fullCommand).join("\n");
    handleCopy(combo.id, fullText);
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Terminal className="size-6 text-primary" />
            Comandos Técnicos & Combos
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Administración segura de comandos técnicos con contraseñas cifradas y concatenación automática.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={activeTab === "commands" ? "default" : "outline"}
            onClick={() => setActiveTab("commands")}
            className="cursor-pointer"
          >
            Comandos ({commandsList.length})
          </Button>
          <Button
            size="sm"
            variant={activeTab === "combos" ? "default" : "outline"}
            onClick={() => setActiveTab("combos")}
            className="cursor-pointer"
          >
            Combos ({combosList.length})
          </Button>
        </div>
      </div>

      {/* Buscador y Filtros */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre, comando o modelo..."
            className="pl-9 text-xs"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat === "ALL" ? "Todos" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Vista de Comandos */}
      {activeTab === "commands" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCommands.map((cmd) => {
            const compiledCommand = `${cmd.username} stlcm ${cmd.command}`;
            return (
              <div
                key={cmd.id}
                className="rounded-xl border border-border bg-card p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                        {cmd.deviceType}
                      </span>
                      <h3 className="font-semibold text-sm text-foreground mt-0.5">
                        {cmd.name}
                      </h3>
                    </div>
                    <span className="text-[11px] font-medium bg-muted px-2 py-0.5 rounded text-muted-foreground">
                      {cmd.category}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    {cmd.description}
                  </p>

                  {/* Detalle de credenciales y comando */}
                  <div className="mt-4 rounded-lg bg-muted/30 border border-border/60 p-3 space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-muted-foreground">
                      <div>
                        Usuario: <span className="font-mono text-foreground font-medium">{cmd.username}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Lock className="size-3 text-muted-foreground" />
                        Clave: <span className="font-mono text-foreground font-medium">{cmd.passwordMasked}</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-border/40">
                      <div className="text-[10px] text-muted-foreground uppercase font-semibold mb-1">
                        Comando Construido (Listo para envío):
                      </div>
                      <code className="text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded block overflow-x-auto">
                        {compiledCommand}
                      </code>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-end">
                  <Button
                    size="sm"
                    className="gap-1.5 text-xs cursor-pointer w-full sm:w-auto"
                    onClick={() => handleCopy(cmd.id, compiledCommand)}
                  >
                    {copiedId === cmd.id ? (
                      <>
                        <Check className="size-3.5 text-emerald-500" />
                        <span>¡Comando Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5" />
                        <span>Copiar Comando</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Vista de Combos */}
      {activeTab === "combos" && (
        <div className="space-y-4">
          {combosList.map((combo) => (
            <div
              key={combo.id}
              className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-base text-foreground">{combo.name}</h3>
                    <span className="text-[11px] font-medium bg-primary/10 text-primary px-2 py-0.5 rounded">
                      {combo.category}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {combo.description}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5 text-xs cursor-pointer shrink-0"
                  onClick={() => handleCopyCombo(combo)}
                >
                  {copiedId === combo.id ? (
                    <>
                      <Check className="size-3.5 text-emerald-500" />
                      <span>¡Secuencia Copiada!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      <span>Copiar Todos los Comandos</span>
                    </>
                  )}
                </Button>
              </div>

              {/* Lista secuencial de comandos del combo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {combo.commands.map((cmd) => (
                  <div
                    key={cmd.order}
                    className="flex items-center justify-between gap-3 p-3 rounded-lg bg-muted/40 border border-border/60 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="size-5 rounded-full bg-primary/20 text-primary text-[10px] font-bold flex items-center justify-center shrink-0">
                        {cmd.order}
                      </span>
                      <div>
                        <div className="font-medium text-foreground">{cmd.name}</div>
                        <code className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                          {cmd.fullCommand}
                        </code>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="size-7 p-0 cursor-pointer"
                      onClick={() => handleCopy(`${combo.id}-${cmd.order}`, cmd.fullCommand)}
                    >
                      {copiedId === `${combo.id}-${cmd.order}` ? (
                        <Check className="size-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="size-3.5 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
