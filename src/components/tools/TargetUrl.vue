<!-- components/tools/ToolIntroVideoManager.vue -->
<template>
    <component-card title="Target Url">
      <div class="p-6">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div class="flex-1">
            <p class="text-sm text-gray-500">Link đích sau khi chuyển trang</p>
            <p v-if="currentLink" class="text-lg font-mono text-blue-600 break-all mt-1">
              {{ currentLink }}
            </p>
            <p v-else class="text-gray-400 italic">Chưa có link</p>
          </div>
          <div class="flex gap-2">
            <button
              v-if="currentLink"
              @click="copyLink"
              :class="[
                'px-4 py-2 rounded-lg transition-all flex items-center gap-2 text-sm font-medium',
                copied 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              ]"
              :title="copied ? 'Đã sao chép!' : 'Sao chép link'"
            >
              <svg v-if="!copied" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              {{ copied ? 'Copied' : 'Copy' }}
            </button>
            <a
              v-if="currentLink"
              :href="currentLink"
              target="_blank"
              class="px-4 py-2 bg-gradient-to-r from-green-600 to-teal-700 text-white rounded-lg hover:shadow-md transition flex items-center gap-2 text-sm font-medium"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M14.752 11.168l-6.718-3.874A1 1 0 007 8.118v7.764a1 1 0 001.034.923l6.718-3.874a1 1 0 000-1.846z" />
              </svg>
              Mở Link
            </a>
            <button
              v-if="currentLink"
              @click="$emit('edit')"
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center gap-2 text-sm font-medium"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Sửa
            </button>
            <button
              v-else
              @click="$emit('create')"
              class="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg hover:shadow-md transition flex items-center gap-2 text-sm font-medium"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Thêm Mới
            </button>
          </div>
        </div>
      </div>
    </component-card>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import ComponentCard from '@/components/common/ComponentCard.vue'
  import { useLinkStore } from '@/store/link.store'
  
  defineProps<{
    currentLink: string
  }>()
  
  defineEmits<{
    (e: 'edit'): void
    (e: 'create'): void
  }>()
  
  const copied = ref(false)
  
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(useLinkStore().toolIntroVideoLink)
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 500)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }
  </script>