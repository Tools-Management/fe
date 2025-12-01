// src/composables/useToast.ts
import { useToast as usePrimeToast } from 'primevue/usetoast'

// Example usage:
// import { useToast } from '@/composables/useToast'
//
// const { toastSuccess, toastError, toastWarn, toastInfo } = useToast()
//
// // Simple usage:
// toastSuccess('Đã lưu thành công!')
// toastError('Có lỗi xảy ra!')
// toastWarn('Cảnh báo: Dữ liệu chưa được lưu')
// toastInfo('Thông tin: Hệ thống đang xử lý')
//
// // Advanced usage:
// toastSuccess({
//   summary: 'Đã lưu thành công!',
//   detail: 'Dữ liệu đã được cập nhật vào hệ thống',
//   life: 5000
// })

export interface ToastMessage {
  severity: 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast'
  summary: string
  detail?: string
  life?: number
  group?: string
  closable?: boolean
}

export function useToast() {
  const toast = usePrimeToast()

  /**
   * Hiển thị toast thành công
   * @param message Nội dung message hoặc object ToastMessage
   * @param life Thời gian hiển thị (ms), mặc định 3000ms
   */
  const toastSuccess = (message: string | ToastMessage, life = 3000) => {
    const msg: ToastMessage = typeof message === 'string'
      ? { severity: 'success', summary: message, life }
      : { ...message, severity: 'success', life }

    toast.add({
      ...msg,
      group: msg.group || 'top-center'
    })
  }

  /**
   * Hiển thị toast thông tin
   * @param message Nội dung message hoặc object ToastMessage
   * @param life Thời gian hiển thị (ms), mặc định 3000ms
   */
  const toastInfo = (message: string | ToastMessage, life = 3000) => {
    const msg: ToastMessage = typeof message === 'string'
      ? { severity: 'info', summary: message, life }
      : { ...message, severity: 'info', life }

    toast.add({
      ...msg,
      group: msg.group || 'top-center'
    })
  }

  /**
   * Hiển thị toast cảnh báo
   * @param message Nội dung message hoặc object ToastMessage
   * @param life Thời gian hiển thị (ms), mặc định 4000ms
   */
  const toastWarn = (message: string | ToastMessage, life = 4000) => {
    const msg: ToastMessage = typeof message === 'string'
      ? { severity: 'warn', summary: message, life }
      : { ...message, severity: 'warn', life }

    toast.add({
      ...msg,
      group: msg.group || 'top-center'
    })
  }

  /**
   * Hiển thị toast lỗi
   * @param message Nội dung message hoặc object ToastMessage
   * @param life Thời gian hiển thị (ms), mặc định 5000ms
   */
  const toastError = (message: string | ToastMessage, life = 5000) => {
    const msg: ToastMessage = typeof message === 'string'
      ? { severity: 'error', summary: message, life }
      : { ...message, severity: 'error', life }

    toast.add({
      ...msg,
      group: msg.group || 'top-center'
    })
  }

  /**
   * Hiển thị toast với severity tùy chỉnh
   * @param message Object ToastMessage đầy đủ
   */
  const showToast = (message: ToastMessage) => {
    toast.add({
      ...message,
      group: message.group || 'top-center'
    })
  }

  /**
   * Xóa tất cả toast hiện tại
   */
  const clearToast = () => {
    toast.removeAllGroups()
  }

  /**
   * Xóa toast theo group
   * @param group Tên group cần xóa
   */
  const clearToastGroup = (group: string) => {
    toast.removeGroup(group)
  }

  return {
    toastSuccess,
    toastInfo,
    toastWarn,
    toastError,
    showToast,
    clearToast,
    clearToastGroup
  }
}
