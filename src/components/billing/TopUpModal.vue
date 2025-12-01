<!-- src/components/billing/TopUpModal.vue -->
<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Nạp Tiền Vào Tài Khoản</h3>
        <button
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="p-6 space-y-6">
        <!-- Current Balance -->
        <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-green-700 dark:text-green-300">Số dư hiện tại</span>
            <span class="text-lg font-bold text-green-800 dark:text-green-200">{{ formatCurrency(balance.current) }}</span>
          </div>
        </div>

        <!-- Amount Selection -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Chọn số tiền nạp
          </label>
          <div class="grid grid-cols-2 gap-3 mb-4">
            <button
              v-for="amount in presetAmounts"
              :key="amount"
              @click="selectedAmount = amount"
              :class="[
                'p-3 rounded-lg border-2 text-center font-medium transition-colors',
                selectedAmount === amount
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
              ]"
            >
              {{ formatCurrency(amount) }}
            </button>
          </div>

          <!-- Custom Amount -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Hoặc nhập số tiền tùy chỉnh
            </label>
            <input
              v-model.number="customAmount"
              type="number"
              min="10000"
              max="10000000"
              step="10000"
              placeholder="Nhập số tiền (VNĐ)"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-300"
              @input="handleCustomAmountInput"
            />
          </div>
        </div>

        <!-- Payment Method Selection -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Chọn phương thức thanh toán
          </label>
          <div class="space-y-3">
            <div
              v-for="method in paymentMethods"
              :key="method.id"
              @click="selectedMethod = method.id"
              :class="[
                'p-4 rounded-lg border-2 cursor-pointer transition-all',
                selectedMethod === method.id
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              ]"
            >
              <div class="flex items-center gap-3">
                <div
                  :class="[
                    'p-2 rounded-lg',
                    method.color
                  ]"
                >
                  <div class="w-5 h-5 bg-current rounded" :class="method.color.split(' ')[0]"></div>
                </div>
                <div>
                  <div class="font-medium text-gray-900 dark:text-gray-100">{{ method.name }}</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">{{ method.description }}</div>
                </div>
                <div v-if="selectedMethod === method.id" class="ml-auto">
                  <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Summary -->
        <div v-if="selectedAmount > 0" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h4 class="font-medium text-gray-900 dark:text-gray-100 mb-2">Tóm tắt giao dịch</h4>
          <div class="space-y-1 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Số tiền nạp:</span>
              <span class="font-medium text-gray-900 dark:text-gray-100">{{ formatCurrency(selectedAmount) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Phí giao dịch:</span>
              <span class="font-medium text-gray-900 dark:text-gray-100">{{ formatCurrency(0) }}</span>
            </div>
            <div class="flex justify-between border-t border-gray-200 dark:border-gray-600 pt-1 mt-2">
              <span class="font-medium text-gray-900 dark:text-gray-100">Tổng thanh toán:</span>
              <span class="font-bold text-green-600">{{ formatCurrency(selectedAmount) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
        <button
          @click="$emit('close')"
          class="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Hủy
        </button>
        <button
          @click="handleProceedToPayment"
          :disabled="!canProceed"
          class="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
        >
          {{ isProcessing ? 'Đang xử lý...' : 'Tiếp tục thanh toán' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useBillingStore } from '@/store/billing.store'
import type { TopUpResponse, PaymentMethod } from '@/types/billing'

// Props & Emits
const emit = defineEmits<{
  close: []
  success: [data: TopUpResponse]
}>()

// Store
const billingStore = useBillingStore()

// Reactive data
const selectedAmount = ref(0)
const customAmount = ref('')
const selectedMethod = ref('')
const isProcessing = ref(false)

// Computed
const balance = computed(() => billingStore.balance)

const presetAmounts = [50000, 100000, 200000, 500000]

const paymentMethods: PaymentMethod[] = [
  {
    id: 'zalopay',
    name: 'ZaloPay',
    description: 'Thanh toán nhanh qua ZaloPay',
    color: 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400',
    icon: 'ZaloPayIcon'
  },
  {
    id: 'momo',
    name: 'MoMo',
    description: 'Ví điện tử MoMo',
    color: 'bg-pink-100 dark:bg-pink-900/50 text-pink-600 dark:text-pink-400',
    icon: 'MomoIcon'
  },
  {
    id: 'payos',
    name: 'PayOS',
    description: 'Thanh toán đa dạng',
    color: 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400',
    icon: 'PayOSIcon'
  },
  {
    id: 'atm',
    name: 'ATM/Internet Banking',
    description: 'Chuyển khoản ngân hàng',
    color: 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400',
    icon: 'BankIcon'
  },
  {
    id: 'qr',
    name: 'QR Code',
    description: 'Quét mã QR để thanh toán',
    color: 'bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400',
    icon: 'QRIcon'
  }
]

const canProceed = computed(() => {
  return selectedAmount.value > 0 && selectedMethod.value && !isProcessing.value
})

// Methods
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

const handleCustomAmountInput = () => {
  const amount = Number(customAmount.value)
  if (amount >= 10000) {
    selectedAmount.value = amount
  } else if (customAmount.value === '') {
    selectedAmount.value = 0
  }
}

const handleProceedToPayment = async () => {
  if (!canProceed.value) return

  isProcessing.value = true

  try {
    // Mock API call to create payment order
    const response = await billingStore.createTopUpOrder({
      amount: selectedAmount.value,
      method: selectedMethod.value
    })

    if (response.success) {
      // Redirect to payment gateway (mock)
      console.log('Redirecting to payment URL:', response.payUrl)

      // For demo purposes, we'll simulate success
      setTimeout(() => {
        billingStore.addTransaction({
          id: Date.now().toString(),
          type: 'deposit',
          amount: selectedAmount.value,
          description: `Nạp tiền qua ${paymentMethods.find(m => m.id === selectedMethod.value)?.name}`,
          status: 'completed',
          createdAt: new Date().toISOString()
        })

        // Update balance
        billingStore.updateBalance(selectedAmount.value, 'add')

        isProcessing.value = false
        emit('success', response)
      }, 2000)
    }
  } catch (error) {
    console.error('Payment creation failed:', error)
    isProcessing.value = false
  }
}

// Watch for preset amount selection to clear custom amount
watch(selectedAmount, (newAmount) => {
  if (presetAmounts.includes(newAmount)) {
    customAmount.value = ''
  }
})
</script>

