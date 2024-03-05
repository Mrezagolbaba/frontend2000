export type OTPType = "AUTHENTICATOR" | "PHONE" | "EMAIL";

export interface ISetting {
  notificationSettings: INotificationSettings[];
  authenticator: IAuthenticator;
}
export interface INotificationSettings {
  id: string;
  userId: string;
  key: string;
  value: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface IAuthenticator {
  keyUrl: string;
  secret: string;
}
export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
  rePassword: string;
}

export interface GetAuthenticator {
  secret: string;
  keyUrl: string;
}
