import { Select } from "antd";
import { FieldErrors } from "react-hook-form";

import "./style.sass";

import Russia from "assets/img/flags/Russia.svg";
import UAE from "assets/img/flags/Emirates.png";
import iran from "assets/img/flags/Iran.svg";
import turkey from "assets/img/flags/Turkey.svg";
import canada from "assets/img/flags/Canada.svg";

type Props = {
  onChange: (...event: any[]) => void;
  value: string;
  name: string;
  errors?: FieldErrors;
};

const SelectCountry = ({ name, value, onChange, errors }: Props) => {
  const options = [
    {
      value: "98",
      label: (
        <div className="flag-container">
          <span>+98</span>
          <img src={iran} alt="Iran-flag" />
        </div>
      ),
    },
    {
      value: "90",
      label: (
        <div className="flag-container">
          <span>+90</span>
          <img src={turkey} alt="Turkey-flag" />
        </div>
      ),
    },
    {
      value: "7",
      label: (
        <div className="flag-container">
          <span>+7</span>
          <img src={Russia} alt="Russia-flag" />
        </div>
      ),
    },
    {
      value: "971",
      label: (
        <div className="flag-container">
          <span>+971</span>
          <img src={UAE} alt="UAE-flag" />
        </div>
      ),
    },
    {
      value: "1",
      label: (
        <div className="flag-container">
          <span>+1</span>
          <img src={canada} alt="UAE-flag" />
        </div>
      ),
    },
  ];

  return (
    <Select
      className="dropdown bootstrap-select bs-select-control bs-form-select select-country-input"
      id={name}
      value={value}
      options={options}
      labelInValue
      onChange={(e: any) => {
        onChange(e.value);
      }}
      size="large"
      placeholder="Select one country"
      optionLabelProp="label"
      status={errors?.[name]?.message ? "error" : undefined}
    />
  );
};

export default SelectCountry;
