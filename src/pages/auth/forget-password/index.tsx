import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Spinner,
} from "reactstrap";
import * as Yup from "yup";
import Auth from "layouts/auth";
import FloatInput from "components/Input/FloatInput";
import SelectCountry from "components/SelectCountry";
import toast from "react-hot-toast";
import useAuth from "hooks/useAuth";
import { CiMobile2 } from "react-icons/ci";
import { Controller, useForm } from "react-hook-form";
import { ForgotPasswordRequest } from "types/auth";
import { HiOutlineMail } from "react-icons/hi";
import { formatPhoneNumber, persianToEnglishNumbers } from "helpers";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import auth from "assets/scss/auth/auth.module.scss";

export default function ForgetPassword() {
  // ==============|| States ||================= //
  const [forgotType, setForgotType] = useState<"PHONE" | "EMAIL">("PHONE");

  // ==============|| Validation ||================= //
  const getValidationSchema = () => {
    if (forgotType === "PHONE") {
      return Yup.object().shape({
        username: Yup.string()
          .matches(/^[0-9]+$/, "شماره همراه اشتباه است")
          .length(10, "لطفا شماره همراه خود را بدون کد کشور و یا ۰ وارد کنید")
          .required("شماره همراه الزامی می باشد."),
        selectedCountry: Yup.string().required("کد کشور الزامی می باشد."),
      });
    } else {
      return Yup.object().shape({
        username: Yup.string()
          .email("ایمیل اشتباه است")
          .required("ایمیل الزامی است"),
      });
    }
  };
  const resolver = yupResolver(getValidationSchema());

  // ==============|| Hooks ||================= //
  const { forgotPassword } = useAuth();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues:
      forgotType === "PHONE"
        ? {
            username: "",
            selectedCountry: "98",
          }
        : {
            username: "",
          },
    resolver,
  });

  // ==============|| Handlers ||================= //
  const handleErrors = (errors: any) =>
    Object.entries(errors).map(([fieldName, error]: any) =>
      toast.error(error?.message, {
        position: "bottom-left",
      }),
    );
  const handleResetPassword = async (data) => {
    const body: ForgotPasswordRequest = {
      type: forgotType,
    };
    if (forgotType === "EMAIL") body.email = data.username;
    else
      body.phoneNumber = formatPhoneNumber(
        persianToEnglishNumbers(data.username),
        data.selectedCountry,
      );

    await forgotPassword(body).then(() =>
      navigate("/otp", { state: { type: "RESET_PASSWORD" } }),
    );
  };

  // ==============|| Render ||================= //
  return (
    <Auth>
      <section className={auth.container}>
        <Card className={auth.card}>
          <CardBody className={auth["card-body"]}>
            <h4 className={auth.title}>فراموشی رمز عبور</h4>
            <div className="text-center">بازیابی رمز عبور با</div>
            <div className={auth["login-type"]}>
              <div>
                <button
                  className={
                    forgotType === "PHONE" ? auth["login-type__active"] : ""
                  }
                  onClick={() => setForgotType("PHONE")}
                >
                  شماره همراه
                </button>
                <button
                  className={
                    forgotType === "EMAIL" ? auth["login-type__active"] : ""
                  }
                  onClick={() => setForgotType("EMAIL")}
                >
                  ایمیل
                </button>
              </div>
            </div>
            <form
              className={auth.form}
              onSubmit={handleSubmit(handleResetPassword, handleErrors)}
            >
              <Container>
                <Row className="gy-2 gx-0">
                  {forgotType === "PHONE" ? (
                    <>
                      <Col xs={8}>
                        <Controller
                          name="username"
                          control={control}
                          render={({
                            field: { name, value, onChange, ref },
                          }) => (
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
                                className: auth["phone-number"],
                              }}
                            />
                          )}
                        />
                      </Col>
                      <Col xs={4}>
                        <Controller
                          name="selectedCountry"
                          control={control}
                          render={({ field: { name, value, onChange } }) => (
                            <SelectCountry
                              name={name}
                              value={value as string}
                              onChange={onChange}
                              errors={errors}
                            />
                          )}
                        />
                      </Col>
                    </>
                  ) : (
                    <Col xs={12}>
                      <Controller
                        name="username"
                        control={control}
                        render={({ field: { name, value, onChange, ref } }) => (
                          <FloatInput
                            type="email"
                            name={name}
                            value={value}
                            label="ایمیل"
                            onChange={onChange}
                            inputProps={{
                              ref: ref,
                              size: "large",
                              prefix: <HiOutlineMail />,
                              status: errors?.[name]?.message
                                ? "error"
                                : undefined,
                              autoFocus: true,
                            }}
                          />
                        )}
                      />
                    </Col>
                  )}
                </Row>
                <Row>
                  <Col xs={12}>
                    <div className="auth-footer">
                      <div className="mb-3">
                        <Button
                          type="submit"
                          color="primary"
                          className={`${auth.submit} mt-5`}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <Spinner style={{ color: "white" }} />
                          ) : (
                            "ثبت درخواست"
                          )}
                        </Button>
                      </div>
                      <div className={`${auth.already} mt-1`}>
                        <Button color="link" tag="a" href="/login">
                          ورود به حساب کاربری
                        </Button>
                      </div>
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
