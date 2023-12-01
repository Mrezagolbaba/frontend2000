import * as Yup from "yup";
import { AlertInfo, AlertWarning } from "components/AlertWidget";
import DropdownInput, { OptionType } from "components/Input/Dropdown";
import { useForm } from "@refinedev/core";
import { yupResolver } from "@hookform/resolvers/yup";
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
  Row,
} from "reactstrap";
import { useState } from "react";

import profile from "assets/scss/dashboard/profile.module.scss";

export default function International() {
  const [intRows, setIntRows] = useState([{ id: 0 }]);
  const [selectedCountryCode, setSelectedCountryCode] = useState("TR");


  const { formLoading, onFinish } = useForm({
    action: "create",
    resource: "bank-accounts",
    onMutationSuccess: (data, variables, context, isAutoSave) => {
      console.log("looooooooooog", { data, variables, context, isAutoSave });
    },
  });

  const resolver = yupResolver(
    Yup.object().shape({
      accountName: Yup.string(),
      country: Yup.string().required(),
      IBAN: Yup.string().required(),
    })
  );

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useRHF({
    mode: "onChange",
    defaultValues: {
      accountName: "",
      country: "",
      IBAN: "",
    },
    resolver,
  });

  const addIntRow = () => {
    setIntRows([...intRows, { id: intRows.length }]);
  };
  const removeIntRow = (id) => {
    setIntRows(intRows.filter((row) => row.id !== id));
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>اطلاعات بانکی بین&zwnj;المللی</CardTitle>
      </CardHeader>
      <CardBody>
        <AlertWarning
          hasIcon
          key="warning-international-account"
          text="در صورتی که کارت اقامت کشوری که در آن ساکن هستید را از قسمت احراز هویت ارسال نکنید، فقط قابلیت برداشت فیات دیجیتال از آرسونیکس را خواهید داشت."
        />
        <AlertInfo
          hasIcon
          key="info-international-account"
          text="اطلاعاتی مانند SWIFT Code یا Sort Code هنگام برداشت ارز مورد نظر به طور جداگانه از شما دریافت می‌شود."
        />
        <Form className="bank-account">
          {intRows.map((row, index) => (
            <Row
              key={row.id}
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Col>
                <Controller
                  name="accountName"
                  control={control}
                  render={({ field: { name, value, onChange, ref } }) => (
                    <FormGroup row>
                      <Col>
                        <Input
                          value={value}
                          ref={ref}
                          onChange={onChange}
                          name={name}
                          type="text"
                          className="form-control d-rtl"
                          id={`input23_${row.id}`}
                          placeholder="نام صاحب حساب "
                        />
                      </Col>
                    </FormGroup>
                  )}
                />
              </Col>
              <Col>
                <Controller
                  name="IBAN"
                  control={control}
                  render={({ field: { name, value, onChange, ref } }) => (
                    <FormGroup row>
                      <Col>
                        <div className={profile["iban-input-control"]}>
                          <span id={`sheba_${row.id}`}>
                            {selectedCountryCode}
                          </span>
                          <Input
                            type="text"
                            className="form-control d-rtl"
                            id={`input24_${row.id}`}
                            placeholder="شماره IBAN"
                          />
                        </div>
                      </Col>
                    </FormGroup>
                  )}
                />
              </Col>
              <Col sm={{ size: 1 }} lg={{ size: 1 }}>
                {index !== 0 && (
                  <span
                    style={{
                      color: "red",
                      cursor: "pointer",
                      fontSize: "1.5rem",
                    }}
                    onClick={() => removeIntRow(row.id)}
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
              <Button
                color="link"
                className="btn-simple"
                style={{ flex: "none" }}
                onClick={addIntRow}
              >
                اضافه کردن حساب جدید
              </Button>
            </ButtonGroup>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
}
