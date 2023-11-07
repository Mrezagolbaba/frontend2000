import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";

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
import { CiTrash } from "react-icons/ci";
import { useAppSelector } from "redux/hooks";
import { useState } from "react";
import { useList } from "@refinedev/core";
import { AlertInfo, AlertWarning } from "components/AlertWidget";
import DropdownInput, { OptionType } from "components/Input/Dropdown";

import profile from "assets/scss/dashboard/profile.module.scss";

export default function BankInformation() {
  const { data, isSuccess, isLoading } = useList({
    resource: `bank-accounts`,
  });

  const [localRows, setLocalRows] = useState([{ id: 0 }]);
  const [intRows, setIntRows] = useState([{ id: 0 }]);
  const [selectedCountryCode, setSelectedCountryCode] = useState("TR");
  const user = useAppSelector((state) => state.user);
  const { firstName, lastName } = user;
  const resolver = yupResolver(
    Yup.object().shape({
      sheba: Yup.string(),
      cardNumber: Yup.string().required(),
      country: Yup.string().required(),
      IBAN: Yup.string(),
      AccountHolder: Yup.string(),
    })
  );

  const optionList: OptionType[] = [
    {
      content: "ترکیه",
      value: "ترکیه",
    },
    {
      content: "استرالیا",
      value: "استرالیا",
    },
    {
      content: "آمریکا",
      value: "آمریکا",
    },
    {
      content: "انگلستان",
      value: "انگلستان",
    },
  ];

  const {
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      sheba: "",
      cardNumber: "",
      country: "",
      IBAN: "",
      AccountHolder: "",
    },
    resolver,
  });
  const addRow = () => {
    setLocalRows([...localRows, { id: localRows.length }]);
  };
  const removeRow = (id) => {
    setLocalRows(localRows.filter((row) => row.id !== id));
  };
  const addIntRow = () => {
    setIntRows([...intRows, { id: intRows.length }]);
  };
  const removeIntRow = (id) => {
    setIntRows(intRows.filter((row) => row.id !== id));
  };
  return (
    <>
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
          <Form className="bank-account">
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
              <ButtonGroup
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button color="link" style={{ flex: "none" }} onClick={addRow}>
                  اضافه کردن حساب جدید
                </Button>
              </ButtonGroup>
            </Row>
          </Form>
        </CardBody>
      </Card>
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
                    name="AccountHolder"
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
                    name="country"
                    control={control}
                    render={({ field: { name, value, onChange, ref } }) => (
                      <FormGroup row>
                        <Col>
                          <DropdownInput
                            label="کشور بانک"
                            id={name}
                            value={value}
                            onChange={(val) => setValue(name, val)}
                            options={optionList}
                            // hasError={Boolean(errors?.[name])}
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
              <ButtonGroup
                style={{ display: "flex", justifyContent: "center" }}
              >
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
    </>
  );
}
