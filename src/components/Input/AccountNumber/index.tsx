import { useEffect, useState } from "react";
import { Input } from "reactstrap";

import accountNumber from "assets/scss/components/Input/accountNumber.module.scss";
import { searchIranianBanks } from "helpers/filesManagement";
import arsonexMark from "assets/img/icons/bankDefault.svg";
import { useBanksQuery } from "store/api/profile-management";
import { persianToEnglishNumbers } from "helpers";

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
  const [logo, setLogo] = useState<string>(arsonexMark);
  const { data: banks, isSuccess } = useBanksQuery({
    filters: "currencyCode||$eq||IRR",
  });

  useEffect(() => {
    if (value?.length >= 6) {
      const result = searchIranianBanks(persianToEnglishNumbers(value), banks);
      if (result) {
        setLogo(result.logo);
        setBankId?.(result.bankId);
      } else setLogo(arsonexMark);
    } else setLogo(arsonexMark);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const handleChange = (e) => {
    const value = e.target.value;
    if (value?.length >= 6) {
      const result = searchIranianBanks(persianToEnglishNumbers(value), banks);
      console.log("result", result);

      if (result) {
        setLogo(result.logo);
        setBankId?.(result.bankId);
      } else setLogo(arsonexMark);
    } else if (value?.length < 6) setLogo(arsonexMark);
    onChange?.(e);
  };

  return (
    <div className={accountNumber["input-control"]}>
      {logo === arsonexMark ? (
        <img src={arsonexMark} alt="card" />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: logo }} />
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
