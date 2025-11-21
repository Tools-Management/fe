<!-- src/components/tickets/TicketDetail.vue -->
<template>
  <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
    <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
      <div class="flex justify-between items-start mb-4">
        <h2 class="text-2xl font-bold">#{{ ticket.id}}</h2>
        <button @click="emit('close')" class="text-gray-500 hover:text-gray-700">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="space-y-4">
        <div>
          <h3 class="font-semibold text-lg">{{ ticket.title }}</h3>
          <p class="text-gray-600 mt-1">{{ ticket.content }}</p>
        </div>

        <div class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span class="font-medium">Phòng ban:</span> {{ deptLabel }}
          </div>
          <div>
            <span class="font-medium">Đơn hàng:</span> {{ ticket.order || 'Không có' }}
          </div>
          <div>
            <span class="font-medium">Liên hệ:</span> {{ ticket.phone }}
          </div>
          <div>
            <span class="font-medium">Trạng thái:</span>
            <select
              v-model="localStatus"
              @change="updateStatus"
              class="ml-2 px-2 py-1 border rounded"
            >
              <option value="new">Mới</option>
              <option value="processing">Đang xử lý</option>
              <option value="resolved">Đã giải quyết</option>
            </select>
          </div>
        </div>

        <div class="border-t pt-4">
          <h4 class="font-semibold mb-3">Lịch sử phản hồi</h4>
          <div v-if="ticket.replies.length === 0" class="text-gray-500 text-center py-4">
            Chưa có phản hồi nào
          </div>
          <div v-else class="space-y-3">
            <div
              v-for="reply in ticket.replies"
              :key="reply.id"
              :class="reply.isAdmin ? 'text-right' : 'text-left'"
            >
              <div
                :class="reply.isAdmin ? 'bg-blue-100 inline-block' : 'bg-gray-100 inline-block'"
                class="rounded-lg px-4 py-2 max-w-xs"
              >
                <p class="text-sm">{{ reply.content }}</p>
                <p class="text-xs text-gray-500 mt-1">
                  {{ formatDate(reply.createdAt) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <ReplyForm @reply="addReply" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Ticket, TicketStatus } from '@/types/ticket'
import ReplyForm from './ReplyForm.vue'

const props = defineProps<{
  ticket: Ticket
}>()

const emit = defineEmits<{
  close: []
  updateStatus: [id: string, status: TicketStatus]
  addReply: [ticketId: string, content: string]
}>()

const localStatus = ref<TicketStatus>(props.ticket.status)

watch(() => props.ticket.status, (newVal) => {
  localStatus.value = newVal
})

const updateStatus = () => {
  emit('updateStatus', props.ticket.id, localStatus.value)
}

const addReply = (content: string) => {
  emit('addReply', props.ticket.id, content)
}

const deptLabel = {
  technical: 'Phòng kỹ thuật',
  billing: 'Thanh toán & Hóa đơn',
  account: 'Tài khoản & Đăng nhập',
  other: 'Khác'
}[props.ticket.department]

const formatDate = (date: string) => {
  return new Date(date).toLocaleString('vi-VN')
}
</script>