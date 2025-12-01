// src/services/license_key.service.ts
import { API_ROUTES } from "@/constants"
import { apiService, type ApiResponse } from "@/lib"
import type {
  ILicenseKey,
  ICreateLicenseKeyRequest,
  IUpdateLicenseKeyRequest,
  IGenerateLicenseKeysRequest
} from "@/types/license"
import type { ResponseError } from "@/utils/error"

export interface ILicenseKeyService {
  getAllLicenseKeys: () => Promise<ApiResponse<ILicenseKey[]> | ResponseError>
  getLicenseKeyById: (id: string) => Promise<ApiResponse<ILicenseKey> | ResponseError>
  createLicenseKey: (licenseKey: ICreateLicenseKeyRequest) => Promise<ApiResponse<ILicenseKey> | ResponseError>
  updateLicenseKey: (id: string, licenseKey: IUpdateLicenseKeyRequest) => Promise<ApiResponse<ILicenseKey> | ResponseError>
  deleteLicenseKey: (id: string) => Promise<ApiResponse<ILicenseKey> | ResponseError>
  generateLicenseKeys: (request: IGenerateLicenseKeysRequest) => Promise<ApiResponse<ILicenseKey[]> | ResponseError>
}

class LicenseKeyService implements ILicenseKeyService {
  getAllLicenseKeys(): Promise<ApiResponse<ILicenseKey[]> | ResponseError> {
    return apiService(API_ROUTES.LICENSE_KEYS.GET_ALL).get<ILicenseKey[]>()
  }

  getLicenseKeyById(id: string): Promise<ApiResponse<ILicenseKey> | ResponseError> {
    return apiService(API_ROUTES.LICENSE_KEYS.GET_BY_ID).addPathParam(':id', id).get<ILicenseKey>()
  }

  createLicenseKey(licenseKey: ICreateLicenseKeyRequest): Promise<ApiResponse<ILicenseKey> | ResponseError> {
    return apiService(API_ROUTES.LICENSE_KEYS.CREATE).post<ILicenseKey>(licenseKey)
  }

  updateLicenseKey(id: string, licenseKey: IUpdateLicenseKeyRequest): Promise<ApiResponse<ILicenseKey> | ResponseError> {
    return apiService(API_ROUTES.LICENSE_KEYS.UPDATE).addPathParam(':id', id).put<ILicenseKey>(licenseKey)
  }

  deleteLicenseKey(id: string): Promise<ApiResponse<ILicenseKey> | ResponseError> {
    return apiService(API_ROUTES.LICENSE_KEYS.DELETE).addPathParam(':id', id).delete<ILicenseKey>()
  }

  generateLicenseKeys(request: IGenerateLicenseKeysRequest): Promise<ApiResponse<ILicenseKey[]> | ResponseError> {
    return apiService(API_ROUTES.LICENSE_KEYS.GENERATE).post<ILicenseKey[]>(request)
  }
}

export const licenseKeyService = new LicenseKeyService()