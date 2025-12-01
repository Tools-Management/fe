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
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ user.username }}</p>
                </div>
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <span>
                {{ user.role }}
              </span>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <span :class="getStatusClass(user.isActive)">
                {{ getStatusLabel(user.isActive) }}
              </span>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">
                {{ formatDate(user.createdAt) }}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user.store'
import { formatDate } from '@/utils/common'
import { onMounted, computed } from 'vue'

const userStore = useUserStore()

onMounted(() => {
  userStore.getUsers()
})

const users = computed(() => userStore.users);
console.log(users.value)

const getStatusClass = (status: boolean) => {
  return {
    'bg-green-100 text-green-800 dark:bg-green-500/15 dark:text-green-500': status,
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/15 dark:text-yellow-400': !status,
  }
}

const getStatusLabel = (status: boolean) => {
  return status ? 'Hoạt động' : 'Đã khóa'
}
</script>