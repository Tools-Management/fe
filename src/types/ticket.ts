// src/types/ticket.ts
export type TicketStatus = 'pending' | 'processing' | 'resolved' | 'closed'

export interface Ticket {
  id: string
  ticketId: string
  title: string
  content: string
  department: string
  order: string
  phone: string
  status: TicketStatus
  createdAt: string
  updatedAt: string
  replies: string | null;
}

export interface ITicketCreationAttributes {
  title: string
  content: string
  department: string
  order?: string
  phone?: string
  status: TicketStatus
}

export interface ITicketStats {
  pending: number;
  processing: number;
  resolved: number;
  closed: number;
}

export interface IPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ITicketData {
  tickets: Ticket[];
  stats: ITicketStats;
  totalTickets: number;
}

export interface ITicketResponse {
  data: ITicketData;
  pagination: IPagination;
}

export interface ITicketStatsResponse {
  stats: ITicketStats;
  tickets: Ticket[];
  totalTickets: number;
}

export interface TicketFilters {
  status?: TicketStatus
  department?: string
  order?: string
  search?: string
}

export interface DisplayTicket extends Ticket {
  code: string
  departmentLabel: string
  statusLabel: string
  statusColor: string
}