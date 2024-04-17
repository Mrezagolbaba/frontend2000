export interface IreferredUser {
    phoneNumber:  string;
    createdAt:    Date;
    referrerCode: string;
}
export interface Ireferral {
    code:              string;
    isDefault:         boolean;
    userId:            string;
    friendsFeePercent: number;
    createdAt:         Date;
    updatedAt:         Date;
}