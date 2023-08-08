import React, { FormEvent, useState } from "react";
import IrFlag from "../../../assets/img/icons/flag-iran.svg";
import TrFlag from "../../../assets/img/icons/flag-turkey.png";
import InputComponent from "../../../components/Input";
import { CiLock, CiUser } from "react-icons/ci";
import SelectComponent from "../../../components/Select";
import { countries } from "../../../helpers";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useLogin } from "../../../services/auth";

const optionsArray = [
  { value: "90+", label: "90+", flagIcon: TrFlag },
  { value: "44+", label: "44+", flagIcon: "URL_TO_FLAG_ICON" },
  { value: "33+", label: "33+", flagIcon: "URL_TO_FLAG_ICON" },
  { value: "98+", label: "98+", flagIcon: IrFlag },
];

const LoginPage: React.FC = () => {
  const router = useNavigate();
  const loginMutation = useLogin();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });
  const [countryCode, setCountryCode] = useState<string>("");
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checked === false)
      return toast.error("لطفا قوانین را مطالعه کنید و تایید کنید");
    setLoading(true);
    try {
      const userData = {
        phoneNumber: countryCode + formData.phoneNumber,
        password: formData.password,
      };
      await loginMutation.mutateAsync(userData);
      setLoading(false);
      router("/information");
    } catch (error: any) {
      console.error("Signup error:", error.message);
      setLoading(false);
    }
  };
  return (
    <div className="auth-wrapper" id="root">
      <main className="auth-main">
        <header className="auth-header auth-header--bg">
          <div className="auth-logo">
            <a href="#">
              <img src="assets/img/logo-arsonex.png" alt="" />
            </a>
          </div>
          <div className="auth-gain-confidence">
            <p>از یکسان بودن آدرس صفحه با آدرس زیر مطمئن شوید.</p>
            <div className="d-ltr">
              <span className="icon">
                <svg
                  width="12"
                  height="16"
                  viewBox="0 0 12 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 0.666656L0 3.33332V7.33332C0 11.0333 2.56 14.4933 6 15.3333C9.44 14.4933 12 11.0333 12 7.33332V3.33332L6 0.666656ZM6 7.99332H10.6667C10.3133 10.74 8.48 13.1867 6 13.9533V7.99999H1.33333V4.19999L6 2.12666V7.99332Z"
                    fill="#39D98A"
                  />
                </svg>
              </span>
              <label>
                <span>https://</span>arsonex.com
              </label>
            </div>
          </div>
        </header>

        <section className="auth auth-signin">
          <div className="card auth-card">
            <div className="card-body">
              <h4 className="auth-title">ورود به حساب کاربری</h4>
              <p className="auth-text"> شماره تلفن خود را وارد کنید</p>

              <form action="" className="auth-form" onSubmit={handleLogin}>
                <div className="mb-2">
                  <div className="row">
                    <div
                      className="col-12 col-md-8"
                      style={{ paddingLeft: "0" }}
                    >
                      <InputComponent
                        type="phone"
                        id="input1"
                        style={{
                          borderTopLeftRadius: 0,
                          borderBottomLeftRadius: 0,
                        }}
                        placeholder="شماره همراه"
                        value={formData.phoneNumber}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            phoneNumber: e.target.value,
                          });
                        }}
                        size={"large"}
                        prefix={<CiUser />}
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
                        options={countries}
                        size={"large"}
                        handleChange={(val: string) => {
                          setCountryCode(val);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-2">
                  <InputComponent
                    type="password"
                    id="input2"
                    placeholder="رمز عبور"
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      });
                    }}
                    size={"large"}
                    prefix={<CiLock />}
                  />
                  <div className="auth-forgot mb-4">
                    <a href="/forget">رمز عبور را فراموش کرده&zwnj;ام!</a>
                  </div>
                  <div className="auth-footer">
                    <div className="mb-3">
                      <button
                        type="submit"
                        className="btn btn-primary auth-submit"
                      >
                        ورود به حساب
                      </button>
                      <button
                        type="submit"
                        className="btn btn-outline-primary auth-submit mt-3"
                      >
                        ورود با استفاده از ایمیل
                      </button>
                    </div>
                    <div className="auth-already">
                      عضو نیستم:
                      <a href="/register">ثبت نام</a>
                    </div>
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

export default LoginPage;
