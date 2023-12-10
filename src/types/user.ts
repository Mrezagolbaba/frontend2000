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