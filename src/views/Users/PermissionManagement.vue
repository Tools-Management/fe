<!-- src/views/PermissionManagement.vue -->
<template>
    <page-breadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
          Phân Quyền Hệ Thống
        </h1>
        <button
          @click="savePermissions"
          :disabled="isSaving"
          class="bg-gradient-to-r from-green-600 to-emerald-700 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition flex items-center gap-2 disabled:opacity-70"
        >
          <svg v-if="isSaving" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"></path>
          </svg>
          {{ isSaving ? 'Đang lưu...' : 'Lưu Phân Quyền' }}
        </button>
      </div>

      <!-- Role Selector -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Chọn vai trò để phân quyền
        </label>
        <div class="flex flex-wrap gap-3">
          <button
            v-for="role in roles"
            :key="role.value" 
            @click="selectedRole = role.value"
            :class="[
              'px-5 py-2.5 rounded-lg font-medium transition',
              selectedRole === role.value
                ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            ]"
          >
            {{ role.label }}
          </button>
        </div>
      </div>

      <!-- Permission Table -->
      <component-card title="Danh Sách Quyền">
        <permission-table
          :role="selectedRole"
        />
      </component-card>

      <!-- Save Success -->
      <div v-if="saveSuccess" class="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-pulse">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <span class="font-medium">Đã lưu phân quyền!</span>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import PermissionTable from '@/components/permissions/PermissionTable.vue'

type RoleType = 'ROLE_STAFF_1' | 'ROLE_STAFF_2'

interface Permission {
  view: boolean
  create: boolean
  edit: boolean
  delete: boolean
}

type PermissionsMap = Record<string, Permission>

interface RoleOption {
  value: RoleType
  label: string
}

const currentPageTitle = ref('Phân Quyền')
const selectedRole = ref<RoleType>('ROLE_STAFF_1')
const isSaving = ref(false)
const saveSuccess = ref(false)

const roles: RoleOption[] = [
  { value: 'ROLE_STAFF_1', label: 'Staff 1' },
  { value: 'ROLE_STAFF_2', label: 'Staff 2' }
]

const savePermissions = async () => {
  isSaving.value = true
  await new Promise(resolve => setTimeout(resolve, 800))
  localStorage.setItem('permission_system', JSON.stringify(permissions.value))
  isSaving.value = false
  saveSuccess.value = true
  setTimeout(() => saveSuccess.value = false, 3000)
}

// Dữ liệu quyền
const permissions = ref<Record<RoleType, PermissionsMap>>({
  ROLE_STAFF_1: {
    '/dashboard': { view: true, create: false, edit: false, delete: false },
    '/keys': { view: true, create: true, edit: true, delete: false },
    '/users': { view: false, create: false, edit: false, delete: false },
    '/support': { view: true, create: true, edit: false, delete: false },
    '/tickets': { view: true, create: false, edit: true, delete: false }
  },
  ROLE_STAFF_2: {
    '/dashboard': { view: true, create: false, edit: false, delete: false },
    '/keys': { view: true, create: false, edit: false, delete: false },
    '/users': { view: true, create: false, edit: false, delete: false },
    '/support': { view: true, create: true, edit: true, delete: true },
    '/tickets': { view: true, create: true, edit: true, delete: true }
  }
})

onMounted(() => {
  const saved = localStorage.getItem('permission_system')
  if (saved) {
    permissions.value = JSON.parse(saved)
  }
})
</script>