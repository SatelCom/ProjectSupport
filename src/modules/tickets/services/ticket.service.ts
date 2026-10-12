export interface CreateTicketInput {
  type: string;
  technicianId?: string;
  client: string;
  code?: string;
  imei?: string;
  priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  problem: string;
  observations?: string;
  createdBy: string;
}

export class TicketService {
  /**
   * Genera el texto con formato para WhatsApp utilizando la plantilla oficial del ticket.
   */
  static formatWhatsAppMessage(ticket: {
    id: string;
    priority: string;
    technicianName?: string;
    client: string;
    code?: string;
    imei?: string;
    type: string;
    problem: string;
    observations?: string;
  }): string {
    return `*🔔 ASIGNACIÓN DE SOPORTE TÉCNICO - SATELCOM*
*Ticket:* #${ticket.id}
*Prioridad:* ${ticket.priority}
*Técnico Asignado:* ${ticket.technicianName || "Pendiente"}
*Cliente:* ${ticket.client}
*Código Unidad:* ${ticket.code || "N/A"}
*IMEI GPS:* ${ticket.imei || "N/A"}
*Tipo de Trabajo:* ${ticket.type}
*Motivo/Problema:* ${ticket.problem}
*Observaciones:* ${ticket.observations || "Ninguna"}
_Por favor confirmar recepción y registrar avance en Bitácora._`;
  }
}
