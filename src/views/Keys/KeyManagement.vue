<template>
    <page-breadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
          Quản Lý API Key
        </h1>
        <button
          @click="showAddModal = true"
          class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium hover:shadow-lg transition flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Tạo Key Mới
        </button>
      </div>

      <!-- Table -->
      <component-card title="Danh Sách Key">
        <key-table @edit="openEdit" @delete="confirmDelete" />
      </component-card>
    </div>

    <!-- Modal Thêm Key -->
    <add-key-modal
      v-if="showAddModal"
      @close="showAddModal = false"
      @created="handleKeyCreated"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import KeyTable from '@/components/keys/KeyTable.vue'
import AddKeyModal from '@/components/keys/AddKeyModal.vue'

const currentPageTitle = ref('Quản Lý Key')
const showAddModal = ref(false)

const handleKeyCreated = () => {
  showAddModal.value = false
  // Tự động reload table (KeyTable sẽ tự load lại từ localStorage)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const openEdit = (key: any) => {
  // Có thể mở modal chỉnh sửa
  alert(`Chỉnh sửa key: ${key.key}`)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const confirmDelete = (key: any) => {
  if (confirm(`Xóa key ${key.key}?`)) {
    const keys = JSON.parse(localStorage.getItem('api_keys') || '[]')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filtered = keys.filter((k: any) => k.id !== key.id)
    localStorage.setItem('api_keys', JSON.stringify(filtered))
    alert('Đã xóa key!')
  }
}
</script>