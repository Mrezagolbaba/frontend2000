import numbro from 'numbro';
import _ from 'lodash';

export function formatNumber(number, locale = 'fa-IR') {
  number =
    typeof number === 'undefined' || !number
      ? 0
      : typeof number === 'string'
        ? Number(number)
        : number;

  numbro.setLanguage(locale);

  return numbro?.(number)?.format({ thousandSeparated: true });
}

export function unformatNumber(string, locale = 'fa-IR') {
  numbro.setLanguage(locale);

  return numbro?.unformat(string);
}

/***********
 *  this function generate amounts and prices with separator and set decimals with according currencies
 * currency list for now >> "IRR" , "TRY" , "USDT" , "TRX"
 ***********/
export const normalizeAmount = (
  amount,
  currency,
  isShowCurrency,
  isFormat = true,
) => {
  if (!amount || _.isEmpty(amount)) return '0';
  const everChar = 3;
  const insertChar = ',';
  const indexDot =
    amount?.indexOf('.') > 0 ? amount.indexOf('.') : amount.length;
  let newAmount = '',
    intPart = '';
  if (currency === 'IRR') {
    newAmount = amount.substring(0, indexDot - 1);
  } else newAmount = amount.substring(0, indexDot);
  for (let i = newAmount.length; i > 0; i -= everChar) {
    const slice = newAmount.substring(i - everChar, i);
    if (i !== newAmount.length && slice.length <= everChar)
      intPart = slice.concat(insertChar, intPart);
    else intPart = slice.concat(intPart);
  }

  if (_.isEmpty(intPart)) intPart = '0';

  switch (currency) {
    case 'USDT':
    case 'TRX': {
      let decimalPart = isFormat
        ? amount.substring(indexDot, indexDot + 7)
        : amount.substring(indexDot, amount.length);
      if (decimalPart === '.000000') decimalPart = '';
      if (isShowCurrency) return `${intPart + decimalPart} تتر`;
      else return intPart + decimalPart;
    }
    case 'TRY': {
      let decimalPart = isFormat
        ? amount.substring(indexDot, indexDot + 3)
        : amount.substring(indexDot, amount.length);
      if (decimalPart === '.00') decimalPart = '';
      if (isShowCurrency) return `${intPart + decimalPart} لیر`;
      else return intPart + decimalPart;
    }
    case 'IRR':
    default: {
      const decimalPart = isFormat
        ? ''
        : `.${amount.substring(indexDot - 1, amount.length).replace('.', '')}`;
      if (isShowCurrency) return `${intPart + decimalPart} تومان`;
      else return intPart + decimalPart;
    }
  }
};
