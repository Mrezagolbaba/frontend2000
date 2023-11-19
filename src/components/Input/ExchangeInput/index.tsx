import CurrencyInput from "react-currency-input-field";
import bitcoin from "assets/img/coins/bitcoin.svg";
import ethereum from "assets/img/coins/ethereum.svg";
import Lira from "assets/img/coins/lira.png";
import Rial from "assets/img/icons/flag-iran.svg";
import tetter from "assets/img/coins/tether.svg";
import Euro from "assets/img/coins/Euro.png";
import TRX from "assets/img/coins/trx.png";
import { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormFeedback,
} from "reactstrap";
import AmountDetails from "./AmountDetails";

import exchange from "assets/scss/components/Input/exchangeInput.module.scss";
import { convertIRRToToman } from "helpers";

const options = [
  {
    value: "IRR",
    label: { text: "ریال", img: Rial },
  },

  {
    value: "TRY",
    label: { text: "لیر", img: Lira },
  },
  {
    value: "TRX",
    label: { text: "ترون", img: TRX },
  },
  {
    value: "USDT",
    label: { text: "تتر", img: tetter },
  },
];

type Props = {
  name: string;
  value: string | number;
  onChange?: (amount: string | number, currency: string, rate?: number) => void;
  placeholder?: string;
  decimalsLimit?: number;
  onChangeCoin?: (value) => void;
  currencyValue: string;
  wallet?: any;
  error?: any;
  onError?: (text: string | null) => void;
};

export default function ExchangeInput({
  name,
  value,
  error,
  onChange,
  decimalsLimit = 0,
  placeholder = "مبلغ به",
  onChangeCoin,
  currencyValue,
  wallet,
  onError,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(
    options.find((option) => option.value === currencyValue) || options[0]
  );
  const [rate, setRate] = useState<number | undefined>();

  const handleChange = (val: string | number) => {
    if (Number(value) > Number(convertIRRToToman(wallet.availableBalance))) {
      onError?.("مبلغ وارد شده از موجودی شما بیش تر است.");
    } else onError?.(null);
    onChange?.(val, selected.value, rate);
  };

  useEffect(() => {
    if (rate) handleChange(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rate]);

  const toggle = () => setIsOpen((prevState) => !prevState);
  return (
    <>
      <div
        className={`${exchange.wrapper} ${error ? exchange["has-error"] : ""} `}
      >
        <CurrencyInput
          id={name}
          name={name}
          className={`form-control ${error ? "is-invalid" : ""} ${
            exchange.input
          }`}
          type="text"
          value={value}
          decimalsLimit={decimalsLimit}
          placeholder={placeholder}
          onValueChange={(val) =>
            val === undefined ? handleChange(" ") : handleChange(val)
          }
        />
        <Dropdown isOpen={isOpen} toggle={toggle} className={exchange.dropdown}>
          <DropdownToggle caret className={exchange["dropdown-btn"]}>
            <div className={exchange.selected}>
              <div className={exchange["selected__inner"]}>
                <div className={exchange["selected__item"]}>
                  <img
                    src={selected.label.img}
                    alt="currency-icon"
                    width={20}
                    height={20}
                  />
                  {selected.label.text}
                </div>
              </div>
            </div>
          </DropdownToggle>
          <DropdownMenu className={exchange["dropdown-menu"]}>
            {options.map((option, index) => (
              <DropdownItem
                key={index}
                onClick={() => {
                  onChangeCoin?.(option.value);
                  setSelected(option);
                }}
              >
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
      </div>
      <AmountDetails setRate={setRate} wallet={wallet} />
    </>
  );
}
