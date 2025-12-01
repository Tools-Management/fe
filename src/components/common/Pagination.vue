<template>
  <div class="flex flex-col gap-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 sm:px-6 sm:flex-row sm:items-center sm:justify-between">
    <!-- Mobile pagination -->
    <div class="flex flex-1 justify-between sm:hidden">
      <button
        @click="$emit('page-change', currentPage - 1)"
        :disabled="currentPage <= 1"
        class="relative inline-flex items-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <button
        @click="$emit('page-change', currentPage + 1)"
        :disabled="currentPage >= totalPages"
        class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>

    <!-- Desktop pagination -->
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Hiển thị
          <span class="font-medium">{{ startItem }}</span>
          đến
          <span class="font-medium">{{ endItem }}</span>
          của
          <span class="font-medium">{{ totalItems }}</span>
          kết quả
        </p>
      </div>
      <div>
        <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <!-- Previous button -->
          <button
            @click="$emit('page-change', currentPage - 1)"
            :disabled="currentPage <= 1"
            class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 dark:text-gray-500 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="sr-only">Previous</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
            </svg>
          </button>

          <!-- Page numbers -->
          <template v-for="page in visiblePages" :key="page">
            <button
              v-if="page !== '...'"
              @click="$emit('page-change', Number(page))"
              :class="[
                'relative inline-flex items-center px-4 py-2 text-sm font-semibold',
                page === currentPage
                  ? 'z-10 bg-blue-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                  : 'text-gray-900 dark:text-gray-300 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-20 focus:outline-offset-0'
              ]"
            >
              {{ page }}
            </button>
            <span
              v-else
              class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:outline-offset-0"
            >
              ...
            </span>
          </template>

          <!-- Next button -->
          <button
            @click="$emit('page-change', currentPage + 1)"
            :disabled="currentPage >= totalPages"
            class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 dark:text-gray-500 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="sr-only">Next</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
          </button>
        </nav>
      </div>
    </div>

    <!-- Limit selector -->
    <div class="flex items-center gap-2 mt-4 sm:mt-0">
      <label class="text-sm text-gray-700 dark:text-gray-300">Hiển thị:</label>
      <select
        v-model="selectedLimit"
        @change="onLimitChange"
        class="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1 text-sm text-gray-900 dark:text-gray-300 focus:border-blue-500 focus:ring-blue-500"
      >
        <option v-for="limit in LIMIT_OPTIONS" :key="limit" :value="limit">{{ limit }}</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LIMIT_OPTIONS } from '@/constants'
import { computed, ref, watch } from 'vue'

interface Props {
  currentPage: number
  totalPages: number
  totalItems: number
  limit: number
}

const props = withDefaults(defineProps<Props>(), {
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  limit: 10
})

const emit = defineEmits<{
  'page-change': [page: number]
  'limit-change': [limit: number]
}>()

const selectedLimit = ref(props.limit)

const startItem = computed(() => {
  if (props.totalItems === 0) return 0
  return (props.currentPage - 1) * props.limit + 1
})

const endItem = computed(() => {
  if (props.totalItems === 0) return 0
  return Math.min(props.currentPage * props.limit, props.totalItems)
})

const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const total = props.totalPages
  const current = props.currentPage

  if (total <= 7) {
    // Show all pages if total pages <= 7
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // Show first page
    pages.push(1)

    if (current > 4) {
      pages.push('...')
    }

    // Show pages around current page
    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (current < total - 3) {
      pages.push('...')
    }

    // Show last page
    if (total > 1) {
      pages.push(total)
    }
  }

  return pages
})

const onLimitChange = () => {
  emit('limit-change', selectedLimit.value)
}

watch(() => props.limit, (newLimit) => {
  selectedLimit.value = newLimit
})
</script>
