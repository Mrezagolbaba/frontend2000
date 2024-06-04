import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import style from "assets/scss/components/Input/phoneInput.module.scss";
import MobileIcon from "components/Icons/MobileIcon";

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

  const labelClass = isOccupied
    ? `${style.label} ${style["as-label"]}`
    : `${style.label} ${style["as-placeholder"]}`;

  const requiredMark = required ? <span className="text-danger">*</span> : null;
  const isPrefix = inputProps?.prefix ? "is-prefix" : "";
  return (
    <div
      className={style["float-input"]}
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      <PhoneInput
        className={style.container}
        inputClassName={style.input}
        preferredCountries={["ir", "tr", "ru", "ee", "ae", "gb", "ca"]}
        value={value}
        defaultCountry="ir"
        onChange={onChange}
        disableDialCodeAndPrefix={true}
        showDisabledDialCodeAndPrefix={true}
      />
      <span className={style.icon}>
        <MobileIcon />
      </span>
      <label htmlFor={name} className={`${labelClass} ${isPrefix}`}>
        {label} {requiredMark}
      </label>
    </div>
  );
};

export default PhoneNumberInput;
