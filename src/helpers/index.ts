import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import axios from "axios";
import jalaliMoment from "jalali-moment";
import moment from "jalali-moment";
import { CryptoData } from "types/exchange";
import { CurrencyCode, TransactionStatus } from "types/wallet";
import { JWT_DECODE_KEY, REF_TOKEN_OBJ_NAME } from "config";
import { isEmpty } from "lodash";
import { PhoneNumberUtil } from "google-libphonenumber";
import { StatusColors } from "types/invoice";

export function generateLabelValueArray(start: number, end: number) {
  const resultArray: { label: string; value: string }[] = [];
  for (let i = start; i <= end; i++) {
    const label = i.toString();
    resultArray.push({ label: label, value: label });
  }
  return resultArray;
}
export function generatePersianMonths() {
  const persianMonths = [
    { label: "فروردین", value: "01" },
    { label: "اردیبهشت", value: "02" },
    { label: "خرداد", value: "03" },
    { label: "تیر", value: "04" },
    { label: "مرداد", value: "05" },
    { label: "شهریور", value: "06" },
    { label: "مهر", value: "07" },
    { label: "آبان", value: "08" },
    { label: "آذر", value: "09" },
    { label: "دی", value: "10" },
    { label: "بهمن", value: "11" },
    { label: "اسفند", value: "12" },
  ];
  return persianMonths;
}

interface PhoneNumberMaskProps {
  phoneNumber: string;
}
export const PhoneNumberMask: React.FC<PhoneNumberMaskProps> = ({
  phoneNumber,
}) => {
  if (!phoneNumber) return null;

  // Extracting the prefix, masking, and suffix
  const prefix = phoneNumber.slice(0, 4);
  const masking = "****";
  const suffix = phoneNumber.slice(-3);

  // Formatted masked phone number
  const maskedPhoneNumber = `${prefix}${masking}${suffix}`;
  return maskedPhoneNumber;
};

export const ibanMAsk = (iban) => {
  const prefix = iban.slice(0, 4);
  const masking = "****";
  const suffix = iban.slice(-10);

  return `${prefix}${masking}${suffix}`;
};

export const formatPhoneNumber = (phoneNumber: string, code: string) => {
  // Remove leading zero if it exists
  const numericPhoneNumber = phoneNumber.replace(/\D/g, "");

  // Check if the phone number already starts with +code (+98)
  if (numericPhoneNumber.startsWith(code)) {
    return numericPhoneNumber; // Return as is
  }

  // Remove leading zero if it exists
  const phoneNumberWithoutZero = numericPhoneNumber.replace(/^0+/, "");

  // Add the country code +code (+98)
  const formattedPhoneNumber = `+${code}${phoneNumberWithoutZero}`;

  return formattedPhoneNumber;
};

export const persianToEnglishNumbers = (persianNumber: string) => {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const englishDigits = "0123456789";

  // Check if the input string contains any Persian digits
  const containsPersianDigits = persianNumber
    .split("")
    .some((char) => persianDigits.includes(char));

  if (!containsPersianDigits) {
    return persianNumber; // Return the original string if no Persian digits are found
  } else {
    const englishNumber = persianNumber
      .split("")
      .map((char) =>
        persianDigits.includes(char)
          ? englishDigits[persianDigits.indexOf(char)]
          : char,
      )
      .join("");

    return englishNumber;
  }
};

export const passwordListValidation = [
  {
    title: "حداقل یک عدد",
    isCheck: false,
  },
  {
    title: "حداقل 8 کاراکتر",
    isCheck: false,
  },
  {
    title: "حداقل یک کاراکتر با حرف بزرگ",
    isCheck: false,
  },
  {
    title: "حداقل یک کاراکتر با حرف کوچک",
    isCheck: false,
  },
  {
    title: "حداقل یک کاراکتر ویژه از قبیل: !@#$%^&*()-+",
    isCheck: false,
  },
];

export const isPasswordValid = (password: string) => {
  const minLength = 8;
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()\-_=+[\]{}|;:',.<>/?\\]/.test(password);

  const isValid: boolean[] = [];
  if (password.length < minLength) isValid[1] = false;
  else isValid[1] = true;

  if (!hasLowerCase) isValid[3] = false;
  else isValid[3] = true;

  if (!hasUpperCase) isValid[2] = false;
  else isValid[2] = true;

  if (!hasNumber) isValid[0] = false;
  else isValid[0] = true;

  if (!hasSpecialChar) isValid[4] = false;
  else isValid[4] = true;

  return isValid;
};
export function convertIRRToToman(number: number) {
  // 1 toman is equal to 10 rials
  const tomanAmount = Math.trunc(number) / 10;
  // Format the result to include commas for thousands
  const formattedTomanAmount = new Intl.NumberFormat("fa-IR", {
    useGrouping: true,
    style: "decimal",
  }).format(tomanAmount);

  return formattedTomanAmount;
}
export const rialToToman = (rialAmount: number | string): string => {
  // Assuming 1 Toman is equal to 10 Rials
  const tomanAmount = Math.floor(Number(rialAmount) / 10);
  return tomanAmount.toString();
};
export const convertText = (text, direction) => {
  const currencyMap = {
    enToFa: {
      USDT: "تتر",
      TRY: "لیر",
      IRR: "تومان",
      TRX: "ترون",
    },
    faToEn: {
      تتر: "USDT",
      لیر: "TRY",
      تومان: "IRR",
      ترون: "TRX",
    },
  };

  if (direction in currencyMap && text in currencyMap[direction]) {
    return currencyMap[direction][text];
  }
  return text;
};
export const convertTextSingle = (text) => {
  const currencyMap = {
    enToFa: {
      USDT: "تتر",
      TRY: "لیر",
      IRR: "تومان",
      TRX: "ترون",
    },
    faToEn: {
      تتر: "USDT",
      لیر: "TRY",
      تومان: "IRR",
      ترون: "TRX",
    },
  };

  if (text in currencyMap["enToFa"]) {
    return currencyMap["enToFa"][text];
  }
  return text;
};
export function extractLeftSide(baseString) {
  return baseString.includes("/") ? baseString.split("/")[0] : baseString;
}
export const LabeLText = {
  EMAIL: "ایمیل",
  PHONE: "تلفن همراه",
  AUTHENTICATOR: "google Authenticator",
};
export const LabeLTextTransaction = {
  DARAFT: "ناموفق",
  SUCCESSFUL: "موفق",
};

export function getDate18YearsAgo(): {
  year: number;
  month: number;
  day: number;
} {
  const currentDate: Date = new Date();
  const eighteenYearsAgo: Date = new Date(currentDate);
  eighteenYearsAgo.setFullYear(currentDate.getFullYear() - 18);

  const jalaliDate18YearsAgo = jalaliMoment(eighteenYearsAgo);

  const year18YearsAgo: number = jalaliDate18YearsAgo.jYear();
  const month18YearsAgo: number = jalaliDate18YearsAgo.jMonth() + 1;
  const date18YearsAgo: number = jalaliDate18YearsAgo.jDate();

  return { year: year18YearsAgo, month: month18YearsAgo, day: date18YearsAgo };
}
export function convertPersianToGregorian(persianDate: string): string {
  const gregorianDate = moment(persianDate, "jYYYY/jMM/jDD").format(
    "YYYY-MM-DD",
  );
  return gregorianDate;
}
export function maskingString(str, start, end) {
  if (
    !str ||
    start < 0 ||
    start >= str.length ||
    end < 0 ||
    end > str.length ||
    start >= end
  ) {
    return str;
  }
  const maskLength = end - start;
  const maskedStr =
    str.substring(0, start) + "*".repeat(maskLength) + str.substring(end);
  return maskedStr;
}

export function getTitlePage(path: string) {
  const pages = [
    { path: "/", name: "آرسونیکس - همراه ارز دیجیتال شما" },
    { path: "/coins", name: "قیمت لحظه‌ای ارز و ارز دیجیتال - آرسونیکس" },
    { path: "/about-us", name: "درباره ما - آرسونیکس" },
    { path: "/contact-us", name: "تماس با ما - آرسونیکس" },
    { path: "/terms", name: "قوانین و مقررات - آرسونیکس" },
    { path: "/dashboard", name: "داشبورد کاربری - آرسونیکس" },
    { path: "/dashboard/profile", name: "پروفایل کاربری - آرسونیکس" },
    { path: "/dashboard/exchange", name: "معامله سریع - آرسونیکس" },
    { path: "/dashboard/wallet", name: "کیف پول - آرسونیکس" },
    { path: "/dashboard/setting", name: "تنظیمات - آرسونیکس" },
    { path: "/dashboard/market", name: "بازارها - آرسونیکس" },
    { path: "/dashboard/orders", name: "سفارشات - آرسونیکس" },
    { path: "/dashboard/history", name: "تاریخچه - آرسونیکس" },
    { path: "/dashboard/support", name: "پشتیبانی - آرسونیکس" },
    { path: "/dashboard/add-friends", name: "دعوت از دوستان - آرسونیکس" },
    { path: "/dashboard/payment-receipt", name: "وضعیت پرداخت - آرسونیکس" },
    {
      path: "/dashboard/debit-subscription-finished",
      name: "وضعیت اتصال - آرسونیکس",
    },
    { path: "/login", name: "آرسونیکس - ورود به حساب کاربری" },
    { path: "/register", name: "آرسونیکس - ثبت نام" },
    { path: "/forget-password", name: "آرسونیکس - فراموشی رمز عبور" },
    { path: "/information", name: "آرسونیکس - احراز هویت" },
    { path: "/404", name: "صفحه مورد نظر یافت نشد - آرسونیکس" },
  ];

  const findTitle = pages.find((page) => page.path === path);

  if (findTitle) return findTitle.name;
  else return "آرسونیکس";
}
export const convertStatus = (value: TransactionStatus) => {
  switch (value) {
    case "INITIATED":
      return "ایجاد شده";
    case "PROCESSING":
      return "در حال پردازش";
    case "SUCCESSFUL":
      return "موفق";
    case "REFUND":
      return "بازگشت";
    case "FAILED":
      return "ناموفق";
    case "EXPIRED":
      return "تمام شده";
    case "CANCELED":
      return "لغو شده";
    case "DRAFT":
    default:
      return "پیش نویس";
  }
};
export const convertCoins = (value) => {
  switch (value) {
    case "USDT":
      return "تتر";
    case "TRX":
      return "ترون";
    case "TRY":
      return "لیر ترکیه";
    case "IRR":
    default:
      return "تومان";
  }
};

/***********
 *  this function generate amounts and prices with separator and set decimals with according currencies
 * currency list for now >> "IRR" , "TRY" , "USDT" , "TRX"
 ***********/
export const normalizeAmount = (
  amount: string,
  currency: CurrencyCode,
  isShowCurrency: boolean,
) => {
  if (!amount || isEmpty(amount)) return "0";
  const everChar = 3;
  const insertChar = ",";
  const indexDot =
    amount?.indexOf(".") > 0 ? amount.indexOf(".") : amount.length;
  let newAmount = "",
    intPart = "";
  if (currency === "IRR") {
    newAmount = amount.substring(0, indexDot - 1);
  } else newAmount = amount.substring(0, indexDot);
  for (let i = newAmount.length; i > 0; i -= everChar) {
    const slice = newAmount.substring(i - everChar, i);
    if (i !== newAmount.length && slice.length <= everChar)
      intPart = slice.concat(insertChar, intPart);
    else intPart = slice.concat(intPart);
  }

  if (isEmpty(intPart)) intPart = "0";

  switch (currency) {
    case "USDT":
    case "TRX": {
      let decimalPart = amount.substring(indexDot, indexDot + 7);
      if (decimalPart === ".000000") decimalPart = "";
      if (isShowCurrency) return `${intPart + decimalPart} تتر`;
      else return intPart + decimalPart;
    }
    case "TRY": {
      let decimalPart = amount.substring(indexDot, indexDot + 3);
      if (decimalPart === ".00") decimalPart = "";
      if (isShowCurrency) return `${intPart + decimalPart} لیر`;
      else return intPart + decimalPart;
    }
    case "IRR":
    default: {
      if (isShowCurrency) return `${intPart} تومان`;
      else return intPart;
    }
  }
};

export const getEncryptedObject = (data: string) => {
  try {
    return CryptoJS.DES.encrypt(data, JWT_DECODE_KEY).toString();
  } catch (e) {
    return null;
  }
};
export const getDecryptedObject = (data: string) => {
  try {
    return CryptoJS.DES.decrypt(data, JWT_DECODE_KEY).toString();
  } catch (e) {
    return null;
  }
};

export const setRefToken = (refreshToken: string, expiredAt: string) => {
  if (window && refreshToken != null) {
    Cookies.set(REF_TOKEN_OBJ_NAME, refreshToken, {
      expiredAt: expiredAt,
      secure: true,
    });
  }
};
export const getRefToken = () => Cookies.get(REF_TOKEN_OBJ_NAME);

export const removeRefToken = () => Cookies.remove(REF_TOKEN_OBJ_NAME);

export async function get24hChanges(
  ids: string[],
  vsCurrency: string = "usd",
): Promise<CryptoData[] | null> {
  try {
    const url = "https://api.coingecko.com/api/v3/coins/markets";
    const params = {
      ids: ids.join(","),
      vs_currency: vsCurrency,
      price_change_percentage: "24h",
    };
    const response = await axios.get(url, { params });
    if (response.status === 200) {
      return response.data;
    } else {
      console.error(`Error: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
const phoneUtil = PhoneNumberUtil.getInstance();

export const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

export const renderStatus = (
  status: TransactionStatus,
): { badgeName: StatusColors; label: string } => {
  switch (status) {
    case "SUCCESSFUL":
      return { badgeName: "success", label: "موفق" };

    case "FAILED":
    case "CANCELED":
    case "EXPIRED":
      return { badgeName: "danger", label: "ناموفق" };

    case "PROCESSING":
    case "INITIATED":
      return { badgeName: "info", label: "در حال پردازش" };
    case "REFUND":
      return { badgeName: "warning", label: "عودت" };
    case "WAITED_TO_BE_WITHDREW":
      return { badgeName: "info", label: "در حال بررسی" };
    case "DRAFT":
    default:
      return { badgeName: "dark", label: "پیش نویس" };
  }
};
