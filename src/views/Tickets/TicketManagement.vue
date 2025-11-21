<!-- src/views/admin/TicketManagement.vue -->
<template>
    <div class="min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
          Quản Lý Ticket Hỗ Trợ
        </h1>

        <!-- Filters -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-6 space-y-4 md:space-y-0 md:flex md:gap-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Tìm kiếm ticket, ID, nội dung..."
            class="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <select v-model="filters.status" class="px-4 py-2 border rounded-lg">
            <option value="">Tất cả trạng thái</option>
            <option value="new">Mới</option>
            <option value="processing">Đang xử lý</option>
            <option value="resolved">Đã giải quyết</option>
          </select>
          <select v-model="filters.department" class="px-4 py-2 border rounded-lg">
            <option value="">Tất cả phòng ban</option>
            <option value="technical">Kỹ thuật</option>
            <option value="billing">Thanh toán</option>
            <option value="account">Tài khoản</option>
            <option value="other">Khác</option>
          </select>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div class="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
            <p class="text-2xl font-bold text-red-600">{{ stats.new }}</p>
            <p class="text-sm text-red-700">Ticket mới</p>
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
            <p class="text-2xl font-bold text-blue-600">{{ tickets.length }}</p>
            <p class="text-sm text-blue-700">Tổng ticket</p>
          </div>
        </div>

        <!-- Ticket List -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <TicketList
            :tickets="filteredTickets"
            @select="selectTicket"
          />
        </div>

        <!-- Detail Modal -->
        <TicketDetail
          v-if="selectedTicket"
          :ticket="selectedTicket"
          @close="closeDetail"
          @update-status="updateStatus"
          @add-reply="addReply"
        />
      </div>
    </div>
</template>

<script setup lang="ts">
import TicketList from '@/components/tickets/TicketList.vue'
import TicketDetail from '@/components/tickets/TicketDetail.vue'
import { useTickets } from '@/composables/useTickets'
import { computed, watch } from 'vue'

const {
  filteredTickets,
  selectedTicket,
  filters,
  updateStatus,
  addReply,
  selectTicket,
  closeDetail,
  tickets
} = useTickets()

const searchQuery = computed({
  get: () => filters.value.search || '',
  set: (val) => { filters.value.search = val }
})

watch(searchQuery, (val) => {
  filters.value.search = val
})

const stats = computed(() => {
  const s = { new: 0, processing: 0, resolved: 0 }
  tickets.value.forEach(t => s[t.status]++)
  return s
})
</script>