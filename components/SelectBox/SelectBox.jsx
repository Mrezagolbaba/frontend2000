import React, { useContext, useState } from 'react';
import ThemeContext from '../ThemeContext';
import styles from '../SelectBox/SelectBox.module.css';
import Image from 'next/image';

export default function SelectBox({
  className,
  subject,
  defaultVal,
  setcurrentTable,
  optionsClass,
}) {
  const [selectedItem, setselectedItem] = useState({ ...defaultVal });
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (item) => {
    setselectedItem(item);
    setIsOpen(false);

    setcurrentTable && setcurrentTable(item.value);
  };
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      onClick={handleDropdownToggle}
      className={`${styles.select_box_holder} ${className}`}
    >
      <div
        className={`${styles.select_box}  ${`${theme === 'dark' && styles.dark_select}`}`}
      >
        {selectedItem.icon ? (
          <Image src={selectedItem.icon} alt={selectedItem.label} />
        ) : null}
        {selectedItem.label}
      </div>
      {isOpen && (
        <div className={`${styles.options_list} ${optionsClass}`}>
          {subject.map((item) => (
            <div
              key={item.value}
              className={styles.options_item}
              onClick={() => handleOptionClick(item)}
            >
              {item.icon ? (
                <Image
                  src={item.icon}
                  alt={item.label}
                  style={{ width: 20, height: 20, marginRight: 10 }}
                />
              ) : null}
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
