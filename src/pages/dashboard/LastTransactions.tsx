import React from "react";
import moment from "jalali-moment";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";
import { tomanShow } from "helpers";
import { useCurrencySwapQuery } from "store/api/exchange-management";

import Deposit from "assets/img/icons/depositIcon.svg";
import dashboard from "assets/scss/dashboard/dashboard.module.scss";

export default function LastTransactions() {
  const { data } = useCurrencySwapQuery({
    sort: "createdAt,DESC",
    join: "transactions",
  });
  return (
    <Card className="h-100">
      <CardHeader className="d-flex flex-row justify-content-between align-items-center">
        <CardTitle tag="h5"> آخرین معاملات</CardTitle>
        <div className="card-action">
          <Link className={dashboard["sub-link"]} to="/dashboard/orders">
            سفارشات من
          </Link>
        </div>
      </CardHeader>
      <CardBody>
        <div className={dashboard["table-responsive"]}>
          <table
            className={`${dashboard["data-table"]} ${dashboard["table-striped"]}`}
          >
            {data && data?.length > 0 && (
              <thead>
                <tr>
                  <th scope="col">بازار</th>
                  <th scope="col">مقدار</th>
                  <th scope="col">مفدار دریافتی </th>
                  <th scope="col">زمان</th>
                </tr>
              </thead>
            )}
            <tbody>
              {data &&
                data?.length > 0 &&
                data.slice(-7).map((item, index) => (
                  <tr key={index}>
                    <td>
                      <span className="text-success">
                        {item.destinationCurrencyCode}
                      </span>{" "}
                      -{" "}
                      <span className="text-danger">
                        {item?.sourceCurrencyCode}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: "10px" }}>
                        {item.sourceCurrencyCode === "IRR"
                          ? "TMN"
                          : item.sourceCurrencyCode}
                      </span>{" "}
                      {item.sourceCurrencyCode === "IRR"
                        ? (Number(item?.sourceAmount) / 10).toLocaleString()
                        : Number(item?.sourceAmount).toLocaleString()}
                    </td>
                    <td>
                      <span style={{ fontSize: "10px" }}>
                        {item.destinationCurrencyCode === "IRR"
                          ? "TMN"
                          : item.destinationCurrencyCode}
                      </span>{" "}
                      {item.destinationCurrencyCode === "IRR"
                        ? tomanShow({ value: item?.destinationAmount })
                        : item?.destinationAmount}
                    </td>
                    <td>
                      <span className="d-ltr d-block">
                        {moment(item?.createdAt)
                          .locale("fa")
                          .format("HH:MM YYYY/MM/DD")}
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
