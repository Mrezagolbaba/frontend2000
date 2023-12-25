import React from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";

import dashboard from "assets/scss/dashboard/dashboard.module.scss";
import { useCurrencySwapQuery } from "store/api/exchange-management";
import { convertTextSingle } from "helpers";
import moment from "jalali-moment";

import Deposit from "assets/img/icons/depositIcon.svg";

export default function LastTransactions() {
  const { data, isLoading } = useCurrencySwapQuery({
    params: {
      join: "transactions",
    },
  });

  return (
    <Card className="h-100">
      <CardHeader className="d-flex flex-row justify-content-between align-items-center">
        <CardTitle tag="h5"> تراکنش های اخیر </CardTitle>
        <a className={dashboard["sub-link"]} href="/dashboard/orders">
          سفارشات من
        </a>
      </CardHeader>
      <CardBody>
        <div className="table-responsive">
          <table className={`table table-borderless table-striped`}>
            {data && data?.length > 0 && (
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    بازار
                  </th>
                  <th scope="col" className="text-center">
                    مقدار
                  </th>
                  <th scope="col" className="text-center">
                    قیمت واحد
                  </th>
                  <th scope="col" className="text-start">
                    تاریخ
                  </th>
                </tr>
              </thead>
            )}
            <tbody>
              {data &&
                data?.length > 0 &&
                data.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center">
                      <span className="text-success">
                        {convertTextSingle(item.destinationCurrencyCode)}
                      </span>{" "}
                      -{" "}
                      <span className="text-danger">
                        {convertTextSingle(item?.sourceCurrencyCode)}
                      </span>
                    </td>
                    <td className="text-center">
                      <span style={{ fontSize: "10px" }}>
                        {item.sourceCurrencyCode}
                      </span>{" "}
                      {Number(item?.sourceAmount).toLocaleString()}
                    </td>
                    <td className="text-center">
                      {item?.exchangeRate.substring(0, 5)}
                    </td>
                    <td className="text-start">
                      <span className="d-ltr d-block">
                        {moment(item?.createdAt)
                          .locale("fa")
                          .format("DD MMMM YYYY")}
                      </span>
                    </td>
                  </tr>
                ))}
              {!data ||
                (data?.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center bg-white">
                      <img
                        src={Deposit}
                        style={{
                          height: "50px",
                          width: "50px",
                          marginBottom: "10px",
                        }}
                      />
                      <p>اولین تراکنش خود را با آرسونیکس تجربه کنید</p>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
}
