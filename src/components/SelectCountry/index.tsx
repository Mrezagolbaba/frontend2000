import { Select } from "antd";
import { FieldErrors } from "react-hook-form";

import "./style.sass";

import england from "assets/img/flags/England.svg";
import australia from "assets/img/flags/Australia.svg";
import canada from "assets/img/flags/Canada.svg";
import iran from "assets/img/flags/Iran.svg";
import turkey from "assets/img/flags/Turkey.svg";

type Props = {
  onChange: (...event: any[]) => void;
  value: string;
  name: string;
  errors?: FieldErrors;
};

const SelectCountry = ({ name, value, onChange, errors }: Props) => {
  const options = [
    {
      value: "90",
      label: (
        <div className="flag-container">
          <span>+90</span>
          <img src={turkey} alt="Turkey-flag" width="25" />
        </div>
      ),
    },
    {
      value: "98",
      label: (
        <div className="flag-container">
          <span>+98</span>
          <img src={iran} alt="Iran-flag" width="25" />
        </div>
      ),
    },
    {
      value: "44",
      label: (
        <div className="flag-container">
          <span>+44</span>
          <img src={england} alt="England-flag" width="25" />
        </div>
      ),
    },
    {
      value: "1",
      label: (
        <div className="flag-container">
          <span>+1</span>
          <img src={canada} alt="Canada-flag" width="25" />
        </div>
      ),
    },
    {
      value: "61",
      label: (
        <div className="flag-container">
          <span>+61</span>
          <img src={australia} alt="Australia-flag" width="25" />
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
