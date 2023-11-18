import React, { useState } from "react";

import buy from "./styles.module.scss";
import { Col, Input, Row } from "reactstrap";
import { convertIRRToToman, convertText } from "helpers";
import { useForm, useList } from "@refinedev/core";

type Props = {
  payInfo: any;
  passInfo: any;
  commissionCurrency?: string;
  setCommissionCurrency: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  commissions?: any;
  passValue: string | number;
};
export default function WageTable({
  payInfo,
  passInfo,
  commissionCurrency,
  setCommissionCurrency,
  commissions,
  passValue,
}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
                          convertText(payInfo?.currency, "faToEn")
                        }
                        onChange={() => {
                          setCommissionCurrency(
                            convertText(payInfo?.currency, "faToEn")
                          );
                        }}
                      />
                      <label>{convertText(payInfo?.currency, "enToFa")}</label>
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
                          convertText(passInfo?.currency, "faToEn")
                        }
                        onChange={() => {
                          setCommissionCurrency(
                            convertText(passInfo?.currency, "faToEn")
                          );
                        }}
                      />
                      <label>{convertText(passInfo?.currency, "enToFa")}</label>
                    </div>
                  </Col>
                </Row>
              </td>
              <td className="text-center">
                {commissionCurrency ===
                convertText(commissions?.pass.currency, "faToEn")
                  ? convertIRRToToman(commissions?.get.amount) +
                    convertText(passInfo?.currency, "enToFa")
                  : convertIRRToToman(commissions?.pay.amount) +
                    convertText(payInfo?.currency, "enToFa")}
              </td>
              <td className="text-center">
                {commissionCurrency ===
                convertText(commissions?.pass.currency, "faToEn")
                  ? convertIRRToToman(
                      Number(passValue) - commissions.get.amount
                    ) + convertText(passInfo.currency, "enToFa")
                  : convertIRRToToman(
                      Number(passValue) - commissions.pay.amount
                    ) + convertText(passInfo.currency, "enToFa")}
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
