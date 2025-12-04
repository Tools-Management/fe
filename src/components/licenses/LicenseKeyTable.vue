<!-- src/components/licenses/LicenseKeyTable.vue -->
<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead class="bg-gray-50 dark:bg-gray-800">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            License Key
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            Trạng Thái
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            Thời Hạn
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            Tình Trạng
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            Người Mua
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            Ngày Tạo
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            Thao Tác
          </th>
        </tr>
      </thead>
      <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
        <tr v-if="licenseKeys.length === 0" class="text-center">
          <td colspan="7" class="px-6 py-12 text-gray-500 dark:text-gray-400">
            <div class="flex flex-col items-center">
              <svg class="w-12 h-12 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              <p>Không có license key nào</p>
            </div>
          </td>
        </tr>
        <tr v-else v-for="licenseKey in licenseKeys" :key="licenseKey.id" class="hover:bg-gray-50 dark:hover:bg-gray-800">
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <div class="ml-4">
                <div class="text-sm font-medium text-gray-900 dark:text-white font-mono">
                  {{ licenseKey.key }}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  ID: {{ licenseKey.id }}
                </div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span :class="['px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
              licenseKey.isActive
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            ]">
              {{ licenseKey.isActive ? 'Hoạt động' : 'Không hoạt động' }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800">
              {{ getDurationLabel(licenseKey.duration) }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span :class="['px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
              licenseKey.isUsed
                ? 'bg-purple-100 text-purple-800'
                : 'bg-gray-100 text-gray-800'
            ]">
              {{ licenseKey.isUsed ? 'Đã bán' : 'Chưa bán' }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <div v-if="licenseKey.isUsed && licenseKey.purchaser" class="text-gray-900 dark:text-white">
              <div class="font-medium">{{ licenseKey.purchaser.username }}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">{{ licenseKey.purchaser.email }}</div>
              <div class="text-xs text-gray-400 dark:text-gray-500">
                {{ licenseKey.purchasedAt ? formatDate(licenseKey.purchasedAt) : '' }}
              </div>
            </div>
            <span v-else class="text-gray-400 dark:text-gray-500">-</span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
            {{ formatDate(licenseKey.createdAt) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <div class="flex space-x-2">
              <button
                @click="$emit('edit', licenseKey)"
                class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                title="Chỉnh sửa"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                @click="$emit('delete', licenseKey)"
                class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                title="Xóa"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { ILicenseKey } from '@/types/license'

defineProps<{
  licenseKeys: ILicenseKey[]
}>()

defineEmits<{
  edit: [licenseKey: ILicenseKey]
  delete: [licenseKey: ILicenseKey]
}>()

const getDurationLabel = (duration: string): string => {
  const durationMap: Record<string, string> = {
    '1d': '1 ngày',
    '7d': '7 ngày',
    '30d': '30 ngày',
    '90d': '90 ngày',
    '180d': '180 ngày',
    '365d': '365 ngày'
  }
  return durationMap[duration] || duration
}

const formatDate = (date: string): string => {
  const d = new Date(date)
  return d.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
