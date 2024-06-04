import CheckIcon from "components/Icons/CheckIcon";
import ExclamationIcon from "components/Icons/ExclamationIcon";
import EyeIcon from "components/Icons/EyeIcon";
import EyeSlashIcon from "components/Icons/EyeSlashIcon";
import FloatInput from "components/Input/FloatInput";
import LockIcon from "components/Icons/LockIcon";
import React, { useState } from "react";
import { FieldErrors } from "react-hook-form";
import { List } from "reactstrap";
import { isPasswordValid, passwordListValidation } from "helpers";

import style from "assets/scss/components/Input/PasswordInput.module.scss";

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
          prefix: <LockIcon />,
          suffix: !hasShowPass ? (
            <EyeIcon
              onClick={() => setHasShowPass(true)}
              className="show-password"
            />
          ) : (
            <EyeSlashIcon
              onClick={() => setHasShowPass(false)}
              className="show-password"
            />
          ),
          status: errors?.[name]?.message ? "error" : undefined,
        }}
      />
      {hasShowHint && (
        <List className={style.validation}>
          {passwordListValidation.map((item, index) => (
            <li key={index} className={passValid[index] ? style.check : style.unCheck}>
              <h4>{item.title}</h4>
              {passValid[index] ? <CheckIcon /> : <ExclamationIcon />}
            </li>
          ))}
        </List>
      )}
    </>
  );
};

export default PasswordInput;
