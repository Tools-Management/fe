<!-- pages/ToolLinksManager.vue -->
<template>
  <page-breadcrumb :pageTitle="currentPageTitle" />
  <div class="space-y-5 sm:space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
        Quản Lý Link Tools
      </h1>
    </div>

    <!-- Tabs -->
    <div class="border-b border-gray-200">
      <nav class="flex space-x-8">
        <button
          @click="activeTab = LINK_TYPES.DOWNLOAD"
          :class="[
            'py-2 px-1 border-b-2 font-medium text-sm transition',
            activeTab === LINK_TYPES.DOWNLOAD
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
        >
          Link Tải Tools
        </button>

        <button
          @click="activeTab = LINK_TYPES.INTRO_VIDEO"
          :class="[
            'py-2 px-1 border-b-2 font-medium text-sm transition',
            activeTab === LINK_TYPES.INTRO_VIDEO
              ? 'border-green-600 text-green-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
        >
          Video Giới Thiệu
        </button>
        
        <button
          @click="activeTab = LINK_TYPES.INTERSTITIAL_IMAGE"
          :class="[
            'py-2 px-1 border-b-2 font-medium text-sm transition',
            activeTab === LINK_TYPES.INTERSTITIAL_IMAGE
              ? 'border-yellow-600 text-yellow-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
        >
          Ảnh Or Video Preview
        </button>

        <button
          @click="activeTab = LINK_TYPES.DESTINATION_URL"
          :class="[
            'py-2 px-1 border-b-2 font-medium text-sm transition',
            activeTab === LINK_TYPES.DESTINATION_URL
              ? 'border-red-600 text-red-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
        >
          Url đích
        </button>
      </nav>
    </div>

    <!-- Nội dung tab -->
    <div v-if="activeTab === LINK_TYPES.DOWNLOAD">
      <tool-download-link-manager
        :current-link="linkStore.toolDownloadLink"
        @edit="showDownloadModal = true"
        @create="showCreateDownloadModal = true"
      />
    </div>

    <div v-if="activeTab === LINK_TYPES.INTRO_VIDEO">
      <tool-intro-video-manager
        :current-link="linkStore.toolIntroVideoLink"
        @edit="showVideoModal = true"
        @create="showCreateVideoModal = true"
      />
    </div>

    <div v-if="activeTab === LINK_TYPES.INTERSTITIAL_IMAGE">
      <image-or-video-preview
        :current-link="linkStore.imageOrVideoPreviewLink"
        @edit="showEditImageOrVideoModal = true"
        @create="showCreateLinkPreview = true"
      />
    </div>

    <div v-if="activeTab === LINK_TYPES.DESTINATION_URL">
      <target-url
        :current-link="linkStore.targetLink"
        @edit="showTargerUrlModal = true"
        @create="showCreateTargerModal = true"
      />
    </div>
  </div>

  <!-- Modal Download -->
  <edit-link-modal
    v-if="showDownloadModal"
    :id="linkStore.toolDownloadLinkId"
    :current-link="linkStore.toolDownloadLink"
    :is-download="true"
    @close="showDownloadModal = false"
    @updated="showDownloadModal = false"
  />

  <!-- Modal Video -->
  <edit-link-modal
    v-if="showVideoModal"
    :id="linkStore.toolIntroVideoLinkId"
    :current-link="linkStore.toolIntroVideoLink"
    :is-download="false"
    @close="showVideoModal = false"
    @updated="showVideoModal = false"
  />

  <!-- Modal Edit Link Preview Image Or Video -->
  <edit-link-preview-modal
    v-if="showEditImageOrVideoModal"
    :id="linkStore.imageOrVideoPreviewLinkId"
    :current-link="linkStore.imageOrVideoPreviewLink"
    :type="linkStore.typeImageOrVideoPreview"
    :is-target="false"
    @close="showEditImageOrVideoModal = false"
    @updated="showEditImageOrVideoModal = false"
  />
  
  <!-- Modal Edit Link Target Url -->
  <edit-link-preview-modal
    v-if="showTargerUrlModal"
    :id="linkStore.targetLinkId"
    :current-link="linkStore.targetLink"
    :type="linkStore.typeTargetLink"
    :is-target="true"
    @close="showTargerUrlModal = false"
    @updated="showTargerUrlModal = false"
  />

  <!-- Modal Create Download -->
  <create-link-modal
    v-if="showCreateDownloadModal"
    :is-download="true"
    @close="showCreateDownloadModal = false"
    @created="showCreateDownloadModal = false"
  />

  <!-- Modal Create Video -->
  <create-link-modal
    v-if="showCreateVideoModal"
    :is-download="false"
    @close="showCreateVideoModal = false"
    @created="showCreateVideoModal = false"
  />

  <!-- Modal Create link preview -->
  <create-link-preview-modal
    v-if="showCreateLinkPreview"
    :is-target="false"
    @close="showCreateLinkPreview = false"
    @created="showCreateLinkPreview = false"
  />

  <!-- Modal Create link target -->
  <create-link-preview-modal
    v-if="showCreateTargerModal"
    :is-target="true"
    @close="showCreateTargerModal = false"
    @created="showCreateTargerModal = false"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import ToolDownloadLinkManager from '@/components/tools/ToolDownloadLinkManager.vue'
import ToolIntroVideoManager from '@/components/tools/ToolIntroVideoManager.vue'
import ImageOrVideoPreview from '@/components/tools/ImageOrVideoPreview.vue'
import TargetUrl from '@/components/tools/TargetUrl.vue'
import EditLinkModal from '@/components/tools/EditLinkModal.vue'
import EditLinkPreviewModal from '@/components/tools/EditLinkPreviewModal.vue'
import CreateLinkModal from '@/components/tools/CreateLinkModal.vue'
import CreateLinkPreviewModal from '@/components/tools/CreateLinkPreviewModal.vue'
import { useLinkStore } from '@/store/link.store'
import { LINK_TYPES } from '@/types/link'

const currentPageTitle = ref('Quản Lý Link Tools')
const activeTab = ref<LINK_TYPES>(LINK_TYPES.DOWNLOAD)

const showDownloadModal = ref(false)
const showVideoModal = ref(false)
const showEditImageOrVideoModal = ref(false)
const showTargerUrlModal = ref(false)

const showCreateDownloadModal = ref(false)
const showCreateVideoModal = ref(false)
const showCreateLinkPreview = ref(false)
const showCreateTargerModal = ref(false)

const linkStore = useLinkStore()

onMounted(() => {
  linkStore.loadLinks()
})
</script>