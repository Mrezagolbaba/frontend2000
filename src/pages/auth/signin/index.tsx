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
import PasswordInput from "components/Input/PasswordInput";
import PhoneNumberInput from "components/Input/PhoneInput";
import useAuth from "hooks/useAuth";
import { Controller, useForm } from "react-hook-form";
import { HiOutlineMail } from "react-icons/hi";
import { LoginRequest } from "types/auth";
import { PiShieldCheckeredFill } from "react-icons/pi";
import { isPhoneValid } from "helpers";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import auth from "assets/scss/auth/auth.module.scss";

export default function LoginPage() {
  // ==============|| States ||================= //
  const [loginType, setLoginType] = useState<"PHONE" | "EMAIL">("PHONE");
  const [loading, setLoading] = useState(false);

  // ==============|| Validation ||================= //
  const getValidationSchema = () => {
    const schema = {
      password: Yup.string()
        .min(8, "اطلاعات وارد شده اشتباه است.")
        .matches(/[a-z]/, ",اطلاعات وارد شده اشتباه است.")
        .matches(/[A-Z]/, "اطلاعات وارد شده اشتباه است.")
        .matches(/[0-9]/, "اطلاعات وارد شده اشتباه است.")
        .matches(
          /[!@#$%^&*()\-_=+[\]{}|;:',.<>/?\\]/,
          "اطلاعات وارد شده اشتباه است.",
        )
        .required("رمز عبور الزامی است."),
    };
    if (loginType === "PHONE") {
      return Yup.object().shape({
        username: Yup.string().required("شماره همراه الزامی می باشد."),
        selectedCountry: Yup.string().required("کد کشور الزامی می باشد."),
        ...schema,
      });
    } else {
      return Yup.object().shape({
        username: Yup.string()
          .email("ایمیل اشتباه است")
          .required("ایمیل الزامی است"),
        ...schema,
      });
    }
  };
  const resolver = yupResolver(getValidationSchema());

  // ==============|| Hooks ||================= //
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues:
      loginType === "PHONE"
        ? {
          username: "",
          password: "",
          selectedCountry: "98",
        }
        : {
          username: "",
          password: "",
        },
    resolver,
  });

  // ==============|| Handlers ||================= //
  const handleLogin = async (data) => {
    const body: LoginRequest = { password: data.password, type: loginType };
    const isValid = isPhoneValid(data.username);
    if (!isValid && loginType === "PHONE") {
      Notify({ type: "error", text: "شماره همراه اشتباه است." });
      return;
    }
    if (loginType === "EMAIL") body.email = data.username;
    else {
      body.phoneNumber = data.username;
    }
    await login(body)
      .then(() => {
        navigate("/otp", { state: { type: "AUTH", method: loginType } });
      })
      .catch((error) => {
        setLoading(false);
        error.data.message.forEach((m) => Notify({ type: "error", text: m }));
      });
  };
  const handleErrors = (errors: any) => {
    setLoading(false);
    Object.entries(errors).map(([fieldName, error]: any) =>
      Notify({ type: "error", text: error?.message }),
    );
  };
  const changeMethod = useCallback(() => {
    if (loginType === "EMAIL")
      reset({
        username: "",
        password: "",
      });
    else reset({ username: "", password: "", selectedCountry: "98" });
  }, [loginType, reset]);

  // ==============|| Life Cycle ||================= //
  useEffect(() => changeMethod(), [changeMethod]);

  // ==============|| Render ||================= //
  return (
    <Auth>
      <section className={auth.container}>
        <Card className={auth.card}>
          <CardBody className={auth["card-body"]}>
            <h4 className={auth.title}>ورود به حساب کاربری</h4>
            <div className={`${auth.confidence} mb-4`}>
              <p>از یکسان بودن آدرس صفحه با آدرس زیر مطمئن شوید.</p>
              <div className="d-ltr">
                <span>
                  <span>https://</span>arsonex.com
                </span>
                <span className="icon">
                  <PiShieldCheckeredFill />
                </span>
              </div>
            </div>
            <form
              className={auth.form}
              onSubmit={handleSubmit(handleLogin, handleErrors)}
            >
              <Container>
                <Row className="gy-2 gx-0">
                  {loginType === "PHONE" ? (
                    <Col>
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
                  <Col xs={12}>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field: { name, value, onChange } }) => (
                        <PasswordInput
                          name={name}
                          value={value}
                          onChange={onChange}
                          errors={errors}
                        />
                      )}
                    />
                  </Col>
                  <Col xs={12}>
                    <div className={auth.forgotLink}>
                      <Button color="link" tag="a" href="/forget-password">
                        رمز عبور را فراموش کرده&zwnj;ام!
                      </Button>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <div className="auth-footer">
                      <div className="mb-3">
                        <Button
                          type="submit"
                          color="primary"
                          className={auth.submit}
                          disabled={loading}
                        >
                          {loading ? (
                            <Spinner style={{ color: "white" }} />
                          ) : (
                            "ورود به حساب"
                          )}
                        </Button>
                      </div>
                      <div className="mb3">
                        <Button
                          color="primary"
                          outline
                          className={auth.submit}
                          onClick={() => {
                            loginType === "EMAIL"
                              ? setLoginType("PHONE")
                              : setLoginType("EMAIL");
                          }}
                        >
                          {loginType === "EMAIL"
                            ? "ورود با استفاده از موبایل"
                            : "ورود با استفاده از ایمیل"}
                        </Button>
                      </div>
                      <div className={auth.already}>
                        عضو نیستم:{" "}
                        <Button color="link" tag="a" href="/register">
                          ثبت نام
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
