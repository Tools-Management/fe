import { ticketService } from '@/services/ticket.service'
import type { IPagination, ITicketCreationAttributes, ITicketStats, Ticket } from '@/types/ticket'
import { ResponseError } from '@/utils/error'
import { defineStore } from 'pinia'

interface TicketState {
  stats: ITicketStats
  totalTickets: number
  tickets: Ticket[]
  ticket: Ticket | null
  pagination: IPagination
  loading: boolean
  error: string
}

interface TicketActions {
  getTickets: (params?: { page?: number; limit?: number; ticketId?: string; status?: string; department?: string }) => Promise<void>
  getTicketById: (id: string) => Promise<void>
  createTicket: (ticket: ITicketCreationAttributes) => Promise<void>
  updateTicket: (id: string, ticket: Partial<Ticket>) => Promise<void>
  getMyTickets: () => Promise<void>
}

export const useTicketStore = defineStore<
  'ticket',
  TicketState,
  Record<string, never>,
  TicketActions
>('ticket', {
  state: (): TicketState => ({
    stats: {
      pending: 0,
      processing: 0,
      resolved: 0,
      closed: 0,
    },
    totalTickets: 0,
    tickets: [],
    ticket: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    },
    loading: false,
    error: '',
  }),

  actions: {
    async getTickets(params?: { page?: number; limit?: number; ticketId?: string; status?: string; department?: string }) {
      this.loading = true
      this.error = ''

      try {
        const response = await ticketService.getAllTickets(params)

        if (response instanceof ResponseError) throw response

        this.stats = {
          pending: response.data.data.stats?.pending ?? this.stats.pending,
          processing: response.data.data.stats?.processing ?? this.stats.processing,
          resolved: response.data.data.stats?.resolved ?? this.stats.resolved,
          closed: response.data.data.stats?.closed ?? this.stats.closed,
        }
        this.tickets = response.data.data.tickets || []
        this.totalTickets = response.data.data.totalTickets ?? 0
        this.pagination = response.data.pagination || {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'An unexpected error occurred.'
      } finally {
        this.loading = false
      }
    },

    async getTicketById(id: string) {
      this.loading = true
      this.error = ''

      try {
        const response = await ticketService.getTicketById(id)

        if (response instanceof ResponseError) throw response

        this.ticket = response.data as Ticket
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'An unexpected error occurred.'
      } finally {
        this.loading = false
      }
    },

    async createTicket(ticket: ITicketCreationAttributes) {
      this.loading = true
      this.error = ''

      try {
        const response = await ticketService.createTicket(ticket)

        if (response instanceof ResponseError) throw response

        this.ticket = response.data as Ticket
        // Reload danh sách tickets sau khi tạo thành công
        await this.getMyTickets()
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'An unexpected error occurred.'
        throw error // Re-throw để component có thể handle
      } finally {
        this.loading = false
      }
    },

    async updateTicket(id: string, ticket: Partial<Ticket>) {
      this.loading = true
      this.error = ''

      try {
        const response = await ticketService.updateTicket(id, ticket)

        if (response instanceof ResponseError) throw response
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'An unexpected error occurred.'
      } finally {
        this.loading = false
      }
    },

    async getMyTickets() {
      this.loading = true
      this.error = ''

      try {
        const response = await ticketService.getMyTickets()

        if (response instanceof ResponseError) throw response

        this.tickets = response.data as Ticket[]
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'An unexpected error occurred.'
      } finally {
        this.loading = false
      }
    },
  },
})
