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
  }

  const englishNumber = persianNumber
    .split("")
    .map((char) =>
      persianDigits.includes(char)
        ? englishDigits[persianDigits.indexOf(char)]
        : char
    )
    .join("");

  return englishNumber;
};

export const passwordListValidation = [
  {
    title: "حداقل یک کاراکتر ویژه از قبیل: !@#$%^&*()-+",
    isCheck: false,
  },
  {
    title: "حداقل یک کاراکتر با حرف کوچک",
    isCheck: true,
  },
  {
    title: "حداقل یک کاراکتر با حرف بزرگ",
    isCheck: false,
  },
  {
    title: "حداقل 8 کاراکتر",
    isCheck: true,
  },

  {
    title: "حداقل یک عدد",
    isCheck: true,
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
   const tomanAmount = Math.trunc( number ) / 10;
   // Format the result to include commas for thousands
   const formattedTomanAmount = new Intl.NumberFormat('fa-IR', {
    useGrouping: true,
    style: 'decimal'
  }).format(tomanAmount);
 
   return formattedTomanAmount;
}
export const rialToToman = (rialAmount: number | string): number => {
  // Assuming 1 Toman is equal to 10 Rials
  const tomanAmount = Math.floor(Number(rialAmount) / 10);
  return tomanAmount;
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
    'enToFa': {
      'USDT': 'تتر',
      'TRY': 'لیر',
      'IRR': 'تومان',
      'TRX': 'ترون',
    },
    'faToEn': {
      'تتر': 'USDT',
      'لیر': 'TRY',
      'تومان': 'IRR',
      'ترون': 'TRX',
    },
  };

  if (text in currencyMap['enToFa']) {
    return currencyMap['enToFa'][text];
  }
  return text;
};
export function extractLeftSide(baseString) {
  return baseString.includes("/") ? baseString.split("/")[0] : baseString;
}

      
