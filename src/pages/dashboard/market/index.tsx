import Turkey from "assets/img/coins/try.svg";
import USDT from "assets/img/coins/usdt.svg";
import { Card, CardBody, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";
import { convertTextSingle, extractLeftSide, tomanShow } from "helpers";
import { useGetRatesQuery } from "store/api/publices";

import dashboard from "assets/scss/dashboard/dashboard.module.scss";

const Market = () => {
  // ==============|| Hooks ||================= //
  const { data } = useGetRatesQuery({});

  // ==============|| Render ||================= //
  return (
    <section className="page page-market">
      <Card>
        <CardHeader>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h5 className="card-title">بازارهای معاملاتی</h5>
            <div className="card-action">
              <Link to="/dashboard/exchange" className="btn-simple">
                معامله سریع
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className={dashboard["table-responsive"]}>
            <table id="responsive" className={dashboard["data-table"]}>
              <thead>
                <tr>
                  <th scope="col">ارز</th>
                  <th scope="col" className="text-center">
                    آخرین قیمت(تومان)
                  </th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map(
                    (record, index) =>
                      (record.pair === "USDT/IRR" ||
                        record.pair === "TRY/IRR") && (
                        <tr key={index}>
                          <td style={{ display: "flex", alignItems: "center" }}>
                            <div style={{ marginRight: "10px" }}>
                              <span className="icon">
                                {record.pair === "USDT/IRR" ? (
                                  <img
                                    src={USDT}
                                    alt=""
                                    style={{ width: "20px", marginLeft: "5px" }}
                                  />
                                ) : (
                                  <img
                                    src={Turkey}
                                    alt=""
                                    style={{ width: "20px", marginLeft: "5px" }}
                                  />
                                )}
                              </span>
                              <span className="text-50 m-fa">
                                {convertTextSingle(
                                  extractLeftSide(record.pair),
                                )}
                              </span>
                            </div>
                          </td>
                          <td className="text-center">
                            <div className="market-data">
                              <span className="m-fa">
                                {tomanShow({ value: record.rate })}
                              </span>
                            </div>
                          </td>
                          <td className="text-center">
                            <div className="market-data">
                              <Link
                                to="/dashboard/exchange"
                                className="btn-simple tm__actions"
                              >
                                شروع معامله
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ),
                  )}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </section>
  );
};
export default Market;
