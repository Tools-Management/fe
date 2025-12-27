<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden"
  >
    <!-- Hero Section -->
    <section class="relative z-10 container mx-auto px-6 py-20 text-center">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-5xl md:text-7xl font-extrabold leading-tight">
          <span
            class="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"
          >
          AIRemakePro
          </span>
          <br />
          <span class="text-white">Công Cụ AI Siêu Thông Minh</span>
        </h1>
        <p class="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
          Nền tảng AI tiên tiến cho creator: Copy link YouTube → Có ngay video mới bằng AI,
          Kho prompt dựng sẵn + Xuất video 9:16 chuẩn Shorts/TikTok/Reels, và nhiều công cụ khác.
        </p>

        <div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
          <button
            v-if="!isAuthenticated"
            @click="handleGetStarted"
            class="w-full sm:w-auto bg-gradient-to-r from-pink-600 to-purple-700 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition transform flex items-center justify-center gap-2"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Bắt Đầu Ngay - Miễn Phí
          </button>
          <router-link v-else to="/purchase-license">
            <button
              class="w-full sm:w-auto bg-gradient-to-r from-pink-600 to-purple-700 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition transform flex items-center justify-center gap-2"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Mua License Key Ngay
            </button>
          </router-link>
          <button
            @click="handleViewDemo"
            class="w-full sm:w-auto border border-purple-500 px-8 py-4 rounded-xl font-semibold hover:bg-purple-500/20 transition"
          >
            {{ isAuthenticated ? 'Vào Dashboard' : 'Xem Demo & Tính Năng' }}
          </button>
        </div>

        <!-- Trust badges -->
        <div class="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-400">
          <div class="flex items-center gap-2">
            <span class="text-green-400">✓</span> {{ isAuthenticated ? `${stats.total}+ license keys` : 'Hàng trăm license keys có sẵn' }}
          </div>
          <div class="flex items-center gap-2">
            <span class="text-green-400">✓</span> {{ isAuthenticated ? `${stats.used}+ khách hàng` : '500+ khách hàng tin dùng' }}
          </div>
          <div class="flex items-center gap-2">
            <span class="text-green-400">✓</span> Hỗ trợ 24/7
          </div>
        </div>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="relative z-10 container mx-auto px-6 py-20">
      <h2 class="text-4xl font-bold text-center mb-16">
        <span class="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
          Tại Sao Chọn AIRemakePro?
        </span>
      </h2>

      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="tool in toolsInfo" :key="tool.title" class="flex">
          <feature-card
            :icon="tool.icon as any"
            :title="tool.title"
            :desc="tool.desc"
            :tags="tool.tags"
            :isHome="true"
          />
        </div>
      </div>
    </section>

    <!-- Pricing Teaser -->
    <section class="relative z-10 container mx-auto px-6 py-20 text-center">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-4xl font-bold mb-6">
          <span class="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
            Bảng Giá License Key
          </span>
        </h2>
        <p class="text-xl text-gray-300 mb-12">
          Chỉ từ <strong class="text-3xl text-pink-400">300.000đ/tháng</strong> - Kích hoạt ngay lập tức
        </p>

        <div class="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div
            v-for="plan in pricingPlans"
            :key="plan.duration"
            class="rounded-2xl p-8 transform transition-all hover:scale-105"
            :class="plan.popular 
              ? 'bg-gradient-to-br from-purple-600 to-indigo-700 shadow-2xl border-2 border-purple-400 scale-105' 
              : 'bg-gradient-to-br from-pink-600/20 to-purple-600/20 backdrop-blur-md border border-pink-500/50'"
          >
            <div
              v-if="plan.popular"
              class="bg-yellow-400 text-purple-900 text-xs font-bold px-3 py-1 rounded-full inline-block mb-4"
            >
              Phổ biến nhất
            </div>
            <h3 class="text-2xl font-bold mb-4" :class="plan.popular ? 'text-white' : ''">
              {{ plan.label }}
            </h3>
            <p class="text-3xl text-center font-bold mb-2" :class="plan.popular ? 'text-white' : 'text-pink-400'">
              {{ plan.priceDisplay }}
            </p>
            <p class="text-sm mb-6" :class="plan.popular ? 'text-gray-200' : 'text-gray-400'">
              {{ plan.duration }}
            </p>
            
            <div v-if="'savings' in plan && plan.savings" class="mb-4">
              <span class="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                Tiết kiệm {{ plan.savings }}
              </span>
            </div>

            <ul class="text-left space-y-2 mb-8" :class="plan.popular ? 'text-gray-200' : 'text-gray-300'">
              <li v-for="feature in plan.features.slice(0, 3)" :key="feature" class="flex items-start gap-2">
                <span class="text-green-400 flex-shrink-0">✓</span>
                <span class="text-sm">{{ feature }}</span>
              </li>
            </ul>

            <button
              @click="handleSelectPlan"
              class="w-full py-3 rounded-xl font-bold transition"
              :class="plan.popular 
                ? 'bg-white text-purple-700 hover:bg-gray-100' 
                : 'bg-pink-600 hover:bg-pink-700'"
            >
              {{ isAuthenticated ? 'Chọn gói này' : 'Đăng nhập để mua' }}
            </button>
          </div>
        </div>

        <div v-if="isAuthenticated" class="mt-8">
          <router-link to="/purchase-license">
            <button class="text-purple-300 hover:text-white underline">
              Xem chi tiết tất cả gói →
            </button>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA Final -->
    <section class="relative z-10 container mx-auto px-6 py-20 text-center">
      <div class="max-w-3xl mx-auto">
        <h2 class="text-4xl md:text-5xl font-bold mb-6">
          Sẵn sàng <span class="text-pink-400">tăng trưởng</span> với AI?
        </h2>
        <p class="text-xl text-gray-300 mb-10">
          Hàng trăm creator đã tin dùng AIRemakePro. Đến lượt bạn!
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
          <button
            v-if="!isAuthenticated"
            @click="handleGetStarted"
            class="w-full sm:w-auto bg-gradient-to-r from-pink-600 to-purple-700 px-10 py-5 rounded-full text-xl font-bold hover:shadow-2xl hover:scale-110 transition transform"
          >
            Đăng Ký Ngay - Miễn Phí
          </button>
          <template v-else>
            <router-link to="/purchase-license">
              <button
                class="w-full sm:w-auto bg-gradient-to-r from-pink-600 to-purple-700 px-10 py-5 rounded-full text-xl font-bold hover:shadow-2xl hover:scale-110 transition transform"
              >
                Mua License Key Ngay
              </button>
            </router-link>
            <router-link to="/my-keys">
              <button
                class="w-full sm:w-auto border-2 border-purple-500 px-10 py-5 rounded-full text-xl font-bold hover:bg-purple-500/20 transition"
              >
                Xem Keys Đã Mua
              </button>
            </router-link>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import FeatureCard from '../FeatureCard.vue'
import { LICENSE_PRICING } from '@/constants'
import { useLicenseKeyStore } from '@/store/license_key.store'
import { useAuthStore } from '@/store/auth'
import { toolsInfo } from '@/data/tools'

// Router
const router = useRouter()

// Store
const licenseKeyStore = useLicenseKeyStore()
const authStore = useAuthStore()

// Computed
const isAuthenticated = computed(() => authStore.isLoggedIn)
const stats = computed(() => licenseKeyStore.stats || { total: 0, available: 0, used: 0 })
const pricingPlans = computed(() => Object.values(LICENSE_PRICING))

const handleGetStarted = () => {
  router.push('/signin')
}

const handleViewDemo = () => {
  if (isAuthenticated.value) {
    router.push('/administrators')
  } else {
    router.push('/signin')
  }
}

const handleSelectPlan = () => {
  if (isAuthenticated.value) {
    router.push('/purchase-license')
  } else {
    router.push('/signin')
  }
}

// SVG Icons as string (safe with v-html)
// const features = ref([]) // Removed, using toolsInfo instead

// Lifecycle
onMounted(async () => {
  // Only load stats if authenticated
  if (isAuthenticated.value) {
    await licenseKeyStore.getLicenseKeyStats()
  }
})
</script>

<style scoped>
.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}
</style>