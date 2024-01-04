import toast from "react-hot-toast";
import { useUpdatePasswordMutation } from "store/api/user";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePassSchema } from "pages/auth/validationForms";
import { IChangePassword } from "types/settings";
import { Button, Col, Input, Label, Row } from "reactstrap";

const ChangePassword = () => {
  const [updatePassword, { isLoading, isError }] = useUpdatePasswordMutation();

  const resolver = yupResolver(changePassSchema);
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<IChangePassword>({
    mode: "onChange",
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      rePassword: "",
    },
    resolver: resolver,
  });

  const handleChangePassword = async (data: IChangePassword) => {
    const formData = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };
    await updatePassword(formData)
      .then((res) => {
        if (res) {
          toast.success("رمز عبور با موفقیت تغییر کرد");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleErrors = (errors: any) =>
    Object.entries(errors).map(([fieldName, error]: any) =>
      toast.error(error?.message, {
        position: "bottom-left",
      }),
    );

  return (
    <form onSubmit={handleSubmit(handleChangePassword, handleErrors)}>
      <h5 className="mb-4 text-center">تغییر رمز عبور</h5>
      <Row className="mb-2">
        <Controller
          name="oldPassword"
          control={control}
          render={({ field: { name, value, onChange, ref } }) => (
            <>
              <Label
                htmlFor={name}
                className="col-xl-3 col-lg-5 col-form-label"
              >
                رمزعبور قبلی:
              </Label>
              <Col xl={6} lg={7}>
                <Input
                  type="password"
                  placeholder=" رمز عبور قبلی را وارد کنید  "
                  value={value}
                  onChange={onChange}
                  ref={ref}
                  name={name}
                  invalid={Boolean(errors?.[name]?.message)}
                />
              </Col>
            </>
          )}
        />
      </Row>
      <Row className="mb-2">
        <Controller
          name="newPassword"
          control={control}
          render={({ field: { name, value, onChange, ref } }) => (
            <>
              <Label
                htmlFor={name}
                className="col-xl-3 col-lg-5 col-form-label"
              >
                رمزعبور:
              </Label>
              <Col xl={6} lg={7}>
                <Input
                  type="password"
                  className="form-control"
                  placeholder=" رمز عبور جدید را وارد کنید  "
                  value={value}
                  onChange={onChange}
                  ref={ref}
                  name={name}
                  invalid={Boolean(errors?.[name]?.message)}
                />
              </Col>
            </>
          )}
        />
      </Row>
      <Row className="mb-4">
        <Controller
          name="rePassword"
          control={control}
          render={({ field: { name, value, onChange, ref } }) => (
            <>
              <Label
                htmlFor={name}
                className="col-xl-3 col-lg-5 col-form-label"
              >
                تکرار رمزعبور:
              </Label>
              <Col xl={6} lg={7}>
                <Input
                  type="password"
                  className="form-control"
                  placeholder=" تکرار رمز عبور جدید را وارد کنید  "
                  value={value}
                  onChange={onChange}
                  ref={ref}
                  name={name}
                  invalid={Boolean(errors?.[name]?.message)}
                />
              </Col>
            </>
          )}
        />
      </Row>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "50%" }}>
          {errors.oldPassword && (
            <h6
              className="col-xl-12 col-lg-12"
              style={{ fontSize: "10px", color: "red" }}
            >
              {errors.oldPassword.message}
            </h6>
          )}
          {errors.newPassword && (
            <h6
              className="col-xl-12 col-lg-12"
              style={{ fontSize: "10px", color: "red" }}
            >
              {errors.newPassword.message}
            </h6>
          )}
          {errors.rePassword && (
            <h6
              className="col-xl-12 col-lg-12"
              style={{ fontSize: "10px", color: "red" }}
            >
              {errors.rePassword.message}
            </h6>
          )}
        </div>
      </div>
      <div className="text-center mt-4">
        <Button color="primary" type="submit" outline className="px-3 py-2">
          ذخیره
        </Button>
      </div>
    </form>
  );
};
export default ChangePassword;
