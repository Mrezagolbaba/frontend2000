import { useContext, useState, useEffect } from 'react';
import fiat from '@/data/fiat';

import styles from './FullSelectBox.module.css';
import ThemeContext from '../ThemeContext';
import Image from 'next/image';
import iran from '@/public/images/icon_toman.svg';
import iconX from '@/public/images/x.svg';
import { formatNumber, normalizeAmount } from '@/helpers/number';

export function FullSelectBox({
  className,
  items,
  value,
  onChange,
  disabled = false,
  placeholder,
}) {
  const [selectedItem, setSelectedItem] = useState({
    icon:
      value === 'IRR'
        ? iran
        : fiat.find((item) => item.shortName === value)?.icon,
    name:
      value === 'IRR'
        ? 'تومان'
        : fiat.find((item) => item.shortName === value)?.name,
    codeName: value,
    rate: [],
  });
  const [isOpen, setIsOpen] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [search, setSearch] = useState('');

  const handleDropdownToggle = () => {
    setIsOpen((oldVal) => !oldVal);
  };

  const handleOptionClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
    onChange?.(item.codeName);
  };

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (isOpen) {
      setSearch('');
    }
  }, [isOpen]);

  useEffect(() => {
    setItemList(items);
  }, [items]);

  useEffect(() => {
    const item = {
      icon:
        value === 'IRR'
          ? iran
          : fiat.find((item) => item.shortName === value)?.icon,
      name:
        value === 'IRR'
          ? 'تومان'
          : fiat.find((item) => item.shortName === value)?.name,
      shortName: value,
      rate: '',
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
            theme === 'dark' && styles.dark_select
          }`}`}
        >
          <div>
            {selectedItem.icon ? (
              <Image
                src={selectedItem.icon}
                alt={selectedItem.codeName}
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
          <Image
            src={iconX}
            alt="close"
            className={`${styles.icon} ${styles.search_box_close}`}
            onClick={() => setIsOpen(false)}
          />
          <input
            type="text"
            placeholder={placeholder}
            value={search}
            onChange={({ target }) => {
              setSearch(target.value.toUpperCase());
              setItemList((oldVal) => {
                if (target.value !== '')
                  return oldVal.filter((item) => {
                    return item.codeName?.includes(target.value.toUpperCase());
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
              <span>
                {normalizeAmount(item?.rate?.['IRR'], 'IRR', true, true)}
              </span>
              <div className={styles.options_item_label}>
                <span>{item?.codeName}</span>
                {item?.icon ? (
                  <Image
                    className={styles.icon}
                    src={item?.icon}
                    alt={item?.codeName}
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
