<!-- src/components/tickets/TicketList.vue -->
<template>
  <div class="space-y-4">
    <div v-for="ticket in tickets" :key="ticket.id">
      <TicketItem :ticket="ticket" @select="emit('select', ticket)" />
    </div>
    <div v-if="tickets.length === 0" class="text-center py-8 text-gray-500">
      Không có ticket nào
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ticket } from '@/types/ticket'
import TicketItem from './TicketItem.vue'

defineProps<{
  tickets: Ticket[]
}>()

const emit = defineEmits<{
  select: [ticket: Ticket]
}>()
</script>