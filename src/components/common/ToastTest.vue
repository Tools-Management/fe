<template>
  <div class="p-6 space-y-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
    <h2 class="text-xl font-bold">🧪 Toast Test</h2>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <button
        @click="testSuccess"
        class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm transition-colors"
      >
        Success
      </button>

      <button
        @click="testError"
        class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-colors"
      >
        Error
      </button>

      <button
        @click="testWarn"
        class="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm transition-colors"
      >
        Warning
      </button>

      <button
        @click="testInfo"
        class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-colors"
      >
        Info
      </button>
    </div>

    <div class="text-sm text-gray-600 dark:text-gray-400">
      Click buttons above to test PrimeVue Toast functionality
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '@/composables/useToast'

const { toastSuccess, toastError, toastWarn, toastInfo } = useToast()

const testSuccess = () => {
  toastSuccess('🎉 This is a success message!')
}

const testError = () => {
  toastError('❌ This is an error message!')
}

const testWarn = () => {
  toastWarn('⚠️ This is a warning message!')
}

const testInfo = () => {
  toastInfo('ℹ️ This is an info message!')
}
</script>
