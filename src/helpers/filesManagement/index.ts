import { persianToEnglishNumbers } from "helpers";
import { iranianBanks, turkishBanks } from "./banksList";
import { BanksResponse } from "types/profile";
import { isEmpty } from "lodash";

export function searchIranianBanks(
  query: string,
  banks?: BanksResponse[] | undefined,
) {
  const headAccountNumber = query.slice(0, 6);

  

  let findBank: BanksResponse[] | [] = [];
  if (!isEmpty(headAccountNumber) && banks) {
    findBank = banks.filter(
      (bank) => bank?.meta.codes.find((code) => code === headAccountNumber),
    );
  }
  const entity = iranianBanks.filter(
    (bank) => bank.code === persianToEnglishNumbers(headAccountNumber),
  );

  if (findBank && findBank.length > 0)
    return { bankId: findBank[0]?.id, logo: entity[0]?.logo } || null;
  else return { bankId: "", logo: entity[0]?.logo };
}

export function searchTurkishBanks(
  query: string,
  banks: BanksResponse[] | undefined,
  isSearchId: boolean | undefined = true,
) {
  let headAccountNumber = query.slice(4, 7);
  if (query.includes("TR")) {
    headAccountNumber = query.slice(6, 9);
  }

  let findBank: BanksResponse[] | [] = [];
  if (!isEmpty(query) && banks) {
    findBank = banks.filter(
      (bank) =>
        bank?.meta.codes.find(
          (code) => Number(code) === Number(headAccountNumber),
        ),
    );
  }

  const entity = turkishBanks.filter(
    (bank) =>
      Number(bank.code) === Number(persianToEnglishNumbers(headAccountNumber)),
  );

  return { bankId: findBank[0]?.id, logo: entity[0].logo } || null;
}

export function formatShowAccount(accountNumber: string) {
  const n = 4; // insert a character after every 5 characters
  const insertChar = " ";
  let outputString = "";
  for (let i = 0; i < accountNumber.length; i = i + n) {
    const slice = accountNumber.slice(i, i + n);

    if (i < accountNumber.length - 4)
      outputString = outputString.concat(slice, insertChar);
    else outputString = outputString.concat(slice);
  }

  return outputString;
}

export function searchTurkishBanks(query: string) {
  const headAccountNumber = query.slice(2, 7);
  const entity = turkishBanks.filter(
    (bank) =>
      Number(bank.code) === Number(persianToEnglishNumbers(headAccountNumber))
  );

  return entity[0] || null;
}
