import { useNavigate, useLocation } from "react-router-dom";

import { PhoneNumberMask, persianToEnglishNumbers } from "helpers";
import OtpInput from "react-otp-input";
import { resendOtp } from "services/auth";
import Auth from "layouts/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { OtpSchema } from "pages/auth/validationForms";
import { toast } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { useSendOtp } from "services/auth/otp";
import { useGetMe } from "services/auth/user";
import { useAppDispatch } from "store/hooks";
import { setUser } from "store/reducers/features/user/userSlice";

import auth from "assets/scss/auth/auth.module.scss";
import otpStyle from "assets/scss/components/Input/OTPInput.module.scss";

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Spinner,
} from "reactstrap";

const OtpMobile: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { phoneNumber, redirectTo, token } = location.state;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendOtp = useSendOtp();
  const getMe = useGetMe();

  const [timeInSeconds, setTimeInSeconds] = useState(120);

  const resolver = yupResolver(OtpSchema);
  const { handleSubmit, setValue, control } = useForm<{ code: string }>({
    mode: "onChange",
    defaultValues: {
      code: "",
    },
    resolver,
  });

  const handleResend = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setIsLoading(true);
    e.preventDefault();
    const data = {
      type: "AUTH",
      method: "PHONE",
    };
    await resendOtp(data).then(() => {
      setTimeInSeconds(120);
      setIsLoading(false);
    });
  };

  const handleOTP = async (data: { code: string }) => {
    setIsLoading(true);
    const formData = {
      code: persianToEnglishNumbers(data.code),
      type: redirectTo === "/reset-password" ? "RESET_PASSWORD" : "AUTH",
      method: "PHONE",
    };
    await sendOtp.mutateAsync(formData).then((res: any) => {
      if (res) {
        getMe
          .mutateAsync(null)
          .then((res: any) => {
            dispatch(setUser(res));
            if (redirectTo) {
              navigate(redirectTo, { state: { token } });
            }
            // if (res?.firstTierVerified) navigate("/dashboard");
            else if (!res?.firstTierVerified)
              navigate("/information", {
                state: {
                  phoneNumber,
                },
              });
            else if (!res?.emailVerified) {
              resendOtp({
                type: "VERIFY_EMAIL",
                method: "EMAIL",
              });
              navigate("/email-otp", {
                state: {
                  email: res?.email,
                  method: "VERIFY_EMAIL",
                },
              });
            } else navigate("/dashboard");
            setIsLoading(false);
          })
          .catch(() => {
            navigate("/information");
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    });
  };

  const handleErrors = (errors: any) => {
    toast.error(errors?.code?.message, {
      position: "bottom-left",
    });
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timeInSeconds > 0) {
        setTimeInSeconds(timeInSeconds - 1);
      }
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(timerInterval);
  }, [timeInSeconds]);

  const formatTime = () => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <Auth>
      <section className={auth.container}>
        <Card className={auth.card}>
          <CardBody className={auth["card-body"]}>
            <h4 className={auth.title}>تایید شماره همراه</h4>
            <div className="auth-summary">
              <p className={auth.text}>
                کد تایید ارسال شده به
                <span className="d-inline-block">
                  {PhoneNumberMask({
                    phoneNumber,
                  })}
                </span>
                را وارد کنید.
              </p>
            </div>

            <form
              className={auth.form}
              onSubmit={handleSubmit(handleOTP, handleErrors)}
            >
              <Container>
                <Row className="gy-2 gx-0">
                  <Col xs={12} className="my-5">
                    <Controller
                      name="code"
                      control={control}
                      render={({ field: { value } }) => (
                        <OtpInput
                          containerStyle={otpStyle["otp-container"]}
                          value={value}
                          onChange={(code) => {
                            setValue("code", code);
                            code.length === 6 && handleOTP({ code });
                          }}
                          inputStyle={otpStyle["otp-input"]}
                          numInputs={6}
                          renderSeparator={undefined}
                          placeholder="-"
                          shouldAutoFocus={true}
                          renderInput={(props) => <input {...props} />}
                        />
                      )}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <div className="auth-footer">
                      <div className="mb-3">
                        {timeInSeconds > 0 ? (
                          <div className="d-flex justify-content-center">
                            <span className="auth-counter text-start d-ltr">
                              {formatTime()}
                            </span>
                          </div>

                        ) : (
                          <Button
                            color="link"
                            className={auth.link}
                            onClick={handleResend}
                          >
                            ارسال مجدد کد
                          </Button>
                        )}
                        <Button
                          type="submit"
                          color="primary"
                          disabled={timeInSeconds <= 0}
                          className={auth.submit}
                        >
                          {isLoading ? (
                            <Spinner style={{ color: "white" }} />
                          ) : (
                            "ارسال"
                          )}
                        </Button>
                      </div>
                      <div className="mt-5">
                        <Button
                          className={auth.link}
                          color="link"
                          onClick={() => navigate(-1)}
                        >
                          ویرایش شماره همراه
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
export default OtpMobile;
