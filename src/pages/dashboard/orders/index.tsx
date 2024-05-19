import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { coinShow, convertTextSingle, lirShow, tomanShow } from "helpers";
import Deposit from "assets/img/icons/depositIcon.svg";
import moment from "jalali-moment";
import { useCurrencySwapQuery } from "store/api/exchange-management";
import SquareInfo from "components/Icons/SquareInfo";
import { useNavigate } from "react-router-dom";

const History = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useCurrencySwapQuery({
    sort: "createdAt,DESC",
    join: "transactions",
  });

  const renderFee = (source, fee, transactions) => {
    const feeIndex = source == fee ? 0 : 1;

    switch (fee) {
      case "USDT":
        return coinShow(transactions[feeIndex]?.fee, "USDT");
      case "TRY":
        return lirShow({ value: transactions[feeIndex]?.fee, currency: "TRY" });
      default:
        return tomanShow({
          value: transactions[feeIndex]?.fee,
          currency: "IRR",
        });
    }
  };

  const renderAmount = (currency, amount) => {
    switch (currency) {
      case "USDT":
        return coinShow(amount, "USDT");
      case "TRY":
        return lirShow({ value: amount, currency: "TRY" });
      default:
        return tomanShow({
          value: amount,
          currency: "IRR",
        });
    }
  };
  return (
    <Card className="h-100">
      <CardHeader className="d-flex flex-row justify-content-between align-items-center">
        <CardTitle tag="h5"> سفارشات من </CardTitle>
      </CardHeader>
      <CardBody>
        <div className="table-responsive">
          <table className="table table-borderless table-striped">
            {data?.length > 0 ? (
              <>
                <thead>
                  <tr>
                    <th
                      scope="col"
                      style={{ color: "#03041b66" }}
                      className="text-center"
                    >
                      بازار مبدا
                    </th>
                    <th
                      scope="col"
                      style={{ color: "#03041b66" }}
                      className="text-center"
                    >
                      بازار مقصد
                    </th>
                    <th
                      scope="col"
                      style={{ color: "#03041b66" }}
                      className="text-center"
                    >
                      پرداخت شده
                    </th>
                    <th
                      scope="col"
                      style={{ color: "#03041b66" }}
                      className="text-center"
                    >
                      کارمزد معامله
                    </th>
                    <th
                      scope="col"
                      style={{ color: "#03041b66" }}
                      className="text-center"
                    >
                      دریافت شده
                    </th>
                    <th
                      scope="col"
                      style={{ color: "#03041b66" }}
                      className="text-center"
                    >
                      تاریخ
                    </th>
                    <th
                      scope="col"
                      style={{ color: "#03041b66" }}
                      className="text-center"
                    >
                      جزییات
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
                    {data?.map((data, index) => (
                      <tr key={index}>
                        <td className="text-center">
                          <span className="text-success">
                            {convertTextSingle(data?.destinationCurrencyCode)}
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="text-danger">
                            {convertTextSingle(data?.sourceCurrencyCode)}
                          </span>
                        </td>
                        <td className="text-center">
                          {renderAmount(
                            data?.sourceCurrencyCode,
                            data?.sourceAmount,
                          )}
                        </td>
                        <td className="text-center">
                          {renderFee(
                            data?.sourceCurrencyCode,
                            data?.feeCurrencyCode,
                            data?.transactions,
                          )}
                        </td>
                        <td className="text-center">
                          {renderAmount(
                            data?.destinationCurrencyCode,
                            data?.destinationAmount,
                          )}
                        </td>
                        <td className="text-center">
                          <span className="text-center">
                            {moment(data?.createdAt)
                              .locale("fa")
                              .format("hh:mm , YYYY/MM/DD")}
                          </span>
                        </td>
                        <td className="text-center">
                          <SquareInfo
                            onClick={() =>
                              navigate(`/dashboard/invoice/${data?.id}`)
                            }
                            width={24}
                            height={24}
                            style={{
                              cursor: "pointer",
                            }}
                          />
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
};
export default History;
