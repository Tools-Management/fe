<!-- src/components/licenses/GenerateLicenseKeysModal.vue -->
<template>
  <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
    <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6">
      <div class="flex justify-between items-start mb-4">
        <h2 class="text-2xl font-bold">Tạo Nhiều License Keys</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
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

      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">Số lượng keys</label>
          <input
            v-model.number="form.quantity"
            type="number"
            min="1"
            max="100"
            required
            placeholder="Nhập số lượng..."
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          />
          <p class="text-xs text-gray-500 mt-1">Tối đa 100 keys mỗi lần</p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Thời hạn</label>
          <select
            v-model="form.duration"
            required
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="">Chọn thời hạn</option>
            <option value="7d">7 ngày</option>
            <option value="30d">30 ngày</option>
            <option value="90d">90 ngày</option>
            <option value="180d">180 ngày</option>
            <option value="365d">365 ngày</option>
          </select>
        </div>


        <div v-if="generatedKeys.length > 0" class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h3 class="text-sm font-medium mb-2">Keys đã tạo:</h3>
          <div class="max-h-32 overflow-y-auto space-y-1">
            <div
              v-for="key in generatedKeys"
              :key="key"
              class="text-xs font-mono bg-white dark:bg-gray-700 p-2 rounded border"
            >
              {{ key }}
            </div>
          </div>
        </div>

        <div class="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            Hủy
          </button>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg flex items-center gap-2"
          >
            <svg
              v-if="isSubmitting"
              class="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {{ isSubmitting ? 'Đang tạo...' : 'Tạo License Keys' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLicenseKeyStore } from '@/store/license_key.store'
import type { IGenerateLicenseKeysRequest } from '@/types/license'

const emit = defineEmits<{
  close: []
}>()

const licenseKeyStore = useLicenseKeyStore()
const isSubmitting = ref(false)
const generatedKeys = ref<string[]>([])

const form = ref<IGenerateLicenseKeysRequest>({
  quantity: 1,
  duration: '',
})


const submit = async () => {
  if (!form.value.quantity || form.value.quantity < 1 || !form.value.duration) return

  isSubmitting.value = true
  generatedKeys.value = []

  try {
    await licenseKeyStore.generateLicenseKeys(form.value)
      emit('close')
  } catch (error) {
    console.error('Failed to generate license keys:', error)
    alert('Có lỗi xảy ra khi tạo license keys!')
  } finally {
    isSubmitting.value = false
  }
}
</script>
