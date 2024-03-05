import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { useAppSelector } from "store/hooks";
import * as Yup from "yup";

import { AlertDanger, AlertSuccess } from "components/AlertWidget";

export default function PersonalInformation() {
  const {
    firstName,
    lastName,
    nationalId,
    birthDate,
    phoneNumber,
    email,
    firstTierVerified,
    secondTierVerified,
    irPhoneNumber,
  } = useAppSelector((state) => state.user);

  const resolver = yupResolver(
    Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
      nationalCode: Yup.string(),
      birthDate: Yup.string(),
      nationalPhone: Yup.string(),
      iranianPhone: Yup.string(),
    }),
  );

  const {
    control,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      nationalCode: "",
      birthDate: "",
      nationalPhone: "",
      iranianPhone: "",
    },
    resolver,
  });

  useEffect(() => {
    reset({
      name: firstName + " " + lastName,
      email: email,
      nationalCode: nationalId,
      birthDate: new Date(birthDate).toLocaleDateString("fa-IR"),
      iranianPhone: phoneNumber.includes("+98") ? phoneNumber : irPhoneNumber,
      nationalPhone: !phoneNumber.includes("+98") ? phoneNumber : "",
    });
  }, [
    birthDate,
    email,
    firstName,
    irPhoneNumber,
    lastName,
    nationalId,
    phoneNumber,
    reset,
  ]);

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle tag="h5">اطلاعات شخصی</CardTitle>
      </CardHeader>
      <CardBody>
        {!firstTierVerified ? (
          <AlertDanger
            hasIcon
            key="failed-tier"
            text="احراز هویت شما با مشکل مواجه شده است. لطفا با پشتیبانی تماس بگیرید."
          />
        ) : (
          firstTierVerified &&
          !secondTierVerified && (
            <AlertSuccess
              hasIcon
              key="success-tier1"
              text="احراز هویت شما با موفقیت انجام شد و هم اکنون به سطح یک کاربری ارتقا پیدا کرده‌اید. حالا می‌توانید با افزودن حساب‌های بانکی خود اقدام به واریز و برداشت نمایید، همچنین برای افزایش میزان واریز و برداشت می‌توانید احراز هویت سطح دو را انجام دهید."
            />
          )
        )}

        <Form className="container">
          <Row className="justify-content-center">
            <Col xs={12} lg={6}>
              <Controller
                name="name"
                control={control}
                render={({ field: { name, value, onChange, ref } }) => (
                  <FormGroup row>
                    <Label sm={4} htmlFor={name}>
                      نام کامل:
                    </Label>
                    <Col sm={8}>
                      <Input
                        disabled
                        id={name}
                        value={value}
                        ref={ref}
                        onChange={onChange}
                        name={name}
                        type="text"
                      />
                    </Col>
                  </FormGroup>
                )}
              />
            </Col>
            <Col xs={12} lg={6}>
              <Controller
                name="email"
                control={control}
                render={({ field: { name, value, onChange, ref } }) => (
                  <FormGroup row>
                    <Label sm={4} htmlFor={name}>
                      ایمیل:
                    </Label>
                    <Col sm={8}>
                      <Input
                        disabled
                        id={name}
                        name={name}
                        ref={ref}
                        value={value}
                        type="email"
                        onChange={onChange}
                      />
                    </Col>
                  </FormGroup>
                )}
              />
            </Col>
            <Col xs={12} lg={6}>
              <Controller
                name="nationalCode"
                control={control}
                render={({ field: { name, value, onChange, ref } }) => (
                  <FormGroup row>
                    <Label sm={4} htmlFor={name}>
                      کدملی:
                    </Label>
                    <Col sm={8}>
                      <Input
                        disabled
                        id={name}
                        name={name}
                        ref={ref}
                        value={value}
                        type="text"
                        onChange={onChange}
                      />
                    </Col>
                  </FormGroup>
                )}
              />
            </Col>
            <Col xs={12} lg={6}>
              <Controller
                name="birthDate"
                control={control}
                render={({ field: { name, value, onChange, ref } }) => (
                  <FormGroup row>
                    <Label sm={4} htmlFor={name}>
                      تاریخ تولد:
                    </Label>
                    <Col sm={8}>
                      <Input
                        disabled
                        id={name}
                        name={name}
                        ref={ref}
                        value={value}
                        type="text"
                        onChange={onChange}
                      />
                    </Col>
                  </FormGroup>
                )}
              />
            </Col>
            <Col xs={12} lg={6}>
              <Controller
                name="iranianPhone"
                control={control}
                render={({ field: { name, value, onChange, ref } }) => (
                  <FormGroup row>
                    <Label sm={4} htmlFor={name}>
                      شماره ایران:
                    </Label>
                    <Col sm={8}>
                      <Input
                        invalid={Boolean(errors?.[name])}
                        disabled
                        id={name}
                        name={name}
                        ref={ref}
                        value={value}
                        type="text"
                        dir="ltr"
                        style={{ textAlign: "right" }}
                        onChange={onChange}
                      />
                      {errors?.[name] && (
                        <FormFeedback tooltip>
                          {errors?.[name]?.message}
                        </FormFeedback>
                      )}
                    </Col>
                  </FormGroup>
                )}
              />
            </Col>
            <Col xs={12} lg={6}>
              {getValues("nationalPhone") !== "" && (
                <Controller
                  name="nationalPhone"
                  control={control}
                  render={({ field: { name, value, onChange, ref } }) => (
                    <FormGroup row>
                      <Label sm={4} htmlFor={name}>
                        شماره بین المللی:
                      </Label>
                      <Col sm={8}>
                        <Input
                          invalid={Boolean(errors?.[name])}
                          disabled
                          id={name}
                          name={name}
                          ref={ref}
                          value={value}
                          type="text"
                          dir="ltr"
                          style={{ textAlign: "right" }}
                          onChange={onChange}
                        />
                        {errors?.[name] && (
                          <FormFeedback tooltip>
                            {errors?.[name]?.message}
                          </FormFeedback>
                        )}
                      </Col>
                    </FormGroup>
                  )}
                />
              )}
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
}
