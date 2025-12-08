import type {
  UserWallet,
  WalletTopup,
  CreateTopupRequest,
  TopupHistoryResponse,
  WalletBalance
} from '@/types/wallet'
import { walletService } from '@/services/wallet.service'
import { defineStore } from 'pinia'
import { ResponseError } from '@/utils/error'
import { HttpStatusCode } from 'axios'

interface BillingState {
  wallet: UserWallet | null
  balance: WalletBalance | null
  topups: WalletTopup[]
  currentTopup: WalletTopup | null
  topupHistory: TopupHistoryResponse | null
  loading: boolean
  error: string
  topupLoading: boolean
  historyLoading: boolean
}

interface BillingActions {
  getWallet: () => Promise<void>
  getBalance: () => Promise<void>
  createTopup: (data: CreateTopupRequest) => Promise<string | null>
  getTopupHistory: (page?: number, limit?: number) => Promise<void>
  getTopupDetail: (topupCode: string) => Promise<void>
  clearError: () => void
}

export const useBillingStore = defineStore<
  'billing',
  BillingState,
  {
    hasWallet: (state: BillingState) => boolean
    hasBalance: (state: BillingState) => boolean
    pendingTopups: (state: BillingState) => WalletTopup[]
    completedTopups: (state: BillingState) => WalletTopup[]
  },
  BillingActions
>('billing', {
  state: (): BillingState => ({
    wallet: null,
    balance: null,
    topups: [],
    currentTopup: null,
    topupHistory: null,
    loading: false,
    error: '',
    topupLoading: false,
    historyLoading: false,
  }),

  getters: {
    hasWallet: (state) => !!state.wallet,
    hasBalance: (state) => !!state.balance,
    pendingTopups: (state) =>
      state.topups.filter(topup => topup.status === 'pending'),
    completedTopups: (state) =>
      state.topups.filter(topup => topup.status === 'completed'),
  },

  actions: {
    async getWallet() {
      this.loading = true
      this.error = ''

      try {
        const result = await walletService.getWallet()

        if (result instanceof ResponseError) {
          this.error = result.message
          return
        }

        this.wallet = result.data
      } catch (err) {
        if (err instanceof ResponseError && err.status === HttpStatusCode.InternalServerError)
          return
        this.error = err instanceof Error ? err.message : 'An unexpected error occurred.'
      } finally {
        this.loading = false
      }
    },

    async getBalance() {
      this.loading = true
      this.error = ''

      try {
        const result = await walletService.getBalance()

        if (result instanceof ResponseError) {
          this.error = result.message
          return
        }

        this.balance = result.data
      } catch (err) {
        if (err instanceof ResponseError && err.status === HttpStatusCode.InternalServerError)
          return
        this.error = err instanceof Error ? err.message : 'An unexpected error occurred.'
      } finally {
        this.loading = false
      }
    },

    async createTopup(data: CreateTopupRequest): Promise<string | null> {
      this.topupLoading = true
      this.error = ''

      try {
        const result = await walletService.createTopup(data)

        if (result instanceof ResponseError) {
          this.error = result.message
          return null
        }

        // Refresh wallet balance after topup creation
        await this.getBalance()

        return result.data.paymentUrl
      } catch (err) {
        if (err instanceof ResponseError && err.status === HttpStatusCode.InternalServerError)
          return null
        this.error = err instanceof Error ? err.message : 'An unexpected error occurred.'
        return null
      } finally {
        this.topupLoading = false
      }
    },

    async getTopupHistory(page = 1, limit = 20) {
      this.historyLoading = true
      this.error = ''

      try {
        const result = await walletService.getTopupHistory({ page, limit })

        if (result instanceof ResponseError) {
          this.error = result.message
          return
        }

        this.topupHistory = result.data
        this.topups = result.data.topups
      } catch (err) {
        if (err instanceof ResponseError && err.status === HttpStatusCode.InternalServerError)
          return
        this.error = err instanceof Error ? err.message : 'An unexpected error occurred.'
      } finally {
        this.historyLoading = false
      }
    },

    async getTopupDetail(topupCode: string) {
      this.loading = true
      this.error = ''

      try {
        const result = await walletService.getTopupDetail(topupCode)

        if (result instanceof ResponseError) {
          this.error = result.message
          return
        }

        this.currentTopup = result.data
      } catch (err) {
        if (err instanceof ResponseError && err.status === HttpStatusCode.InternalServerError)
          return
        this.error = err instanceof Error ? err.message : 'An unexpected error occurred.'
      } finally {
        this.loading = false
      }
    },

    clearError() {
      this.error = ''
    },
  },
})