import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { Button, Spinner } from "reactstrap";
import { useAppSelector } from "store/hooks";
import {
  PhoneNumberMask,
  maskingString,
  persianToEnglishNumbers,
} from "helpers";
import {
  useRequestSwitchOtpMethodMutation,
  useVerifySwitchOtpMethodMutation,
} from "store/api/settings";

import otp from "assets/scss/components/Input/otpContainer.module.scss";
import { Controller, useForm } from "react-hook-form";

type Props = {
  handleLevel: () => void;
};
export default function Level1({ handleLevel }: Props) {
  const [level1Req] = useRequestSwitchOtpMethodMutation();

  const [level2Req, { isLoading, isSuccess }] =
    useVerifySwitchOtpMethodMutation();

  const { phoneNumber, email, otpMethod } = useAppSelector(
    (state) => state.user,
  );
  const [timeInSeconds, setTimeInSeconds] = useState(120);

  const formatTime = () => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  const handleResendClick = () => {
    setTimeInSeconds(120);
    level1Req(otpMethod);
  };

  const { handleSubmit, setValue, control } = useForm<{ code: string }>({
    mode: "onChange",
    defaultValues: {
      code: "",
    },
  });

  const handleCode = async (data) => {
    await level2Req(persianToEnglishNumbers(data.code));
  };

  const renderCaption = () => {
    switch (otpMethod) {
      case "EMAIL":
        return (
          <span className="d-inline-block">{maskingString(email, 1, 14)}</span>
        );
      case "PHONE":
        return (
          <span className="d-inline-block">
            {PhoneNumberMask({ phoneNumber: phoneNumber })}
          </span>
        );
      default:
        return <span className="d-inline-block">Google Authenticator</span>;
    }
  };

  useEffect(() => {
    isSuccess && handleLevel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timeInSeconds > 0) {
        setTimeInSeconds(timeInSeconds - 1);
      }
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(timerInterval);
  }, [timeInSeconds]);

  return (
    <div className={otp["otp-container"]}>
      <div className={otp["otp-content"]}>
        <div className={otp["otp-title"]}>
          <p className={otp["otp-title-text"]}>
            یک کد ۶ رقمی به {renderCaption()} ارسال شد لطفا کد را اینجا وارد
            کنید.
          </p>
        </div>
        <div className="d-flex justify-content-between align-items-center ">
          <Button
            color="link"
            onClick={handleResendClick}
            style={{ color: "#335ffc" }}
          >
            {/* {otpMethod === "PHONE" ? (
              <span className=" mt-1" style={{ fontSize: "12px" }}>
                ارسال مجدد کد به موبایل
              </span>
            ) : (
              <span className=" mt-1" style={{ fontSize: "12px" }}>
                ارسال مجدد کد به ایمیل
              </span>
            )} */}
          </Button>
        </div>
        <form onSubmit={handleSubmit(handleCode)} className="d-flex flex-column justify-content-center">
          <Controller
            control={control}
            name="code"
            render={({ field: { name, value } }) => (
              <OTPInput
                containerStyle={otp["input-container"]}
                value={value}
                onChange={(code) => {
                  setValue(name, code);
                  code.length === 6 && handleCode({ code });
                }}
                inputStyle={otp["otp-input"]}
                numInputs={6}
                renderSeparator={undefined}
                placeholder={undefined}
                shouldAutoFocus={true}
                renderInput={(props) => (
                  <input {...props} disabled={isLoading} />
                )}
              />
            )}
          />
          <Button
            type="submit"
            color="primary"
            outline
            className=" px-5 py-2 mt-4 w-100"
            disabled={timeInSeconds <= 0}
          >
            {isLoading ? (
              <Spinner />
            ) : (
              <span className="auth-counter text-start d-ltr">
                {formatTime()}
              </span>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
