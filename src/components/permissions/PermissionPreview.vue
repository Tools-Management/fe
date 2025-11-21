<!-- src/components/permissions/PermissionPreview.vue -->
<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
      <div class="p-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
            Quyền của {{ getRoleLabel(role) }}
          </h2>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div class="p-6 space-y-6">
        <div v-for="module in modules" :key="module.id" class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-sm font-medium">
              {{ module.icon }}
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white">{{ module.name }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ module.route }}</p>
            </div>
          </div>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="action in ['view', 'create', 'edit', 'delete']" :key="action" class="text-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
              <div class="text-xs font-medium text-gray-500 dark:text-gray-400 capitalize">{{ action }}</div>
              <div :class="[
                'mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                hasPermission(module.id, action) 
                  ? 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400'
                  : 'bg-gray-100 text-gray-500 dark:bg-gray-700/50 dark:text-gray-400'
              ]">
                <svg v-if="hasPermission(module.id, action)" class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                {{ hasPermission(module.id, action) ? 'Có' : 'Không' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  role: string
}>()

const emit = defineEmits(['close'])

const modules = [
  { id: 'dashboard', name: 'Dashboard', route: '/dashboard', icon: '📊' },
  { id: 'keys', name: 'Quản lý Key', route: '/keys', icon: '🔑' },
  { id: 'users', name: 'Quản lý User', route: '/users', icon: '👥' },
  { id: 'permissions', name: 'Phân quyền', route: '/permissions', icon: '⚙️' },
  { id: 'support', name: 'Hỗ trợ', route: '/support', icon: '💬' },
  { id: 'billing', name: 'Thanh toán', route: '/billing', icon: '💳' },
  { id: 'remake', name: 'Remake Video', route: '/remake', icon: '🎬' }
]

const getRoleLabel = (role: string) => {
  const map: Record<string, string> = {
    'ROLE_ADMIN': 'Quản trị viên',
    'ROLE_STAFF_1': 'Nhân viên cấp 1',
    'ROLE_STAFF_2': 'Nhân viên cấp 2',
    'ROLE_USER': 'Người dùng thường'
  }
  return map[role] || role
}

const hasPermission = (moduleId: string, action: string) => {
  const rolePermissions = (window as any).rolePermissions
  return rolePermissions?.[props.role]?.[moduleId]?.[action] || false
}
</script>