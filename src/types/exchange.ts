export interface Exchange {
    id:                      string;
    userId:                  string;
    sourceCurrencyCode:      string;
    sourceAmount:            string;
    destinationCurrencyCode: string;
    destinationAmount:       string;
    exchangeRate:            string;
    meta:                    Meta;
    createdAt:               Date;
    updatedAt:               Date;
    transactions:            Transaction[];
}

export interface Meta {
}

export interface Transaction {
    id:                      string;
    userId:                  string;
    vaultId:                 null;
    currencySwapId:          string;
    type:                    string;
    sourceType:              null | string;
    sourceId:                null | string;
    destinationType:         null | string;
    destinationId:           null | string;
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
    providerData:            Meta;
    expiresAt:               null;
    createdAt:               Date;
    updatedAt:               Date;
}