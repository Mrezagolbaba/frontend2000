import { Input, Spin } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CiMobile2 } from "react-icons/ci";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

import AuthLayout from "layouts/Authentication";
import { registerSchema } from "pages/auth/validationForms";
import { RegisterFormData } from "pages/auth/types";
import { useCreateUser } from "services/auth";
import SelectCountry from "components/SelectCountry";
import PasswordInput from "components/PasswordInput";
import FloatInput from "components/Input/FloatInput";
import { formatPhoneNumber, persianToEnglishNumbers } from "helpers";
import React, { useState } from "react";

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const registerRequest = useCreateUser();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const resolver = yupResolver(registerSchema);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormData>({
    mode: "onChange",
    defaultValues: {
      phoneNumber: "",
      password: "",
      selectedCountry: "98",
      terms: false,
    },
    resolver,
  });

  const handleRegister = async (data: RegisterFormData) => {
    setIsLoading(true);

    const phoneNumber = formatPhoneNumber(
      persianToEnglishNumbers(data.phoneNumber),
      data.selectedCountry
    );
    const userData = {
      phoneNumber,
      password: data.password,
    };
    await registerRequest
      .mutateAsync(userData)
      .then((res) => {
        if (res) {
          navigate("/mobile-otp", {
            state: {
              phoneNumber: userData.phoneNumber,
            },
          });
          setIsLoading(false);
        }
      })
      .catch(() => {
        setIsLoading(false);
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
              <div className="container">
                <div className="row gy-2 gx-0">
                  <div className="col-8">
                    <Controller
                      name="phoneNumber"
                      control={control}
                      render={({ field: { name, value, onChange, ref } }) => (
                        <FloatInput
                          type="text"
                          name={name}
                          value={value}
                          label="شماره همراه"
                          onChange={onChange}
                          inputProps={{
                            ref: ref,
                            size: "large",
                            prefix: <CiMobile2 />,
                            status: errors?.[name]?.message
                              ? "error"
                              : undefined,
                            autoFocus: true,
                            className: "phone-number-input",
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="col-4">
                    <Controller
                      name="selectedCountry"
                      control={control}
                      render={({ field }) => <SelectCountry {...field} />}
                    />
                  </div>
                  <div className="col-12">
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <PasswordInput hasShowHint={true} {...field} />
                      )}
                    />
                  </div>
                  <div className="col-12 auth-terms">
                    <Controller
                      name="terms"
                      control={control}
                      render={({ field: { name, value, onChange, ref } }) => (
                        <div className="form-check form-check--lg auth-terms">
                          <label htmlFor={name} className="form-check-label">
                            <Link to="#"> مقررات آرسونیکس</Link> را خوانده‌ام و
                            با آن موافقم.
                          </label>
                          <Input
                            checked={value}
                            className="form-check-input"
                            type="checkbox"
                            name={name}
                            id={name}
                            ref={ref}
                            onChange={onChange}
                            status={
                              errors?.[name]?.message ? "error" : undefined
                            }
                          />
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="auth-footer">
                      <div className="auth-terms mb-3"></div>
                      <div className="mb-3">
                        <button
                          type="submit"
                          className="btn btn-primary auth-submit"
                        >
                          {isLoading ? (
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

export default SignupPage;
