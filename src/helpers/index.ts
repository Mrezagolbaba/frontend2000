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
  }
  // Add more countries as needed
];
