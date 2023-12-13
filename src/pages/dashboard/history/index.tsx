import { useEffect, useState } from "react";
import { Col, Tabs } from "antd";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { getCurrencySwap } from "services/exchange";
import s from './styles.module.scss';
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getExchangeList } from "store/reducers/features/exchange/exchangeSlice";
import { getTransactionsList } from "store/reducers/features/transaction/transactionSlice";
import { convertTextSingle } from "helpers";
import moment from "jalali-moment";
const History = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const transactions = useAppSelector((state) => state.transaction);
  const exchange = useAppSelector((state) => state.exchange);
  const [activeTab, setActiveTab] = useState<string>("1");


  useEffect(() => {

    dispatch(getTransactionsList(user.id));

  }, []);
  const handleChangeTab = (active: string) => {
    setActiveTab(active);
  };

  useEffect(() => {
    dispatch(getExchangeList(user.id));
    dispatch(getTransactionsList(user.id));
  }, []);
  const TabOption: TabOptionProps[] = [
    {
      label: <CardTitle>واریز و برداشت فیات   </CardTitle>,
      key: "2",
      children: (
        <div className={`tab-pane fade  ${activeTab === "2" && " show active"}`}>
          <div className="table-responsive">
            <table className="table table-borderless table-striped ">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    مقدار واریزی (تومان)
                  </th>
                  <th scope="col" className="text-center">
                    شناسه پرداخت
                  </th>
                  <th scope="col" className="text-center">
                    تاریخ پرداخت
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">1,000,000</td>
                  <td className="text-center">12323412341234</td>
                  <td className="text-center">
                    <span className="d-ltr d-block">01/06/08 - 11:34</span>
                  </td>
                </tr>
                <tr>
                  <td className="text-center">1,000,000</td>
                  <td className="text-center">12323412341234</td>
                  <td className="text-center">
                    <span className="d-ltr d-block">01/06/08 - 11:34</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      label: <CardTitle> واریز و برداشت ارز دیجیتال     </CardTitle>,
      key: "3",
      children: (
        <div
          className={`tab-pane fade  ${activeTab === "3" && " show active"}`}
          id="tab-2"
          role="tabpanel"
          aria-labelledby="tab2"
        >
          <div className="table-filters">
            <div className="table-filter">
              <select name="" className="bs-select-control bs-select-dropdown">
                <option value="3">تایید شده</option>
                <option value="1">تایید شده</option>
              </select>
            </div>
            <div className="table-filter">
              <select name="" className="bs-select-control bs-select-dropdown">
                <option value="3">نوع کوین</option>
                <option value="1">نوع کوین</option>
              </select>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-borderless table-striped">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    نوع کوین
                  </th>
                  <th scope="col" className="text-center">
                    مقدار درخواستی
                  </th>
                  <th scope="col" className="text-center">
                    کارمزد انتقال
                  </th>
                  <th scope="col" className="text-center">
                    شماره ولت جهت تسویه حساب
                  </th>
                  <th scope="col" className="text-center">
                    تاریخ درخواست
                  </th>
                  <th scope="col" className="text-center">
                    وضعیت
                  </th>
                  <th scope="col" className="text-center">
                    شناسه تراکنش
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">بیتکوین</td>
                  <td className="text-center">0.01801534 BTC</td>
                  <td className="text-center">0.0004 BTC</td>
                  <td className="text-center table-new__actions">
                    <a href="#" className="btn-simple">
                      مشاهده جزئیات
                    </a>
                  </td>
                  <td className="text-center">
                    <span className="d-ltr d-block">01/06/08 - 11:34</span>
                  </td>
                  <td className="text-center">
                    <span className="text-success">پرداخت شده</span>
                  </td>
                  <td className="text-center table-new__actions">
                    <a href="#" className="btn-simple">
                      مشاهده جزئیات
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="text-center">بیتکوین</td>
                  <td className="text-center">0.01801534 BTC</td>
                  <td className="text-center">0.0004 BTC</td>
                  <td className="text-center table-new__actions">
                    <a href="#" className="btn-simple">
                      مشاهده جزئیات
                    </a>
                  </td>
                  <td className="text-center">
                    <span className="d-ltr d-block">01/06/08 - 11:34</span>
                  </td>
                  <td className="text-center">
                    <span className="text-success">پرداخت شده</span>
                  </td>
                  <td className="text-center table-new__actions">
                    <a href="#" className="btn-simple">
                      مشاهده جزئیات
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      label: <CardTitle>واریز و برداشت ارز دیجیتال</CardTitle>,

      key: "5",
      children: (
        <div
          className={`tab-pane fade  ${activeTab === "5" && " show active"}`}
          id="tab-1"
          role="tabpanel"
          aria-labelledby="tab1"
        >
          <div className="table-filters">
            <div className="table-filter">
              <select name="" className="bs-select-control bs-select-dropdown">
                <option value="3">تایید شده</option>
                <option value="1">تایید شده</option>
              </select>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-borderless table-striped ">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    مقدار درخواستی
                  </th>
                  <th scope="col" className="text-center">
                    شماره شبا درخواستی
                  </th>
                  <th scope="col" className="text-center">
                    تاریخ درخواست
                  </th>
                  <th scope="col" className="text-center">
                    وضعیت
                  </th>
                  <th scope="col" className="text-center">
                    شماره پیگیری
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">1,234,413</td>
                  <td className="text-center">IR670520000032450456795670</td>
                  <td className="text-center">
                    <span className="d-ltr d-inline-block">
                      01/06/08 - 11:34
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="text-success">تایید شده</span>
                  </td>
                  <td className="text-center">1234556356</td>
                </tr>
                <tr>
                  <td className="text-center">1,234,413</td>
                  <td className="text-center">IR670520000032450456795670</td>
                  <td className="text-center">
                    <span className="d-ltr d-inline-block">
                      01/06/08 - 11:34
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="text-success">تایید شده</span>
                  </td>
                  <td className="text-center">1234556356</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    }
  ];
  return (
    // <section className="page">
    //   <Card>
    //     <CardHeader>
    //       <CardTitle>لیست تراکنش‌ها</CardTitle>
    //     </CardHeader>
    //     <CardBody>
    //         <Tabs
    //           // className="nav nav-tabs"
    //           animated={true}
    //           style={{ width: "100%" }}
    //           defaultActiveKey="1"
    //           centered
    //           items={TabOption}
    //           onChange={(activeKey: string) => handleChangeTab(activeKey)}
    //         />
    //     </ CardBody>
    //   </Card>
    // </section>
    <Col>
      <Card className="custom-card currencies-online-rates card-secondary">
        <CardHeader className="d-flex flex-row justify-content-between align-items-center">
          <CardTitle tag="h5">  تاریخچه تراکنش ها   </CardTitle>
        </CardHeader>
        <CardBody>
          <div className="table-responsive">
            <table className={`table table-borderless ${exchange.data.length === 0 ? 'table-modern' : 'table-striped'}`}>
              {exchange.data.length > 0 && <thead>
                <tr>
                  <th scope="col" className="text-center">
                    بازار
                  </th>
                  <th scope="col" className="text-center">
                    مقدار
                  </th>
                  <th scope="col" className="text-center">
                    قیمت واحد
                  </th>
                  <th scope="col" className="text-start">
                    تاریخ
                  </th>
                </tr>
              </thead>}
              <tbody>
                {exchange.data.length > 0 &&
                  exchange.data.map((data, index) => (
                    <tr key={index}>
                      <td className="text-center">
                        <span className="text-success">
                          {convertTextSingle(
                            data.destinationCurrencyCode
                          )}
                        </span>{" "}
                        -{" "}
                        <span className="text-danger">
                          {convertTextSingle(data?.sourceCurrencyCode)}
                        </span>
                      </td>
                      <td className="text-center">
                        <span style={{ fontSize: "10px" }}>
                          {data.destinationCurrencyCode === "IRR"
                            ? "TMN"
                            : data.destinationCurrencyCode}
                        </span>{" "}
                        {data?.sourceAmount}
                      </td>
                      <td className="text-center">
                        {data?.exchangeRate.substring(0, 5)}
                      </td>
                      <td className="text-start">
                        <span className="d-ltr d-block">
                          {moment(data?.createdAt)
                            .locale("fa")
                            .format("DD MMMM YYYY")}
                        </span>
                      </td>
                    </tr>
                  ))}
                {exchange.data.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center bg-white">
                      <p>
                        شما تا بحال هیچ معامله‌ای در آرسونیکس انجام نداده‌اید
                        اولین معامله خود را با آرسونیکس تجربه کنید.
                      </p>

                    </td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};
export default History;
