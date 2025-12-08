import { apiService, type ApiResponse } from '@/lib/http'
import type {
  UserWallet,
  WalletTopup,
  CreateTopupRequest,
  CreateTopupResponse,
  TopupQuery,
  TopupHistoryResponse,
  WalletBalance,
} from '@/types/wallet'
import type { ResponseError } from '@/utils/error'
import { API_ROUTES } from '@/constants'

export interface IWalletService {
  getWallet: () => Promise<ApiResponse<UserWallet> | ResponseError>
  getBalance: () => Promise<ApiResponse<WalletBalance> | ResponseError>
  createTopup: (
    body: CreateTopupRequest
  ) => Promise<ApiResponse<CreateTopupResponse> | ResponseError>
  getTopupHistory: (
    query: TopupQuery
  ) => Promise<ApiResponse<TopupHistoryResponse> | ResponseError>
  getTopupDetail: (
    topupCode: string
  ) => Promise<ApiResponse<WalletTopup> | ResponseError>
}

class WalletService implements IWalletService {
  getWallet(): Promise<ApiResponse<UserWallet> | ResponseError> {
    return apiService(API_ROUTES.WALLET.BASE)
      .get<UserWallet>()
  }

  getBalance(): Promise<ApiResponse<WalletBalance> | ResponseError> {
    return apiService(API_ROUTES.WALLET.BALANCE)
      .get<WalletBalance>()
  }

  createTopup(
    body: CreateTopupRequest
  ): Promise<ApiResponse<CreateTopupResponse> | ResponseError> {
    return apiService(API_ROUTES.WALLET.CREATE_TOPUP)
      .post<CreateTopupResponse>(body)
  }

  getTopupHistory(
    query: TopupQuery
  ): Promise<ApiResponse<TopupHistoryResponse> | ResponseError> {
    const queryParams: Record<string, string | number | boolean | null | undefined> = {}
  
    if (query.page) queryParams.page = query.page
    if (query.limit) queryParams.limit = query.limit
    if (query.status) queryParams.status = query.status
    if (query.paymentMethod) queryParams.paymentMethod = query.paymentMethod
  
    return apiService(API_ROUTES.WALLET.TOPUPS)
      .addQueryParam(queryParams)
      .get<TopupHistoryResponse>()
  }

  getTopupDetail(
    topupCode: string
  ): Promise<ApiResponse<WalletTopup> | ResponseError> {
    const url = API_ROUTES.WALLET.TOPUP_DETAIL.replace(':topupCode', topupCode)
    return apiService(url)
      .get<WalletTopup>()
  }
}

export const walletService = new WalletService()
