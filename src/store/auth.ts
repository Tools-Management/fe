import { type LoginRequest, type RegisterRequest, type User, type VerifyOtpRequest, type ResendOtpRequest } from '@/types/user'
import { authService } from '@/services/auth.service'
import { defineStore } from 'pinia'
import { ResponseError } from '@/utils/error'
import { HttpStatusCode } from 'axios'
import router from '@/router'
import { USER_ROLES } from '@/constants'

interface AuthState {
  user: User | null
  accessToken: string
  refreshToken: string
  expiresIn: number
  loading: boolean
  error: string
}

interface AuthActions {
  login: (credentials: LoginRequest) => Promise<void>
  getMe: () => Promise<void>
  register: (data: RegisterRequest) => Promise<void>
  logout: () => Promise<void>
  verifyOtp: (data: VerifyOtpRequest) => Promise<void>
  resendOtp: (data: ResendOtpRequest) => Promise<void>
  //   refreshToken: (token: string) => Promise<void>
  //   forgotPassword: (email: string) => Promise<void>
  //   resetPassword: (token: string, password: string) => Promise<void>
}

export const useAuthStore = defineStore<
  'auth',
  AuthState,
  {
    isLoggedIn: (state: AuthState) => boolean
    isAdmin: (state: AuthState) => boolean
    isSuperAdmin: (state: AuthState) => boolean
  },
  AuthActions
>('auth', {
  state: (): AuthState => ({
    user: null,
    accessToken: '',
    refreshToken: '',
    expiresIn: 0,
    loading: false,
    error: '',
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,

    isAdmin: (state): boolean =>
      state.user?.role === USER_ROLES.ROLE_ADMIN ||
      state.user?.role === USER_ROLES.ROLE_SUPER_ADMIN,

    isSuperAdmin: (state): boolean => state.user?.role === USER_ROLES.ROLE_SUPER_ADMIN,
  },

  actions: {
    async login(credentials: LoginRequest) {
      this.loading = true
      this.error = ''

      try {
        const result = await authService.login(credentials)

        if (result instanceof ResponseError) {
          this.error = result.message
          return
        }

        const { user, tokens } = result.data

        this.user = user
        this.accessToken = tokens.accessToken
        this.refreshToken = tokens.refreshToken
        this.expiresIn = tokens.expiresIn

        const isAdmin =
          user.role === USER_ROLES.ROLE_ADMIN || user.role === USER_ROLES.ROLE_SUPER_ADMIN

        router.push(isAdmin ? '/administrators' : '/')
      } catch (err) {
        if (err instanceof ResponseError && err.status === HttpStatusCode.InternalServerError)
          return
        this.error = err instanceof Error ? err.message : 'An unexpected error occurred.'
      } finally {
        this.loading = false
      }
    },

    async getMe() {
      this.loading = true
      this.error = ''

      try {
        const result = await authService.getMe()

        if (result instanceof ResponseError) {
          this.error = result.message
          return
        }

        this.user = result.data
      } catch (err) {
        if (err instanceof ResponseError && err.status === HttpStatusCode.InternalServerError)
          return
        this.error = err instanceof Error ? err.message : 'An unexpected error occurred.'
      } finally {
        this.loading = false
      }
    },

    async register(data: RegisterRequest) {
      this.loading = true
      this.error = ''

      try {
        const result = await authService.register(data)

        if (result instanceof ResponseError) {
          this.error = result.message
          return
        }

        // Registration successful, redirect to OTP verification
        router.push({
          path: '/verify-otp',
          query: { email: data.email }
        })
      } catch (err) {
        if (err instanceof ResponseError && err.status === HttpStatusCode.InternalServerError)
          return
        this.error = err instanceof Error ? err.message : 'Registration failed.'
      } finally {
        this.loading = false
      }
    },

    async verifyOtp(data: VerifyOtpRequest) {
      this.loading = true
      this.error = ''

      try {
        const result = await authService.verifyOtp(data)

        if (result instanceof ResponseError) {
          this.error = result.message
          return
        }

        // OTP verification successful, redirect to login
        router.push('/signin?verified=true')
      } catch (err) {
        if (err instanceof ResponseError && err.status === HttpStatusCode.InternalServerError)
          return
        this.error = err instanceof Error ? err.message : 'OTP verification failed.'
      } finally {
        this.loading = false
      }
    },

    async resendOtp(data: ResendOtpRequest) {
      this.loading = true
      this.error = ''

      try {
        const result = await authService.resendOtp(data)

        if (result instanceof ResponseError) {
          this.error = result.message
          return
        }

        // OTP resent successfully
        console.log('OTP resent successfully')
      } catch (err) {
        if (err instanceof ResponseError && err.status === HttpStatusCode.InternalServerError)
          return
        this.error = err instanceof Error ? err.message : 'Failed to resend OTP.'
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        await authService.logout()
      } finally {
        this.$reset()
        router.push('/')
      }
    },
  },
})
