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
import PasswordInput from "components/PasswordInput";
import toast from "react-hot-toast";
import useAuth from "hooks/useAuth";
import { Controller, useForm } from "react-hook-form";
import { FaAngleUp } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { PiShieldCheckeredFill } from "react-icons/pi";
import { RegisterFormData } from "pages/auth/types";
import { isEmpty } from "lodash";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import "react-phone-input-2/lib/style.css";
import auth from "assets/scss/auth/auth.module.scss";
import Phone from "components/Input/Phone";

export default function Register() {
  // ==============|| State ||================= //
  const [openRefCode, setOpenRefCode] = useState(true);
  // ==============|| Validation ||================= //
  const registerSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      // .matches(/^[\u06F0-\u06F90-9]+$/, "شماره همراه اشتباه است")
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
      terms: false,
      referralCode: "",
    },
    resolver,
  });

  // ==============|| Handlers ||================= //
  const handleRegister = async (data: RegisterFormData) => {
    const userData = {
      phoneNumber: "+" + data.phoneNumber,
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
                      render={({ field: { name, value } }) => (
                        <Phone
                          value={value}
                          onChange={(phone) => setValue(name, phone)}
                        />
                      )}
                    />
                  </Col>
                  <Col xs={12}>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <PasswordInput hasShowHint={true} label="" {...field} />
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
