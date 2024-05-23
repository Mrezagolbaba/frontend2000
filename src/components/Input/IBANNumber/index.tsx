import { ChangeEvent } from "react";
import { FormFeedback, Input } from "reactstrap";
import BanksWrapper from "components/BanksWrapper";

import style from "assets/scss/components/Input/ibanNumber.module.scss";

type Props = {
  name: string;
  value: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  className?: string;
  setBankId?: (string) => void;
  error?: any;
};

export default function IBANNumber({
  name,
  value,
  onChange,
  disabled = false,
  className,
  setBankId,
  error,
}: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace("TR", "").replace(/\s/g, "");
    onChange?.(value);
  };
  return (
    <div
      className={`${style["iban-input-control"]} ${error ? style["iban-control-error"] : ""}`}
    >
      <BanksWrapper
        value={value}
        type="TRY"
        iconClassName={style["iban-icon-holder"]}
        idHandler={(id) => setBankId?.(id)}
      >
        <span>TR</span>
        <Input
          value={value}
          onChange={handleChange}
          name={name}
          type="text"
          inputMode="numeric"
          className={`account-number-input ${className} latin-font`}
          id={`ibanNumber-${name}`}
          disabled={disabled}
          placeholder=""
          invalid={Boolean(error)}
        />
      </BanksWrapper>
      {error && <FormFeedback dir="rtl">{error?.message}</FormFeedback>}
    </div>
  );
}
