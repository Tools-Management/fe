<!-- src/components/licenses/SyncLicenseKeysModal.vue -->
<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white">
          Đồng Bộ License Keys
        </h2>
        <button
          @click="$emit('close')"
          class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form @submit.prevent="handleSync" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            External API Token <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.token"
            type="password"
            required
            placeholder="Nhập token của External API"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Token này dùng để xác thực với External API
          </p>
        </div>

        <!-- Info Box -->
        <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
          <div class="flex">
            <svg class="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div class="text-sm text-blue-800 dark:text-blue-300">
              <p class="font-medium mb-1">Quá trình đồng bộ sẽ:</p>
              <ul class="list-disc list-inside space-y-1">
                <li>Lấy tất cả keys từ External API</li>
                <li>Tạo mới keys chưa có trong database</li>
                <li>Cập nhật thông tin keys đã tồn tại</li>
                <li>Không ảnh hưởng đến keys đã được mua</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Result Message -->
        <div v-if="syncResult" class="rounded-lg p-4" :class="{
          'bg-green-50 border border-green-200': syncResult.success,
          'bg-red-50 border border-red-200': !syncResult.success
        }">
          <div class="flex">
            <svg v-if="syncResult.success" class="w-5 h-5 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg v-else class="w-5 h-5 text-red-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div class="text-sm" :class="{
              'text-green-800': syncResult.success,
              'text-red-800': !syncResult.success
            }">
              <p class="font-medium">{{ syncResult.message }}</p>
              <p v-if="syncResult.success && syncResult.data" class="mt-1">
                Đã đồng bộ: <strong>{{ syncResult.data.synced }}</strong> keys mới,
                Bỏ qua: <strong>{{ syncResult.data.skipped }}</strong> keys đã tồn tại
              </p>
            </div>
          </div>
        </div>

        <div class="flex gap-3 pt-4">
          <button
            type="button"
            @click="$emit('close')"
            class="flex-1 px-4 py-2.5 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition"
            :disabled="isLoading"
          >
            Đóng
          </button>
          <button
            type="submit"
            :disabled="isLoading || !form.token"
            class="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg font-medium transition flex items-center justify-center gap-2"
          >
            <svg v-if="isLoading" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {{ isLoading ? 'Đang đồng bộ...' : 'Đồng Bộ' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLicenseKeyStore } from '@/store/license_key.store'

// Emits
const emit = defineEmits<{
  close: []
  synced: [result: { synced: number; skipped: number }]
}>()

// Store
const licenseKeyStore = useLicenseKeyStore()

// State
const form = ref({
  token: ''
})

const isLoading = ref(false)
const syncResult = ref<{
  success: boolean
  message: string
  data?: { synced: number; skipped: number }
} | null>(null)

// Methods
const handleSync = async () => {
  if (!form.value.token) {
    syncResult.value = {
      success: false,
      message: 'Vui lòng nhập token'
    }
    return
  }

  isLoading.value = true
  syncResult.value = null

  try {
    const result = await licenseKeyStore.syncLicenseKeys(form.value.token)
    
    if (result) {
      syncResult.value = {
        success: true,
        message: 'Đồng bộ thành công!',
        data: result
      }
      emit('synced', result)
      
      // Auto close after 2 seconds
      setTimeout(() => {
        emit('close')
      }, 2000)
    }
  } catch (error) {
    syncResult.value = {
      success: false,
      message: error instanceof Error ? error.message : 'Có lỗi xảy ra khi đồng bộ'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

