import { ComponentType } from "react";
import {
  useNumericFormat,
  NumberFormatBase,
  NumericFormatProps,
  InputAttributes,
} from "react-number-format";
import { Input } from "reactstrap";

const persianNumeral = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

interface CustomNumeralNumericFormatProps extends NumericFormatProps {
  // Add any additional props specific to CustomNumeralNumericFormat
}

export default function CurrencyInput(props: CustomNumeralNumericFormatProps) {
  const {
    format = (val: string) => val, // Provide a default function if not defined
    removeFormatting = (val: string) => val, // Provide a default function if not defined
    isCharacterSame = () => false, // Provide a default function if not defined
    ...rest
  } = useNumericFormat(props);

  const _format = (val: string) => {
    const _val = format(val);
    return _val.replace(/\d/g, ($1) => persianNumeral[Number($1)]);
  };

  const _removeFormatting = (val: string) => {
    const _val = val.replace(new RegExp(persianNumeral.join("|"), "g"), ($1) =>
      persianNumeral.indexOf($1).toString(),
    );

    return removeFormatting(_val);
  };

  const _isCharacterSame = (compareMeta: any) => {
    const isCharSame = isCharacterSame(compareMeta);
    const {
      formattedValue,
      currentValue,
      formattedValueIndex,
      currentValueIndex,
    } = compareMeta;
    const curChar = currentValue[currentValueIndex];
    const newChar = formattedValue[formattedValueIndex];
    const curPersianChar = persianNumeral[Number(curChar)] ?? curChar;
    const newPersianChar = persianNumeral[Number(newChar)] ?? newChar;

    return isCharSame || curPersianChar === newPersianChar; // Ensure the result is a boolean
  };

  return (
    <NumberFormatBase
      format={_format}
      removeFormatting={_removeFormatting}
      isCharacterSame={_isCharacterSame}
      customInput={Input as ComponentType<InputAttributes>}
      dir="ltr"
      {...rest}
    />
  );
}
