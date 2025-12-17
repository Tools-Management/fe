<template>
  <loading-home :is-loading="authStore.loading" />

  <div class="relative" ref="dropdownRef">
    <button
      v-if="user"
      class="flex items-center text-gray-700 dark:text-gray-400"
      :class="isHome ? 'text-white' : ''"
      @click.prevent="toggleDropdown"
    >
      <span class="mr-3 overflow-hidden rounded-full h-11 w-11 border border-gray-200">
        <img v-if="user?.image" :src="user?.image" alt="User" />
        <span
          v-else
          class="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold"
        >
          {{ user?.email[0].toUpperCase() }}
        </span>
      </span>

      <span class="block mr-1 font-medium text-theme-sm" :class="isHome ? 'text-white' : ''">{{
        user?.username
      }}</span>

      <ChevronDownIcon :class="{ 'rotate-180': dropdownOpen }" />
    </button>

    <router-link v-else to="/signin" class="btn btn-primary text-sm"> Sign In </router-link>

    <!-- Dropdown Start -->
    <div
      v-if="dropdownOpen"
      class="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
    >
      <div>
        <span class="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
          {{ user?.username }}
        </span>
        <span class="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
          {{ user?.email }}
        </span>
      </div>

      <ul class="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
        <li v-for="item in menuItems" :key="item.href">
          <router-link
            :to="item.href"
            class="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
          >
            <!-- SVG icon would go here -->
            <component
              :is="item.icon"
              class="text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300"
            />
            {{ item.text }}
          </router-link>
        </li>
      </ul>
      <button
        @click="signOut"
        class="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
      >
        <LogoutIcon
          class="text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300"
        />
        Đăng xuất
      </button>
    </div>
    <!-- Dropdown End -->
  </div>
</template>

<script setup lang="ts">
import { ChevronDownIcon, LogoutIcon, SendIcon } from '@/icons/index'
import { RouterLink, useRoute } from 'vue-router'
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useAuthStore } from '@/store/auth'
import LoadingHome from '@/components/common/LoadingHome.vue'

const route = useRoute()

const dropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const authStore = useAuthStore()

const user = computed(() => authStore.user)

const isHome = computed(() => route.path === '/')

const menuItems = [{ href: '/administrators', icon: SendIcon, text: 'Quản trị' }]

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const closeDropdown = () => {
  dropdownOpen.value = false
}

const signOut = async () => {
  await authStore.logout() // Gọi logout từ store
  closeDropdown()
}

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    closeDropdown()
  }
}

onMounted(() => {
  if (authStore.isAuthenticated === false) {
    authStore.getMe()
  }
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
