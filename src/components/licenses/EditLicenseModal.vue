<template>
  <div class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
    <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-3xl w-full p-6 shadow-2xl">
      <div>
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Update License</h3>
      </div>
      <div>
        <form @submit.prevent="handleUpdateLicense" class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >Email:</label
            >
            <input
              id="email"
              type="email"
              v-model="editedLicense.email"
              disabled
              class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 cursor-not-allowed disabled:bg-gray-200"
            />
          </div>
          <div>
            <label
              for="machineId"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >Machine ID:</label
            >
            <input
              id="machineId"
              type="text"
              disabled
              v-model="editedLicense.machineId"
              class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 cursor-not-allowed disabled:bg-gray-200"
            />
          </div>
          <div>
            <label
              for="expiresAt"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >Hết hạn vào:</label
            >
            <date-picker
              id="datepicker-24h"
              v-model="editedLicense.expiresAt"
              showTime
              hourFormat="24"
              fluid
            />
          </div>
          <!-- activatedAt and lastValidatedAt (read-only) -->

          <div class="flex justify-end gap-3 mt-4">
            <button
              type="button"
              @click="emit('close')"
              class="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200"
            >
              Hủy
            </button>
            <button
              type="submit"
              :disabled="licenseStore.loading"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors duration-200"
            >
              <span v-if="licenseStore.loading">Đang cập nhật...</span>
              <span v-else>Cập nhật</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ILicense, ILicenseUpdateRequest } from '@/types/license'
import { useLicenseStore } from '@/store/license.store'
import DatePicker from 'primevue/datepicker'
import { useToast } from '@/composables/useToast'

interface Props {
  license: ILicense
}

const props = defineProps<Props>()
const emit = defineEmits(['close', 'updated'])
const { toastError } = useToast()

const licenseStore = useLicenseStore()

const editedLicense = ref<ILicenseUpdateRequest>({
  email: '',
  machineId: '',
  licenseKey: '',
  isActive: true,
  expiresAt: null,
  activatedAt: null,
  lastValidatedAt: null,
})

watch(
  () => props.license,
  (newVal) => {
    if (newVal) {
      editedLicense.value = {
        email: newVal.email,
        machineId: newVal.machineId,
        licenseKey: newVal.licenseKey,
        isActive: newVal.isActive,
        expiresAt: newVal.expiresAt ? new Date(newVal.expiresAt) : null,
        activatedAt: newVal.activatedAt,
        lastValidatedAt: newVal.lastValidatedAt,
      }
    }
  },
  { immediate: true },
)

const handleUpdateLicense = async () => {
  try {
    if (props.license.id) {      
      await licenseStore.updateSingleLicense(props.license.externalId, editedLicense.value)
      emit('updated')
      emit('close')
    }
  } catch (error) {
    toastError('Lỗi hệ thống, vui lòng thử lại sau!')
    console.error('Update license error:', error)
  }
}
</script>
