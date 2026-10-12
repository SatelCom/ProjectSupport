export const APP_CONFIG = {
  name: "Support Center",
  company: "Satelcom",
  version: "1.0.0",
  description: "Plataforma web interna para centralizar las herramientas del equipo de soporte técnico.",
} as const;

export const TICKET_PRIORITIES = [
  { value: "LOW", label: "Baja", color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
  { value: "MEDIUM", label: "Media", color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  { value: "HIGH", label: "Alta", color: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
  { value: "URGENT", label: "Urgente", color: "bg-rose-500/10 text-rose-600 border-rose-500/20" },
] as const;

export const TICKET_STATUSES = [
  { value: "PENDING", label: "Pendiente" },
  { value: "ASSIGNED", label: "Asignado" },
  { value: "IN_PROGRESS", label: "En Progreso" },
  { value: "RESOLVED", label: "Resuelto" },
  { value: "ESCALATED", label: "Escalado" },
  { value: "CANCELLED", label: "Cancelado" },
] as const;

export const ACTIVITY_TYPES = [
  "Mantenimiento Preventivo",
  "Mantenimiento Correctivo",
  "Diagnóstico Técnico",
  "Configuración de Equipo",
  "Instalación GPS",
  "Revisión de Señal",
  "Actualización Firmware",
  "Otro",
] as const;
