import { JWT_DECODE_KEY, REF_TOKEN_OBJ_NAME, REF_TOKEN_OBJ_TIME } from "config";
import moment from "jalali-moment";
import jalaliMoment from "jalali-moment";
import { isEmpty } from "lodash";
import { CurrencyCode, TransactionStatus } from "types/wallet";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

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
    isCheck: true,
  },
  {
    title: "حداقل 8 کاراکتر",
    isCheck: true,
  },
  {
    title: "حداقل یک کاراکتر با حرف بزرگ",
    isCheck: false,
  },
  {
    title: "حداقل یک کاراکتر با حرف کوچک",
    isCheck: true,
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
  if (password.length < minLength) isValid[0] = false;
  else isValid[0] = true;

  if (!hasLowerCase) isValid[1] = false;
  else isValid[1] = true;

  if (!hasUpperCase) isValid[2] = false;
  else isValid[2] = true;

  if (!hasNumber) isValid[3] = false;
  else isValid[3] = true;

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
    { path: "/dashboard/exchange", name: "خرید و فروش سریع - آرسونیکس" },
    { path: "/dashboard/wallet", name: "کیف پول - آرسونیکس" },
    { path: "/dashboard/setting", name: "تنظیمات - آرسونیکس" },
    { path: "/dashboard/market", name: "بازارها - آرسونیکس" },
    { path: "/dashboard/orders", name: "سفارشات - آرسونیکس" },
    { path: "/dashboards/history", name: "تاریخچه - آرسونیکس" },
    { path: "/dashboard/support", name: "پشتیبانی - آرسونیکس" },
    { path: "/login", name: "آرسونیکس - ورود به حساب کاربری" },
    { path: "/register", name: "آرسونیکس - ثبت نام" },
    { path: "/forget-password", name: "آرسونیکس - فراموشی رمز عبور" },
    { path: "/information", name: "آرسونیکس - احراز هویت" },
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

type CurrencyProps = {
  value: string;
  currency?: CurrencyCode;
  justFix?: boolean;
};

export const tomanShow = ({
  value,
  currency,
  justFix = false,
}: CurrencyProps): string => {
  const intValue = parseInt(value);
  const newValue = (intValue / 10).toFixed(0);
  if (Number.isNaN(intValue) || newValue === "NaN") {
    return "0";
  }
  if (justFix) return (Math.round(intValue * 100) / 1000).toFixed(0);
  else if (!isEmpty(currency))
    return `${Number(newValue).toLocaleString("IRR")} ${convertText(currency, "enToFa")}`;
  else return Number(newValue).toLocaleString("IRR");
};

export const lirShow = ({
  value,
  currency,
  justFix = false,
}: CurrencyProps): string => {
  const intValue = Number(value);
  const newValue = intValue.toFixed(2);
  if (Number.isNaN(intValue) || newValue === "NaN") {
    return "0";
  }
  if (justFix) return (Math.round(intValue * 100) / 100).toFixed(2);
  else if (!isEmpty(currency))
    return `${Number(newValue).toLocaleString("IRR")} ${convertText(currency, "enToFa")}`;
  else return Number(newValue).toLocaleString("IRR");
};

export const coinShow = (value: string, currency?: CurrencyCode): string => {
  const newValue = Number(value).toFixed(6);

  if (Number.isNaN(newValue) || newValue == "NaN") {
    return "0";
  }
  if (!isEmpty(currency))
    return `${Number(newValue).toLocaleString("IRR")} ${convertText(currency, "enToFa")}`;

  return Number(newValue).toLocaleString("IRR");
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
  const hashedTokenString = getEncryptedObject(refreshToken);
  if (window && hashedTokenString != null) {
    Cookies.set(REF_TOKEN_OBJ_NAME, hashedTokenString, {
      expiredAt: expiredAt,
      secure: true,
    });
  }
};
export const getRefToken = () =>
  getDecryptedObject(Cookies.get(REF_TOKEN_OBJ_NAME));

export const removeRefToken = () => Cookies.remove(REF_TOKEN_OBJ_NAME);
