<template>
  <div v-if="isLoading" class="fixed inset-0 right-0 top-0 z-[9999] min-h-[100vh] w-full">
    <!-- Loading Overlay -->
    <div
      class="w-full h-full flex items-center justify-center bg-white dark:bg-gray-900 backdrop-blur-sm"
    >
      <div class="flex flex-col items-center gap-3">
        <!-- Spinner -->
        <svg
          class="animate-spin h-8 w-8 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>

        <!-- Message -->
        <p class="text-sm text-gray-600 dark:text-gray-400">Đang tải dữ liệu...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isLoading: boolean
}

defineProps<Props>()
</script>
