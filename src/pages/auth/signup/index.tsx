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
import * as Yup from "yup";
import Auth from "layouts/auth";
import FloatInput from "components/Input/FloatInput";
import PasswordInput from "components/PasswordInput";
import SelectCountry from "components/SelectCountry";
import toast from "react-hot-toast";
import useAuth from "hooks/useAuth";
import { CiMobile2 } from "react-icons/ci";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { PiShieldCheckeredFill } from "react-icons/pi";
import { RegisterFormData } from "pages/auth/types";
import { formatPhoneNumber, persianToEnglishNumbers } from "helpers";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import auth from "assets/scss/auth/auth.module.scss";

export default function Register() {
  // ==============|| Validation ||================= //
  const registerSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .matches(/^[\u06F0-\u06F90-9]+$/, "شماره همراه اشتباه است")
      .length(10, "لطفا شماره همراه خود را بدون کد کشور و یا ۰ وارد کنید")
      .required("شماره همراه الزامی می باشد."),
    password: Yup.string()
      .min(8, "رمز عبور باید حداقل شامل 8 کاراکتر باشد.")
      .matches(/[a-z]/, "رمز عبور حداقل باید شامل یک حرف کوچک انگلیسی باشد.")
      .matches(/[A-Z]/, "رمز عبور باید حداقل شامل یک حرف بزرگ انگلیسی باشد.")
      .matches(/[0-9]/, "رمز عبور حداقل باید شامل یک عدد باشد.")
      .matches(
        /[!@#$%^&*()\-_=+[\]{}|;:',.<>/?\\]/,
        "رمز عبور باید حداقل شامل یک کاراکتر ویژه باشد (!@#$%^&*()-+).",
      )
      .required("رمز عبور الزامی است."),
    selectedCountry: Yup.string().required("کد کشور الزامی می باشد."),
    terms: Yup.boolean()
      .test(
        "required",
        "لطفا قوانین را مطالعه کنید و تایید کنید",
        (value) => value === true,
      )
      .required(),
    inviteCode: Yup.string().required("لطفا کد معرف خود را وارد کنید."),
  });
  const resolver = yupResolver(registerSchema);

  // ==============|| Hooks ||================= //
  const { register } = useAuth();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
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

  // ==============|| Handlers ||================= //
  const handleRegister = async (data: RegisterFormData) => {
    const phoneNumber = formatPhoneNumber(
      persianToEnglishNumbers(data.phoneNumber),
      data.selectedCountry,
    );
    const userData = {
      phoneNumber,
      password: data.password,
      inviteCode: data.inviteCode.toUpperCase(),
    };
    await register(userData)
      .then(() =>
        navigate("/otp", { state: { type: "AUTH", method: "PHONE" } }),
      )
      .catch((error) => {
        if (
          error.data.message.includes(
            "phoneNumber must be a valid phone number",
          )
        ) {
          toast.error("شماره همراه وارد شده صحیح نمی باشد.", {
            position: "bottom-left",
          });
        } else
          error.data.message.forEach((m) =>
            toast.error(m, {
              position: "bottom-left",
            }),
          );
      });
  };
  const handleErrors = (errors: any) =>
    Object.entries(errors).map(([fieldName, error]: any) =>
      toast.error(error?.message, {
        position: "bottom-left",
      }),
    );

  // ==============|| Render ||================= //
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
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
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
}
