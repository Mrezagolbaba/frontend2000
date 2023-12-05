export interface BankAccountsRequest {
  params?: any;
}

export interface BankAccountsResponse {
  bankId: string;
  cardNumber: string;
  createdAt: string;
  deletedAt?: string | null;
  iban: string;
  id: string;
  ownerFullName?: string | null;
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
}
