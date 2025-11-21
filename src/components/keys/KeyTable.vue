<!-- src/components/keys/KeyTable.vue -->
<template>
  <div class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <table class="min-w-full">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="px-5 py-3 text-left w-3/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">API Key</p>
            </th>
            <th class="px-5 py-3 text-left w-2/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Hạn dùng</p>
            </th>
            <th class="px-5 py-3 text-left w-2/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Trạng thái</p>
            </th>
            <th class="px-5 py-3 text-left w-2/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Tạo lúc</p>
            </th>
            <th class="px-5 py-3 text-left w-3/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Hành động</p>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="key in keys" :key="key.id" class="border-t border-gray-100 dark:border-gray-800">
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-2">
                <code class="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{{ key.key }}</code>
                <button @click="copyKey(key.key)" class="text-blue-600 hover:text-blue-700">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <p class="text-gray-700 dark:text-gray-300 text-sm">
                {{ formatDuration(key.duration) }}
              </p>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <span :class="getStatusClass(key.status)">
                {{ getStatusLabel(key.status) }}
              </span>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">
                {{ formatDate(key.createdAt) }}
              </p>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-2">
                <button
                  @click="$emit('edit', key)"
                  class="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                >
                  Nâng
                </button>
                <span class="text-gray-400">|</span>
                <button
                  @click="revokeKey(key)"
                  class="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Hạ
                </button>
                <span class="text-gray-400">|</span>
                <button
                  @click="$emit('delete', key)"
                  class="text-gray-600 hover:text-gray-800 text-sm"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface ApiKey {
  id: string
  key: string
  duration: number // days
  status: 'active' | 'expired' | 'revoked'
  createdAt: string
}

const keys = ref<ApiKey[]>([])

onMounted(() => {
  loadKeys()
})

const loadKeys = () => {
  const saved = localStorage.getItem('api_keys')
  if (saved) {
    keys.value = JSON.parse(saved).map((k: any) => {
      const expired = new Date(k.createdAt)
      expired.setDate(expired.getDate() + k.duration)
      const now = new Date()
      const status = k.status === 'revoked' ? 'revoked' : (now > expired ? 'expired' : 'active')
      return { ...k, status }
    })
  } else {
    // Dữ liệu mẫu
    keys.value = [
      {
        id: '1',
        key: 'sk_live_51N123abcXYZ',
        duration: 7,
        status: 'active',
        createdAt: new Date(Date.now() - 2*24*60*60*1000).toISOString()
      },
      {
        id: '2',
        key: 'sk_live_51N456defUVW',
        duration: 30,
        status: 'active',
        createdAt: new Date(Date.now() - 10*24*60*60*1000).toISOString()
      },
      {
        id: '3',
        key: 'sk_live_51N789ghiRST',
        duration: 14,
        status: 'expired',
        createdAt: new Date(Date.now() - 20*24*60*60*1000).toISOString()
      }
    ]
  }
}

const formatDuration = (days: number) => {
  if (days === 999) return 'Vĩnh viễn'
  return `${days} ngày`
}

const getStatusClass = (status: string) => {
  return {
    'bg-green-100 text-green-800 dark:bg-green-500/15 dark:text-green-500': status === 'active',
    'bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-500': status === 'expired',
    'bg-gray-100 text-gray-800 dark:bg-gray-500/15 dark:text-gray-500': status === 'revoked'
  }
}

const getStatusLabel = (status: string) => {
  return status === 'active' ? 'Hoạt động' : status === 'expired' ? 'Hết hạn' : 'Bị thu hồi'
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleString('vi-VN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

const copyKey = (key: string) => {
  navigator.clipboard.writeText(key)
  alert('Đã copy key!')
}

const revokeKey = (key: ApiKey) => {
  if (confirm(`Thu hồi key ${key.key}?`)) {
    const all = JSON.parse(localStorage.getItem('api_keys') || '[]')
    const updated = all.map((k: any) => k.id === key.id ? { ...k, status: 'revoked' } : k)
    localStorage.setItem('api_keys', JSON.stringify(updated))
    loadKeys()
  }
}

defineEmits(['edit', 'delete'])
</script>