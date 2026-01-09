<!-- src/views/Keys/LicenseManagement.vue -->
<template>
  <LoadingBase :is-loading="licenseStore.loading" />
  <div class="space-y-5 sm:space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h1
        class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent"
      >
        Quản Lý Licenses
      </h1>
      <div class="flex flex-wrap gap-3">
        <!-- Sync Button -->
        <button
          @click="handleSyncLicenses"
          class="bg-gradient-to-r from-purple-600 to-pink-700 text-white px-4 py-2.5 rounded-lg font-medium hover:shadow-lg transition flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Đồng Bộ Licenses
        </button>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-6">
      <form @submit.prevent="handleSearch" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <input
              v-model="searchForm.email"
              type="text"
              placeholder="Tìm kiếm theo Email..."
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              v-model="searchForm.machineId"
              type="text"
              placeholder="Tìm kiếm theo Machine ID..."
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              v-model="searchForm.externalId"
              type="text"
              placeholder="Tìm kiếm theo External ID..."
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              v-model="searchForm.licenseKey"
              type="text"
              placeholder="Tìm kiếm theo License Key..."
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            v-model="searchForm.isActive"
            class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="true">Đang hoạt động</option>
            <option value="false">Không hoạt động</option>
          </select>
        </div>
        <div class="flex justify-center gap-3">
          <button
            type="submit"
            :disabled="isSearching"
            class="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <svg
              v-if="isSearching"
              class="animate-spin h-4 w-4"
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
            <span v-else>
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
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
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
            Đặt lại
          </button>
        </div>
      </form>
    </div>

    <!-- Licenses Table -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <license-table :licenses="licenses" @edit="openEditModal" />
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
    <edit-license-modal
      v-if="selectedLicense"
      :license="selectedLicense"
      @close="closeEditModal"
      @updated="handleLicenseUpdated"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Pagination from '@/components/common/Pagination.vue'
import LoadingBase from '@/components/common/LoadingBase.vue'
import LicenseTable from '@/components/licenses/LicenseTable.vue'
import EditLicenseModal from '@/components/licenses/EditLicenseModal.vue'
import { useLicenseStore } from '@/store/license.store'
import type { ILicense, ILicenseQuery } from '@/types/license'
import { useToast } from '@/composables/useToast'

// Store
const licenseStore = useLicenseStore()
const { toastSuccess, toastError } = useToast()

// Computed properties from store
const licenses = computed(() => licenseStore.licenses)
const pagination = computed(() => licenseStore.pagination)
const isSearching = ref(false)

// Modal states
const selectedLicense = ref<ILicense | null>(null)

// Search and filters
const searchForm = ref<ILicenseQuery>({
  page: 1,
  limit: 10,
  email: '',
  machineId: '',
  externalId: '',
  licenseKey: '',
  isActive: undefined,
})

// Methods
const loadLicenses = async () => {
  isSearching.value = true
  const params: ILicenseQuery = {
    page: searchForm.value.page,
    limit: searchForm.value.limit,
  }

  if (searchForm.value.email) params.email = searchForm.value.email
  if (searchForm.value.machineId) params.machineId = searchForm.value.machineId
  if (searchForm.value.externalId) params.externalId = searchForm.value.externalId
  if (searchForm.value.licenseKey) params.licenseKey = searchForm.value.licenseKey
  if (searchForm.value.isActive !== undefined) params.isActive = searchForm.value.isActive === true // Convert string to boolean

  await licenseStore.fetchAllLicenses(params)
  isSearching.value = false
}

const handleSyncLicenses = async () => {
  try {
    await licenseStore.syncAllLicenses()
    toastSuccess('Đồng bộ licenses thành công!')
    await loadLicenses()
  } catch {
    toastError('Có lỗi xảy ra khi đồng bộ licenses.')
  }
}

const handleSearch = async () => {
  searchForm.value.page = 1 // Reset to first page on search
  await loadLicenses()
}

const handleReset = async () => {
  searchForm.value = {
    page: 1,
    limit: 10,
    email: '',
    machineId: '',
    externalId: '',
    licenseKey: '',
    isActive: undefined,
  }
  await loadLicenses()
}

const handlePageChange = async (page: number) => {
  searchForm.value.page = page
  await loadLicenses()
}

const handleLimitChange = async (limit: number) => {
  searchForm.value.limit = limit
  searchForm.value.page = 1 // Reset to first page when limit changes
  await loadLicenses()
}

const openEditModal = (license: ILicense) => {
  selectedLicense.value = license
}

const closeEditModal = () => {
  selectedLicense.value = null
}

const handleLicenseUpdated = async () => {
  closeEditModal()
  if (!licenseStore.error) {
    toastSuccess('Updated successfully')
  } else {
    toastError(licenseStore.error)
  }
  await loadLicenses()
}

// Lifecycle
onMounted(async () => {
  await Promise.all([loadLicenses()])
})
</script>

<style scoped>
/* Thêm các style scoped nếu cần */
</style>
