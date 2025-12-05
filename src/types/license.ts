// src/types/license.ts

// License Key types (matches API ILicenseKey)
export interface ILicenseKey {
  id: number
  externalId: string
  key: string
  isActive: boolean
  duration: string // e.g. "30d", "7d", "1d"
  usedCount?: number
  isUsed: boolean
  purchasedBy?: number | null
  purchasedAt?: string | null
  createdAt: string
  updatedAt: string
  purchaser?: {
    id: number
    username: string
    email: string
  }
}

export interface ICreateLicenseKeyRequest {
  key: string
  isActive: boolean
  duration: string
}

export interface IUpdateLicenseKeyRequest {
  key?: string
  isActive?: boolean
  duration?: string
}

export interface IGenerateLicenseKeysRequest {
  quantity: number
  duration: string
}

// License types (matches API ILicenseResponse)
export interface ILicense {
  email: string
  machineId: string
  licenseKey: string
  isActive: boolean
  expiresAt: string // ISO date-time
  activatedAt: string // ISO date-time
  lastValidatedAt: string // ISO date-time
}

// License request types (matches API types)
export interface ILicenseRequest {
  email: string
  machineId: string
  licenseKey: string
}

export interface IUpgradeLicenseRequest {
  email: string
  machineId: string
  newLicenseKey: string
}

// Stats types
export interface LicenseStats {
  total: number
  active: number
  inactive: number
  expired: number
}

export interface LicenseKeyStats {
  total: number
  used: number
  available: number
  byDuration: {
    duration: string
    total: number
    used: number
    available: number
  }[]
}

// Purchase request
export interface IPurchaseLicenseKeyRequest {
  duration: string
}

// Sync response
export interface ISyncLicenseKeysResponse {
  synced: number
  skipped: number
}

export interface IGenerateLicenseKeysResponse {
  generated: number
  keys: string[]
}
// License Keys Response with pagination
export interface ILicenseKeysResponse {
  data: ILicenseKey[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Display types for UI
export interface DisplayLicenseKey extends ILicenseKey {
  statusLabel: string
  statusColor: string
  durationLabel: string
}

export interface DisplayLicense extends ILicense {
  statusLabel: string
  statusColor: string
  daysRemaining: number
  isExpiringSoon: boolean
}

// Backward compatibility aliases
export type LicenseKey = ILicenseKey
export type CreateLicenseKeyRequest = ICreateLicenseKeyRequest
export type UpdateLicenseKeyRequest = IUpdateLicenseKeyRequest
export type GenerateLicenseKeysRequest = IGenerateLicenseKeysRequest
export type License = ILicense
export type LicensePayload = ILicenseRequest
export type UpgradeLicenseRequest = IUpgradeLicenseRequest