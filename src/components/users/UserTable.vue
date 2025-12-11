<!-- src/components/users/UserTable.vue -->
<template>
  <div
    class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
  >
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <table class="min-w-full">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="px-5 py-3 text-left w-3/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Người dùng</p>
            </th>
            <th class="px-5 py-3 text-left w-2/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Vai trò</p>
            </th>
            <th class="px-5 py-3 text-left w-2/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Số dư ví</p>
            </th>
            <th class="px-5 py-3 text-left w-2/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Trạng thái</p>
            </th>
            <th class="px-5 py-3 text-left w-2/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Thao tác</p>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr
            v-for="user in users"
            :key="user.id"
            class="border-t border-gray-100 dark:border-gray-800"
          >
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold"
                >
                  {{ user.email[0].toUpperCase() }}
                </div>
                <div>
                  <p class="font-medium text-gray-800 dark:text-white/90">{{ user.email }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ user.username }}</p>
                </div>
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <span>
                {{ user.role }}
              </span>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <div v-if="user.wallet" class="text-green-600 font-medium">
                {{ formatCurrency(user.wallet.balance) }}
              </div>
              <div v-else class="text-gray-400">Chưa có ví</div>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <span :class="getStatusClass(user.isActive)">
                {{ getStatusLabel(user.isActive) }}
              </span>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-2">
                <button
                  @click="openAddMoneyModal(user)"
                  class="px-3 py-1 text-xs bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
                  :disabled="!user.wallet"
                >
                  Cộng tiền
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add Money Modal -->
    <div
      v-if="showAddMoneyModal"
      class="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          @click="closeAddMoneyModal"
        ></div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
          >&#8203;</span
        >

        <div
          class="relative inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle w-[90%] md:max-w-md sm:w-full mx-4"
        >
          <div class="bg-white px-6 pt-6 pb-4 sm:p-8 sm:pb-4">
            <div class="text-center w-full">
              <div class="flex items-center gap-2 justify-center mb-2">
                <div
                  class="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-green-400 to-green-600 sm:mx-0 sm:h-10 sm:w-10"
                >
                  <svg
                    class="h-5 w-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <h3 class="text-xl leading-6 font-bold text-gray-900 mb-2" id="modal-title">
                  Cộng tiền vào ví
                </h3>
              </div>
              <div class="bg-gray-50 rounded-lg p-4 mb-6">
                <p class="text-sm text-gray-600 mb-1">Người dùng:</p>
                <p class="font-semibold text-gray-900 mb-2">{{ selectedUser?.email }}</p>
                <p class="text-sm text-gray-600 mb-1">Số dư hiện tại:</p>
                <p class="text-lg font-bold text-green-600">
                  {{ selectedUser?.wallet ? formatCurrency(selectedUser.wallet.balance) : '0 VND' }}
                </p>
              </div>

              <div class="space-y-4">
                <div>
                  <label for="amount" class="block text-base font-medium text-gray-700 mb-2">
                    Số tiền (VND) *
                  </label>
                  <div class="relative">
                    <input
                      v-model.number="addMoneyAmount"
                      type="number"
                      id="amount"
                      class="block w-full h-12 px-4 text-lg border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      placeholder="Ví dụ: 50,000"
                      min="1000"
                      max="10000000"
                      :disabled="isAddingMoney"
                    />
                    <span
                      class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm"
                      >VND</span
                    >
                  </div>
                  <p class="mt-2 text-sm text-gray-600">
                    Tối thiểu 1,000 VND, tối đa 10,000,000 VND
                  </p>
                </div>

                <div>
                  <label for="notes" class="block text-base font-medium text-gray-700 mb-2">
                    Ghi chú (tùy chọn)
                  </label>
                  <textarea
                    v-model="addMoneyNotes"
                    id="notes"
                    rows="4"
                    class="block w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
                    placeholder="Ví dụ: Thưởng tháng, hoàn tiền, bonus..."
                    maxlength="500"
                    :disabled="isAddingMoney"
                  ></textarea>
                  <p class="mt-1 text-xs text-gray-500 text-right">
                    {{ addMoneyNotes.length }}/500
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div v-if="addMoneyError" class="px-6 py-4 bg-red-50 border-t border-red-200">
            <div class="flex items-center">
              <svg
                class="w-5 h-5 text-red-500 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <p class="text-sm text-red-700 font-medium">{{ addMoneyError }}</p>
            </div>
          </div>

          <div
            class="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse gap-3 space-y-2 sm:space-y-0"
          >
            <button
              @click="handleAddMoney"
              :disabled="!canAddMoney || isAddingMoney"
              class="w-full inline-flex justify-center items-center rounded-lg px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-base font-semibold text-white hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-lg transform transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none sm:w-auto"
            >
              <svg
                v-if="isAddingMoney"
                class="animate-spin -ml-1 mr-3 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {{ isAddingMoney ? 'Đang xử lý...' : 'Cộng tiền' }}
            </button>
            <button
              @click="closeAddMoneyModal"
              class="w-full inline-flex justify-center items-center rounded-lg px-6 py-3 border-2 border-gray-300 bg-white text-base font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
              :disabled="isAddingMoney"
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user.store'
import { onMounted, computed, ref } from 'vue'
import type { User } from '@/types/user'
import { useToast } from '@/composables/useToast'

const userStore = useUserStore()
const { toastSuccess } = useToast()

onMounted(() => {
  userStore.getUsers()
})

const users = computed(() => userStore.users)

// Modal state
const showAddMoneyModal = ref(false)
const selectedUser = ref<User | null>(null)
const addMoneyAmount = ref<number>(0)
const addMoneyNotes = ref('')
const isAddingMoney = ref(false)
const addMoneyError = ref('')

const getStatusClass = (status: boolean) => {
  return {
    'bg-green-100 text-green-800 dark:bg-green-500/15 dark:text-green-500': status,
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/15 dark:text-yellow-400': !status,
  }
}

const getStatusLabel = (status: boolean) => {
  return status ? 'Hoạt động' : 'Đã khóa'
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount)
}

const canAddMoney = computed(() => {
  return addMoneyAmount.value >= 1000 && addMoneyAmount.value <= 10000000
})

const openAddMoneyModal = (user: User) => {
  selectedUser.value = user
  addMoneyAmount.value = 0
  addMoneyNotes.value = ''
  addMoneyError.value = ''
  showAddMoneyModal.value = true
}

const closeAddMoneyModal = () => {
  showAddMoneyModal.value = false
  selectedUser.value = null
  addMoneyAmount.value = 0
  addMoneyNotes.value = ''
  addMoneyError.value = ''
}

const handleAddMoney = async () => {
  if (!selectedUser.value || !canAddMoney.value) return

  isAddingMoney.value = true
  addMoneyError.value = ''

  try {
    const result = await userStore.addMoneyToWallet(selectedUser.value.id.toString(), {
      amount: addMoneyAmount.value,
      notes: addMoneyNotes.value.trim() || undefined,
    })

    if (result) {
      toastSuccess(
        `Đã cộng ${formatCurrency(addMoneyAmount.value)} vào ví của ${selectedUser.value.email}`,
      )
      closeAddMoneyModal()
    } else {
      addMoneyError.value = userStore.error || 'Có lỗi xảy ra khi cộng tiền'
    }
  } catch (error) {
    addMoneyError.value = error instanceof Error ? error.message : 'Có lỗi xảy ra khi cộng tiền'
  } finally {
    isAddingMoney.value = false
  }
}
</script>
