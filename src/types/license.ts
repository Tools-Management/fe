// src/types/license.ts

// License Key types (matches API ILicenseKey)
export interface ILicenseKey {
  id: string
  key: string
  isActive: boolean
  duration: string // e.g. "30d", "1y", "lifetime"
  createdAt: string // ISO date-time
  updatedAt: string // ISO date-time
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
  active: number
  inactive: number
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