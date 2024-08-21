import React, { useContext, useState, useEffect } from 'react';
import ThemeContext from '../ThemeContext';
import styles from './FullSelectBox.module.css';
import IconX from '../../public/images/x.svg';
import Image from 'next/image';
import { formatNumber } from '@/helpers/number';

export function FullSelectBox({
  className,
  items,
  defaultVal,
  setcurrentTable,
  onInput = () => {},
  onClose = () => {},
  placeholder = null,
}) {
  const [selectedItem, setselectedItem] = useState({ ...defaultVal });
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (item) => {
    setselectedItem(item);
    setIsOpen(false);

    setcurrentTable && setcurrentTable(item.shortName);
  };

  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    setSearch('');
    onClose();
  }, [isOpen]);

  return (
    <>
      <div
        onClick={handleDropdownToggle}
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
          <Image
            src={IconX}
            alt="close"
            className={`${styles.icon} ${styles.search_box_close}`}
            onClick={() => setIsOpen(false)}
          />
          <input
            type="text"
            {...{ placeholder, onInput }}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div className={styles.select_options_scroll}>
          {items.map((item, index) => (
            <div
              key={index}
              className={styles.options_item}
              onClick={() => handleOptionClick(item)}
            >
              <span>{formatNumber(item.unitPrice)} تومان</span>
              <div className={styles.options_item_label}>
                <span>{item.shortName}</span>
                {item.icon ? (
                  <Image
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
