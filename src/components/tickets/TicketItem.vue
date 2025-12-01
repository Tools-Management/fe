<!-- src/components/tickets/TicketItem.vue -->
<template>
  <div
    @click="emit('select', ticket)"
    class="p-4 border rounded-xl hover:shadow-md transition cursor-pointer bg-white dark:bg-gray-800"
  >
    <div class="flex justify-between items-start mb-2">
      <h3 class="font-semibold text-gray-800 dark:text-white">{{ ticket.title }}</h3>
      <StatusBadge :status="ticket.status" />
    </div>
    <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
      {{ ticket.content }}
    </p>
    <div class="flex flex-wrap gap-2 text-xs text-gray-500">
      <span>#{{ ticket.ticketId }}</span>
      <span>•</span>
      <span>{{ formatDate(ticket.createdAt) }}</span>
      <span>•</span>
      <span class="capitalize">{{ deptLabel }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Ticket } from '@/types/ticket'
import StatusBadge from './StatusBadge.vue'

const props = defineProps<{
  ticket: Ticket
}>()

const emit = defineEmits<{
  select: [ticket: Ticket]
}>()

const deptLabel = computed(() => {
  const map: Record<string, string> = {
    technical: 'Kỹ thuật',
    billing: 'Thanh toán',
    account: 'Tài khoản',
    other: 'Khác'
  }
  return map[props.ticket.department] || props.ticket.department
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>