import { useState } from "react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { LiaIdCardSolid } from "react-icons/lia";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CiMobile2, CiUser, CiMail, CiCalendarDate } from "react-icons/ci";
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';

import Auth from "layouts/auth";
import { InformationFormData } from "../types";
import { InformationSchema } from "pages/auth/validationForms";
import { useSubmitInformation } from "services/auth";
import { convertPersianToGregorian, formatPhoneNumber, getDate18YearsAgo, persianToEnglishNumbers } from "helpers";
import FloatInput from "components/Input/FloatInput";

import auth from "assets/scss/auth/auth.module.scss";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Spinner,
} from "reactstrap";

const Information = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const submitInformation = useSubmitInformation();
  const minimumDate = getDate18YearsAgo();

  const [selectedDay, setSelectedDay] = useState(minimumDate);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { phoneNumber } = location.state;

  const resolver = yupResolver(InformationSchema);
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<InformationFormData>({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      nationalCode: "",
      phoneNumber: phoneNumber.includes("+98") ? phoneNumber : "",
      email: "",
    },
    resolver,
  });

  const handleInfo = async (data: InformationFormData) => {
    setIsLoading(true);
    const nationalCode = persianToEnglishNumbers(data.nationalCode);
    const birthDate = convertPersianToGregorian(selectedDay.year + "/" + selectedDay.month + "/" + selectedDay.day);
    await submitInformation
      .mutateAsync({
        ...data,
        phoneNumber: phoneNumber.includes("+98")
          ? phoneNumber
          : data.phoneNumber
            ? formatPhoneNumber(persianToEnglishNumbers(data.phoneNumber), "98")
            : undefined,
        nationalCode,
        birthDate,
      })
      .then((res) => {
        navigate("/email-otp", {
          state: {
            email: data.email,
          },
        });
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
    <Auth>
      <section className={auth.container}>
        <Card className={auth.card}>
          <CardBody className={auth["card-body"]}>
            <h4 className={auth.title}>اطلاعات هویتی</h4>
            <p className={auth.text}>اطلاعات هویتی خود را تکمیل کنید</p>
            <form
              className={auth.form}
              onSubmit={handleSubmit(handleInfo, handleErrors)}
            >
              <Container>
                <Row className="gy-2 gx-0">
                  <Col xs={12}>
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
                  </Col>
                  <Col xs={12}>
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
                  </Col>
                  <Col xs={12}>
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
                  </Col>
                  <Col xs={12}>
                    <Controller
                      name="birthDate"
                      control={control}
                      render={({ field: { } }) => (
                        <DatePicker
                          value={selectedDay}
                          onChange={(date) => setSelectedDay(date as any)}
                          shouldHighlightWeekends
                          locale="fa"
                          wrapperClassName="w-100"
                          maximumDate={minimumDate}
                          colorPrimary="#111bff"
                          renderInput={({ ref }) => (
                            <FloatInput
                              type="text"
                              name={'birthDate'}
                              label="تاریخ تولد"
                              value={selectedDay.year + "-" + selectedDay.month + "-" + selectedDay.day}
                              onChange={() => console.log('onChange')}
                              inputProps={{
                                ref: ref,
                                size: "large",
                                prefix: <CiCalendarDate size={20} />,
                                status: errors?.['birthDate']?.message
                                  ? "error"
                                  : undefined,
                              }}
                            />
                          )}
                        />
                      )}
                    />
                  </Col>

                  <Col xs={12}>
                    <Controller
                      name="phoneNumber"
                      control={control}
                      render={({ field: { name, value, onChange, ref } }) => (
                        <FloatInput
                          type="text"
                          name={name}
                          label="شماره تلفن ایران"
                          value={value as string}
                          onChange={onChange}
                          disabled={phoneNumber.includes("+98")}
                          inputProps={{
                            dir: "ltr",
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
                  </Col>

                  <Col xs={12}>
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
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <div className="auth-footer">
                      <Button
                        type="submit"
                        color="primary"
                        className={auth.submit}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Spinner style={{ color: "white" }} />
                        ) : (
                          "ثبت اطلاعات"
                        )}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Container>
            </form>
          </CardBody>
        </Card>
      </section>
    </Auth>
  );
};
export default Information;
