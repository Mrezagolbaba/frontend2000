import { useState } from "react";
import OtpVerification from "./otpVerification";
import { useAppDispatch } from "store/hooks";
import { useGetMe } from "services/auth/user";
import { useVerifySwitchOtpMethodMutation } from "store/api/settings";
import toast from "react-hot-toast";
import { setUser } from "store/reducers/features/user/userSlice";

const PhoneVerification = () => {
  const [step, setStep] = useState(1);
  const [codeData, setCode] = useState({
    email: "",
    phone: "",
  });
  const dispatch = useAppDispatch();
  const getMe: any = useGetMe();
  const [verifySwitchOtpMethod, { isSuccess }] =
    useVerifySwitchOtpMethodMutation();
  const [showInput, setShowInput] = useState(false);

  const Step1 = () => {
    return (
      <OtpVerification
        securitySelection="PHONE"
        handleGetCode={(code) => {
          if (code.length === 6)
            setCode({
              ...codeData,
              phone: code,
            });
        }}
      />
    );
  };
  const Step2 = () => {
    return (
      <OtpVerification
        securitySelection="EMAIL"
        handleGetCode={(code) => {
          if (code.length === 6)
            setCode({
              ...codeData,
              phone: code,
            });
        }}
      />
    );
  };
  const handleOTP = async (data: { email: string; phone: string }) => {
    let code = data.email ?? data.phone;
    try {
      verifySwitchOtpMethod({ code: code }).then((res) => {
        // @ts-ignore
        if (res.data) {
          toast.success("نحوه تایید هویت دو مرحله ای با موفقیت تغییر کرد", {
            position: "bottom-left",
          });
          setShowInput(false);
          getMe.mutateAsync(null).then((res) => {
            res && dispatch(setUser(res));
          });
        } else {
          // @ts-ignore
          toast.error(res?.error?.data.message, { position: "bottom-left" });
        }
      });
    } catch (error) {
      toast.error("خطایی رخ داده است");
    }
  };
  const handleOnChhanStep = (e, step: number) => {
    e.preventDefault();
    e.stopPropagation();
    setStep(step);
  };

  return (
    <div>
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && (
        <div className="alert alert-success mb-5 mt-5">
          تایید هویت دو مرحله ای پیامک با موفقیت فعال شد، در صورت تغییر ، مجددا
          مراحل را باید طی کنید.{" "}
        </div>
      )}
      {step !== 3 && (
        <div
          className="d-flex justify-content-evenly mt-4 mb-4"
          style={{ width: "100%" }}
        >
          <button
            disabled={step == 1}
            className="btn btn-outline-primary"
            onClick={(e) => {
              handleOnChhanStep(e, step - 1);
            }}
          >
            قبلی{" "}
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={(e) => {
              if (step < 3) handleOnChhanStep(e, step + 1);
              handleOTP(codeData);
            }}
          >
            بعدی{" "}
          </button>
        </div>
      )}
    </div>
  );
};
export default PhoneVerification;
