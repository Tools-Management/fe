<!-- src/views/Keys/LicenseKeyManagement.vue -->
<template>
  <div class="space-y-5 sm:space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
        Quản Lý License Keys
      </h1>
      <div class="flex flex-wrap gap-3">
        <!-- License Management Buttons -->
        <button
          @click="showUpgradeModal = true"
          class="bg-gradient-to-r from-orange-600 to-red-700 text-white px-4 py-2.5 rounded-lg font-medium hover:shadow-lg transition flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          Nâng Cấp License
        </button>
        <button
          @click="showActivateModal = true"
          class="bg-gradient-to-r from-green-600 to-emerald-700 text-white px-4 py-2.5 rounded-lg font-medium hover:shadow-lg transition flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Kích Hoạt License
        </button>

        <!-- License Key Management Buttons -->
        <button
          @click="showGenerateModal = true"
          class="bg-gradient-to-r from-teal-600 to-cyan-700 text-white px-4 py-2.5 rounded-lg font-medium hover:shadow-lg transition flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Tạo Nhiều Keys
        </button>
        <button
          @click="showCreateModal = true"
          class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium hover:shadow-lg transition flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Tạo Key Mới
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
        <p class="text-2xl font-bold text-blue-600">{{ stats.total }}</p>
        <p class="text-sm text-blue-700">Tổng Keys</p>
      </div>
      <div class="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
        <p class="text-2xl font-bold text-green-600">{{ stats.active }}</p>
        <p class="text-sm text-green-700">Đang Hoạt Động</p>
      </div>
      <div class="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
        <p class="text-2xl font-bold text-red-600">{{ stats.inactive }}</p>
        <p class="text-sm text-red-700">Không Hoạt Động</p>
      </div>
      <div class="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
        <p class="text-2xl font-bold text-purple-600">{{ totalUsed }}</p>
        <p class="text-sm text-purple-700">Đã Sử Dụng</p>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-6">
      <form @submit.prevent="handleSearch" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="md:col-span-2">
            <input
              v-model="searchForm.query"
              type="text"
              placeholder="Tìm kiếm license key, ID..."
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select v-model="searchForm.status" class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="">Tất cả trạng thái</option>
            <option value="true">Đang hoạt động</option>
            <option value="false">Không hoạt động</option>
          </select>
          <select v-model="searchForm.duration" class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="">Tất cả thời hạn</option>
            <option value="7d">7 ngày</option>
            <option value="30d">30 ngày</option>
            <option value="90d">90 ngày</option>
            <option value="180d">180 ngày</option>
            <option value="365d">365 ngày</option>
          </select>
        </div>
        <div class="flex justify-center gap-3">
          <button
            type="submit"
            :disabled="isSearching"
            class="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
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
            class="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Đặt lại
          </button>
        </div>
      </form>
    </div>

    <!-- License Keys Table -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <LicenseKeyTable
        :license-keys="paginatedLicenseKeys"
        @edit="openEditModal"
        @delete="confirmDelete"
      />
    </div>

    <!-- Pagination -->
    <Pagination
      :current-page="pagination.page"
      :total-pages="pagination.totalPages"
      :total-items="pagination.total"
      :limit="pagination.limit"
      @page-change="handlePageChange"
      @limit-change="handleLimitChange"
    />

    <!-- Modals -->
    <!-- License Management Modals -->
    <ActivateLicenseModal
      v-if="showActivateModal"
      @close="showActivateModal = false"
      @activated="handleLicenseActivated"
    />

    <UpgradeLicenseModal
      v-if="showUpgradeModal"
      @close="showUpgradeModal = false"
      @upgraded="handleLicenseUpgraded"
    />

    <!-- License Key Management Modals -->
    <CreateLicenseKeyModal
      v-if="showCreateModal"
      @close="showCreateModal = false"
      @created="handleLicenseKeyCreated"
    />

    <GenerateLicenseKeysModal
      v-if="showGenerateModal"
      @close="showGenerateModal = false"
      @generated="handleLicenseKeysGenerated"
    />

    <EditLicenseKeyModal
      v-if="selectedLicenseKey"
      :license-key="selectedLicenseKey"
      @close="closeEditModal"
      @updated="handleLicenseKeyUpdated"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { delay } from '@/mocks/license.mock'
import Pagination from '@/components/common/Pagination.vue'
import LicenseKeyTable from '@/components/licenses/LicenseKeyTable.vue'
import CreateLicenseKeyModal from '@/components/licenses/CreateLicenseKeyModal.vue'
import GenerateLicenseKeysModal from '@/components/licenses/GenerateLicenseKeysModal.vue'
import EditLicenseKeyModal from '@/components/licenses/EditLicenseKeyModal.vue'
import ActivateLicenseModal from '@/components/licenses/ActivateLicenseModal.vue'
import UpgradeLicenseModal from '@/components/licenses/UpgradeLicenseModal.vue'
import { useLicenseKeyStore } from '@/store/license_key.store'
import type { ILicenseKey } from '@/types/license'

// Store
const licenseKeyStore = useLicenseKeyStore()

// Computed properties from store
const stats = computed(() => licenseKeyStore.stats)
const licenseKeys = computed(() => licenseKeyStore.licenseKeys)
watch(licenseKeys, (newVal) => {
  console.log(newVal)
})
const isSearching = ref(false)

// Modal states
const showCreateModal = ref(false)
const showGenerateModal = ref(false)
const showActivateModal = ref(false)
const showUpgradeModal = ref(false)
const selectedLicenseKey = ref<ILicenseKey | null>(null)

// Search and filters
const searchForm = ref({
  query: '',
  status: '',
  duration: ''
})

const appliedFilters = ref({
  query: '',
  status: '',
  duration: ''
})

// Initialize appliedFilters
appliedFilters.value = {
  query: '',
  status: '',
  duration: ''
}

// Pagination
const currentPage = ref(1)
const currentLimit = ref(10)

// Computed properties
const totalUsed = computed(() => {
  // Since API doesn't provide usedCount, we show 0 for now
  return 0
})

const filteredLicenseKeys = computed(() => {
  // Check if licenseKeys is loaded
  if (!licenseKeys.value || !Array.isArray(licenseKeys.value)) {
    return []
  }

  let filtered = [...licenseKeys.value]

  // Apply search
  if (appliedFilters.value.query.trim()) {
    const query = appliedFilters.value.query.toLowerCase()
    filtered = filtered.filter(key =>
      key?.key?.toLowerCase().includes(query) ||
      key?.id?.toLowerCase().includes(query)
    )
  }

  // Apply status filter
  if (appliedFilters.value.status !== '') {
    const isActive = appliedFilters.value.status === 'true'
    filtered = filtered.filter(key => key?.isActive === isActive)
  }

  // Apply duration filter
  if (appliedFilters.value.duration) {
    filtered = filtered.filter(key => key?.duration === appliedFilters.value.duration)
  }

  return filtered
})

// Get paginated items for current page
const paginatedLicenseKeys = computed(() => {
  const start = (currentPage.value - 1) * currentLimit.value
  const end = start + currentLimit.value
  return filteredLicenseKeys.value.slice(start, end)
})

const pagination = computed(() => {
  const total = filteredLicenseKeys.value.length
  const totalPages = Math.ceil(total / currentLimit.value)
  return {
    page: currentPage.value,
    limit: currentLimit.value,
    total,
    totalPages
  }
})

// Methods
const loadLicenseKeys = async () => {
  await licenseKeyStore.getLicenseKeys()

}

const handleSearch = async () => {
  isSearching.value = true
  currentPage.value = 1 // Reset to first page when searching

  // Apply search form to filters
  appliedFilters.value = {
    query: searchForm.value.query,
    status: searchForm.value.status,
    duration: searchForm.value.duration
  }

  try {
    await delay(300) // Simulate search delay
  } finally {
    isSearching.value = false
  }
}

const handleReset = async () => {
  searchForm.value.query = ''
  searchForm.value.status = ''
  searchForm.value.duration = ''

  appliedFilters.value = {
    query: '',
    status: '',
    duration: ''
  }

  currentPage.value = 1
  await handleSearch()
}

const handlePageChange = (page: number) => {
  currentPage.value = page
}

const handleLimitChange = (limit: number) => {
  currentLimit.value = limit
  currentPage.value = 1 // Reset to first page when limit changes
}

// License Management Handlers
const handleLicenseActivated = () => {
  showActivateModal.value = false
  // Reload license keys to reflect any changes
  loadLicenseKeys()
}

const handleLicenseUpgraded = () => {
  showUpgradeModal.value = false
  // Reload license keys to reflect any changes
  loadLicenseKeys()
}

// License Key Management Handlers
const handleLicenseKeyCreated = () => {
  showCreateModal.value = false
}

const handleLicenseKeysGenerated = () => {
  showGenerateModal.value = false
}

const openEditModal = (licenseKey: ILicenseKey) => {
  selectedLicenseKey.value = licenseKey
}

const closeEditModal = () => {
  selectedLicenseKey.value = null
}

const handleLicenseKeyUpdated = () => {
  closeEditModal()
}

const confirmDelete = async (licenseKey: ILicenseKey) => {
  if (confirm(`Bạn có chắc muốn xóa license key "${licenseKey.key}"?`)) {
    try {
      await licenseKeyStore.deleteLicenseKey(licenseKey.id)
      console.log('Deleted license key:', licenseKey.key)
    } catch (error) {
      console.error('Failed to delete license key:', error)
      alert('Có lỗi xảy ra khi xóa license key!')
    }
  }
}

// Lifecycle
onMounted(async () => {
  await loadLicenseKeys()
  // Apply initial search (no filters)
  await handleSearch()
})
</script>
