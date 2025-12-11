// src/composables/useToast.ts
import { useToast as usePrimeToast } from 'primevue/usetoast'
import { TOAST_GROUP } from '@/constants'
// Duration for auto-close toasts (in milliseconds)
const DURATION_TOAST = 3000

export const useToast = () => {
  const toast = usePrimeToast()

  const formatMessages = (messages: string | string[]) => {
    if (typeof messages === 'string') return messages
    return messages.map((msg) => `• ${msg}`).join('\n')
  }

  const addToast = (options: {
    severity: 'success' | 'error' | 'warn' | 'info'
    summary: string
    detail: string | string[]
    group: string
    closable?: boolean
    life?: number
    autoClose: boolean
    styleClass?: string
    contentStyleClass?: string
    messageClass?: string
  }) => {
    const detail = formatMessages(options.detail)

    toast.removeGroup(TOAST_GROUP)

    toast.add({
      severity: options.severity,
      summary: options.summary,
      detail,
      group: options.group,
      life: options.autoClose ? DURATION_TOAST : undefined,
      styleClass: options.styleClass,
      contentStyleClass: options.contentStyleClass,
    })
  }

  const toastSuccess = (
    message: string | string[],
    autoClose = true,
    styleClass?: string,
    contentStyleClass?: string,
  ) => {
    addToast({
      severity: 'success',
      summary: 'Success',
      detail: message,
      group: TOAST_GROUP,
      life: DURATION_TOAST,
      autoClose,
      styleClass,
      contentStyleClass,
    })
  }

  const toastError = (
    message: string | string[],
    autoClose = true,
    styleClass?: string,
    contentStyleClass?: string,
  ) => {
    addToast({
      severity: 'error',
      summary: 'Error',
      detail: message,
      group: TOAST_GROUP,
      life: DURATION_TOAST,
      autoClose,
      styleClass,
      contentStyleClass,
    })
  }

  const toastWarn = (
    message: string | string[],
    autoClose = true,
    styleClass?: string,
    contentStyleClass?: string,
  ) => {
    addToast({
      severity: 'warn',
      summary: 'Warning',
      detail: message,
      group: TOAST_GROUP,
      life: DURATION_TOAST,
      autoClose,
      styleClass,
      contentStyleClass,
    })
  }

  const toastInfo = (
    message: string | string[],
    autoClose = true,
    styleClass?: string,
    contentStyleClass?: string,
  ) => {
    addToast({
      severity: 'info',
      summary: 'Info',
      detail: message,
      group: TOAST_GROUP,
      life: DURATION_TOAST,
      autoClose,
      styleClass,
      contentStyleClass,
    })
  }

  return { toastSuccess, toastError, toastWarn, toastInfo }
}
