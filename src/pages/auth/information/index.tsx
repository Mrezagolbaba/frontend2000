import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Spinner,
} from "reactstrap";
import {
  convertPersianToGregorian,
  formatPhoneNumber,
  getDate18YearsAgo,
  persianToEnglishNumbers,
} from "helpers";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import * as Yup from "yup";
import Auth from "layouts/auth";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import FloatInput from "components/Input/FloatInput";
import { CiMobile2, CiUser, CiMail, CiCalendarDate } from "react-icons/ci";
import { Controller, useForm } from "react-hook-form";
import { LiaIdCardSolid } from "react-icons/lia";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useFirstTierMutation, useGetMeQuery } from "store/api/user";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import auth from "assets/scss/auth/auth.module.scss";

type Day = {
  year: number;
  month: number;
  day: number;
};
type DayValue = Day | null | undefined;

export default function Information() {
  // ==============|| States ||================= //
  const [selectedDay, setSelectedDay] = useState<DayValue>();

  // ==============|| Validation ||================= //
  const InformationSchema = Yup.object().shape({
    firstName: Yup.string().required("درج نام الزامی است."),
    lastName: Yup.string().required("درج نام خانوادگی الزامی است."),
    nationalCode: Yup.string().required("کد ملی الزامی می باشد."),
    phoneNumber: Yup.string(),
    email: Yup.string().email().required("درج ایمیل الزامی می باشد."),
    birthDate: Yup.string(),
  });
  const resolver = yupResolver(InformationSchema);

  // ==============|| Hooks ||================= //
  const [
    firstTierRequest,
    { isLoading: loadingFirstTier, isSuccess: successFirstTier },
  ] = useFirstTierMutation();
  const navigate = useNavigate();
  const { data: user, isLoading } = useGetMeQuery();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      nationalCode: "",
      birthDate: "",
      phoneNumber: user?.phoneNumber.includes("+98") ? user?.phoneNumber : "",
      email: "",
    },
    resolver,
  });

  // ==============|| Handlers ||================= //
  const minimumDate = getDate18YearsAgo();
  const handleInfo = async (data) => {
    const nationalCode = persianToEnglishNumbers(data.nationalCode);
    const birthDate = convertPersianToGregorian(
      selectedDay?.year + "/" + selectedDay?.month + "/" + selectedDay?.day,
    );
    if (birthDate === undefined) {
      toast.error("تاریخ تولد الزامی می باشد.", {
        position: "bottom-left",
      });
      return;
    } else
      firstTierRequest({
        ...data,
        phoneNumber: user?.phoneNumber.includes("+98")
          ? user?.phoneNumber
          : data.phoneNumber
            ? formatPhoneNumber(persianToEnglishNumbers(data.phoneNumber), "98")
            : undefined,
        nationalCode,
        birthDate,
      });
  };
  const handleErrors = (errors: any) =>
    Object.entries(errors).map(([fieldName, error]: any) =>
      toast.error(error?.message, {
        position: "bottom-left",
      }),
    );

  // ==============|| Life Cycle ||================= //
  useEffect(() => {
    if (successFirstTier) {
      navigate("/otp", {
        state: {
          type: "VERIFY_EMAIL",
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successFirstTier]);

  // ==============|| Render ||================= //
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
                      render={({ field: { name, onChange } }) => (
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
                              name={name}
                              label="تاریخ تولد"
                              value={
                                selectedDay !== undefined
                                  ? selectedDay?.year +
                                    "-" +
                                    selectedDay?.month +
                                    "-" +
                                    selectedDay?.day
                                  : ""
                              }
                              onChange={onChange}
                              inputProps={{
                                ref: ref,
                                size: "large",
                                prefix: <CiCalendarDate size={20} />,
                                status: errors?.["birthDate"]?.message
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
                          disabled={user?.phoneNumber.includes("+98")}
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
                        disabled={isLoading || loadingFirstTier}
                      >
                        {loadingFirstTier ? (
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
}
