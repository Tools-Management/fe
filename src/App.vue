<template>
  <ToastContainer />
  <ThemeProvider>
    <RouterView />
  </ThemeProvider>
</template>

<script setup lang="ts">
import ThemeProvider from '@/components/layout/ThemeProvider.vue'
import ToastContainer from '@/components/common/ToastContainer.vue'
</script>
