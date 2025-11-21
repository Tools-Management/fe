// src/composables/useTickets.ts
import { ref, computed } from 'vue'
import type { Ticket, TicketStatus, TicketFilters } from '@/types/ticket'

const mockTickets: Ticket[] = [
  {
    id: 'TKT-A1B2C3',
    title: 'Không thể remake video từ TikTok',
    content: 'Khi ấn nút remake thì báo lỗi 500, đã thử nhiều lần...',
    department: 'technical',
    order: 'remake-PRO-2025',
    phone: '0901234567',
    status: 'new',
    createdAt: '2025-11-04T10:30:00Z',
    updatedAt: '2025-11-04T10:30:00Z',
    replies: []
  },
  {
    id: 'TKT-X9Y8Z7',
    title: 'Hóa đơn không hiển thị đúng',
    content: 'Đã thanh toán nhưng hóa đơn vẫn ghi chưa thanh toán...',
    department: 'billing',
    order: 'ACTCHaF1V8',
    phone: '0987654321',
    status: 'processing',
    createdAt: '2025-11-03T15:20:00Z',
    updatedAt: '2025-11-04T09:15:00Z',
    replies: [
      {
        id: 'r1',
        content: 'Chúng tôi đang kiểm tra giao dịch của bạn.',
        isAdmin: true,
        createdAt: '2025-11-04T09:15:00Z'
      }
    ]
  }
]

export function useTickets() {
  const tickets = ref<Ticket[]>(mockTickets)
  const selectedTicket = ref<Ticket | null>(null)
  const filters = ref<TicketFilters>({})

  const filteredTickets = computed(() => {
    return tickets.value.filter(ticket => {
      if (filters.value.status && ticket.status !== filters.value.status) return false
      if (filters.value.department && ticket.department !== filters.value.department) return false
      if (filters.value.order && ticket.order !== filters.value.order) return false
      if (filters.value.search) {
        const search = filters.value.search.toLowerCase()
        return (
          ticket.title.toLowerCase().includes(search) ||
          ticket.id.toLowerCase().includes(search) ||
          ticket.content.toLowerCase().includes(search)
        )
      }
      return true
    })
  })

  const updateStatus = (id: string, status: TicketStatus) => {
    const ticket = tickets.value.find(t => t.id === id)
    if (ticket) {
      ticket.status = status
      ticket.updatedAt = new Date().toISOString()
    }
  }

  const addReply = (ticketId: string, content: string) => {
    const ticket = tickets.value.find(t => t.id === ticketId)
    if (ticket) {
      ticket.replies.push({
        id: Date.now().toString(),
        content,
        isAdmin: true,
        createdAt: new Date().toISOString()
      })
      ticket.updatedAt = new Date().toISOString()
      if (ticket.status === 'new') ticket.status = 'processing'
    }
  }

  const selectTicket = (ticket: Ticket) => {
    selectedTicket.value = ticket
  }

  const closeDetail = () => {
    selectedTicket.value = null
  }

  return {
    tickets,
    filteredTickets,
    selectedTicket,
    filters,
    updateStatus,
    addReply,
    selectTicket,
    closeDetail
  }
}