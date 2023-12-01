import React, { ReactElement, useEffect, useState } from "react";
import { PiCreditCardLight } from "react-icons/pi";
import { Input } from "reactstrap";

import accountNumber from "assets/scss/components/Input/accountNumber.module.scss";
import { searchIranianBanks } from "helpers/filesManagement";

type Props = {
  value: string;
  name: string;
  onChange?: (e: any) => void;
  id?: string | number;
  className?: string;
  disabled?: boolean;
  setBankId?: (string) => void;
};

export default function AccountNumberInput({
  value,
  name,
  disabled = false,
  onChange,
  id,
  className,
  setBankId,
}: Props) {
  const [logo, setLogo] = useState<ReactElement | string>(
    <PiCreditCardLight />
  );

  useEffect(() => {
    if (value?.length >= 6) {
      const result = searchIranianBanks(value);
      if (result) {
        setLogo(result.logo);
        setBankId?.(result.bankId);
      } else setLogo(<PiCreditCardLight />);
    } else setLogo(<PiCreditCardLight />);
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    if (value?.length === 6) {
      const result = searchIranianBanks(value);
      console.log(result);

      if (result) {
        setLogo(result.logo);
        setBankId?.(result.bankId);
      } else setLogo(<PiCreditCardLight />);
    } else if (value?.length < 6) setLogo(<PiCreditCardLight />);
    onChange?.(e);
  };

  return (
    <div className={accountNumber["input-control"]}>
      {typeof logo === "string" ? (
        <div dangerouslySetInnerHTML={{ __html: logo }} />
      ) : (
        logo
      )}
      <Input
        value={value}
        onChange={handleChange}
        name={name}
        type="text"
        className={`account-number-input ${className}`}
        id={`input24_${id}`}
        disabled={disabled}
        placeholder=""
      />
    </div>
  );
}
