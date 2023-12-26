import Deposit from "assets/img/icons/depositIcon.svg";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { useTransactionsQuery } from "store/api/wallet-management";
import dashboard from "assets/scss/dashboard/dashboard.module.scss";
import { TransactionStatus } from "types/wallet";
import moment from "jalali-moment";

function LatestDeals() {
  const { data, isLoading } = useTransactionsQuery({});
  const transActions = data?.filter(
    (item) =>
      item.status !== "EXPIRED" &&
      item.status !== "INITIATED" &&
      item.status !== "DRAFT" &&
      (item.type === "DEPOSIT" || item.type === "WITHDRAW"),
  );
  const convertCoins = (value) => {
    switch (value) {
      case "USDT":
        return "تتر";
      case "TRX":
        return "ترون";
      case "TRY":
        return "لیر ترکیه";
      case "IRR":
      default:
        return "تومان";
    }
  };

  const convertStatus = (value: TransactionStatus) => {
    switch (value) {
      case "INITIATED":
        return "ایجاد شده";
      case "PROCESSING":
        return "در حال پردازش";
      case "SUCCESSFUL":
        return "موفق";

      case "FAILED":
        return "ناموفق";
      case "EXPIRED":
        return "تمام شده";
      case "CANCELED":
        return "لغو شده";
      case "DRAFT":
      default:
        return "پیش نویس";
    }
  };
  return (
    <Card className="h-100">
      <CardHeader className="d-flex flex-row justify-content-between align-items-center">
        <CardTitle tag="h5">آخرین معاملات</CardTitle>
        <div className="card-action">
          <a className={dashboard["sub-link"]} href="/dashboard/history">
            تاریخچه
          </a>
        </div>
      </CardHeader>
      <CardBody>
        <div className={dashboard["table-responsive"]}>
          <table
            className={`${dashboard["data-table"]} ${dashboard["table-striped"]}`}
          >
            {transActions && transActions.length > 0 ? (
              <>
                <thead>
                  <tr>
                    <th scope="col">نوع تراکنش</th>
                    <th scope="col">ارز</th>
                    <th scope="col">مقدار</th>
                    <th scope="col">وضعیت</th>
                    <th scope="col">تاریخ</th>
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
                                : "text-danger"
                            }
                          >
                            {item.type === "DEPOSIT" ? "واریز" : "برداشت"}
                          </span>
                        </td>
                        <td>{convertCoins(item.currencyCode)}</td>
                        <td>{Number(item.amount).toLocaleString()}</td>
                        <td>
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
                        <td>
                          <span className="d-ltr d-block">
                            {moment(item?.createdAt)
                              .locale("fa")
                              .format("HH:MM YYYY/MM/DD")}
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
