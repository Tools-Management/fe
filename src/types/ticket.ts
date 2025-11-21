// src/types/ticket.ts
export type TicketStatus = 'new' | 'processing' | 'resolved'

export interface Ticket {
  id: string
  title: string
  content: string
  department: string
  order: string
  phone: string
  status: TicketStatus
  createdAt: string
  updatedAt: string
  replies: TicketReply[]
}

export interface TicketReply {
  id: string
  content: string
  isAdmin: boolean
  createdAt: string
}

export interface TicketFilters {
  status?: TicketStatus
  department?: string
  order?: string
  search?: string
}