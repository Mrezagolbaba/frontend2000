import { useList } from "@refinedev/core";

import Internal from "./BankInformation/Internal";
import International from "./BankInformation/International";

export default function BankInformation() {
  const { data, isSuccess, isLoading } = useList({
    resource: `bank-accounts`,
  });

  console.log(data);

  return (
    <>
      <Internal />
      <International />
    </>
  );
}
