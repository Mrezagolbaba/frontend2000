export interface IBankAccounts {
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
  
  export interface CreateBankAccountResponse {
    id: string;
    userId: string;
    bankId: string;
    ownerFullName: string;
    cardNumber: string;
    iban: string;
    isSystemCreated: boolean;
    verifiedAt: string;
    isSpecialAccount: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    bank: {};
  }
  
  export interface IBank {
    id: string;
    name: string;
    website: string | undefined | null;
    enabled: boolean;
    countryCode: string;
    currencyCode: string;
    createdAt: string;
    updatedAt: string | undefined | null;
    logoPath?: string;
    meta: {
      codes: string[];
    };
  }
  
  export interface FormBankAccountRequest {
    cardNumber?: string;
    iban?: string;
    bankId: string;
    ownerFullName?: string;
  }
  