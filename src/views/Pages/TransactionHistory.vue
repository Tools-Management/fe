<!-- src/views/Pages/TransactionHistory.vue -->
<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
        Lịch Sử Giao Dịch
      </h1>
      <div class="flex items-center gap-4">
        <div class="text-sm text-gray-600 dark:text-gray-400">
          Tổng: <span class="font-semibold text-blue-600">{{ totalTransactions }}</span> giao dịch
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          Tổng tiền: <span class="font-semibold text-green-600">{{ formatCurrency(totalAmount) }}</span>
        </div>
      </div>
    </div>

    <!-- Filters Form -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <form @submit.prevent="handleSearch" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="flex-1 min-w-48">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Phương thức thanh toán
            </label>
            <select
              v-model="searchForm.paymentMethod"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-300"
            >
              <option value="">Tất cả</option>
              <option value="vnpay">VNPay</option>
              <option value="atm">ATM/Internet Banking</option>
            </select>
          </div>

          <div class="flex-1 min-w-48">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Trạng thái
            </label>
            <select
              v-model="searchForm.status"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-300"
            >
              <option value="">Tất cả</option>
              <option value="pending">Đang xử lý</option>
              <option value="completed">Hoàn thành</option>
              <option value="failed">Thất bại</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>


          <div class="flex items-end gap-2">
            <button
              type="submit"
              :disabled="isSearching"
              class="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg v-if="isSearching" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span v-else>
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              Tìm kiếm
            </button>
            <button
              type="button"
              @click="handleReset"
              class="flex items-center justify-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Đặt lại
            </button>
          </div>
        </div>
      </form>
    </div>

    <!-- Transaction Table -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <TransactionTable :transactions="paginatedTransactions" />
    </div>

    <!-- Pagination -->
    <Pagination
      v-if="topupHistory?.pagination"
      :current-page="topupHistory.pagination.page"
      :total-pages="topupHistory.pagination.totalPages"
      :total-items="topupHistory.pagination.total"
      :limit="topupHistory.pagination.limit"
      @page-change="handlePageChange"
      @limit-change="handleLimitChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import TransactionTable from '@/components/billing/TransactionTable.vue'
import Pagination from '@/components/common/Pagination.vue'
import { useBillingStore } from '@/store/billing.store'
import type { TopupQuery } from '@/types/wallet'

// Store
const billingStore = useBillingStore()

// Computed properties from store
const topupHistory = computed(() => billingStore.topupHistory)
const topups = computed(() => billingStore.topupHistory?.topups || [])

// Form and filters
const searchForm = ref<TopupQuery>({
  page: 1,
  limit: 10,
  status: '',
  paymentMethod: ''
})

const appliedFilters = ref<TopupQuery>({
  page: 1,
  limit: 10,
  status: '',
  paymentMethod: ''
})

const isSearching = ref(false)

// Computed
const filteredTransactions = computed(() => {
  let filtered = [...topups.value]

  // Filter by status
  if (appliedFilters.value.status) {
    filtered = filtered.filter(t => t.status === appliedFilters.value.status)
  }

  // Filter by payment method
  if (appliedFilters.value.paymentMethod) {
    filtered = filtered.filter(t => t.paymentMethod === appliedFilters.value.paymentMethod)
  }

  return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
})

const paginatedTransactions = computed(() => {
  // Use data directly from store since API already handles pagination
  return topups.value
})

const totalTransactions = computed(() => filteredTransactions.value.length)

const totalAmount = computed(() => {
  return topups.value
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0)
})

// Methods
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

const handleSearch = async () => {
  isSearching.value = true

  // Apply search form to filters
  appliedFilters.value = {
    page: 1,
    limit: searchForm.value.limit || 10,
    status: searchForm.value.status,
    paymentMethod: searchForm.value.paymentMethod
  }

  // Call API to get filtered results
  await billingStore.getTopupHistory(
    appliedFilters.value.page,
    appliedFilters.value.limit
  )

  isSearching.value = false
}

const handleReset = async () => {
  searchForm.value = {
    page: 1,
    limit: 10,
    status: '',
    paymentMethod: ''
  }

  appliedFilters.value = {
    page: 1,
    limit: 10,
    status: '',
    paymentMethod: ''
  }

  await handleSearch()
}

const handlePageChange = async (page: number) => {
  searchForm.value.page = page
  await billingStore.getTopupHistory(page, searchForm.value.limit || 10)
}

const handleLimitChange = async (limit: number) => {
  searchForm.value.limit = limit
  searchForm.value.page = 1
  await billingStore.getTopupHistory(1, limit)
}


// Lifecycle
onMounted(async () => {
  await billingStore.getBalance()
  await billingStore.getTopupHistory()
})
</script>
