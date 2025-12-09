<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <SidebarProvider>
      <admin-layout>
          <router-view />

          <!-- Scroll to Top Button -->
          <button
            v-if="showScrollTop"
            @click="scrollToTop"
            class="fixed bottom-6 right-6 z-50 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
            aria-label="Scroll to top"
          >
            <svg class="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
      </admin-layout>
    </SidebarProvider>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import SidebarProvider from './SidebarProvider.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'

const showScrollTop = ref(false)

// Scroll to top functionality
const handleScroll = () => {
  showScrollTop.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>