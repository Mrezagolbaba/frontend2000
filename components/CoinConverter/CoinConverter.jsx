import { useState, useEffect } from 'react';
import styles from './CoinConverter.module.css';
import { ChangeTo, DarkChangeTo } from '../svg';
import { getAllCoins } from '@/helpers/api';
import FullSelectBox from '../FullSelectBox/FullSelectBox';
import fiat from '@/data/fiat';
import { formatNumber, unformatNumber } from '@/helpers/number';

export function CoinConverter({ dark }) {
  const [isLoading, setIsLoading] = useState(true);
  const [source, setSource] = useState({ amount: 0, code: 'IRR' });
  const [destination, setDestination] = useState({
    amount: 0,
    code: 'TRY',
  });
  const [selectBoxItems, setSelectBoxItems] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      getAllCoins('fiat').then((data) => {
        setIsLoading(false);
        setSelectBoxItems(data);
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = ({ target: { name, value } }) => {
    const newValue = unformatNumber(value) ?? 0;
    if (source.code === 'IRR') {
      if (name === 'source') {
        setSource((oldVal) => ({
          ...oldVal,
          amount: newValue,
        }));
        setDestination((oldVal) => ({
          ...oldVal,
          amount: Number(
            (source.code === 'IRR' ? newValue * 10 : newValue) /
              selectBoxItems.find((item) => item?.codeName === oldVal.code)
                ?.rate?.['IRR'],
          ).toFixed(2),
        }));
      } else {
        setDestination((oldVal) => ({
          ...oldVal,
          amount: newValue,
        }));
        setSource((oldVal) => ({
          ...oldVal,
          amount: Number(
            (destination.code === 'IRR' ? newValue * 10 : newValue / 10) *
              selectBoxItems.find((item) => item?.codeName === destination.code)
                ?.rate?.['IRR'],
          ).toFixed(2),
        }));
      }
    } else {
      if (name === 'source') {
        setSource((oldVal) => ({
          ...oldVal,
          amount: newValue,
        }));
        setDestination((oldVal) => ({
          ...oldVal,
          amount: Number(
            (source.code === 'IRR' ? newValue * 10 : newValue) *
              selectBoxItems.find((item) => item.codeName === source.code)
                ?.rate?.['IRR'],
          ).toFixed(2),
        }));
      } else {
        setDestination((oldVal) => ({
          ...oldVal,
          amount: newValue,
        }));
        setSource((oldVal) => ({
          ...oldVal,
          amount: Number(
            (destination.code === 'IRR' ? newValue * 10 : newValue / 10) /
              selectBoxItems.find((item) => item.codeName === oldVal.code)
                ?.rate?.['IRR'],
          ).toFixed(2),
        }));
      }
    }
  };

  // useEffect(() => {
  //   if (search.trim().length > 0 && fiat.length > 0) {
  //     const filteredCoins = fiat.filter((coin) => coin.name.includes(search));

  //     setSelectBoxItems(filteredCoins);
  //   } else {
  //     setSelectBoxItems(fiat);
  //   }
  // }, [search]);

  const getPlaceHolder = () =>
    `جستجو در ${formatNumber(fiat.length)} فیات دیجیتال...`;

  return isLoading ? (
    'درحال بارگذاری...'
  ) : (
    <form>
      <div className={styles.input_holder}>
        <input
          type="text"
          name="source"
          value={formatNumber(source.amount)}
          onChange={handleInputChange}
        />
        <FullSelectBox
          className={styles.select_box}
          onChange={(code) =>
            setSource((oldVal) => ({ ...oldVal, code: code }))
          }
          items={selectBoxItems}
          value={source.code}
          disabled={source.code === 'IRR'}
          placeholder={getPlaceHolder()}
        />
      </div>

      <span
        className={styles.change_to}
        onClick={() => {
          const newSource = destination;
          const newDestination = source;

          setSource(newSource);
          setDestination(newDestination);
        }}
      >
        {dark ? <DarkChangeTo /> : <ChangeTo />}
      </span>

      <div className={styles.input_holder}>
        <input
          type="text"
          name="destination"
          value={formatNumber(destination.amount)}
          onChange={handleInputChange}
        />
        <FullSelectBox
          className={styles.select_box}
          onChange={(code) =>
            setDestination((oldVal) => ({ ...oldVal, code: code }))
          }
          items={selectBoxItems}
          value={destination.code}
          disabled={destination.code === 'IRR'}
          placeholder={getPlaceHolder()}
        />
      </div>

      <button className={styles.actions_button}>خرید</button>
    </form>
  );
}

export default CoinConverter;
