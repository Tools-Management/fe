export interface UserWallet {
  id: number
  userId: number
  balance: number
  currency: string
  isActive: boolean
  lastTransactionAt?: string
  createdAt: string
  updatedAt: string
}

export interface WalletTopup {
  id: number
  userId: number
  walletId: number
  topupCode: string
  amount: number
  status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded' | 'failed'
  paymentMethod: string
  ipAddress?: string
  notes?: string
  vnpResponseCode?: string
  vnpTransactionNo?: string
  vnpBankCode?: string
  vnpBankTranNo?: string
  vnpCardType?: string
  vnpPayDate?: string
  vnpOrderInfo?: string
  transactionCode?: string
  paymentDetails?: Record<string, any>
  completedAt?: string
  failedAt?: string
  createdAt: string
  updatedAt: string
}

export interface CreateTopupRequest {
  amount: number
  paymentMethod?: string
  notes?: string
}

export interface CreateTopupResponse {
  paymentUrl: string
  topupCode: string
  amount: number
  message: string
}

export interface TopupQuery {
  page: number
  limit: number
  status?: string
  paymentMethod?: string
}

export interface TopupHistoryResponse {
  topups: WalletTopup[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  message: string
}

export interface WalletBalance {
  balance: number
  currency: string
}

export interface VNPayReturnQuery {
  vnp_TxnRef?: string
  vnp_Amount?: string
  vnp_ResponseCode?: string
  vnp_TransactionNo?: string
  vnp_BankCode?: string
  vnp_PayDate?: string
  vnp_OrderInfo?: string
  [key: string]: string | undefined
}
