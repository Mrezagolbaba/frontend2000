export type AuthenticationType = "PHONE" | "EMAIL" | "AUTHENTICATOR";
export type OTPType =
  | "AUTH"
  | "RESET_PASSWORD"
  | "TRANSACTION"
  | "AUTH_SETTING"
  | "VERIFY_EMAIL";

export interface LoginFormData {
  username: string;
  password: string;
  selectedCountry: string;
}
export interface LoginRequest {
  phoneNumber?: string;
  email?: string;
  password: string;
  type: AuthenticationType;
}

export interface RegisterRequest {
  phoneNumber: string;
  password: string;
  referralCode?: string;
}
export interface ForgotPasswordRequest {
  phoneNumber?: string;
  type: "PHONE" | "EMAIL";
  email?: string;
}

export interface AuthResponse {
  canResendAt: string;
  accessToken: string;
  accessTokenExpiresAt: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
}

export interface AuthProps {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  token: string | null;
  expiredAt: string | null;
}

export type JWTContextType = {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  login: (data: LoginRequest) => Promise<AuthResponse>;
  register: (data: RegisterRequest) => Promise<AuthResponse>;
  forgotPassword: (data: ForgotPasswordRequest) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  otp: (data: OTPRequest) => Promise<void>;
};

export interface OTPRequest {
  code: string;
  type: OTPType;
  method: AuthenticationType;
}

export interface ResendOTPRequest {
  type: OTPType;
  method: AuthenticationType;
}
