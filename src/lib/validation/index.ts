import { z } from "zod";

export const commandSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  username: z.string().optional(),
  password: z.string().optional(),
  command: z.string().min(1, "El comando técnico es obligatorio"),
  description: z.string().optional(),
  categoryId: z.string().optional(),
  deviceType: z.string().optional(),
});

export const ticketSchema = z.object({
  type: z.string().min(1, "El tipo de trabajo es requerido"),
  technicianId: z.string().optional(),
  client: z.string().min(2, "El nombre de cliente es requerido"),
  code: z.string().optional(),
  imei: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).default("MEDIUM"),
  problem: z.string().min(3, "El problema o motivo es requerido"),
  observations: z.string().optional(),
  result: z.string().optional(),
});

export const activityLogSchema = z.object({
  date: z.string().optional(),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Formato de hora HH:mm inválido"),
  type: z.string().min(1, "El tipo de actividad es requerido"),
  client: z.string().min(2, "El cliente es requerido"),
  equipmentCode: z.string().optional(),
  imei: z.string().optional(),
  description: z.string().min(3, "La descripción es requerida"),
  result: z.string().optional(),
  ticketId: z.string().optional(),
});

export const applicationSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  description: z.string().optional(),
  url: z.string().url("Debe ser una URL válida"),
  username: z.string().optional(),
  password: z.string().optional(),
  icon: z.string().optional(),
  categoryId: z.string().optional(),
});
