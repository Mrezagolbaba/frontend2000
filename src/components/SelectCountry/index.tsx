import { Select } from "antd";
import { FieldErrors } from "react-hook-form";

import "./style.sass";

import england from "assets/img/flags/England.svg";
import australia from "assets/img/flags/Australia.svg";
import canada from "assets/img/flags/Canada.svg";
import iran from "assets/img/flags/Iran.svg";
import turkey from "assets/img/flags/Turkey.svg";
import estonia from "assets/img/flags/estonia.png";
import germany from "assets/img/flags/germany.png";

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
      value: "372",
      label: (
        <div className="flag-container">
          <span>+372</span>
          <img src={estonia} alt="Estonia-flag" />
        </div>
      ),
    },
    {
      value: "49",
      label: (
        <div className="flag-container">
          <span>+49</span>
          <img src={germany} alt="Germany-flag" />
        </div>
      ),
    },
    {
      value: "1",
      label: (
        <div className="flag-container">
          <span>+1</span>
          <img src={canada} alt="Canada-flag" />
        </div>
      ),
    },
    {
      value: "44",
      label: (
        <div className="flag-container">
          <span>+44</span>
          <img src={england} alt="England-flag" />
        </div>
      ),
    },
    {
      value: "61",
      label: (
        <div className="flag-container">
          <span>+61</span>
          <img src={australia} alt="Australia-flag" />
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
