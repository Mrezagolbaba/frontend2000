import request from "services/adapter";


interface ExchangeRateData {
    data: {
      attributes: {
        rate: number;
      };
    };
}

export const getRateList = async () => {
    const curencys= [
        {code: 'USDT', name:  'Tether'},
        {code: 'TRY', name: 'Turkish Lira'},
    ]
    const rates = await Promise.all(curencys.map(async (currency) => {
        const response = await request.get<ExchangeRateData>(`rates/${currency.code}-IRR`);
        return response.data
    }))
    return rates
}