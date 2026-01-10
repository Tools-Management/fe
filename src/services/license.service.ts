// src/services/license.service.ts
import { API_ROUTES } from "@/constants"
import { apiService, type ApiResponse } from "@/lib"
import type { ILicense, ILicenseRequest, IUpgradeLicenseRequest, ILicenseQuery, ILicenseUpdateRequest, ISyncLicenseKeysResponse, ILicenseResponse } from "@/types/license"
import type { ResponseError } from "@/utils/error"

export interface ILicenseService {
  upgradeLicense: (request: IUpgradeLicenseRequest) => Promise<ApiResponse<ILicense> | ResponseError>
  validateLicense: (request: ILicenseRequest) => Promise<ApiResponse<ILicense> | ResponseError>
  activateLicense: (request: ILicenseRequest) => Promise<ApiResponse<ILicense> | ResponseError>
  getAllLicenses: (query: ILicenseQuery) => Promise<ApiResponse<ILicenseResponse> | ResponseError>
  syncLicenses: () => Promise<ApiResponse<ISyncLicenseKeysResponse> | ResponseError>
  updateLicense: (id: string, data: ILicenseUpdateRequest) => Promise<ApiResponse<ILicense> | ResponseError>
}

class LicenseService implements ILicenseService {
  upgradeLicense(request: IUpgradeLicenseRequest): Promise<ApiResponse<ILicense> | ResponseError> {
    return apiService(API_ROUTES.LICENSES.UPGRADE).post<ILicense>(request)
  }

  validateLicense(request: ILicenseRequest): Promise<ApiResponse<ILicense> | ResponseError> {
    return apiService(API_ROUTES.LICENSES.VALIDATE).post<ILicense>(request)
  }

  activateLicense(request: ILicenseRequest): Promise<ApiResponse<ILicense> | ResponseError> {
    return apiService(API_ROUTES.LICENSES.ACTIVATE).post<ILicense>(request)
  }

  getAllLicenses(query: ILicenseQuery): Promise<ApiResponse<ILicenseResponse> | ResponseError> {
    return apiService(API_ROUTES.LICENSES.GET_ALL).addQueryParam({...query}).get<ILicenseResponse>()
  }

  syncLicenses(): Promise<ApiResponse<ISyncLicenseKeysResponse> | ResponseError> {
    return apiService(API_ROUTES.LICENSES.SYNC).post<ISyncLicenseKeysResponse>({})
  }

  updateLicense(id: string, data: ILicenseUpdateRequest): Promise<ApiResponse<ILicense> | ResponseError> {
    return apiService(API_ROUTES.LICENSES.UPDATE).addPathParam(':id', id).put<ILicense>(data)
  }
}

export const licenseService = new LicenseService()