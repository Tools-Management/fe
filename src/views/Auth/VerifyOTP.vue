<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <FullScreenLayout>
    <div class="relative p-6 bg-white dark:bg-gray-900 sm:p-0">
      <div
        class="relative flex flex-col justify-center w-full min-h-screen lg:h-screen lg:flex-row dark:bg-gray-900"
      >
        <!-- OTP Form -->
        <div class="flex flex-col flex-1 w-full lg:w-1/2">
          <div class="w-full max-w-md pt-10 mx-auto">
            <router-link
              to="/signin"
              class="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <svg
                class="stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M12.7083 5L7.5 10.2083L12.7083 15.4167"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Back to sign in
            </router-link>
          </div>

          <div class="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
            <div>
              <div class="mb-5 sm:mb-8">
                <h1
                  class="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md"
                >
                  Verify Your Email
                </h1>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  We've sent a 6-digit verification code to
                  <span class="font-medium text-gray-700 dark:text-gray-300">{{ email }}</span>
                </p>
              </div>

              <div>
                <form @submit.prevent="handleSubmit">
                  <div class="space-y-5">
                    <!-- OTP Input -->
                    <div>
                      <label
                        class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                      >
                        Verification Code<span class="text-error-500">*</span>
                      </label>
                      <div class="flex gap-2">
                        <input
                          v-for="(digit, index) in otpDigits"
                          :key="index"
                          ref="otpRefs"
                          v-model="otpDigits[index]"
                          type="text"
                          maxlength="1"
                          class="h-12 w-12 text-center text-xl font-semibold rounded-lg border bg-transparent focus:outline-none focus:ring-2 dark:bg-gray-900 dark:text-white/90"
                          :class="
                            otpError
                              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                              : 'border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800'
                          "
                          @input="handleOtpInput(index, $event)"
                          @keydown="handleOtpKeydown(index, $event)"
                          @paste="handleOtpPaste"
                        />
                      </div>
                      <p v-if="otpError" class="mt-1 text-sm text-red-600 dark:text-red-400">
                        {{ otpError }}
                      </p>
                    </div>

                    <!-- General Error -->
                    <div
                      v-if="generalError"
                      class="p-3 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/20 dark:border-red-800"
                    >
                      <p class="text-sm text-red-600 dark:text-red-400">{{ generalError }}</p>
                    </div>

                    <!-- Submit Button -->
                    <div>
                      <button
                        type="submit"
                        :disabled="isLoading || !isOtpComplete"
                        class="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        :class="
                          isOtpComplete && !isLoading
                            ? 'bg-brand-500 hover:bg-brand-600'
                            : 'bg-gray-400'
                        "
                      >
                        <svg
                          v-if="isLoading"
                          class="w-4 h-4 mr-2 animate-spin"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
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
                        {{ isLoading ? 'Đang xác thực...' : 'Verify Email' }}
                      </button>
                    </div>

                    <!-- Resend OTP -->
                    <div class="text-center">
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        Didn't receive the code?
                        <button
                          type="button"
                          @click="handleResendOtp"
                          :disabled="isResending || resendCooldown > 0"
                          class="font-medium text-brand-500 hover:text-brand-600 disabled:text-gray-400 disabled:cursor-not-allowed"
                        >
                          {{
                            isResending
                              ? 'Đang gửi...'
                              : resendCooldown > 0
                                ? `Gửi lại sau ${resendCooldown}s`
                                : 'Gửi lại'
                          }}
                        </button>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <!-- Background + content -->
        <div class="hidden lg:block lg:w-1/2 relative">
          <img :src="bgSignin" alt="" class="absolute inset-0 w-full h-full object-cover" />
          <div class="absolute inset-0 bg-black/40"></div>
          <div
            class="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
          >
            <div class="space-y-6 max-w-lg">
              <div
                class="2xl:text-7xl text-6xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
              >
                AIRemake<span class="text-pink-400">Pro</span>
              </div>
              <h1 class="text-3xl md:text-4xl font-extrabold leading-tight text-white">
                Xác Thực Email <br />
                <span
                  class="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"
                >
                  Bước Cuối Cùng
                </span>
              </h1>
              <p class="text-lg text-gray-200">
                Kiểm tra email của bạn và nhập mã xác thực để hoàn tất đăng ký tài khoản.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </FullScreenLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import FullScreenLayout from '@/components/layout/FullScreenLayout.vue'
import bgSignin from '@/assets/images/bg-signin.jpg'
import { useAuthStore } from '@/store/auth'
import type { VerifyOtpRequest, ResendOtpRequest } from '@/types/user'
import { useToast } from '@/composables/useToast'

// Router & Route
const route = useRoute()

const { toastSuccess } = useToast()

// Store
const authStore = useAuthStore()

// Reactive data
const email = ref((route.query.email as string) || '')
const check = ref((route.query.check as string) || '')
const otpDigits = ref(['', '', '', '', '', ''])
const otpRefs = ref<HTMLInputElement[]>([])
const isLoading = ref(false)
const isResending = ref(false)
const resendCooldown = ref(0)

// Validation
const otpError = ref('')
const generalError = ref('')

// Computed
const isOtpComplete = computed(() => otpDigits.value.every((digit) => digit !== ''))
const otpCode = computed(() => otpDigits.value.join(''))

// Methods
const validateOtp = () => {
  if (!isOtpComplete.value) {
    otpError.value = 'Vui lòng nhập đầy đủ mã xác thực'
    return false
  }

  if (!/^\d{6}$/.test(otpCode.value)) {
    otpError.value = 'Mã xác thực chỉ được chứa số'
    return false
  }

  otpError.value = ''
  return true
}

const handleOtpInput = (index: number, event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value

  // Only allow numbers
  if (!/^\d*$/.test(value)) {
    otpDigits.value[index] = ''
    return
  }

  // Auto focus next input
  if (value && index < otpDigits.value.length - 1) {
    nextTick(() => {
      otpRefs.value[index + 1]?.focus()
    })
  }

  otpError.value = ''
}

const handleOtpKeydown = (index: number, event: KeyboardEvent) => {
  if (event.key === 'Backspace' && !otpDigits.value[index] && index > 0) {
    // Move to previous input on backspace
    otpRefs.value[index - 1]?.focus()
  }
}

const handleOtpPaste = (event: ClipboardEvent) => {
  event.preventDefault()
  const paste = event.clipboardData?.getData('text')

  if (paste && /^\d{6}$/.test(paste)) {
    otpDigits.value = paste.split('')
    otpError.value = ''
  }
}

const clearErrors = () => {
  otpError.value = ''
  generalError.value = ''
}

const handleSubmit = async () => {
  clearErrors()

  if (!validateOtp()) return

  isLoading.value = true
  generalError.value = ''

  try {
    const verifyData: VerifyOtpRequest = {
      email: email.value,
      otp: otpCode.value,
    }

    const result = await authStore.verifyOtp(verifyData)

    if (result) {
      generalError.value = result
      return
    }
    toastSuccess('Đăng ký thành công, vui lòng kiểm tra email để xác thực OTP')
    // If successful, authStore will handle navigation
  } catch (error: unknown) {
    generalError.value =
      (error as { message: string | undefined })?.message || 'Xác thực thất bại. Vui lòng thử lại.'
  } finally {
    isLoading.value = false
  }
}

const handleResendOtp = async () => {
  if (resendCooldown.value > 0) return

  isResending.value = true
  clearErrors()

  try {
    const resendData: ResendOtpRequest = {
      email: email.value,
    }

    await authStore.resendOtp(resendData)

    // Start cooldown
    resendCooldown.value = 60
    const timer = setInterval(() => {
      resendCooldown.value--
      if (resendCooldown.value <= 0) {
        clearInterval(timer)
      }
    }, 1000)
  } catch (error: unknown) {
    generalError.value =
      (error as { message: string | undefined })?.message ||
      'Gửi lại mã thất bại. Vui lòng thử lại.'
  } finally {
    isResending.value = false
  }
}

// Focus first input on mount
onMounted(async () => {
  nextTick(() => {
    otpRefs.value[0]?.focus()
  })
  if(check.value === 'signin') {
    await handleResendOtp()
  }
})
</script>

<style scoped></style>
