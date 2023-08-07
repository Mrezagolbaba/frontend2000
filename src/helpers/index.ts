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
    { label: 'فروردین', value: '01' },
    { label: 'اردیبهشت', value: '02' },
    { label: 'خرداد', value: '03' },
    { label: 'تیر', value: '04' },
    { label: 'مرداد', value: '05' },
    { label: 'شهریور', value: '06' },
    { label: 'مهر', value: '07' },
    { label: 'آبان', value: '08' },
    { label: 'آذر', value: '09' },
    { label: 'دی', value: '10' },
    { label: 'بهمن', value: '11' },
    { label: 'اسفند', value: '12' },
  ];
  return persianMonths;
}

export const countries = [
  // {
  //   label: '🇺🇸 +1',
  //   value: '+1',
  // },
  {
    // code: 'United Kingdom',
    label: `🇬🇧        +44`,
    value: '+44',
  },
  {
    value: '+61',
    label: `🇦🇺      +61`,
  },
  {

    value: '+1',
    label: '🇨🇦 +1',
  },
  {
    value: '+98',
    label: '🇮🇷 +98',
  },
  {
    value: '+90',
    label: '🇹🇷 +90',
  }
  // Add more countries as needed
];
interface PhoneNumberMaskProps {
  phoneNumber: string;
}
export const PhoneNumberMask: React.FC<PhoneNumberMaskProps> = ({ phoneNumber }) => {
  console.log(phoneNumber);
  if (!phoneNumber) return null;

  // Extracting the prefix, masking, and suffix
  const prefix = phoneNumber.slice(0, 4);
  const masking = '****';
  const suffix = phoneNumber.slice(-3);

  // Formatted masked phone number
  const maskedPhoneNumber = `${prefix}${masking}${suffix}`;
  console.log(maskedPhoneNumber);
  return maskedPhoneNumber;
};
