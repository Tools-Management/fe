<!-- src/components/tickets/ReplyForm.vue -->
<template>
  <form @submit.prevent="submit" class="mt-4 space-y-3">
    <div>
      <label class="block text-sm font-medium mb-2">Cập nhật trạng thái:</label>
      <select
        v-model="selectedStatus"
        class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="pending">Chờ xử lý</option>
        <option value="processing">Đang xử lý</option>
        <option value="resolved">Đã giải quyết</option>
        <option value="closed">Đã đóng</option>
      </select>
    </div>
    <div>
      <label class="block text-sm font-medium mb-2">Phản hồi:</label>
      <textarea
        v-model="content"
        rows="3"
        required
        placeholder="Nhập phản hồi của bạn..."
        class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      ></textarea>
    </div>
    <div class="flex justify-end">
      <button
        type="submit"
        :disabled="isSubmitting"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {{ isSubmitting ? 'Đang gửi...' : 'Cập nhật' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { TicketStatus } from '@/types/ticket'

const props = defineProps<{
  currentStatus: TicketStatus
}>()

const content = ref('')
const selectedStatus = ref<TicketStatus>(props.currentStatus)
const isSubmitting = ref(false)

const emit = defineEmits<{
  submitReply: [data: { status: TicketStatus; content: string }]
}>()

watch(() => props.currentStatus, (newStatus) => {
  selectedStatus.value = newStatus
})

const submit = async () => {
  if (!content.value.trim()) return
  isSubmitting.value = true
  await new Promise(r => setTimeout(r, 800))
  emit('submitReply', {
    status: selectedStatus.value,
    content: content.value.trim()
  })
  content.value = ''
  isSubmitting.value = false
}
</script>