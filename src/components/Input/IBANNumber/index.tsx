import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "reactstrap";
import style from "assets/scss/components/Input/ibanNumber.module.scss";
import { searchTurkishBanks } from "helpers/filesManagement";
import arsonexMark from "assets/img/icons/bankDefault.svg";
import { useBanksQuery } from "store/api/profile-management";
type Props = {
  name: string;
  value: string;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  setBankId?: (string) => void;
};

export default function IBANNumber({
  name,
  value,
  onChange,
  disabled = false,
  className,
  setBankId,
}: Props) {
  const [logo, setLogo] = useState<string>(arsonexMark);

  const { data: banks, isSuccess } = useBanksQuery({
    filters: "currencyCode||$eq||TRY",
  });

  useEffect(() => {
    if (value?.length >= 6) {
      const result = searchTurkishBanks(value, banks);
      if (result) {
        setLogo(result.logo);
        setBankId?.(result.bankId);
      } else setLogo(arsonexMark);
    } else setLogo(arsonexMark);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (
      (value.length >= 7 && !value.includes("TR")) ||
      (value.includes("TR") && value.length >= 9)
    ) {
      const result = searchTurkishBanks(value, banks);
      if (result) {
        setLogo(result.logo);
        setBankId?.(result.bankId);
      } else setLogo(arsonexMark);
    } else setLogo(arsonexMark);
    onChange?.(e);
  };
  return (
    <div className={style["iban-input-control"]}>
      {logo === arsonexMark ? (
        <img src={arsonexMark} alt="card" />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: logo }} />
      )}
      <span>TR</span>
      <Input
        value={value}
        onChange={handleChange}
        name={name}
        type="text"
        className={`account-number-input ${className}`}
        id={`ibanNumber-${name}`}
        disabled={disabled}
        placeholder=""
      />
    </div>
  );
}
