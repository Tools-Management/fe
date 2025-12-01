// src/types/billing.ts

// Balance types
export interface Balance {
  current: number
  totalSpent: number
  pending: number
}

// Transaction types
export type TransactionType = 'deposit' | 'withdrawal' | 'payment'
export type TransactionStatus = 'completed' | 'pending' | 'failed'

export interface Transaction {
  id: string
  type: TransactionType
  amount: number
  description: string
  status: TransactionStatus
  createdAt: string
  fee?: number
}

// Payment method types
export interface PaymentMethod {
  id: string
  name: string
  description: string
  color: string
  icon: string
}

// Top-up types
export interface TopUpRequest {
  amount: number
  method: string
}

export interface TopUpResponse {
  success: boolean
  orderId: string
  payUrl: string
  amount: number
  method: string
}


// Modal response types
export interface ModalResponse {
  success: boolean
  [key: string]: unknown
}

// Filter types for transaction history
export interface TransactionFilters {
  type: string
  status: string
  startDate: string
  endDate: string
}

// Display types for UI
export interface DisplayTransaction extends Transaction {
  formattedAmount: string
  formattedDate: string
  statusLabel: string
  statusColor: string
  typeLabel: string
  typeColor: string
}

// Statistics types
export interface BillingStats {
  totalDeposits: number
  totalWithdrawals: number
  totalPayments: number
  totalTransactions: number
}
