import { Input } from "antd";
import React, { useState } from "react";

import "./style.scss";

interface Props {
  name: string;
  label: string;
  value: string;
  type?: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputProps: any;
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
  } = props;

  const isOccupied = focus || (value && value.length !== 0);

  const labelClass = isOccupied ? "label as-label" : "label as-placeholder";

  const requiredMark = required ? <span className="text-danger">*</span> : null;
  const isPrefix = inputProps?.prefix && "is-prefix";
  return (
    <div
      className="float-input"
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      <Input
        name={name}
        id={name}
        type={type}
        value={value}
        onChange={onChange}
        {...inputProps}
      />
      <label htmlFor={name} className={`${labelClass} ${isPrefix}`}>
        {label} {requiredMark}
      </label>
    </div>
  );
};

export default FloatInput;
