import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";

import { useLogin } from "services/auth";
import Auth from "layouts/auth";
import { loginEmailSchema } from "pages/auth/validationForms";
import { LoginEmailFormData } from "pages/auth/types";
import FloatInput from "components/Input/FloatInput";
import PasswordInput from "components/PasswordInput";
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
import { HiOutlineMail } from "react-icons/hi";
import { useState } from "react";

const EmailSignin = () => {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const resolver = yupResolver(loginEmailSchema);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginEmailFormData>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver,
  });

  const handleLogin = async (data: LoginEmailFormData) => {
    setIsLoading(true);
    const userData = {
      email: data.email,
      password: data.password,
      type: "EMAIL",
    };

    await loginMutation
      .mutateAsync(userData)
      .then((res) => {
        if (res) {
          setIsLoading(false);
          navigate("/email-otp", {
            state: {
              email: userData.email,
              page: "login",
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
                  <Col xs={12}>
                    <Controller
                      name="email"
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
                  <Col xs={12}>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => <PasswordInput {...field} />}
                    />
                  </Col>
                  <Col xs={12}>
                    <div className={auth.forgotLink}>
                      <Button
                        color="link"
                        tag="a"
                        href="/forget-password"
                      >
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
                          href="/login"
                        >
                          ورود با استفاده از شماره همراه
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

export default EmailSignin;
