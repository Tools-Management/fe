// src/composables/useGlobalLoading.ts
import { computed } from 'vue'
import { useTicketStore } from '@/store/ticket.store'
import { useAuthStore } from '@/store/auth'
import { useUserStore } from '@/store/user.store'
import { useLicenseStore } from '@/store/license.store'
import { useLicenseKeyStore } from '@/store/license_key.store'
import { useLinkStore } from '@/store/link.store'

export function useGlobalLoading() {
  const ticketStore = useTicketStore()
  const authStore = useAuthStore()
  const userStore = useUserStore()
  const licenseStore = useLicenseStore()
  const licenseKeyStore = useLicenseKeyStore()
  const linkStore = useLinkStore()

  // Combine loading từ tất cả stores
  const isGlobalLoading = computed(() => {
    return (
      ticketStore.loading ||
      authStore.loading ||
      userStore.loading ||
      licenseStore.loading ||
      licenseKeyStore.loading ||
      linkStore.loading
    )
  })

  return {
    isGlobalLoading
  }
}
