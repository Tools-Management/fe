import { LINK_TYPES } from '@/types/link'
// stores/linkStore.ts
import { defineStore } from 'pinia'
import { linkService } from '@/services/link.service'
import type { LinkCreationRequest, LinkResponse, LinkUpdateRequest } from '@/types/link'

interface LinkState {
  toolDownloadLinkId: string
  toolIntroVideoLinkId: string
  toolDownloadLink: string
  toolIntroVideoLink: string
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
      toolDownloadLink: '',
      toolIntroVideoLink: '',
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

          const download = links.find((l) => l.type === LINK_TYPES.DOWNLOAD)
          const intro = links.find((l) => l.type === LINK_TYPES.INTRO_VIDEO)

          this.toolDownloadLink = download?.link || ''
          this.toolDownloadLinkId = download?.id.toString() || ''
          this.toolIntroVideoLink = intro?.link || ''
          this.toolIntroVideoLinkId = intro?.id.toString() || ''
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

          if (link.type === LINK_TYPES.DOWNLOAD) {
            this.toolDownloadLink = link.link
            this.toolDownloadLinkId = link.id.toString()
          } else if (link.type === LINK_TYPES.INTRO_VIDEO) {
            this.toolIntroVideoLink = link.link
            this.toolIntroVideoLinkId = link.id.toString()
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
