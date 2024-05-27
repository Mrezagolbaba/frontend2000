export interface IreferredUser {
    referredUsersCount: number;
    referredSecondTairUsersCount: number;
    briefs: [
        {
            phoneNumber: string;
            createdAt: Date;
            referrerCode: string;
        }
    ]
}
export interface Ireferral {
    code:              string;
    isDefault:         boolean;
    userId:            string;
    friendsFeePercent: number;
    createdAt:         Date;
    updatedAt:         Date;
}