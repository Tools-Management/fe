export interface User {
  id: number
  username: string
  email: string
  isActive: boolean
  image?: string
  role: string
  createdAt: string
  updatedAt?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
    user: {
      id: number
      username: string
      email: string
      role: string
      image?: string
      isActive: boolean
      createdAt: string
    }
    tokens: {
      accessToken: string
      refreshToken: string
      expiresIn: number
    }
    message: string
  }

export interface RegisterRequest {
  username: string
  email: string
  password: string
  confirmPassword: string
  image: string
}

export interface RegisterResponse {
  user: User
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface LogoutRequest {
  refreshToken: string
}

export interface LogoutResponse {
  message: string
}

export interface RefreshTokenRequest {
  refreshToken: string
}

export interface RefreshTokenResponse {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface VerifyOtpRequest {
  otp: string
  email: string
}

export interface VerifyOtpResponse {
  message: string
}

export interface ResendOtpRequest {
  email: string
}

export interface ResendOtpResponse {
  message: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ForgotPasswordResponse {
  message: string
}

export interface ResetPasswordRequest {
  token: string
  password: string
  confirmPassword: string
}

export interface ResetPasswordResponse {
  message: string
}
