export interface LoginFormData {
    phoneNumber: string;
    password: string;
    selectedCountry: string;
  }
  export interface RegisterFormData {
    phoneNumber: string;
    password: string;
    selectedCountry: string;
    terms: boolean;
  }
  
  export interface InformationFormData {
    firstName: string;
    lastName: string;
    nationalCode: string;
    birthDate: string;
    phoneNumber: string;
    email: string;
  }