// src/store/license.store.ts
import { licenseService } from '@/services/license.service'
import type { IPagination } from '@/types/ticket'
import type { ILicense, ILicenseRequest, IUpgradeLicenseRequest, LicenseStats } from '@/types/license'
import { ResponseError } from '@/utils/error'
import { defineStore } from 'pinia'

interface LicenseState {
  stats: LicenseStats
  licenses: ILicense[]
  license: ILicense | null
  pagination: IPagination
  loading: boolean
  error: string
}

interface LicenseActions {
  upgradeLicense: (request: IUpgradeLicenseRequest) => Promise<void>
  validateLicense: (request: ILicenseRequest) => Promise<{ valid: boolean; license?: ILicense }>
  activateLicense: (request: ILicenseRequest) => Promise<void>
}

export const useLicenseStore = defineStore<
  'license',
  LicenseState,
  Record<string, never>,
  LicenseActions
>('license', {
  state: (): LicenseState => ({
    stats: {
      total: 0,
      active: 0,
      inactive: 0,
      expired: 0,
    },
    licenses: [],
    license: null,
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
    async upgradeLicense(request: IUpgradeLicenseRequest) {
      this.loading = true
      this.error = ''

      try {
        const response = await licenseService.upgradeLicense(request)

        if (response instanceof ResponseError) throw response

        this.license = response.data as ILicense
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'An unexpected error occurred.'
        throw error
      } finally {
        this.loading = false
      }
    },

    async validateLicense(request: ILicenseRequest): Promise<{ valid: boolean; license?: ILicense }> {
      this.loading = true
      this.error = ''

      try {
        const response = await licenseService.validateLicense(request)

        if (response instanceof ResponseError) throw response

        const license = response.data as ILicense
        this.license = license

        return { valid: true, license }
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'An unexpected error occurred.'
        return { valid: false }
      } finally {
        this.loading = false
      }
    },

    async activateLicense(request: ILicenseRequest) {
      this.loading = true
      this.error = ''

      try {
        const response = await licenseService.activateLicense(request)

        if (response instanceof ResponseError) throw response

        this.license = response.data as ILicense
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'An unexpected error occurred.'
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
