import numbro from 'numbro';

export function formatNumber(number, locale = 'fa-IR') {
  number = typeof number === 'undefined' || !number ? 0 : number;

  numbro.setLanguage(locale);

  return numbro?.(number)?.format({ thousandSeparated: true });
}

export function unformatNumber(string, locale = 'fa-IR') {
  numbro.setLanguage(locale);

  return numbro?.unformat(string);
}
