<template>
  <div class="flex gap-x-2">
    <button
      @click.stop="toggleSound"
      :title="soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'"
      class="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    >
      <svg
        v-if="soundEnabled"
        class="w-5 h-5 text-green-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
        />
      </svg>
      <svg
        v-else
        class="w-5 h-5 text-red-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zM17 17l-5-5m0 0L7 7"
        />
      </svg>
    </button>
    <div class="relative" ref="dropdownRef">
      <!-- Bell Button -->
      <button
        @click="toggleDropdown"
        class="relative flex items-center justify-center w-11 h-11 text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
      >
        <!-- Badge số -->
        <span
          v-if="unreadCount > 0"
          class="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1.5 text-xs font-bold text-white bg-red-500 rounded-full animate-pulse"
        >
          {{ unreadCount > 99 ? '99+' : unreadCount }}
        </span>

        <!-- Bell Icon + Rung -->
        <svg
          :class="{ 'animate-bell-ring': hasNew && !dropdownOpen }"
          class="fill-current"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.75 2.29248C10.75 1.87827 10.4143 1.54248 10 1.54248C9.58583 1.54248 9.25004 1.87827 9.25004 2.29248V2.83613C6.08266 3.20733 3.62504 5.9004 3.62504 9.16748V14.4591H3.33337C2.91916 14.4591 2.58337 14.7949 2.58337 15.2091C2.58337 15.6234 2.91916 15.9591 3.33337 15.9591H4.37504H15.625H16.6667C17.0809 15.9591 17.4167 15.6234 17.4167 15.2091C17.4167 14.7949 17.0809 14.4591 16.6667 14.4591H16.375V9.16748C16.375 5.9004 13.9174 3.20733 10.75 2.83613V2.29248ZM14.875 14.4591V9.16748C14.875 6.47509 12.6924 4.29248 10 4.29248C7.30765 4.29248 5.12504 6.47509 5.12504 9.16748V14.4591H14.875ZM8.00004 17.7085C8.00004 18.1228 8.33583 18.4585 8.75004 18.4585H11.25C11.6643 18.4585 12 18.1228 12 17.7085C12 17.2943 11.6643 16.9585 11.25 16.9585H8.75004C8.33583 16.9585 8.00004 17.2943 8.00004 17.7085Z"
            fill=""
          />
        </svg>
      </button>

      <!-- Dropdown -->
      <div
        v-if="dropdownOpen"
        class="absolute right-0 mt-3 w-[350px] sm:w-[361px] flex flex-col h-[480px] rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-900"
      >
        <!-- Header -->
        <div
          class="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 dark:border-gray-800"
        >
          <h5 class="text-lg font-semibold text-gray-800 dark:text-white/90">
            Thông báo
            <span v-if="unreadCount > 0" class="ml-2 text-sm font-bold text-red-500">
              ({{ unreadCount }} mới)
            </span>
          </h5>
          <div class="flex items-center gap-2">
            <!-- Nút âm thanh -->

            <button @click="closeDropdown" class="text-gray-500 hover:text-gray-700">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- List -->
        <ul class="flex-1 overflow-y-auto custom-scrollbar space-y-1">
          <li v-for="notif in notifications" :key="notif.id">
            <button
              @click="handleItemClick(notif)"
              class="w-full text-left flex gap-3 rounded-lg p-3 px-4.5 py-3 hover:bg-gray-100 dark:hover:bg-white/5 transition"
              :class="{ 'bg-blue-50 dark:bg-blue-900/20': !notif.read }"
            >
              <div class="relative flex-shrink-0">
                <img
                  :src="notif.userImage"
                  alt="User"
                  class="w-10 h-10 rounded-full object-cover"
                />
                <span
                  :class="notif.status === 'online' ? 'bg-green-500' : 'bg-gray-400'"
                  class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-gray-900"
                ></span>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm text-gray-800 dark:text-white/90 truncate">
                  <span class="font-medium">{{ notif.userName }}</span>
                  {{ notif.action }}
                  <span class="font-medium">{{ notif.project }}</span>
                </p>
                <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>{{ notif.type }}</span>
                  <span class="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <span>{{ formatTime(notif.time) }}</span>
                </div>
              </div>
              <span v-if="!notif.read" class="w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </li>
          <li v-if="notifications.length === 0" class="text-center py-8 text-gray-500">
            Chưa có thông báo nào
          </li>
        </ul>

        <!-- View All -->
        <router-link
          to="/notifications"
          @click="closeDropdown"
          class="mt-3 flex justify-center rounded-lg border border-gray-300 bg-white p-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/5"
        >
          Xem tất cả thông báo
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

import notificationSound from '@/assets/mp3/ting-ting.mp3'

interface Notification {
  id: number
  userName: string
  userImage: string
  action: string
  project: string
  type: string
  time: string
  status: 'online' | 'offline'
  read: boolean
}

const router = useRouter()
const dropdownRef = ref<HTMLElement | null>(null)
const dropdownOpen = ref(false)
const soundEnabled = ref(false)
const hasNew = ref(false)
const isAudioUnlocked = ref(false)
const showUnlockHint = ref(false)

let audio: HTMLAudioElement | null = null

// === Khởi tạo âm thanh ===
const initAudio = () => {
  if (audio || !notificationSound) return
  audio = new Audio(notificationSound)
  audio.volume = 1.0
  audio.preload = 'auto'
}

// === Phát âm thanh (CHỈ SAU KHI ĐÃ UNLOCK) ===
const playNotificationSound = () => {
  if (!soundEnabled.value || !isAudioUnlocked.value || !audio) return

  audio.currentTime = 0
  audio.play().catch((err) => {
    console.warn('Lỗi phát âm thanh (đã unlock):', err)
  })
}

// === UNLOCK ÂM THANH SAU KHI USER TƯƠNG TÁC ===
const unlockAudio = async () => {
  if (isAudioUnlocked.value) return

  initAudio()

  try {
    // Phát 1 lần ngắn để unlock context
    await audio!.play()
    audio!.pause()
    audio!.currentTime = 0

    isAudioUnlocked.value = true
    showUnlockHint.value = false
    localStorage.setItem('notification_sound_unlocked', 'true')
    console.log('Âm thanh đã được unlock!')
  } catch (err) {
    console.warn('Không thể unlock âm thanh:', err)
  }
}

// === Kiểm tra trạng thái unlock từ localStorage ===
onMounted(() => {
  const unlocked = localStorage.getItem('notification_sound_unlocked') === 'true'
  if (unlocked) {
    isAudioUnlocked.value = true
    initAudio()
  } else {
    showUnlockHint.value = true
  }

  // === GIẢ LẬP THÔNG BÁO ===
  setTimeout(() => {
    addNotification({
      id: Date.now(),
      userName: 'Khách hàng',
      userImage: '/images/user/user-01.jpg',
      action: 'vừa tạo ticket mới',
      project: '#TKT-NEW123',
      type: 'Ticket',
      time: 'vài giây trước',
      status: 'online',
      read: false,
    })
  }, 3000)

  setTimeout(() => {
    addNotification({
      id: Date.now(),
      userName: 'Khách hàng 2',
      userImage: '/images/user/user-01.jpg',
      action: 'vừa tạo ticket mới 2',
      project: '#TKT-NEW1234',
      type: 'Ticket1',
      time: 'vài giây trước',
      status: 'online',
      read: false,
    })
  }, 6000)

  // === UNLOCK KHI CLICK BẤT KỲ ĐÂU ===
  const unlockHandler = () => {
    unlockAudio()
    document.removeEventListener('click', unlockHandler)
    document.removeEventListener('touchstart', unlockHandler)
  }
  document.addEventListener('click', unlockHandler, { once: true })
  document.addEventListener('touchstart', unlockHandler, { once: true })

  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// === MỞ DROPDOWN → UNLOCK ÂM THANH ===
const toggleDropdown = async () => {
  dropdownOpen.value = !dropdownOpen.value
  if (dropdownOpen.value) {
    await unlockAudio() // Click chuông → unlock luôn
    markAllAsRead()
    hasNew.value = false
  }
}

const closeDropdown = () => {
  dropdownOpen.value = false
}

// === Click ngoài ===
const handleClickOutside = (e: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    closeDropdown()
  }
}

// === Thêm thông báo + phát âm thanh ===
const addNotification = (notif: Notification) => {
  notifications.value.unshift(notif)
  hasNew.value = true

  nextTick(() => {
    if (isAudioUnlocked.value && soundEnabled.value) {
      playNotificationSound()
    }
  })

  setTimeout(() => {
    hasNew.value = false
  }, 1000)
}

// === Dữ liệu ===
const notifications = ref<Notification[]>([])

// === Các hàm khác ===
const toggleSound = () => {
  soundEnabled.value = !soundEnabled.value
}
const markAllAsRead = () => {
  notifications.value.forEach((n) => (n.read = true))
}
const handleItemClick = (notif: Notification) => {
  notif.read = true
  closeDropdown()
  if (notif.type === 'Ticket') {
    router.push(`/admin/tickets/${notif.project.replace('#', '')}`)
  }
}
const formatTime = (time: string) => time
const unreadCount = computed(() => notifications.value.filter((n) => !n.read).length)
</script>

<style scoped>
@keyframes bell-ring {
  0%,
  100% {
    transform: rotate(0deg);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: rotate(10deg);
  }
  20%,
  40%,
  60%,
  80% {
    transform: rotate(-10deg);
  }
}
.animate-bell-ring {
  animation: bell-ring 0.8s ease-in-out;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 3px;
}
</style>
