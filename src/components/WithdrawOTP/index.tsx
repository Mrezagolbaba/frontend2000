import OtpInput from "react-otp-input";
import { useEffect, useState } from "react";
import { PhoneNumberMask, maskingString } from "helpers";
import { useAppSelector } from "store/hooks";
import { IoIosClose } from "react-icons/io";

import otp from "assets/scss/components/Input/otpContainer.module.scss";
import { Button } from "reactstrap";

interface Props {
  securitySelection: string;
  section?: string;
  handleGetCode: ({ code }: { code: string }) => void;
  handleResend: () => void;
  onClose: () => void;
  title?: string;
}
const WithdrawOTP = ({
  securitySelection,
  section,
  handleGetCode,
  handleResend,
  onClose,
  title,
}: Props) => {
  const [timeInSeconds, setTimeInSeconds] = useState(120);
  const user = useAppSelector((state) => state.user);
  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timeInSeconds > 0) {
        setTimeInSeconds(timeInSeconds - 1);
      }
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(timerInterval);
  }, [timeInSeconds]);
  const [otpCode, setOtpCode] = useState("");
  const formatTime = () => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  const handleResendClick = () => {
    setTimeInSeconds(120);
    handleResend();
    setOtpCode("");
  };
  const renderCaption = () => {
    switch (securitySelection) {
      case "AUTHENTICATOR":
        return (
          <p className={otp["otp-title-text"]}>
            یک کد ۶ رقمی به اپلیکیشن احراز هویت ارسال شد لطفا کد را اینجا وارد
            کنید
          </p>
        );
      case "EMAIL":
        return (
          <p className={otp["otp-title-text"]}>
            یک کد ۶ رقمی به ایمیل
            <span> {maskingString(user.email, 1, 14)} </span>
            ارسال شد لطفا کد را اینجا وارد کنید
          </p>
        );
      case "PHONE":
      default:
        return (
          <p className={otp["otp-title-text"]}>
            یک کد ۶ رقمی به شماره
            <span className="d-inline-block">
              {PhoneNumberMask({ phoneNumber: user.phoneNumber })}{" "}
            </span>
            ارسال شد لطفا کد را اینجا وارد کنید
          </p>
        );
    }
  };

  return (
    <div className={otp["otp-container"]}>
      <div className={otp["otp-header"]}>
        <h5>{title}</h5>
        <IoIosClose color="#c6d2d9" size={40} onClick={() => onClose()} />
      </div>
      <div className={otp["otp-content"]}>
        <div className={otp["otp-title"]}>{renderCaption()}</div>
        <OtpInput
          containerStyle={otp["input-container"]}
          value={otpCode}
          onChange={(code) => {
            setOtpCode(code);
            code.length === 6 && handleGetCode({ code });
          }}
          inputStyle={otp["otp-input"]}
          numInputs={6}
          renderSeparator={undefined}
          placeholder={undefined}
          shouldAutoFocus={true}
          renderInput={(props) => (
            <input {...props} type="text" inputMode="numeric" />
          )}
        />

        {timeInSeconds === 0 ? (
          <Button
            color="primary"
            outline
            className="mt-4 px-5 py-2"
            style={{ width: "80%" }}
            onClick={handleResendClick}
          >
            ارسال مجدد کد
          </Button>
        ) : (
          <Button
            color="primary"
            outline
            className="mt-4 px-5 py-2"
            style={{ width: "80%" }}
          >
            <span className="auth-counter text-start d-ltr">
              {formatTime()}
            </span>
          </Button>
        )}
      </div>
    </div>
  );
};
export default WithdrawOTP;
