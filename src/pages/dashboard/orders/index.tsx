import { useEffect, useState } from "react";
import { Tabs } from "antd";
import { Card, CardBody, CardHeader, CardTitle, Col } from "reactstrap";
import { useAppDispatch, useAppSelector } from "store/hooks";
import Deposit from "assets/img/icons/depositIcon.svg";
import { getTransactionsList } from "store/reducers/features/transaction/transactionSlice";
import moment from "jalali-moment";
import { convertText, convertTextSingle, extractLeftSide } from "helpers";

const Orders = () => {
  const [activeTab, setActiveTab] = useState<string>("1");
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const handleChangeTab = (active: string) => {
    setActiveTab(active);
  };
  const exchange = useAppSelector((state) => state.exchange);

  useEffect(() => {

    dispatch(getTransactionsList(user.id));

  }, []);
  const TabOption: TabOptionProps[] = [
    {
      label:

        <CardHeader>
          <CardTitle>سفارش های خرید</CardTitle>
        </CardHeader>,

      key: "1",
      children: (
        <div
          className={`tab-pane fade  ${activeTab === "1" && " show active"}`}
          id="tab-1"
          role="tabpanel"
          aria-labelledby="tab1"
        >
          <div className="table-responsive">
            <table className="table-modern table table-borderless table-striped ">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    شناسه سفارش
                  </th>
                  <th scope="col" className="text-center">
                    بازار
                  </th>
                  <th scope="col" className="text-center">
                    مقدار
                  </th>
                  <th scope="col" className="text-center">
                    قیمت واحد
                  </th>
                  <th scope="col" className="text-center">
                    قیمت کل
                  </th>
                  <th scope="col" className="text-center">
                    وضعیت سفارش
                  </th>
                  <th scope="col" className="text-center">
                    وضعیت
                  </th>
                  <th scope="col" className="text-center">
                    وضعیت
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">12345678</td>
                  <td className="text-center">لیر - ریال</td>
                  <td className="text-center">
                    <span className="d-inline-block d-ltr">434 لیر</span>
                  </td>
                  <td className="text-center">324,234 تومان</td>
                  <td className="text-center">889,423 تومان</td>
                  <td className="text-center">تکمیل شده</td>
                  <td className="text-center">
                    <span className="text-success">انجام شده</span>
                  </td>
                  <td className="text-center">
                    <a href="#" className="btn-simple">
                      مشاهده فاکتور
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="text-center">12345678</td>
                  <td className="text-center">تتر - ریال</td>
                  <td className="text-center">
                    <span className="d-inline-block d-ltr">13,854,000</span>
                  </td>
                  <td className="text-center">324,234 تومان</td>
                  <td className="text-center">889,423 تومان</td>
                  <td className="text-center">در دست انجام</td>
                  <td className="text-center">
                    <span className="text-success">انجام شده</span>
                  </td>
                  <td className="text-center">
                    <a href="#" className="btn-simple">
                      مشاهده فاکتور
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
      label:
        <CardHeader>
          <CardTitle className="font-family"> سفارش های فروش</CardTitle>
        </CardHeader>,
      key: "2",
      children: (
        <div
          className={`tab-pane fade  ${activeTab === "2" && " show active"}`}
          id="tab-2"
          role="tabpanel"
          aria-labelledby="tab2"
        >
          <div className="table-responsive">
            <table className="table-modern table table-borderless table-striped ">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    شناسه سفارش
                  </th>
                  <th scope="col" className="text-center">
                    بازار
                  </th>
                  <th scope="col" className="text-center">
                    مقدار
                  </th>
                  <th scope="col" className="text-center">
                    قیمت واحد
                  </th>
                  <th scope="col" className="text-center">
                    قیمت کل
                  </th>
                  <th scope="col" className="text-center">
                    وضعیت سفارش
                  </th>
                  <th scope="col" className="text-center">
                    وضعیت
                  </th>
                  <th scope="col" className="text-center">
                    وضعیت
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">12345678</td>
                  <td className="text-center">لیر - ریال</td>
                  <td className="text-center">
                    <span className="d-inline-block d-ltr">434 لیر</span>
                  </td>
                  <td className="text-center">324,234 تومان</td>
                  <td className="text-center">889,423 تومان</td>
                  <td className="text-center">تکمیل شده</td>
                  <td className="text-center">
                    <span className="text-success">انجام شده</span>
                  </td>
                  <td className="text-center">
                    <a href="#" className="btn-simple">
                      مشاهده فاکتور
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="text-center">12345678</td>
                  <td className="text-center">تتر - ریال</td>
                  <td className="text-center">
                    <span className="d-inline-block d-ltr">13,854,000</span>
                  </td>
                  <td className="text-center">324,234 تومان</td>
                  <td className="text-center">889,423 تومان</td>
                  <td className="text-center">در دست انجام</td>
                  <td className="text-center">
                    <span className="text-success">انجام شده</span>
                  </td>
                  <td className="text-center">
                    <a href="#" className="btn-simple">
                      مشاهده فاکتور
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
  ];
  return (
    <section className="page page-orders">
      {/* <Card>
        <CardHeader>
          <CardTitle>سفارشات من</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="nav-tabs-wrapper">
            <Tabs
              className="nav nav-tabs"
              defaultActiveKey="1"
              centered
              items={TabOption}
              onChange={(activeKey: string) => handleChangeTab(activeKey)}
            />
            {/* <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button className="nav-link active" id="tab1" data-bs-toggle="tab" data-bs-target="#tab-1"
                              type="button" role="tab" aria-controls="tab-1" aria-selected="true">
                        سفارش های خرید
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link" id="tab2" data-bs-toggle="tab" data-bs-target="#tab-2" type="button"
                              role="tab" aria-controls="tab-2" aria-selected="false">
                        سفارش های فروش
                      </button>
                    </li>
                  </ul> */}
      {/* </div> */}
      {/* <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="tab-1"
                role="tabpanel"
                aria-labelledby="tab1"
              >
                <div className="table-filters">
                  <div className="table-filter">
                    <select
                      name=""
                      className="bs-select-control bs-select-dropdown"
                    >
                      <option value="3">اتریوم به ریال</option>
                      <option value="1">بیتکوین به ریال</option>
                    </select>
                  </div>
                  <div className="table-filter">
                    <select
                      name=""
                      className="bs-select-control bs-select-dropdown"
                    >
                      <option value="3">همه</option>
                      <option value="1">همه</option>
                    </select>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table-modern table-modern--fonts-md">
                    <thead>
                      <tr>
                        <th scope="col" className="text-center">
                          شناسه سفارش
                        </th>
                        <th scope="col" className="text-center">
                          بازار
                        </th>
                        <th scope="col" className="text-center">
                          مقدار
                        </th>
                        <th scope="col" className="text-center">
                          قیمت واحد
                        </th>
                        <th scope="col" className="text-center">
                          قیمت کل
                        </th>
                        <th scope="col" className="text-center">
                          وضعیت سفارش
                        </th>
                        <th scope="col" className="text-center">
                          وضعیت
                        </th>
                        <th scope="col" className="text-center">
                          وضعیت
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-center">12345678</td>
                        <td className="text-center">لیر - ریال</td>
                        <td className="text-center">
                          <span className="d-inline-block d-ltr">434 لیر</span>
                        </td>
                        <td className="text-center">324,234 تومان</td>
                        <td className="text-center">889,423 تومان</td>
                        <td className="text-center">تکمیل شده</td>
                        <td className="text-center">
                          <span className="text-success">انجام شده</span>
                        </td>
                        <td className="text-center">
                          <a href="#" className="btn-simple">
                            مشاهده فاکتور
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-center">12345678</td>
                        <td className="text-center">تتر - ریال</td>
                        <td className="text-center">
                          <span className="d-inline-block d-ltr">
                            13,854,000
                          </span>
                        </td>
                        <td className="text-center">324,234 تومان</td>
                        <td className="text-center">889,423 تومان</td>
                        <td className="text-center">در دست انجام</td>
                        <td className="text-center">
                          <span className="text-success">انجام شده</span>
                        </td>
                        <td className="text-center">
                          <a href="#" className="btn-simple">
                            مشاهده فاکتور
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="tab-2"
                role="tabpanel"
                aria-labelledby="tab2"
              >
                <div className="table-filters">
                  <div className="table-filter">
                    <select
                      name=""
                      className="bs-select-control bs-select-dropdown"
                    >
                      <option value="3">اتریوم به ریال</option>
                      <option value="1">بیتکوین به ریال</option>
                    </select>
                  </div>
                  <div className="table-filter">
                    <select
                      name=""
                      className="bs-select-control bs-select-dropdown"
                    >
                      <option value="3">همه</option>
                      <option value="1">همه</option>
                    </select>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table-modern table-modern--fonts-md">
                    <thead>
                      <tr>
                        <th scope="col" className="text-center">
                          شناسه سفارش
                        </th>
                        <th scope="col" className="text-center">
                          بازار
                        </th>
                        <th scope="col" className="text-center">
                          مقدار
                        </th>
                        <th scope="col" className="text-center">
                          قیمت واحد
                        </th>
                        <th scope="col" className="text-center">
                          قیمت کل
                        </th>
                        <th scope="col" className="text-center">
                          وضعیت سفارش
                        </th>
                        <th scope="col" className="text-center">
                          وضعیت
                        </th>
                        <th scope="col" className="text-center">
                          وضعیت
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-center">12345678</td>
                        <td className="text-center">لیر - ریال</td>
                        <td className="text-center">
                          <span className="d-inline-block d-ltr">434 لیر</span>
                        </td>
                        <td className="text-center">324,234 تومان</td>
                        <td className="text-center">889,423 تومان</td>
                        <td className="text-center">تکمیل شده</td>
                        <td className="text-center">
                          <span className="text-success">انجام شده</span>
                        </td>
                        <td className="text-center">
                          <a href="#" className="btn-simple">
                            مشاهده فاکتور
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-center">12345678</td>
                        <td className="text-center">تتر - ریال</td>
                        <td className="text-center">
                          <span className="d-inline-block d-ltr">
                            13,854,000
                          </span>
                        </td>
                        <td className="text-center">324,234 تومان</td>
                        <td className="text-center">889,423 تومان</td>
                        <td className="text-center">در دست انجام</td>
                        <td className="text-center">
                          <span className="text-success">انجام شده</span>
                        </td>
                        <td className="text-center">
                          <a href="#" className="btn-simple">
                            مشاهده فاکتور
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div> */}
      {/* </CardBody> */}
      {/* </Card>  */}

      <Card className="custom-card currencies-online-rates card-secondary">
        <CardHeader className="d-flex flex-row justify-content-between align-items-center">
          <CardTitle tag="h5"> سفارشات من  </CardTitle>
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
    </section>
  );
};
export default Orders;
