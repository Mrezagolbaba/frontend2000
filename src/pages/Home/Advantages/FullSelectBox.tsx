import { useContext, useState, useEffect } from "react";
import IconX from "assets/img/icons/x.svg";
import { normalizeAmount } from "helpers";
import ThemeContext from "contexts/ThemeContext";
import iran from "assets/img/coins/Toman.svg";

import styles from "./FullSelectBox.module.css";
import fiat from "data/fiat";

type FiatCurrencyType = "IRR" | "TRY" | "CAD" | "GBP";
type CurrencyItemType = {
  rate: string;
  shortName?: FiatCurrencyType;
  icon?: string;
  name?: string;
};
type Props = {
  className: string;
  items: CurrencyItemType[];
  value: FiatCurrencyType;
  onChange: (string) => void;
  placeholder: string;
  disabled: boolean;
};
export function FullSelectBox({
  className,
  items,
  value,
  onChange,
  disabled = false,
  placeholder,
}: Props) {
  const [selectedItem, setSelectedItem] = useState<CurrencyItemType>({
    icon:
      value === "IRR"
        ? iran
        : fiat.find((item) => item.shortName === value)?.icon,
    name:
      value === "IRR"
        ? "تومان"
        : fiat.find((item) => item.shortName === value)?.name,
    shortName: value,
    rate: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [itemList, setItemList] = useState<CurrencyItemType[] | []>([]);
  const [search, setSearch] = useState("");

  const handleDropdownToggle = () => {
    setIsOpen((oldVal) => !oldVal);
  };

  const handleOptionClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
    onChange?.(item.shortName);
  };

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (isOpen) {
      setSearch("");
    }
  }, [isOpen]);

  useEffect(() => {
    setItemList(items);
  }, [items]);

  useEffect(() => {
    const item = {
      icon:
        value === "IRR"
          ? iran
          : fiat.find((item) => item.shortName === value)?.icon,
      name:
        value === "IRR"
          ? "تومان"
          : fiat.find((item) => item.shortName === value)?.name,
      shortName: value,
      rate: "",
    };
    setSelectedItem(item);
  }, [value]);

  return (
    <>
      <div
        onClick={() => !disabled && handleDropdownToggle()}
        className={`${styles.select_box_holder} ${className}`}
      >
        <div
          className={`${styles.select_box}  ${`${
            theme === "dark" && styles.dark_select
          }`}`}
        >
          <div>
            {selectedItem.icon ? (
              <img
                src={selectedItem.icon}
                alt={selectedItem.shortName}
                className={styles.icon}
              />
            ) : null}
            {selectedItem.name}
          </div>
          <span className={styles.select_box_arrow} />
        </div>
      </div>
      <div
        className={`${styles.options_list} ${isOpen ? styles.options_list_open : styles.options_list_close}`.trim()}
      >
        <div className={styles.search_box}>
          <img
            src={IconX}
            alt="close"
            className={`${styles.icon} ${styles.search_box_close}`}
            onClick={() => setIsOpen(false)}
          />
          <input
            type="text"
            placeholder={placeholder}
            value={search}
            onChange={({ target }) => {
              console.log(target.value, typeof target.value);

              setSearch(target.value.toUpperCase());
              setItemList((oldVal) => {
                if (target.value !== "")
                  return oldVal.filter((item) => {
                    return item.shortName?.includes(target.value.toUpperCase());
                  });
                else return items;
              });
            }}
          />
        </div>
        <div className={styles.select_options_scroll}>
          {itemList.map((item, index) => (
            <div
              key={index}
              className={styles.options_item}
              onClick={() => handleOptionClick(item)}
            >
              <span>{normalizeAmount(item.rate, "IRR", true, true)}</span>
              <div className={styles.options_item_label}>
                <span>{item.shortName}</span>
                {item.icon ? (
                  <img
                    className={styles.icon}
                    src={item.icon}
                    alt={item.shortName}
                    style={{ marginRight: 10 }}
                  />
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FullSelectBox;
