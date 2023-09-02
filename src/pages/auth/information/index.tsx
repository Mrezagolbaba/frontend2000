import { useState } from "react";
import { Input, Spin } from "antd";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LiaIdCardSolid } from "react-icons/lia";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CiMobile2, CiUser, CiMail } from "react-icons/ci";

import "./styles.css";
import AuthLayout from "layouts/Authentication";
import { InformationFormData } from "../types";
import { InformationSchema } from "pages/auth/validationForms";
import DatePicker from "components/DatePicker";
import { useSubmitInformation } from "services/auth";
import { formatPhoneNumber, persianToEnglishNumbers } from "helpers";
import FloatInput from "components/Input/FloatInput";

const Information: React.FC = () => {
  const navigate = useNavigate();
  const submitInformation = useSubmitInformation();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const resolver = yupResolver(InformationSchema);
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<InformationFormData>({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      nationalCode: "",
      birthDate: "",
      phoneNumber: "",
      email: "",
    },
    resolver,
  });

  const handleInfo = async (data: InformationFormData) => {
    setIsLoading(true);
    const phoneNumber = formatPhoneNumber(
      persianToEnglishNumbers(data.phoneNumber),
      "98"
    );
    await submitInformation
      .mutateAsync({ ...data, phoneNumber })
      .then((res) => {
        if (res) {
          console.log(res);

          navigate("/email-otp", { state: { email: data.email } });
        }
        setIsLoading(false);
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
      <section className="auth auth-information">
        <div className="card auth-card auth-card--bordered">
          <div className="card-body">
            <h4 className="auth-title">اطلاعات هویتی</h4>
            <p className="auth-text">اطلاعات هویتی خود را تکمیل کنید</p>
            <form
              className="auth-information-form"
              onSubmit={handleSubmit(handleInfo, handleErrors)}
            >
              <div className="container">
                <div className="row gy-2">
                  <div className="col-12">
                    <Controller
                      name="firstName"
                      control={control}
                      render={({ field: { name, value, onChange, ref } }) => (
                        <FloatInput
                          type="text"
                          name={name}
                          label="نام"
                          value={value}
                          onChange={onChange}
                          inputProps={{
                            ref: ref,
                            size: "large",
                            prefix: <CiUser size={20} />,
                            status: errors?.[name]?.message
                              ? "error"
                              : undefined,
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="col-12">
                    <Controller
                      name="lastName"
                      control={control}
                      render={({ field: { name, value, onChange, ref } }) => (
                        <FloatInput
                          type="text"
                          label=" نام خانوادگی"
                          name={name}
                          value={value}
                          onChange={onChange}
                          inputProps={{
                            ref: ref,
                            size: "large",
                            prefix: <CiUser size={20} />,
                            status: errors?.[name]?.message
                              ? "error"
                              : undefined,
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="col-12">
                    <Controller
                      name="nationalCode"
                      control={control}
                      render={({ field: { name, value, onChange, ref } }) => (
                        <FloatInput
                          type="text"
                          name={name}
                          label="کدملی"
                          value={value}
                          onChange={onChange}
                          inputProps={{
                            ref: ref,
                            size: "large",
                            prefix: <LiaIdCardSolid size={20} />,
                            status: errors?.[name]?.message
                              ? "error"
                              : undefined,
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="col-12">
                    <Controller
                      name="birthDate"
                      control={control}
                      render={({ field: { name } }) => (
                        <DatePicker
                          label="تاریخ تولد"
                          onChange={(date) => setValue("birthDate", date)}
                          error={errors?.[name]?.message}
                        />
                      )}
                    />
                  </div>
                  <div className="col-12">
                    <Controller
                      name="phoneNumber"
                      control={control}
                      render={({ field: { name, value, onChange, ref } }) => (
                        <FloatInput
                          type="text"
                          name={name}
                          label="شماره تلفن ایران"
                          value={value}
                          onChange={onChange}
                          inputProps={{
                            ref: ref,
                            size: "large",
                            prefix: <CiMobile2 size={20} />,
                            status: errors?.[name]?.message
                              ? "error"
                              : undefined,
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="col-12">
                    <Controller
                      name="email"
                      control={control}
                      render={({ field: { name, value, onChange, ref } }) => (
                        <FloatInput
                          type="email"
                          name={name}
                          label="ایمیل"
                          value={value}
                          onChange={onChange}
                          inputProps={{
                            ref: ref,
                            size: "large",
                            prefix: <CiMail size={20} />,
                            status: errors?.[name]?.message
                              ? "error"
                              : undefined,
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="col-12 auth-footer">
                    <button
                      type="submit"
                      className="btn btn-primary auth-submit"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Spin style={{ color: "white" }} />
                      ) : (
                        "ثبت اطلاعات"
                      )}
                    </button>
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
export default Information;
