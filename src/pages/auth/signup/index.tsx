import { Input, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CiUser, CiLock } from "react-icons/ci";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { countries } from "helpers";
import AuthLayout from "layouts/Authentication";
import { registerSchema } from "pages/auth/validationForms";
import { RegisterFormData } from "pages/auth/types";

import "pages/auth/style.scss";
import toast from "react-hot-toast";
import { useCreateUser } from "services/auth";

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const registerRequest = useCreateUser();

  const resolver = yupResolver(registerSchema);
  const {
    handleSubmit,
    control,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<RegisterFormData>({
    mode: "onChange",
    defaultValues: {
      phoneNumber: "",
      password: "",
      selectedCountry: "",
      terms: false,
    },
    resolver,
  });

  const handleRegister = async (data: RegisterFormData) => {
    const userData = {
      phoneNumber: data.selectedCountry + data.phoneNumber,
      password: data.password,
    };
    await registerRequest.mutateAsync(userData).then((res) => {
      res &&
        navigate("/mobile-otp", {
          state: {
            phoneNumber: userData.phoneNumber,
          },
        });
    });
  };
  const handleErrors = (errors: any) =>
    Object.entries(errors).map(([fieldName, error]: any) =>
      toast.error(error?.message, {
        position: "bottom-left",
      })
    );

  return (
    <AuthLayout>
      <section className="auth auth-signup">
        <div className="card auth-card auth-card--bordered">
          <div className="card-body">
            <h4 className="auth-title">ثبت نام</h4>
            <p className="auth-text"> شماره تلفن خود را وارد کنید.</p>

            <form
              className="auth-form"
              onSubmit={handleSubmit(handleRegister, handleErrors)}
            >
              <div className="mb-2">
                <div className="row">
                  <div className="col-12 col-md-8" style={{ paddingLeft: 0 }}>
                    <Controller
                      name="phoneNumber"
                      control={control}
                      render={({ field: { name, value, onChange, ref } }) => (
                        <Input
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
              </div>
              <div className="auth-footer">
                <div className="auth-terms mb-3">
                  <Controller
                    name="terms"
                    control={control}
                    render={({ field: { name, value, onChange, ref } }) => (
                      <div className="form-check form-check--lg auth-terms">
                        <label htmlFor={name} className="form-check-label">
                          <Link to="#"> مقررات آرسونیکس</Link> را خوانده‌ام و با
                          آن موافقم.
                        </label>
                        <Input
                          checked={value}
                          className="form-check-input"
                          type="checkbox"
                          name={name}
                          id={name}
                          ref={ref}
                          onChange={onChange}
                          status={errors?.[name]?.message ? "error" : undefined}
                        />
                      </div>
                    )}
                  />
                </div>
                <div className="mb-3">
                  <button type="submit" className="btn btn-primary auth-submit">
                    {isLoading || isSubmitting ? (
                      <Spin style={{ color: "white" }} />
                    ) : (
                      "ثبت نام"
                    )}
                  </button>
                </div>
                <div className="auth-already">
                  عضو هستم:
                  <Link to="/login">ورود</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </AuthLayout>
  );
};

export default SignupPage;