import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Spinner,
} from "reactstrap";
import * as Yup from "yup";
import Auth from "layouts/auth";
import PasswordInput from "components/PasswordInput";
import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetPasswordMutation } from "store/api/auth";
import { yupResolver } from "@hookform/resolvers/yup";

import auth from "assets/scss/auth/auth.module.scss";

export default function ResetPassword() {
  // ==============|| Validation ||================= //
  const forgetPassSchema2 = Yup.object().shape({
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
    rePassword: Yup.string()
      .oneOf(
        [Yup.ref("password")],
        "رمز عبور و تکرار رمز عبور با هم مطابقت ندارند.",
      )
      .required("تکرار رمز عبور الزامی می باشد."),
  });
  const resolver = yupResolver(forgetPassSchema2);

  // ==============|| Hooks ||================= //
  const [setPassword, { isLoading, isSuccess }] = useSetPasswordMutation();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      password: "",
      rePassword: "",
    },
    resolver,
  });

  // ==============|| Handlers ||================= //
  const onSubmit = async (data: any) => setPassword(data.password);
  const handleErrors = (errors: any) =>
    Object.entries(errors).map(([fieldName, error]: any) =>
      toast.error(error?.message, {
        position: "bottom-left",
      }),
    );

  // ==============|| Life Cycle ||================= //
  useEffect(() => {
    if (isSuccess) navigate("/dashboard");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  // ==============|| Render ||================= //
  return (
    <Auth>
      <section className={auth.container}>
        <Card className={auth.card}>
          <CardBody className={auth["card-body"]}>
            <h4 className={auth.title}>تغییر رمز عبور</h4>
            <p className={auth.text}>رمز عبور جدید خود را وارد نمایید</p>
            <form
              className={auth.form}
              onSubmit={handleSubmit(onSubmit, handleErrors)}
            >
              <Container>
                <Row className="gy-2 gx-0">
                  <Col xs={12}>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <PasswordInput
                          errors={errors}
                          hasShowHint={false}
                          {...field}
                        />
                      )}
                    />
                  </Col>
                  <Col xs={12}>
                    <Controller
                      name="rePassword"
                      control={control}
                      render={({ field }) => (
                        <PasswordInput
                          errors={errors}
                          hasShowHint={true}
                          {...field}
                        />
                      )}
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
                            " تغییر رمز عبور"
                          )}
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
