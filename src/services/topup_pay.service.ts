import { API_ROUTES } from '@/constants'
import { apiService, type ApiResponse } from '@/lib'
import type { ITopupPayQrCodeRequest, ITopupPayQrCodeResponse } from '@/types/topup_pay'
import type { ResponseError } from '@/utils/error'

export interface ITopupPayService {
  getQrCodeUrl: (
    query: ITopupPayQrCodeRequest,
  ) => Promise<ApiResponse<ITopupPayQrCodeResponse> | ResponseError>
  getQrCodeImage: (query: ITopupPayQrCodeRequest) => Promise<Blob>
  createTopupRequest: (
    body: ITopupPayQrCodeRequest,
  ) => Promise<ApiResponse<boolean> | ResponseError>
}

class TopupPayService implements ITopupPayService {
  getQrCodeUrl(
    query: ITopupPayQrCodeRequest,
  ): Promise<ApiResponse<ITopupPayQrCodeResponse> | ResponseError> {
    const queryParams: Record<string, string> = {}

    if (query.amount) queryParams.amount = query.amount.toString()

    return apiService(API_ROUTES.TOPUP_PAY.GET_QRCODE)
      .addQueryParam(queryParams)
      .get<ITopupPayQrCodeResponse>()
  }

  getQrCodeImage(query: ITopupPayQrCodeRequest): Promise<Blob> {
    const queryParams: Record<string, string> = {}
  
    if (query.amount) queryParams.amount = query.amount.toString()
  
    return apiService(API_ROUTES.TOPUP_PAY.QR_PAY)
      .addQueryParam(queryParams)
      .getBlob()
  }

  createTopupRequest(body: ITopupPayQrCodeRequest): Promise<ApiResponse<boolean> | ResponseError> {
    return apiService(API_ROUTES.TOPUP_PAY.CREATE_TOPUP).post<boolean>(body)
  }
}

export const topupPayService = new TopupPayService()
