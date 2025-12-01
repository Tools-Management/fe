<!-- src/components/tickets/StatusBadge.vue -->
<template>
  <span
    class="px-3 py-1 text-xs font-medium rounded-full"
    :class="badgeClasses"
  >
    {{ label }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TicketStatus } from '@/types/ticket'

const statusConfig: Record<TicketStatus, { label: string; color: string; dot: string }> = {
  pending:   { label: 'Chờ xử lý',     color: 'bg-red-100 text-red-800',     dot: 'bg-red-500' },
  processing:{ label: 'Đang xử lý',   color: 'bg-yellow-100 text-yellow-800',dot: 'bg-yellow-500' },
  resolved:  { label: 'Đã giải quyết', color: 'bg-green-100 text-green-800', dot: 'bg-green-500' },
  closed:    { label: 'Đã đóng',       color: 'bg-gray-100 text-gray-800',   dot: 'bg-gray-500' } // thêm status closed
}

const props = defineProps<{
  status: TicketStatus
}>()

const config = computed(() => statusConfig[props.status])

const badgeClasses = computed(() => config.value.color)
const label = computed(() => config.value.label)
</script>