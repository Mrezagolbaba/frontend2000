import CurrencyInput from "react-currency-input-field";
import Lira from "assets/img/coins/lira.png";
import Rial from "assets/img/icons/flag-iran.svg";
import tetter from "assets/img/coins/tether.svg";
import TRX from "assets/img/coins/trx.png";
import { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

import { convertText, rialToToman } from "helpers";
import { CiWallet } from "react-icons/ci";
import { BsTag } from "react-icons/bs";
import { useExchangeContext } from "../ContextProvider";

import exchange from "assets/scss/dashboard/buy-sell.module.scss";
import { useLocation } from "react-router-dom";

const options = [
  {
    value: "IRR",
    label: { text: "تومان", img: Rial },
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
  name: "source" | "destination";
  placeholder?: string;
  decimalsLimit?: number;
  error?: any;
  onError?: (text: string | null) => void;
  handleRate?: () => Promise<number | string>;
  onChange: () => void;
  isLoading?: boolean;
};

export default function ExchangeInput({
  name,
  decimalsLimit = 0,
  placeholder = "مبلغ به",
  onChange,
  isLoading = false,
}: Props) {
  const { state } = useLocation();
  const { exchangeContext, setExchangeContext } = useExchangeContext();

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState({
    value: options[0],
    amount: 0,
  });
  const [error, setError] = useState<string | undefined>(undefined);

  const handleChange = (val: string | number) => {
    setExchangeContext({
      ...exchangeContext,
      [name]: {
        amount: selected.amount ?? val,
        currency: selected.value,
        stock: exchangeContext[name].stock,
      },
    });
    if (
      name === "source" &&
      Number(val) > Number(exchangeContext[name].stock)
    ) {
      setError("مبلغ وارد شده از موجودی شما بیش تر است.");
    } else {
      setError(undefined);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange?.();
    }, 500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exchangeContext.source.amount]);

  useEffect(() => {
    if (state && state?.[name] && !state.destination) {
      const result = options.find((option) => option.value === state[name]);
      result && setSelected({
        ...selected,
        value: result,
      });
      setExchangeContext({
        ...exchangeContext,
        [name]: {
          ...exchangeContext[name],
          currency: state[name],
        },
      });
    } else if (exchangeContext[name].currency && !state.destination) {
      const result = options.find(
        (option) => option.value === exchangeContext[name].currency
      );
      result && setSelected({
        ...selected,
        value: result,
      });
    } else if (state && state?.source && state?.destination) {
      const result = options.find((option) => option.value === state[name].currency);
      result && setSelected({
        value: result,
        amount: state[name].amount,
      });
      setExchangeContext({
        ...exchangeContext,
        [name]: {
          ...exchangeContext[name],
          currency: state[name].currency,
          amount: state[name].amount,
        },
      });
    }
  }, []);

  const toggle = () => setIsOpen((prevState) => !prevState);

  return (
    <>
      <div
        className={`${exchange.wrapper} ${error ? exchange["has-error"] : ""} `}
      >
        <CurrencyInput
          id={name}
          name={name}
          className={`form-control ${error ? "is-invalid" : ""} ${exchange.input
            }`}
          type="text"
          value={exchangeContext[name].amount}
          decimalsLimit={decimalsLimit}
          placeholder={placeholder}
          onValueChange={(val) =>
            val === undefined ? handleChange(0) : handleChange(val)
          }
        />
        <Dropdown isOpen={isOpen} toggle={toggle} className={exchange.dropdown}>
          <DropdownToggle caret className={exchange["dropdown-btn"]}>
            <div className={exchange.selected}>
              <div className={exchange["selected__inner"]}>
                <div className={exchange["selected__item"]}>
                  <img
                    src={selected.value.label.img}
                    alt="currency-icon"
                    width={20}
                    height={20}
                  />
                  {selected.value.label.text}
                </div>
              </div>
            </div>
          </DropdownToggle>
          <DropdownMenu className={exchange["dropdown-menu"]}>
            {options.map((option, index) => (
              <DropdownItem
                key={index}
                onClick={() => {
                  setError(undefined);
                  setExchangeContext({
                    ...exchangeContext,
                    [name]: {
                      ...exchangeContext[name],
                      amount: 0,
                      currency: option.value,
                    },
                  });
                  setSelected({
                    ...selected,
                    value: option,
                   
                  });
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
      <div className={exchange.detail}>
        {isLoading ? (
          <div className="text-center placeholder-glow d-flex justify-content-between w-100">
            <div className="placeholder col-11 bg-secondary rounded py-2" />
          </div>
        ) : (
          <div>
            <CiWallet />
            <span className="title">موجودی: </span>
            <span className="value">
              {exchangeContext[name].currency === "IRR"
                ? rialToToman(exchangeContext[name].stock).toLocaleString()
                : Number(
                  exchangeContext[name].stock || 0
                ).toLocaleString()}{" "}
              {convertText(exchangeContext[name].currency, "enToFa")}
              {exchangeContext[name].currency}
            </span>
          </div>
        )}
        {name === "destination" &&
          (isLoading ? (
            <div className="text-center placeholder-glow d-flex justify-content-between w-100">
              <div className="placeholder col-11 bg-secondary rounded py-2" />
            </div>
          ) : (
            <div>
              <BsTag />
              <span className="title">
                نرخ {convertText(exchangeContext[name].currency, "enToFa")} :
              </span>
              <span className="value">
                {exchangeContext.source.currency === "IRR"
                  ? rialToToman(exchangeContext.rate).toLocaleString() +
                  " تومان"
                  : parseFloat(exchangeContext.rate).toLocaleString() +
                  " " +
                  convertText(exchangeContext.source.currency, "enToFa")}
              </span>
            </div>
          ))}
      </div>
    </>
  );
}
