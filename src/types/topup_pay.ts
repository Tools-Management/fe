export interface ITopupPayConfig {
  baseUrl: string;
  bankName: string;
  bankNumber: string;
  accountHolder: string;
  isMask: string;
  bankBackground: string;
}

export enum TypeTransaction {
  PLUS_MONEY = "IN",
  MINUS_MONEY = "OUT",
}

export enum TopupPayErrorCode {
  INVALID_TOKEN = 99,
}

export interface ITopupPayTransaction {
  transactionID: string;
  amount: string;
  description: string;
  transactionDate: string;
  type: TypeTransaction;
}

export interface ITopupPayTransactionApiResponse {
  status?: boolean | number;
  message?: string;
  transactions?: ITopupPayTransaction[];
}

export interface ITopupPayTransactionRequest {
  username: string;
  bankNumber: string;
  token: string;
  password: string;
  fromDate: string;
  toDate: string;
}

export interface ITopupPayTransactionResponse {
  success: boolean;
  message: string;
  data: ITopupPayTransaction[];
}

export interface ITopupPayQrCodeResponse {
    qr_url?: Blob;
}

export interface ITopupPayErrorResponse {
  success: boolean;
  message: string;
  error: unknown;
}

export interface ITopupPayQrCodeRequest {
  amount: number;
  memo?: string;
}

export interface ITopupPayCreateTopupRequest {
  amount: number;
}
