export interface LoginFormData {
  phoneNumber: string;
  password: string;
  selectedCountry: string;
}
export interface LoginEmailFormData {
  email: string;
  password: string;
}
export interface RegisterFormData {
  phoneNumber: string;
  password: string;
  selectedCountry: string;
  terms: boolean;
  codeReference: string;
}

export interface InformationFormData {
  firstName: string;
  lastName: string;
  nationalCode: string;
  birthDate?: string;
  phoneNumber?: string;
  email: string;
}
