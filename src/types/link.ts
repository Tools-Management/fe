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
  INTERSTITIAL_IMAGE = 'interstitial_image',
  INTERSTITIAL_VIDEO = 'interstitial_video',
  DESTINATION_URL = 'destination_url'
}

export interface LinkCreationRequest {
  type: LINK_TYPES
  link: string
}

export interface LinkUpdateRequest {
  link: string
  type?: LINK_TYPES
}