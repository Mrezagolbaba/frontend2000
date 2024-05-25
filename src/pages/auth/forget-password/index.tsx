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
import Notify from "components/Notify";
import PhoneNumberInput from "components/PhoneInput";
import useAuth from "hooks/useAuth";
import { Controller, useForm } from "react-hook-form";
import { ForgotPasswordRequest } from "types/auth";
import { HiOutlineMail } from "react-icons/hi";
import { isPhoneValid } from "helpers";
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
        username: Yup.string().required("شماره همراه الزامی می باشد."),
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
    setValue,
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
      Notify({ type: "error", text: error?.message }),
    );
  const handleResetPassword = async (data) => {
    const isValid = isPhoneValid(data.username);
    if (!isValid) {
      Notify({ type: "error", text: "شماره همراه اشتباه است." });
      return;
    }
    const body: ForgotPasswordRequest = {
      type: forgotType,
    };
    if (forgotType === "EMAIL") body.email = data.username;
    else body.phoneNumber = data.username;

    await forgotPassword(body).then(() =>
      navigate("/otp", {
        state: { type: "RESET_PASSWORD", method: forgotType },
      }),
    );
  };

  // ==============|| Render ||================= //
  return (
    <Auth>
      <section className={auth.container}>
        <Card className={auth.card}>
          <CardBody className={auth["card-body"]}>
            <h4 className={auth.title}>فراموشی رمز عبور</h4>
            <form
              className={auth.form}
              onSubmit={handleSubmit(handleResetPassword, handleErrors)}
            >
              <Container>
                <Row className="gy-2 gx-0">
                  {forgotType === "PHONE" ? (
                    <Col xs={12}>
                      <Controller
                        name="username"
                        control={control}
                        render={({ field: { name, value, onChange } }) => (
                          <PhoneNumberInput
                            name={name}
                            value={value}
                            label="شماره همراه"
                            onChange={onChange}
                          />
                        )}
                      />
                    </Col>
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
                      <div className="mb3">
                        <Button
                          color="primary"
                          outline
                          className={auth.submit}
                          onClick={() => {
                            forgotType === "EMAIL"
                              ? setForgotType("PHONE")
                              : setForgotType("EMAIL");
                          }}
                        >
                          {forgotType === "EMAIL"
                            ? "بازیابی رمز عبور با استفاده از موبایل"
                            : "بازیابی رمز عبور با استفاده از ایمیل"}
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
