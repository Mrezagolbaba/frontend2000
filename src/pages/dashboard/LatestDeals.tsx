import React from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { useTransactionsQuery } from "store/api/wallet-management";
import dashboard from "assets/scss/dashboard/dashboard.module.scss";
function LatestDeals() {
  const { data, isLoading } = useTransactionsQuery({});
  const transActions = data?.filter(
    (item) =>
      item.status !== "EXPIRED" &&
      item.status !== "INITIATED" &&
      item.status !== "DRAFT" &&
      (item.type === "DEPOSIT" || item.type === "WITHDRAW"),
  );
  return (
    <Card className="h-100">
      <CardHeader>
        <CardTitle tag="h5">تراکنش&zwnj;های اخیر</CardTitle>
      </CardHeader>
      <CardBody>
        <div className={dashboard["table-responsive"]}>
          <table
            className={`${dashboard["data-table"]} ${dashboard["table-striped"]}`}
          >
            <thead>
              <tr>
                <th scope="col">نوع</th>
                <th scope="col" className="text-center">
                  بازار
                </th>
                <th scope="col" className="text-center">
                  مقدار
                </th>
                <th scope="col" className="text-start">
                  تاریخ
                </th>
              </tr>
            </thead>
            {isLoading ? (
              <tbody>
                <tr>
                  <td className="placeholder-glow">
                    <div className="placeholder col-12 rounded" />
                  </td>
                  <td className="placeholder-glow">
                    <div className="placeholder col-12 rounded" />
                  </td>
                  <td className="placeholder-glow">
                    <div className="placeholder col-12 rounded" />
                  </td>
                  <td className="placeholder-glow">
                    <div className="placeholder col-12 rounded" />
                  </td>
                  <td className="placeholder-glow">
                    <div className="placeholder col-12 rounded" />
                  </td>
                </tr>
                <tr>
                  <td className="placeholder-glow">
                    <div className="placeholder col-12 rounded" />
                  </td>
                  <td className="placeholder-glow">
                    <div className="placeholder col-12 rounded" />
                  </td>
                  <td className="placeholder-glow">
                    <div className="placeholder col-12 rounded" />
                  </td>
                  <td className="placeholder-glow">
                    <div className="placeholder col-12 rounded" />
                  </td>
                  <td className="placeholder-glow">
                    <div className="placeholder col-12 rounded" />
                  </td>
                </tr>
                <tr>
                  <td className="placeholder-glow">
                    <div className="placeholder col-12 rounded" />
                  </td>
                  <td className="placeholder-glow">
                    <div className="placeholder col-12 rounded" />
                  </td>
                  <td className="placeholder-glow">
                    <div className="placeholder col-12 rounded" />
                  </td>
                  <td className="placeholder-glow">
                    <div className="placeholder col-12 rounded" />
                  </td>
                  <td className="placeholder-glow">
                    <div className="placeholder col-12 rounded" />
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {transActions?.map((item) => (
                  <tr>
                    <td>
                      <span
                        className={
                          item.type === "DEPOSIT"
                            ? "text-success"
                            : "text-error"
                        }
                      >
                        {item.type === "DEPOSIT" ? "واریز" : "برداشت"}
                      </span>
                    </td>
                    <td className="text-center">{item.currencyCode}</td>
                    <td className="text-center">
                      {Number(item.amount).toLocaleString()}
                    </td>
                    <td className="text-start">
                      <span className="d-ltr d-block">
                        {`${new Date(item.createdAt).toLocaleDateString(
                          "IR-fa",
                        )} - ${new Date(item.createdAt).toLocaleTimeString(
                          "IR-fa",
                        )}`}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}

            {/* <tbody>
              {data?.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <span
                        className={
                          data.type === "DEPOSIT"
                            ? "text-success"
                            : "text-danger"
                        }
                      >
                        {convertType(data.type)}
                      </span>
                    </td>
                    <td className={`text-center`}>
                      <span>
                        <span style={{ fontSize: "10px" }}>
                          {data.currencyCode === "IRR"
                            ? "TMN"
                            : data.currencyCode}
                        </span>{" "}
                        {data.amount}
                      </span>
                    </td>
                    <td className={`text-center`}>
                      <span>{convertTextSingle(data.currencyCode)}</span>
                    </td>
                    <td className={`text-center`}>
                      <span>
                        {moment(data?.createdAt)
                          .locale("fa")
                          .format("DD MMMM YYYY")}
                      </span>
                    </td>
                    <td className={`text-center`}>
                      <span
                        className={
                          data.status === "SUCCESSFUL"
                            ? "text-success"
                            : "text-danger"
                        }
                      >
                        {data.status === "SUCCESSFUL" ? " موفق" : "ناموفق"}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {filteredData?.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center">
                    <img
                      src={Exchange}
                      style={{
                        height: "50px",
                        width: "50px",
                        marginBottom: "10px",
                      }}
                    />
                    <p>اولین معامله خود را با آرسونیکس تجربه کنید</p>
                  </td>
                </tr>
              )}
            </tbody> */}
          </table>
        </div>
      </CardBody>
    </Card>
  );
}

export default LatestDeals;
