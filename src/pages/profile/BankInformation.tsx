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
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { CiTrash } from "react-icons/ci";
import { useAppSelector } from "redux/hooks";

export default function BankInformation() {
  const user = useAppSelector((state) => state.user);
  const { firstName, lastName } = user;
  const resolver = yupResolver(
    Yup.object().shape({
      sheba: Yup.string(),
      cardNumber: Yup.string(),
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
    },
    resolver,
  });

  return (
    <>
      <Card className="custom-card card-secondary banking-info-card mb-4">
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
            <Row>
              <Col sm={{ size: 5 }} lg={{ offset: 1, size: 4 }}>
                <Controller
                  name="sheba"
                  control={control}
                  render={({ field: { name, value, onChange, ref } }) => (
                    <FormGroup row>
                      <Label sm={3} htmlFor={name}>
                        شماره شبا
                      </Label>
                      <Col sm={9}>
                        <Input
                          invalid={Boolean(errors?.[name])}
                          id={name}
                          value={value}
                          ref={ref}
                          onChange={onChange}
                          name={name}
                          type="text"
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
              <Col sm={{ size: 5 }} lg={{ offset: 1, size: 4 }}>
                <Controller
                  name="cardNumber"
                  control={control}
                  render={({ field: { name, value, onChange, ref } }) => (
                    <FormGroup row>
                      <Label sm={3} htmlFor={name}>
                        شماره کارت
                      </Label>
                      <Col sm={9}>
                        <Input
                          invalid={Boolean(errors?.[name])}
                          id={name}
                          value={value}
                          ref={ref}
                          onChange={onChange}
                          name={name}
                          type="text"
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
              <Col sm={{ size: 2 }} lg={{ size: 2 }}>
                <Button
                  type="button"
                  color="secondary"
                  className="bank-account-cancel"
                >
                  <span className="icon">
                    <AiOutlineClose />
                  </span>
                </Button>
                <Button
                  type="button"
                  color="danger"
                  className="bank-account-remove"
                >
                  <span className="icon">
                    <CiTrash />
                  </span>
                </Button>
                <Button
                  type="button"
                  color="success"
                  className="bank-account-confirm"
                >
                  <span className="icon">
                    <AiOutlineCheck />
                  </span>
                </Button>
              </Col>
            </Row>
          </Form>
          <Row className="bank-account">
            <Col sm={{ size: 5 }} lg={{ offset: 1, size: 4 }}>
              <FormGroup row>
                <Label sm={3}>شماره شبا:</Label>
                <Col sm={9}>
                  <InputGroup dir="ltr">
                    <InputGroupText id="sheba">IR</InputGroupText>
                    <Input
                      disabled
                      type="text"
                      className="form-control d-ltr"
                      id="input23"
                      placeholder=""
                    />
                  </InputGroup>
                </Col>
              </FormGroup>
            </Col>
            <Col sm={{ size: 5 }} lg={{ offset: 1, size: 4 }}>
              <FormGroup row>
                <Label sm={3}>شماره کارت:</Label>
                <Col sm={9}>
                  <Input
                    disabled
                    type="text"
                    className="form-control d-ltr"
                    id="input24"
                    placeholder=""
                  />
                </Col>
              </FormGroup>
            </Col>
            <Col sm={{ size: 2 }} lg={{ size: 2 }}>
              <Button type="button" className="bank-account-pen">
                <span className="icon">
                  <svg
                    width="13"
                    height="14"
                    viewBox="0 0 13 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.64116 1.7167C8.19391 1.01245 9.08716 1.0492 9.79216 1.60195L10.8347 2.41945C11.5397 2.9722 11.7894 3.82945 11.2367 4.5352L5.01991 12.4665C4.81216 12.732 4.49491 12.8887 4.15741 12.8925L1.75966 12.9232L1.21666 10.587C1.14016 10.2592 1.21666 9.9142 1.42441 9.64795L7.64116 1.7167Z"
                      stroke="#03041B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeOpacity=".4"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M6.47693 3.20215L10.0724 6.02065"
                      stroke="#03041B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeOpacity=".4"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </span>
              </Button>
            </Col>
          </Row>

          <Row>
            <ButtonGroup style={{ display: "flex", justifyContent: "center" }}>
              <Button
                outline
                color="primary"
                className="btn-simple"
                style={{ flex: "none" }}
              >
                اضافه کردن حساب جدید
              </Button>
            </ButtonGroup>
          </Row>
        </CardBody>
      </Card>
      <Card className="custom-card card-secondary banking-info-card mb-4">
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
            <Row>
              <Col sm={{ size: 5 }} lg={{ offset: 1, size: 4 }}>
                <Controller
                  name="sheba"
                  control={control}
                  render={({ field: { name, value, onChange, ref } }) => (
                    <FormGroup row>
                      <Label sm={3} htmlFor={name}>
                        شماره شبا
                      </Label>
                      <Col sm={9}>
                        <Input
                          invalid={Boolean(errors?.[name])}
                          id={name}
                          value={value}
                          ref={ref}
                          onChange={onChange}
                          name={name}
                          type="text"
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
              <Col sm={{ size: 5 }} lg={{ offset: 1, size: 4 }}>
                <Controller
                  name="cardNumber"
                  control={control}
                  render={({ field: { name, value, onChange, ref } }) => (
                    <FormGroup row>
                      <Label sm={3} htmlFor={name}>
                        شماره کارت
                      </Label>
                      <Col sm={9}>
                        <Input
                          invalid={Boolean(errors?.[name])}
                          id={name}
                          value={value}
                          ref={ref}
                          onChange={onChange}
                          name={name}
                          type="text"
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
              <Col sm={{ size: 2 }} lg={{ size: 2 }}>
                <Button
                  type="button"
                  color="secondary"
                  className="bank-account-cancel"
                >
                  <span className="icon">
                    <AiOutlineClose />
                  </span>
                </Button>
                <Button
                  type="button"
                  color="danger"
                  className="bank-account-remove"
                >
                  <span className="icon">
                    <CiTrash />
                  </span>
                </Button>
                <Button
                  type="button"
                  color="success"
                  className="bank-account-confirm"
                >
                  <span className="icon">
                    <AiOutlineCheck />
                  </span>
                </Button>
              </Col>
            </Row>
          </Form>
          <Row className="bank-account">
            <Col sm={{ size: 5 }} lg={{ offset: 1, size: 4 }}>
              <FormGroup row>
                <Label sm={3}>شماره شبا:</Label>
                <Col sm={9}>
                  <InputGroup dir="ltr">
                    <InputGroupText id="sheba">IR</InputGroupText>
                    <Input
                      disabled
                      type="text"
                      className="form-control d-ltr"
                      id="input23"
                      placeholder=""
                    />
                  </InputGroup>
                </Col>
              </FormGroup>
            </Col>
            <Col sm={{ size: 5 }} lg={{ offset: 1, size: 4 }}>
              <FormGroup row>
                <Label sm={3}>شماره کارت:</Label>
                <Col sm={9}>
                  <Input
                    disabled
                    type="text"
                    className="form-control d-ltr"
                    id="input24"
                    placeholder=""
                  />
                </Col>
              </FormGroup>
            </Col>
            <Col sm={{ size: 2 }} lg={{ size: 2 }}>
              <Button type="button" className="bank-account-pen">
                <span className="icon">
                  <svg
                    width="13"
                    height="14"
                    viewBox="0 0 13 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.64116 1.7167C8.19391 1.01245 9.08716 1.0492 9.79216 1.60195L10.8347 2.41945C11.5397 2.9722 11.7894 3.82945 11.2367 4.5352L5.01991 12.4665C4.81216 12.732 4.49491 12.8887 4.15741 12.8925L1.75966 12.9232L1.21666 10.587C1.14016 10.2592 1.21666 9.9142 1.42441 9.64795L7.64116 1.7167Z"
                      stroke="#03041B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeOpacity=".4"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M6.47693 3.20215L10.0724 6.02065"
                      stroke="#03041B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeOpacity=".4"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </span>
              </Button>
            </Col>
          </Row>

          <Row>
            <ButtonGroup style={{ display: "flex", justifyContent: "center" }}>
              <Button
                outline
                color="primary"
                className="btn-simple"
                style={{ flex: "none" }}
              >
                اضافه کردن حساب جدید
              </Button>
            </ButtonGroup>
          </Row>
        </CardBody>
      </Card>
    </>
  );
}
