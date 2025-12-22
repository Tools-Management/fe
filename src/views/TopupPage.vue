<template>
  <div
    class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6"
  >
    <div
      class="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white rounded-3xl shadow-2xl overflow-hidden"
    >
      <!-- Bên trái: Form nạp tiền -->
      <div class="p-6 lg:p-10 flex flex-col justify-center">
        <div class="text-center lg:text-left">
          <h1 class="text-4xl font-bold text-gray-800 mb-4">Nạp tiền vào ví</h1>
          <p class="text-lg text-red-600 mb-4">
            Chọn số tiền, quét mã QR để thanh toán. Sau khi chuyển khoản thành công, tiền sẽ tự động
            cộng vào ví trong vòng <strong>1 - 3 phút</strong>.
          </p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- Nhập số tiền thủ công -->
          <div>
            <label for="amount" class="block text-sm font-medium text-gray-700 mb-3">
              Số tiền cần nạp (VNĐ) <span class="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="amount"
              v-model="amount"
              placeholder="Nhập số tiền..."
              min="10000"
              class="w-full px-6 py-4 text-xl font-medium border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
              required
            />
          </div>

          <!-- Gợi ý số tiền nhanh -->
          <div>
            <p class="text-sm font-medium text-gray-700 mb-4">Hoặc chọn nhanh:</p>
            <div class="grid grid-cols-3 gap-4">
              <button
                v-for="preset in presetAmounts"
                :key="preset"
                type="button"
                @click="amount = preset"
                class="py-4 px-6 text-lg font-semibold rounded-xl border-2 transition-all"
                :class="
                  amount === preset
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg'
                    : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-indigo-50 hover:border-indigo-400'
                "
              >
                {{ preset >= 1000000 ? preset / 1000000 + 'M' : preset / 1000 + 'K' }}
              </button>
            </div>
          </div>

          <!-- Nút tạo QR -->
          <button
            type="submit"
            :disabled="loading || !amount"
            class="w-full py-5 px-8 text-xl font-bold text-white rounded-xl shadow-lg transition-all transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            :class="
              loading
                ? 'bg-gray-500'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
            "
          >
            {{ loading ? 'Đang tạo mã QR...' : 'Tạo mã QR thanh toán' }}
          </button>
        </form>

        <p
          v-if="error"
          class="mt-6 text-center text-red-600 font-medium bg-red-50 py-3 px-5 rounded-xl"
        >
          {{ error }}
        </p>
      </div>

      <!-- Bên phải: Hiển thị QR -->
      <div
        ref="qrSection"
        class="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 lg:p-10 flex flex-col items-center justify-center text-white"
      >
        <h2 class="text-3xl font-bold mb-8 text-center">Quét mã QR để thanh toán</h2>

        <div v-if="loading" class="my-16">
          <div
            class="w-32 h-32 border-8 border-white border-t-transparent rounded-full animate-spin"
          ></div>
          <p class="mt-6 text-xl">Đang tạo mã QR...</p>
        </div>

        <div v-else-if="qrImage" class="bg-white p-8 rounded-3xl shadow-2xl">
          <img :src="qrImage" alt="Mã QR thanh toán" class="w-90 h-90 object-contain" />
        </div>

        <div v-else class="text-center py-20">
          <div class="bg-gray-200 border-2 border-dashed rounded-xl w-64 h-64 mx-auto mb-8"></div>
          <p class="text-xl opacity-90">Nhập số tiền và nhấn "Tạo mã QR" để hiển thị</p>
          <p class="mt-4 text-lg opacity-80">Hỗ trợ tất cả ngân hàng qua VietQR</p>
        </div>

        <!-- Hướng dẫn nhỏ -->
        <div class="mt-12 text-center max-w-md">
          <p class="text-sm opacity-90">
            Mở ứng dụng ngân hàng → Quét mã QR → Chuyển đúng số tiền → Hoàn tất!
          </p>
          <p class="text-md text-green-500">
            Số dư ví sẽ tự động được cập nhật trong vòng 1 - 3 phút!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useTopupPayStore } from '@/store/topup_pay.store'
import { storeToRefs } from 'pinia'

const topupPayStore = useTopupPayStore()
const { loading, error } = storeToRefs(topupPayStore)

const amount = ref<number | null>(null)
const qrSection = ref<HTMLElement | null>(null)

const presetAmounts = [50000, 100000, 200000, 500000, 1000000, 2000000]

const handleSubmit = async () => {
  if (amount.value && amount.value >= 1000) {
    await topupPayStore.fetchQrCodeImage({ amount: amount.value })

    // Tự động scroll xuống phần QR ngay khi tạo xong (siêu mượt trên mobile)
    nextTick(() => {
      qrSection.value?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    })
  }
}

const qrImage = computed(() => topupPayStore.qrCodeUrl)

watch(qrImage, (newVal) => {
  if (newVal) {
    nextTick(() => {
      qrSection.value?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
  }
})
</script>
