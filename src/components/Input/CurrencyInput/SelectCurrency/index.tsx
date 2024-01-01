import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { CurrencyCode } from "types/wallet";
import { useEffect, useState } from "react";

import exchange from "assets/scss/dashboard/exchange.module.scss";
import { CurrencyOption, currencyOptions } from "./constant";

type Props = {
  onChange: (option: CurrencyOption) => void;
  value: CurrencyCode;
};

export default function SelectCurrency({ onChange, value }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [selectedOption, setSelectedOption] = useState<CurrencyOption>();

  const toggle = () => setIsOpen((prevState) => !prevState);

  useEffect(() => {
    const selected = currencyOptions.find((option) => option.value === value);
    setSelectedOption(selected);
  }, [value]);

  return (
    <Dropdown isOpen={isOpen} toggle={toggle} className={exchange.dropdown}>
      <DropdownToggle caret className={exchange["dropdown-btn"]}>
        <div className={exchange.selected}>
          <div className={exchange["selected__inner"]}>
            <div className={exchange["selected__item"]}>
              <img
                src={selectedOption?.label.img}
                alt="currency-icon"
                width={20}
                height={20}
              />
              {selectedOption?.label.text}
            </div>
          </div>
        </div>
      </DropdownToggle>
      <DropdownMenu className={exchange["dropdown-menu"]}>
        {currencyOptions.map((option, index) => (
          <DropdownItem key={index} onClick={() => onChange?.(option)}>
            <div>
              <img
                src={option.label.img}
                alt=""
                className="bs-icon"
                width={20}
                height={20}
                style={{ marginLeft: "5px" }}
              />
              <span style={{ fontSize: "12px" }}> {option.label.text}</span>
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
