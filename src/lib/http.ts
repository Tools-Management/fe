// src/lib/http.ts
import axios, {
  Axios,
  AxiosError,
  AxiosHeaders,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
  type AxiosRequestConfig,
  HttpStatusCode,
} from 'axios'

import { ENV } from '@/lib'
import { ResponseError } from '@/utils/error'
import router from '@/router'
import { API_ROUTES } from '@/constants'

interface ApiResponseRaw<T = unknown> {
  success: boolean
  message: string
  data?: T
  error?: string
  code?: string
}

export interface ApiResponse<T = unknown> {
  data: T
  message: string
  code?: string
}

class AxiosConfig {
  private axiosInstance: Axios
  private isRefreshing = false
  private failedQueue: Array<{
    resolve: (value: AxiosResponse) => void
    reject: (reason?: unknown) => void
  }> = []

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: ENV.API_URL,
      withCredentials: true,
      headers: this.defaultHeaders(),
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use(this.onRequest.bind(this))
    this.axiosInstance.interceptors.response.use(
      this.onResponse.bind(this),
      this.onErrorResponse.bind(this)
    )
  }

  private processQueue(error: unknown = null) {
    this.failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error)
      } else {
        prom.resolve({} as AxiosResponse) // sẽ bị override
      }
    })
    this.failedQueue = []
  }

  private async onRequest(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {
    // Chỉ xử lý FormData → không set Content-Type
    if (config.data instanceof FormData) {
      delete (config.headers as AxiosHeaders)['Content-Type']
    } else if (config.data && typeof config.data === 'object') {
      config.headers['Content-Type'] = 'application/json'
      // Không cần snakecaseKeys → backend dùng camelCase
    }

    // Không cần snakecaseKeys cho params
    return config
  }

  private onResponse(response: AxiosResponse): AxiosResponse {
    // Không cần camelcaseKeys → backend đã trả camelCase
    return response
  }

  private async onErrorResponse(
    error: AxiosError<ApiResponseRaw>
  ): Promise<AxiosResponse | ResponseError> {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    // 401 → refresh token
    if (
      error.response?.status === HttpStatusCode.Unauthorized &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/refresh-token')
    ) {
      if (this.isRefreshing) {
        return new Promise<AxiosResponse>((resolve, reject) => {
          this.failedQueue.push({ resolve, reject })
        })
          .then(() => this.axiosInstance.request(originalRequest))
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      this.isRefreshing = true

      try {
        await this.axiosInstance.post(API_ROUTES.AUTH.REFRESH_TOKEN)
        this.isRefreshing = false
        this.processQueue()
        return this.axiosInstance.request(originalRequest)
      } catch (refreshError) {
        this.isRefreshing = false
        this.processQueue(refreshError)
        router.push('/signin')

        if (refreshError instanceof AxiosError && refreshError.response?.data) {
          const data = refreshError.response.data as ApiResponseRaw
          return Promise.reject(
            new ResponseError(data.message || 'Refresh failed', refreshError.response.status, data.error, data.code)
          )
        }
        return Promise.reject(new ResponseError('Refresh token failed', 0))
      }
    }

    // Lỗi khác
    const res = error.response
    if (res?.data) {
      const data = res.data as ApiResponseRaw
      return Promise.reject(
        new ResponseError(data.message || 'Unknown error', res.status, data.error, data.code)
      )
    }

    return Promise.reject(new ResponseError('Network error', 0))
  }

  private defaultHeaders(): AxiosHeaders {
    const headers = new AxiosHeaders()
    headers.set('Accept', 'application/json')
    return headers
  }

  public getAxios(): Axios {
    return this.axiosInstance
  }
}

class HttpService {
  private static instance: HttpService
  private http: Axios

  private constructor() {
    this.http = new AxiosConfig().getAxios()
  }

  public static getInstance(): HttpService {
    if (!HttpService.instance) {
      HttpService.instance = new HttpService()
    }
    return HttpService.instance
  }

  public get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.http.get<T>(url, config)
  }

  public post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.http.post<T>(url, data, config)
  }

  public put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.http.put<T>(url, data, config)
  }

  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.http.delete<T>(url, config)
  }
}

// parse response
const parseApiResponse = async <K>(
  promise: Promise<AxiosResponse<ApiResponseRaw<K>>>
): Promise<ApiResponse<K> | ResponseError> => {
  try {
    const res = await promise
    const raw = res.data

    if (raw.success && res.status >= 200 && res.status < 300) {
      return {
        data: raw.data as K,
        message: raw.message,
        code: raw.code,
      }
    }

    throw new ResponseError(raw.message, res.status, raw.error, raw.code)
  } catch (error) {
    if (error instanceof ResponseError) return error

    if (error instanceof AxiosError && error.response?.status === HttpStatusCode.InternalServerError) {
      router.push('/error')
    }

    return new ResponseError('Internal server error', HttpStatusCode.InternalServerError)
  }
}

export function apiService(url: string) {
  const http = HttpService.getInstance()
  const queryParams: Record<string, string | number | boolean | undefined | null> = {}

  const api = {
    addPathParam: (key: string, value: string | number) => {
      url = url.replace(key, String(value))
      return api
    },

    addQueryParam: (params: Record<string, string | number | boolean | undefined | null>) => {
      Object.entries(params).forEach(([key, val]) => {
        if (val !== null && val !== undefined && val !== '') {
          queryParams[key] = val
        }
      })
      return api
    },

    get: <K>() => parseApiResponse(http.get<ApiResponseRaw<K>>(url, { params: queryParams })),
    post: <K>(data?: unknown, config?: AxiosRequestConfig) =>
      parseApiResponse(http.post<ApiResponseRaw<K>>(url, data, config)),
    put: <K>(data?: unknown, config?: AxiosRequestConfig) =>
      parseApiResponse(http.put<ApiResponseRaw<K>>(url, data, config)),
    delete: <K>(config?: AxiosRequestConfig) =>
      parseApiResponse(http.delete<ApiResponseRaw<K>>(url, config)),
  }

  return api
}

export default HttpService.getInstance()