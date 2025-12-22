<!-- src/views/Tools/PurchaseLicense.vue -->
<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center">
        <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span class="block">Mua License Key</span>
          <span
            class="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
          >
            Công Cụ Tools
          </span>
        </h1>
        <p
          class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
        >
          Chọn gói phù hợp với nhu cầu của bạn. Kích hoạt ngay lập tức sau khi thanh toán.
        </p>
      </div>

      <div id="purchase-confirmation" class="mb-12"></div>

      <!-- Purchase Button -->
      <div class="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        <div v-if="!selectedDuration" class="text-center py-4">
          <p class="text-xl text-gray-600">Vui lòng chọn một gói để xem chi tiết mua hàng.</p>
        </div>
        <div v-else>
          <h3 class="text-2xl font-bold text-gray-900 mb-6">Xác Nhận Mua Hàng</h3>

          <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
            <div class="flex justify-between items-center mb-4">
              <span class="text-gray-700 font-medium">Gói đã chọn:</span>
              <span class="text-xl font-bold text-gray-900">{{
                pricingPlans.find((p) => p.duration === selectedDuration)?.label
              }}</span>
            </div>
            <div class="flex justify-between items-center mb-4">
              <span class="text-gray-700 font-medium">Tổng thanh toán:</span>
              <span
                class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
              >
                {{ pricingPlans.find((p) => p.duration === selectedDuration)?.priceDisplay }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-700 font-medium">Số dư ví hiện tại:</span>
              <span
                :class="[
                  'text-lg font-bold',
                  balance >= (pricingPlans.find((p) => p.duration === selectedDuration)?.price || 0)
                    ? 'text-green-600'
                    : 'text-red-600',
                ]"
              >
                {{ formatCurrency(balance) }}
              </span>
            </div>
            <!-- Balance warning -->
            <div
              v-if="
                balance < (pricingPlans.find((p) => p.duration === selectedDuration)?.price || 0)
              "
              class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg"
            >
              <div class="flex items-center">
                <svg
                  class="w-5 h-5 text-red-600 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <span class="text-sm text-red-800 font-medium"
                  >Số dư ví không đủ để mua gói này!</span
                >
              </div>
            </div>
            <div class="flex justify-between">
              <div></div>
              <router-link to="/deposit">
                <Button
                  size="sm"
                  class="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white mt-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out flex items-center gap-2"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Nạp tiền vào ví
                </Button>
              </router-link>
            </div>
          </div>

          <!-- Info Alert -->
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div class="flex">
              <svg
                class="w-5 h-5 text-blue-600 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
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
            :disabled="!canPurchase || isPurchasing"
            :class="[
              'w-full py-4 px-6 font-bold rounded-xl shadow-lg transform transition-all duration-200 flex items-center justify-center gap-2',
              canPurchase && !isPurchasing
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 text-white'
                : 'bg-gray-400 text-gray-200 cursor-not-allowed',
            ]"
          >
            <svg
              v-if="isPurchasing"
              class="animate-spin h-5 w-5"
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
            <span v-if="isPurchasing">Đang xử lý...</span>
            <span v-else-if="!canPurchase">Không đủ số dư ví</span>
            <span v-else>
              <svg
                class="w-5 h-5 inline mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              Thanh Toán Ngay
            </span>
          </button>
        </div>
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
          <div
            v-if="plan.popular"
            class="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 text-xs font-bold rounded-bl-lg"
          >
            PHỔ BIẾN
          </div>

          <!-- Savings Badge -->
          <div
            v-if="'savings' in plan && plan.savings"
            class="absolute top-0 left-0 bg-green-500 text-white px-3 py-1 text-xs font-bold rounded-br-lg"
          >
            Tiết kiệm {{ plan.savings }}
          </div>

          <div class="p-6">
            <!-- Icon -->
            <div
              class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4"
            >
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
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
                <svg
                  class="w-5 h-5 text-green-500 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
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
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200',
              ]"
            >
              {{
                selectedDuration === plan.duration
                  ? 'Đã Chọn'
                  : getAvailableKeys(plan.duration) === 0
                    ? 'Hết Hàng'
                    : 'Chọn Gói Này'
              }}
            </button>
          </div>
        </div>
      </div>

      <!-- Success Modal -->
      <PurchaseSuccessModal
        v-if="showSuccessModal"
        :license-key="purchasedKey"
        :duration="durationBuyted"
        @close="closeSuccessModal"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useLicenseKeyStore } from '@/store/license_key.store'
import { useBillingStore } from '@/store/billing.store'
import { LICENSE_PRICING } from '@/constants'
import PurchaseSuccessModal from '@/components/licenses/PurchaseSuccessModal.vue'

// Store
const licenseKeyStore = useLicenseKeyStore()

// Router
const router = useRouter()

// State
const selectedDuration = ref<string | null>(null)
const isPurchasing = ref(false)
const showSuccessModal = ref(false)
const purchasedKey = ref('')
const durationBuyted = ref<string | null>(null)

// Stores
const billingStore = useBillingStore()

// Computed
const stats = computed(() => licenseKeyStore.stats)
const balance = computed(() => billingStore.balance?.balance || 0)

const pricingPlans = computed(() => {
  return Object.values(LICENSE_PRICING)
})

const canPurchase = computed(() => {
  if (!selectedDuration.value) return false
  const selectedPlan = pricingPlans.value.find((p) => p.duration === selectedDuration.value)
  return selectedPlan && balance.value >= selectedPlan.price
})

// Methods
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount)
}

const getAvailableKeys = (duration: string): number => {
  if (!stats.value?.byDuration) return 0
  const durationStats = stats.value.byDuration.find((d) => d.duration === duration)
  return durationStats?.available || 0
}

const selectPlan = (duration: string) => {
  if (getAvailableKeys(duration) === 0) return
  selectedDuration.value = duration

  // Scroll to purchase confirmation section on mobile
  const purchaseSection = document.getElementById('purchase-confirmation')
  if (purchaseSection) {
    purchaseSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const handlePurchase = async () => {
  if (!selectedDuration.value) return

  isPurchasing.value = true

  try {
    // Gọi API purchase
    const result = await licenseKeyStore.purchaseLicenseKey({
      duration: selectedDuration.value,
    })

    if (result) {
      purchasedKey.value = result.key
      durationBuyted.value = result.duration
      showSuccessModal.value = true
      selectedDuration.value = null

      // Reload stats
      await licenseKeyStore.getLicenseKeyStats()
    } else {
      alert('Có lỗi xảy ra khi mua license key. Vui lòng thử lại!')
    }
  } catch (error: unknown) {
    // Handle specific error messages
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Có lỗi xảy ra khi mua license key. Vui lòng thử lại!'

    if (errorMessage.includes('Số dư ví không đủ')) {
      const confirmed = confirm(
        'Số dư ví không đủ để mua license key này. Bạn có muốn nạp tiền vào ví không?',
      )
      if (confirmed) {
        router.push('/wallet')
      }
    } else if (errorMessage.includes('No available license key')) {
      alert('Hiện tại không còn license key cho gói này. Vui lòng thử lại sau!')
    } else if (errorMessage.includes('Gói license không hợp lệ')) {
      alert('Gói license không hợp lệ. Vui lòng chọn lại!')
    } else {
      alert(errorMessage)
    }
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
  await Promise.all([licenseKeyStore.getLicenseKeyStats(), billingStore.getBalance()])
})
</script>
