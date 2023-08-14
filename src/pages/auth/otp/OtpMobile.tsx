import { useNavigate, useLocation, Link } from "react-router-dom";

import { PhoneNumberMask } from "helpers";
import OtpInput from "components/OTP";
import { resendOtp, sendOtp } from "services/auth";
import AuthLayout from "layouts/Authentication";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { OtpSchema } from "pages/auth/validationForms";
import { Spin } from "antd";
import { toast } from "react-hot-toast";
import { useGetMe } from "services/users";

const OtpMobile: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const phoneNumber = location.state.phoneNumber;

  const { data: MeData } = useGetMe();

  const resolver = yupResolver(OtpSchema);
  const {
    handleSubmit,
    setValue,
    control,
    formState: { isLoading, isSubmitting },
  } = useForm<{ code: string }>({
    mode: "onChange",
    defaultValues: {
      code: "",
    },
    resolver,
  });

  const handleResend = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const data: OtpData = {
      type: "AUTH",
      method: "PHONE",
    };
    await resendOtp(data);
  };

  const handleOTP = async (data: { code: string }) => {
    const formData = {
      code: data.code,
      type: "AUTH",
      method: "PHONE",
    };
    await sendOtp(formData).then((res) => {
      if (res) {
        if (MeData?.firstTierVerified) navigate("/");
        else navigate("/information");
      }
    });
  };

  const handleErrors = (errors: any) => {
    toast.error(errors?.code?.message, {
      position: "bottom-left",
    });
  };

  return (
    <AuthLayout>
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
              <button onClick={handleResend} className="btn-simple auth-resend">
                ارسال مجدد کد
              </button>
            </div>

            <form
              className="auth-form"
              onSubmit={handleSubmit(handleOTP, handleErrors)}
            >
              <div className="mb-4">
                <Controller
                  name="code"
                  control={control}
                  render={() => (
                    <OtpInput onChange={(code) => setValue("code", code)} />
                  )}
                />
              </div>
              <div className="auth-footer">
                <div className="mb-3">
                  <button type="submit" className="btn btn-primary auth-submit">
                    {isLoading || isSubmitting ? (
                      <Spin style={{ color: "white" }} />
                    ) : (
                      "ارسال"
                    )}
                  </button>
                </div>
                <div className="auth-edit-mobile text-center">
                  <Link to="/register">ویرایش شماره همراه</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </AuthLayout>
  );
};
export default OtpMobile;
