<!-- src/views/UserManagement.vue -->
<template>
    <page-breadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
          Quản Lý Người Dùng
        </h1>
      </div>

      <!-- Table -->
      <component-card title="Danh Sách Người Dùng">
        <user-table />
      </component-card>
    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import UserTable from '@/components/users/UserTable.vue'

const currentPageTitle = ref('Quản Lý Người Dùng')
</script>