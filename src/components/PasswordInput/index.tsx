import FloatInput from "components/Input/FloatInput";
import React, { useState } from "react";
import { FieldErrors } from "react-hook-form";
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
  value: string;
  name: string;
  errors?: FieldErrors;
  hasShowHint?: boolean;
  label?: string;
}

const PasswordInput = ({
  name,
  value,
  onChange,
  errors,
  hasShowHint = false,
  label = "رمز عبور",
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
        // label={label}
        label={label}
        onChange={handleChange}
        inputProps={{
          size: "large",
          prefix: (
            <svg
              width="15"
              height="18"
              viewBox="0 0 15 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.6862 6.87272V5.08355C11.6862 2.98939 9.98783 1.29105 7.89366 1.29105C5.79949 1.28189 4.09449 2.97189 4.08533 5.06689V5.08355V6.87272"
                stroke="#03041B"
                strokeOpacity="0.4"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.0694 16.7067H4.70187C2.95687 16.7067 1.54187 15.2925 1.54187 13.5467V9.9725C1.54187 8.22667 2.95687 6.8125 4.70187 6.8125H11.0694C12.8144 6.8125 14.2294 8.22667 14.2294 9.9725V13.5467C14.2294 15.2925 12.8144 16.7067 11.0694 16.7067Z"
                stroke="#03041B"
                strokeOpacity="0.4"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M7.88578 10.8359V12.6868"
                stroke="#03041B"
                strokeOpacity="0.4"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          ),
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
