<template>
  <div class="p-6 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">🧪 Ticket API Test</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Test Get My Tickets -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">📋 Get My Tickets</h3>
        <div class="flex gap-3">
          <button
            @click="testGetMyTickets"
            :disabled="ticketStore.loading"
            class="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <svg v-if="ticketStore.loading" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Load My Tickets
          </button>
          <button
            @click="clearTickets"
            class="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            Clear
          </button>
        </div>

        <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg max-h-64 overflow-y-auto">
          <h4 class="font-medium mb-2">Tickets ({{ ticketStore.tickets.length }})</h4>
          <div v-if="ticketStore.tickets.length === 0" class="text-gray-500 text-sm">
            No tickets found
          </div>
          <div v-else class="space-y-2">
            <div
              v-for="ticket in ticketStore.tickets"
              :key="ticket.id"
              class="bg-white dark:bg-gray-600 p-3 rounded border text-sm"
            >
              <div class="font-medium">{{ ticket.title }}</div>
              <div class="text-gray-600 dark:text-gray-300 text-xs">
                Status: {{ ticket.status }} | Dept: {{ ticket.department }}
              </div>
              <div class="text-gray-500 text-xs truncate">
                {{ ticket.content }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Test Create Ticket -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">➕ Create Ticket</h3>

        <form @submit.prevent="testCreateTicket" class="space-y-3">
          <div>
            <label class="block text-sm font-medium mb-1">Title</label>
            <input
              v-model="testForm.title"
              type="text"
              required
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              placeholder="Ticket title"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Department</label>
            <select
              v-model="testForm.department"
              required
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="">Select department</option>
              <option value="technical">Technical</option>
              <option value="billing">Billing</option>
              <option value="account">Account</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Content</label>
            <textarea
              v-model="testForm.content"
              required
              rows="3"
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              placeholder="Ticket content"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Phone (optional)</label>
            <input
              v-model="testForm.phone"
              type="tel"
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              placeholder="Phone number"
            />
          </div>

          <button
            type="submit"
            :disabled="ticketStore.loading"
            class="w-full px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <svg v-if="ticketStore.loading" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Create Ticket
          </button>
        </form>

        <div v-if="createdTicket" class="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200">
          <div class="text-green-800 dark:text-green-200 text-sm font-medium">
            ✅ Ticket created successfully!
          </div>
          <div class="text-green-600 dark:text-green-300 text-xs mt-1">
            ID: {{ createdTicket.id }}
          </div>
          <div class="text-green-600 dark:text-green-300 text-xs">
            Title: {{ createdTicket.title }}
          </div>
        </div>
      </div>
    </div>

    <!-- Error Display -->
    <div v-if="ticketStore.error" class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200">
      <div class="text-red-800 dark:text-red-200 font-medium">❌ Error:</div>
      <div class="text-red-600 dark:text-red-300 text-sm mt-1">{{ ticketStore.error }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useTicketStore } from '@/store/ticket.store'
import { useToast } from '@/composables/useToast'

const ticketStore = useTicketStore()
const { toastSuccess, toastError } = useToast()

const createdTicket = ref<any>(null)

const testForm = reactive({
  title: '',
  department: '',
  content: '',
  phone: ''
})

const testGetMyTickets = async () => {
  try {
    await ticketStore.getMyTickets()
    toastSuccess(`Loaded ${ticketStore.tickets.length} tickets`)
  } catch (error) {
    toastError('Failed to load tickets')
  }
}

const testCreateTicket = async () => {
  try {
    const ticketData = {
      title: testForm.title,
      content: testForm.content,
      department: testForm.department,
      phone: testForm.phone || undefined,
      status: 'pending' as const
    }

    await ticketStore.createTicket(ticketData)
    createdTicket.value = ticketStore.ticket

    // Reset form
    Object.assign(testForm, {
      title: '',
      department: '',
      content: '',
      phone: ''
    })

    toastSuccess('Ticket created successfully!')
  } catch (error) {
    toastError('Failed to create ticket')
  }
}

const clearTickets = () => {
  ticketStore.tickets = []
  createdTicket.value = null
}
</script>
