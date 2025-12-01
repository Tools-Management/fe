<!-- src/components/licenses/UpgradeLicenseModal.vue -->
<template>
  <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
    <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6">
      <div class="flex justify-between items-start mb-4">
        <h2 class="text-2xl font-bold">Nâng Cấp License</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">Email hiện tại</label>
          <input
            v-model="form.email"
            type="email"
            required
            placeholder="Nhập email của license hiện tại..."
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Machine ID hiện tại</label>
          <input
            v-model="form.machineId"
            type="text"
            required
            placeholder="Nhập machine ID hiện tại..."
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 font-mono"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">License Key mới</label>
          <input
            v-model="form.newLicenseKey"
            type="text"
            required
            placeholder="Nhập license key mới..."
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 font-mono"
          />
          <p class="text-xs text-gray-500 mt-1">License key mới phải có thời hạn dài hơn license hiện tại</p>
        </div>

        <div class="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
          <div class="flex items-start">
            <svg class="w-5 h-5 text-orange-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div class="text-sm">
              <p class="font-medium text-orange-800 dark:text-orange-200">Lưu ý quan trọng:</p>
              <ul class="mt-1 text-orange-700 dark:text-orange-300 space-y-1">
                <li>• License hiện tại sẽ được thay thế hoàn toàn</li>
                <li>• Thời hạn mới sẽ được tính từ thời điểm nâng cấp</li>
                <li>• Đảm bảo license key mới có thời hạn dài hơn</li>
                <li>• Không thể hoàn tác thao tác này</li>
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
            class="px-4 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white rounded-lg flex items-center gap-2"
          >
            <svg v-if="isSubmitting" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isSubmitting ? 'Đang nâng cấp...' : 'Nâng Cấp License' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLicenseStore } from '@/store/license.store'
import type { IUpgradeLicenseRequest } from '@/types/license'

const emit = defineEmits<{
  close: []
  upgraded: []
}>()

const licenseStore = useLicenseStore()
const isSubmitting = ref(false)

const form = ref<IUpgradeLicenseRequest>({
  email: '',
  machineId: '',
  newLicenseKey: ''
})

const submit = async () => {
  if (!form.value.email || !form.value.machineId || !form.value.newLicenseKey) return

  isSubmitting.value = true
  try {
    await licenseStore.upgradeLicense(form.value)
    form.value = { email: '', machineId: '', newLicenseKey: '' } // Reset form
    alert('License đã được nâng cấp thành công!')
    emit('upgraded')
  } catch (error) {
    console.error('Failed to upgrade license:', error)
    alert('Có lỗi xảy ra khi nâng cấp license!')
  } finally {
    isSubmitting.value = false
  }
}
</script>
