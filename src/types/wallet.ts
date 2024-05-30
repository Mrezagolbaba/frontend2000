export type TransactionType =
  | "DEPOSIT"
  | "WITHDRAW"
  | "EXCHANGE_SOURCE"
  | "EXCHANGE_DESTINATION";
export type TransactionRequestType =
  | "BANK_ACCOUNT"
  | "WALLET"
  | "WALLET_ADDRESS"
  | "DEBIT";
export type TransactionStatus =
  | "DRAFT"
  | "INITIATED"
  | "PROCESSING"
  | "SUCCESSFUL"
  | "FAILED"
  | "EXPIRED"
  | "CANCELED"
  | "REFUND";

export type ProviderType =
  | "ARSONEX"
  | "ATW"
  | "TRC20"
  | "JIBIT"
  | "PAY_STAR"
  | "VANDAR"
  | "ZEE_PAY";
export type FlowType =
  | "MANUAL_WITH_WALLET_ADDRESS"
  | "MANUAL_WITH_PAYMENT_IDENTIFIER"
  | "REDIRECT"
  | "DEBIT";

export type CurrencyCode = "IRR" | "TRX" | "USDT" | "TRY";

export interface DepositRequest {
  amount: string | number;
  currencyCode: CurrencyCode;
  bankAccountId?: string;
  flow: FlowType;
}

export interface WithdrawRequest {
  currencyCode: string;
  amount: string;
  destination: string;
}

export interface TransactionResponse {
  id: string;
  userId: string;
  vaultId: string;
  currencySwapId: string;
  type: TransactionType;
  sourceType: TransactionRequestType;
  sourceId: string;
  destinationType: TransactionRequestType;
  destinationId: string;
  destination: any;
  source: any;
  displayId: string;
  currencyCode: string;
  amount: string;
  fee: string;
  internalConversionRate: string;
  internalConvertedAmount: string;
  internalConvertedFee: string;
  status: TransactionStatus;
  providerId: ProviderType;
  providerRef: string;
  providerData: {
    flow: FlowType;
    flowWalletAddress: string;
    flowPaymentIdentifier: string;
    flowRedirectUrl: string;
  };
  expiresAt?: string | null;
  createdAt: string;
  updatedAt?: string | null;
}

export interface ErrorResponse {
  data: {
    message: string;
    statusCode: number;
  };
  status: number;
}

export interface DepositInfoResponse {
  accountOwnerName: string;
  bankName: string;
  iban: string;
}

export interface InitiateCurrency {
  availableBalance: string;
  balance: string;
  createdAt: string;
  currencyCode: string;
  id: string;
  updatedAt: string;
  userId: string;
}
