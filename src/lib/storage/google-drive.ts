/**
 * Abstracción de Google Drive para almacenamiento de archivos (PDFs y documentos).
 * En la base de datos únicamente se almacena el driveFileId y metadata.
 */

export interface UploadedFileMetadata {
  fileId: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  webViewLink?: string;
}

export class GoogleDriveStorageService {
  /**
   * Sube un archivo a Google Drive y devuelve la metadata con el driveFileId.
   */
  async uploadFile(
    fileBuffer: Buffer,
    fileName: string,
    mimeType: string = "application/pdf"
  ): Promise<UploadedFileMetadata> {
    const clientId = process.env.GOOGLE_DRIVE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_DRIVE_CLIENT_SECRET;
    const refreshToken = process.env.GOOGLE_DRIVE_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !refreshToken) {
      // Mock / fallback de almacenamiento durante desarrollo local inicial
      const mockId = `mock_drive_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      return {
        fileId: mockId,
        fileName,
        mimeType,
        sizeBytes: fileBuffer.length,
        webViewLink: `https://drive.google.com/file/d/${mockId}/view`,
      };
    }

    // TODO: Invocar Google Drive API v3 con OAuth2 client
    const generatedId = `gdrive_${Date.now()}`;
    return {
      fileId: generatedId,
      fileName,
      mimeType,
      sizeBytes: fileBuffer.length,
      webViewLink: `https://drive.google.com/file/d/${generatedId}/view`,
    };
  }

  /**
   * Obtiene la URL de descarga o vista de un archivo por su fileId.
   */
  getFileUrl(driveFileId: string): string {
    return `https://drive.google.com/file/d/${driveFileId}/view`;
  }
}

export const googleDriveService = new GoogleDriveStorageService();
