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
import { InformationSchema } from "../validationForms";
import DatePicker from "components/DatePicker";
import { useSubmitInformation } from "services/auth";
import { formatPhoneNumber } from "helpers";

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
    const phoneNumber = formatPhoneNumber(data.phoneNumber, "98");
    await submitInformation
      .mutateAsync({ ...data, phoneNumber })
      .then((res) => {
        setIsLoading(false);
        res && navigate("/");
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
              <div className="mb-2">
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field: { name, value, onChange, ref } }) => (
                    <Input
                      type="text"
                      id={name}
                      name={name}
                      placeholder="نام"
                      value={value}
                      ref={ref}
                      onChange={onChange}
                      size="large"
                      prefix={<CiUser size={20} />}
                      status={errors?.[name]?.message ? "error" : undefined}
                    />
                  )}
                />
              </div>
              <div className="mb-2">
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field: { name, value, onChange, ref } }) => (
                    <Input
                      type="text"
                      id={name}
                      placeholder=" نام خانوادگی"
                      value={value}
                      ref={ref}
                      onChange={onChange}
                      size="large"
                      prefix={<CiUser size={20} />}
                      status={errors?.[name]?.message ? "error" : undefined}
                    />
                  )}
                />
              </div>
              <div className="mb-2">
                <Controller
                  name="nationalCode"
                  control={control}
                  render={({ field: { name, value, onChange, ref } }) => (
                    <Input
                      type="text"
                      id={name}
                      name={name}
                      placeholder="کدملی"
                      value={value}
                      ref={ref}
                      onChange={onChange}
                      size="large"
                      prefix={<LiaIdCardSolid size={20} />}
                      status={errors?.[name]?.message ? "error" : undefined}
                    />
                  )}
                />
              </div>
              <div className="mb-2">
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
              <div className="mb-2">
                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field: { name, value, onChange, ref } }) => (
                    <Input
                      type="text"
                      id={name}
                      name={name}
                      placeholder="شماره تلفن ایران"
                      value={value}
                      ref={ref}
                      onChange={onChange}
                      size="large"
                      prefix={<CiMobile2 size={20} />}
                      status={errors?.[name]?.message ? "error" : undefined}
                    />
                  )}
                />
              </div>
              <div className="mb-2">
                <Controller
                  name="email"
                  control={control}
                  render={({ field: { name, value, onChange, ref } }) => (
                    <Input
                      type="email"
                      id={name}
                      name={name}
                      placeholder="ایمیل"
                      value={value}
                      ref={ref}
                      onChange={onChange}
                      size="large"
                      prefix={<CiMail size={20} />}
                      status={errors?.[name]?.message ? "error" : undefined}
                    />
                  )}
                />
              </div>

              <div className="auth-footer">
                <div className="mb-3">
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
            </form>
          </div>
        </div>
      </section>
    </AuthLayout>
  );
};
export default Information;
