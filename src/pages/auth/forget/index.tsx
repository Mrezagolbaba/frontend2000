import { useState } from "react";
import { CiMail, CiMobile2 } from "react-icons/ci";
import InputComponent from "components/Input";
import HeadAuth from "layouts/Authentication";
import SelectComponent from "components/Select";
import { useForgetPassword } from "services/auth";
import AuthLayout from "layouts/Authentication";

const Forget: React.FC = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState<string>("");
  const forgetPasswordMutation = useForgetPassword();

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    type: "",
  });

  const handleForgetPassword = async () => {
    try {
      await forgetPasswordMutation.mutateAsync(formData);
      // Forget password request successful, you can show a success message or redirect to the login page
    } catch (error) {
      // Forget password request failed, the error will be handled by the useForgetPassword hook and toast the error message
    }
  };

  return (
    <AuthLayout>
      <section className="auth auth-signin">
        <div className="card auth-card">
          <div className="card-body">
            <h4 className="auth-title">فراموشی رمز عبور</h4>
            <p className="auth-text">
              {" "}
              شماره تلفن همراه یا ایمیل خود را وارد کنید
            </p>
            <form
              action=""
              className="auth-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleForgetPassword();
              }}
            >
              <div className="mb-2">
                <InputComponent
                  type="email"
                  id="input1"
                  placeholder="ایمیل "
                  value=""
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                      type: "email",
                    })
                  }
                  size="large"
                  prefix={<CiMail />}
                />
              </div>
              <div className="mb-2">
                <div className="row">
                  <div className="col-12 col-md-8" style={{ paddingLeft: "0" }}>
                    <InputComponent
                      type="phone"
                      id="input1"
                      placeholder="شماره همراه "
                      value=""
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: e.target.value,
                          type: "phone",
                        })
                      }
                      size="large"
                      prefix={<CiMobile2 />}
                    />
                  </div>
                  <div
                    className="col-12 col-md-4"
                    style={{ paddingRight: "0" }}
                  >
                    <SelectComponent
                      style={{
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                      id="select1"
                      placeholder="کد"
                      options={[]}
                      size={"large"}
                      handleChange={(val: string) => {
                        setCountryCode(val);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <div className="auth-footer">
                  <div className="mb-3">
                    <button
                      type="submit"
                      className="btn btn-primary auth-submit"
                    >
                      ثبت درخواست
                    </button>
                  </div>
                  <div className="auth-already">
                    فراموش نکرده&zwnj;اید:{" "}
                    <a href="/login">ورود به حساب کاربری</a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </AuthLayout>
  );
};
export default Forget;
