// src/store/billing.store.ts
import { defineStore } from 'pinia'
import type {
  Balance,
  Transaction,
  TopUpRequest,
  TopUpResponse
} from '@/types/billing'


export const useBillingStore = defineStore('billing', {
  state: () => ({
    balance: {
      current: 150000,
      totalSpent: 250000,
      pending: 0
    } as Balance,

    transactions: [
      {
        id: '1',
        type: 'deposit' as const,
        amount: 100000,
        description: 'Nạp tiền qua ZaloPay',
        status: 'completed' as const,
        createdAt: '2024-12-01T10:30:00Z'
      },
      {
        id: '2',
        type: 'deposit' as const,
        amount: 200000,
        description: 'Nạp tiền qua MoMo',
        status: 'completed' as const,
        createdAt: '2024-12-02T14:20:00Z'
      },
      {
        id: '3',
        type: 'deposit' as const,
        amount: 150000,
        description: 'Nạp tiền qua ATM',
        status: 'completed' as const,
        createdAt: '2024-12-03T09:15:00Z'
      },
      {
        id: '4',
        type: 'deposit' as const,
        amount: 50000,
        description: 'Nạp tiền qua PayOS',
        status: 'pending' as const,
        createdAt: '2024-12-04T16:45:00Z'
      },
      {
        id: '5',
        type: 'deposit' as const,
        amount: 300000,
        description: 'Nạp tiền qua ZaloPay',
        status: 'completed' as const,
        createdAt: '2024-12-05T11:30:00Z'
      },
      {
        id: '6',
        type: 'deposit' as const,
        amount: 75000,
        description: 'Nạp tiền qua QR Code',
        status: 'failed' as const,
        createdAt: '2024-12-06T08:20:00Z'
      }
    ] as Transaction[]
  }),

  getters: {
    completedTransactions: (state) =>
      state.transactions.filter(t => t.status === 'completed'),

    pendingTransactions: (state) =>
      state.transactions.filter(t => t.status === 'pending'),

    totalDeposits: (state) =>
      state.transactions
        .filter(t => t.type === 'deposit' && t.status === 'completed')
        .reduce((sum, t) => sum + t.amount, 0)
  },

  actions: {
    // Load balance from API (mock)
    async loadBalance() {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500))

      // In real app, this would be an API call
      // this.balance = await api.getBalance()
    },

    // Load transactions from API (mock)
    async loadTransactions() {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500))

      // In real app, this would be an API call
      // this.transactions = await api.getTransactions()
    },

    // Create top-up order
    async createTopUpOrder(data: TopUpRequest): Promise<TopUpResponse> {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Simulate API response
      return {
        success: true,
        orderId: `ORDER_${Date.now()}`,
        payUrl: `https://sandbox.zalopay.vn/checkout?token=mock_${Date.now()}`,
        amount: data.amount,
        method: data.method
      }
    },

    // Update balance
    updateBalance(amount: number, operation: 'add' | 'subtract') {
      if (operation === 'add') {
        this.balance.current += amount
      } else {
        this.balance.current -= amount
        this.balance.totalSpent += amount
      }
    },

    // Add transaction
    addTransaction(transaction: Transaction) {
      this.transactions.unshift(transaction)
    },

    // Update transaction status
    updateTransactionStatus(transactionId: string, status: Transaction['status']) {
      const transaction = this.transactions.find(t => t.id === transactionId)
      if (transaction) {
        transaction.status = status

        // Update balance if status changed to completed
        if (status === 'completed' && transaction.type === 'deposit') {
          this.updateBalance(transaction.amount, 'add')
        }
      }
    }
  }
})
