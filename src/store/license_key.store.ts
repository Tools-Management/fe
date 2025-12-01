// src/store/license_key.store.ts
import { licenseKeyService } from '@/services/license_key.service'
import type { IPagination } from '@/types/ticket'
import type { ILicenseKey, ICreateLicenseKeyRequest, IUpdateLicenseKeyRequest, IGenerateLicenseKeysRequest, LicenseKeyStats } from '@/types/license'
import { ResponseError } from '@/utils/error'
import { defineStore } from 'pinia'

interface LicenseKeyState {
  stats: LicenseKeyStats
  licenseKeys: ILicenseKey[]
  licenseKey: ILicenseKey | null
  pagination: IPagination
  loading: boolean
  error: string
}

interface LicenseKeyActions {
  getLicenseKeys: () => Promise<void>
  getLicenseKeyById: (id: string) => Promise<void>
  createLicenseKey: (data: ICreateLicenseKeyRequest) => Promise<void>
  updateLicenseKey: (id: string, data: IUpdateLicenseKeyRequest) => Promise<void>
  deleteLicenseKey: (id: string) => Promise<void>
  generateLicenseKeys: (data: IGenerateLicenseKeysRequest) => Promise<{ keys: ILicenseKey[]; count: number } | null>
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
      active: 0,
      inactive: 0,
    },
    licenseKeys: [],
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
    async getLicenseKeys() {
      this.loading = true
      this.error = ''

      try {
        const response = await licenseKeyService.getAllLicenseKeys()

        if (response instanceof ResponseError) throw response

        const data = response.data as ILicenseKey[]
        this.licenseKeys = data
        this.stats = {
          total: data.length,
          active: data.filter(key => key.isActive).length,
          inactive: data.filter(key => !key.isActive).length,
        }
        // Set default pagination
        this.pagination = {
          page: 1,
          limit: 10,
          total: data.length,
          totalPages: Math.ceil(data.length / 10),
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'An unexpected error occurred.'
      } finally {
        this.loading = false
      }
    },

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
        throw error // Re-throw để component có thể handle
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

        // Update local license key if successful
        if (this.licenseKey && this.licenseKey.id === id) {
          Object.assign(this.licenseKey, data)
        }

        // Reload danh sách để cập nhật stats
        await this.getLicenseKeys()
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'An unexpected error occurred.'
      } finally {
        this.loading = false
      }
    },

    async deleteLicenseKey(id: string) {
      this.loading = true
      this.error = ''

      try {
        const response = await licenseKeyService.deleteLicenseKey(id)

        if (response instanceof ResponseError) throw response

        // Remove from local list
        this.licenseKeys = this.licenseKeys.filter(key => key.id !== id)

        // Reload để cập nhật stats
        await this.getLicenseKeys()
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'An unexpected error occurred.'
      } finally {
        this.loading = false
      }
    },

    async generateLicenseKeys(data: IGenerateLicenseKeysRequest): Promise<{ keys: ILicenseKey[]; count: number } | null> {
      this.loading = true
      this.error = ''

      try {
        const response = await licenseKeyService.generateLicenseKeys(data)

        if (response instanceof ResponseError) throw response

        const keys = response.data as ILicenseKey[]
        // Reload danh sách để cập nhật stats
        await this.getLicenseKeys()

        return { keys, count: keys.length }
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'An unexpected error occurred.'
        return null
      } finally {
        this.loading = false
      }
    },
  },
})
