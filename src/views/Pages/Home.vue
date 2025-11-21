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
            Remake Video Tự Động
          </span>
          <br />
          <span class="text-white">Bằng AI Siêu Thông Minh</span>
        </h1>
        <p class="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
          Thuê ngay công cụ AI remake video tự động, đa nền tảng (YouTube, TikTok, Facebook,
          Instagram). Tối ưu SEO, tránh bản quyền, tăng view & sub chỉ trong vài click.
        </p>

        <div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            class="bg-gradient-to-r from-pink-600 to-purple-700 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition transform flex items-center justify-center gap-2"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Thuê Ngay Chỉ Từ 99k/tháng
          </button>
          <button
            class="border border-purple-500 px-8 py-4 rounded-xl font-semibold hover:bg-purple-500/20 transition"
          >
            Xem Demo Video
          </button>
        </div>

        <!-- Trust badges -->
        <div class="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-400">
          <div class="flex items-center gap-2">
            <span class="text-green-400">Check</span> Đã remake 10M+ video
          </div>
          <div class="flex items-center gap-2">
            <span class="text-green-400">Check</span> 5000+ khách hàng tin dùng
          </div>
          <div class="flex items-center gap-2">
            <span class="text-green-400">Check</span> Hỗ trợ 24/7
          </div>
        </div>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="relative z-10 container mx-auto px-6 py-20">
      <h2 class="text-4xl font-bold text-center mb-16">
        <span class="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
          Tại Sao Chọn AIRemake.tools?
        </span>
      </h2>

      <div class="grid md:grid-cols-3 gap-8">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition transform hover:-translate-y-2"
        >
          <div
            class="w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 p-3"
            v-html="feature.icon"
          ></div>
          <h3 class="text-2xl font-bold mb-3">{{ feature.title }}</h3>
          <p class="text-gray-300">{{ feature.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Pricing Teaser -->
    <section class="relative z-10 container mx-auto px-6 py-20 text-center">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-4xl font-bold mb-6">
          <span class="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
            Giá Thuê Siêu Hấp Dẫn
          </span>
        </h2>
        <p class="text-xl text-gray-300 mb-12">
          Chỉ từ <strong class="text-3xl text-pink-400">99.000đ/tháng</strong> cho gói cơ bản
        </p>

        <div class="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div
            class="bg-gradient-to-br from-pink-600/20 to-purple-600/20 backdrop-blur-md border border-pink-500/50 rounded-2xl p-8"
          >
            <h3 class="text-2xl font-bold mb-4">Gói Starter</h3>
            <p class="text-4xl font-bold text-pink-400 mb-6">
              99k <span class="text-sm text-gray-400">/tháng</span>
            </p>
            <ul class="text-left text-gray-300 space-y-2 mb-8">
              <li>Check 500 video/tháng</li>
              <li>Check 3 nền tảng</li>
              <li>Check Hỗ trợ cơ bản</li>
            </ul>
            <button
              class="w-full bg-pink-600 py-3 rounded-xl font-bold hover:bg-pink-700 transition"
            >
              Chọn gói
            </button>
          </div>

          <div
            class="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-8 transform scale-105 shadow-2xl border border-purple-400"
          >
            <div
              class="bg-yellow-400 text-purple-900 text-xs font-bold px-3 py-1 rounded-full inline-block mb-4"
            >
              Phổ biến nhất
            </div>
            <h3 class="text-2xl font-bold mb-4 text-white">Gói Pro</h3>
            <p class="text-4xl font-bold text-white mb-6">
              299k <span class="text-sm text-gray-300">/tháng</span>
            </p>
            <ul class="text-left text-gray-200 space-y-2 mb-8">
              <li>Check 5000 video/tháng</li>
              <li>Check 10+ nền tảng</li>
              <li>Check AI chống bản quyền</li>
              <li>Check Hỗ trợ ưu tiên 24/7</li>
            </ul>
            <button
              class="w-full bg-white text-purple-700 py-3 rounded-xl font-bold hover:bg-gray-100 transition"
            >
              Chọn gói
            </button>
          </div>

          <div
            class="bg-gradient-to-br from-indigo-600/20 to-pink-600/20 backdrop-blur-md border border-indigo-500/50 rounded-2xl p-8"
          >
            <h3 class="text-2xl font-bold mb-4">Gói Agency</h3>
            <p class="text-4xl font-bold text-indigo-400 mb-6">
              799k <span class="text-sm text-gray-400">/tháng</span>
            </p>
            <ul class="text-left text-gray-300 space-y-2 mb-8">
              <li>Check Không giới hạn</li>
              <li>Check API riêng</li>
              <li>Check White-label</li>
              <li>Check Quản lý team</li>
            </ul>
            <button
              class="w-full bg-indigo-600 py-3 rounded-xl font-bold hover:bg-indigo-700 transition"
            >
              Liên hệ
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Final -->
    <section class="relative z-10 container mx-auto px-6 py-20 text-center">
      <div class="max-w-3xl mx-auto">
        <h2 class="text-4xl md:text-5xl font-bold mb-6">
          Sẵn sàng <span class="text-pink-400">tăng trưởng kênh</span> của bạn?
        </h2>
        <p class="text-xl text-gray-300 mb-10">
          Hàng ngàn creator đã remake thành công hàng triệu video. Đến lượt bạn!
        </p>
        <button
          class="bg-gradient-to-r from-pink-600 to-purple-700 px-10 py-5 rounded-full text-xl font-bold hover:shadow-2xl hover:scale-110 transition transform"
        >
          Bắt Đầu Ngay – Miễn Phí 7 Ngày
        </button>
      </div>
    </section>


  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// SVG Icons as string (safe with v-html)
const features = ref([
  {
    title: 'AI Chống Bản Quyền',
    desc: 'Tự động chỉnh sửa video, thay đổi âm thanh, hiệu ứng để tránh bị phát hiện.',
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-full h-full">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    `,
  },
  {
    title: 'Đa Nền Tảng',
    desc: 'Tự động đăng lên YouTube, TikTok, Facebook, Instagram Reels, Shorts cùng lúc.',
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-full h-full">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    `,
  },
  {
    title: 'Tự Động 100%',
    desc: 'Chỉ cần thêm link → AI xử lý → đăng tự động theo lịch bạn đặt.',
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-full h-full">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    `,
  },
])
</script>

<style scoped>
.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}
</style>
