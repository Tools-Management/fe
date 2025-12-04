<!-- src/components/licenses/EditLicenseKeyModal.vue -->
<template>
  <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
    <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6">
      <div class="flex justify-between items-start mb-4">
        <h2 class="text-2xl font-bold">Chỉnh Sửa License Key</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">License Key</label>
          <input
            v-model="form.key"
            type="text"
            required
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 bg-gray-100"
            readonly
          />
          <p class="text-xs text-gray-500 mt-1">Không thể thay đổi license key</p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Thời hạn</label>
          <select
            v-model="form.duration"
            required
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="7d">7 ngày</option>
            <option value="30d">30 ngày</option>
            <option value="90d">90 ngày</option>
            <option value="180d">180 ngày</option>
            <option value="365d">365 ngày</option>
          </select>
        </div>

        <div class="flex items-center">
          <input
            v-model="form.isActive"
            type="checkbox"
            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label class="ml-2 block text-sm">
            Kích hoạt
          </label>
        </div>

        <div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-sm">
          <div class="grid grid-cols-2 gap-2">
            <div>
              <span class="font-medium">Đã sử dụng:</span>
              <span class="ml-1">{{ licenseKey?.usedCount ?? 0 }} lần</span>
            </div>
            <div>
              <span class="font-medium">Ngày tạo:</span>
              <span class="ml-1">{{ formatDate(licenseKey.createdAt) }}</span>
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
            :disabled="isSubmitting || !hasChanges"
            class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-lg flex items-center gap-2"
          >
            <svg v-if="isSubmitting" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isSubmitting ? 'Đang cập nhật...' : 'Cập Nhật' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useLicenseKeyStore } from '@/store/license_key.store'
import type { ILicenseKey, IUpdateLicenseKeyRequest } from '@/types/license'

const props = defineProps<{
  licenseKey: ILicenseKey
}>()

const emit = defineEmits<{
  close: []
  updated: []
}>()

const licenseKeyStore = useLicenseKeyStore()
const isSubmitting = ref(false)

const form = ref<IUpdateLicenseKeyRequest>({
  duration: props.licenseKey.duration,
  isActive: props.licenseKey.isActive
})

const hasChanges = computed(() => {
  return form.value.duration !== props.licenseKey.duration ||
         form.value.isActive !== props.licenseKey.isActive
})

// Update form when licenseKey changes
watch(() => props.licenseKey, (newLicenseKey) => {
  form.value = {
    duration: newLicenseKey.duration,
    isActive: newLicenseKey.isActive
  }
}, { immediate: true })

const submit = async () => {
  if (!hasChanges.value) return

  isSubmitting.value = true
  try {
    await licenseKeyStore.updateLicenseKey(props.licenseKey.id.toString(), form.value)
    emit('updated')
  } catch {
    console.error('Failed to update license key')
    alert('Có lỗi xảy ra khi cập nhật license key!')
  } finally {
    isSubmitting.value = false
  }
}

const formatDate = (date: string): string => {
  const d = new Date(date)
  return d.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}
</script>
