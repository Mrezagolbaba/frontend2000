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
  InputGroup,
  InputGroupText,
  Label,
  Row,
  
} from "reactstrap";
import { CiTrash } from "react-icons/ci";
import { useAppSelector } from "redux/hooks";
import { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
export default function BankInformation() {
  const [localRows, setLocalRows] = useState([{ id: 0 }]);
  const [intRows, setIntRows] = useState([{ id: 0 }]);
  const [selectedCountryCode, setSelectedCountryCode] = useState('TR');
  const user = useAppSelector((state) => state.user);
  const { firstName, lastName } = user;
  const resolver = yupResolver(
    Yup.object().shape({
      sheba: Yup.string(),
      cardNumber: Yup.string(),
      country: Yup.string(),
      IBAN: Yup.string(),
      AccountHolder: Yup.string(),
    })
  );

  const {
    control,
    reset,
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
          <div className="alert alert-warning">
            تنها حساب&zwnj;هایی که به نام
            {` ${firstName} ${lastName} `}
            باشند قابلیت اضافه شدن را دارند، در نظر داشته باشید واریز و برداشت
            فقط از طریق حساب هایی که معرفی می&zwnj;کنید امکان پذیر خواهد بود.{" "}
          </div>
          <Form className="bank-account">
            {localRows.map((row, index) => (
              <Row key={row.id} style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Col sm={{ offset: 1, size: 11 }} lg={{ offset: 1, size: 5 }}>
                  <Controller
                    name="sheba"
                    control={control}
                    render={({ field: { name, value, onChange, ref } }) => (
                      <FormGroup row>
                        <Label sm={3}>شماره شبا:</Label>
                        <Col sm={9}>
                          <InputGroup dir="ltr">
                            <InputGroupText id={`sheba_${row.id}`}>IR</InputGroupText>
                            <Input
                              value={value}
                              ref={ref}
                              onChange={onChange}
                              name={name}
                              type="text"
                              className="form-control d-ltr"
                              id={`input23_${row.id}`}
                              placeholder=""
                            />
                          </InputGroup>
                        </Col>
                      </FormGroup>
                    )}
                  />
                </Col>
                <Col sm={{ size: 12 }} lg={{ size: 5 }}>
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
                <Col sm={{ size: 1 }}>
                  {index !== 0 &&

                    <span style={{
                      color: "red",
                      cursor: "pointer",
                      fontSize: "1.5rem"
                    }} onClick={() => removeRow(row.id)} className="icon">
                      <CiTrash />
                    </span>
                  }
                </Col>
              </Row>
            ))}

            <Row>
              <ButtonGroup style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  outline
                  color="primary"
                  className="btn-simple"
                  style={{ flex: 'none' }}
                  onClick={addRow}
                >
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
          <div className="alert alert-warning">
            تنها حساب&zwnj;هایی که به نام
            {` ${firstName} ${lastName} `}
            باشند قابلیت اضافه شدن را دارند، در نظر داشته باشید واریز و برداشت
            فقط از طریق حساب هایی که معرفی می&zwnj;کنید امکان پذیر خواهد بود.{" "}
          </div>

          <Form className="bank-account">
            {intRows.map((row, index) => (
              <Row key={row.id} style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%'
              }}>
                <Col>
                  <Controller
                    name="AccountHolder"
                    control={control}
                    render={({ field: { name, value, onChange, ref } }) => (
                      <FormGroup row>
                        <Col >
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
                <Col >
                  <Controller
                    name="country"
                    control={control}
                    render={({ field: { name, value, onChange, ref } }) => (
                      <FormGroup row>
                        <Col >
                          <ReactFlagsSelect
                            searchable  
                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            selected={value!!}
                            onSelect={(code) => {
                              onChange(code)
                              setSelectedCountryCode(code);
                            }}
                          />
                        </Col>
                      </FormGroup>
                    )}
                  />
                </Col>
                <Col >
                  <Controller
                    name="IBAN"
                    control={control}
                    render={({ field: { name, value, onChange, ref } }) => (
                      <FormGroup row>
                        <Col >
                        <InputGroup dir="ltr">
                            <InputGroupText>{selectedCountryCode}</InputGroupText>
                          <Input
                            type="text"
                            className="form-control d-rtl"
                            id={`input24_${row.id}`}
                            placeholder="شماره IBAN"
                          />
                          </InputGroup>
                        </Col>
                      </FormGroup>
                    )}
                  />
                </Col>
                <Col sm={{ size: 1 }} lg={{ size: 1 }}>
                  {index !== 0 &&
                    <span style={{
                      color: "red",
                      cursor: "pointer",
                      fontSize: "1.5rem"
                    }} onClick={() => removeIntRow(row.id)} className="icon">
                      <CiTrash />
                    </span>
                  }
                </Col>
              </Row>
            ))}

            <Row>
              <ButtonGroup style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  outline
                  color="primary"
                  className="btn-simple"
                  style={{ flex: 'none' }}
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