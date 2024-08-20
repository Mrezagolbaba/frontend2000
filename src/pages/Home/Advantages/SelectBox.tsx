import { useContext, useState } from "react";
import ThemeContext from "contexts/ThemeContext";

import styles from "./SelectBox.module.css";

type Props = {
  className: string;
  subject: any[];
  defaultVal: any;
  setCurrentTable?: (string) => void;
  optionsClass?: string;
};
export default function SelectBox({
  className,
  subject,
  defaultVal,
  setCurrentTable,
  optionsClass,
}: Props) {
  const [selectedItem, setselectedItem] = useState({ ...defaultVal });
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (item) => {
    setselectedItem(item);
    setIsOpen(false);

    setCurrentTable?.(item.value);
  };
  const { theme } = useContext(ThemeContext);

  return (
    <div
      onClick={handleDropdownToggle}
      className={`${styles.select_box_holder} ${className}`}
    >
      <div
        className={`${styles.select_box}  ${`${theme === "dark" && styles.dark_select}`}`}
      >
        {selectedItem.icon ? (
          <img src={selectedItem.icon} alt={selectedItem.label} />
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
                <img
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
