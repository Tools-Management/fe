// src/services/license.service.ts
import { API_ROUTES } from "@/constants"
import { apiService, type ApiResponse } from "@/lib"
import type { ILicense, ILicenseRequest, IUpgradeLicenseRequest } from "@/types/license"
import type { ResponseError } from "@/utils/error"

export interface ILicenseService {
  upgradeLicense: (request: IUpgradeLicenseRequest) => Promise<ApiResponse<ILicense> | ResponseError>
  validateLicense: (request: ILicenseRequest) => Promise<ApiResponse<ILicense> | ResponseError>
  activateLicense: (request: ILicenseRequest) => Promise<ApiResponse<ILicense> | ResponseError>
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
}

export const licenseService = new LicenseService()