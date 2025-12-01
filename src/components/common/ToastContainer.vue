<template>
  <!-- Toast container cho top-center (default) -->
  <Toast
    position="top-center"
    group="top-center"
    :breakpoints="{ '920px': { width: '420px', right: '0', left: 'auto' } }"
  />

  <!-- Có thể thêm các vị trí khác nếu cần -->
  <!--
  <Toast position="top-right" group="top-right" />
  <Toast position="bottom-right" group="bottom-right" />
  <Toast position="bottom-left" group="bottom-left" />
  <Toast position="bottom-center" group="bottom-center" />
  -->
</template>

<script setup lang="ts">
// Toast component từ PrimeVue
import Toast from 'primevue/toast'

// ToastContainer component để setup Toast trong app
// Sử dụng position top-center làm default
</script>
