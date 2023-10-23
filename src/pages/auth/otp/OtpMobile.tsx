import { useNavigate, useLocation } from "react-router-dom";

import { PhoneNumberMask } from "helpers";
import OtpInput from "components/OTP";
import { resendOtp } from "services/auth";
import Auth from "layouts/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { OtpSchema } from "pages/auth/validationForms";
import { toast } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { useSendOtp } from "services/auth/otp";
import { useGetMe } from "services/auth/user";
import { useAppDispatch } from "redux/hooks";
import { setUser } from "redux/features/user/userSlice";

import auth from "assets/scss/auth/auth.module.scss";
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

  const sendOtp = useSendOtp();
  const getMe = useGetMe();

  const [timeInSeconds, setTimeInSeconds] = useState(120);

  const resolver = yupResolver(OtpSchema);
  const {
    handleSubmit,
    setValue,
    control,
    formState: { isLoading, isSubmitting },
  } = useForm<{ code: string }>({
    mode: "onChange",
    defaultValues: {
      code: "",
    },
    resolver,
  });

  const handleResend = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const data = {
      type: "AUTH",
      method: "PHONE",
    };
    await resendOtp(data);
  };

  const handleOTP = async (data: { code: string }) => {
    const formData = {
      code: data.code,
      type: "AUTH",
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
            else if (res?.firstTierVerified) navigate("/dashboard");
            else navigate("/information");
          })
          .catch(() => {
            navigate("/information");
          });
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
                      render={() => (
                        <OtpInput onChange={(code) => setValue("code", code)} />
                      )}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <div className="auth-footer">
                      <div className="mb-3">
                        {timeInSeconds > 0 ? (
                          <span className="auth-counter text-start d-ltr">
                            {formatTime()}
                          </span>
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
