import { persianToEnglishNumbers } from "helpers";
import { iranianBanks } from "./iranian-banks";

export function searchIranianBanks(query: string) {
  const headAccountNumber = query.slice(0, 6);
  const entity = iranianBanks.filter(
    (bank) => bank.code === persianToEnglishNumbers(headAccountNumber)
  );

  return entity[0] || null;
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
