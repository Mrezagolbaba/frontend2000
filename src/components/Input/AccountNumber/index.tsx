import { FormFeedback, Input } from "reactstrap";
import BanksWrapper from "components/BanksWrapper";

import accountNumber from "assets/scss/components/Input/accountNumber.module.scss";

type Props = {
  value: string;
  name: string;
  onChange?: (e: any) => void;
  id?: string | number;
  className?: string;
  disabled?: boolean;
  setBankId?: (string) => void;
  error?: any;
};

export default function AccountNumberInput({
  value,
  name,
  disabled = false,
  onChange,
  id,
  className,
  setBankId,
  error,
}: Props) {
  return (
    <div className={accountNumber["input-control"]}>
      <BanksWrapper
        type="IRR"
        value={value}
        idHandler={(id) => setBankId?.(id)}
      >
        <Input
          value={value}
          onChange={onChange}
          name={name}
          type="text"
          inputMode="numeric"
          className={`account-number-input ${className}`}
          id={`input24_${id}`}
          disabled={disabled}
          placeholder=""
          invalid={Boolean(error)}
        />
        {error && <FormFeedback>{error?.message}</FormFeedback>}
      </BanksWrapper>
    </div>
  );
}
