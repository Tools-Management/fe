<!-- src/components/support/TicketDetailModal.vue -->
<template>
  <div class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
    <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
      <div class="p-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex justify-between items-start">
          <div>
            <div class="flex items-center gap-3 mb-2">
              <span class="text-lg font-mono font-bold text-blue-600">#{{ ticket.code }}</span>
              <span :class="['px-3 py-1 rounded-full text-sm font-medium', ticket.statusColor]">
                {{ ticket.statusLabel }}
              </span>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{{ ticket.title }}</h2>
          </div>
          <button
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div class="p-6 space-y-5">
        <div>
          <h3 class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Phòng ban</h3>
          <p class="text-gray-900 dark:text-white">{{ ticket.departmentLabel }}</p>
        </div>

        <div v-if="ticket.order">
          <h3 class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Đơn hàng liên quan</h3>
          <p class="text-gray-900 dark:text-white font-mono">{{ ticket.order }}</p>
        </div>

        <div v-if="ticket.phone">
          <h3 class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Liên hệ</h3>
          <p class="text-gray-900 dark:text-white flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {{ ticket.phone }}
          </p>
        </div>

        <div>
          <h3 class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Nội dung chi tiết</h3>
          <p class="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{{ ticket.content }}</p>
        </div>

        <div class="text-sm text-gray-500">
          Tạo lúc: {{ formatDate(ticket.createdAt) }}
        </div>
      </div>

      <div class="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-b-2xl">
        <button
          @click="$emit('close')"
          class="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-lg font-medium hover:shadow-lg transition"
        >
          Đóng
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  ticket: {
    code: string
    title: string
    departmentLabel: string
    statusLabel: string
    statusColor: string
    createdAt: string
    order?: string
    phone?: string
    content: string
  }
}>()

defineEmits(['close'])

const formatDate = (date: string) => {
  const d = new Date(date.replace(' ', 'T'))
  return d.toLocaleString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}
</script>