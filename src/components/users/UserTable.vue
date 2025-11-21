<!-- src/components/users/UserTable.vue -->
<template>
  <div class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <table class="min-w-full">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="px-5 py-3 text-left w-3/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Người dùng</p>
            </th>
            <th class="px-5 py-3 text-left w-2/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Vai trò</p>
            </th>
            <th class="px-5 py-3 text-left w-2/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Trạng thái</p>
            </th>
            <th class="px-5 py-3 text-left w-2/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Ngày tạo</p>
            </th>
            <th class="px-5 py-3 text-left w-3/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Hành động</p>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="user in users" :key="user.id" class="border-t border-gray-100 dark:border-gray-800">
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                  {{ user.email[0].toUpperCase() }}
                </div>
                <div>
                  <p class="font-medium text-gray-800 dark:text-white/90">{{ user.email }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ user.name }}</p>
                </div>
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <span :class="getRoleClass(user.role)">
                {{ getRoleLabel(user.role) }}
              </span>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <span :class="getStatusClass(user.status)">
                {{ getStatusLabel(user.status) }}
              </span>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">
                {{ formatDate(user.createdAt) }}
              </p>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-3">
                <button
                  @click="$emit('edit', user)"
                  class="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                >
                  Sửa
                </button>
                <span class="text-gray-400">|</span>
                <button
                  @click="$emit('delete', user)"
                  class="text-red-600 hover:text-red-700 text-sm"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface User {
  id: string
  email: string
  name: string
  role: 'ROLE_STAFF_1' | 'ROLE_STAFF_2' | 'ROLE_USER' | 'ROLE_ADMIN'
  status: 'active' | 'inactive' | 'banned'
  createdAt: string
}

const users = ref<User[]>([])

onMounted(() => {
  loadUsers()
})

const loadUsers = () => {
  const saved = localStorage.getItem('app_users')
  if (saved) {
    users.value = JSON.parse(saved)
  } else {
    users.value = [
      {
        id: '1',
        email: 'admin@remake.pro',
        name: 'Quản trị viên',
        role: 'ROLE_ADMIN',
        status: 'active',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        email: 'staff1@remake.pro',
        name: 'Nhân viên 1',
        role: 'ROLE_STAFF_1',
        status: 'active',
        createdAt: new Date(Date.now() - 5*24*60*60*1000).toISOString()
      },
      {
        id: '3',
        email: 'user@example.com',
        name: 'Người dùng thường',
        role: 'ROLE_USER',
        status: 'inactive',
        createdAt: new Date(Date.now() - 10*24*60*60*1000).toISOString()
      }
    ]
  }
}

const getRoleLabel = (role: string) => {
  const map: Record<string, string> = {
    'ROLE_ADMIN': 'Quản trị',
    'ROLE_STAFF_1': 'Staff 1',
    'ROLE_STAFF_2': 'Staff 2',
    'ROLE_USER': 'Người dùng'
  }
  return map[role] || role
}

const getRoleClass = (role: string) => {
  const classes: Record<string, string> = {
    'ROLE_ADMIN': 'bg-purple-100 text-purple-800 dark:bg-purple-500/15 dark:text-purple-400',
    'ROLE_STAFF_1': 'bg-blue-100 text-blue-800 dark:bg-blue-500/15 dark:text-blue-400',
    'ROLE_STAFF_2': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-500/15 dark:text-indigo-400',
    'ROLE_USER': 'bg-gray-100 text-gray-800 dark:bg-gray-500/15 dark:text-gray-400'
  }
  return ['px-2.5 py-1 rounded-full text-xs font-medium', classes[role]]
}

const getStatusClass = (status: string) => {
  return {
    'bg-green-100 text-green-800 dark:bg-green-500/15 dark:text-green-500': status === 'active',
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/15 dark:text-yellow-400': status === 'inactive',
    'bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-500': status === 'banned'
  }
}

const getStatusLabel = (status: string) => {
  return status === 'active' ? 'Hoạt động' : status === 'inactive' ? 'Tạm khóa' : 'Bị cấm'
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleString('vi-VN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

defineEmits(['edit', 'delete'])
</script>