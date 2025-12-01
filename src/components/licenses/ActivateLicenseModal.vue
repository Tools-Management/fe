<!-- src/components/licenses/ActivateLicenseModal.vue -->
<template>
  <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
    <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6">
      <div class="flex justify-between items-start mb-4">
        <h2 class="text-2xl font-bold">Kích Hoạt License</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">Email</label>
          <input
            v-model="form.email"
            type="email"
            required
            placeholder="Nhập email..."
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Machine ID</label>
          <input
            v-model="form.machineId"
            type="text"
            required
            placeholder="Nhập machine ID..."
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 font-mono"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">License Key</label>
          <input
            v-model="form.licenseKey"
            type="text"
            required
            placeholder="Nhập license key..."
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 font-mono"
          />
        </div>

        <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <div class="flex items-start">
            <svg class="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div class="text-sm">
              <p class="font-medium text-blue-800 dark:text-blue-200">Lưu ý:</p>
              <ul class="mt-1 text-blue-700 dark:text-blue-300 space-y-1">
                <li>• License key phải hợp lệ và chưa được sử dụng</li>
                <li>• Machine ID phải khớp với thiết bị của người dùng</li>
                <li>• Email sẽ được sử dụng để xác thực</li>
              </ul>
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
            <svg v-if="isSubmitting" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isSubmitting ? 'Đang kích hoạt...' : 'Kích Hoạt License' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLicenseStore } from '@/store/license.store'
import type { ILicenseRequest } from '@/types/license'

const emit = defineEmits<{
  close: []
  activated: []
}>()

const licenseStore = useLicenseStore()
const isSubmitting = ref(false)

const form = ref<ILicenseRequest>({
  email: '',
  machineId: '',
  licenseKey: ''
})

const submit = async () => {
  if (!form.value.email || !form.value.machineId || !form.value.licenseKey) return

  isSubmitting.value = true
  try {
    await licenseStore.activateLicense(form.value)
    form.value = { email: '', machineId: '', licenseKey: '' } // Reset form
    alert('License đã được kích hoạt thành công!')
    emit('activated')
  } catch (error) {
    console.error('Failed to activate license:', error)
    alert('Có lỗi xảy ra khi kích hoạt license!')
  } finally {
    isSubmitting.value = false
  }
}
</script>
