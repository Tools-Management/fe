import { type LoginRequest, type User } from '@/types/user'
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
  //   register: (data: RegisterRequest) => Promise<void>
  logout: () => Promise<void>
  //   refreshToken: (token: string) => Promise<void>
  //   verifyOtp: (otp: string) => Promise<void>
  //   resendOtp: (email: string) => Promise<void>
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
