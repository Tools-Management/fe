<!-- src/views/SupportTickets.vue -->
<template>
    <div class="min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div class="max-w-5xl mx-auto">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
            Danh Sách Ticket Hỗ Trợ
          </h1>
          <router-link
            to="/ticket-support/create"
            class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium hover:shadow-lg transition flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Tạo Ticket Mới
          </router-link>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="text-center py-12">
          <div class="inline-flex items-center gap-3">
            <svg class="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="text-gray-600">Đang tải danh sách ticket...</span>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="displayTickets.length === 0" class="text-center py-12">
          <div class="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6-4h6m-6 8h6m-3-8v8" />
            </svg>
          </div>
          <p class="text-gray-600 text-lg">Chưa có ticket nào</p>
          <router-link
            to="/ticket-support/create"
            class="mt-3 inline-block text-pink-600 hover:text-pink-700 font-medium"
          >
            Tạo ticket đầu tiên
          </router-link>
        </div>

        <!-- Ticket List -->
        <div v-else class="space-y-4">
          <ticket-item
            v-for="ticket in displayTickets"
            :key="ticket.id"
            :ticket="ticket"
            @click="openDetail(ticket)"
          />
        </div>
      </div>
    </div>

    <!-- Modal Chi Tiết -->
    <ticket-detail-modal
      v-if="selectedTicket"
      :ticket="selectedTicket"
      @close="selectedTicket = null"
    />
</template>

<script setup lang="ts">
import TicketItem from './TicketItem.vue'
import TicketDetailModal from './TicketDetailModal.vue'
import { ref, onMounted, computed } from 'vue'
import { useTicketStore } from '@/store/ticket.store'
import type { DisplayTicket } from '@/types/ticket'

const ticketStore = useTicketStore()
const selectedTicket = ref<DisplayTicket | null>(null)

// Computed properties từ store
const tickets = computed(() => ticketStore.tickets)
const isLoading = computed(() => ticketStore.loading)

// Helper functions cho display
const departmentMap: Record<string, string> = {
  technical: 'Phòng kỹ thuật',
  billing: 'Thanh toán & Hóa đơn',
  account: 'Tài khoản & Đăng nhập',
  other: 'Khác'
}

const statusConfig = {
  pending: { label: 'Chờ xử lý', color: 'bg-yellow-100 text-yellow-800' },
  processing: { label: 'Đang xử lý', color: 'bg-blue-100 text-blue-800' },
  resolved: { label: 'Đã giải quyết', color: 'bg-green-100 text-green-800' },
  closed: { label: 'Đã đóng', color: 'bg-gray-100 text-gray-800' }
}

// Computed để transform data cho display
const displayTickets = computed<DisplayTicket[]>(() => {
  return tickets.value.map(ticket => ({
    ...ticket,
    code: ticket.ticketId, // Tạo mã ticket từ ID
    departmentLabel: departmentMap[ticket.department] || ticket.department,
    statusLabel: statusConfig[ticket.status]?.label || ticket.status,
    statusColor: statusConfig[ticket.status]?.color || 'bg-gray-100 text-gray-800',
  }))
})

onMounted(async () => {
  await ticketStore.getMyTickets()
})

const openDetail = (ticket: DisplayTicket) => {
  selectedTicket.value = ticket
}
</script>