<!-- src/components/permissions/PermissionTable.vue -->
<template>
  <div class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <table class="min-w-full">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="px-5 py-3 text-left w-4/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Trang</p>
            </th>
            <th class="px-5 py-3 text-center w-2/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Xem</p>
            </th>
            <th class="px-5 py-3 text-center w-2/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Tạo</p>
            </th>
            <th class="px-5 py-3 text-center w-2/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Sửa</p>
            </th>
            <th class="px-5 py-3 text-center w-2/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Xóa</p>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="(perm, path) in permissions[role]" :key="path">
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                  {{ getIcon(path) }}
                </div>
                <div>
                  <p class="font-medium text-gray-800 dark:text-white/90">
                    {{ formatPath(path) }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ path }}</p>
                </div>
              </div>
            </td>
            <td class="px-5 py-4 text-center">
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  v-model="perm.view"
                  @change="emitUpdate"
                  class="sr-only peer"
                />
                <div class="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </td>
            <td class="px-5 py-4 text-center">
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  v-model="perm.create"
                  @change="emitUpdate"
                  class="sr-only peer"
                />
                <div class="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </td>
            <td class="px-5 py-4 text-center">
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  v-model="perm.edit"
                  @change="emitUpdate"
                  class="sr-only peer"
                />
                <div class="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
              </label>
            </td>
            <td class="px-5 py-4 text-center">
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  v-model="perm.delete"
                  @change="emitUpdate"
                  class="sr-only peer"
                />
                <div class="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'

const props = defineProps<{
  role: 'ROLE_STAFF_1' | 'ROLE_STAFF_2'
}>()

const emit = defineEmits(['update'])

const permissions = {
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
}

const getIcon = (path: string) => {
  const icons: Record<string, string> = {
    '/dashboard': 'DB',
    '/keys': 'KY',
    '/users': 'US',
    '/support': 'SP',
    '/tickets': 'TK'
  }
  return icons[path] || '??'
}

const formatPath = (path: string) => {
  const names: Record<string, string> = {
    '/dashboard': 'Tổng quan',
    '/keys': 'Quản lý Key',
    '/users': 'Quản lý User',
    '/support': 'Hỗ trợ',
    '/tickets': 'Ticket'
  }
  return names[path] || path
}

watch(() => props.role, () => {
  emit('update')
}, { immediate: true })
</script>