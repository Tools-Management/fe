<!-- components/tools/ToolDownloadLinkManager.vue -->
<template>
    <component-card title="Link Tải Hiện Tại">
      <div class="p-6">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div class="flex-1">
            <p class="text-sm text-gray-500">AI Remake Tools Pro</p>
            <p v-if="currentLink" class="text-lg font-mono text-blue-600 break-all mt-1">
              {{ currentLink }}
            </p>
            <p v-else class="text-gray-400 italic">Chưa có link tải</p>
          </div>
          <div class="flex gap-2">
            <button
              v-if="currentLink"
              @click="copyLink"
              class="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition flex items-center gap-2 text-sm font-medium"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </button>
            <a
              v-if="currentLink"
              :href="currentLink"
              target="_blank"
              class="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:shadow-md transition flex items-center gap-2 text-sm font-medium"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Mở Link
            </a>
            <button
              @click="$emit('edit')"
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center gap-2 text-sm font-medium"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Sửa
            </button>
          </div>
        </div>
      </div>
    </component-card>
  </template>
  
  <script setup lang="ts">
  import ComponentCard from '@/components/common/ComponentCard.vue'
  import { useLinkStore } from '@/store/link.store'
  
  defineProps<{
    currentLink: string
  }>()
  
  defineEmits<{
    (e: 'edit'): void
  }>()
  
  const copyLink = () => {
    navigator.clipboard.writeText(useLinkStore().toolDownloadLink)
  }
  </script>