<template>
    <SidebarProvider>
      <admin-layout>

      <router-view />
    </admin-layout>
    </SidebarProvider>
</template>

<script setup lang="ts">
import SidebarProvider from './SidebarProvider.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'

</script>

<!-- src/App.vue -->
<!-- <template>
  <ThemeProvider>
    <RouterView />
  </ThemeProvider>
</template>

<script setup lang="ts">
import ThemeProvider from '@/components/layout/ThemeProvider.vue'
</script> -->