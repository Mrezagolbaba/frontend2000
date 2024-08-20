import { useState, useEffect } from "react";
import FullSelectBox from "./FullSelectBox";
import styles from "./CoinConverter.module.css";
import { formatNumber, unformatNumber } from "helpers/number";

import changeTo from "assets/icons/change-to.svg";
import darkChangeTo from "assets/icons/dark-change-to.svg";
import { useGetRateListQuery } from "store/api/publics";
import fiat from "data/fiat";

type FiatCurrencyType = "IRR" | "TRY" | "CAD" | "GBP";
type FieldProps = {
  amount: number | string;
  code: FiatCurrencyType;
};

export function CoinConverter({ dark }) {
  const [source, setSource] = useState<FieldProps>({ amount: 0, code: "IRR" });
  const [destination, setDestination] = useState<FieldProps>({
    amount: 0,
    code: "TRY",
  });
  const [selectBoxItems, setSelectBoxItems] = useState<any[]>([]);
  const list = fiat.map((coin) => coin.shortName);
  const { data, isSuccess } = useGetRateListQuery(list);

  useEffect(() => {
    if (isSuccess && data) {
      const newArray = Object.entries(data).map(
        ([currencyCode, fields]: any) => {
          let value = {};
          fields.forEach(
            (field) =>
              (value = field.dest === "IRR" && {
                rate: field?.rate.toString(),
                shortName: field.code,
                icon: fiat.find((coin) => coin.shortName === field.code)?.icon,
                name: fiat.find((coin) => coin.shortName === field.code)?.name,
              }),
          );
          return value;
        },
      );
      setSelectBoxItems(newArray);
    }
  }, [data, isSuccess]);

  const handleInputChange = ({ target: { name, value } }) => {
    const newValue = unformatNumber(value) ?? 0;

    console.log(value, newValue);
    if (source.code === "IRR") {
      if (name === "source") {
        setSource((oldVal) => ({
          ...oldVal,
          amount: newValue,
        }));
        setDestination((oldVal) => ({
          ...oldVal,
          amount: Number(
            (source.code === "IRR" ? newValue * 10 : newValue) /
              selectBoxItems.find((item) => item.shortName === oldVal.code)
                .rate,
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
            (destination.code === "IRR" ? newValue * 10 : newValue / 10) *
              selectBoxItems.find((item) => item.shortName === destination.code)
                .rate,
          ).toFixed(2),
        }));
      }
    } else {
      if (name === "source") {
        setSource((oldVal) => ({
          ...oldVal,
          amount: newValue,
        }));
        setDestination((oldVal) => ({
          ...oldVal,
          amount: Number(
            (source.code === "IRR" ? newValue * 10 : newValue) *
              selectBoxItems.find((item) => item.shortName === source.code)
                .rate,
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
            (destination.code === "IRR" ? newValue * 10 : newValue / 10) /
              selectBoxItems.find((item) => item.shortName === oldVal.code)
                .rate,
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

  return (
    isSuccess &&
    data && (
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
            disabled={source.code === "IRR"}
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
          {dark ? (
            <img src={darkChangeTo} alt="icon" />
          ) : (
            <img src={changeTo} alt="icon" />
          )}
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
            disabled={destination.code === "IRR"}
            placeholder={getPlaceHolder()}
          />
        </div>

        <button className={styles.actions_button}>خرید</button>
      </form>
    )
  );
}

export default CoinConverter;
