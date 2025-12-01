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
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div class="flex-1 min-w-48">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Loại giao dịch
            </label>
            <select
              v-model="searchForm.type"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-300"
            >
              <option value="">Tất cả</option>
              <option value="deposit">Nạp tiền</option>
              <option value="withdrawal">Rút tiền</option>
              <option value="payment">Thanh toán</option>
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
              <option value="completed">Hoàn thành</option>
              <option value="pending">Đang xử lý</option>
              <option value="failed">Thất bại</option>
            </select>
          </div>

          <div class="flex-1 min-w-48">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Từ ngày
            </label>
            <DatePicker
              v-model="searchForm.startDate"
              placeholder="Chọn ngày bắt đầu"
            />
          </div>

          <div class="flex-1 min-w-48">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Đến ngày
            </label>
            <DatePicker
              v-model="searchForm.endDate"
              placeholder="Chọn ngày kết thúc"
            />
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
      v-if="filteredTransactions"
      :current-page="currentPage"
      :total-pages="totalPages"
      :total-items="filteredTransactions.length"
      :limit="itemsPerPage"
      @page-change="handlePageChange"
      @limit-change="handleLimitChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import TransactionTable from '@/components/billing/TransactionTable.vue'
import Pagination from '@/components/common/Pagination.vue'
import DatePicker from '@/components/common/DatePicker.vue'
import { useBillingStore } from '@/store/billing.store'
import type { TransactionFilters } from '@/types/billing'

// Store
const billingStore = useBillingStore()

// Computed properties from store
const transactions = computed(() => billingStore.transactions)

// Form and filters
const searchForm = ref<TransactionFilters>({
  type: '',
  status: '',
  startDate: '',
  endDate: ''
})

const appliedFilters = ref<TransactionFilters>({
  type: '',
  status: '',
  startDate: '',
  endDate: ''
})

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(10)
const isSearching = ref(false)

// Computed
const filteredTransactions = computed(() => {
  let filtered = [...transactions.value]

  // Filter by type
  if (appliedFilters.value.type) {
    filtered = filtered.filter(t => t.type === appliedFilters.value.type)
  }

  // Filter by status
  if (appliedFilters.value.status) {
    filtered = filtered.filter(t => t.status === appliedFilters.value.status)
  }

  // Filter by date range
  if (appliedFilters.value.startDate) {
    const startDate = new Date(appliedFilters.value.startDate)
    filtered = filtered.filter(t => new Date(t.createdAt) >= startDate)
  }

  if (appliedFilters.value.endDate) {
    const endDate = new Date(appliedFilters.value.endDate)
    endDate.setHours(23, 59, 59, 999) // End of day
    filtered = filtered.filter(t => new Date(t.createdAt) <= endDate)
  }

  return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
})

const totalPages = computed(() => Math.ceil(filteredTransactions.value.length / itemsPerPage.value))

const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredTransactions.value.slice(start, end)
})

const totalTransactions = computed(() => filteredTransactions.value.length)

const totalAmount = computed(() => {
  return filteredTransactions.value
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
  currentPage.value = 1 // Reset to first page when searching

  // Apply search form to filters
  appliedFilters.value = {
    type: searchForm.value.type,
    status: searchForm.value.status,
    startDate: searchForm.value.startDate,
    endDate: searchForm.value.endDate
  }

  // Simulate search delay
  await new Promise(resolve => setTimeout(resolve, 500))
  isSearching.value = false
}

const handleReset = async () => {
  searchForm.value = {
    type: '',
    status: '',
    startDate: '',
    endDate: ''
  }

  appliedFilters.value = {
    type: '',
    status: '',
    startDate: '',
    endDate: ''
  }

  currentPage.value = 1
  await handleSearch()
}

const handlePageChange = (page: number) => {
  currentPage.value = page
}

const handleLimitChange = (limit: number) => {
  itemsPerPage.value = limit
  currentPage.value = 1
}

// Watch for date validation
watch(() => searchForm.value.startDate, (newStartDate) => {
  if (newStartDate && searchForm.value.endDate && newStartDate > searchForm.value.endDate) {
    searchForm.value.endDate = newStartDate
  }
})

watch(() => searchForm.value.endDate, (newEndDate) => {
  if (newEndDate && searchForm.value.startDate && newEndDate < searchForm.value.startDate) {
    searchForm.value.startDate = newEndDate
  }
})

// Lifecycle
onMounted(async () => {
  await billingStore.loadBalance()
  await billingStore.loadTransactions()
  // Apply initial search (no filters)
  await handleSearch()
})
</script>
