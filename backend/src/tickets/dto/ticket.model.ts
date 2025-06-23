// src/tickets/ticket.model.ts
export interface Ticket {
  id: number;
  subscriber: string;
  description: string;
  status: 'OPEN' | 'CLOSED' | 'SUPERVISOR_ASSIGNED';
}
