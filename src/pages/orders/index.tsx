import { useState } from "react";
import Layout from "layouts/dashboard";
import { Tabs } from "antd";

const Orders = () => {
  const [activeTab, setActiveTab] = useState<string>("1");
  const handleChangeTab = (active: string) => {
    setActiveTab(active);
  };
  const TabOption: TabOptionProps[] = [
    {
      label: <span className="nav-link">سفارش های خرید</span>,
      key: "1",
      children: (
        <div
          className={`tab-pane fade  ${activeTab === "1" && " show active"}`}
          id="tab-1"
          role="tabpanel"
          aria-labelledby="tab1"
        >
          <div className="table-filters">
            <div className="table-filter">
              <select name="" className="bs-select-control bs-select-dropdown">
                <option value="3">اتریوم به ریال</option>
                <option value="1">بیتکوین به ریال</option>
              </select>
            </div>
            <div className="table-filter">
              <select name="" className="bs-select-control bs-select-dropdown">
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
      label: <span className="nav-link"> سفارش های فروش</span>,
      key: "2",
      children: (
        <div
          className={`tab-pane fade  ${activeTab === "2" && " show active"}`}
          id="tab-2"
          role="tabpanel"
          aria-labelledby="tab2"
        >
          <div className="table-filters">
            <div className="table-filter">
              <select name="" className="bs-select-control bs-select-dropdown">
                <option value="3">اتریوم به ریال</option>
                <option value="1">بیتکوین به ریال</option>
              </select>
            </div>
            <div className="table-filter">
              <select name="" className="bs-select-control bs-select-dropdown">
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
    <Layout>
      <section className="page page-orders">
        <div className="card card-secondary mb-4">
          <div className="card-header">
            <h5 className="card-title">سفارشات من</h5>
          </div>
          <div className="card-body">
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
            </div>
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
          </div>
        </div>

        <div className="card card-secondary coming">
          <div className="card-header soon">
            <h5 className="card-title">سفارشات فعال من</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table-modern table-modern--fonts-md">
                <thead>
                  <tr>
                    <th scope="col" className="text-center">
                      نوع سفارش
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
                      پرشده
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">
                      <span className="text-success">خرید</span>
                    </td>
                    <td className="text-center">بیتکوین - ریال</td>
                    <td className="text-center">
                      <span className="d-inline-block d-ltr">0.0004 BTC</span>
                    </td>
                    <td className="text-center">324,234 تومان</td>
                    <td className="text-center">889,423 تومان</td>
                    <td className="text-center">2%</td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <span className="text-success">خرید</span>
                    </td>
                    <td className="text-center">تتر - ریال</td>
                    <td className="text-center">
                      <span className="d-inline-block d-ltr">0.0004 BTC</span>
                    </td>
                    <td className="text-center">324,234 تومان</td>
                    <td className="text-center">889,423 تومان</td>
                    <td className="text-center">3%</td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <span className="text-danger">فروش</span>
                    </td>
                    <td className="text-center">بیتکوین - ریال</td>
                    <td className="text-center">
                      <span className="d-inline-block d-ltr">0.0004 BTC</span>
                    </td>
                    <td className="text-center">324,234 تومان</td>
                    <td className="text-center">889,423 تومان</td>
                    <td className="text-center">2%</td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <span className="text-danger">فروش</span>
                    </td>
                    <td className="text-center">تتر - ریال</td>
                    <td className="text-center">
                      <span className="d-inline-block d-ltr">0.0004 BTC</span>
                    </td>
                    <td className="text-center">324,234 تومان</td>
                    <td className="text-center">889,423 تومان</td>
                    <td className="text-center">3%</td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <span className="text-success">خرید</span>
                    </td>
                    <td className="text-center">بیتکوین - ریال</td>
                    <td className="text-center">
                      <span className="d-inline-block d-ltr">0.0004 BTC</span>
                    </td>
                    <td className="text-center">324,234 تومان</td>
                    <td className="text-center">889,423 تومان</td>
                    <td className="text-center">2%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default Orders;
