<template>
  <!-- Toast container cho top-center (default) -->
  <Toast
    position="top-center"
    :group="TOAST_GROUP"
  />
</template>

<script setup lang="ts">
// Toast component từ PrimeVue
import Toast from 'primevue/toast'
import { TOAST_GROUP } from '@/constants'
</script>
