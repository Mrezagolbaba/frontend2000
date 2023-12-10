export interface Transaction {
    id:                      string;
    userId:                  string;
    vaultId:                 string;
    currencySwapId:          null;
    type:                    string;
    sourceType:              null;
    sourceId:                null;
    destinationType:         string;
    destinationId:           string;
    displayId:               string;
    currencyCode:            string;
    amount:                  string;
    fee:                     string;
    internalConversionRate:  string;
    internalConvertedAmount: string;
    internalConvertedFee:    string;
    status:                  string;
    providerId:              string;
    providerRef:             null;
    providerData:            ProviderData;
    expiresAt:               Date;
    createdAt:               Date;
    updatedAt:               Date;
}

export interface ProviderData {
    flow:              string;
    flowWalletAddress: string;
}