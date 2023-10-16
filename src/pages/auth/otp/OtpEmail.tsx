import { yupResolver } from "@hookform/resolvers/yup";
import Auth from "layouts/auth";
import { Controller, useForm } from "react-hook-form";
import { OtpSchema } from "../validationForms";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { resendOtp, sendOtp } from "services/auth";
import OtpInput from "components/OTP";

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
import { useEffect, useState } from "react";
const OtpEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state.email;

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
      method: "EMAIL",
    };
    await resendOtp(data);
  };

  const handleOTP = async (data: { code: string }) => {
    const formData = {
      code: data.code,
      type: "VERIFY_EMAIL",
      method: "EMAIL",
    };
    await sendOtp(formData).then((res) => {
      toast.error("ایمیل شما با موفقیت تایید شد.", {
        position: "bottom-left",
      });
      res && navigate("/login");
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
            <h4 className={auth.title}>تایید ایمیل</h4>
            <div className="auth-summary">
              <p className={auth.text}>
                کد تایید ارسال شده به
                <span className="d-inline-block">{email}</span>
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
