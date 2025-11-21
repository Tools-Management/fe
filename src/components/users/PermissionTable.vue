<!-- src/components/permissions/PermissionTable.vue -->
<template>
  <div class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <table class="min-w-full">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="px-5 py-3 text-left w-2/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Module</p>
            </th>
            <th class="px-5 py-3 text-center w-2/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">ROLE_ADMIN</p>
            </th>
            <th class="px-5 py-3 text-center w-2/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">STAFF_1</p>
            </th>
            <th class="px-5 py-3 text-center w-2/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">STAFF_2</p>
            </th>
            <th class="px-5 py-3 text-center w-2/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">ROLE_USER</p>
            </th>
            <th class="px-5 py-3 text-center w-3/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Actions</p>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="module in modules" :key="module.id" class="border-t border-gray-100 dark:border-gray-800">
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-sm font-medium">
                  {{ module.icon }}
                </div>
                <div>
                  <p class="font-medium text-gray-800 dark:text-white/90">{{ module.name }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ module.route }}</p>
                </div>
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6 text-center">
              <div class="flex justify-center items-center gap-2">
                <div v-for="action in ['view', 'create', 'edit', 'delete']" :key="action">
                  <input
                    type="checkbox"
                    :id="`${module.id}-admin-${action}`"
                    v-model="permissions['ROLE_ADMIN'][module.id][action]"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6 text-center">
              <div class="flex justify-center items-center gap-2">
                <div v-for="action in ['view', 'create', 'edit', 'delete']" :key="action">
                  <input
                    type="checkbox"
                    :id="`${module.id}-staff1-${action}`"
                    v-model="permissions['ROLE_STAFF_1'][module.id][action]"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6 text-center">
              <div class="flex justify-center items-center gap-2">
                <div v-for="action in ['view', 'create', 'edit', 'delete']" :key="action">
                  <input
                    type="checkbox"
                    :id="`${module.id}-staff2-${action}`"
                    v-model="permissions['ROLE_STAFF_2'][module.id][action]"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6 text-center">
              <div class="flex justify-center items-center gap-2">
                <div v-for="action in ['view', 'create', 'edit', 'delete']" :key="action">
                  <input
                    type="checkbox"
                    :id="`${module.id}-user-${action}`"
                    v-model="permissions['ROLE_USER'][module.id][action]"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <button
                @click="$emit('preview', 'all')"
                class="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
              >
                Preview
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Module {
  id: string
  name: string
  route: string
  icon: string
}

const modules = ref<Module[]>([
  { id: 'dashboard', name: 'Dashboard', route: '/dashboard', icon: '📊' },
  { id: 'keys', name: 'Quản lý Key', route: '/keys', icon: '🔑' },
  { id: 'users', name: 'Quản lý User', route: '/users', icon: '👥' },
  { id: 'permissions', name: 'Phân quyền', route: '/permissions', icon: '⚙️' },
  { id: 'support', name: 'Hỗ trợ', route: '/support', icon: '💬' },
  { id: 'billing', name: 'Thanh toán', route: '/billing', icon: '💳' },
  { id: 'remake', name: 'Remake Video', route: '/remake', icon: '🎬' }
])

const permissions = ref<Record<string, any>>({})

onMounted(() => {
  loadPermissions()
})

const loadPermissions = () => {
  const saved = localStorage.getItem('role_permissions')
  if (saved) {
    permissions.value = JSON.parse(saved)
  } else {
    // Mặc định
    const defaultPerms: Record<string, any> = {}
    const roles = ['ROLE_ADMIN', 'ROLE_STAFF_1', 'ROLE_STAFF_2', 'ROLE_USER']
    
    roles.forEach(role => {
      defaultPerms[role] = {}
      modules.value.forEach(module => {
        defaultPerms[role][module.id] = {
          view: role === 'ROLE_ADMIN',
          create: role === 'ROLE_ADMIN',
          edit: role === 'ROLE_ADMIN',
          delete: role === 'ROLE_ADMIN'
        }
        
        if (role === 'ROLE_STAFF_1') {
          defaultPerms[role][module.id] = {
            view: ['dashboard', 'support', 'keys'].includes(module.id),
            create: ['support'].includes(module.id),
            edit: false,
            delete: false
          }
        }
        
        if (role === 'ROLE_STAFF_2') {
          defaultPerms[role][module.id] = {
            view: ['dashboard', 'support'].includes(module.id),
            create: ['support'].includes(module.id),
            edit: false,
            delete: false
          }
        }
        
        if (role === 'ROLE_USER') {
          defaultPerms[role][module.id] = {
            view: ['dashboard', 'remake', 'support'].includes(module.id),
            create: ['remake', 'support'].includes(module.id),
            edit: false,
            delete: false
          }
        }
      })
    })
    
    permissions.value = defaultPerms
    // Lưu vào global để các trang khác dùng
    ;(window as any).rolePermissions = defaultPerms
  }
}

defineEmits(['preview'])
</script>