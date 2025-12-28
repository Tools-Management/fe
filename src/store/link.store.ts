import { LINK_TYPES } from '@/types/link'
// stores/linkStore.ts
import { defineStore } from 'pinia'
import { linkService } from '@/services/link.service'
import type { LinkCreationRequest, LinkResponse, LinkUpdateRequest } from '@/types/link'

interface LinkState {
  toolDownloadLinkId: string
  toolIntroVideoLinkId: string
  imageOrVideoPreviewLinkId: string
  typeImageOrVideoPreview: LINK_TYPES.INTERSTITIAL_IMAGE | LINK_TYPES.INTERSTITIAL_VIDEO
  targetLinkId: string
  typeTargetLink: LINK_TYPES.DESTINATION_URL
  toolDownloadLink: string
  toolIntroVideoLink: string
  imageOrVideoPreviewLink: string
  targetLink: string
  loading: boolean
  error: string
}

interface LinkActions {
  loadLinks: () => void
  createLink: (body: LinkCreationRequest) => void
  updateLink: (id: string, body: LinkUpdateRequest) => void
}

export const useLinkStore = defineStore<'link', LinkState, Record<string, never>, LinkActions>(
  'link',
  {
    state: (): LinkState => ({
      toolDownloadLinkId: '',
      toolIntroVideoLinkId: '',
      imageOrVideoPreviewLinkId: '',
      typeImageOrVideoPreview: LINK_TYPES.INTERSTITIAL_IMAGE,
      targetLinkId: '',
      typeTargetLink: LINK_TYPES.DESTINATION_URL,
      toolDownloadLink: '',
      toolIntroVideoLink: '',
      imageOrVideoPreviewLink: '',
      targetLink: '',
      loading: false,
      error: '',
    }),

    actions: {
      async loadLinks() {
        this.loading = true
        this.error = ''

        try {
          const response = await linkService.getAllLinks()

          if (response instanceof Error) throw response

          const links = response.data as LinkResponse[]

          for (const l of links) {
            switch (l.type) {
              case LINK_TYPES.DOWNLOAD:
                this.toolDownloadLink = l.link
                this.toolDownloadLinkId = l.id.toString()
                break

              case LINK_TYPES.INTRO_VIDEO:
                this.toolIntroVideoLink = l.link
                this.toolIntroVideoLinkId = l.id.toString()
                break

              case LINK_TYPES.INTERSTITIAL_IMAGE:
              case LINK_TYPES.INTERSTITIAL_VIDEO:
                this.imageOrVideoPreviewLink = l.link
                this.imageOrVideoPreviewLinkId = l.id.toString()
                this.typeImageOrVideoPreview = l.type
                break

              case LINK_TYPES.DESTINATION_URL:
                this.targetLink = l.link
                this.targetLinkId = l.id.toString()
                break
            }
          }
        } catch (error) {
          this.error = error instanceof Error ? error.message : 'An unexpected error occurred.'
        } finally {
          this.loading = false
        }
      },

      async createLink(body: LinkCreationRequest) {
        this.loading = true
        this.error = ''

        try {
          const response = await linkService.createLink(body)

          if (response instanceof Error) throw response

          const link = response.data as LinkResponse

          switch (link.type) {
            case LINK_TYPES.DOWNLOAD:
              this.toolDownloadLink = link.link
              this.toolDownloadLinkId = link.id.toString()
              break

            case LINK_TYPES.INTRO_VIDEO:
              this.toolIntroVideoLink = link.link
              this.toolIntroVideoLinkId = link.id.toString()
              break

            case LINK_TYPES.INTERSTITIAL_IMAGE:
            case LINK_TYPES.INTERSTITIAL_VIDEO:
              this.imageOrVideoPreviewLink = link.link
              this.imageOrVideoPreviewLinkId = link.id.toString()
              this.typeImageOrVideoPreview = link.type
              break

            case LINK_TYPES.DESTINATION_URL:
              this.targetLink = link.link
              this.targetLinkId = link.id.toString()
              break
          }
        } catch (error) {
          this.error = error instanceof Error ? error.message : 'An unexpected error occurred.'
        } finally {
          this.loading = false
        }
      },

      async updateLink(id: string, body: LinkUpdateRequest) {
        this.loading = true
        this.error = ''

        try {
          await linkService.updateLink(id, body)

          this.loadLinks()
        } catch (error) {
          this.error = error instanceof Error ? error.message : 'An unexpected error occurred.'
        } finally {
          this.loading = false
        }
      },
    },
  },
)
