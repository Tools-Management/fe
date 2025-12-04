<!-- src/components/licenses/PurchaseSuccessModal.vue -->
<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full p-8 transform transition-all">
      <!-- Success Icon -->
      <div class="flex justify-center mb-6">
        <div class="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center animate-bounce">
          <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <!-- Title -->
      <h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
        🎉 Mua Hàng Thành Công!
      </h2>

      <p class="text-center text-gray-600 dark:text-gray-400 mb-8">
        Cảm ơn bạn đã mua license key. Dưới đây là key của bạn:
      </p>

      <!-- License Key Display -->
      <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 mb-6">
        <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">License Key:</div>
        <div class="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-4 border-2 border-dashed border-blue-300">
          <code class="text-xl font-bold text-gray-900 dark:text-white font-mono">
            {{ licenseKey }}
          </code>
          <button
            @click="copyToClipboard"
            class="ml-4 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            :title="copied ? 'Đã sao chép!' : 'Sao chép'"
          >
            <svg v-if="!copied" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
        <div v-if="copied" class="text-green-600 text-sm mt-2 text-center">✓ Đã sao chép vào clipboard!</div>
      </div>

      <!-- Info -->
      <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 mb-6">
        <div class="flex">
          <svg class="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div class="text-sm text-yellow-800 dark:text-yellow-200">
            <p class="font-medium mb-2">Lưu ý quan trọng:</p>
            <ul class="list-disc list-inside space-y-1">
              <li>Vui lòng sao chép và lưu lại license key này</li>
              <li>Key chỉ hiển thị một lần duy nhất</li>
              <li>Bạn có thể xem lại key trong mục "Keys Đã Mua"</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Details -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-400">Thời hạn</div>
          <div class="text-lg font-bold text-gray-900 dark:text-white">{{ getDurationLabel(duration) }}</div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-400">Trạng thái</div>
          <div class="text-lg font-bold text-green-600">Đã kích hoạt</div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex gap-3">
        <button
          @click="viewMyKeys"
          class="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
        >
          Xem Keys Đã Mua
        </button>
        <button
          @click="$emit('close')"
          class="flex-1 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-medium transition-colors"
        >
          Đóng
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  licenseKey: string
  duration: string | null
}>()

const emit = defineEmits<{
  close: []
}>()

const router = useRouter()
const copied = ref(false)

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.licenseKey)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 3000)
  } catch (error) {
    console.error('Failed to copy:', error)
  }
}

const getDurationLabel = (duration: string | null): string => {
  const durationMap: Record<string, string> = {
    '30d': '1 Tháng',
    '90d': '3 Tháng',
    '180d': '6 Tháng',
    '365d': '1 Năm',
  }
  return duration ? (durationMap[duration] || duration) : ''
}

const viewMyKeys = () => {
  emit('close')
  router.push('/my-keys')
}
</script>

