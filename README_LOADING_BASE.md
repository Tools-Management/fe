# LoadingBase Component

Component loading đơn giản để wrap nội dung và hiển thị loading overlay.

## Cách sử dụng

```vue
<template>
  <LoadingBase :is-loading="store.loading" message="Đang tải...">
    <!-- Nội dung của bạn ở đây -->
    <div>
      <h1>Dashboard</h1>
      <!-- ... -->
    </div>
  </LoadingBase>
</template>

<script setup>
import LoadingBase from '@/components/common/LoadingBase.vue'
import { useSomeStore } from '@/store/some.store'

const store = useSomeStore()
</script>
```

## Props

- `isLoading` (Boolean, required): Trạng thái loading
- `message` (String, optional): Thông điệp hiển thị (default: không có text)

## Features

- ✅ Overlay trắng trong suốt khi loading
- ✅ Spinner xoay tròn
- ✅ Pointer events disabled khi loading
- ✅ Message tùy chỉnh
- ✅ Responsive

## Integration

Đã được integrate vào `Admin.vue` để loading toàn bộ nội dung admin (không bao gồm sidebar và header).

```vue
<!-- Admin.vue -->
<LoadingBase :is-loading="isGlobalLoading">
  <router-view />
</LoadingBase>
```

Với `isGlobalLoading` được combine từ tất cả stores có loading state.
