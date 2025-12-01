// src/mocks/license.mock.ts
import type { LicenseKey, License, LicenseStats, LicenseKeyStats } from '@/types/license'

// Mock License Keys
export const mockLicenseKeys: LicenseKey[] = [
  {
    id: '1',
    key: 'LKEY-2024-001-ABC123',
    isActive: true,
    duration: '30d',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    expiresAt: '2024-02-14T10:00:00Z',
    usedCount: 0
  },
  {
    id: '2',
    key: 'LKEY-2024-002-DEF456',
    isActive: true,
    duration: '90d',
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    expiresAt: '2024-04-20T14:30:00Z',
    usedCount: 1
  },
  {
    id: '3',
    key: 'LKEY-2024-003-GHI789',
    isActive: false,
    duration: '7d',
    createdAt: '2024-01-25T09:15:00Z',
    updatedAt: '2024-01-25T09:15:00Z',
    expiresAt: '2024-02-01T09:15:00Z',
    usedCount: 0
  },
  {
    id: '4',
    key: 'LKEY-2024-004-JKL012',
    isActive: true,
    duration: '365d',
    createdAt: '2024-02-01T11:45:00Z',
    updatedAt: '2024-02-01T11:45:00Z',
    expiresAt: '2025-02-01T11:45:00Z',
    usedCount: 2
  },
  {
    id: '5',
    key: 'LKEY-2024-005-MNO345',
    isActive: true,
    duration: '180d',
    createdAt: '2024-02-05T16:20:00Z',
    updatedAt: '2024-02-05T16:20:00Z',
    expiresAt: '2024-08-05T16:20:00Z',
    usedCount: 0
  }
]

// Mock Licenses
export const mockLicenses: License[] = [
  {
    id: '1',
    email: 'user1@example.com',
    machineId: 'MACHINE-001-ABC123',
    licenseKey: 'LKEY-2024-001-ABC123',
    status: 'active',
    activatedAt: '2024-01-15T10:30:00Z',
    expiresAt: '2024-02-14T10:30:00Z',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    email: 'user2@example.com',
    machineId: 'MACHINE-002-DEF456',
    licenseKey: 'LKEY-2024-002-DEF456',
    status: 'active',
    activatedAt: '2024-01-20T15:00:00Z',
    expiresAt: '2024-04-20T15:00:00Z',
    createdAt: '2024-01-20T15:00:00Z',
    updatedAt: '2024-01-20T15:00:00Z'
  },
  {
    id: '3',
    email: 'user3@example.com',
    machineId: 'MACHINE-003-GHI789',
    licenseKey: 'LKEY-2024-003-GHI789',
    status: 'expired',
    activatedAt: '2024-01-25T10:00:00Z',
    expiresAt: '2024-02-01T10:00:00Z',
    createdAt: '2024-01-25T10:00:00Z',
    updatedAt: '2024-02-02T00:00:00Z'
  },
  {
    id: '4',
    email: 'user4@example.com',
    machineId: 'MACHINE-004-JKL012',
    licenseKey: 'LKEY-2024-004-JKL012',
    status: 'active',
    activatedAt: '2024-02-01T12:00:00Z',
    expiresAt: '2025-02-01T12:00:00Z',
    createdAt: '2024-02-01T12:00:00Z',
    updatedAt: '2024-02-01T12:00:00Z'
  },
  {
    id: '5',
    email: 'user5@example.com',
    machineId: 'MACHINE-005-MNO345',
    licenseKey: 'LKEY-2024-005-MNO345',
    status: 'inactive',
    activatedAt: '2024-02-05T17:00:00Z',
    expiresAt: '2024-08-05T17:00:00Z',
    createdAt: '2024-02-05T17:00:00Z',
    updatedAt: '2024-02-05T17:00:00Z'
  }
]

// Mock Stats
export const mockLicenseKeyStats: LicenseKeyStats = {
  total: 5,
  active: 4,
  inactive: 1
}

export const mockLicenseStats: LicenseStats = {
  total: 5,
  active: 3,
  inactive: 1,
  expired: 1
}

// Utility functions for mock data
export const getLicenseKeyById = (id: string): LicenseKey | undefined => {
  return mockLicenseKeys.find(key => key.id === id)
}

export const getLicenseById = (id: string): License | undefined => {
  return mockLicenses.find(license => license.id === id)
}

export const getLicensesByEmail = (email: string): License[] => {
  return mockLicenses.filter(license => license.email === email)
}

export const getLicensesByMachineId = (machineId: string): License[] => {
  return mockLicenses.filter(license => license.machineId === machineId)
}

// Simulate API delay
export const delay = (ms: number = 500): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
