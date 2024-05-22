import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Spinner,
} from "reactstrap";
import {
  PhoneNumberMask,
  maskingString,
  persianToEnglishNumbers,
} from "helpers";
import * as Yup from "yup";
import Auth from "layouts/auth";
import Notify from "components/Notify";
import OtpInput from "react-otp-input";
import useAuth from "hooks/useAuth";
import { AlertWarning } from "components/AlertWidget";
import { Controller, useForm } from "react-hook-form";
import { OTPRequest, ResendOTPRequest } from "types/auth";
import { setUser } from "store/reducers/features/user/userSlice";
import { setVerifyLogin } from "store/reducers/jwtAuth";
import { useDispatch } from "store/store";
import { useEffect, useState } from "react";
import { useGetMeQuery } from "store/api/user";
import { useNavigate, useLocation } from "react-router-dom";
import { useResendOtpMutation } from "store/api/auth";
import { yupResolver } from "@hookform/resolvers/yup";

import auth from "assets/scss/auth/auth.module.scss";
import otpStyle from "assets/scss/components/Input/OTPInput.module.scss";

export default function Otp() {
  // ==============|| Validation ||================= //
  const OtpSchema = Yup.object().shape({
    code: Yup.string().required("کد ارسالی به درستی وارد نشده است."),
  });
  const resolver = yupResolver(OtpSchema);

  // ==============|| States ||================= //
  const [timeInSeconds, setTimeInSeconds] = useState(120);
  const [switchType, setSwitchType] = useState<"PHONE" | "EMAIL" | null>(null);

  // ==============|| Hooks ||================= //
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { otp } = useAuth();
  const [resendOtpRequest, { isLoading: resendLoading }] =
    useResendOtpMutation();
  const { data: user, isLoading, isSuccess } = useGetMeQuery();
  const {
    handleSubmit,
    setValue,
    control,
    formState: { isSubmitting },
  } = useForm<{ code: string }>({
    mode: "onChange",
    defaultValues: {
      code: "",
    },
    resolver,
  });

  // ==============|| Variables ||================= //
  const { phoneNumber, type, method } = location.state;

  // ==============|| Handlers ||================= //
  const handleResend = (sendWay?: "PHONE" | "EMAIL") => {
    if (isSuccess && user) {
      setTimeInSeconds(120);
      const data: ResendOTPRequest = {
        type,
        method: user.otpMethod,
      };
      if (sendWay) {
        setSwitchType(sendWay);
        Notify({
          type: "success",
          text: `کد تایید به ${sendWay === "EMAIL" ? "ایمیل" : "شماره همراه"} ارسال شد.`,
        });
        data.type = "AUTH";
        data.method = sendWay;
      }
      resendOtpRequest(data);
    }
  };
  const handleOTP = async (data: { code: string }) => {
    if (isSuccess && user) {
      dispatch(setUser(user));
      const body: OTPRequest = {
        code: persianToEnglishNumbers(data.code),
        type,
        method: switchType ? switchType : method,
      };
      await otp(body).then(() => {
        setValue("code", "");
        if (type === "RESET_PASSWORD") navigate("/reset-password");
        else if (!user?.firstTierVerified && type === "AUTH")
          navigate("/information");
        else if (!user?.emailVerified && type === "AUTH") {
          resendOtpRequest({
            type: "VERIFY_EMAIL",
            method: "EMAIL",
          });
          navigate("/otp", {
            state: {
              type: "VERIFY_EMAIL",
              method: "EMAIL",
            },
          });
        } else {
          localStorage.setItem("isInitialized", "true");
          dispatch(setVerifyLogin());
          navigate("/dashboard");
        }
      });
    }
  };
  const handleErrors = (errors: any) => {
    setValue("code", "");
    Notify({ type: "error", text: errors?.code?.message });
  };
  const formatTime = () => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  const renderCaption = () => {
    if (
      (type === "AUTH" && (user?.otpMethod === "PHONE" || !user?.otpMethod)) ||
      (type === "RESET_PASSWORD" && method === "PHONE")
    )
      return (
        <p className={auth.text}>
          کد تایید ارسال شده به
          <span className="d-inline-block">
            {PhoneNumberMask({
              phoneNumber: user?.phoneNumber || phoneNumber,
            })}
          </span>
          را وارد کنید.
        </p>
      );
    else if (type === "AUTH" && user?.otpMethod === "AUTHENTICATOR")
      return (
        <p className={auth.text}>
          کد تایید ساخته شده با
          <span className="d-inline-block">Google Authenticator</span>
          را وارد کنید.
        </p>
      );
    else
      return (
        <p className={auth.text}>
          کد تایید ارسال شده به
          <span className="d-inline-block">
            {maskingString(user?.email, 1, 14)}
          </span>
          را وارد کنید.
        </p>
      );
  };

  const renderResent = () => {
    if (!phoneNumber && type === "AUTH") {
      if (user?.otpMethod === "AUTHENTICATOR")
        return (
          <>
            <Button
              color="link"
              className={auth.link}
              disabled={resendLoading || isLoading || isSubmitting}
              onClick={() => handleResend("PHONE")}
            >
              ارسال کد به شماره همراه
            </Button>
            <Button
              color="link"
              className={auth.link}
              disabled={resendLoading || isLoading || isSubmitting}
              onClick={() => handleResend("EMAIL")}
            >
              ارسال کد به ایمیل
            </Button>
          </>
        );
      else if (user?.otpMethod === "EMAIL")
        return (
          <>
            <Button
              color="link"
              className={auth.link}
              disabled={resendLoading || isLoading || isSubmitting}
              onClick={() => handleResend()}
            >
              ارسال مجدد کد
            </Button>
            <Button
              color="link"
              className={auth.link}
              disabled={resendLoading || isLoading || isSubmitting}
              onClick={() => handleResend("PHONE")}
            >
              ارسال کد به شماره همراه
            </Button>
          </>
        );
      else
        return (
          <>
            <Button
              color="link"
              className={auth.link}
              disabled={resendLoading || isLoading || isSubmitting}
              onClick={() => handleResend()}
            >
              ارسال مجدد کد
            </Button>
            <Button
              color="link"
              className={auth.link}
              disabled={resendLoading || isLoading || isSubmitting}
              onClick={() => handleResend("EMAIL")}
            >
              ارسال کد به ایمیل
            </Button>
          </>
        );
    } else
      return (
        <Button
          color="link"
          className={auth.link}
          disabled={resendLoading || isLoading || isSubmitting}
          onClick={() => handleResend()}
        >
          ارسال مجدد کد
        </Button>
      );
  };

  // ==============|| Life Cycle ||================= //
  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timeInSeconds > 0) {
        setTimeInSeconds(timeInSeconds - 1);
      }
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(timerInterval);
  }, [timeInSeconds]);

  // ==============|| Render ||================= //

  return (
    <Auth>
      <section className={auth.container}>
        <Card className={auth.card}>
          <CardBody className={auth["card-body"]}>
            <h4 className={auth.title}>
              {method === "EMAIL" ? "تایید ایمیل" : "تایید شماره همراه"}
            </h4>
            <div className="auth-summary">
              {type === "VERIFY_EMAIL" && (
                <div className="text-center">
                  <AlertWarning
                    hasIcon
                    text="برای اتمام ثبت نام، ایمیل خود را تایید کنید، پوشه Spam را در صورت مشاهده نکردن ایمیل در Inbox بررسی کنید."
                  />
                </div>
              )}
              {isLoading ? (
                <div className="placeholder-glow">
                  <div
                    className="placeholder col-12 rounded"
                    style={{ height: "20px" }}
                  />
                </div>
              ) : (
                renderCaption()
              )}
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
                          shouldAutoFocus={true}
                          renderInput={(props) => (
                            <input {...props} type="text" inputMode="numeric" />
                          )}
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
                          renderResent()
                        )}
                        <Button
                          type="submit"
                          color="primary"
                          disabled={
                            timeInSeconds <= 0 ||
                            isLoading ||
                            resendLoading ||
                            isSubmitting
                          }
                          className={auth.submit}
                        >
                          {isSubmitting ? (
                            <Spinner style={{ color: "white" }} />
                          ) : (
                            "ارسال"
                          )}
                        </Button>
                      </div>
                      {/* <div className="mt-5">
                        <Button
                          className={auth.link}
                          color="link"
                          onClick={() => navigate(-1)}
                        >
                          {method === "EMAIL"
                            ? "ویرایش ایمیل"
                            : "ویرایش شماره همراه"}
                        </Button>
                      </div> */}
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
