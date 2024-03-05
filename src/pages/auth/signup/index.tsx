import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CiMobile2 } from "react-icons/ci";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PiShieldCheckeredFill } from "react-icons/pi";
import toast from "react-hot-toast";

import Auth from "layouts/auth";
import { registerSchema } from "pages/auth/validationForms";
import { RegisterFormData } from "pages/auth/types";
import { useCreateUser } from "services/auth";
import SelectCountry from "components/SelectCountry";
import PasswordInput from "components/PasswordInput";
import FloatInput from "components/Input/FloatInput";
import { formatPhoneNumber, persianToEnglishNumbers } from "helpers";
import React, { useState } from "react";
import auth from "assets/scss/auth/auth.module.scss";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const registerRequest = useCreateUser();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const resolver = yupResolver(registerSchema);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormData>({
    mode: "onChange",
    defaultValues: {
      phoneNumber: "",
      password: "",
      selectedCountry: "98",
      terms: false,
      inviteCode: "",
    },
    resolver,
  });

  const handleRegister = async (data: RegisterFormData) => {
    setIsLoading(true);
      const phoneNumber = formatPhoneNumber(
        persianToEnglishNumbers(data.phoneNumber),
        data.selectedCountry,
      );
      const userData = {
        phoneNumber,
        password: data.password,
        inviteCode:  data.inviteCode.toUpperCase()
      };
      await registerRequest
        .mutateAsync(userData)
        .then((res) => {
          if (res) {
            navigate("/mobile-otp", {
              state: {
                phoneNumber: userData.phoneNumber,
              },
            });
            setIsLoading(false);
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
      }),
    );

  return (
    <Auth>
      <section className={auth.container}>
        <Card className={auth.card}>
          <CardBody className={auth["card-body"]}>
            <h4 className={auth.title}> ثبت نام در آرسونیکس</h4>

            <div className={auth.confidence}>
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
            {/* <p className={auth.text}> شماره تلفن خود را وارد کنید.</p> */}

            <form
              className={auth.form}
              onSubmit={handleSubmit(handleRegister, handleErrors)}
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
                      render={({ field }) => (
                        <PasswordInput hasShowHint={true} {...field} />
                      )}
                    />
                  </Col>
                  <Controller
                    name="inviteCode"
                    control={control}
                    render={({ field: { name, value, onChange, ref } }) => (
                      <div className="mb-3">
                        <Label htmlFor={name}>کد معرف:</Label>
                        <Input
                          type="text"
                          id={name}
                          name={name}
                          value={value}
                          onChange={onChange}
                          ref={ref}
                          status={errors?.[name]?.message ? "error" : undefined}
                        />
                      </div>
                    )}
                  />
                  <Col xs={12} className={auth.terms}>
                    <Controller
                      name="terms"
                      control={control}
                      render={({ field: { name, value, onChange, ref } }) => (
                        <div className="my-3">
                          <Input
                            style={{ marginRight: "4px", marginTop: "2px" }}
                            checked={value}
                            className="form-check-input"
                            type="checkbox"
                            name={name}
                            id={name}
                            ref={ref}
                            onChange={onChange}
                            status={
                              errors?.[name]?.message ? "error" : undefined
                            }
                          />
                          <Label htmlFor={name} style={{ fontSize: "13px" }}>
                            <Link to="/terms"> مقررات آرسونیکس</Link> را
                            خوانده‌ام و با آن موافقم.
                          </Label>
                        </div>
                      )}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <div className="auth-footer">
                      <div className="mb-3">
                        <Button
                          color="primary"
                          type="submit"
                          className={auth.submit}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <Spinner style={{ color: "white" }} />
                          ) : (
                            "ثبت نام"
                          )}
                        </Button>
                      </div>
                      <div className={auth.already}>
                        عضو هستم:
                        <Button color="link" tag="a" href="/login">
                          ورود
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

export default SignupPage;
