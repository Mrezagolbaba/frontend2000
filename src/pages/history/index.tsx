import { useState } from "react";
import Layout from "layouts/dashboard";
import { Tabs } from "antd";

const History = () => {
  const [activeTab, setActiveTab] = useState<string>("1");

  const handleChangeTab = (active: string) => {
    setActiveTab(active);
  };
  const TabOption: TabOptionProps[] = [
    {
      label: <span className="nav-link">برداشت کوین</span>,
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
                <option value="3">تایید شده</option>
                <option value="1">تایید شده</option>
              </select>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table-modern table-modern--fonts-md">
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
    },
    {
      label: <span className="nav-link">واریز درگاه پرداخت </span>,
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
            <table className="table-modern table-modern--fonts-md">
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
      label: "واریز بانکی",
      key: "3",
      children: (
        <div
          className={`tab-pane fade  ${activeTab === "3" && " show active"}`}
          id="tab-3"
          role="tabpanel"
          aria-labelledby="tab3"
        >
          <div className="table-responsive">
            <table className="table-modern table-modern--fonts-md">
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
      label: "واریز کوین",
      key: "4",
      children: (
        <div
          className={`tab-pane fade  ${activeTab === "4" && " show active"}`}
          id="tab-4"
          role="tabpanel"
          aria-labelledby="tab4"
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
            <table className="table-modern table-modern--fonts-md">
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
                  <th scope="col" className="text-center">
                    وضعیت پرداخت
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
                  <td className="text-center">
                    <span className="text-success">پرداخت شده</span>
                  </td>
                </tr>
                <tr>
                  <td className="text-center">1,000,000</td>
                  <td className="text-center">12323412341234</td>
                  <td className="text-center">
                    <span className="d-ltr d-block">01/06/08 - 11:34</span>
                  </td>
                  <td className="text-center">
                    <span className="text-success">پرداخت شده</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      label: "معاملات خرید",
      key: "5",
      children: (
        <div
          className={`tab-pane fade  ${activeTab === "5" && " show active"}`}
          id="tab-5"
          role="tabpanel"
          aria-labelledby="tab5"
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
            <table className="table-modern table-modern--fonts-md">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    نوع کوین
                  </th>
                  <th scope="col" className="text-center">
                    مقدار
                  </th>
                  <th scope="col" className="text-center">
                    تعداد تاییدیه ها
                  </th>
                  <th scope="col" className="text-center">
                    شناسه تراکنش
                  </th>
                  <th scope="col" className="text-center">
                    تاریخ تراکنش
                  </th>
                  <th scope="col" className="text-center">
                    وضعیت پرداخت
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">بیتکوین</td>
                  <td className="text-center">0.01801534 BTC</td>
                  <td className="text-center">1</td>
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
                </tr>
                <tr>
                  <td className="text-center">بیتکوین</td>
                  <td className="text-center">0.01801534 BTC</td>
                  <td className="text-center">1</td>
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
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      label: "معاملات فروش",
      key: "6",
      children: (
        <div
          className={`tab-pane fade  ${activeTab === "6" && " show active"}`}
          id="tab-6"
          role="tabpanel"
          aria-labelledby="tab6"
        >
          <div className="table-filters">
            <div className="table-filter">
              <select name="" className="bs-select-control bs-select-dropdown">
                <option value="3">تایید شده</option>
                <option value="1">تایید شده</option>
              </select>
            </div>
            <div className="table-filter me-2">
              <button className="btn-simple">خروجی اکسل</button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table-modern table-modern--fonts-md">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    بازار
                  </th>
                  <th scope="col" className="text-center">
                    مقدار
                  </th>
                  <th scope="col" className="text-center">
                    قیمت واحدها
                  </th>
                  <th scope="col" className="text-center">
                    قیمت کل
                  </th>
                  <th scope="col" className="text-center">
                    کارمزد
                  </th>
                  <th scope="col" className="text-center">
                    دریافتی شما
                  </th>
                  <th scope="col" className="text-center">
                    تاریخچه معاملات
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">بیتکوین - ریال</td>
                  <td className="text-center">0.01801534 BTC</td>
                  <td className="text-center">234,213,123 تومان</td>
                  <td className="text-center">1,213,123 تومان</td>
                  <td className="text-center">3%</td>
                  <td className="text-center">0.01801534 BTC</td>
                  <td className="text-center">
                    <span className="d-ltr d-block">01/06/08 - 11:34</span>
                  </td>
                </tr>
                <tr>
                  <td className="text-center">بیتکوین - ریال</td>
                  <td className="text-center">0.01801534 BTC</td>
                  <td className="text-center">234,213,123 تومان</td>
                  <td className="text-center">1,213,123 تومان</td>
                  <td className="text-center">3%</td>
                  <td className="text-center">0.01801534 BTC</td>
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
      label: "فاکتور معاملات",
      key: "7",
      children: (
        <div
          className={`tab-pane fade  ${activeTab === "7" && " show active"}`}
          id="tab-8"
          role="tabpanel"
          aria-labelledby="tab8"
        >
          <div className="table-responsive">
            <table className="table-modern table-modern--fonts-md">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    شناسه فاکتور
                  </th>
                  <th scope="col" className="text-center">
                    تاریخ صدور
                  </th>
                  <th scope="col" className="text-center"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">123456789</td>
                  <td className="text-center">
                    <span className="d-ltr d-inline-block">
                      01/06/08 - 11:34
                    </span>
                  </td>
                  <td className="text-center">
                    <a href="#" className="btn-simple">
                      مشاهده فاکتور
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="text-center">123456789</td>
                  <td className="text-center">
                    <span className="d-ltr d-inline-block">
                      01/06/08 - 11:34
                    </span>
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
      <section className="page page-history">
        <div className="card card-secondary">
          <div className="card-header">
            <h5 className="card-title">لیست تراکنش‌ها</h5>
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
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default History;
