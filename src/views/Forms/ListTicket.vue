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

        <!-- Empty State -->
        <div v-if="tickets.length === 0" class="text-center py-12">
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
            v-for="ticket in tickets"
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
import { ref, onMounted } from 'vue'

// Dữ liệu giả lập
interface Ticket {
  id: string
  code: string
  title: string
  department: string
  departmentLabel: string
  status: 'open' | 'processing' | 'resolved'
  statusLabel: string
  statusColor: string
  createdAt: string
  order?: string
  content: string
  phone?: string
}

const tickets = ref<Ticket[]>([])
const selectedTicket = ref<Ticket | null>(null)

const departmentMap: Record<string, string> = {
  technical: 'Phòng kỹ thuật',
  billing: 'Thanh toán & Hóa đơn',
  account: 'Tài khoản & Đăng nhập',
  other: 'Khác'
}

const statusConfig = {
  open: { label: 'Mở', color: 'bg-yellow-100 text-yellow-800' },
  processing: { label: 'Đang xử lý', color: 'bg-blue-100 text-blue-800' },
  resolved: { label: 'Đã giải quyết', color: 'bg-green-100 text-green-800' }
}

onMounted(() => {
  // Giả lập dữ liệu từ localStorage hoặc API
  const saved = localStorage.getItem('support_tickets')
  if (saved) {
    tickets.value = JSON.parse(saved).map((t: any) => ({
      ...t,
      departmentLabel: departmentMap[t.department] || t.department,
      statusLabel: statusConfig[t.status].label,
      statusColor: statusConfig[t.status].color
    }))
  } else {
    // Dữ liệu mẫu
    tickets.value = [
      {
        id: '1',
        code: 'TKT-AB12CD',
        title: 'Không thể xuất video 4K',
        department: 'technical',
        departmentLabel: 'Phòng kỹ thuật',
        status: 'processing',
        statusLabel: 'Đang xử lý',
        statusColor: 'bg-blue-100 text-blue-800',
        createdAt: '2025-04-01 14:30',
        order: 'remake-PRO-2025',
        content: 'Video bị lỗi khi chọn độ phân giải 4K, xuất mãi không xong...',
        phone: '0901234567'
      },
      {
        id: '2',
        code: 'TKT-EF34GH',
        title: 'Hóa đơn thanh toán bị sai',
        department: 'billing',
        departmentLabel: 'Thanh toán & Hóa đơn',
        status: 'resolved',
        statusLabel: 'Đã giải quyết',
        statusColor: 'bg-green-100 text-green-800',
        createdAt: '2025-03-30 09:15',
        content: 'Gói Pro 399k nhưng bị trừ 499k...'
      },
      {
        id: '3',
        code: 'TKT-IJ56KL',
        title: 'Quên mật khẩu đăng nhập',
        department: 'account',
        departmentLabel: 'Tài khoản & Đăng nhập',
        status: 'open',
        statusLabel: 'Mở',
        statusColor: 'bg-yellow-100 text-yellow-800',
        createdAt: '2025-04-02 10:20',
        content: 'Không nhận được email đặt lại mật khẩu...'
      }
    ]
  }
})

const openDetail = (ticket: Ticket) => {
  selectedTicket.value = ticket
}
</script>