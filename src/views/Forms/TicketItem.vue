<!-- src/components/support/TicketItem.vue -->
<template>
  <div
    @click="$emit('click')"
    class="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 transition cursor-pointer shadow-sm hover:shadow-md"
  >
    <div class="flex justify-between items-start mb-3">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="text-xs font-mono font-bold text-blue-600">#{{ ticket.code }}</span>
          <span :class="['text-xs px-2 py-0.5 rounded-full', ticket.statusColor]">
            {{ ticket.statusLabel }}
          </span>
        </div>
        <h3 class="font-semibold text-gray-900 dark:text-white text-lg">{{ ticket.title }}</h3>
      </div>
      <div class="text-right text-sm text-gray-500">
        <div>{{ formatDate(ticket.createdAt) }}</div>
        <div class="text-xs mt-1 text-gray-400">{{ ticket.departmentLabel }}</div>
      </div>
    </div>
    <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{{ ticket.content }}</p>
    <div class="mt-3 flex items-center justify-between text-xs text-gray-500">
      <span v-if="ticket.order" class="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">Đơn: {{ ticket.order }}</span>
      <span v-if="ticket.phone" class="flex items-center gap-1">
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        {{ ticket.phone }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  ticket: {
    code: string
    title: string
    content: string
    statusLabel: string
    statusColor: string
    createdAt: string
    departmentLabel: string
    order?: string
    phone?: string
  }
}>()

defineEmits(['click'])

const formatDate = (date: string) => {
  const d = new Date(date.replace(' ', 'T'))
  return d.toLocaleString('vi-VN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}
</script>