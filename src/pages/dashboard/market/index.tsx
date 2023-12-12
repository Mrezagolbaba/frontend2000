import {
  convertIRRToToman,
  convertTextSingle,
  extractLeftSide,
  rialToToman,
} from "helpers";
import { useEffect } from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { getRates } from "store/reducers/features/rates/rateSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import USDT from "assets/img/coins/usdt.svg";
import Turkey from "assets/img/coins/try.svg";

const Market = () => {
  const dispatch = useAppDispatch();
  const rates = useAppSelector((state) => state.rates);

  useEffect(() => {
    dispatch(getRates());
  }, []);
  return (
    <section className="page page-market">
      <Card>
        <CardHeader>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h5 className="card-title">بازارهای معاملاتی</h5>
            <div className="card-action">
              <a href="/dashboard/buy-sell" className="btn-simple">
                معامله سریع
              </a>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          {/* <div className="table-filters">
                        <div className="table-filter">
                            <select className="bs-select-control bs-select-dropdown">
                                <option value="11">نوع ارز</option>
                                <option value="12">ارز دیجیتال</option>
                                <option value="13">فیات دیجیتال</option>
                            </select>
                        </div>
                        <div className="table-filter">
                            <select className="bs-select-control bs-select-dropdown">
                                <option value="1">پایه بازار</option>
                                <option value="4">تومان</option>
                                <option value="2">لیر</option>
                                <option value="3">تتر</option>
                                <option value="5">دلار</option>
                            </select>
                        </div>
                        <div className="table-filter">
                            <select className="bs-select-control bs-select-dropdown">
                                <option value="6">محبوب‌ترین‌ها</option>
                                <option value="7">جدید‌ترین‌ها</option>
                                <option value="8">بیشترین تغییر (24h)</option>
                            </select>
                        </div>
                    </div> */}
          <div className="table-responsive">
            <table className="table-modern table table-borderless">
              <thead>
                <tr>
                  <th scope="col">ارز</th>
                  <th scope="col" className="text-center">
                    آخرین قیمت(تومان)
                  </th>
                  {/* <th scope="col" className="text-center">کمترین قیمت (24h)</th> */}
                  {/* <th scope="col" className="text-center">تغییرات (24h)</th> */}
                </tr>
              </thead>
              <tbody>
                {rates &&
                  rates.data.map((data) => (
                    <tr>
                      <td style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ marginRight: "10px" }}>
                          <span className="icon">
                            {data.pair === "USDT/IRR" ? <img src={USDT} alt="" style={{ width: '20px', marginLeft: '5px' }} /> :
                              <img src={Turkey} alt="" style={{ width: '20px', marginLeft: '5px' }} />}
                          </span>
                          <span className="text-50 m-fa">
                            {convertTextSingle(extractLeftSide(data.pair))}
                          </span>
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="market-data">
                          <span className="m-fa">
                            
                            {convertIRRToToman(data?.rate)}
                          </span>
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="market-data">
                          <a
                            href="/dashboard/buy-sell"
                            className="btn-simple tm__actions"
                          >
                            شروع معامله
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </section>
  );
};
export default Market;
