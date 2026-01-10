<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead class="bg-gray-50 dark:bg-gray-700">
        <tr>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
          >
            ID
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
          >
            Email
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
          >
            Machine ID
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
          >
            License Key
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
          >
            Trạng Thái
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
          >
            Ngày hết hạn
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
          >
            Ngày Kích Hoạt
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
          >
            Xác Thực Cuối
          </th>
          <th scope="col" class="relative px-6 py-3">
            <span class="sr-only">Hành động</span>
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
        <tr v-for="license in licenses" :key="license.id">
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
            {{ license.externalId }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
            {{ license.email }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
            {{ license.machineId }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
            {{ license.licenseKey }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <span
              :class="[
                'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                license.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
              ]"
            >
              {{ license.isActive ? 'Hoạt động' : 'Không hoạt động' }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
            {{ formatDate(license.expiresAt) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
            {{ license.activatedAt ? formatDate(license.activatedAt) : 'N/A' }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
            {{ license.lastValidatedAt ? formatDate(license.lastValidatedAt) : 'N/A' }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <Button
              @click="$emit('edit', license)"
              label="Update"
              raised
              severity="warn"
              variant="outlined"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="licenses.length === 0" class="text-center py-4 text-gray-500 dark:text-gray-400">
      Không tìm thấy licenses nào.
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ILicense } from '@/types/license'
import { format } from 'date-fns'
import Button from 'primevue/button'

interface Props {
  licenses: ILicense[]
}

defineProps<Props>()
defineEmits(['edit'])

const formatDate = (dateString: string | Date) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return format(date, 'dd/MM/yyyy HH:mm:ss')
}
</script>
