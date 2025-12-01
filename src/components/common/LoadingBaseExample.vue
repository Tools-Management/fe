<template>
  <div class="p-6 space-y-6">
    <h2 class="text-xl font-bold">LoadingBase Demo</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Basic Loading -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Basic Loading</h3>
        <div class="border rounded-lg p-4">
          <LoadingBase :is-loading="isLoading1" message="Đang tải dữ liệu...">
            <div class="space-y-4">
              <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div class="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
              <div class="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
            </div>
          </LoadingBase>
        </div>
        <button
          @click="toggleLoading1"
          class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        >
          {{ isLoading1 ? 'Stop' : 'Start' }} Loading
        </button>
      </div>

      <!-- With Content -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">With Real Content</h3>
        <div class="border rounded-lg p-4 min-h-[200px]">
          <LoadingBase :is-loading="isLoading2">
            <div class="space-y-4">
              <h4 class="text-lg font-medium">Dashboard Content</h4>
              <div class="grid grid-cols-3 gap-4">
                <div class="bg-blue-100 p-4 rounded">
                  <p class="text-sm text-blue-600">Total Users</p>
                  <p class="text-2xl font-bold">1,234</p>
                </div>
                <div class="bg-green-100 p-4 rounded">
                  <p class="text-sm text-green-600">Active Sessions</p>
                  <p class="text-2xl font-bold">89</p>
                </div>
                <div class="bg-yellow-100 p-4 rounded">
                  <p class="text-sm text-yellow-600">Pending Tasks</p>
                  <p class="text-2xl font-bold">12</p>
                </div>
              </div>
              <button class="px-4 py-2 bg-gray-500 text-white rounded">
                Some Action
              </button>
            </div>
          </LoadingBase>
        </div>
        <button
          @click="toggleLoading2"
          class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
        >
          {{ isLoading2 ? 'Stop' : 'Start' }} Loading
        </button>
      </div>
    </div>

    <!-- Usage Instructions -->
    <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">Cách sử dụng:</h3>
      <div class="space-y-4">
        <div>
          <h4 class="font-medium mb-2">1. Import component:</h4>
          <pre class="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto"><code>import LoadingBase from '@/components/common/LoadingBase.vue'</code></pre>
        </div>

        <div>
          <h4 class="font-medium mb-2">2. Sử dụng trong template:</h4>
          <pre class="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto"><code>&lt;LoadingBase :is-loading="store.loading"&gt;
  &lt;!-- Your content here --&gt;
&lt;/LoadingBase&gt;</code></pre>
        </div>

        <div>
          <h4 class="font-medium mb-2">3. Props:</h4>
          <ul class="list-disc list-inside space-y-1 text-sm">
            <li><code>:is-loading</code> (required): Boolean - trạng thái loading</li>
            <li><code>message</code> (optional): String - thông điệp hiển thị</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LoadingBase from './LoadingBase.vue'

const isLoading1 = ref(false)
const isLoading2 = ref(false)

const toggleLoading1 = () => {
  isLoading1.value = !isLoading1.value
}

const toggleLoading2 = () => {
  isLoading2.value = !isLoading2.value
  if (isLoading2.value) {
    // Auto stop after 3 seconds
    setTimeout(() => {
      isLoading2.value = false
    }, 3000)
  }
}
</script>
