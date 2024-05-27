import Notify from "components/Notify";
import PasswordInput from "components/PasswordInput";
import { Button, Col, Row, Spinner } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import { IChangePassword } from "types/settings";
import { changePassSchema } from "pages/auth/validationForms";
import { useEffect } from "react";
import { useUpdatePasswordMutation } from "store/api/user";
import { yupResolver } from "@hookform/resolvers/yup";

import setting from "../styles.module.scss";

const ChangePassword = () => {
  const [updatePassword, { isLoading, isSuccess }] =
    useUpdatePasswordMutation();

  const resolver = yupResolver(changePassSchema);
  const {
    handleSubmit,
    control,
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

  const handleChangePassword = (data: IChangePassword) => {
    const formData = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };
    updatePassword(formData);
  };

  useEffect(() => {
    if (isSuccess)
      Notify({ type: "success", text: "رمز عبور با موفقیت تغییر کرد" });
  }, [isSuccess]);

  const handleErrors = (errors: any) =>
    Object.entries(errors).map(([fieldName, error]: any) =>
      Notify({ type: "error", text: error?.message }),
    );

  return (
    <form
      className={setting["change-password-form"]}
      onSubmit={handleSubmit(handleChangePassword, handleErrors)}
    >
      <h5 className="mb-4">تغییر رمز ورود به حساب کاربری</h5>
      <Row className={`${setting["password-container"]} gy-3 gx-0 px-5`}>
        <Col xs={12}>
          <Controller
            name="oldPassword"
            control={control}
            render={({ field: { name, value, onChange } }) => (
              <PasswordInput
                name={name}
                value={value}
                onChange={onChange}
                errors={errors}
                label="رمز عبور قبلی"
              />
            )}
          />
        </Col>
        <Col xs={12}>
          <Controller
            name="newPassword"
            control={control}
            render={({ field: { name, value, onChange } }) => (
              <PasswordInput
                name={name}
                value={value}
                onChange={onChange}
                errors={errors}
                label="رمز عبور"
              />
            )}
          />
        </Col>
        <Col xs={12}>
          <Controller
            name="rePassword"
            control={control}
            render={({ field: { name, value, onChange } }) => (
              <PasswordInput
                name={name}
                value={value}
                onChange={onChange}
                errors={errors}
                label="تکرار رمز عبور"
              />
            )}
          />
        </Col>
      </Row>
      <div className="text-center mt-4">
        <Button color="primary" type="submit" outline className="px-3 py-2">
          {isLoading ? <Spinner /> : "ذخیره"}
        </Button>
      </div>
    </form>
  );
};
export default ChangePassword;
