import { decryptSensitiveData } from "@/lib/encryption/crypto";

export interface CommandPayload {
  id: string;
  name: string;
  username?: string | null;
  encryptedPassword?: string | null;
  command: string;
  deviceType?: string | null;
}

export class CommandService {
  /**
   * Construye el comando final para el técnico.
   * Regla 8: "Resultado: stlcm stlcm cpureset"
   * El sistema debe construir el comando final utilizando los datos almacenados.
   */
  static compileCommand(payload: CommandPayload): string {
    const user = payload.username || "";
    const pass = payload.encryptedPassword
      ? decryptSensitiveData(payload.encryptedPassword)
      : "";
    const cmd = payload.command;

    const parts = [user, pass, cmd].filter(Boolean);
    return parts.join(" ");
  }
}
