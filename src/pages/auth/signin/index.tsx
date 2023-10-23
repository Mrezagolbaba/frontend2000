import React, { useState } from "react";
import { CiMobile2 } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";

import { formatPhoneNumber, persianToEnglishNumbers } from "helpers";
import { useLogin } from "services/auth";
import Auth from "layouts/auth";
import { loginSchema } from "pages/auth/validationForms";
import { LoginFormData } from "pages/auth/types";
import FloatInput from "components/Input/FloatInput";
import PasswordInput from "components/PasswordInput";
import SelectCountry from "components/SelectCountry";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Spinner,
} from "reactstrap";

import auth from "assets/scss/auth/auth.module.scss";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const resolver = yupResolver(loginSchema);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: "onChange",
    defaultValues: {
      phoneNumber: "",
      password: "",
      selectedCountry: "98",
    },
    resolver,
  });

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    const phoneNumber = formatPhoneNumber(
      persianToEnglishNumbers(data.phoneNumber),
      data.selectedCountry
    );
    const userData = {
      phoneNumber,
      password: data.password,
      type: "PHONE",
    };

    await loginMutation
      .mutateAsync(userData)
      .then((res) => {
        if (res) {
          setIsLoading(false);
          navigate("/mobile-otp", {
            state: {
              phoneNumber: userData.phoneNumber,
            },
          });
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
    <Auth>
      <section className={auth.container}>
        <Card className={auth.card}>
          <CardBody className={auth["card-body"]}>
            <h4 className={auth.title}>ورود به حساب کاربری</h4>
            <p className={auth.text}> شماره تلفن خود را وارد کنید</p>

            <form
              className={auth.form}
              onSubmit={handleSubmit(handleLogin, handleErrors)}
            >
              <Container>
                <Row className="gy-2 gx-0">
                  <Col xs={8}>
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
                      render={({ field }) => <SelectCountry {...field} />}
                    />
                  </Col>
                  <Col xs={12}>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => <PasswordInput {...field} />}
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
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <Spinner style={{ color: "white" }} />
                          ) : (
                            "ورود به حساب"
                          )}
                        </Button>
                        <Button
                          type="button"
                          color="primary"
                          outline
                          className={`${auth.submit} mt-3`}
                          tag="a"
                          href="/login-email"
                        >
                          ورود با استفاده از ایمیل
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
};

export default LoginPage;
