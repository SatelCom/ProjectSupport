import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;

/**
 * Obtiene la clave de cifrado simétrica desde ENCRYPTION_KEY (32 bytes).
 */
function getEncryptionKey(): Buffer {
  const secret = process.env.ENCRYPTION_KEY || "satelcom_support_center_secret_key_32bytes_!";
  return crypto.createHash("sha256").update(secret).digest();
}

/**
 * Cifra un texto plano usando AES-256-GCM.
 * Retorna formato: iv:authTag:encryptedContent en base64.
 */
export function encryptSensitiveData(plainText: string): string {
  if (!plainText) return "";

  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, getEncryptionKey(), iv);

  let encrypted = cipher.update(plainText, "utf8", "hex");
  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag();

  return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted}`;
}

/**
 * Descifra una cadena previamente cifrada con AES-256-GCM.
 * Esta función SOLO debe invocarse en Server Components o Server Actions cuando sea estrictamente necesario.
 */
export function decryptSensitiveData(cipherPayload: string): string {
  if (!cipherPayload) return "";

  const parts = cipherPayload.split(":");
  if (parts.length !== 3) {
    // Si no está en formato cifrado o es texto plano legado
    return cipherPayload;
  }

  const [ivHex, authTagHex, encryptedHex] = parts;
  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");

  const decipher = crypto.createDecipheriv(ALGORITHM, getEncryptionKey(), iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encryptedHex, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
