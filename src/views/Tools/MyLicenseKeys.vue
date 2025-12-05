<!-- src/views/Tools/MyLicenseKeys.vue -->
<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Keys Đã Mua</h1>
            <p class="mt-2 text-gray-600">Quản lý các license key bạn đã mua</p>
          </div>
          <router-link
            to="/purchase-license"
            class="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-medium shadow-lg transition-all"
          >
            <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Mua Thêm Key
          </router-link>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <!-- Empty State -->
      <div v-else-if="!myKeys || myKeys.length === 0" class="bg-white rounded-2xl shadow-lg p-12 text-center">
        <svg class="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Chưa có license key nào</h3>
        <p class="text-gray-600 mb-6">Bạn chưa mua license key nào. Hãy mua ngay để sử dụng công cụ!</p>
        <router-link
          to="/purchase-license"
          class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-medium shadow-lg transition-all"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          Mua License Key
        </router-link>
      </div>

      <!-- Keys Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="licenseKey in myKeys"
          :key="licenseKey.id"
          class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
        >
          <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <div>
                  <div class="text-white font-semibold">{{ getDurationLabel(licenseKey.duration) }}</div>
                  <div class="text-white/80 text-sm">License Key</div>
                </div>
              </div>
              <span :class="[
                'px-3 py-1 rounded-full text-xs font-semibold',
                licenseKey.isActive ? 'bg-green-400 text-green-900' : 'bg-red-400 text-red-900'
              ]">
                {{ licenseKey.isActive ? 'Đang hoạt động' : 'Không hoạt động' }}
              </span>
            </div>
          </div>

          <div class="p-6">
            <!-- License Key Display -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Key:</label>
              <div class="flex items-center bg-gray-50 rounded-lg p-3 border border-gray-200">
                <code class="flex-1 text-sm font-mono text-gray-900 break-all">
                  {{ licenseKey.key }}
                </code>
                <button
                  @click="copyKey(licenseKey.key)"
                  class="ml-2 p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  :title="copiedKeyId === licenseKey.id ? 'Đã sao chép!' : 'Sao chép'"
                >
                  <svg v-if="copiedKeyId !== licenseKey.id" class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <svg v-else class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Info Grid -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <div class="text-xs text-gray-500 mb-1">Ngày mua</div>
                <div class="text-sm font-semibold text-gray-900">
                  {{ formatDate(licenseKey.purchasedAt) }}
                </div>
              </div>
              <div>
                <div class="text-xs text-gray-500 mb-1">Ngày tạo</div>
                <div class="text-sm font-semibold text-gray-900">
                  {{ formatDate(licenseKey.createdAt) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useLicenseKeyStore } from '@/store/license_key.store'

// Store
const licenseKeyStore = useLicenseKeyStore()

// State
const copiedKeyId = ref<number | null>(null)

// Computed
const myKeys = computed(() => licenseKeyStore.myLicenseKeys)
const loading = computed(() => licenseKeyStore.loading)

// Methods
const copyKey = async (key: string) => {
  try {
    await navigator.clipboard.writeText(key)
    const keyItem = myKeys.value.find(k => k.key === key)
    if (keyItem) {
      copiedKeyId.value = keyItem.id
      setTimeout(() => {
        copiedKeyId.value = null
      }, 3000)
    }
  } catch (error) {
    console.error('Failed to copy:', error)
  }
}

const getDurationLabel = (duration: string): string => {
  const durationMap: Record<string, string> = {
    '1d': '1 Ngày',
    '7d': '7 Ngày',
    '30d': '1 Tháng',
    '90d': '3 Tháng',
    '180d': '6 Tháng',
    '365d': '1 Năm',
  }
  return durationMap[duration] || duration
}

const formatDate = (date: string | null | undefined): string => {
  if (!date) return '-'
  const d = new Date(date)
  return d.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Lifecycle
onMounted(async () => {
  await licenseKeyStore.getMyLicenseKeys()
})
</script>

