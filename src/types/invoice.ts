export interface IInvoice{
    userId: string;
    sourceCurrencyCode: string;
    sourceAmount: string;
    destinationCurrencyCode: string;
    destinationAmount: string;
    exchangeRate: string;
    id: string;
    meta: any;
    createdAt: string;
    updatedAt: string;
}