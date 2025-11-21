<!-- src/components/keys/AddKeyModal.vue -->
<template>
  <div class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
    <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
      <h2 class="text-2xl font-bold mb-5 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
        Tạo API Key Mới
      </h2>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Thời hạn key
          </label>
          <select
            v-model="duration"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm"
          >
            <option :value="7">7 ngày</option>
            <option :value="14">14 ngày</option>
            <option :value="30">30 ngày</option>
            <option :value="999">Vĩnh viễn</option>
          </select>
        </div>
      </div>

      <div class="flex gap-3 mt-6">
        <button
          @click="$emit('close')"
          class="flex-1 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium"
        >
          Hủy
        </button>
        <button
          @click="createKey"
          class="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-2.5 rounded-lg font-medium hover:shadow-lg transition"
        >
          Tạo Key
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const duration = ref(7)

const createKey = () => {
  const newKey = {
    id: Date.now().toString(),
    key: `sk_live_${Math.random().toString(36).substr(2, 12).toUpperCase()}`,
    duration: duration.value,
    status: 'active',
    createdAt: new Date().toISOString()
  }

  const saved = JSON.parse(localStorage.getItem('api_keys') || '[]')
  saved.unshift(newKey)
  localStorage.setItem('api_keys', JSON.stringify(saved))

  alert(`Key đã tạo:\n${newKey.key}\nHạn: ${duration.value === 999 ? 'Vĩnh viễn' : duration.value + ' ngày'}`)
  emit('created')
}

const emit = defineEmits(['close', 'created'])
</script>