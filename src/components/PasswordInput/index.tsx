import FloatInput from "components/Input/FloatInput";
import React, { useState } from "react";
import { FieldErrors, RefCallBack } from "react-hook-form";
import {
  BsCheckCircle,
  BsExclamationCircle,
  BsEye,
  BsEyeSlash,
} from "react-icons/bs";
import { CiLock } from "react-icons/ci";

import "./style.sass";
import { List } from "antd";
import { isPasswordValid, passwordListValidation } from "helpers";

interface Props {
  onChange: (...event: any[]) => void;
  onBlur: (...event: any[]) => void;
  value: string;
  name: string;
  ref: RefCallBack;
  errors?: FieldErrors;
  hasShowHint?: boolean;
}

const PasswordInput = ({
  name,
  value,
  ref,
  onChange,
  errors,
  hasShowHint = false,
}: Props) => {
  const [passValid, setPassValid] = useState<boolean[] | []>([]);
  const [hasShowPass, setHasShowPass] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (hasShowHint) setPassValid(() => isPasswordValid(e.target.value));
    onChange?.(e);
  };

  return (
    <>
      <FloatInput
        type={hasShowPass ? "text" : "password"}
        name={name}
        value={value}
        label="رمز عبور"
        onChange={handleChange}
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
      {hasShowHint && (
        <List
          className="password-validation-check"
          itemLayout="horizontal"
          dataSource={passwordListValidation}
          renderItem={(item, index: number) => (
            <List.Item key={index}>
              <List.Item.Meta
                className={passValid[index] ? "check" : "unCheck"}
                avatar={
                  passValid[index] ? <BsCheckCircle /> : <BsExclamationCircle />
                }
                title={item.title}
              />
            </List.Item>
          )}
        />
      )}
    </>
  );
};

export default PasswordInput;
