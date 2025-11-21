import { apiService, type ApiResponse } from '@/lib/http'
import type { 
    LoginRequest, 
    LoginResponse, 
    RegisterRequest, 
    RegisterResponse, 
    LogoutRequest, 
    LogoutResponse, 
    RefreshTokenRequest, 
    RefreshTokenResponse, 
    VerifyOtpRequest, 
    VerifyOtpResponse, 
    ResendOtpRequest, 
    ResendOtpResponse, 
    ForgotPasswordRequest, 
    ForgotPasswordResponse, 
    ResetPasswordRequest, 
    ResetPasswordResponse, 
    User
} from '@/types/user'
import type { ResponseError } from '@/utils/error'
import { API_ROUTES } from '@/constants'

export interface IAuthService {
  login: (
    body: LoginRequest
  ) => Promise<ApiResponse<LoginResponse> | ResponseError>
  getMe: () => Promise<ApiResponse<User> | ResponseError>
  register: (
    body: RegisterRequest
  ) => Promise<ApiResponse<RegisterResponse> | ResponseError>
  logout: (
    body: LogoutRequest
  ) => Promise<ApiResponse<LogoutResponse> | ResponseError>
  refreshToken: (
    body: RefreshTokenRequest
  ) => Promise<ApiResponse<RefreshTokenResponse> | ResponseError>
  verifyOtp: (
    body: VerifyOtpRequest
  ) => Promise<ApiResponse<VerifyOtpResponse> | ResponseError>
  resendOtp: (
    body: ResendOtpRequest
  ) => Promise<ApiResponse<ResendOtpResponse> | ResponseError>
  forgotPassword: (
    body: ForgotPasswordRequest
  ) => Promise<ApiResponse<ForgotPasswordResponse> | ResponseError>
  resetPassword: (  
    body: ResetPasswordRequest
  ) => Promise<ApiResponse<ResetPasswordResponse> | ResponseError>
}

class AuthService implements IAuthService {
  login(
    body: LoginRequest
  ): Promise<ApiResponse<LoginResponse> | ResponseError> {
    return apiService(API_ROUTES.AUTH.LOGIN)
      .post<LoginResponse>(body)
  }
  getMe(): Promise<ApiResponse<User> | ResponseError> {
    return apiService(API_ROUTES.USERS.GET_PROFILE)
      .get<User>()
  }
  register(
    body: RegisterRequest
  ): Promise<ApiResponse<RegisterResponse> | ResponseError> {
    return apiService(API_ROUTES.AUTH.REGISTER)
      .post<RegisterResponse>(body)
  }
  logout(
  ): Promise<ApiResponse<LogoutResponse> | ResponseError> {
    return apiService(API_ROUTES.AUTH.LOGOUT)
      .post<LogoutResponse>()
  }
  refreshToken(
    body: RefreshTokenRequest
  ): Promise<ApiResponse<RefreshTokenResponse> | ResponseError> {
    return apiService(API_ROUTES.AUTH.REFRESH_TOKEN)
      .post<RefreshTokenResponse>(body)
  }
  verifyOtp(
    body: VerifyOtpRequest
  ): Promise<ApiResponse<VerifyOtpResponse> | ResponseError> {
    return apiService(API_ROUTES.AUTH.VERIFY_OTP)
      .post<VerifyOtpResponse>(body)
  }
  resendOtp(
    body: ResendOtpRequest
  ): Promise<ApiResponse<ResendOtpResponse> | ResponseError> {
    return apiService(API_ROUTES.AUTH.RESEND_OTP)
      .post<ResendOtpResponse>(body)
  }
  forgotPassword(
    body: ForgotPasswordRequest
  ): Promise<ApiResponse<ForgotPasswordResponse> | ResponseError> {
    return apiService(API_ROUTES.AUTH.FORGOT_PASSWORD)
      .post<ForgotPasswordResponse>(body)
  }
  resetPassword(
    body: ResetPasswordRequest
  ): Promise<ApiResponse<ResetPasswordResponse> | ResponseError> {
    return apiService(API_ROUTES.AUTH.RESET_PASSWORD)
      .post<ResetPasswordResponse>(body)
  }
}

export const authService = new AuthService()