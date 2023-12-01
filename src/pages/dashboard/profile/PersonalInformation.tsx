import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiOutlineEdit } from "react-icons/ai";
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
    firstTierVerified,
    secondTierVerified,
  }  = useAppSelector((state) => state.user);

  const resolver = yupResolver(
    Yup.object().shape({
      firstName: Yup.string(),
      lastName: Yup.string(),
      nationalCode: Yup.string(),
      birthDate: Yup.string(),
      nationalPhone: Yup.string(),
      iranianPhone: Yup.string(),
    })
  );

  const {
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      nationalCode: "",
      birthDate: "",
      nationalPhone: "",
      iranianPhone: "",
    },
    resolver,
  });

  useEffect(() => {
    reset({
      firstName: firstName,
      lastName: lastName,
      nationalCode: nationalId,
      birthDate: new Date(birthDate).toLocaleDateString("fa-IR"),
      iranianPhone: phoneNumber,
    });
  }, [birthDate, firstName, lastName, nationalId, phoneNumber, reset]);

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
        ) : firstTierVerified && !secondTierVerified ? (
          <AlertSuccess
            hasIcon
            key="success-tier1"
            text="احراز هویت شما با موفقیت انجام شد و هم اکنون به سطح یک کاربری ارتقا پیدا کرده‌اید. حالا می‌توانید با افزودن حساب‌های بانکی خود اقدام به واریز و برداشت نمایید، همچنین برای افزایش میزان واریز و برداشت می‌توانید احراز هویت سطح دو را انجام دهید."
          />
        ) : (
          <AlertSuccess
            hasIcon
            key="success-tier2"
            text="احراز هویت سطح یک و دو شما با موفقیت انجام شده است."
          />
        )}

        <Form className="container">
          <Row className="justify-content-center">
            <Col xs={12} lg={5}>
              <Controller
                name="firstName"
                control={control}
                render={({ field: { name, value, onChange, ref } }) => (
                  <FormGroup row>
                    <Label sm={3} htmlFor={name}>
                      نام:
                    </Label>
                    <Col sm={9}>
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
            <Col xs={12} lg={5}>
              <Controller
                name="lastName"
                control={control}
                render={({ field: { name, value, onChange, ref } }) => (
                  <FormGroup row>
                    <Label sm={3} htmlFor={name}>
                      نام خانوادگی:
                    </Label>
                    <Col sm={9}>
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
            <Col xs={12} lg={5}>
              <Controller
                name="nationalCode"
                control={control}
                render={({ field: { name, value, onChange, ref } }) => (
                  <FormGroup row>
                    <Label sm={3} htmlFor={name}>
                      کدملی:
                    </Label>
                    <Col sm={9}>
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
            <Col xs={12} lg={5}>
              <Controller
                name="birthDate"
                control={control}
                render={({ field: { name, value, onChange, ref } }) => (
                  <FormGroup row>
                    <Label sm={3} htmlFor={name}>
                      تاریخ تولد:
                    </Label>
                    <Col sm={9}>
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
            <Col xs={12} lg={5}>
              <Controller
                name="nationalPhone"
                control={control}
                render={({ field: { name, value, onChange, ref } }) => (
                  <FormGroup row>
                    <Label sm={3} for="input1">
                      شماره ثابت:
                    </Label>
                    <Col sm={9}>
                      <Input
                        invalid={Boolean(errors?.[name])}
                        disabled
                        id={name}
                        name={name}
                        ref={ref}
                        value={value}
                        type="text"
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
            <Col xs={12} lg={5}>
              <Controller
                name="iranianPhone"
                control={control}
                render={({ field: { name, value, onChange, ref } }) => (
                  <FormGroup row>
                    <Label sm={3} for="input1">
                      شماره موبایل:
                    </Label>
                    <Col sm={9}>
                      <Input
                        invalid={Boolean(errors?.[name])}
                        disabled
                        id={name}
                        name={name}
                        ref={ref}
                        value={value}
                        type="text"
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
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
}
