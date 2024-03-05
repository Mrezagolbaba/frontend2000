import { yupResolver } from "@hookform/resolvers/yup";
import Auth from "layouts/auth";
import { Controller, useForm } from "react-hook-form";
import { OtpSchema } from "../validationForms";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { resendOtp, sendOtp } from "services/auth";

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Spinner,
} from "reactstrap";
import { useEffect, useState } from "react";
import { maskingString, persianToEnglishNumbers } from "helpers";
import OTPInput from "react-otp-input";
import { AlertWarning } from "components/AlertWidget";

import auth from "assets/scss/auth/auth.module.scss";
import otpStyle from "assets/scss/components/Input/OTPInput.module.scss";

const OtpEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, page, method } = location.state;

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
  const handleErrors = (errors: any) => {
    toast.error(errors?.code?.message, {
      position: "bottom-left",
    });
  };
  const handleResend = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const data = {
      type: "VERIFY_EMAIL",
      method: "EMAIL",
    };
    await resendOtp(data)
      .then((res) => {
        setTimeInSeconds(120);
      })
      .catch((err) => handleErrors(err));
  };

  const handleOTP = async (data: { code: string }) => {
    const formData = {
      code: persianToEnglishNumbers(data.code),
      type: page === "login" ? "AUTH" : "VERIFY_EMAIL",
      method: "EMAIL",
    };
    await sendOtp(formData)
      .then((res) => {
        res && navigate("/dashboard");
      })
      .catch((err) => handleErrors(err));
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
            <h4 className={auth.title}>تایید ایمیل</h4>
            <div className="auth-summary">
              {page !== "login" && (
                <AlertWarning
                  hasIcon
                  text="ایمیل شما تایید نشده است. برای ادامه فعالیت خود لطفا کد تایید ارسال شده به ایمیل خود را وارد کنید."
                />
              )}
              <p className={auth.text}>
                کد تایید ارسال شده به
                <span className="d-inline-block">
                  {page === "login" ? maskingString(email, 1, 14) : email}
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
                        <OTPInput
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
                          ویرایش ایمیل
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
export default OtpEmail;
