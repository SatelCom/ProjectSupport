"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Lock, Mail, ShieldAlert, ArrowRight, CheckCircle2 } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const [email, setEmail] = React.useState("carlos.mendoza@satelcom.pe");
  const [password, setPassword] = React.useState("••••••••••••");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // En producción se ejecuta supabase.auth.signInWithPassword({ email, password })
    setTimeout(() => {
      setLoading(false);
      router.push("/");
    }, 800);
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1.5 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Acceso a Support Center
          </h1>
          <p className="text-xs text-balance text-muted-foreground leading-relaxed">
            Ingresa con tu correo institucional y contraseña de soporte técnico.
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="email" className="text-xs font-semibold">
            Correo Institucional
          </FieldLabel>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <Input
              id="email"
              type="email"
              placeholder="tecnico@satelcom.pe"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-9 text-xs"
              required
            />
          </div>
        </Field>

        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="password" className="text-xs font-semibold">
              Contraseña
            </FieldLabel>
            <span className="text-[11px] text-muted-foreground cursor-pointer hover:underline">
              ¿Olvidaste tu contraseña?
            </span>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-9 text-xs font-mono"
              required
            />
          </div>
        </Field>

        <Field>
          <Button
            type="submit"
            className="w-full gap-2 cursor-pointer text-xs font-semibold"
            disabled={loading}
          >
            <span>{loading ? "Verificando Credenciales..." : "Ingresar al Panel"}</span>
            <ArrowRight className="size-4" />
          </Button>
        </Field>

        {/* Notificación informativa: Cuentas creadas exclusivamente desde el módulo de usuarios */}
        <div className="rounded-lg border border-border/80 bg-muted/40 p-3.5 text-center text-xs space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-foreground font-medium">
            <ShieldAlert className="size-3.5 text-amber-500" />
            <span>Registro público deshabilitado</span>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Las cuentas son creadas y gestionadas exclusivamente por jefatura desde el <b>Módulo de Administración de Usuarios</b>.
          </p>
        </div>
      </FieldGroup>
    </form>
  );
}
