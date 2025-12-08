<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <FullScreenLayout>
    <div class="relative p-6 bg-white dark:bg-gray-900 sm:p-0">
      <div
        class="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900"
      >
        <!-- Sign In Form -->
        <div class="flex flex-col flex-1 w-full lg:w-1/2">
          <div class="w-full max-w-md pt-10 mx-auto">
            <router-link
              to="/"
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
              Back to home
            </router-link>
          </div>

          <div class="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
            <div>
              <div class="mb-5 sm:mb-8">
                <h1
                  class="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md"
                >
                  Sign In
                </h1>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Enter your email and password to sign in!
                </p>
              </div>

              <div>
                <form @submit.prevent="handleSubmit">
                  <div class="space-y-5">
                    <!-- Email -->
                    <div>
                      <label
                        for="email"
                        class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                      >
                        Email<span class="text-error-500">*</span>
                      </label>
                      <input
                        v-model="email"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="info@gmail.com"
                        :class="[
                          'h-11 w-full rounded-lg border bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30',
                          emailError
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
                            : 'border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700 dark:focus:border-brand-800',
                        ]"
                        @blur="validateEmail"
                        @input="emailError = ''"
                      />
                      <p v-if="emailError" class="mt-1 text-sm text-red-600 dark:text-red-400">
                        {{ emailError }}
                      </p>
                    </div>

                    <!-- Password -->
                    <div>
                      <label
                        for="password"
                        class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                      >
                        Password<span class="text-error-500">*</span>
                      </label>
                      <div class="relative">
                        <input
                          v-model="password"
                          :type="showPassword ? 'text' : 'password'"
                          id="password"
                          placeholder="Enter your password"
                          :class="[
                            'h-11 w-full rounded-lg border bg-transparent py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30',
                            passwordError
                              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
                              : 'border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700 dark:focus:border-brand-800',
                          ]"
                          @blur="validatePassword"
                          @input="passwordError = ''"
                        />
                        <span
                          @click="togglePasswordVisibility"
                          class="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                          :class="
                            passwordError ? 'text-red-400' : 'text-gray-500 dark:text-gray-400'
                          "
                        >
                          <svg
                            v-if="!showPassword"
                            class="fill-current"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M10.0002 13.8619C7.23361 13.8619 4.86803 12.1372 3.92328 9.70241C4.86804 7.26761 7.23361 5.54297 10.0002 5.54297C12.7667 5.54297 15.1323 7.26762 16.0771 9.70243C15.1323 12.1372 12.7667 13.8619 10.0002 13.8619Z"
                            />
                          </svg>
                          <svg
                            v-else
                            class="fill-current"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.63803 3.57709C4.34513 3.2842 3.87026 3.2842 3.57737 3.57709C3.28447 3.86999 3.28447 4.34486 3.57737 4.63775L16.4231 16.4229C16.716 16.13 16.716 15.6551 16.4231 15.3622L4.63803 3.57709Z"
                            />
                          </svg>
                        </span>
                      </div>
                      <p v-if="passwordError" class="mt-1 text-sm text-red-600 dark:text-red-400">
                        {{ passwordError }}
                      </p>
                    </div>

                    <!-- Checkbox and forgot password -->
                    <div class="flex items-center justify-between">
                      <label
                        for="keepLoggedIn"
                        class="flex items-center text-sm font-normal text-gray-700 cursor-pointer select-none dark:text-gray-400"
                      >
                        <input
                          v-model="keepLoggedIn"
                          type="checkbox"
                          id="keepLoggedIn"
                          class="mr-2"
                        />
                        Keep me logged in
                      </label>
                      <router-link
                        to="/reset-password"
                        class="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                      >
                        Forgot password?
                      </router-link>
                    </div>

                    <!-- General Error -->
                    <div
                      v-if="generalError"
                      class="p-3 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/20 dark:border-red-800"
                    >
                      <p class="text-sm text-red-600 dark:text-red-400">{{ generalError }}</p>
                    </div>

                    <!-- Submit button -->
                    <div>
                      <button
                        type="submit"
                        :disabled="isLoading || !isFormValid"
                        class="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        :class="
                          isFormValid && !isLoading
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
                        {{ isLoading ? 'Đang đăng nhập...' : 'Sign In' }}
                      </button>
                    </div>
                  </div>
                </form>

                <div class="mt-5">
                  <p class="text-sm font-normal text-center text-gray-700 dark:text-gray-400">
                    Don't have an account?
                    <router-link
                      to="/signup"
                      class="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                    >
                      Sign Up
                    </router-link>
                  </p>
                </div>
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
                AIRemake<span class="text-pink-400">.tools</span>
              </div>
              <h1 class="text-3xl md:text-4xl font-extrabold leading-tight text-white">
                Remake Video Tự Động <br />
                <span
                  class="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"
                >
                  Bằng AI Siêu Thông Minh
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </FullScreenLayout>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import FullScreenLayout from '@/components/layout/FullScreenLayout.vue'
import bgSignin from '@/assets/images/bg-signin.jpg'
import { useAuthStore } from '@/store/auth'

// Reactive data
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const keepLoggedIn = ref(false)
const isLoading = ref(false)

// Validation
const emailError = ref('')
const passwordError = ref('')
const generalError = ref('')

const authStore = useAuthStore()

// Computed
const isFormValid = computed(() => {
  return email.value.trim() && password.value.trim() && !emailError.value && !passwordError.value
})

// Methods
const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.value.trim()) {
    emailError.value = 'Email là bắt buộc'
    return false
  } else if (!emailRegex.test(email.value)) {
    emailError.value = 'Email không hợp lệ'
    return false
  } else {
    emailError.value = ''
    return true
  }
}

const validatePassword = () => {
  if (!password.value.trim()) {
    passwordError.value = 'Mật khẩu là bắt buộc'
    return false
  } else if (password.value.length < 6) {
    passwordError.value = 'Mật khẩu phải có ít nhất 6 ký tự'
    return false
  } else {
    passwordError.value = ''
    return true
  }
}

const validateForm = () => {
  const isEmailValid = validateEmail()
  const isPasswordValid = validatePassword()
  return isEmailValid && isPasswordValid
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const clearErrors = () => {
  emailError.value = ''
  passwordError.value = ''
  generalError.value = ''
}

const handleSubmit = async () => {
  clearErrors()

  if (!validateForm()) return

  isLoading.value = true
  generalError.value = ''

  try {
    await authStore.login({
      email: email.value.trim(),
      password: password.value,
    })

    // If login successful, authStore will handle navigation
  } catch (error: unknown) {
    const err = error as { message?: string }
    generalError.value = err.message || 'Đăng nhập thất bại. Vui lòng thử lại.'
  } finally {
    isLoading.value = false
  }
}

// Watch for real-time validation
watch(email, () => {
  if (emailError.value) validateEmail()
})

watch(password, () => {
  if (passwordError.value) validatePassword()
})
</script>

<style scoped></style>
