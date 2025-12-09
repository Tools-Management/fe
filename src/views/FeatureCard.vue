<template>
  <div class="flex flex-col w-full h-full bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-500 transition group cursor-pointer">
    <!-- Icon -->
    <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white mb-4 group-hover:from-indigo-600 group-hover:to-purple-600 transition">
      <component :is="iconComponent" class="w-6 h-6" />
    </div>

    <!-- Title -->
    <h3 class="font-semibold text-gray-900 text-lg mb-2">{{ title }}</h3>

    <!-- Description - chiếm không gian linh hoạt -->
    <p class="text-sm text-gray-600 flex-1">{{ desc }}</p>

    <!-- Tags - luôn đẩy xuống dưới -->
    <div class="flex gap-2 flex-wrap mt-3">
      <span v-for="tag in tags" :key="tag" class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
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