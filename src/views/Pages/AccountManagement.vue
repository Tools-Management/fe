<!-- src/views/Pages/AccountManagement.vue -->
<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h1 class="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
        Quản Lý Tài Khoản
      </h1>
      <div class="flex gap-3">
        <router-link
          to="/transaction-history"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium hover:shadow-lg transition flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          Lịch sử giao dịch
        </router-link>
        <button
          @click="showTopUpModal = true"
          class="bg-gradient-to-r from-green-600 to-emerald-700 text-white px-6 py-2.5 rounded-lg font-medium hover:shadow-lg transition flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Nạp Tiền
        </button>
      </div>
    </div>

    <!-- Balance Overview -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Current Balance -->
      <div class="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-green-100 text-sm font-medium">Số dư hiện tại</p>
            <p class="text-3xl font-bold mt-1">{{ formatCurrency(balance?.balance || 0) }}</p>
          </div>
          <div class="p-3 bg-white/20 rounded-full">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Total Spent -->
      <div class="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-blue-100 text-sm font-medium">Tổng đã chi tiêu</p>
            <p class="text-3xl font-bold mt-1">{{ formatCurrency(balance?.balance || 0) }}</p>
            <p class="text-blue-100 text-xs mt-1">Tháng này</p>
          </div>
          <div class="p-3 bg-white/20 rounded-full">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Pending Amount -->
      <div class="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-yellow-100 text-sm font-medium">Đang xử lý</p>
            <p class="text-3xl font-bold mt-1">{{ formatCurrency(topups?.filter(topup => topup.status === 'pending').reduce((acc, topup) => acc + topup.amount, 0) || 0) }}</p>
            <p class="text-yellow-100 text-xs mt-1">Chờ xác nhận</p>
          </div>
          <div class="p-3 bg-white/20 rounded-full">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Payment History -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-semibold">Lịch sử thanh toán</h3>
      </div>

      <!-- Filters Form -->
      <form @submit.prevent="handleSearch" class="mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
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

      <!-- Table -->
      <TransactionTable :transactions="paginatedTransactions" />

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

    <!-- Modals -->
    <TopUpModal
      v-if="showTopUpModal"
      @close="showTopUpModal = false"
      @success="handleTopUpSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import TopUpModal from '@/components/billing/TopUpModal.vue'
import TransactionTable from '@/components/billing/TransactionTable.vue'
import Pagination from '@/components/common/Pagination.vue'
import DatePicker from '@/components/common/DatePicker.vue'
import { useBillingStore } from '@/store/billing.store'
import type { TransactionFilters } from '@/types/billing'

// Store
const billingStore = useBillingStore()

// Computed properties from store
const balance = computed(() => billingStore.balance)
const topups = computed(() => billingStore.topups)

// Modal and form states
const showTopUpModal = ref(false)

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

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(10)
const isSearching = ref(false)

// Computed for filtering and pagination
const filteredTransactions = computed(() => {
  let filtered = [...topups.value]

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

// Methods
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

const handleTopUpSuccess = () => {
  showTopUpModal.value = false
  // Handle successful top-up
}

const handleSearch = async () => {
  isSearching.value = true
  currentPage.value = 1 // Reset to first page when searching

  // Apply search form to filters
  appliedFilters.value = {
    type: '',
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

// Lifecycle
onMounted(async () => {
  await billingStore.getBalance()
  await billingStore.getTopupHistory()
  // Apply initial search (no filters)
  await handleSearch()
})
</script>
