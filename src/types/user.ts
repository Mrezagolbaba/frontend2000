export interface IUser {
  id: string;
  email: string;
  emailVerified: boolean;
  password: string;
  otpMethod: string;
  firstTierVerified: boolean;
  secondTierVerified: boolean;
  internationalServicesVerified: boolean;
  firstName: string;
  lastName: string;
  firstNameEn: string;
  lastNameEn: string;
  birthDate: string;
  countryCode: string;
  nationalId: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  irPhoneNumber?: string;
}
export interface Isessions {
  id: string;
  ownerType: string;
  ownerId: string;
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string;
  status: string;
  clientIpAddress: string;
  clientUserAgent: string;
  createdAt: string;
  updatedAt: string;
}

export type RejectionReasonTyp =
  | "NOT_ACCEPTABLE_VIDEO"
  | "VIDEO_AND_AUDIO_NOT_SYNCED"
  | "POOR_QUALITY_VIDEO"
  | "POOR_QUALITY_COMMITMENT_LETTER"
  | "INVALID_RESIDENCE_PERMIT"
  | "EXPIRED_RESIDENCE_PERMIT"
  | "POOR_QUALITY_RESIDENCE_PERMIT_FRONT"
  | "POOR_QUALITY_RESIDENCE_PERMIT_BACK";
export interface CheckVerificationsResponse {
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
  rejectReasons: RejectionReasonTyp[];
  expiresAt: string;
  createdAt: string;
  updatedAt: string | undefined | null;
  deletedAt: string | undefined | null;
}

export interface SetEnglishNamesRequest {
  firstName: string;
  lastName: string;
}
