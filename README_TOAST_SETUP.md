# Setup PrimeVue Toast

## 1. Install PrimeVue

```bash
npm install primevue primeicons
```

## 2. Setup PrimeVue trong main.ts

```typescript
import './assets/main.css'
// ... other imports

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import PrimeVue
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

// Import theme (chọn 1)
import 'primevue/resources/themes/aura-light-green/theme.css'  // Aura theme
// hoặc
import 'primevue/resources/themes/lara-light-indigo/theme.css' // Lara theme

// Import PrimeVue CSS
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

const app = createApp(App)

// Use PrimeVue và ToastService
app.use(PrimeVue)
app.use(ToastService)

// ... rest of setup
```

## 3. Add ToastContainer vào App.vue

```vue
<template>
  <div id="app">
    <!-- Nội dung app -->
    <router-view />

    <!-- Toast container -->
    <ToastContainer />
  </div>
</template>

<script setup>
import ToastContainer from '@/components/common/ToastContainer.vue'
</script>
```

## 4. Sử dụng useToast composable

```vue
<script setup>
import { useToast } from '@/composables/useToast'

const { toastSuccess, toastError, toastWarn, toastInfo } = useToast()

const handleSave = async () => {
  try {
    await saveData()
    toastSuccess('Đã lưu thành công!')
  } catch (error) {
    toastError('Có lỗi xảy ra khi lưu dữ liệu')
  }
}

const showWarning = () => {
  toastWarn('Cảnh báo: Dữ liệu chưa được lưu')
}

const showInfo = () => {
  toastInfo('Hệ thống đang xử lý...')
}
</script>
```

## API Methods

- `toastSuccess(message, life?)` - Toast xanh cho thành công
- `toastError(message, life?)` - Toast đỏ cho lỗi
- `toastWarn(message, life?)` - Toast vàng cho cảnh báo
- `toastInfo(message, life?)` - Toast xanh dương cho thông tin
- `showToast(message)` - Toast tùy chỉnh với full options
- `clearToast()` - Xóa tất cả toast
- `clearToastGroup(group)` - Xóa toast theo group

## Message Parameter

`message` có thể là:
- `string`: Nội dung đơn giản
- `ToastMessage object`: Tùy chỉnh đầy đủ

```typescript
interface ToastMessage {
  severity: 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast'
  summary: string           // Tiêu đề
  detail?: string          // Chi tiết (optional)
  life?: number            // Thời gian hiển thị (ms)
  group?: string           // Group toast (default: 'top-center')
  closable?: boolean       // Có thể đóng hay không
}
```

## Default Settings

- **Position**: top-center
- **Life**: Success/Info: 3000ms, Warn: 4000ms, Error: 5000ms
- **Closable**: true (có thể tắt)
- **Auto-hide**: Có
