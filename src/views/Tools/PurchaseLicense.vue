<!-- src/views/Tools/PurchaseLicense.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span class="block">Mua License Key</span>
          <span class="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Công Cụ Tools
          </span>
        </h1>
        <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Chọn gói phù hợp với nhu cầu của bạn. Kích hoạt ngay lập tức sau khi thanh toán.
        </p>
      </div>

      
      <!-- Purchase Button -->
      <div v-if="selectedDuration" class="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h3 class="text-2xl font-bold text-gray-900 mb-6">Xác Nhận Mua Hàng</h3>
        
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
          <div class="flex justify-between items-center mb-4">
            <span class="text-gray-700 font-medium">Gói đã chọn:</span>
            <span class="text-xl font-bold text-gray-900">{{ pricingPlans.find(p => p.duration === selectedDuration)?.label }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-700 font-medium">Tổng thanh toán:</span>
            <span class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {{ pricingPlans.find(p => p.duration === selectedDuration)?.priceDisplay }}
            </span>
          </div>
        </div>

        <!-- Info Alert -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div class="flex">
            <svg class="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div class="text-sm text-blue-800">
              <p class="font-medium mb-1">Lưu ý:</p>
              <ul class="list-disc list-inside space-y-1">
                <li>License key sẽ được gửi ngay sau khi thanh toán thành công</li>
                <li>Mỗi key chỉ có thể kích hoạt trên 1 thiết bị</li>
                <li>Không hoàn tiền sau khi đã nhận key</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Purchase Button -->
        <button
          @click="handlePurchase"
          :disabled="isPurchasing"
          class="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          <svg v-if="isPurchasing" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span v-if="isPurchasing">Đang xử lý...</span>
          <span v-else>
            <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            Thanh Toán Ngay
          </span>
        </button>
      </div>

      <!-- Pricing Cards -->
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-12 mt-12">
        <div
          v-for="plan in pricingPlans"
          :key="plan.duration"
          @click="selectPlan(plan.duration)"
          class="relative bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          :class="{
            'ring-4 ring-blue-500': selectedDuration === plan.duration,
            'ring-2 ring-purple-200': plan.popular && selectedDuration !== plan.duration,
          }"
        >
          <!-- Popular Badge -->
          <div v-if="plan.popular" class="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 text-xs font-bold rounded-bl-lg">
            PHỔ BIẾN
          </div>

          <!-- Savings Badge -->
          <div v-if="plan.savings" class="absolute top-0 left-0 bg-green-500 text-white px-3 py-1 text-xs font-bold rounded-br-lg">
            Tiết kiệm {{ plan.savings }}
          </div>

          <div class="p-6">
            <!-- Icon -->
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>

            <!-- Plan Name -->
            <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ plan.label }}</h3>

            <!-- Price -->
            <div class="mb-6">
              <span class="text-4xl font-extrabold text-gray-900">{{ plan.priceDisplay }}</span>
            </div>

            <!-- Available Keys -->
            <div class="mb-6 p-3 bg-blue-50 rounded-lg">
              <div class="text-sm text-gray-600">Còn lại</div>
              <div class="text-2xl font-bold text-blue-600">
                {{ getAvailableKeys(plan.duration) }} keys
              </div>
            </div>

            <!-- Features -->
            <ul class="space-y-3 mb-6">
              <li v-for="feature in plan.features" :key="feature" class="flex items-start">
                <svg class="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-sm text-gray-600">{{ feature }}</span>
              </li>
            </ul>

            <!-- Select Button -->
            <button
              @click.stop="selectPlan(plan.duration)"
              :disabled="getAvailableKeys(plan.duration) === 0"
              class="w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200"
              :class="[
                selectedDuration === plan.duration
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : getAvailableKeys(plan.duration) === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              ]"
            >
              {{ selectedDuration === plan.duration ? 'Đã Chọn' : getAvailableKeys(plan.duration) === 0 ? 'Hết Hàng' : 'Chọn Gói Này' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Success Modal -->
      <PurchaseSuccessModal
        v-if="showSuccessModal"
        :license-key="purchasedKey"
        :duration="selectedDuration"
        @close="closeSuccessModal"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useLicenseKeyStore } from '@/store/license_key.store'
import { LICENSE_PRICING } from '@/constants'
import PurchaseSuccessModal from '@/components/licenses/PurchaseSuccessModal.vue'

// Store
const licenseKeyStore = useLicenseKeyStore()

// State
const selectedDuration = ref<string | null>(null)
const isPurchasing = ref(false)
const showSuccessModal = ref(false)
const purchasedKey = ref('')

// Computed
const stats = computed(() => licenseKeyStore.stats)
const totalCustomers = computed(() => stats.value?.used || 0)

const pricingPlans = computed(() => {
  return Object.values(LICENSE_PRICING)
})

// Methods
const getAvailableKeys = (duration: string): number => {
  if (!stats.value?.byDuration) return 0
  const durationStats = stats.value.byDuration.find(d => d.duration === duration)
  return durationStats?.available || 0
}

const selectPlan = (duration: string) => {
  if (getAvailableKeys(duration) === 0) return
  selectedDuration.value = duration
}

const handlePurchase = async () => {
  if (!selectedDuration.value) return

  isPurchasing.value = true

  try {
    // Giả lập thanh toán (trong thực tế sẽ tích hợp payment gateway)
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Gọi API purchase
    const result = await licenseKeyStore.purchaseLicenseKey({
      duration: selectedDuration.value
    })

    if (result) {
      purchasedKey.value = result.key
      showSuccessModal.value = true
      selectedDuration.value = null

      // Reload stats
      await licenseKeyStore.getLicenseKeyStats()
    } else {
      alert('Có lỗi xảy ra khi mua license key. Vui lòng thử lại!')
    }
  } catch (error) {
    console.error('Purchase error:', error)
    alert('Có lỗi xảy ra khi mua license key. Vui lòng thử lại!')
  } finally {
    isPurchasing.value = false
  }
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
  purchasedKey.value = ''
}

// Lifecycle
onMounted(async () => {
  await licenseKeyStore.getLicenseKeyStats()
})
</script>

