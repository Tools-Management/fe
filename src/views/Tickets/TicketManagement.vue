<!-- src/views/admin/TicketManagement.vue -->
<template>
  <LoadingBase :is-loading="ticketStore.loading" />
    <div class="py-6 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
          Quản Lý Ticket Hỗ Trợ
        </h1>

        <!-- Search Form -->
        <form @submit.prevent="handleSearch" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-6">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="md:col-span-2">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Tìm kiếm ticket, ID, nội dung..."
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select v-model="filters.status" class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="">Tất cả trạng thái</option>
              <option value="pending">Chờ xử lý</option>
              <option value="processing">Đang xử lý</option>
              <option value="resolved">Đã giải quyết</option>
              <option value="closed">Đã đóng</option>
            </select>
            <select v-model="filters.department" class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="">Tất cả phòng ban</option>
              <option value="technical">Kỹ thuật</option>
              <option value="billing">Thanh toán</option>
              <option value="account">Tài khoản</option>
              <option value="other">Khác</option>
            </select>
          </div>
          <div class="mt-4 flex justify-center gap-3">
            <button
              type="submit"
              :disabled="isSearching"
              class="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
            >
              <svg v-if="isSearching" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span v-else>
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              Tìm kiếm
            </button>
            <button
              type="button"
              @click="handleReset"
              class="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Đặt lại
            </button>
          </div>
        </form>

        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div class="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
            <p class="text-2xl font-bold text-red-600">{{ stats.pending }}</p>
            <p class="text-sm text-red-700">Chờ xử lý</p>
          </div>
          <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
            <p class="text-2xl font-bold text-yellow-600">{{ stats.processing }}</p>
            <p class="text-sm text-yellow-700">Đang xử lý</p>
          </div>
          <div class="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <p class="text-2xl font-bold text-green-600">{{ stats.resolved }}</p>
            <p class="text-sm text-green-700">Đã giải quyết</p>
          </div>
          <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
            <p class="text-2xl font-bold text-blue-600">{{ totalTickets }}</p>
            <p class="text-sm text-blue-700">Tổng ticket</p>
          </div>
        </div>

        <!-- Ticket List -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <TicketList
            :tickets="tickets"
            @select="selectTicket"
          />
        </div>

        <!-- Pagination -->
        <Pagination
          :current-page="pagination.page"
          :total-pages="pagination.totalPages"
          :total-items="pagination.total"
          :limit="pagination.limit"
          @page-change="handlePageChange"
          @limit-change="handleLimitChange"
        />

        <!-- Detail Modal -->
        <TicketDetail
          v-if="selectedTicket"
          :ticket="selectedTicket"
          @close="closeDetail"
          @submit-reply="submitReply"
        />
      </div>
    </div>
</template>

<script setup lang="ts">
import TicketList from '@/components/tickets/TicketList.vue'
import TicketDetail from '@/components/tickets/TicketDetail.vue'
import Pagination from '@/components/common/Pagination.vue'
import { computed, onMounted, ref } from 'vue'
import { useTicketStore } from '@/store/ticket.store'
import type { Ticket, TicketStatus } from '@/types/ticket'
import LoadingBase from '@/components/common/LoadingBase.vue'

const ticketStore = useTicketStore()

// Pagination state
const currentPage = ref<number>(1)
const currentLimit = ref<number>(10)

// Search state
const isSearching = ref(false)

// Ticket management state
const selectedTicket = ref<Ticket | null>(null)
const filters = ref({
  status: '',
  department: '',
  search: ''
})

onMounted(() => {
  // Load tất cả tickets khi mới vào trang
  handleSearch()
})

const stats = computed(() => ticketStore.stats)
const totalTickets = computed(() => ticketStore.totalTickets)
const tickets = computed(() => ticketStore.tickets)
const pagination = computed(() => ({
  page: Number(ticketStore.pagination.page),
  limit: Number(ticketStore.pagination.limit),
  total: Number(ticketStore.pagination.total),
  totalPages: Number(ticketStore.pagination.totalPages),
}))


const searchQuery = computed({
  get: () => filters.value.search || '',
  set: (val) => { filters.value.search = val }
})

// Load tickets with current filters and pagination
const loadTickets = async () => {
  const params = {
    page: currentPage.value,
    limit: currentLimit.value,
    search: filters.value.search,
    status: filters.value.status,
    department: filters.value.department,
  }
  await ticketStore.getTickets(params)
}

// Handle search form submit
const handleSearch = async () => {
  isSearching.value = true
  currentPage.value = 1 // Reset to first page when search

  try {
    await loadTickets()
  } finally {
    isSearching.value = false
  }
}

// Handle reset filters
const handleReset = async () => {
  searchQuery.value = ''
  filters.value.status = ''
  filters.value.department = ''
  currentPage.value = 1

  await handleSearch()
}

// Handle page change
const handlePageChange = (page: number) => {
  currentPage.value = page
  loadTickets()
}

// Handle limit change
const handleLimitChange = (limit: number) => {
  currentLimit.value = limit
  currentPage.value = 1 // Reset to first page when limit changes
  loadTickets()
}

// Ticket actions
const selectTicket = (ticket: Ticket) => {
  selectedTicket.value = ticket
}

const closeDetail = () => {
  selectedTicket.value = null
}

const submitReply = async (ticketId: string, data: { status: TicketStatus; content: string }) => {
  try {
    await ticketStore.updateTicket(ticketId, {
      status: data.status,
      replies: data.content,
      updatedAt: new Date().toISOString()
    })

    await handleSearch()
    closeDetail()
  } catch (error) {
    console.error('Failed to update ticket:', error)
    // You might want to show a toast notification here
  }
}
</script>