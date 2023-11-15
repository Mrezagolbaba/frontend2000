import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AlertInfo, AlertWarning } from "components/AlertWidget";
import React, { useState } from "react";
import { Controller, useForm as useRHF } from "react-hook-form";
import { CiTrash } from "react-icons/ci";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { useAppSelector } from "redux/hooks";
import { useForm } from "@refinedev/core";

import profile from "assets/scss/dashboard/profile.module.scss";

const resolver = yupResolver(
  Yup.object().shape({
    sheba: Yup.string(),
    cardNumber: Yup.string().required(),
  })
);

export default function Internal() {
  const { firstName, lastName } = useAppSelector((state) => state.user);

  const { formLoading, onFinish } = useForm({
    action: "create",
    resource: "bank-accounts",
    onMutationSuccess: (data, variables, context, isAutoSave) => {
      console.log("looooooooooog", { data, variables, context, isAutoSave });
    },
  });

  const [localRows, setLocalRows] = useState([{ id: 0 }]);

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useRHF({
    mode: "onChange",
    defaultValues: {
      sheba: "",
      cardNumber: "",
    },
    resolver,
  });

  const addRow = () => {
    setLocalRows([...localRows, { id: localRows.length }]);
  };
  const removeRow = (id) => {
    setLocalRows(localRows.filter((row) => row.id !== id));
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle tag="h5">اطلاعات بانکی</CardTitle>
      </CardHeader>
      <CardBody>
        <AlertWarning
          hasIcon
          key="account-warning"
          text={`تنها حساب‌هایی که به نام ${firstName} ${lastName} باشند قابلیت اضافه شدن را دارند، در نظر داشته باشید واریز و برداشت فقط از طریق حساب هایی که معرفی می‌کنید امکان پذیر خواهد بود.`}
        />
        <AlertInfo
          hasIcon
          key="account-info"
          text="در صورتی که شماره شبا حساب خود را ندارید، وارد کردن شماره کارت کافی است."
        />
        <Form className="bank-account" onSubmit={handleSubmit(onFinish)}>
          {localRows.map((row, index) => (
            <Row key={row.id} className="justify-content-center">
              <Col xs={12} lg={5}>
                <Controller
                  name="cardNumber"
                  control={control}
                  render={({ field: { name, value, onChange, ref } }) => (
                    <FormGroup row>
                      <Label sm={3}>شماره کارت:</Label>
                      <Col sm={9}>
                        <Input
                          value={value}
                          ref={ref}
                          onChange={onChange}
                          name={name}
                          type="text"
                          className="form-control d-ltr"
                          id={`input24_${row.id}`}
                          placeholder=""
                        />
                      </Col>
                    </FormGroup>
                  )}
                />
              </Col>
              <Col xs={12} lg={5}>
                <Controller
                  name="sheba"
                  control={control}
                  render={({ field: { name, value, onChange, ref } }) => (
                    <FormGroup row>
                      <Label xs={3}>شماره شبا:</Label>
                      <Col xs={9}>
                        <div className={profile["iban-input-control"]}>
                          <span id={`sheba_${row.id}`}>IR</span>
                          <Input
                            value={value}
                            ref={ref}
                            onChange={onChange}
                            name={name}
                            type="text"
                            id={`input23_${row.id}`}
                            placeholder=""
                          />
                        </div>
                      </Col>
                    </FormGroup>
                  )}
                />
              </Col>
              <Col sm={{ size: 1 }}>
                {index !== 0 && (
                  <span
                    style={{
                      color: "red",
                      cursor: "pointer",
                      fontSize: "1.5rem",
                    }}
                    onClick={() => removeRow(row.id)}
                    className="icon"
                  >
                    <CiTrash />
                  </span>
                )}
              </Col>
            </Row>
          ))}

          <Row>
            <ButtonGroup style={{ display: "flex", justifyContent: "center" }}>
              <Button type="submit" color="link" style={{ flex: "none" }}>
                اضافه کردن حساب جدید
              </Button>
            </ButtonGroup>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
}
