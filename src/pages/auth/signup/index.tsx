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
import Notify from "components/Notify";
import PasswordInput from "components/Input/PasswordInput";
import PhoneNumberInput from "components/Input/PhoneInput";
import useAuth from "hooks/useAuth";
import { Controller, useForm } from "react-hook-form";
import { FaAngleUp } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { PiShieldCheckeredFill } from "react-icons/pi";
import { RegisterFormData } from "pages/auth/types";
import { isEmpty } from "lodash";
import { isPhoneValid } from "helpers";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import auth from "assets/scss/auth/auth.module.scss";

export default function Register() {
  // ==============|| State ||================= //
  const [openRefCode, setOpenRefCode] = useState(true);
  // ==============|| Validation ||================= //
  const registerSchema = Yup.object().shape({
    phoneNumber: Yup.string().required("شماره همراه الزامی می باشد."),
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
    referralCode: Yup.string().required("لطفا کد معرف خود را وارد کنید."),
  });
  const resolver = yupResolver(registerSchema);

  // ==============|| Hooks ||================= //
  const { register } = useAuth();
  const navigate = useNavigate();
  const { code } = useParams();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    mode: "onChange",
    defaultValues: {
      phoneNumber: "",
      password: "",
      selectedCountry: "98",
      terms: false,
      referralCode: "",
    },
    resolver,
  });

  // ==============|| Handlers ||================= //
  const handleRegister = async (data: RegisterFormData) => {
    const isValid = isPhoneValid(data.phoneNumber);
    if (!isValid) {
      Notify({ type: "error", text: "شماره همراه اشتباه است." });
      return;
    }
    const userData = {
      phoneNumber: data.phoneNumber,
      password: data.password,
      referralCode: data.referralCode,
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
        )
          Notify({
            type: "error",
            text: "شماره همراه وارد شده صحیح نمی باشد.",
          });
        else
          error.data.message.forEach((m) => Notify({ type: "error", text: m }));
      });
  };
  const handleErrors = (errors: any) =>
    Object.entries(errors).map(([fieldName, error]: any) =>
      Notify({ type: "error", text: error?.message }),
    );
  const handleParams = useCallback(() => {
    if (code && !isEmpty(code)) setValue("referralCode", code);
  }, [code, setValue]);

  // ==============|| Life Cycle ||================= //
  useEffect(() => handleParams(), [handleParams]);

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
                  <Col xs={12}>
                    <Controller
                      name="phoneNumber"
                      control={control}
                      render={({ field: { name, value, onChange } }) => (
                        <PhoneNumberInput
                          name={name}
                          value={value}
                          label="شماره همراه"
                          onChange={onChange}
                        />
                      )}
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
                  <Col xs={12}>
                    <Controller
                      name="referralCode"
                      control={control}
                      render={({ field: { name, value, onChange } }) => (
                        <div className={`${auth["ref-code"]} mb-3`}>
                          <motion.label
                            htmlFor={name}
                            onClick={() => setOpenRefCode((oldVal) => !oldVal)}
                          >
                            کد معرف:
                          </motion.label>
                          <div>
                            <motion.span
                              className="icon"
                              initial={false}
                              animate={{ rotate: openRefCode ? 0 : 180 }}
                              transition={{ duration: 0.3 }}
                            >
                              <FaAngleUp />
                            </motion.span>
                          </div>
                          <motion.div
                            initial={false}
                            animate={{ height: openRefCode ? "auto" : 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            style={{ overflow: "hidden" }}
                          >
                            <motion.input
                              className="form-control ref-input"
                              type="text"
                              id={name}
                              name={name}
                              value={value}
                              onChange={onChange}
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              // status={
                              //   errors?.[name]?.message ? "error" : undefined
                              // }
                            />
                          </motion.div>
                        </div>
                      )}
                    />
                  </Col>
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
                            <Link to="/terms" target="_blank">
                              {" "}
                              مقررات آرسونیکس
                            </Link>{" "}
                            را خوانده‌ام و با آن موافقم.
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
