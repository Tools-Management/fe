<!-- src/components/users/UserModal.vue -->
<template>
  <div class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
    <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
      <h2 class="text-2xl font-bold mb-5 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
        {{ user ? 'Chỉnh Sửa Người Dùng' : 'Tạo Người Dùng Mới' }}
      </h2>

      <form @submit.prevent="saveUser" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.email"
            type="email"
            required
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm"
            :disabled="!!user"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tên hiển thị
          </label>
          <input
            v-model="form.name"
            type="text"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Vai trò <span class="text-red-500">*</span>
          </label>
          <select
            v-model="form.role"
            required
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm"
          >
            <option value="ROLE_USER">Người dùng</option>
            <option value="ROLE_STAFF_1">Staff 1</option>
            <option value="ROLE_STAFF_2">Staff 2</option>
            <option value="ROLE_ADMIN">Quản trị</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Trạng thái
          </label>
          <select
            v-model="form.status"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm"
          >
            <option value="active">Hoạt động</option>
            <option value="inactive">Tạm khóa</option>
            <option value="banned">Bị cấm</option>
          </select>
        </div>

        <div class="flex gap-3 mt-6">
          <button
            type="button"
            @click="$emit('close')"
            class="flex-1 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium"
          >
            Hủy
          </button>
          <button
            type="submit"
            class="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-2.5 rounded-lg font-medium hover:shadow-lg transition"
          >
            {{ user ? 'Cập nhật' : 'Tạo' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  user: {
    id: string
    email: string
    name: string
    role: string
    status: string
  }
}>()

const emit = defineEmits(['close', 'saved'])

const form = ref({
  email: '',
  name: '',
  role: 'ROLE_USER' as const,
  status: 'active' as const
})

watch(() => props.user, (newUser) => {
  if (newUser) {
    form.value = { ...newUser }
  } else {
    form.value = { email: '', name: '', role: 'ROLE_USER', status: 'active' }
  }
}, { immediate: true })

const saveUser = () => {
  const users = JSON.parse(localStorage.getItem('app_users') || '[]')
  
  if (props.user) {
    // Cập nhật
    const index = users.findIndex((u: any) => u.id === props.user.id)
    if (index !== -1) {
      users[index] = { ...users[index], ...form.value }
    }
  } else {
    // Tạo mới
    const newUser = {
      id: Date.now().toString(),
      ...form.value,
      createdAt: new Date().toISOString()
    }
    users.unshift(newUser)
  }

  localStorage.setItem('app_users', JSON.stringify(users))
  emit('saved')
}
</script>