<!-- src/views/UserManagement.vue -->
<template>
    <page-breadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
          Quản Lý Người Dùng
        </h1>
        <button
          @click="openCreateModal"
          class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium hover:shadow-lg transition flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Tạo Người Dùng
        </button>
      </div>

      <!-- Table -->
      <component-card title="Danh Sách Người Dùng">
        <user-table @edit="openEditModal" @delete="confirmDelete" />
      </component-card>
    </div>

    <!-- Modal -->
    <user-modal
      v-if="showModal"
      :user="selectedUser"
      @close="closeModal"
      @saved="handleUserSaved"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import UserTable from '@/components/users/UserTable.vue'
import UserModal from '@/components/users/UserModal.vue'

const currentPageTitle = ref('Quản Lý Người Dùng')
const showModal = ref(false)
const selectedUser = ref<any>(null)

const openCreateModal = () => {
  selectedUser.value = null
  showModal.value = true
}

const openEditModal = (user: any) => {
  selectedUser.value = { ...user }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedUser.value = null
}

const handleUserSaved = () => {
  closeModal()
  // Table tự reload
}

const confirmDelete = (user: any) => {
  if (confirm(`Xóa người dùng ${user.email}?`)) {
    const users = JSON.parse(localStorage.getItem('app_users') || '[]')
    const filtered = users.filter((u: any) => u.id !== user.id)
    localStorage.setItem('app_users', JSON.stringify(filtered))
    alert('Đã xóa!')
  }
}
</script>