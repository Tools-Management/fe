<template>
  <div class="flex flex-col w-full h-full rounded-xl p-6 border transition group cursor-pointer" :class="isHome ? 'bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transform hover:-translate-y-2' : 'bg-white border-gray-200 hover:border-blue-500'">
    <!-- Icon -->
    <div class="w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4 transition" :class="isHome ? 'bg-gradient-to-br from-pink-500 to-purple-600' : 'bg-gradient-to-br from-blue-500 to-indigo-600 group-hover:from-indigo-600 group-hover:to-purple-600'">
      <component :is="iconComponent" class="w-6 h-6" />
    </div>

    <!-- Title -->
    <h3 class="font-semibold text-lg mb-2" :class="isHome ? 'text-white !text-2xl' : 'text-gray-900'">{{ title }}</h3>

    <!-- Description - chiếm không gian linh hoạt -->
    <p class="text-sm flex-1" :class="isHome ? 'text-gray-300' : 'text-gray-600'">{{ desc }}</p>

    <!-- Tags - luôn đẩy xuống dưới -->
    <div class="flex gap-2 flex-wrap mt-3">
      <span v-for="tag in tags" :key="tag" class="text-xs px-2 py-1 rounded-full" :class="isHome ? 'bg-white/20 text-gray-200' : 'bg-gray-100 text-gray-700'">
        {{ tag }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Palette,
  Music,
  Scissors,
  Download,
  Youtube,
  Zap,
  Link,
  FileText,
  Type,
  Image,
  User,
  UploadCloud,
} from 'lucide-vue-next'

const props = defineProps<{
  icon:
    | 'Palette'
    | 'Music'
    | 'Scissors'
    | 'Download'
    | 'Youtube'
    | 'Zap'
    | 'Link'
    | 'FileText'
    | 'Type'
    | 'Image'
    | 'User'
    | 'UploadCloud'
  title: string
  desc: string
  tags: string[]
  isHome?: boolean // New prop
}>()

const iconMap = {
  Palette,
  Music,
  Scissors,
  Download,
  Youtube,
  Zap,
  Link,
  FileText,
  Type,
  Image,
  User,
  UploadCloud,
}
const iconComponent = iconMap[props.icon]
</script>