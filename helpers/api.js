import _ from 'lodash';
import { coins } from '../data/coins';

export function getAvailableCoins() {
  return coins;
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

export function getMostProfitableCoins() {
  // TODO: Implement this function

  const randomCoins = _.take(getAvailableCoins(), 5);

  return Promise.all(
    randomCoins.map(({ shortName }) =>
      fetch(
        `https://dev-api.paydirham.me/v1/rates?selectedCurrency=${shortName}`,
      ),
    ),
  ).then((response) => Promise.all(response.map((res) => res.json())));
}

export function getMostLovedCoins() {
  // TODO: Implement this function

  const randomCoins = _.take(getAvailableCoins(), 8);

  return Promise.all(
    randomCoins.map(({ shortName }) =>
      fetch(
        `https://dev-api.paydirham.me/v1/rates?selectedCurrency=${shortName}`,
      ),
    ),
  ).then((response) => Promise.all(response.map((res) => res.json())));
}

export function getNewestCoins() {
  // TODO: Implement this function

  const randomCoins = _.take(getAvailableCoins(), 9);

  return Promise.all(
    randomCoins.map(({ shortName }) =>
      fetch(
        `https://dev-api.paydirham.me/v1/rates?selectedCurrency=${shortName}`,
      ),
    ),
  ).then((response) => Promise.all(response.map((res) => res.json())));
}

export function getCoinChanges(coinData) {
  // TODO: Implement this function

  const randChange = _.random(-100, 100);

  console.log(coinData);

  return randChange === 0 ? getCoinChanges(coinData) : randChange;
}

export function getAllCoins() {
  const coins = getAvailableCoins();

  return Promise.all(
    coins.map(({ shortName }) =>
      fetch(
        `https://dev-api.paydirham.me/v1/rates?selectedCurrency=${shortName}`,
      ),
    ),
  )
    .then((response) => Promise.all(response.map((res) => res.json())))
    .then((data) =>
      data.map((pairs) =>
        pairs.map((pair) => {
          const codeName = getCoinCodeName(pair);
          const coin = coins.find((coin) => coin.shortName === codeName);

          return { ...pair, ...coin };
        }),
      ),
    );
}

export function swapCurrency(
  { destinationCurrencyCode, sourceCurrencyCode, sourceAmount },
  token,
) {
  return fetch('https://dev-api.paydirham.me/v1/currency-swaps?dry_run=true', {
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
