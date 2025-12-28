<template>
    <div class="min-h-screen py-2 px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <!-- Title -->
        <h1
          class="text-3xl md:text-4xl font-bold text-center mb-5 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent"
        >
          Mở Ticket Hỗ Trợ
        </h1>

        <!-- Alert: Hỗ trợ nhanh -->
        <div
          class="bg-gradient-to-r from-orange-100 to-red-100 border border-orange-300 text-orange-700 p-4 rounded-xl mb-4 shadow-sm"
        >
          <p class="text-sm font-medium">
            Để được hỗ trợ nhanh chóng, vui lòng nêu rõ vấn đề hoặc ID cần hỗ trợ khi liên hệ.
          </p>
        </div>

        <!-- Success Message -->
        <div
          v-if="success"
          class="mb-4 p-6 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300 text-green-800 rounded-xl text-center"
        >
          <p class="font-bold text-lg">🎉 Ticket đã được tạo thành công!</p>
          <p class="text-sm mt-1">
            Mã ticket: <strong>#{{ ticketId }}</strong>
          </p>
          <p class="text-sm mt-2">Chúng tôi sẽ phản hồi trong vòng 1-2 giờ làm việc.</p>
          <router-link
            to="/ticket-support"
            class="mt-3 inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Xem danh sách ticket
          </router-link>
        </div>

        <!-- Form -->
        <form
          @submit.prevent="submitTicket"
          class="space-y-6 text-gray-700 dark:text-gray-400 rounded-2xl p-8 shadow-xl border"
        >
          <!-- Phòng ban -->
          <div>
            <label
              for="department"
              class="text-sm font-medium text-gray-700 dark:text-gray-400 mb-2"
              >Phòng ban <span class="text-pink-400">*</span></label
            >
            <div class="relative z-20 bg-transparent">
              <select
                v-model="form.department"
                class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                :class="{ 'text-gray-800 dark:text-white/90': form.department }"
              >
                <option value="" disabled>Chọn phòng ban</option>
                <option value="technical">Phòng kỹ thuật</option>
                <option value="billing">Thanh toán & Hóa đơn</option>
                <option value="account">Tài khoản & Đăng nhập</option>
                <option value="other">Khác</option>
              </select>
              <span
                class="absolute z-30 text-gray-500 -translate-y-1/2 pointer-events-none right-4 top-1/2 dark:text-gray-400"
              >
                <svg
                  class="stroke-current"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396"
                    stroke=""
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>

          <!-- Tiêu đề -->
          <div>
            <label for="title" class="text-sm font-medium text-gray-700 dark:text-gray-400"
              >Tiêu đề <span class="text-pink-400">*</span></label
            >
            <input
              id="title"
              v-model="form.title"
              type="text"
              required
              placeholder="VD: Không thể remake video từ TikTok"
              class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            />
          </div>

          <!-- Nội dung -->
          <div>
            <label for="content" class="text-sm font-medium text-gray-700 dark:text-gray-400 mb-2"
              >Nội dung <span class="text-pink-400">*</span></label
            >
            <textarea
              id="content"
              v-model="form.content"
              rows="6"
              required
              placeholder="Mô tả chi tiết vấn đề bạn đang gặp phải..."
              class="dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            ></textarea>
          </div>

          <!-- Đơn hàng -->
          <!-- <div>
            <label for="order" class="text-sm font-medium text-gray-700 dark:text-gray-400 mb-2"
              >Đơn hàng (nếu có)</label
            >

            <div class="relative z-20 bg-transparent">
              <select
                id="order"
                v-model="form.order"
                class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                :class="{ 'text-gray-800 dark:text-white/90': form.order }"
              >
                <option value="">Chọn đơn hàng</option>
                <option value="Nap-tien">Nạp tiền tài khoản</option>
                <option value="remake-PRO">Gói Remake Pro</option>
                <option value="API-ACCESS">API Key</option>
              </select>
              <span
                class="absolute z-30 text-gray-500 -translate-y-1/2 pointer-events-none right-4 top-1/2 dark:text-gray-400"
              >
                <svg
                  class="stroke-current"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396"
                    stroke=""
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div> -->

          <!-- Số điện thoại -->
          <div>
            <label for="phone" class="text-sm font-medium text-gray-700 dark:text-gray-400 mb-2"
              >Số điện thoại (Zalo/Telegram)</label
            >
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              placeholder="0901234567"
              class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            />
          </div>

          <!-- reCAPTCHA -->
          <div class="flex items-center gap-3">
            <input
              type="checkbox"
              id="not-robot"
              v-model="form.notRobot"
              required
              class="w-5 h-5 text-pink-600 rounded focus:ring-pink-500"
            />
            <label for="not-robot" class="text-sm text-gray-700 dark:text-gray-400"
              >Tôi không phải là người máy</label
            >
            <div class="ml-auto">
              <img :src="reCapcha" alt="reCAPTCHA" class="h-10" />
            </div>
          </div>

          <!-- Submit Button -->
          <div class="pt-4">
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-4 rounded-xl hover:shadow-xl hover:scale-[1.02] transition transform disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg v-if="isSubmitting" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>{{ isSubmitting ? 'Đang gửi...' : 'Tạo yêu cầu' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import reCapcha from '@/assets/images/reCapcha.png'
import { useTicketStore } from '@/store/ticket.store'
import { useToast } from '@/composables/useToast'

interface TicketForm {
  department: string
  title: string
  content: string
  order: string
  phone: string
  notRobot: boolean
}

const ticketStore = useTicketStore()
const { toastSuccess, toastError } = useToast()

const form = reactive<TicketForm>({
  department: '',
  title: '',
  content: '',
  order: '',
  phone: '',
  notRobot: false,
})

const isSubmitting = ref(false)
const success = ref(false)
const ticketId = ref('')

const submitTicket = async () => {
  if (!form.notRobot) return

  isSubmitting.value = true
  success.value = false

  try {
    // Tạo ticket data phù hợp với server API
    const ticketData = {
      title: form.title,
      content: form.content,
      department: form.department,
      order: form.order || undefined,
      phone: form.phone || undefined,
      status: 'pending' as const, // Status mặc định khi tạo
    }

    await ticketStore.createTicket(ticketData)
    success.value = true
    toastSuccess('Ticket đã được tạo thành công!')

    // Reset form
    Object.assign(form, {
      department: '',
      title: '',
      content: '',
      order: '',
      phone: '',
      notRobot: false,
    })

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Có lỗi xảy ra khi tạo ticket'
    toastError(message)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
input::placeholder,
textarea::placeholder,
select option {
  color: #9ca3af;
}
</style>
