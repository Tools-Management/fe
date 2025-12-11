<!-- components/tools/CreateLinkModal.vue -->
<template>
  <div class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-bold text-gray-900">
          {{ isDownload ? 'Thêm Link Tải Mới' : 'Thêm Link Video Mới' }}
        </h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            {{ isDownload ? 'Link tải (Google Drive, MediaFire, v.v.)' : 'Link video (YouTube, Google Drive, v.v.)' }}
          </label>
          <input
            v-model="link"
            type="url"
            :placeholder="isDownload ? 'https://drive.google.com/...' : 'https://youtube.com/...'"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div class="flex justify-end gap-3 mt-6">
        <button
          @click="$emit('close')"
          class="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
        >
          Hủy
        </button>
        <button
          @click="createLink"
          :disabled="loading"
          class="px-5 py-2 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg hover:shadow-lg transition font-medium disabled:opacity-50"
        >
          <span v-if="loading">Đang tạo...</span>
          <span v-else>Thêm Link</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLinkStore } from '@/store/link.store'
import { LINK_TYPES } from '@/types/link'

const props = defineProps<{
  isDownload: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'created'): void
}>()

const link = ref('')
const linkStore = useLinkStore()
const loading = ref(false)

const createLink = async () => {
  if (!link.value.trim()) {
    alert('Vui lòng nhập link hợp lệ!')
    return
  }

  loading.value = true

  try {
    await linkStore.createLink({
      link: link.value.trim(),
      type: props.isDownload ? LINK_TYPES.DOWNLOAD : LINK_TYPES.INTRO_VIDEO
    })

    emit('created')
    emit('close')
  } catch (error) {
    console.error('Error creating link:', error)
    alert('Có lỗi xảy ra khi tạo link. Vui lòng thử lại!')
  } finally {
    loading.value = false
  }
}
</script>
