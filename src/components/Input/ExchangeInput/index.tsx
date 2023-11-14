import CurrencyInput from "react-currency-input-field";
import bitcoin from "assets/img/coins/bitcoin.svg";
import ethereum from "assets/img/coins/ethereum.svg";
import Lira from "assets/img/coins/lira.png";
import Rial from "assets/img/icons/flag-iran.svg";
import tetter from "assets/img/coins/tether.svg";
import Euro from "assets/img/coins/Euro.png";
import TRX from "assets/img/coins/trx.png";
import { useState } from "react";
import exchange from "assets/scss/components/Input/exchangeInput.module.scss";
import {
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
} from "reactstrap";

const options = [
  {
    value: "IRR",
    label: { text: "ریال", img: Rial },
  },

  {
    value: "TRY",
    label: { text: "لیر", img: Lira },
  },
  // {
  //     value: "BTC",
  //     label: (
  //         <div>
  //             <img
  //                 src={bitcoin}
  //                 alt=""
  //                 className="bs-icon"
  //                 width={20}
  //                 height={20}
  //                 style={{ marginLeft: "5px" }}
  //             />
  //             <span style={{  fontSize: "12px" }}>
  //                 بیت کوین
  //             </span>

  //         </div>
  //     ),
  // },
  // {
  //     value: "ETH",
  //     label: (
  //         <div>
  //             <img
  //                 src={ethereum}
  //                 alt=""
  //                 className="bs-icon"
  //                 width={20}
  //                 height={20}
  //                 style={{ marginLeft: "5px" }}
  //             />
  //             <span style={{  fontSize: "12px" }}>
  //                 {" "}
  //                 اتریوم
  //             </span>

  //         </div>
  //     ),
  // },
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
  onChange?: (value: string) => void;
  placeholder?: string;
  decimalsLimit?: number;
  hasError?: boolean;
  onChangeCoin?: (value) => void;
};

export default function ExchangeInput({
  name,
  value,
  hasError = false,
  onChange,
  decimalsLimit = 0,
  placeholder = "مبلغ به",
  onChangeCoin,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);

  const toggle = () => setIsOpen((prevState) => !prevState);

  return (
    <div className={exchange.wrapper}>
      <CurrencyInput
        id={name}
        name={name}
        className={`form-control ${exchange.input}`}
        type="text"
        defaultValue={value}
        decimalsLimit={decimalsLimit}
        placeholder={placeholder}
        onValueChange={(value) => value && onChange?.(value)}
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
      {/* <div className="dropdown">
                <button
                    className={`${s.buttonTop} ${isOpen ? 'open' : ''}`}
                    onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(!isOpen)
                    }}
                >
                    {selected.label}
                </button>
                <ul className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
                    {options.map((option, index) => (
                        <li key={index}>
                            <button className={s.button} onClick={(e) => {
                                e.preventDefault();
                                handleSelectCoin(option.value)
                            }
                            }>{option.label}</button>
                        </li>
                    ))}
                </ul>
            </div> */}
    </div>
  );
}
