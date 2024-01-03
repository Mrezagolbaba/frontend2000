import Auth from "layouts/auth";
import React, { useState } from "react";
import auth from "assets/scss/auth/auth.module.scss";
import { Button, Card, CardBody, Col, Container, Spinner } from "reactstrap";
import { Row } from "antd";
import { Controller, useForm } from "react-hook-form";
import FloatInput from "components/Input/FloatInput";
import { HiOutlineMail } from "react-icons/hi";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgetPassWithEmailSchema } from "../validationForms";
import { useForgetPassword } from "services/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const WithEmail = () => {
  const navigate = useNavigate();
  const forgetPasswordMutation = useForgetPassword();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const resolver = yupResolver(forgetPassWithEmailSchema);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{ email: string }>({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
    resolver,
  });

  const handleErrors = (errors: any) =>
    Object.entries(errors).map(([fieldName, error]: any) =>
      toast.error(error?.message, {
        position: "bottom-left",
      }),
    );
  const handleResetPassword = async (data) => {
    setIsLoading(true);
    try {
      await forgetPasswordMutation
        .mutateAsync({ email: data.email, type: "EMAIL" })
        .then((res) => {
          navigate("/reset-password", {
            state: {
              data: res.data,
            },
          });
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Auth>
      <section className={auth.container}>
        <Card className={auth.card}>
          <CardBody className={auth["card-body"]}>
            <h4 className={auth.title}>فراموشی رمز عبور</h4>
            <p className={auth.text}>ایمیل خود را وارد کنید</p>
            <form
              className={auth.form}
              onSubmit={handleSubmit(handleResetPassword, handleErrors)}
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
                          label=" ایمیل"
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
                </Row>
                <Row>
                  <Col xs={12}>
                    <div className="auth-footer">
                      <div className="mb-3">
                        <Button
                          type="submit"
                          color="primary"
                          className={`${auth.submit} mt-5`}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <Spinner style={{ color: "white" }} />
                          ) : (
                            "ثبت درخواست"
                          )}
                        </Button>
                      </div>
                      <div className={`${auth.already} mt-5`}>
                        <Button color="link" tag="a" href="/forget-password">
                          بازگردانی رمز عبور با شماره همراه
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
};

export default WithEmail;
