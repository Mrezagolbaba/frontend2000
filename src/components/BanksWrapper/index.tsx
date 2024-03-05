import { ReactElement, useEffect, useState } from "react";
import { useBanksQuery } from "store/api/profile-management";

import arsonexMark from "assets/img/icons/bankDefault.svg";
import { BanksResponse } from "types/profile";
import { iranianBanks, turkishBanks } from "helpers/filesManagement/banksList";
import { persianToEnglishNumbers } from "helpers";
import { isEmpty } from "lodash";

type Props = {
  children: ReactElement | ReactElement[];
  type: "IRR" | "TRY";
  iconClassName?: string;
  value: string;
  isSheba?: boolean;
  idHandler?: (string) => void;
};

export default function BanksWrapper({
  children,
  value,
  type,
  iconClassName,
  isSheba = false,
  idHandler,
}: Props) {
  const [logo, setLogo] = useState(arsonexMark);
  const { data: banks, isSuccess } = useBanksQuery({
    filters: `currencyCode||$eq||${type}`,
  });

  //turkish-banks
  const searchTurkishBanks = (query, bankList) => {
    if (!query || query?.length <= 0) return null;
    let findBank: BanksResponse[] | [] = [];
    let headAccountNumber = query.slice(4, 7);
    if (query.includes("TR")) {
      headAccountNumber = persianToEnglishNumbers(query).slice(6, 9);
    }

    findBank = bankList.filter((bank) =>
      bank?.meta.codes.find(
        (code) => Number(code) === Number(headAccountNumber),
      ),
    );

    const entity = turkishBanks.filter(
      (bank) =>
        Number(bank.code) ===
        Number(persianToEnglishNumbers(headAccountNumber)),
    );

    return { bankId: findBank[0]?.id, logo: entity[0]?.logo } || null;
  };

  //iranian-banks-with-card-number
  const searchIranianBanks = (query, bankList) => {
    if (!query || query?.length <= 0) return null;
    const headAccountNumber = persianToEnglishNumbers(query).slice(0, 6);
    let findBank: BanksResponse[] | [] = [];

    if (isEmpty(headAccountNumber)) return null;
    else if (!isEmpty(headAccountNumber) && bankList)
      findBank = bankList.filter((bank) =>
        bank?.meta.codes.find((code) => code === headAccountNumber),
      );

    const entity = iranianBanks.filter(
      (bank) => bank.code === persianToEnglishNumbers(headAccountNumber),
    );

    if (findBank && findBank.length > 0)
      return { bankId: findBank[0]?.id, logo: entity[0]?.logo } || null;
    else return { bankId: "", logo: entity[0]?.logo };
  };
  const searchIranianBanksWithSheba = (query, bankList) => {
    let findBank: BanksResponse[] | [] = [];
    let headAccountNumber = persianToEnglishNumbers(query).slice(4, 6);
    if (query.includes("IR")) {
      headAccountNumber = persianToEnglishNumbers(query).slice(5, 7);
    }

    findBank = bankList.filter((bank) =>
      bank?.meta.codes.find(
        (code) => Number(code) === Number(headAccountNumber),
      ),
    );
    const entity = iranianBanks.filter(
      (bank) =>
        Number(bank.sheba) ===
        Number(persianToEnglishNumbers(headAccountNumber)),
    );

    return { bankId: findBank[0]?.id, logo: entity[0]?.logo } || null;
  };

  useEffect(() => {
    if (isSuccess) {
      if (type === "TRY") {
        const result = searchTurkishBanks(value, banks);
        result && result.logo && setLogo(result.logo);
        result && result.bankId && idHandler?.(result.bankId);
      } else if (type === "IRR" && !isSheba) {
        const result = searchIranianBanks(value, banks);

        result && result.logo && setLogo(result.logo);
        result && result.bankId && idHandler?.(result.bankId);
      } else if (type === "IRR" && isSheba) {
        const result = searchIranianBanksWithSheba(value, banks);

        result && result.logo && setLogo(result.logo);
        result && result.bankId && idHandler?.(result.bankId);
      }
    } else setLogo(arsonexMark);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [banks, value, isSuccess, type, isSheba]);

  return (
    <>
      <span className={iconClassName}>
        <img src={logo} alt="card" />
      </span>
      {children}
    </>
  );
}
