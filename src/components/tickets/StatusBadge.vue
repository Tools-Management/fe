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

const props = defineProps<{
  status: TicketStatus
}>()

const statusConfig = {
  new: { label: 'Mới', color: 'bg-red-100 text-red-700' },
  processing: { label: 'Đang xử lý', color: 'bg-yellow-100 text-yellow-700' },
  resolved: { label: 'Đã giải quyết', color: 'bg-green-100 text-green-700' }
}

const badgeClasses = computed(() => statusConfig[props.status].color)
const label = computed(() => statusConfig[props.status].label)
</script>