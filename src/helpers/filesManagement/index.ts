import { persianToEnglishNumbers } from "helpers";
import { iranianBanks, turkishBanks } from "./banksList";
import request from "services/adapter";

export type BankType = {
  code: string;
  bankId?: Promise<string>;
  name: string;
  logo: string;
  persianName: string;
};

async function getBankId(name: string, type: "TRY" | "IRR"): Promise<string> {
  const res = await request.get(`/banks?filter=currencyCode||$eq||${type}`);
  const resultId = res.data.find((item) => item.name === name).id;

  return resultId;
}

export function searchIranianBanks(query: string) {
  const headAccountNumber = query.slice(0, 6);
  const entity = iranianBanks.filter(
    (bank) => bank.code === persianToEnglishNumbers(headAccountNumber)
  );
  const id = getBankId(entity[0].name, "IRR");

  return { bankId: id, ...entity[0] } || null;
}

export function searchTurkishBanks(
  query: string,
  isSearchId: boolean | undefined = true
): BankType {
  const headAccountNumber = query.slice(2, 7);
  const entity = turkishBanks.filter(
    (bank) =>
      Number(bank.code) === Number(persianToEnglishNumbers(headAccountNumber))
  );
  if (isSearchId && entity) {
    const id = getBankId(entity[0]?.name, "TRY");

    return { bankId: id, ...entity[0] } || null;
  } else return entity[0] || null;
}

export function formatShowAccount(accountNumber: string) {
  const n = 4; // insert a character after every 5 characters
  const insertChar = "-";
  let outputString = "";
  for (let i = 0; i < accountNumber.length; i = i + n) {
    const slice = accountNumber.slice(i, i + n);

    if (i < accountNumber.length - 4)
      outputString = outputString.concat(slice, insertChar);
    else outputString = outputString.concat(slice);
  }

  return outputString;
}

