import ExchangeInput from "components/Input/ExchangeInput";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";

import Lira from "assets/img/coins/lira.png";
import Rial from "assets/img/icons/flag-iran.svg";
import tetter from "assets/img/coins/tether.svg";
import TRX from "assets/img/coins/trx.png";

import exchange from "assets/scss/dashboard/exchange.module.scss";
import { useLazyRatesQuery } from "store/api/exchange-management";
import { CurrencyCode } from "types/wallet";
import CurrencyInput from "react-currency-input-field";

const options = [
  {
    value: "IRR",
    label: { text: "تومان", img: Rial },
  },

  {
    value: "TRY",
    label: { text: "لیر", img: Lira },
  },
  {
    value: "TRX",
    label: { text: "ترون", img: TRX },
  },
  {
    value: "USDT",
    label: { text: "تتر", img: tetter },
  },
];
export default function ExchangeSection() {
  const navigate = useNavigate();

  const [isOpenSource, setIsOpenSource] = useState(false);
  const [isOpenDestination, setIsOpenDestination] = useState(false);
  const toggleSource = () => setIsOpenSource((prevState) => !prevState);
  const toggleDestination = () =>
    setIsOpenDestination((prevState) => !prevState);

  const [getRate, { data: currencyRes }] = useLazyRatesQuery();
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      source: "",
      sourceCurrency: { value: "IRR", label: { text: "تومان", img: Rial } },
      destination: "",
      destinationCurrency: { value: "TRY", label: { text: "لیر", img: Lira } },
    },
  });

  return (
    <Card className="h-100">
      <CardHeader>
        <CardTitle tag="h5">خرید و فروش</CardTitle>
      </CardHeader>
      <CardBody>
        <Form action="">
          <div className={exchange["currency-controls"]}>
            <div className={exchange["currency-controls__group"]}>
              <Label htmlFor="source">پرداخت می‌کنید:</Label>
              <div>
                <Controller
                  name="source"
                  control={control}
                  render={({ field: { name, value, onChange } }) => (
                    <CurrencyInput
                      type="text"
                      name={name}
                      id={name}
                      value={value}
                      className="form-control"
                      onChange={(e) => {
                        onChange(e);
                        if (currencyRes) {
                          const value = e.target.value;
                          const result =
                            Number(value) * Number(currencyRes.rate);
                          setValue("destination", result.toString());
                          console.log("here", value, result);
                        }
                      }}
                      placeholder="مبلغ به "
                    />
                  )}
                />
                <Controller
                  name="sourceCurrency"
                  control={control}
                  render={({ field: { name, value } }) => (
                    <Dropdown
                      isOpen={isOpenSource}
                      toggle={toggleSource}
                      className={exchange.dropdown}
                    >
                      <DropdownToggle
                        caret
                        className={exchange["dropdown-btn"]}
                      >
                        <div className={exchange.selected}>
                          <div className={exchange["selected__inner"]}>
                            <div className={exchange["selected__item"]}>
                              <img
                                src={value.label.img}
                                alt="currency-icon"
                                width={20}
                                height={20}
                              />
                              {value.label.text}
                            </div>
                          </div>
                        </div>
                      </DropdownToggle>
                      <DropdownMenu className={exchange["dropdown-menu"]}>
                        {options.map((option, index) => (
                          <DropdownItem
                            key={index}
                            onClick={() => {
                              const other = getValues("destinationCurrency");
                              if (option.value === other.value) {
                                const filter = options.filter(
                                  (item) => item.value !== option.value,
                                );
                                setValue("destinationCurrency", {
                                  value: filter[0].value,
                                  label: filter[0].label,
                                });
                              }
                              setValue(name, {
                                value: option.value,
                                label: option.label,
                              });
                              getRate({
                                sourceCurrencyCode:
                                  option.value as CurrencyCode,
                                targetCurrencyCode: getValues(
                                  "destinationCurrency",
                                ).value as CurrencyCode,
                              });
                            }}
                          >
                            <div>
                              <img
                                src={option.label.img}
                                alt=""
                                className="bs-icon"
                                width={20}
                                height={20}
                                style={{ marginLeft: "5px" }}
                              />
                              <span style={{ fontSize: "12px" }}>
                                {" "}
                                {option.label.text}
                              </span>
                            </div>
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  )}
                />
              </div>
            </div>
            <div className={exchange.divider}>
              <span>
                <svg
                  width="19"
                  height="17"
                  viewBox="0 0 19 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 5H1L5 1"
                    stroke="#03041B"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M1 12L18 12L14 16"
                    stroke="#03041B"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </span>
            </div>
            <div className={exchange["currency-controls__group"]}>
              <Label className="form-label" style={{ color: "#03041b66" }}>
                دریافت می‌کنید:
              </Label>
              <div>
                <Controller
                  name="destination"
                  control={control}
                  render={({ field: { name, value, onChange } }) => (
                    <CurrencyInput
                      type="text"
                      name={name}
                      id={name}
                      value={value}
                      className="form-control"
                      onChange={(e) => {
                        onChange(e);
                        if (currencyRes) {
                          const value = e.target.value;
                          const result =
                            Number(value) / Number(currencyRes.rate);
                          setValue("source", result.toString());
                        }
                      }}
                      placeholder="مبلغ به "
                    />
                  )}
                />
                <Controller
                  name="destinationCurrency"
                  control={control}
                  render={({ field: { name, value } }) => (
                    <Dropdown
                      isOpen={isOpenDestination}
                      toggle={toggleDestination}
                      className={exchange.dropdown}
                    >
                      <DropdownToggle
                        caret
                        className={exchange["dropdown-btn"]}
                      >
                        <div className={exchange.selected}>
                          <div className={exchange["selected__inner"]}>
                            <div className={exchange["selected__item"]}>
                              <img
                                src={value.label.img}
                                alt="currency-icon"
                                width={20}
                                height={20}
                              />
                              {value.label.text}
                            </div>
                          </div>
                        </div>
                      </DropdownToggle>
                      <DropdownMenu className={exchange["dropdown-menu"]}>
                        {options.map((option, index) => (
                          <DropdownItem
                            key={index}
                            onClick={() => {
                              const other = getValues("sourceCurrency");
                              if (option.value === other.value) {
                                const filter = options.filter(
                                  (item) => item.value !== option.value,
                                );
                                setValue("sourceCurrency", {
                                  value: filter[0].value,
                                  label: filter[0].label,
                                });
                              }
                              setValue(name, {
                                value: option.value,
                                label: option.label,
                              });
                              getRate({
                                sourceCurrencyCode: getValues("sourceCurrency")
                                  .value as CurrencyCode,
                                targetCurrencyCode:
                                  option.value as CurrencyCode,
                              });
                            }}
                          >
                            <div>
                              <img
                                src={option.label.img}
                                alt=""
                                className="bs-icon"
                                width={20}
                                height={20}
                                style={{ marginLeft: "5px" }}
                              />
                              <span style={{ fontSize: "12px" }}>
                                {" "}
                                {option.label.text}
                              </span>
                            </div>
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="mt-5 mb-4 d-flex align-items-center justify-content-center">
            <button
              onClick={() =>
                navigate(`/dashboard/buy-sell`, {
                  //   state: {
                  //     source: payValue,
                  //     destination: receiveValue,
                  //   },
                })
              }
              type="button"
              className="btn btn-primary"
              style={{ padding: "18px 70px" }}
            >
              ثبت و ادامه
            </button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
}
