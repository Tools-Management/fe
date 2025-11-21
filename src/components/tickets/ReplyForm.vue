<!-- src/components/tickets/ReplyForm.vue -->
<template>
  <form @submit.prevent="submit" class="mt-4 space-y-3">
    <textarea
      v-model="content"
      rows="3"
      required
      placeholder="Nhập phản hồi của bạn..."
      class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    ></textarea>
    <div class="flex justify-end">
      <button
        type="submit"
        :disabled="isSubmitting"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {{ isSubmitting ? 'Đang gửi...' : 'Gửi phản hồi' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const content = ref('')
const isSubmitting = ref(false)

const emit = defineEmits<{
  reply: [content: string]
}>()

const submit = async () => {
  if (!content.value.trim()) return
  isSubmitting.value = true
  await new Promise(r => setTimeout(r, 800))
  emit('reply', content.value.trim())
  content.value = ''
  isSubmitting.value = false
}
</script>