<!-- eslint-disable vue/multi-word-component-names -->
 <template>
  <div class="min-h-screen bg-white text-gray-800">
    <!-- Header -->
    <header class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-6 shadow-lg">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-3xl md:text-4xl font-bold">AI Remake Tools</h1>
        <p class="mt-2 opacity-90">
          Công cụ AI chỉnh sửa video chuyên nghiệp – Biến ý tưởng thành hiện thực chỉ trong vài giây
        </p>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-12 max-w-5xl">
      <!-- Introduction Section -->
      <section class="text-center mb-16">
        <h2 class="text-3xl font-bold text-gray-900 mb-6">Giới thiệu AI Remake Tools Pro</h2>
        <p class="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
          <strong>AI Remake Tools</strong> là phần mềm chỉnh sửa video thông minh sử dụng trí tuệ
          nhân tạo để tự động hóa toàn bộ quy trình làm video. Chỉ cần tải lên video thô, AI sẽ tự
          động:
          <span class="text-blue-600 font-semibold"
            >xóa nền, tạo phụ đề, cắt ghép thông minh, thêm hiệu ứng chuyển cảnh, và xuất file chất
            lượng cao không watermark</span
          >.
        </p>
      </section>

      <!-- Video Demo -->
      <section class="mb-16">
        <div class="bg-gray-100 rounded-xl overflow-hidden shadow-xl aspect-video">
          <iframe
            class="w-full h-full"
            :src="embedUrl"
            title="AI Remake Tools Demo"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <p class="text-center text-sm text-gray-500 mt-3">
          Video demo: Từ video thô → Video chuyên nghiệp chỉ trong 30 giây
        </p>
      </section>

      <!-- Features -->
      <section class="mb-16">
        <h3 class="text-2xl font-bold text-center mb-8">Tính năng nổi bật</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex items-start space-x-3 bg-blue-50 p-5 rounded-lg">
            <div
              class="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold"
            >
              1
            </div>
            <div>
              <h4 class="font-semibold text-gray-900">Xóa nền tự động bằng AI</h4>
              <p class="text-gray-600">Loại bỏ nền xanh hoặc phức tạp chỉ trong 1 click.</p>
            </div>
          </div>
          <div class="flex items-start space-x-3 bg-indigo-50 p-5 rounded-lg">
            <div
              class="flex-shrink-0 w-10 h-10 bg-indigo-700 text-white rounded-full flex items-center justify-center font-bold"
            >
              2
            </div>
            <div>
              <h4 class="font-semibold text-gray-900">Tạo phụ đề AI chính xác 98%</h4>
              <p class="text-gray-600">Hỗ trợ tiếng Việt, tự động đồng bộ lời nói.</p>
            </div>
          </div>
          <div class="flex items-start space-x-3 bg-blue-50 p-5 rounded-lg">
            <div
              class="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold"
            >
              3
            </div>
            <div>
              <h4 class="font-semibold text-gray-900">Chỉnh sửa bằng lệnh văn bản</h4>
              <p class="text-gray-600">
                Gõ: "Cắt đoạn im lặng", "Thêm logo góc phải" → AI làm ngay.
              </p>
            </div>
          </div>
          <div class="flex items-start space-x-3 bg-indigo-50 p-5 rounded-lg">
            <div
              class="flex-shrink-0 w-10 h-10 bg-indigo-700 text-white rounded-full flex items-center justify-center font-bold"
            >
              4
            </div>
            <div>
              <h4 class="font-semibold text-gray-900">Xuất file 4K không watermark</h4>
              <p class="text-gray-600">Sẵn sàng đăng YouTube, TikTok, Reels.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Call to Action -->
      <section class="text-center">
        <h3 class="text-2xl font-bold mb-6">Sẵn sàng trải nghiệm?</h3>
        <p class="text-gray-600 mb-8">Tải bản dùng thử miễn phí ngay hôm nay!</p>
        <button
          @click="handleDownload"
          class="inline-block bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          Dùng Thử Miễn Phí
        </button>
        <p class="mt-4 text-sm text-gray-500">
          Bản dùng thử đầy đủ tính năng • Không cần thẻ tín dụng • Hỗ trợ Windows & macOS
        </p>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useLinkStore } from '@/store/link.store';
import { computed, onMounted } from 'vue';

const linkStore = useLinkStore()

onMounted(() => {
  linkStore.loadLinks()
})

const handleDownload = () => {
  // Thay YOUR_FILE_ID bằng ID file thực tế trên Google Drive
  const driveLink = linkStore.toolDownloadLink
  window.open(driveLink, '_blank')
}

const introVideoUrl = computed(() => {
  return linkStore.toolIntroVideoLink
})

const embedUrl = computed(() => {
  return getEmbedUrl(introVideoUrl.value)
})

function getEmbedUrl(link: string) {
  if (!link) return ''

  // B1: Lấy ID từ Google Drive link
  const match = link.match(/\/file\/d\/([^/]+)\//)

  if (!match) {
    console.warn('Link Google Drive không hợp lệ:', link)
    return link // trả về nguyên gốc nếu sai
  }

  const fileId = match[1]

  // B2: tạo link preview (hiển thị file trong iframe)
  return `https://drive.google.com/file/d/${fileId}/preview`
}
</script>

<style scoped>
/* Tùy chỉnh nhẹ cho video */
video {
  max-height: 500px;
}
</style>
