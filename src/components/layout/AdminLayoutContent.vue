<template>
  <div
    class="flex-1 transition-all duration-300 ease-in-out"
    :class="[isExpanded || isHovered ? 'lg:ml-[290px]' : 'lg:ml-[90px]']"
  >
    <app-header />
    <div class="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import { useSidebar } from '@/composables/useSidebar'

// BÂY GIỜ HỢP LỆ → vì nằm trong <slot> của SidebarProvider
const { isExpanded, isHovered } = useSidebar()
</script>