import CurrencyInput from "react-currency-input-field";

import currencyStyle from "assets/scss/components/Input/currencyInput.module.scss";

type Props = {
  decimalsLimit?: number;
  hasError?: boolean;
  name: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  value: string | number;
};

export default function Currency({
  name,
  value,
  hasError = false,
  onChange,
  decimalsLimit = 0,
  placeholder,
}: Props) {
  return (
    <CurrencyInput
      id={name}
      name={name}
      className={` ${currencyStyle["currency-input"]} mx-0 form-control ${
        hasError ? "is-invalid" : ""
      }`}
      inputMode="numeric"
      placeholder={placeholder}
      value={value}
      decimalsLimit={decimalsLimit}
      onValueChange={(value) => (!value ? onChange?.("") : onChange?.(value))}
    />
  );
}
