import { apiService, type ApiResponse } from '@/lib/http'
import type { ResponseError } from '@/utils/error'
import { API_ROUTES } from '@/constants'
import type { LinkCreationRequest, LinkResponse, LinkUpdateRequest } from '@/types/link'

export interface ILinkService {
  getAllLinks: () => Promise<ApiResponse<LinkResponse[]> | ResponseError>
  createLink: (body: LinkCreationRequest) => Promise<ApiResponse<LinkResponse> | ResponseError>
  updateLink: (id: string, body: LinkUpdateRequest) => Promise<ApiResponse<boolean> | ResponseError>
}

class LinkService implements ILinkService {
  getAllLinks(): Promise<ApiResponse<LinkResponse[]> | ResponseError> {
    return apiService(API_ROUTES.LINKS.BASE).get<LinkResponse[]>()
  }

  createLink(body: LinkCreationRequest): Promise<ApiResponse<LinkResponse> | ResponseError> {
    return apiService(API_ROUTES.LINKS.BASE).post<LinkResponse>(body)
  }

  updateLink(id: string, body: LinkUpdateRequest) {
    return apiService(API_ROUTES.LINKS.UPDATE).addPathParam(':id', id).put<boolean>(body)
  }
}

export const linkService = new LinkService()
