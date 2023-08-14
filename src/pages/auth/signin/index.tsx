import React from "react";
import { CiLock, CiUser } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Select, Spin } from "antd";

import { countries } from "helpers";
import { useLogin } from "services/auth";
import AuthLayout from "layouts/Authentication";
import { loginSchema } from "pages/auth/validationForms";
import { LoginFormData } from "pages/auth/types";

import "pages/auth/style.scss";
import { toast } from "react-hot-toast";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const resolver = yupResolver(loginSchema);
  const {
    handleSubmit,
    control,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<LoginFormData>({
    mode: "onChange",
    defaultValues: {
      phoneNumber: "",
      password: "",
      selectedCountry: "",
    },
    resolver,
  });

  const handleLogin = async (data: LoginFormData) => {
    const userData = {
      phoneNumber: data.selectedCountry + data.phoneNumber,
      password: data.password,
      type: "PHONE",
    };
    await loginMutation.mutateAsync(userData).then(
      (res) =>
        res &&
        navigate("/mobile-otp", {
          state: {
            phoneNumber: userData.phoneNumber,
          },
        })
    );
  };

  const handleErrors = (errors: any) =>
    Object.entries(errors).map(([fieldName, error]: any) =>
      toast.error(error?.message, {
        position: "bottom-left",
      })
    );

  return (
    <AuthLayout>
      <section className="auth auth-signin">
        <div className="card auth-card">
          <div className="card-body">
            <h4 className="auth-title">ورود به حساب کاربری</h4>
            <p className="auth-text"> شماره تلفن خود را وارد کنید</p>

            <form
              className="auth-form"
              onSubmit={handleSubmit(handleLogin, handleErrors)}
            >
              <div className="mb-2">
                <div className="row">
                  <div className="col-12 col-md-8" style={{ paddingLeft: 0 }}>
                    <Controller
                      name="phoneNumber"
                      control={control}
                      render={({ field: { name, value, onChange, ref } }) => (
                        <Input
                          tabIndex={0}
                          autoFocus
                          className="phone-number-input"
                          type="phone"
                          id={name}
                          name={name}
                          value={value}
                          placeholder="شماره همراه"
                          ref={ref}
                          onChange={onChange}
                          size={"large"}
                          prefix={<CiUser />}
                          status={errors?.[name]?.message ? "error" : undefined}
                        />
                      )}
                    />
                  </div>
                  <div
                    className="col-12 col-md-4"
                    style={{ paddingRight: "0" }}
                  >
                    <Controller
                      name="selectedCountry"
                      control={control}
                      render={({ field: { name, value, onChange, ref } }) => (
                        <Select
                          tabIndex={1}
                          className="dropdown bootstrap-select bs-select-control bs-form-select select-country-input"
                          id={name}
                          ref={ref}
                          value={value}
                          onChange={onChange}
                          options={countries}
                          placeholder="کد"
                          size="large"
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          status={errors?.[name]?.message ? "error" : undefined}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <Controller
                  name="password"
                  control={control}
                  render={({ field: { name, value, onChange, ref } }) => (
                    <Input
                      tabIndex={2}
                      type="password"
                      id={name}
                      name={name}
                      value={value}
                      placeholder="رمز عبور"
                      ref={ref}
                      onChange={onChange}
                      size={"large"}
                      prefix={<CiLock />}
                      status={errors?.[name]?.message ? "error" : undefined}
                    />
                  )}
                />
                <div className="auth-forgot mb-4">
                  <Link to="/forget" tabIndex={3}>
                    رمز عبور را فراموش کرده&zwnj;ام!
                  </Link>
                </div>
                <div className="auth-footer">
                  <div className="mb-3">
                    <button
                      tabIndex={4}
                      type="submit"
                      className="btn btn-primary auth-submit"
                    >
                      {isLoading || isSubmitting ? (
                        <Spin style={{ color: "white" }} />
                      ) : (
                        "ورود به حساب"
                      )}
                    </button>
                    <button
                      tabIndex={5}
                      type="submit"
                      className="btn btn-outline-primary auth-submit mt-3"
                    >
                      ورود با استفاده از ایمیل
                    </button>
                  </div>
                  <div className="auth-already">
                    عضو نیستم:
                    <Link to="/register" tabIndex={6}>
                      ثبت نام
                    </Link>
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

export default LoginPage;
