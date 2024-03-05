import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import moment from "jalali-moment";
import Deposit from "assets/img/icons/depositIcon.svg";
import { convertCoins, convertIRRToToman, convertStatus, convertTextSingle, tomanShow } from "helpers";
import { useTransactionsQuery } from "store/api/wallet-management";

const Orders = () => {
  const { data, isLoading } = useTransactionsQuery({
    sort: "createdAt,DESC",
  });
  const transActions = data?.filter(
    (item) =>
      item.status !== "EXPIRED" &&
      item.status !== "INITIATED" &&
      item.status !== "DRAFT" &&
      (item.type === "DEPOSIT" || item.type === "WITHDRAW"),
  );

  return (
    <section className="page page-orders">
      <Card className="custom-card currencies-online-rates card-secondary">
        <CardHeader className="d-flex flex-row justify-content-between align-items-center">
          <CardTitle tag="h5">آخرین تراکنش ها</CardTitle>
        </CardHeader>
        <CardBody>
        <div className={"table-responsive"}>
          <table className="table table-borderless table-striped">
            {transActions && transActions?.length > 0 ? (
              <>
                <thead>
                  <tr>
                    <th
                      scope="col"
                      style={{ color: "#03041b66" }}
                      className="text-center"
                    >
                      نوع تراکنش
                    </th>
                    <th
                      scope="col"
                      style={{ color: "#03041b66" }}
                      className="text-center"
                    >
                      ارز
                    </th>
                    <th
                      scope="col"
                      style={{ color: "#03041b66" }}
                      className="text-center"
                    >
                      مقدار
                    </th>
                    <th
                      scope="col"
                      style={{ color: "#03041b66" }}
                      className="text-center"
                    >
                      وضعیت
                    </th>
                    <th
                      scope="col"
                      style={{ color: "#03041b66" }}
                      className="text-center"
                    >
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
                        <td className="text-center">
                          <span
                            className={
                              item.type === "DEPOSIT"
                                ? "text-success"
                                : "text-danger"
                            }
                          >
                            {item.type === "DEPOSIT" ? "واریز" : "برداشت"}
                          </span>
                        </td>
                        <td className="text-center">
                          {convertCoins(item.currencyCode)}
                        </td>
                        <td className="text-center">
                          {item.currencyCode === "IRR" ? (
                            <span className="text-center">
                              {convertIRRToToman(
                                Number(item.amount),
                              ).toLocaleString()}
                            </span>
                          ) : (
                            <span className="text-center">
                              {Number(item.amount).toLocaleString()}
                            </span>
                          )}
                        </td>
                        <td className="text-center">
                          <span
                            className={`${
                              item.status === "CANCELED" ||
                              item.status === "FAILED" ||
                              item.status === "EXPIRED"
                                ? "text-danger"
                                : item.status === "SUCCESSFUL"
                                  ? "text-success"
                                  : "text-secondary"
                            }`}
                          >
                            {convertStatus(item.status)}
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="d-ltr d-block">
                            {moment(item?.createdAt)
                              .locale("fa")
                              .format("DD MMMM YYYY")}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </>
            ) : (
              <tr>
                <td colSpan={4} className="text-center">
                  <img
                    src={Deposit}
                    style={{
                      height: "50px",
                      width: "50px",
                      marginBottom: "10px",
                    }}
                  />
                  <div className="text-dark">
                    اولین معامله خود را با آرسونیکس تجربه کنید
                  </div>
                </td>
              </tr>
            )}
          </table>
        </div>
        </CardBody>
      </Card>
    </section>
  );
};
export default Orders;
