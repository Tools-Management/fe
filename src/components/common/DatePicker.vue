<!-- src/components/common/DatePicker.vue -->
<template>
  <div class="relative">
    <input
      :value="formattedValue"
      @focus="showCalendar = true"
      @blur="handleBlur"
      readonly
      :placeholder="placeholder"
      class="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-300 cursor-pointer"
    />
    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
      <svg class="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>

    <!-- Calendar Popup -->
    <div
      v-if="showCalendar"
      class="absolute z-50 mt-1 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg"
    >
      <!-- Header -->
      <div class="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-600">
        <button
          @click="previousMonth"
          class="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div class="font-medium text-gray-900 dark:text-gray-100">
          {{ currentMonthName }} {{ currentYear }}
        </div>

        <button
          @click="nextMonth"
          class="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <!-- Days of week -->
      <div class="grid grid-cols-7 gap-1 p-3">
        <div
          v-for="day in daysOfWeek"
          :key="day"
          class="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-1"
        >
          {{ day }}
        </div>
      </div>

      <!-- Calendar days -->
      <div class="grid grid-cols-7 gap-1 p-3 pt-0">
        <div
          v-for="day in calendarDays"
          :key="day.date"
          @click="selectDate(day)"
          :class="[
            'text-center py-2 text-sm cursor-pointer rounded hover:bg-blue-50 dark:hover:bg-blue-900/20',
            {
              'text-gray-400 dark:text-gray-500': !day.isCurrentMonth,
              'text-gray-900 dark:text-gray-100': day.isCurrentMonth && !day.isSelected && !day.isToday,
              'bg-blue-600 text-white': day.isSelected,
              'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400': day.isToday && !day.isSelected,
              'cursor-not-allowed opacity-50': day.isDisabled
            }
          ]"
        >
          {{ day.day }}
        </div>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between p-3 border-t border-gray-200 dark:border-gray-600">
        <button
          @click="clearDate"
          class="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        >
          Xóa
        </button>
        <button
          @click="setToday"
          class="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Hôm nay
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'

interface Props {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  minDate?: string
  maxDate?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Chọn ngày',
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

// Reactive data
const showCalendar = ref(false)
const currentDate = ref(new Date())

// Computed
const formattedValue = computed(() => {
  if (!props.modelValue) return ''
  const date = new Date(props.modelValue)
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
})

const currentMonth = computed(() => currentDate.value.getMonth())
const currentYear = computed(() => currentDate.value.getFullYear())

const currentMonthName = computed(() => {
  const months = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ]
  return months[currentMonth.value]
})

const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']

const calendarDays = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1)
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())

  const days = []
  const current = new Date(startDate)

  for (let i = 0; i < 42; i++) {
    const day = current.getDate()
    const month = current.getMonth()
    const year = current.getFullYear()
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

    days.push({
      day,
      date: dateString,
      isCurrentMonth: month === currentMonth.value,
      isSelected: props.modelValue === dateString,
      isToday: new Date().toDateString() === new Date(year, month, day).toDateString(),
      isDisabled: checkDisabled(dateString)
    })

    current.setDate(current.getDate() + 1)
  }

  return days
})

// Methods
const checkDisabled = (dateString: string) => {
  if (props.minDate && dateString < props.minDate) return true
  if (props.maxDate && dateString > props.maxDate) return true
  return false
}

const selectDate = (day: any) => {
  if (day.isDisabled) return
  emit('update:modelValue', day.date)
  showCalendar.value = false
}

const clearDate = () => {
  emit('update:modelValue', '')
  showCalendar.value = false
}

const setToday = () => {
  const today = new Date()
  const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  emit('update:modelValue', dateString)
  showCalendar.value = false
}

const previousMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value + 1, 1)
}

const handleBlur = () => {
  // Delay hiding calendar to allow for date selection
  setTimeout(() => {
    showCalendar.value = false
  }, 150)
}

// Watch for modelValue changes to update current date
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    currentDate.value = new Date(newValue)
  }
})

// Close calendar when clicking outside (basic implementation)
watch(showCalendar, (newValue) => {
  if (newValue) {
    nextTick(() => {
      document.addEventListener('click', handleOutsideClick)
    })
  } else {
    document.removeEventListener('click', handleOutsideClick)
  }
})

const handleOutsideClick = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    showCalendar.value = false
  }
}
</script>
