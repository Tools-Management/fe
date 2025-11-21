export interface LinkResponse {
  id: number
  type: LINK_TYPES
  link: string
  createdAt: Date
  updatedAt: Date
}

export enum LINK_TYPES {
  DOWNLOAD = 'download',
  INTRO_VIDEO = 'intro_video',
}

export interface LinkCreationRequest {
  type: LINK_TYPES
  link: string
}

export interface LinkUpdateRequest {
  link: string
}