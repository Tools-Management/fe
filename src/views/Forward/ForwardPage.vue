<template>
  <div class="forward-page">
    <div v-if="loading" class="status">Đang tải nội dung…</div>
    <div v-else-if="error" class="status error">{{ error }}</div>

    <div v-else class="content">
      <img
        v-if="typeImageOrVideoPreview === LINK_TYPES.INTERSTITIAL_IMAGE && imageOrVideoPreviewLink"
        :src="imageOrVideoPreviewLink"
        class="media-preview"
      />

      <iframe
  v-else-if="typeImageOrVideoPreview === LINK_TYPES.INTERSTITIAL_VIDEO && imageOrVideoPreviewLink"
  class="media-preview"
  :src="youtubeEmbedUrl"
  frameborder="0"
  allow="autoplay; encrypted-media"
  allowfullscreen
></iframe>

      <div class="redirect-box">
        <p class="countdown">
          Đang chuyển hướng sau <strong>{{ remainSeconds }}</strong> giây…
        </p>

        <div class="progress">
          <div class="progress-bar" :style="{ width: `${(remainSeconds / 5) * 100}%` }"></div>
        </div>

        <p class="target">
          Đích đến: <span>{{ targetDomain }}</span>
        </p>

        <button class="skip-btn" @click="redirectNow">Chuyển ngay</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, ref, computed, onUnmounted } from 'vue'
import { useLinkStore } from '@/store/link.store'
import { LINK_TYPES } from '@/types/link'
import { storeToRefs } from 'pinia'

const linkStore = useLinkStore()

const { imageOrVideoPreviewLink, typeImageOrVideoPreview, targetLink, loading, error } =
  storeToRefs(linkStore)

  const youtubeEmbedUrl = computed(() => {
  if (!imageOrVideoPreviewLink.value) return ''

  try {
    const url = new URL(imageOrVideoPreviewLink.value)
    const videoId = url.searchParams.get('v')
    if (!videoId) return ''

    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}`
  } catch {
    return ''
  }
})

const TOTAL_TIME = 5
const remainSeconds = ref(TOTAL_TIME)
let timer: number | undefined

const targetDomain = computed(() => {
  if (!targetLink.value) return ''
  try {
    return new URL(targetLink.value).hostname
  } catch {
    return targetLink.value
  }
})

const redirectNow = () => {
  if (targetLink.value) {
    window.location.href = targetLink.value
  }
}

watch(targetLink, (val) => {
  if (!val) return

  remainSeconds.value = TOTAL_TIME

  timer = window.setInterval(() => {
    remainSeconds.value--
    if (remainSeconds.value <= 0) {
      clearInterval(timer)
      redirectNow()
    }
  }, 1000)
})

onMounted(() => {
  linkStore.loadLinks()
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.forward-page {
  min-height: 100vh;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

/* MEDIA FULL */
.media-preview {
  width: 100%;
  height: 100%;
  object-fit: contain; /* đổi thành cover nếu muốn full cứng */
  background: #000;
}

/* BOX CHUYỂN HƯỚNG */
.redirect-box {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 16px 20px 20px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.4), transparent);
  color: #fff;
  backdrop-filter: blur(6px);
}

.countdown {
  font-size: 1rem;
  margin-bottom: 10px;
}

.progress {
  height: 4px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #60a5fa, #2563eb);
  transition: width 1s linear;
}

.target {
  font-size: 0.85rem;
  opacity: 0.9;
  margin-bottom: 12px;
}

.target span {
  font-weight: 500;
}

/* NÚT */
.skip-btn {
  background: #2563eb;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 500;
}

.skip-btn:hover {
  background: #1d4ed8;
}

/* LOADING / ERROR */
.status {
  font-size: 1.2rem;
  color: white;
}

.error {
  color: #f87171;
}
</style>
