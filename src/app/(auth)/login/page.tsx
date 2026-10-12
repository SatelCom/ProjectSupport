"use client";

import Link from "next/link";
import { LoginForm } from "@/components/login-form";
import { Headphones, ShieldCheck, Terminal, Layers, Radio } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Columna Izquierda: Formulario de Login */}
      <div className="flex flex-col justify-between p-6 sm:p-10">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs font-bold">
            <Headphones className="size-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-foreground">
              Support Center
            </span>
            <span className="text-[10px] text-muted-foreground font-mono">
              Satelcom • Monolito Modular
            </span>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm">
            <LoginForm />
          </div>
        </div>

        <div className="text-center sm:text-left text-[11px] text-muted-foreground flex items-center justify-center sm:justify-start gap-1.5 border-t border-border/40 pt-4">
          <ShieldCheck className="size-3.5 text-emerald-500 shrink-0" />
          <span>Acceso cifrado con Supabase Auth & Control de Acceso RBAC</span>
        </div>
      </div>

      {/* Columna Derecha: Panel Visual Informativo */}
      <div className="relative hidden lg:flex flex-col justify-between bg-zinc-950 p-12 text-white overflow-hidden border-l border-border/40">
        {/* Glow de fondo */}
        <div className="absolute -top-24 -right-24 size-96 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 size-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
            Satelcom Operations Hub
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Servidores Activos
          </span>
        </div>

        <div className="relative z-10 space-y-6 my-auto max-w-lg">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
              Central de Control & Asistencia Técnica
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Plataforma interna para gestión de comandos de reset, telemetría vehicular, control de plataformas externas y bitácora unificada de soporte.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 backdrop-blur-xs">
              <div className="flex items-center gap-2 text-zinc-200 text-xs font-semibold">
                <Terminal className="size-4 text-emerald-400" />
                <span>Comandos Rápidos</span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-1">
                Concatenación y contraseñas cifradas para Teltonika y Suntech.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 backdrop-blur-xs">
              <div className="flex items-center gap-2 text-zinc-200 text-xs font-semibold">
                <Layers className="size-4 text-blue-400" />
                <span>Plataformas GPS</span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-1">
                Acceso directo a Wialon, SIPCOP PNP y consola M2M.
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-[11px] text-zinc-500 font-mono pt-4 border-t border-zinc-900">
          <span>Versión 1.0.0</span>
          <span>Satelcom Telecomunicaciones</span>
        </div>
      </div>
    </div>
  );
}
