import Deposit from "assets/img/icons/depositIcon.svg";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { useTransactionsQuery } from "store/api/wallet-management";
import dashboard from "assets/scss/dashboard/dashboard.module.scss";
import { convertCoins, convertIRRToToman, convertStatus } from "helpers";

function LatestDeals() {
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
    <Card className="h-100">
      <CardHeader className="d-flex flex-row justify-content-between align-items-center">
        <CardTitle tag="h5"> تراکنش های اخیر</CardTitle>
        <a className={dashboard["sub-link"]} href="/dashboard/history">
          تاریخچه
        </a>
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
                    {transActions.slice(-7)?.map((item,index) => (
                      <tr key={index}>
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
                        {
                          item.currencyCode === "IRR" ? <td>{convertIRRToToman(Number(item.amount)).toLocaleString()}</td> : <td>{Number(item.amount).toLocaleString()}</td>
                        }
                        <td>
                          <span
                            className={`${item.status === "CANCELED" ||
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
                            {`${new Date(item?.createdAt).toLocaleTimeString("fa-IR")} ${new Date(
                              item?.createdAt,
                            ).toLocaleDateString("fa-IR")}`}
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
  );
}

export default LatestDeals;
