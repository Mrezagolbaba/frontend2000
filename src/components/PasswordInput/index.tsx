import FloatInput from "components/Input/FloatInput";
import React, { useState } from "react";
import { FieldErrors, RefCallBack } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { CiLock } from "react-icons/ci";

import "./style.sass";

interface Props {
  onChange: (...event: any[]) => void;
  onBlur: (...event: any[]) => void;
  value: string;
  name: string;
  ref: RefCallBack;
  errors?: FieldErrors;
}

const PasswordInput = ({ name, value, ref, onChange, errors }: Props) => {
  const [hasShowPass, setHasShowPass] = useState<boolean>(false);

  return (
    <FloatInput
      type={hasShowPass ? "text" : "password"}
      name={name}
      value={value}
      label="رمز عبور"
      onChange={onChange}
      inputProps={{
        ref: ref,
        size: "large",
        prefix: <CiLock />,
        suffix: !hasShowPass ? (
          <BsEye
            onClick={() => setHasShowPass(true)}
            className="show-password"
          />
        ) : (
          <BsEyeSlash
            onClick={() => setHasShowPass(false)}
            className="show-password"
          />
        ),
        status: errors?.[name]?.message ? "error" : undefined,
      }}
    />
  );
};

export default PasswordInput;
