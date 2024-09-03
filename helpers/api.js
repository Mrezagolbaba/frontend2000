import _ from 'lodash';
import { coins } from '../data/coins';
import fiat from '@/data/fiat';
import { BASE_URL } from '@/data/config';

export function getAvailableCoins(dataType) {
  if (dataType === 'fiat') return fiat;
  else return coins;
}

export function getChartData(coinData) {
  return coinData.kline?.map(({ open, time }) => {
    let date = new Date(Number(time)).getTime();

    if (isNaN(date)) {
      date = new Date(time).getTime();
    }

    return {
      y: Number(open),
      x: date,
    };
  });
}

export function getUnitPrice(coinData) {
  return coinData.rate;
}

export function getCoinsUnitPrice(coins) {
  return coins.map((coin) => {
    const unitPrice = getUnitPrice(coin);

    return { unitPrice, ...coin };
  });
}

export function getCoinCodeName(coinData) {
  return coinData.pair.split('/')[0];
}

export function getCoinDataByPair(data, pairCodeName) {
  return data.filter((item) => item.pair.endsWith(`/${pairCodeName}`))[0];
}

export function getMostProfitableCoins(type) {
  // TODO: Implement this function

  const randomCoins = _.take(getAvailableCoins(type), 5);

  return Promise.all(
    randomCoins.map(({ shortName }) =>
      fetch(`${BASE_URL}rates?selectedCurrency=${shortName}`),
    ),
  ).then((response) => Promise.all(response.map((res) => res.json())));
}

export function getMostLovedCoins(type) {
  // TODO: Implement this function

  const randomCoins = _.take(getAvailableCoins(type), 8);

  return Promise.all(
    randomCoins.map(({ shortName }) =>
      fetch(`${BASE_URL}rates?selectedCurrency=${shortName}`),
    ),
  ).then((response) => Promise.all(response.map((res) => res.json())));
}

export function getNewestCoins(type) {
  // TODO: Implement this function

  const randomCoins = _.take(getAvailableCoins(type), 9);

  return Promise.all(
    randomCoins.map(({ shortName }) =>
      fetch(`${BASE_URL}rates?selectedCurrency=${shortName}`),
    ),
  ).then((response) => Promise.all(response.map((res) => res.json())));
}

export function getCoinChanges(coinData) {
  // TODO: Implement this function

  const randChange = _.random(-100, 100);

  return randChange === 0 ? getCoinChanges(coinData) : randChange;
}

export async function getAllCoins(type) {
  const coinList = getAvailableCoins(type);
  const list = coinList.map((coin) => coin.shortName);

  return await fetch(`${BASE_URL}rates/list/${list}`)
    .then((response) => {
      localStorage.setItem('ip', response.headers.get('cf-ipcountry'));
      return response.json();
    })
    .then((data) => {
      return Object.entries(data).map(([currencyCode, info]) => ({
        codeName: currencyCode,
        rate: {
          [info?.[0]?.dest]: info?.[0]?.rate,
          [info?.[1]?.dest]: info?.[1]?.rate,
        },
        ohlc: info?.[0]?.ohlc,
        kline: info?.[0]?.kline,
        icon: coinList.find((coin) => coin.shortName === currencyCode).icon,
        name: coinList.find((coin) => coin.shortName === currencyCode).name,
      }));
    })
    .catch((error) => {
      console.error(error.message);
      return [];
    });
}

export function swapCurrency(
  { destinationCurrencyCode, sourceCurrencyCode, sourceAmount },
  token,
) {
  return fetch('${BASE_URL}currency-swaps?dry_run=true', {
    method: 'POST',
    body: JSON.stringify({
      destinationCurrencyCode,
      feeCurrencyCode: sourceCurrencyCode,
      sourceAmount,
      sourceCurrencyCode,
    }),
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  });
}
