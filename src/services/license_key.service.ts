// src/services/license_key.service.ts
import { API_ROUTES } from "@/constants"
import { apiService, type ApiResponse } from "@/lib"
import type {
  ILicenseKey,
  ICreateLicenseKeyRequest,
  IUpdateLicenseKeyRequest,
  IGenerateLicenseKeysRequest,
  LicenseKeyStats,
  IPurchaseLicenseKeyRequest,
  IPurchaseLicenseKeyResponse,
  ISyncLicenseKeysResponse,
  ILicenseKeysResponse,
  IGenerateLicenseKeysResponse,
} from "@/types/license"
import type { ResponseError } from "@/utils/error"

export interface ILicenseKeyService {
  // New endpoints for internal license key management
  getAllLicenseKeys: (params?: {
    page?: number
    limit?: number
    duration?: string
    isUsed?: boolean
    isActive?: boolean
  }) => Promise<ApiResponse<ILicenseKeysResponse> | ResponseError>
  getLicenseKeyStats: () => Promise<ApiResponse<LicenseKeyStats> | ResponseError>
  getMyLicenseKeys: () => Promise<ApiResponse<ILicenseKey[]> | ResponseError>
  syncLicenseKeys: () => Promise<ApiResponse<ISyncLicenseKeysResponse> | ResponseError>
  purchaseLicenseKey: (data: IPurchaseLicenseKeyRequest) => Promise<ApiResponse<IPurchaseLicenseKeyResponse> | ResponseError>
  deleteLicenseKey: (id: number) => Promise<ApiResponse<void> | ResponseError>
  
  // Old endpoints for external API management
  getLicenseKeyById: (id: string) => Promise<ApiResponse<ILicenseKey> | ResponseError>
  createLicenseKey: (licenseKey: ICreateLicenseKeyRequest) => Promise<ApiResponse<ILicenseKey> | ResponseError>
  updateLicenseKey: (id: string, licenseKey: IUpdateLicenseKeyRequest) => Promise<ApiResponse<ILicenseKey> | ResponseError>
  deleteLicenseKeyExternal: (id: string) => Promise<ApiResponse<ILicenseKey> | ResponseError>
  generateLicenseKeys: (request: IGenerateLicenseKeysRequest) => Promise<ApiResponse<IGenerateLicenseKeysResponse> | ResponseError>
}

class LicenseKeyService implements ILicenseKeyService {
  // New endpoints
  getAllLicenseKeys(params?: {
    page?: number
    limit?: number
    duration?: string
    isUsed?: boolean
    isActive?: boolean
  }): Promise<ApiResponse<ILicenseKeysResponse> | ResponseError> {
    return apiService(API_ROUTES.LICENSE_KEYS.GET_ALL)
      .addQueryParam({...params})
      .get<ILicenseKeysResponse>()
  }

  getLicenseKeyStats(): Promise<ApiResponse<LicenseKeyStats> | ResponseError> {
    return apiService(API_ROUTES.LICENSE_KEYS.GET_STATS).get<LicenseKeyStats>()
  }

  getMyLicenseKeys(): Promise<ApiResponse<ILicenseKey[]> | ResponseError> {
    return apiService(API_ROUTES.LICENSE_KEYS.GET_MY_KEYS).get<ILicenseKey[]>()
  }

  syncLicenseKeys(): Promise<ApiResponse<ISyncLicenseKeysResponse> | ResponseError> {
    return apiService(API_ROUTES.LICENSE_KEYS.SYNC).post<ISyncLicenseKeysResponse>()
  }

  purchaseLicenseKey(data: IPurchaseLicenseKeyRequest): Promise<ApiResponse<IPurchaseLicenseKeyResponse> | ResponseError> {
    return apiService(API_ROUTES.LICENSE_KEYS.PURCHASE).post<IPurchaseLicenseKeyResponse>(data)
  }

  deleteLicenseKey(id: number): Promise<ApiResponse<void> | ResponseError> {
    return apiService(API_ROUTES.LICENSE_KEYS.DELETE)
      .addPathParam(':id', id.toString())
      .delete<void>()
  }

  // Old endpoints (for external API)
  getLicenseKeyById(id: string): Promise<ApiResponse<ILicenseKey> | ResponseError> {
    return apiService(API_ROUTES.LICENSE_KEYS.GET_BY_ID).addPathParam(':id', id).get<ILicenseKey>()
  }

  createLicenseKey(licenseKey: ICreateLicenseKeyRequest): Promise<ApiResponse<ILicenseKey> | ResponseError> {
    return apiService(API_ROUTES.LICENSE_KEYS.CREATE).post<ILicenseKey>(licenseKey)
  }

  updateLicenseKey(id: string, licenseKey: IUpdateLicenseKeyRequest): Promise<ApiResponse<ILicenseKey> | ResponseError> {
    return apiService(API_ROUTES.LICENSE_KEYS.UPDATE).addPathParam(':id', id).put<ILicenseKey>(licenseKey)
  }

  deleteLicenseKeyExternal(id: string): Promise<ApiResponse<ILicenseKey> | ResponseError> {
    return apiService(API_ROUTES.LICENSE_KEYS.DELETE_EXTERNAL).addPathParam(':id', id).delete<ILicenseKey>()
  }

  generateLicenseKeys(request: IGenerateLicenseKeysRequest): Promise<ApiResponse<IGenerateLicenseKeysResponse> | ResponseError> {
    return apiService(API_ROUTES.LICENSE_KEYS.GENERATE).post<IGenerateLicenseKeysResponse>(request)
  }
}

export const licenseKeyService = new LicenseKeyService()
