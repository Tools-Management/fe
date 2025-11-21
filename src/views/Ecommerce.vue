<template>
    <div class="p-4 md:p-6 space-y-8">
      <!-- Hero Section -->
      <div
        class="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg"
      >
        <h1 class="text-3xl md:text-4xl font-bold mb-3">
          Chào mừng đến với <span class="text-yellow-300">Remake Pro</span>
        </h1>
        <p class="text-lg opacity-90 mb-6 max-w-3xl">
          Nền tảng AI hàng đầu giúp bạn <strong>remake video</strong> theo phong cách Hollywood,
          Anime, Pixar... chỉ trong vài click.
        </p>
        <div class="flex flex-wrap gap-3">
          <button
            @click="scrollToTools"
            class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-2"
          >
            <Wand2 class="w-5 h-5" />
            Khám phá Tools
          </button>
          <button
            @click="scrollToPricing"
            class="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
          >
            Xem Bảng Giá
          </button>
        </div>
      </div>

      <!-- Stats Overview -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-200 text-center">
          <div class="text-3xl font-bold text-blue-600">10K+</div>
          <div class="text-sm text-gray-600 mt-1">Video đã remake</div>
        </div>
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-200 text-center">
          <div class="text-3xl font-bold text-green-600">4.9</div>
          <div class="text-sm text-gray-600 mt-1">Đánh giá trung bình</div>
        </div>
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-200 text-center">
          <div class="text-3xl font-bold text-purple-600">50+</div>
          <div class="text-sm text-gray-600 mt-1">Phong cách AI</div>
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
          Công cụ Remake Video
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="tool in tools" :key="tool.title" class="flex">
            <FeatureCard
              :icon="tool.icon"
              :title="tool.title"
              :desc="tool.desc"
              :tags="tool.tags"
            />
          </div>
        </div>
      </div>

      <!-- Pricing & Policy -->
      <div id="pricing" class="scroll-mt-20 bg-gray-50 rounded-2xl">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <CreditCard class="w-7 h-7 text-green-600" />
          Bảng Giá & Chính Sách
        </h2>

        <div class="grid md:grid-cols-2 gap-8">
          <!-- Pricing -->
          <div class="w-full">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Gói Credits</h3>
            <div class="space-y-4">
              <div class="bg-white rounded-lg p-4 border border-gray-200">
                <div class="flex justify-between items-center">
                  <div>
                    <div class="font-semibold">Gói Cơ Bản</div>
                    <div class="text-sm text-gray-600">100 credits</div>
                  </div>
                  <div class="text-xl font-bold text-blue-600">99.000đ</div>
                </div>
              </div>
              <div class="bg-white rounded-lg p-4 border border-gray-200">
                <div class="flex justify-between items-center">
                  <div>
                    <div class="font-semibold">Gói Pro</div>
                    <div class="text-sm text-gray-600">500 credits + ưu tiên</div>
                  </div>
                  <div class="text-xl font-bold text-green-600">399.000đ</div>
                </div>
              </div>
              <div class="bg-white rounded-lg p-4 border border-gray-200">
                <div class="flex justify-between items-center">
                  <div>
                    <div class="font-semibold">Gói Doanh Nghiệp</div>
                    <div class="text-sm text-gray-600">Không giới hạn</div>
                  </div>
                  <div class="text-xl font-bold text-purple-600">Liên hệ</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Policy -->
          <div class="w-full">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Chính Sách Sử Dụng</h3>
            <ul class="space-y-3 text-sm text-gray-700">
              <li class="flex gap-2 bg-white rounded-lg p-4 border border-gray-200">
                <CheckCircle class="w-5 h-5 text-green-600 flex-shrink-0" />
                <span><strong>Hoàn tiền 100%</strong> nếu video lỗi do hệ thống.</span>
              </li>
              <li class="flex gap-2 bg-white rounded-lg p-4 border border-gray-200">
                <CheckCircle class="w-5 h-5 text-green-600 flex-shrink-0" />
                <span><strong>Không lưu video</strong> sau 7 ngày (bảo mật tuyệt đối).</span>
              </li>
              <li class="flex gap-2 bg-white rounded-lg p-4 border border-gray-200">
                <CheckCircle class="w-5 h-5 text-green-600 flex-shrink-0" />
                <span><strong>Hỗ trợ 24/7</strong> qua Telegram, Zalo, Email.</span>
              </li>
              <li class="flex gap-2 bg-white rounded-lg p-4 border border-gray-200">
                <CheckCircle class="w-5 h-5 text-green-600 flex-shrink-0" />
                <span><strong>Cập nhật AI mới</strong> hàng tuần, miễn phí.</span>
              </li>
              <li class="flex gap-2 bg-white rounded-lg p-4 border border-gray-200">
                <XCircle class="w-5 h-5 text-red-600 flex-shrink-0" />
                <span><strong>Cấm</strong> nội dung vi phạm bản quyền, khiêu dâm, bạo lực.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- CTA Final -->
      <div class="text-center py-8">
        <p class="text-lg text-gray-700 mb-4">Sẵn sàng bắt đầu?</p>
        <router-link to="/tools">
          <button
          
          class="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition shadow-lg flex items-center gap-3 mx-auto"
        >
          <Play class="w-6 h-6" />
          Tạo Video Đầu Tiên – Miễn Phí 10 Credits!
        </button>
        </router-link>
      </div>
    </div>
</template>

<script setup lang="ts">
import FeatureCard from './FeatureCard.vue'
import {
  Wand2,
  Sparkles,
  CreditCard,
  CheckCircle,
  XCircle,
  Play,
} from 'lucide-vue-next'



// Dữ liệu tools
const tools = [
  {
    icon: 'Palette',
    title: 'AI Remake Style',
    desc: 'Biến video thường thành Anime, Pixar, Cinematic, LEGO... với AI tiên tiến.',
    tags: ['50+ styles', 'HD/4K'],
  },
  {
    icon: 'Music',
    title: 'Thêm Âm Thanh & Hiệu Ứng',
    desc: 'Tự động thêm nhạc nền, voice-over, text overlay, chuyển cảnh mượt mà.',
    tags: ['Thư viện 10K+ nhạc', 'TTS đa ngôn ngữ'],
  },
  {
    icon: 'Scissors',
    title: 'Cắt Ghép Thông Minh',
    desc: 'Cắt đoạn, ghép video, xóa nền, tách lời thoại chỉ trong 1 click.',
    tags: ['AI detect scene', 'Tốc độ x10'],
  },
  {
    icon: 'Download',
    title: 'Xuất Video Chuyên Nghiệp',
    desc: '1080p, 4K, thêm watermark, logo, phụ đề, tối ưu cho YouTube/TikTok.',
    tags: ['Không watermark', 'Tải ngay'],
  },
  {
    icon: 'Youtube',
    title: 'Phân Tích YouTube',
    desc: 'Nhập link → AI phân tích → remake lại video theo phong cách bạn muốn.',
    tags: ['Hỗ trợ Shorts', 'Tự động'],
  },
  {
    icon: 'Zap',
    title: 'Tăng Tốc Xử Lý',
    desc: 'Ưu tiên xử lý nhanh, nhận video trong 2–5 phút với gói Pro.',
    tags: ['Queue ưu tiên', 'GPU x100'],
  },
]

const scrollToTools = () => {
  document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToPricing = () => {
  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
}
</script>
