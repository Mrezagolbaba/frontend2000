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
import OtpInput from "react-otp-input";
import useAuth from "hooks/useAuth";
import { AlertWarning } from "components/AlertWidget";
import { Controller, useForm } from "react-hook-form";
import { OTPRequest, ResendOTPRequest } from "types/auth";
import { setUser } from "store/reducers/features/user/userSlice";
import { setVerifyLogin } from "store/reducers/jwtAuth";
import { toast } from "react-hot-toast";
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
  const handleResend = () => {
    if (isSuccess && user) {
      const data: ResendOTPRequest = {
        type,
        method: user.otpMethod,
      };
      resendOtpRequest(data);
    }
  };
  const handleOTP = async (data: { code: string }) => {
    if (isSuccess && user) {
      dispatch(setUser(user));
      const body: OTPRequest = {
        code: persianToEnglishNumbers(data.code),
        type,
        method: method,
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
          dispatch(setVerifyLogin());
          navigate("/dashboard");
        }
      });
    }
  };
  const handleErrors = (errors: any) => {
    setValue("code", "");
    toast.error(errors?.code?.message, {
      position: "bottom-left",
    });
  };
  const formatTime = () => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  const renderCaption = () => {
    if (type === "VERIFY_EMAIL") {
      return maskingString(user?.email, 1, 14);
    }
    switch (user?.otpMethod) {
      case "EMAIL":
        return maskingString(user?.email, 1, 14);

      case "AUTHENTICATOR":
        return "Google Authenticator";

      case "PHONE":
      default:
        return PhoneNumberMask({
          phoneNumber: user?.phoneNumber || phoneNumber,
        });
    }
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
                    text="ایمیل شما تایید نشده است. برای ادامه فعالیت خود لطفا کد تایید ارسال شده به ایمیل خود را وارد کنید."
                  />
                </div>
              )}
              <p className={auth.text}>
                کد تایید ارسال شده به
                <span className="d-inline-block">{renderCaption()}</span>
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
                            disabled={
                              resendLoading || isLoading || isSubmitting
                            }
                            onClick={handleResend}
                          >
                            ارسال مجدد کد
                          </Button>
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
}
