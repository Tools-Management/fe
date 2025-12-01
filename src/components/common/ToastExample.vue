<template>
  <div class="p-6 space-y-4">
    <h2 class="text-xl font-bold">Toast Demo</h2>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <button
        @click="showSuccess"
        class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
      >
        Success Toast
      </button>

      <button
        @click="showError"
        class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
      >
        Error Toast
      </button>

      <button
        @click="showWarn"
        class="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
      >
        Warning Toast
      </button>

      <button
        @click="showInfo"
        class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
      >
        Info Toast
      </button>
    </div>

    <div class="space-y-2">
      <button
        @click="showCustomToast"
        class="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
      >
        Custom Toast
      </button>

      <button
        @click="clearAllToast"
        class="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors ml-2"
      >
        Clear All
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '@/composables/useToast'

const { toastSuccess, toastError, toastWarn, toastInfo, showToast, clearToast } = useToast()

const showSuccess = () => {
  toastSuccess('Đã lưu thành công!')
}

const showError = () => {
  toastError('Có lỗi xảy ra khi xử lý dữ liệu')
}

const showWarn = () => {
  toastWarn('Cảnh báo: Dữ liệu chưa được lưu')
}

const showInfo = () => {
  toastInfo('Hệ thống đang đồng bộ dữ liệu...')
}

const showCustomToast = () => {
  showToast({
    severity: 'success',
    summary: 'Upload thành công',
    detail: 'File đã được upload và xử lý xong',
    life: 5000,
    closable: true
  })
}

const clearAllToast = () => {
  clearToast()
}
</script>
