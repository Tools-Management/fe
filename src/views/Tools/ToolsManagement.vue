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
          @click="activeTab = 'download'"
          :class="[
            'py-2 px-1 border-b-2 font-medium text-sm transition',
            activeTab === 'download'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
        >
          Link Tải Tools
        </button>
        <button
          @click="activeTab = 'video'"
          :class="[
            'py-2 px-1 border-b-2 font-medium text-sm transition',
            activeTab === 'video'
              ? 'border-green-600 text-green-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
        >
          Video Giới Thiệu
        </button>
      </nav>
    </div>

    <!-- Nội dung tab -->
    <div v-show="activeTab === 'download'">
      <tool-download-link-manager
        :current-link="linkStore.toolDownloadLink"
        @edit="showDownloadModal = true"
        @create="showCreateDownloadModal = true"
      />
    </div>

    <div v-show="activeTab === 'video'">
      <tool-intro-video-manager
        :current-link="linkStore.toolIntroVideoLink"
        @edit="showVideoModal = true"
        @create="showCreateVideoModal = true"
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
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import ToolDownloadLinkManager from '@/components/tools/ToolDownloadLinkManager.vue'
import ToolIntroVideoManager from '@/components/tools/ToolIntroVideoManager.vue'
import EditLinkModal from '@/components/tools/EditLinkModal.vue'
import CreateLinkModal from '@/components/tools/CreateLinkModal.vue'
import { useLinkStore } from '@/store/link.store'

const currentPageTitle = ref('Quản Lý Link Tools')
const activeTab = ref<'download' | 'video'>('download')
const showDownloadModal = ref(false)
const showVideoModal = ref(false)
const showCreateDownloadModal = ref(false)
const showCreateVideoModal = ref(false)

const linkStore = useLinkStore()

onMounted(async() => {
  await linkStore.loadLinks()
})
</script>