// Pricing constants for license keys
export const LICENSE_PRICING = {
  '30d': {
    duration: '30d',
    label: '1 Tháng',
    price: 300000,
    priceDisplay: '300.000đ',
    popular: false,
    features: [
      '30 ngày sử dụng',
      'Hỗ trợ 24/7',
      'Cập nhật miễn phí',
      'Kích hoạt ngay lập tức',
    ],
  },
  '90d': {
    duration: '90d',
    label: '3 Tháng',
    price: 800000,
    priceDisplay: '800.000đ',
    popular: true,
    savings: '100.000đ',
    features: [
      '90 ngày sử dụng',
      'Hỗ trợ 24/7',
      'Cập nhật miễn phí',
      'Kích hoạt ngay lập tức',
      'Tiết kiệm 100.000đ',
    ],
  },
  '180d': {
    duration: '180d',
    label: '6 Tháng',
    price: 1500000,
    priceDisplay: '1.500.000đ',
    popular: false,
    savings: '300.000đ',
    features: [
      '180 ngày sử dụng',
      'Hỗ trợ 24/7',
      'Cập nhật miễn phí',
      'Kích hoạt ngay lập tức',
      'Tiết kiệm 300.000đ',
    ],
  },
  '365d': {
    duration: '365d',
    label: '1 Năm',
    price: 2800000,
    priceDisplay: '2.800.000đ',
    popular: false,
    savings: '800.000đ',
    features: [
      '365 ngày sử dụng',
      'Hỗ trợ 24/7',
      'Cập nhật miễn phí',
      'Kích hoạt ngay lập tức',
      'Tiết kiệm 800.000đ',
      'Ưu đãi tốt nhất',
    ],
  },
} as const

export type LicenseDuration = keyof typeof LICENSE_PRICING

