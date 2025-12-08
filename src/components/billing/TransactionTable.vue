<!-- src/components/billing/TransactionTable.vue -->
<template>
  <div class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <table class="min-w-full">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="px-5 py-3 text-left w-3/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Phương thức</p>
            </th>
            <th class="px-5 py-3 text-left w-4/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Mô tả</p>
            </th>
            <th class="px-5 py-3 text-left w-2/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Số tiền</p>
            </th>
            <th class="px-5 py-3 text-left w-2/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Trạng thái</p>
            </th>
            <th class="px-5 py-3 text-left w-1/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Thời gian</p>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr
            v-for="transaction in transactions"
            :key="transaction.id"
            class="border-t border-gray-100 dark:border-gray-800"
          >
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-green-100 dark:bg-green-900/50 rounded-full">
                  <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <span class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ getPaymentMethodName(transaction.paymentMethod) }}</span>
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ transaction.topupCode }}</p>
              <p v-if="transaction.notes" class="text-xs text-gray-400 dark:text-gray-500">{{ transaction.notes }}</p>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <span class="text-sm font-semibold text-green-600">
                +{{ formatCurrency(transaction.amount) }}
              </span>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <span
                :class="[
                  'rounded-full px-2 py-0.5 text-theme-xs font-medium',
                  {
                    'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500':
                      transaction.status === 'completed',
                    'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-400':
                      transaction.status === 'pending',
                    'bg-error-50 text-error-700 dark:bg-error-500/15 dark:text-error-500':
                      transaction.status === 'failed' || transaction.status === 'cancelled' || transaction.status === 'refunded',
                  },
                ]"
              >
                {{ getStatusLabel(transaction.status) }}
              </span>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ formatDate(transaction.createdAt) }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WalletTopup } from '@/types/wallet'

// Props
defineProps<{
  transactions: WalletTopup[]
}>()

// Methods
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getPaymentMethodName = (method: string) => {
  const methodNames: Record<string, string> = {
    'vnpay': 'VNPay',
    'atm': 'ATM/Internet Banking',
    'momo': 'MoMo',
    'zalopay': 'ZaloPay'
  }
  return methodNames[method] || method.toUpperCase()
}

const getStatusLabel = (status: string) => {
  const statusLabels: Record<string, string> = {
    'pending': 'Đang xử lý',
    'processing': 'Đang xử lý',
    'completed': 'Hoàn thành',
    'cancelled': 'Đã hủy',
    'refunded': 'Đã hoàn tiền',
    'failed': 'Thất bại'
  }
  return statusLabels[status] || status
}
</script>
