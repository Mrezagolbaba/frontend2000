import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";
import { convertTextSingle, extractLeftSide, normalizeAmount } from "helpers";
import { useGetRatesQuery } from "store/api/publics";

import dashboard from "assets/scss/dashboard/dashboard.module.scss";

export default function TradingMarkets() {
  const { data, isLoading } = useGetRatesQuery({});

  return (
    <Card className="h-100">
      <CardHeader className="d-flex flex-row justify-content-between align-items-center">
        <CardTitle tag="h5"> بازارهای معاملاتی</CardTitle>
        <div className="card-action">
          <Link to="/dashboard/market" className={dashboard["sub-link"]}>
            تمام بازارها
          </Link>
        </div>
      </CardHeader>
      <CardBody>
        <div className={dashboard["table-responsive"]}>
          <table id="responsive" className={dashboard["data-table"]}>
            <thead>
              <tr className="tr-responsive">
                <th className="text-center">نام ارز</th>
                <th className="text-center">قیمت (تومان)</th>
                {/* <th>تغییرات 24 ساعته</th> */}
                <th className="text-center">معامله در بازار</th>
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
                </tr>
              </tbody>
            ) : (
              <tbody>
                {data?.length > 0 &&
                  data.map(
                    (record, index) =>
                      (record.pair === "USDT/IRR" ||
                        record.pair === "TRY/IRR") && (
                        <tr className="tr-responsive" key={index}>
                          <td className="text-center" data-th="نام ارز">
                            <div>
                              <span className="icon">
                                {record.pair === "USDT/IRR" ? (
                                  <svg
                                    viewBox="0 0 32 32"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#000000"
                                  >
                                    <g
                                      id="SVGRepo_bgCarrier"
                                      stroke-width="0"
                                    ></g>
                                    <g
                                      id="SVGRepo_tracerCarrier"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                      {" "}
                                      <g fill="none" fill-rule="evenodd">
                                        {" "}
                                        <circle
                                          cx="16"
                                          cy="16"
                                          r="16"
                                          fill="#26A17B"
                                        ></circle>{" "}
                                        <path
                                          fill="#FFF"
                                          d="M17.922 17.383v-.002c-.11.008-.677.042-1.942.042-1.01 0-1.721-.03-1.971-.042v.003c-3.888-.171-6.79-.848-6.79-1.658 0-.809 2.902-1.486 6.79-1.66v2.644c.254.018.982.061 1.988.061 1.207 0 1.812-.05 1.925-.06v-2.643c3.88.173 6.775.85 6.775 1.658 0 .81-2.895 1.485-6.775 1.657m0-3.59v-2.366h5.414V7.819H8.595v3.608h5.414v2.365c-4.4.202-7.709 1.074-7.709 2.118 0 1.044 3.309 1.915 7.709 2.118v7.582h3.913v-7.584c4.393-.202 7.694-1.073 7.694-2.116 0-1.043-3.301-1.914-7.694-2.117"
                                        ></path>{" "}
                                      </g>{" "}
                                    </g>
                                  </svg>
                                ) : (
                                  <svg
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <g
                                      id="SVGRepo_bgCarrier"
                                      stroke-width="0"
                                    ></g>
                                    <g
                                      id="SVGRepo_tracerCarrier"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                      <path
                                        clip-rule="evenodd"
                                        d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm11-6a1 1 0 1 0-2 0v1.28l-2.316.771a1 1 0 1 0 .632 1.898L10 9.387v.892l-2.316.772a1 1 0 0 0 .632 1.898L10 12.387V17a1 1 0 0 0 1 1c.993 0 2.461-.29 3.71-1.189C16.008 15.876 17 14.326 17 12a1 1 0 1 0-2 0c0 1.674-.675 2.624-1.46 3.188a4.402 4.402 0 0 1-1.54.687V11.72l2.316-.772a1 1 0 0 0-.632-1.898L12 9.613V8.72l2.316-.772a1 1 0 1 0-.632-1.898L12 6.613V6z"
                                        fill-rule="evenodd"
                                        fill="#ff0505"
                                      ></path>
                                    </g>
                                  </svg>
                                )}
                              </span>
                              <span className={dashboard["text-50"]}>
                                {convertTextSingle(
                                  extractLeftSide(record.pair),
                                )}
                              </span>
                            </div>
                          </td>
                          <td
                            className="text-center"
                            data-th="قیمت واحد (تومان)"
                          >
                            <span className="td-responsive">
                              {normalizeAmount(record?.rate, "IRR", false)}
                            </span>
                          </td>

                          <td
                            className="text-center"
                            data-th="معامله در بازار
"
                          >
                            <Link
                              to="/dashboard/exchange"
                              className={dashboard["sub-link"]}
                            >
                              شروع معامله
                            </Link>
                          </td>
                        </tr>
                      ),
                  )}
              </tbody>
            )}
          </table>
        </div>
      </CardBody>
    </Card>
  );
}
