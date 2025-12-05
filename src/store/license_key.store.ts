// src/store/license_key.store.ts
import { licenseKeyService } from '@/services/license_key.service'
import type { IPagination } from '@/types/ticket'
import type { 
  ILicenseKey, 
  ICreateLicenseKeyRequest, 
  IUpdateLicenseKeyRequest, 
  IGenerateLicenseKeysRequest, 
  LicenseKeyStats,
  IPurchaseLicenseKeyRequest,
} from '@/types/license'
import { ResponseError } from '@/utils/error'
import { defineStore } from 'pinia'

interface LicenseKeyState {
  stats: LicenseKeyStats
  licenseKeys: ILicenseKey[]
  myLicenseKeys: ILicenseKey[]
  licenseKey: ILicenseKey | null
  pagination: IPagination
  loading: boolean
  error: string
}

interface LicenseKeyActions {
  getLicenseKeys: (params?: {
    page?: number
    limit?: number
    duration?: string
    isUsed?: boolean
    isActive?: boolean
  }) => Promise<void>
  getLicenseKeyStats: () => Promise<void>
  getMyLicenseKeys: () => Promise<void>
  syncLicenseKeys: () => Promise<{ synced: number; skipped: number; updated: number } | null>
  purchaseLicenseKey: (data: IPurchaseLicenseKeyRequest) => Promise<{ key: string; duration: string; purchasedAt: string } | null>
  deleteLicenseKey: (id: number) => Promise<void>
  
  // Old actions (for external API management)
  getLicenseKeyById: (id: string) => Promise<void>
  createLicenseKey: (data: ICreateLicenseKeyRequest) => Promise<void>
  updateLicenseKey: (id: string, data: IUpdateLicenseKeyRequest) => Promise<void>
  deleteLicenseKeyExternal: (id: string) => Promise<void>
  generateLicenseKeys: (data: IGenerateLicenseKeysRequest) => Promise<void>
}

export const useLicenseKeyStore = defineStore<
  'licenseKey',
  LicenseKeyState,
  Record<string, never>,
  LicenseKeyActions
>('licenseKey', {
  state: (): LicenseKeyState => ({
    stats: {
      total: 0,
      used: 0,
      available: 0,
      byDuration: [],
    },
    licenseKeys: [],
    myLicenseKeys: [],
    licenseKey: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    },
    loading: false,
    error: '',
  }),

  actions: {
    // New actions
    async getLicenseKeys(params?: {
      page?: number
      limit?: number
      duration?: string
      isUsed?: boolean
      isActive?: boolean
    }) {
      this.error = ''

      try {
        const response = await licenseKeyService.getAllLicenseKeys(params)

        if (response instanceof ResponseError) throw response
        
        this.licenseKeys = response.data.data
        this.pagination = response.data.pagination
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'An unexpected error occurred.'
        throw error
      } finally {
        this.loading = false
      }
    },

    async getLicenseKeyStats() {
      this.error = ''

      try {
        const response = await licenseKeyService.getLicenseKeyStats()

        if (response instanceof ResponseError) throw response

        this.stats = response.data as LicenseKeyStats
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'An unexpected error occurred.'
        throw error
      }
    },

    async getMyLicenseKeys() {
      this.loading = true
      this.error = ''

      try {
        const response = await licenseKeyService.getMyLicenseKeys()

        if (response instanceof ResponseError) throw response

        this.myLicenseKeys = response.data as ILicenseKey[]
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'An unexpected error occurred.'
        throw error
      } finally {
        this.loading = false
      }
    },

    async syncLicenseKeys(): Promise<{ synced: number; skipped: number; updated: number } | null> {
      this.loading = true
      this.error = ''

      try {
        const response = await licenseKeyService.syncLicenseKeys()

        if (response instanceof ResponseError) throw response

        // Reload license keys and stats after sync
        await Promise.all([
          this.getLicenseKeys(),
          this.getLicenseKeyStats(),
        ])

        return response.data as { synced: number; skipped: number; updated: number }
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'An unexpected error occurred.'
        throw error
      } finally {
        this.loading = false
      }
    },

    async purchaseLicenseKey(data: IPurchaseLicenseKeyRequest): Promise<{ key: string; duration: string; purchasedAt: string } | null> {
      this.loading = true
      this.error = ''

      try {
        const response = await licenseKeyService.purchaseLicenseKey(data)

        if (response instanceof ResponseError) throw response

        // Reload my license keys after purchase
        await this.getMyLicenseKeys()

        return response.data as { key: string; duration: string; purchasedAt: string }
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'An unexpected error occurred.'
        throw error
      } finally {
        this.loading = false
      }
    },

    // Old actions (for external API management)
    async getLicenseKeyById(id: string) {
      this.loading = true
      this.error = ''

      try {
        const response = await licenseKeyService.getLicenseKeyById(id)

        if (response instanceof ResponseError) throw response

        this.licenseKey = response.data as ILicenseKey
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'An unexpected error occurred.'
      } finally {
        this.loading = false
      }
    },

    async createLicenseKey(data: ICreateLicenseKeyRequest) {
      this.loading = true
      this.error = ''

      try {
        const response = await licenseKeyService.createLicenseKey(data)

        if (response instanceof ResponseError) throw response

        this.licenseKey = response.data as ILicenseKey
        // Reload danh sách license keys sau khi tạo thành công
        await this.getLicenseKeys()
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'An unexpected error occurred.'
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateLicenseKey(id: string, data: IUpdateLicenseKeyRequest) {
      this.loading = true
      this.error = ''

      try {
        const response = await licenseKeyService.updateLicenseKey(id, data)

        if (response instanceof ResponseError) throw response

        // Reload danh sách để cập nhật
        await this.getLicenseKeys()
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'An unexpected error occurred.'
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteLicenseKeyExternal(id: string) {
      this.loading = true
      this.error = ''

      try {
        const response = await licenseKeyService.deleteLicenseKeyExternal(id)

        if (response instanceof ResponseError) throw response

        // Reload để cập nhật
        await this.getLicenseKeys()
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'An unexpected error occurred.'
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteLicenseKey(id: number) {
      this.loading = true
      this.error = ''

      try {
        const response = await licenseKeyService.deleteLicenseKey(id)

        if (response instanceof ResponseError) throw response

        // Reload để cập nhật
        await Promise.all([
          this.getLicenseKeys(),
          this.getLicenseKeyStats(),
        ])
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'An unexpected error occurred.'
        throw error
      } finally {
        this.loading = false
      }
    },

    async generateLicenseKeys(data: IGenerateLicenseKeysRequest): Promise<void> {
      this.loading = true
      this.error = ''

      try {
        const response = await licenseKeyService.generateLicenseKeys(data)

        if (response instanceof ResponseError) throw response
        
        await this.getLicenseKeys()
        await this.getLicenseKeyStats()

      } catch (error) {
        this.error = error instanceof Error ? error.message : 'An unexpected error occurred.'
      } finally {
        this.loading = false
      }
    },
  },
})
