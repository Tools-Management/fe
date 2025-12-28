<!-- components/tools/EditLinkModal.vue -->
<template>
  <div class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-bold text-gray-900">
          {{ isTarget ? 'Cập Nhật Link Đích' : 'Cập Nhật Link Link Video Or Image Preview' }}
        </h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            {{ isTarget ? 'Link đích được chuyển tới' : 'Link Preview (YouTube, Image, v.v.)' }}
          </label>
          <input
            v-model="link"
            type="url"
            :placeholder="isTarget ? 'https://drive.google.com/...' : 'https://example.com/...'"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            {{
              isTarget
                ? 'Link đích sau khi chuyển hướng'
                : 'Link image or video (YouTube, Image, v.v.)'
            }}
          </label>
          <select v-model="type" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
            <option disabled value="">-- Chọn loại link --</option>

            <template v-if="props.isTarget">
              <option :value="LINK_TYPES.DESTINATION_URL">Link đích (Destination)</option>
            </template>

            <template v-else>
              <option :value="LINK_TYPES.INTERSTITIAL_IMAGE">Ảnh preview (trung gian)</option>
              <option :value="LINK_TYPES.INTERSTITIAL_VIDEO">Video preview (trung gian)</option>
            </template>
          </select>
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
          @click="saveLink"
          class="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:shadow-lg transition font-medium"
        >
          Lưu Link
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
  id: string
  currentLink: string
  type: LINK_TYPES
  isTarget: boolean
}>()

const type = ref<LINK_TYPES>(props.type)

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'updated'): void
}>()

const link = ref(props.currentLink)
const linkStore = useLinkStore()

const saveLink = async () => {
  if (!link.value.trim()) {
    alert('Vui lòng nhập link hợp lệ!')
    return
  }
  await linkStore.updateLink(props.id, {
    link: link.value.trim(),
    type: type.value,
  })
  emit('updated')
  emit('close')
}
</script>
