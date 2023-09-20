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

export default function BankInformation() {
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
            تنها حساب&zwnj;هایی که به نام بهزاد بابایی باشند قابلیت اضافه شدن را
            دارند، در نظر داشته باشید واریز و برداشت فقط از طریق حساب هایی که
            معرفی می&zwnj;کنید امکان پذیر خواهد بود.{" "}
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
            تنها حساب&zwnj;هایی که به نام بهزاد بابایی باشند قابلیت اضافه شدن را
            دارند، در نظر داشته باشید واریز و برداشت فقط از طریق حساب هایی که
            معرفی می&zwnj;کنید امکان پذیر خواهد بود.{" "}
          </div>

          <div className="bank-account">
            <label className="">شماره شبا:</label>
            <div className="iban-input-control">
              <span>IR</span>
              <input
                type="text"
                className="form-control d-ltr"
                id="input21"
                placeholder=""
              />
            </div>
            <label className="">نام بانک:</label>
            <div className="col-lg-5">
              <div className="dropdown bootstrap-select bs-select-control bs-form-select">
                <select
                  name=""
                  id="inputCardNum"
                  className="bs-select-control bs-form-select"
                >
                  <option value="2">TRC20 (ترون - TRON)</option>
                </select>
                <button
                  type="button"
                  className="btn dropdown-toggle btn-light"
                  data-bs-toggle="dropdown"
                  role="combobox"
                  aria-owns="bs-select-1"
                  aria-haspopup="listbox"
                  aria-expanded="false"
                  title="TRC20 (ترون - TRON)"
                  data-id="inputCardNum"
                >
                  <div className="filter-option">
                    <div className="filter-option-inner">
                      <div className="filter-option-inner-inner">
                        ZIRAAT BANKASI
                      </div>
                    </div>{" "}
                  </div>
                </button>
                <div
                  className="dropdown-menu"
                  style={{
                    maxHeight: "205.031px",
                    overflow: "hidden",
                    minHeight: "0px",
                  }}
                >
                  <div
                    className="inner show"
                    role="listbox"
                    id="bs-select-1"
                    aria-activedescendant="bs-select-1-0"
                    style={{
                      maxHeight: "195.031px",
                      overflow: " hidden auto",
                      minHeight: "0px",
                    }}
                  >
                    <ul
                      className="dropdown-menu inner show"
                      role="presentation"
                      style={{ marginTop: "0px", marginBottom: "0px" }}
                    >
                      <li className="selected active">
                        {/* <a
                            role="option"
                            className="dropdown-item active selected"
                            id="bs-select-1-0"
                            aria-setsize="1"
                            aria-posinset="1"
                            aria-selected="true"
                          >
                            <span className="text">IS BANKASI</span>
                          </a> */}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="bank-account-actions">
              <button type="button" className="bank-account-cancel">
                <span className="icon">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 1L1 13"
                      stroke="#03041B"
                      strokeWidth="1.5"
                      strokeOpacity=".4"
                      strokeLinecap="round"
                    ></path>
                    <path
                      d="M13 13L1 0.999999"
                      stroke="#03041B"
                      strokeWidth="1.5"
                      strokeOpacity=".4"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </span>
              </button>
              <button type="button" className="bank-account-remove">
                <span className="icon">
                  <svg
                    width="19"
                    height="20"
                    viewBox="0 0 19 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.3249 7.46875C16.3249 7.46875 15.7819 14.2037 15.4669 17.0407C15.3169 18.3957 14.4799 19.1898 13.1089 19.2148C10.4999 19.2618 7.88791 19.2648 5.27991 19.2098C3.96091 19.1828 3.13791 18.3788 2.99091 17.0478C2.67391 14.1858 2.13391 7.46875 2.13391 7.46875"
                      stroke="#FF1F11"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M17.7082 4.24023H0.750214"
                      stroke="#FF1F11"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M14.4406 4.23998C13.6556 4.23998 12.9796 3.68498 12.8256 2.91598L12.5826 1.69998C12.4326 1.13898 11.9246 0.750977 11.3456 0.750977H7.11261C6.53361 0.750977 6.02561 1.13898 5.87561 1.69998L5.63261 2.91598C5.47861 3.68498 4.80261 4.23998 4.01761 4.23998"
                      stroke="#FF1F11"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </span>
              </button>
              <button type="button" className="bank-account-confirm">
                <span className="icon">
                  <svg
                    width="12"
                    height="10"
                    viewBox="0 0 12 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.00006 7.80007L1.20006 5.00006L0.266724 5.9334L4.00006 9.66673L12.0001 1.66673L11.0667 0.733398L4.00006 7.80007Z"
                      fill="#0ED039"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
          <div className="bank-account">
            <label className="">شماره شبا:</label>
            <div className="iban-input-control">
              <span>IR</span>
              <input
                type="text"
                className="form-control d-ltr"
                id="input23"
                placeholder=""
              />
            </div>
            <label className="">نام بانک</label>
            <div className="col-lg-5">
              <div className="dropdown bootstrap-select bs-select-control bs-form-select">
                <select
                  name=""
                  id="inputCardNum"
                  className="bs-select-control bs-form-select"
                >
                  <option value="2">TRC20 (ترون - TRON)</option>
                </select>
                <button
                  type="button"
                  className="btn dropdown-toggle btn-light"
                  data-bs-toggle="dropdown"
                  role="combobox"
                  aria-owns="bs-select-1"
                  aria-haspopup="listbox"
                  aria-expanded="false"
                  title="TRC20 (ترون - TRON)"
                  data-id="inputCardNum"
                >
                  <div className="filter-option">
                    <div className="filter-option-inner">
                      <div className="filter-option-inner-inner">
                        ZIRAAT BANKASI
                      </div>
                    </div>
                  </div>
                </button>
                <div
                  className="dropdown-menu"
                  style={{
                    maxHeight: " 205.031px",
                    overflow: "hidden",
                    minHeight: "0px",
                  }}
                >
                  <div
                    className="inner show"
                    role="listbox"
                    id="bs-select-1"
                    aria-activedescendant="bs-select-1-0"
                    style={{
                      maxHeight: "195.031px",
                      overflow: "hidden auto",
                      minHeight: "0px",
                    }}
                  >
                    <ul
                      className="dropdown-menu inner show"
                      role="presentation"
                      style={{ marginTop: "0px", marginBottom: "0px" }}
                    >
                      <li className="selected active">
                        {/* <a role="option" className="dropdown-item active selected" id="bs-select-1-0"  aria-setsize="1" aria-posinset="1" aria-selected="true">
                                    <span className="text">IS BANKASI</span>
                                    </a> */}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="bank-account-actions">
              <button type="button" className="bank-account-pen">
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
              </button>
            </div>
          </div>

          <div className="banking-info-card__action">
            <button className="btn-simple">اضافه کردن حساب جدید</button>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
