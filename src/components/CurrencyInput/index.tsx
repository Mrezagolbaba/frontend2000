import React from "react";
import { Cascader, Input } from "antd";
import Rial from "../../assets/img/icons/flag-iran.png";
import Lira from "../../assets/img/icons/flag-turkey.png";
import tetter from "../../assets/img/coins/tether.svg";
import bitcoin from "../../assets/img/coins/bitcoin.svg";
import ethereum from "../../assets/img/coins/ethereum.svg";

const options = [
  {
    value: "ریال",
    label: (
      <>
        <span style={{ fontFamily: "IRANSansWeb", fontSize: "12px" }}>
          {" "}
          ریال
        </span>

        <img src={Rial} alt="" className="bs-icon" />
      </>
    ),
  },
  {
    value: "بیت کوین",
    label: (
      <>
        <span style={{ fontFamily: "IRANSansWeb", fontSize: "12px" }}>
          بیت کوین
        </span>
        <img
          src={bitcoin}
          alt=""
          className="bs-icon"
          style={{ width: "15px" }}
        />
      </>
    ),
  },
  {
    value: "اتریوم",
    label: (
      <>
        <span style={{ fontFamily: "IRANSansWeb", fontSize: "12px" }}>
          {" "}
          اتریوم
        </span>

        <img
          src={ethereum}
          alt=""
          className="bs-icon"
          style={{ width: "15px" }}
        />
      </>
    ),
  },
  {
    value: "لیر",
    label: (
      <>
        <span style={{ fontFamily: "IRANSansWeb", fontSize: "12px" }}>
          {" "}
          لیر
        </span>

        <img src={Lira} alt="" className="bs-icon" />
      </>
    ),
  },
  {
    value: "یورو",
    label: (
      <>
        <span style={{ fontFamily: "IRANSansWeb", fontSize: "12px" }}>
          {" "}
          یورو
        </span>

        <img
          src="assets/img/icons/flag-turkey.png"
          alt=""
          className="bs-icon"
        />
      </>
    ),
  },
  {
    value: "تتر",
    label: (
      <>
        <span style={{ fontFamily: "IRANSansWeb", fontSize: "12px" }}>
          {" "}
          تتر
        </span>

        <img
          src={tetter}
          alt=""
          className="bs-icon"
          style={{ width: "15px" }}
        />
      </>
    ),
  },
];

const CurrencyInput: React.FC<NumericInputProps> = (props) => {
  //   const formatNumber = (value: number) => new Intl.NumberFormat().format(value);
  const { value, onChange } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === "" || inputValue === "-") {
      onChange(inputValue);
    }
  };
  const handleBlur = () => {
    let valueTemp = value;
    if (value.charAt(value.length - 1) === "." || value === "-") {
      valueTemp = value.slice(0, -1);
    }
    onChange(valueTemp.replace(/0*(\d+)/, "$1"));
  };

  return (
    <Input
      type="currency"
      addonAfter={<Cascader options={options} style={{ width: 100 }} />}
      defaultValue="mysite"
      {...props}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder="مبلغ را وارد کنید"
      maxLength={16}
      size="large"
    />
  );
};

export default CurrencyInput;
