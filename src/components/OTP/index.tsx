import React, {
  useState,
  useRef,
  ChangeEvent,
  ClipboardEvent,
  KeyboardEvent,
} from "react";

import otp from "./otp.module.scss";

function OtpInput({ onChange }: OtpInputProps) {
  const [otpValues, setOtpValues] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const otpInputs = useRef<HTMLInputElement[]>([]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[0];
    }

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;

    setOtpValues(newOtpValues);

    if (value === "" && index > 0) {
      otpInputs.current[index - 1].focus();
    } else if (index < otpInputs.current.length - 1) {
      otpInputs.current[index + 1].focus();
    }

    const code = newOtpValues.join("");
    onChange(code);
  };

  const handleInputPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    if (pastedData.length <= otpValues.length) {
      const newOtpValues = pastedData.split("").slice(0, otpValues.length);
      setOtpValues(newOtpValues);

      for (let i = 0; i < newOtpValues.length; i++) {
        otpInputs.current[i].value = newOtpValues[i];
      }

      if (newOtpValues.length > 0) {
        otpInputs.current[newOtpValues.length - 1].focus();
      }
    }
  };

  const handleInputKeyDown = (
    index: number,
    e: KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && index > 0 && otpValues[index] === "") {
      const newOtpValues = [...otpValues];
      newOtpValues[index - 1] = "";
      setOtpValues(newOtpValues);
      otpInputs.current[index - 1].focus();
    }
  };

  return (
    <div className={otp.wrapper}>
      {otpValues.map((value, index) => (
        <input
          key={index}
          className="form-control control-auto-focus"
          type="text"
          maxLength={1}
          ref={(input) => (otpInputs.current[index] = input!)}
          value={value}
          onChange={(e) => handleInputChange(index, e.target.value)}
          onPaste={handleInputPaste}
          onKeyDown={(e) => handleInputKeyDown(index, e)}
        />
      ))}
    </div>
  );
}

export default OtpInput;
