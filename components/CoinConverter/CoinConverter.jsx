import { useState, useEffect } from 'react';
import { ChangeTo, DarkChangeTo } from '../svg';
import FullSelectBox from '../FullSelectBox/FullSelectBox';
import {
  getAllCoins,
  getCoinCodeName,
  getCoinDataByPair,
  getCoinsUnitPrice,
  swapCurrency,
} from '@/helpers/api';
import styles from './CoinConverter.module.css';
import { formatNumber, unformatNumber } from '@/helpers/number';

export function CoinConverter({ dark }) {
  const defaultSelectedCoins = {
    changeFrom: 0,
    changeTo: 1,
  };
  const [coins, setCoins] = useState(0);
  const [changeFromCN, setChangeFromCN] = useState();
  const [changeFromValue, setChangeFromValue] = useState();
  const [changeToCN, setChangeToCN] = useState();
  const [changeToValue, setChangeToValue] = useState();
  const [selectBoxItems, setSelectBoxItems] = useState();
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!selectBoxItems) {
      getAllCoins().then((data) => {
        let _coins = data.map((coin) => getCoinDataByPair(coin, 'IRR'));
        _coins = getCoinsUnitPrice(_coins);

        setChangeFromCN(_coins[defaultSelectedCoins.changeFrom]);
        setChangeToCN(_coins[defaultSelectedCoins.changeTo]);
        setSelectBoxItems(_coins);
        setCoins(_coins);
      });
    }
  }, []);

  const handleRequest = ({
    destinationCurrencyCode,
    sourceAmount,
    sourceCurrencyCode,
    onSuccess,
  }) => {
    setTimeout(() => {
      swapCurrency(
        {
          destinationCurrencyCode,
          sourceAmount,
          sourceCurrencyCode,
        },
        process.env.NEXT_PUBLIC_JWT_TOKEN,
      )
        .then((response) => response.json())
        .then(({ destinationAmount }) => onSuccess(destinationAmount));
    }, 500);
  };

  const getSelectedCodeName = (value) =>
    typeof value === 'string' ? value : getCoinCodeName(value);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const newValue = unformatNumber(value) ?? 0;

    if (name === 'changeFrom') {
      setChangeFromValue(newValue);

      handleRequest({
        destinationCurrencyCode: getSelectedCodeName(changeToCN),
        sourceAmount: newValue.toString(),
        sourceCurrencyCode: getSelectedCodeName(changeFromCN),
        onSuccess: setChangeToValue,
      });
    }

    if (name === 'changeTo') {
      setChangeToValue(newValue);

      handleRequest({
        destinationCurrencyCode: getSelectedCodeName(changeFromCN),
        sourceAmount: newValue.toString(),
        sourceCurrencyCode: getSelectedCodeName(changeToCN),
        onSuccess: setChangeFromValue,
      });
    }
  };

  const handleSelectBoxChange = (codeName, callback, type) => {
    callback(codeName);

    if (type === 'changeFrom') {
      handleRequest({
        destinationCurrencyCode: changeToCN,
        sourceAmount: changeFromValue,
        sourceCurrencyCode: getSelectedCodeName(codeName),
        onSuccess: setChangeToValue,
      });
    }

    if (type === 'changeTo') {
      handleRequest({
        destinationCurrencyCode: changeFromCN,
        sourceAmount: changeToValue,
        sourceCurrencyCode: getSelectedCodeName(codeName),
        onSuccess: setChangeFromValue,
      });
    }
  };

  useEffect(() => {
    if (search.trim().length > 0 && coins.length > 0) {
      const filteredCoins = coins.filter(
        (coin) =>
          coin.name.includes(search) || getCoinCodeName(coin).includes(search),
      );

      setSelectBoxItems(filteredCoins);
    } else {
      setSelectBoxItems(coins);
    }
  }, [search]);

  const getPlaceHolder = () =>
    `جستجو در ${formatNumber(coins.length)} ارز دیجیتال...`;

  return (
    coins.length > 0 && (
      <form>
        <div className={styles.input_holder}>
          <input
            type="text"
            name="changeFrom"
            value={formatNumber(changeFromValue)}
            onInput={handleInputChange}
          />
          <FullSelectBox
            className={styles.select_box}
            setcurrentTable={(codeName) =>
              handleSelectBoxChange(codeName, setChangeFromCN, 'changeFrom')
            }
            items={selectBoxItems}
            defaultVal={changeFromCN}
            placeholder={getPlaceHolder()}
            onInput={(event) => setSearch(event.target.value)}
            onClose={() => setSearch('')}
          />
        </div>

        <span className={styles.change_to}>
          {dark ? <DarkChangeTo /> : <ChangeTo />}
        </span>

        <div className={styles.input_holder}>
          <input
            type="text"
            name="changeTo"
            value={formatNumber(changeToValue)}
            onInput={handleInputChange}
          />
          <FullSelectBox
            className={styles.select_box}
            setcurrentTable={(codeName) =>
              handleSelectBoxChange(codeName, setChangeToCN, 'changeTo')
            }
            items={selectBoxItems}
            defaultVal={changeToCN}
            placeholder={getPlaceHolder()}
            onInput={(event) => setSearch(event.target.value)}
            onClose={() => setSearch('')}
          />
        </div>

        <button className={styles.actions_button}>خرید</button>
      </form>
    )
  );
}

export default CoinConverter;
