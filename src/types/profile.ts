export interface VerificationResponse {
  id: string;
  type: "KYC_TIER_1" | "KYC_TIER_2" | "KYC_INTERNATIONAL_SERVICES";
  status:
    | "DRAFT"
    | "INITIATED"
    | "PROCESSING"
    | "VERIFIED"
    | "REJECTED"
    | "EXPIRED";
  userId: string;
  data: any;
  rejectReasons: string[];
  expiresAt: string;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface BankAccountsResponse {
  bankId: string;
  cardNumber: string;
  createdAt: string;
  deletedAt?: string | null;
  iban: string;
  id: string;
  ownerFullName?: string;
  updatedAt?: string | null;
  userId: string;
  verifiedAt: string;
}

export interface FormBankAccountRequest {
  cardNumber: string;
  iban?: string;
  bankId: string;
}

export interface IranianBankAccountForm {
  cardNumber: string;
  iban?: string;
  bankId: string;
}

export interface BanksRequest {
  filters?: string;
}

export interface BanksResponse {
  id: string;
  name: string;
  website: string | undefined | null;
  enabled: boolean;
  countryCode: string;
  currencyCode: string;
  createdAt: string;
  updatedAt: string | undefined | null;
  meta: {
    codes: string[];
  };
}
