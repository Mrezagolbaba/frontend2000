import { useState } from "react";
import { CiMobile2 } from "react-icons/ci";
import { useForgetPassword } from "services/auth";
import Auth from "layouts/auth";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Spinner,
} from "reactstrap";
import FloatInput from "components/Input/FloatInput";
import SelectCountry from "components/SelectCountry";
import { formatPhoneNumber, persianToEnglishNumbers } from "helpers";
import { useNavigate } from "react-router-dom";
import auth from "assets/scss/auth/auth.module.scss";
import { forgetPassSchema } from "../validationForms";

const Forget = () => {
  const navigate = useNavigate();
  const forgetPasswordMutation = useForgetPassword();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const resolver = yupResolver(forgetPassSchema);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      phoneNumber: "",
      selectedCountry: "98",
    },
    resolver,
  });

  const handleErrors = (errors: any) =>
    Object.entries(errors).map(([fieldName, error]: any) =>
      toast.error(error?.message, {
        position: "bottom-left",
      })
    );
  const handleResetPassword = async (data) => {
    setIsLoading(true);
    const phoneNumber = formatPhoneNumber(
      persianToEnglishNumbers(data.phoneNumber),
      data.selectedCountry
    );
    try {
      await forgetPasswordMutation
        .mutateAsync({ phoneNumber, type: "PHONE" })
        .then((res) => {
          navigate("/mobile-otp", {
            state: {
              data: res.data,
              redirectTo: "/reset-password",
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
            <p className={auth.text}>شماره تلفن همراه خود را وارد کنید</p>
            <form
              className={auth.form}
              onSubmit={handleSubmit(handleResetPassword, handleErrors)}
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
                        <Button
                          color="link"
                          tag="a"
                          href="/forget-password-with-email"
                        >
                          بازگردانی رمز عبور با ایمیل
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
export default Forget;
