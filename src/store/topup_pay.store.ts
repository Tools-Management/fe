import { defineStore } from 'pinia'
import { ResponseError } from '@/utils/error'
import { topupPayService } from '@/services/topup_pay.service'
import type { ITopupPayQrCodeRequest } from '@/types/topup_pay'

interface TopupPayState {
  qrCodeUrl: string | null
  loading: boolean
  error: string
}
interface TopupPayActions {
  fetchQrCodeImage: (query: ITopupPayQrCodeRequest) => Promise<string | null>
  createTopupRequest: (body: ITopupPayQrCodeRequest) => Promise<boolean>
}

export const useTopupPayStore = defineStore<
  'topupPay',
  TopupPayState,
  Record<string, never>,
  TopupPayActions
>('topupPay', {
  state: (): TopupPayState => ({
    qrCodeUrl: null,
    loading: false,
    error: '',
  }),

  actions: {
    async fetchQrCodeImage(query: ITopupPayQrCodeRequest): Promise<string | null> {
      this.loading = true
      this.error = ''

      try {
        const response = await topupPayService.getQrCodeImage(query)
        
        if (response instanceof ResponseError) throw response

        if (this.qrCodeUrl) {
          URL.revokeObjectURL(this.qrCodeUrl)
        }

        const newQrCodeUrl = URL.createObjectURL(response)
        this.qrCodeUrl = newQrCodeUrl

        return newQrCodeUrl
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'An unexpected error occurred.'
        // Đảm bảo qrCodeUrl được reset nếu có lỗi
        if (this.qrCodeUrl) {
          URL.revokeObjectURL(this.qrCodeUrl)
          this.qrCodeUrl = null
        }
        return null
      } finally {
        this.loading = false
      }
    },

    async createTopupRequest(body: ITopupPayQrCodeRequest) {
      this.loading = true
      this.error = ''

      try {
        const response = await topupPayService.createTopupRequest(body)

        if (response instanceof ResponseError) throw response

        return response.data
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'An unexpected error occurred.'
        return false
      } finally {
        this.loading = false
      }
    },
  },
})
