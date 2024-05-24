import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import "./style.scss";

interface Props {
  name: string;
  label: string;
  value: any;
  required?: boolean;
  onChange?: any;
  inputProps?: any;
  disabled?: boolean;
}
const PhoneNumberInput = (props: Props) => {
  const [focus, setFocus] = useState<boolean>(false);
  const {
    name,
    label,
    value,
    required = false,
    onChange,
    inputProps,
    disabled = false,
  } = props;

  const isOccupied = focus || (value && value.length !== 0);

  const labelClass = isOccupied ? "label as-label" : "label as-placeholder";

  const requiredMark = required ? <span className="text-danger">*</span> : null;
  const isPrefix = inputProps?.prefix ? "is-prefix" : "";
  return (
    <div
      className="float-input"
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      <PhoneInput
        preferredCountries={["ir", "tr", "ru", "ee", "ae", "gb", "ca"]}
        value={value}
        defaultCountry="ir"
        onChange={onChange}
        disableDialCodeAndPrefix={true}
        showDisabledDialCodeAndPrefix={true}
      />
      <label htmlFor={name} className={`${labelClass} ${isPrefix}`}>
        {label} {requiredMark}
      </label>
    </div>
  );
};

export default PhoneNumberInput;
