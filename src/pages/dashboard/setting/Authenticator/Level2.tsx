import OTPInput from "react-otp-input";
import { Button, Spinner } from "reactstrap";
import { useEffect } from "react";
import QRCode from "react-qr-code";
import { useAppSelector } from "store/hooks";
import { OTPType } from "types/settings";
import { FaApple } from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import {
  useGetAuthenticatorQuery,
  useSwitchOtpMethodMutation,
} from "store/api/settings";
import toast from "react-hot-toast";
import {
  PhoneNumberMask,
  maskingString,
  persianToEnglishNumbers,
} from "helpers";
import CopyInput from "components/Input/CopyInput";
import { Controller, useForm } from "react-hook-form";

import otp from "assets/scss/components/Input/otpContainer.module.scss";

type Props = {
  newOtpMethod: OTPType;
  handleSuccess: () => void;
  handleClose: () => void;
};
export default function Level2({
  newOtpMethod,
  handleSuccess,
  handleClose,
}: Props) {
  const { phoneNumber, email } = useAppSelector((state) => state.user);
  const { data: authenticator } = useGetAuthenticatorQuery();

  const [finalReq, { isSuccess, isLoading }] =
    useSwitchOtpMethodMutation();

  const { handleSubmit, setValue, control } = useForm<{ code: string }>({
    mode: "onChange",
    defaultValues: {
      code: "",
    },
  });

  const handleCode = async (data) => {
    await finalReq(persianToEnglishNumbers(data.code));
  };

  useEffect(() => {
    if (isSuccess) {
      handleSuccess();
      handleClose();
      toast.success("روش احراز هویت شما تغییر کرد.", {
        position: "bottom-left",
      });
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const renderCaption = () => {
    switch (newOtpMethod) {
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

  return (
    <div className={otp["otp-container"]}>
      <div className={otp["otp-content"]}>
        {newOtpMethod === "AUTHENTICATOR" && authenticator && (
          <div className="text-center mb-4 flex-column align-items-center">
            <div
              className="mb-4"
              style={{
                color: "#03041b66",
                fontSize: "13px",
                lineHeight: "26px",
              }}
            >
              QR code زیر را از طریق برنامه{" "}
              <b style={{ color: "#000" }}>Google Authenticator</b> اسکن کنید
              <br /> یا کد <CopyInput text={authenticator.secret} /> را در
              برنامه وارد کنید.
              <br />
            </div>
            <QRCode
              fgColor="#111BFF"
              viewBox={`0 0 256 256`}
              size={150}
              value={authenticator.keyUrl}
              color="#111BFF"
              className="w-10 "
            />
          </div>
        )}
        <div className={otp["otp-title"]}>
          <p className={otp["otp-title-text"]}>
            یک کد ۶ رقمی به {renderCaption()} ارسال شد لطفا کد را اینجا وارد
            کنید.
          </p>
        </div>
        <form onSubmit={handleSubmit(handleCode)}>
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
            color="primary"
            outline
            type="submit"
            className=" px-5 py-2 mt-4 w-100"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "تایید و فعالسازی"}
          </Button>
        </form>
        {newOtpMethod === "AUTHENTICATOR" && authenticator && (
          <div className={otp["otp-footer"]}>
            <div className={otp["otp-footer__caption"]}>
              دانلود برنامه Google Authenticator
            </div>
            <Button
              color="link"
              tag="a"
              href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en&gl=US&pli=1"
              target="_blank"
              className={otp["google-authenticator-android"]}
            >
              <IoLogoGooglePlaystore />
            </Button>
            <Button
              color="link"
              tag="a"
              href="https://apps.apple.com/us/app/google-authenticator/id388497605"
              target="_blank"
              className={otp["google-authenticator-ios"]}
            >
              <FaApple />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
