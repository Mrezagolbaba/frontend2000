import React, { useState } from "react";

import buy from "./styles.module.scss";
import { Col, Input, Row } from "reactstrap";
import { convertIRRToToman, convertText } from "helpers";

type Props = {
  payValue: any;
  passValue: any;
  commission: any;
};
export default function WageTable({ payValue, passValue, commission }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [commissionCurrency, setCommissionCurrency] = useState<string>(
    payValue?.currency
  );

  return (
    <div className={buy.wage}>
      <table className={buy.table}>
        <thead>
          <tr>
            <th scope="col" className="text-center">
              نحوه پرداخت کارمزد
            </th>
            <th scope="col" className="text-center">
              مبلغ کارمزد
            </th>
            <th scope="col" className="text-center">
              مبلغ نهایی دریافت
            </th>
          </tr>
        </thead>
        {!isLoading && (
          <tbody>
            <tr>
              <td className="text-center">
                <Row>
                  <Col lg={4} xs={6}>
                    <div className="radio-toggle-control">
                      <Input
                        type="radio"
                        name="rtc"
                        id="rtc1"
                        className="m-2"
                        checked={
                          commissionCurrency ===
                          convertText(payValue?.currency, "faToEn")
                        }
                        onChange={() => {
                          setCommissionCurrency(
                            convertText(payValue?.currency, "faToEn")
                          );
                        }}
                      />
                      <label>{convertText(payValue?.currency, "enToFa")}</label>
                    </div>
                  </Col>
                  <Col lg={5} xs={6}>
                    <div className="radio-toggle-control">
                      <Input
                        type="radio"
                        name="rtc"
                        id="rtc2"
                        className="m-2"
                        checked={
                          commissionCurrency ===
                          convertText(passValue?.currency, "faToEn")
                        }
                        onChange={() => {
                          setCommissionCurrency(
                            convertText(passValue?.currency, "faToEn")
                          );
                        }}
                      />
                      <label>
                        {convertText(passValue?.currency, "enToFa")}
                      </label>
                    </div>
                  </Col>
                </Row>
              </td>
              <td className="text-center">
                {commissionCurrency ===
                convertText(commission?.pass?.currency, "faToEn")
                  ? convertIRRToToman(commission?.pass?.amount || 0) +
                    " " +
                    convertText(passValue?.currency, "enToFa")
                  : convertIRRToToman(commission?.pay?.amount || 0) +
                    " " +
                    convertText(payValue?.currency, "enToFa")}
              </td>
              <td className="text-center">
                {commissionCurrency ===
                convertText(commission?.pass?.currency, "faToEn")
                  ? convertIRRToToman(
                      Number(passValue) - Number(commission.pass?.amount) || 0
                    ) +
                    " " +
                    convertText(passValue.currency, "enToFa")
                  : convertIRRToToman(
                      Number(passValue) - Number(commission.pay?.amount) || 0
                    ) +
                    " " +
                    convertText(passValue?.currency, "enToFa")}
              </td>
            </tr>
          </tbody>
        )}
      </table>

      {/* {isLodiang && (
                    <Skeleton loading={isLodiang} active={isLodiang} />
                  )}  */}
    </div>
  );
}
