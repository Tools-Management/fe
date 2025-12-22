<!-- src/views/Pages/WalletDashboard.vue -->
<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h1
        class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent"
      >
        Ví của tôi
      </h1>
      <div class="flex items-center gap-4">
        <button
          @click="handleTopup"
          class="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Nạp tiền
        </button>
      </div>
    </div>

    <!-- Balance Card -->
    <div class="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-green-100 text-sm font-medium">Số dư hiện tại</p>
          <p class="text-3xl font-bold mt-1">
            {{ formatCurrency(balance?.balance || 0) }}
          </p>
          <p class="text-green-100 text-sm mt-2">Tiền tệ: {{ balance?.currency || 'VND' }}</p>
        </div>
        <div class="opacity-20">
          <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
            />
          </svg>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Recent Transactions -->
      <div class="md:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Giao dịch gần đây</h3>
          <router-link
            to="/transaction-history"
            class="text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm font-medium"
          >
            Xem tất cả →
          </router-link>
        </div>

        <div
          v-if="recentTopups.length === 0"
          class="text-center py-8 text-gray-500 dark:text-gray-400"
        >
          <svg
            class="w-12 h-12 mx-auto mb-4 opacity-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V9l4-4m-8 8v4a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2h2m4 0V5a2 2 0 012-2h4a2 2 0 012 2v6a2 2 0 01-2 2h-2"
            />
          </svg>
          <p>Chưa có giao dịch nào</p>
        </div>

        <div v-else class="space-y-3">
          <div
            v-for="topup in recentTopups"
            :key="topup.id"
            class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div class="flex items-center gap-3">
              <div class="p-2 bg-green-100 dark:bg-green-900/50 rounded-full">
                <svg
                  class="w-4 h-4 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <div>
                <p class="font-medium text-gray-900 dark:text-gray-100">{{ topup.topupCode }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ formatDate(topup.createdAt) }}
                </p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-semibold text-green-600">+{{ formatCurrency(topup.amount) }}</p>
              <span
                :class="[
                  'text-xs px-2 py-1 rounded-full font-medium',
                  {
                    'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500':
                      topup.status === 'completed',
                    'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-400':
                      topup.status === 'pending',
                    'bg-error-50 text-error-700 dark:bg-error-500/15 dark:text-error-500':
                      topup.status === 'failed',
                  },
                ]"
              >
                {{ getStatusLabel(topup.status) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Wallet Stats -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Thống kê</h3>

        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600 dark:text-gray-400">Tổng nạp tháng này</span>
            <span class="font-semibold text-green-600">{{ formatCurrency(monthlyTotal) }}</span>
          </div>

          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600 dark:text-gray-400">Giao dịch thành công</span>
            <span class="font-semibold text-blue-600">{{ successfulTransactions }}</span>
          </div>

          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600 dark:text-gray-400">Đang xử lý</span>
            <span class="font-semibold text-yellow-600">{{ pendingTransactions }}</span>
          </div>
        </div>

        <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <router-link
            to="/transaction-history"
            class="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V9l4-4m-8 8v4a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2h2m4 0V5a2 2 0 012-2h4a2 2 0 012 2v6a2 2 0 01-2 2h-2"
              />
            </svg>
            Xem lịch sử
          </router-link>
        </div>
      </div>
    </div>

    <!-- TopUp Modal -->
    <TopUpModal
      v-if="showTopupModal"
      @close="showTopupModal = false"
      @success="handleTopupSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useBillingStore } from '@/store/billing.store'
import TopUpModal from '@/components/billing/TopUpModal.vue'
import { useRouter } from 'vue-router'

// Store
const billingStore = useBillingStore()
const router = useRouter();

// Reactive data
const showTopupModal = ref(false)

// Computed
const balance = computed(() => billingStore.balance)
const recentTopups = computed(() => {
  const topups = billingStore.topupHistory?.topups || []
  return topups.slice(0, 5) // Show only 5 recent transactions
})

const monthlyTotal = computed(() => {
  const thisMonth = new Date()
  thisMonth.setDate(1) // First day of current month

  return (billingStore.topupHistory?.topups || [])
    .filter((topup) => {
      const topupDate = new Date(topup.createdAt)
      return topupDate >= thisMonth && topup.status === 'completed'
    })
    .reduce((sum, topup) => sum + topup.amount, 0)
})

const successfulTransactions = computed(() => {
  return (billingStore.topupHistory?.topups || []).filter((topup) => topup.status === 'completed')
    .length
})

const pendingTransactions = computed(() => {
  return (billingStore.topupHistory?.topups || []).filter((topup) => topup.status === 'pending')
    .length
})

// Methods
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount)
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

const getStatusLabel = (status: string) => {
  const statusLabels: Record<string, string> = {
    pending: 'Đang xử lý',
    processing: 'Đang xử lý',
    completed: 'Hoàn thành',
    cancelled: 'Đã hủy',
    refunded: 'Đã hoàn tiền',
    failed: 'Thất bại',
  }
  return statusLabels[status] || status
}

const handleTopup = () => {
  router.push({ name: 'TopupPage' })
  // showTopupModal.value = true
}

const handleTopupSuccess = (paymentUrl: string) => {
  // Refresh data
  billingStore.getBalance()
  billingStore.getTopupHistory({
    page: 1,
    limit: 5,
  })

  // Redirect to payment URL
  if (paymentUrl) {
    window.open(paymentUrl, '_blank', 'noopener,noreferrer')
  }
}

// Lifecycle
onMounted(async () => {
  await billingStore.getWallet()
  await billingStore.getBalance()
  await billingStore.getTopupHistory({
    page: 1,
    limit: 5,
  }) // Load only recent 5 transactions
})
</script>
