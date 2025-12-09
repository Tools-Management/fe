<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="p-4 md:p-6 space-y-8">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white shadow-lg">
      <h1 class="text-3xl md:text-4xl font-bold mb-3">
        Chào mừng đến với <span class="text-yellow-300">AIRemakePro</span>
      </h1>
      <p class="text-lg opacity-90 mb-6 max-w-3xl">
        Nền tảng AI tiên tiến cho creator với
        <strong>Copy link YouTube → Có ngay video mới bằng AI</strong>, <strong>Kho prompt dựng sẵn</strong>, và nhiều công cụ khác.
      </p>
      <div class="flex flex-col sm:flex-row flex-wrap gap-3 sm:items-center">
        <router-link to="/tools">
          <button
            class="w-full sm:w-auto bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-2"
          >
            <Wand2 class="w-5 h-5" />
            Khám phá Tools
          </button>
        </router-link>
        <button
          @click="scrollToPricing"
          class="w-full sm:w-auto border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition flex items-center justify-center"
        >
          Xem Bảng Giá
        </button>
      </div>
    </div>

    <!-- Stats Overview -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-200 text-center">
        <div class="text-3xl font-bold text-blue-600">{{ stats.total }}</div>
        <div class="text-sm text-gray-600 mt-1">Tổng License Keys</div>
      </div>
      <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-200 text-center">
        <div class="text-3xl font-bold text-green-600">{{ stats.available }}</div>
        <div class="text-sm text-gray-600 mt-1">Còn Khả Dụng</div>
      </div>
      <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-200 text-center">
        <div class="text-3xl font-bold text-purple-600">{{ stats.used }}</div>
        <div class="text-sm text-gray-600 mt-1">Đã Bán</div>
      </div>
      <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-200 text-center">
        <div class="text-3xl font-bold text-orange-600">24/7</div>
        <div class="text-sm text-gray-600 mt-1">Hỗ trợ trực tuyến</div>
      </div>
    </div>

    <!-- Tools Introduction -->
    <div id="tools" class="scroll-mt-20">
      <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Sparkles class="w-7 h-7 text-yellow-500" />
        AIRemakePro
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="tool in tools" :key="tool.title" class="flex">
          <FeatureCard
            :icon="tool.icon as any"
            :title="tool.title"
            :desc="tool.desc"
            :tags="tool.tags"
          />
        </div>
      </div>
    </div>

    <!-- Pricing & Policy -->
    <div id="pricing" class="scroll-mt-20 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <CreditCard class="w-7 h-7 text-green-600" />
        Bảng Giá License Key
      </h2>

      <div class="grid md:grid-cols-2 gap-8">
        <!-- Pricing -->
        <div class="w-full">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Gói License Key</h3>
          <div class="space-y-4">
            <div 
              v-for="plan in pricingPlans" 
              :key="plan.duration"
              class="bg-white rounded-lg p-4 border-2 transition-all hover:border-blue-400 hover:shadow-lg cursor-pointer"
              :class="plan.popular ? 'border-purple-400 shadow-md' : 'border-gray-200'"
            >
              <div class="flex justify-between items-center">
                <div class="flex-1">
                  <div class="flex items-center gap-2">
                    <div class="font-semibold text-lg">{{ plan.label }}</div>
                    <span v-if="plan.popular" class="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-2 py-1 rounded-full font-bold">
                      PHỔ BIẾN
                    </span>
                  </div>
                  <div class="text-sm text-gray-600 mt-1">{{ plan.duration }} sử dụng</div>
                  <div v-if="'savings' in plan && plan.savings" class="text-xs text-green-600 font-semibold mt-1">
                    💰 Tiết kiệm {{ plan.savings }}
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {{ plan.priceDisplay }}
                  </div>
                  <div class="text-xs text-gray-500 mt-1">
                    Còn {{ getAvailableKeys(plan.duration) }} keys
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- CTA Button -->
          <router-link to="/purchase-license">
            <button class="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-semibold shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2">
              <ShoppingCart class="w-5 h-5" />
              Mua License Key Ngay
            </button>
          </router-link>
        </div>

        <!-- Policy -->
        <div class="w-full">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Chính Sách Sử Dụng</h3>
          <ul class="space-y-3 text-sm text-gray-700">
            <li class="flex gap-2 bg-white rounded-lg p-4 border border-gray-200">
              <CheckCircle class="w-5 h-5 text-green-600 flex-shrink-0" />
              <span><strong>Kích hoạt ngay lập tức</strong> sau khi thanh toán thành công.</span>
            </li>
            <li class="flex gap-2 bg-white rounded-lg p-4 border border-gray-200">
              <CheckCircle class="w-5 h-5 text-green-600 flex-shrink-0" />
              <span><strong>Hỗ trợ 24/7</strong> qua Telegram, Zalo, Email.</span>
            </li>
            <li class="flex gap-2 bg-white rounded-lg p-4 border border-gray-200">
              <CheckCircle class="w-5 h-5 text-green-600 flex-shrink-0" />
              <span><strong>Cập nhật miễn phí</strong> các công cụ mới.</span>
            </li>
            <li class="flex gap-2 bg-white rounded-lg p-4 border border-gray-200">
              <CheckCircle class="w-5 h-5 text-green-600 flex-shrink-0" />
              <span><strong>Bảo mật tuyệt đối</strong> thông tin cá nhân.</span>
            </li>
            <li class="flex gap-2 bg-white rounded-lg p-4 border border-gray-200">
              <AlertCircle class="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span><strong>1 key = 1 thiết bị</strong> - Không được chia sẻ.</span>
            </li>
            <li class="flex gap-2 bg-white rounded-lg p-4 border border-gray-200">
              <XCircle class="w-5 h-5 text-red-600 flex-shrink-0" />
              <span><strong>Không hoàn tiền</strong> sau khi đã nhận key.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- CTA Final -->
    <div class="text-center py-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
      <p class="text-2xl text-white font-bold mb-4">Sẵn sàng bắt đầu?</p>
      <p class="text-white/90 mb-6 mx-2">Chọn gói phù hợp và bắt đầu sử dụng công cụ ngay hôm nay!</p>
      <div class="flex flex-col sm:flex-row gap-4 mx-12 justify-center items-center flex-wrap">
        <router-link to="/purchase-license">
          <button
            class="w-full sm:w-auto bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition shadow-lg flex items-center justify-center gap-3"
          >
            <ShoppingCart class="w-6 h-6" />
            Mua License Key
          </button>
        </router-link>
        <router-link to="/tools">
          <button
            class="w-full sm:w-auto border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition flex items-center justify-center gap-3"
          >
            <Play class="w-6 h-6" />
            Dùng Thử Tools
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import FeatureCard from './FeatureCard.vue'
import {
  Wand2,
  Sparkles,
  CreditCard,
  CheckCircle,
  XCircle,
  Play,
  ShoppingCart,
  AlertCircle,
} from 'lucide-vue-next'
import { LICENSE_PRICING } from '@/constants'
import { useLicenseKeyStore } from '@/store/license_key.store'

// Store
const licenseKeyStore = useLicenseKeyStore()

// Computed
const stats = computed(() => licenseKeyStore.stats || { total: 0, available: 0, used: 0 })
const pricingPlans = computed(() => Object.values(LICENSE_PRICING))

// Methods
const getAvailableKeys = (duration: string): number => {
  if (!stats.value?.byDuration) return 0
  const durationStats = stats.value.byDuration.find(d => d.duration === duration)
  return durationStats?.available || 0
}

// Dữ liệu tools
const tools = [
  {
    icon: 'Link',
    title: 'Copy Link YouTube',
    desc: 'Copy link YouTube → Có ngay video mới bằng AI. Phân tích và remake video chỉ với 1 link.',
    tags: ['YouTube', 'Auto AI'],
  },
  {
    icon: 'FileText',
    title: 'Kho Prompt Dựng Sẵn',
    desc: 'Kho prompt dựng sẵn + Xuất video 9:16 chuẩn Shorts / TikTok / Reels.',
    tags: ['9:16', 'Viral ready'],
  },
  {
    icon: 'Type',
    title: 'Tạo Video Từ Text Prompt',
    desc: 'Tạo video hoàn toàn mới từ text prompt. AI hiểu ý tưởng của bạn.',
    tags: ['Text to Video', 'AI Generate'],
  },
  {
    icon: 'Image',
    title: 'Remake Từ Hình Ảnh',
    desc: 'Tạo Video Mới Tương Tự Từ Hình Ảnh Của Video Gốc.',
    tags: ['Image to Video', 'Style transfer'],
  },
  {
    icon: 'User',
    title: 'AI Character Creator',
    desc: 'AI CHARACTER CREATOR – TỐI ƯU TẠO NHÂN VẬT ĐỒNG BỘ.',
    tags: ['Character', 'Consistency'],
  },
  {
    icon: 'UploadCloud',
    title: 'Auto Đăng Lên MXH',
    desc: 'Tự động đăng video lên YouTube, TikTok, Facebook ngay sau khi dựng xong.',
    tags: ['Auto upload', 'Đa nền tảng'],
  },
]

const scrollToPricing = () => {
  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
}

// Lifecycle
onMounted(async () => {
  await licenseKeyStore.getLicenseKeyStats()
})
</script>
