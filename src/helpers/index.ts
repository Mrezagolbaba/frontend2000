export function generateLabelValueArray(start: number, end: number) {
  const resultArray = [];
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
  console.log(phoneNumber);
  if (!phoneNumber) return null;

  // Extracting the prefix, masking, and suffix
  const prefix = phoneNumber.slice(0, 4);
  const masking = "****";
  const suffix = phoneNumber.slice(-3);

  // Formatted masked phone number
  const maskedPhoneNumber = `${prefix}${masking}${suffix}`;
  console.log(maskedPhoneNumber);
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
