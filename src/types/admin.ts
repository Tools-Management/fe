export interface AdminTopupQuery {
  page?: number
  limit?: number
  status?: string
  paymentMethod?: string
  userId?: number
  startDate?: string | undefined
  endDate?: string | undefined
}

