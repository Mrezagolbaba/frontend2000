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
import PasswordInput from "components/PasswordInput";
import SelectCountry from "components/SelectCountry";
import useAuth from "hooks/useAuth";
import { CiMobile2 } from "react-icons/ci";
import { Controller, useForm } from "react-hook-form";
import { HiOutlineMail } from "react-icons/hi";
import { LoginRequest } from "types/auth";
import { PiShieldCheckeredFill } from "react-icons/pi";
import { formatPhoneNumber, persianToEnglishNumbers } from "helpers";
import { toast } from "react-hot-toast";
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
        username: Yup.string()
          .matches(/^[\u06F0-\u06F90-9]+$/, "شماره همراه اشتباه است")
          .length(10, "لطفا شماره همراه خود را بدون کد کشور و یا ۰ وارد کنید")
          .required("شماره همراه الزامی می باشد."),
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
    formState: { errors, isSubmitting },
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
    setLoading(true);
    const body: LoginRequest = { password: data.password, type: loginType };
    if (loginType === "EMAIL") body.email = data.username;
    else {
      const phoneNumber = formatPhoneNumber(
        persianToEnglishNumbers(data.username),
        data.selectedCountry,
      );
      body.phoneNumber = phoneNumber;
    }
    await login(body)
      .then(() => {
        navigate("/otp", { state: { type: "AUTH", method: loginType } });
      })
      .catch((error) => {
        setLoading(false);
        error.data.message.forEach((m) =>
          toast.error(m, {
            position: "bottom-left",
          }),
        );
      });
  };
  const handleErrors = (errors: any) => {
    setLoading(false);
    Object.entries(errors).map(([fieldName, error]: any) =>
      toast.error(error?.message, {
        position: "bottom-left",
      }),
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
                <label>
                  <span>https://</span>arsonex.com
                </label>
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
                <Row className="gy-2 gx-0" style={{ position: "relative" }}>
                  {loginType === "PHONE" ? (
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
