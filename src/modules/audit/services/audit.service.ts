export interface AuditLogInput {
  userId: string;
  action: string;
  entity: string;
  entityId?: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
}

export class AuditService {
  /**
   * Limpia datos sensibles para evitar registrar contraseñas, secretos o API keys en los logs.
   * Regla 28: "No almacenar secretos ni credenciales en los logs."
   */
  static sanitizeDetails(details?: Record<string, unknown>): string | undefined {
    if (!details) return undefined;
    const sanitized = { ...details };
    const forbiddenKeys = ["password", "encryptedPassword", "token", "secret", "apiKey"];

    for (const key of Object.keys(sanitized)) {
      if (forbiddenKeys.some((k) => key.toLowerCase().includes(k))) {
        sanitized[key] = "[REDACTED]";
      }
    }

    return JSON.stringify(sanitized);
  }
}
