import { yupResolver } from "@hookform/resolvers/yup";
import AuthLayout from "layouts/Authentication";
import { Controller, useForm } from "react-hook-form";
import { OtpSchema } from "../validationForms";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { sendOtp } from "services/auth";
import OtpInput from "components/OTP";
import { Spin } from "antd";

const OtpEmail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state.email;

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

  const handleOTP = async (data: { code: string }) => {
    const formData = {
      code: data.code,
      type: "VERIFY_EMAIL",
      method: "EMAIL",
    };
    await sendOtp(formData).then((res) => {
      toast.error("ایمیل شما با موفقیت تایید شد.", {
        position: "bottom-left",
      });
      res && navigate("/login");
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
            <h4 className="auth-title">تایید ایمیل</h4>
            <div className="auth-summary">
              <p className="auth-text text-end">
                کد تایید ارسال شده به
                <span className="d-ltr d-inline-block">{email}</span>
                را وارد کنید.
              </p>
              <span className="auth-counter text-start d-ltr">1:48</span>
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
                  <Link to="/information">ویرایش ایمیل</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </AuthLayout>
  );
};
export default OtpEmail;
