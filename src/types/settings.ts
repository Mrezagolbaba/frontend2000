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