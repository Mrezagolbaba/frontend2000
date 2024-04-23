import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { convertTextSingle, tomanShow } from "helpers";
import Deposit from "assets/img/icons/depositIcon.svg";
import moment from "jalali-moment";
import { useCurrencySwapQuery } from "store/api/exchange-management";

const History = () => {
  const { data, isLoading } = useCurrencySwapQuery({
    sort: "createdAt,DESC",
    join: "transactions",
  });
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
                      بازار
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
                      مقدار دریافتی
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
                    {data?.map((data, index) => (
                      <tr key={index}>
                        <td className="text-center">
                          <span className="text-success">
                            {convertTextSingle(data.destinationCurrencyCode)}
                          </span>{" "}
                          -{" "}
                          <span className="text-danger">
                            {convertTextSingle(data?.sourceCurrencyCode)}
                          </span>
                        </td>
                        <td className="text-center">
                          <span style={{ fontSize: "10px" }}>
                            {data.sourceCurrencyCode === "IRR"
                              ? "TMN"
                              : data.sourceCurrencyCode}
                          </span>{" "}
                          {data.sourceCurrencyCode === "IRR"
                            ? tomanShow({ value: data?.sourceAmount })
                            : data?.sourceAmount}
                        </td>
                        <td className="text-center">
                          <span style={{ fontSize: "10px" }}>
                            {data.destinationCurrencyCode === "IRR"
                              ? "TMN"
                              : data.destinationCurrencyCode}
                          </span>{" "}
                          {data.destinationCurrencyCode === "IRR"
                            ? tomanShow({ value: data?.destinationAmount })
                            : data?.destinationAmount}
                        </td>
                        <td className="text-center">
                          <span className="text-center">
                            {moment(data?.createdAt)
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
  );
};
export default History;
