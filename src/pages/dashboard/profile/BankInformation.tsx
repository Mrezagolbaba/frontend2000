import { useList } from "@refinedev/core";

import Internal from "./BankInformation/Internal";
import International from "./BankInformation/International";
import { useEffect, useState } from "react";
import { useBankAccountsQuery } from "store/api/profile-management";

export default function BankInformation() {
  const [iranianAccounts, setIranianAccounts] = useState<any>([]);
  const [internationalAccounts, setInternationalAccounts] = useState<any>([]);

  const { data, isLoading, isSuccess } = useBankAccountsQuery({});

  useEffect(() => {
    if (data) {
      setIranianAccounts(() => data.filter((item) => item.iban.includes("IR")));
      setInternationalAccounts(() =>
        data.filter((item) => !item.iban?.includes("IR"))
      );
    }
  }, [data, isSuccess]);

  return (
    <>
      <Internal accounts={iranianAccounts} isLoading={isLoading} />
      <International accounts={internationalAccounts} isLoading={isLoading} />
    </>
  );
}
