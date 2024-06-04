import React, { useState } from "react";
import { Input } from "reactstrap";

import style from "assets/scss/components/Input/floatInput.module.scss";

interface Props {
  name: string;
  label: string;
  value: string;
  type?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputProps: any;
  disabled?: boolean;
}

const FloatInput = (props: Props) => {
  const [focus, setFocus] = useState<boolean>(false);
  const {
    name,
    label,
    value,
    type = "text",
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
  const isPrefix = inputProps?.prefix && "is-prefix";
  return (
    <div
      className={style["float-input"]}
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      <span className={style["prefix-icon"]}>{inputProps?.prefix}</span>
      <Input
        name={name}
        id={name}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...inputProps}
      />
      <span className={style["suffix-icon"]}>{inputProps?.suffix}</span>
      <label htmlFor={name} className={`${labelClass} ${isPrefix}`}>
        {label} {requiredMark}
      </label>
    </div>
  );
};

export default FloatInput;
