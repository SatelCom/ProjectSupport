import { type PermissionCode, DEFAULT_ROLE_PERMISSIONS } from "@/config/permissions";
import type { UserSession } from "@/types";

/**
 * Valida si una sesión de usuario posee un permiso determinado.
 * La comprobación principal se realiza en el servidor.
 */
export function hasPermission(
  user: UserSession | null | undefined,
  requiredPermission: PermissionCode | string
): boolean {
  if (!user) return false;

  // Si tiene permisos explícitos cargados en su sesión
  if (Array.isArray(user.permissions) && user.permissions.includes(requiredPermission)) {
    return true;
  }

  // Fallback con la matriz de roles por defecto
  const rolePermissions = DEFAULT_ROLE_PERMISSIONS[user.role] || [];
  return rolePermissions.includes(requiredPermission as PermissionCode);
}

/**
 * Valida que el usuario tenga el permiso requerido; en caso contrario, arroja un Error de autorización.
 * Útil para Server Actions y Route Handlers.
 */
export function assertPermission(
  user: UserSession | null | undefined,
  requiredPermission: PermissionCode | string
): void {
  if (!user) {
    throw new Error("No autenticado. Inicie sesión para continuar.");
  }

  if (!hasPermission(user, requiredPermission)) {
    throw new Error(`Acceso denegado. Permiso requerido: [${requiredPermission}]`);
  }
}
