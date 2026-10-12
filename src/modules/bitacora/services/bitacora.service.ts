export interface ActivityLogInput {
  userId: string;
  ticketId?: string;
  type: string;
  client: string;
  equipmentCode?: string;
  imei?: string;
  description: string;
  result?: string;
}

export class BitacoraService {
  /**
   * Genera el resumen consolidado del día para envío manual a grupos de WhatsApp.
   * Sección 24: Resumen diario con conteos por tipo y técnicos.
   */
  static generateDailySummaryText(data: {
    date: string;
    total: number;
    byType: Record<string, number>;
    byTechnician: Record<string, number>;
  }): string {
    const typeLines = Object.entries(data.byType)
      .map(([type, count]) => `• *${type}:* ${count}`)
      .join("\n");

    const techLines = Object.entries(data.byTechnician)
      .map(([tech, count]) => `- ${tech} (${count})`)
      .join("\n");

    return `*📋 RESUMEN DIARIO DE ACTIVIDADES DE SOPORTE - SATELCOM*
*Fecha:* ${data.date}
*Total de Actividades:* ${data.total}

${typeLines}

*Técnicos de turno:*
${techLines}

_Reporte oficial generado desde Support Center._`;
  }
}
