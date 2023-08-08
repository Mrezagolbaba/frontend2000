import HeadAuth from "../../../components/layout/headAuth";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { PhoneNumberMask } from "../../../helpers";
import OtpInput from "../../../components/OTP";
import { useState } from "react";
import { send } from "vite";
import { resendOtp, sendOtp } from "../../../services/auth";

const OtpMobile: React.FC = () => {
  const router = useNavigate();
  const location = useLocation();
  let phoneNumber = location.state.phoneNumber;
  const [otpCode, setOtpCode] = useState("");

  const handleOtpChange = (code: string) => {
    setOtpCode(code);
  };

  const handleSendOtp = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const data: OtpData = {
      code: otpCode,
      type: "AUTH",
      method: "PHONE",
    };
    const response = await sendOtp(data);
    if (response.status === 200) {
      router("/");
    }
  };

  const handleResend = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const data: OtpData = {
      code: otpCode,
      type: "AUTH",
      method: "PHONE",
    };
    const response = await resendOtp(data);
    if (response.status === 200) {
      router("/");
    }
  };

  return (
    <div className="auth-wrapper" id="root">
      <main className="auth-main">
        <HeadAuth />
        <section className="auth auth-confirmation">
          <div className="card auth-card auth-card--bordered">
            <div className="card-body">
              <h4 className="auth-title">تایید شماره همراه</h4>
              <div className="auth-summary">
                <p className="auth-text text-end">
                  کد تایید ارسال شده به
                  <span className="d-ltr d-inline-block">
                    {PhoneNumberMask({
                      phoneNumber,
                    })}
                  </span>
                  را وارد کنید.
                </p>
                <button
                  onClick={handleResend}
                  className="btn-simple auth-resend"
                >
                  ارسال مجدد کد
                </button>
              </div>

              <form action="" className="auth-form">
                <div className="mb-4">
                  <OtpInput onChange={handleOtpChange} />
                </div>
                <div className="auth-footer">
                  <div className="mb-3">
                    <button
                      onClick={handleSendOtp}
                      type="submit"
                      className="btn btn-primary auth-submit"
                    >
                      ثبت نام
                    </button>
                  </div>
                  <div className="auth-edit-mobile text-center">
                    <a href="/register">ویرایش شماره همراه</a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
export default OtpMobile;
