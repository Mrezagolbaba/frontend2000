import { Input } from "antd";
import React, { useState } from "react";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

import "./style.scss";

interface Props {
  name: string;
  label: string;
  value: any;
  type?: string;
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
    type = "text",
    required = false,
    onChange,
    inputProps,
    disabled = false,
  } = props;

  const isOccupied = focus || (value && value.length !== 0);

  const labelClass = isOccupied ? "label as-label" : "label as-placeholder";

  const requiredMark = required ? <span className="text-danger">*</span> : null;
  const isPrefix = inputProps?.prefix && "is-prefix";
  return (
    <div className="float-input">
      <PhoneInput
        preferredCountries={[
          'ir', 'tr', 'ru', 'ee', 'ae', 'gb', 'ca'
        ]}
        value={value}
        onChange={onChange}
        prefix={inputProps?.prefix}
        placeholder='شماره همراه'
        disableDialCodeAndPrefix={true}
        showDisabledDialCodeAndPrefix={true}
      />
    </div>

  );
};

export default PhoneNumberInput;
