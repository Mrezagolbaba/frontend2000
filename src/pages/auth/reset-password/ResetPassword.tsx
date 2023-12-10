import Auth from "layouts/auth";
import toast from "react-hot-toast";
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
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgetPassSchema2 } from "../validationForms";
import PasswordInput from "components/PasswordInput";
import { useSetPassword } from "services/auth";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const setPassword = useSetPassword();
  const location = useLocation();
  const { token } = location.state;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const resolver = yupResolver(forgetPassSchema2);
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

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await setPassword
        .mutateAsync({ password: data.password, token: token })
        .then((res) => {
          navigate("/login");
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleErrors = (errors: any) =>
    Object.entries(errors).map(([fieldName, error]: any) =>
      toast.error(error?.message, {
        position: "bottom-left",
      })
    );

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
};

export default ResetPassword;
