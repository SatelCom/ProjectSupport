import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

/**
 * Cliente público de Supabase para operaciones en frontend / sesión
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Cliente administrativo con Service Role (Únicamente en el servidor)
 */
export function getSupabaseAdmin() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY no está configurada en las variables de entorno");
  }
  return createClient(supabaseUrl, serviceRoleKey);
}
