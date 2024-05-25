import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Table,
} from "reactstrap";

import wallet from "assets/scss/dashboard/wallet.module.scss";
import DepositsTable from "./DepositsTable";
import WithdrawsTable from "./WithdrawsTable";
import { FlowType, TransactionStatus } from "types/wallet";
import { coinShow, lirShow, tomanShow } from "helpers";

export default function Tables() {
  const [activeTab, setActiveTab] = useState<"1" | "2" | "3" | "4" | "5" | "6">(
    "1",
  );

  const clickTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  return (
    <Card>
      <CardBody>
        <div className={wallet.transactions}>
          <Nav className={wallet.tabs} id="transactions">
            <NavItem>
              <NavLink
                className={`${wallet.tabs__item} ${
                  activeTab === "1" ? wallet.active : ""
                }`}
                id="tab1"
                tag="button"
                onClick={() => {
                  setActiveTab("1");
                }}
              >
                آخرین واریزهای ریالی
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={`${wallet.tabs__item} ${
                  activeTab === "2" ? wallet.active : ""
                }`}
                id="tab2"
                tag="button"
                onClick={() => {
                  setActiveTab("2");
                }}
              >
                آخرین واریزهای کوین
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={`${wallet.tabs__item} ${
                  activeTab === "3" ? wallet.active : ""
                }`}
                id="tab2"
                tag="button"
                onClick={() => {
                  setActiveTab("3");
                }}
              >
                آخرین واریزهای لیر
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={`${wallet.tabs__item} ${
                  activeTab === "4" ? wallet.active : ""
                }`}
                id="tab3"
                tag="button"
                onClick={() => {
                  setActiveTab("4");
                }}
              >
                آخرین درخواست های تسویه حساب کوین
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={`${wallet.tabs__item} ${
                  activeTab === "5" ? wallet.active : ""
                }`}
                id="tab4"
                tag="button"
                onClick={() => {
                  setActiveTab("5");
                }}
              >
                آخرین درخواست های تسویه حساب ریالی
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={`${wallet.tabs__item} ${
                  activeTab === "6" ? wallet.active : ""
                }`}
                id="tab4"
                tag="button"
                onClick={() => {
                  setActiveTab("6");
                }}
              >
                آخرین درخواست های تسویه حساب لیر
              </NavLink>
            </NavItem>
          </Nav>
        </div>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <div className="table-responsive">
              <Table className="table-modern table-modern--fonts-md">
                <thead>
                  <tr>
                    <th scope="col" className="text-center">
                      نوع واریزی
                    </th>
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
                    <td className="text-center">درگاه پردخت آنلاین</td>
                    <td className="text-center">بیتکوین - ریال</td>
                    <td className="text-center">158518350462</td>
                    <td className="text-center">
                      <span className="d-ltr d-block">01/06/08 - 11:34</span>
                    </td>
                    <td className="text-center">
                      <span className="text-success">پرداخت شده</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">درگاه پردخت آنلاین</td>
                    <td className="text-center">بیتکوین - ریال</td>
                    <td className="text-center">158518350462</td>
                    <td className="text-center">
                      <span className="d-ltr d-block">01/06/08 - 11:34</span>
                    </td>
                    <td className="text-center">
                      <span className="text-success">پرداخت شده</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">درگاه پردخت آنلاین</td>
                    <td className="text-center">بیتکوین - ریال</td>
                    <td className="text-center">158518350462</td>
                    <td className="text-center">
                      <span className="d-ltr d-block">01/06/08 - 11:34</span>
                    </td>
                    <td className="text-center">
                      <span className="text-success">پرداخت شده</span>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </TabPane>
          <TabPane tabId="2">
            <div className="table-responsive">
              <Table className="table-modern table-modern--fonts-md">
                <thead>
                  <tr>
                    <th scope="col" className="text-center">
                      نوع واریزی
                    </th>
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
                    <td className="text-center">درگاه پردخت آنلاین</td>
                    <td className="text-center">بیتکوین - ریال</td>
                    <td className="text-center">158518350462</td>
                    <td className="text-center">
                      <span className="d-ltr d-block">01/06/08 - 11:34</span>
                    </td>
                    <td className="text-center">
                      <span className="text-success">پرداخت شده</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">درگاه پردخت آنلاین</td>
                    <td className="text-center">بیتکوین - ریال</td>
                    <td className="text-center">158518350462</td>
                    <td className="text-center">
                      <span className="d-ltr d-block">01/06/08 - 11:34</span>
                    </td>
                    <td className="text-center">
                      <span className="text-success">پرداخت شده</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">درگاه پردخت آنلاین</td>
                    <td className="text-center">بیتکوین - ریال</td>
                    <td className="text-center">158518350462</td>
                    <td className="text-center">
                      <span className="d-ltr d-block">01/06/08 - 11:34</span>
                    </td>
                    <td className="text-center">
                      <span className="text-success">پرداخت شده</span>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </TabPane>
          <TabPane tabId="3">
            <div className="table-responsive">
              <Table className="table-modern table-modern--fonts-md">
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
                    <td className="text-center">
                      <span className="d-ltr d-inline-block">
                        0.01801534 BTC
                      </span>
                    </td>
                    <td className="text-center">
                      <span className="d-ltr d-inline-block">0.0004 BTC</span>
                    </td>
                    <td className="text-center">
                      <button
                        type="button"
                        className="btn-copy d-ltr"
                        data-clipboard-target="#copyTarget1"
                      >
                        <span className="icon">
                          <svg
                            width="19"
                            height="19"
                            viewBox="0 0 19 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_193_5658)">
                              <path
                                d="M15.8062 7.27905H8.82944C7.97318 7.27905 7.27905 7.97318 7.27905 8.82944V15.8062C7.27905 16.6624 7.97318 17.3566 8.82944 17.3566H15.8062C16.6624 17.3566 17.3566 16.6624 17.3566 15.8062V8.82944C17.3566 7.97318 16.6624 7.27905 15.8062 7.27905Z"
                                stroke="#03041B"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                              <path
                                d="M4.17812 11.9303H3.40293C2.99174 11.9303 2.59739 11.767 2.30664 11.4762C2.01588 11.1855 1.85254 10.7911 1.85254 10.3799V3.40317C1.85254 2.99198 2.01588 2.59764 2.30664 2.30688C2.59739 2.01613 2.99174 1.85278 3.40293 1.85278H10.3797C10.7909 1.85278 11.1852 2.01613 11.476 2.30688C11.7667 2.59764 11.9301 2.99198 11.9301 3.40317V4.17836"
                                stroke="#03041B"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_193_5658">
                                <rect
                                  width="18.6047"
                                  height="18.6047"
                                  fill="white"
                                  transform="translate(0.302246 0.302368)"
                                ></rect>
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                        <span id="copyTarget1">TXT ID</span>
                      </button>
                    </td>
                    <td className="text-center">
                      <span className="d-ltr d-block">01/06/08 - 11:34</span>
                    </td>
                    <td className="text-center">
                      <span className="text-success">پرداخت شده</span>
                    </td>
                    <td className="text-center">
                      <a href="#" className="btn-simple">
                        مشاهده جزئیات
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">بیتکوین</td>
                    <td className="text-center">
                      <span className="d-ltr d-inline-block">
                        0.01801534 BTC
                      </span>
                    </td>
                    <td className="text-center">
                      <span className="d-ltr d-inline-block">0.0004 BTC</span>
                    </td>
                    <td className="text-center">
                      <button
                        type="button"
                        className="btn-copy d-ltr"
                        data-clipboard-target="#copyTarget2"
                      >
                        <span className="icon">
                          <svg
                            width="19"
                            height="19"
                            viewBox="0 0 19 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_193_5658)">
                              <path
                                d="M15.8062 7.27905H8.82944C7.97318 7.27905 7.27905 7.97318 7.27905 8.82944V15.8062C7.27905 16.6624 7.97318 17.3566 8.82944 17.3566H15.8062C16.6624 17.3566 17.3566 16.6624 17.3566 15.8062V8.82944C17.3566 7.97318 16.6624 7.27905 15.8062 7.27905Z"
                                stroke="#03041B"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                              <path
                                d="M4.17812 11.9303H3.40293C2.99174 11.9303 2.59739 11.767 2.30664 11.4762C2.01588 11.1855 1.85254 10.7911 1.85254 10.3799V3.40317C1.85254 2.99198 2.01588 2.59764 2.30664 2.30688C2.59739 2.01613 2.99174 1.85278 3.40293 1.85278H10.3797C10.7909 1.85278 11.1852 2.01613 11.476 2.30688C11.7667 2.59764 11.9301 2.99198 11.9301 3.40317V4.17836"
                                stroke="#03041B"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_193_5658">
                                <rect
                                  width="18.6047"
                                  height="18.6047"
                                  fill="white"
                                  transform="translate(0.302246 0.302368)"
                                ></rect>
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                        <span id="copyTarget2">TXT ID</span>
                      </button>
                    </td>
                    <td className="text-center">
                      <span className="d-ltr d-block">01/06/08 - 11:34</span>
                    </td>
                    <td className="text-center">
                      <span className="text-success">پرداخت شده</span>
                    </td>
                    <td className="text-center">
                      <a href="#" className="btn-simple">
                        مشاهده جزئیات
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">بیتکوین</td>
                    <td className="text-center">
                      <span className="d-ltr d-inline-block">
                        0.01801534 BTC
                      </span>
                    </td>
                    <td className="text-center">
                      <span className="d-ltr d-inline-block">0.0004 BTC</span>
                    </td>
                    <td className="text-center">
                      <button
                        type="button"
                        className="btn-copy d-ltr"
                        data-clipboard-target="#copyTarget3"
                      >
                        <span className="icon">
                          <svg
                            width="19"
                            height="19"
                            viewBox="0 0 19 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_193_5658)">
                              <path
                                d="M15.8062 7.27905H8.82944C7.97318 7.27905 7.27905 7.97318 7.27905 8.82944V15.8062C7.27905 16.6624 7.97318 17.3566 8.82944 17.3566H15.8062C16.6624 17.3566 17.3566 16.6624 17.3566 15.8062V8.82944C17.3566 7.97318 16.6624 7.27905 15.8062 7.27905Z"
                                stroke="#03041B"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                              <path
                                d="M4.17812 11.9303H3.40293C2.99174 11.9303 2.59739 11.767 2.30664 11.4762C2.01588 11.1855 1.85254 10.7911 1.85254 10.3799V3.40317C1.85254 2.99198 2.01588 2.59764 2.30664 2.30688C2.59739 2.01613 2.99174 1.85278 3.40293 1.85278H10.3797C10.7909 1.85278 11.1852 2.01613 11.476 2.30688C11.7667 2.59764 11.9301 2.99198 11.9301 3.40317V4.17836"
                                stroke="#03041B"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_193_5658">
                                <rect
                                  width="18.6047"
                                  height="18.6047"
                                  fill="white"
                                  transform="translate(0.302246 0.302368)"
                                ></rect>
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                        <span id="copyTarget3">TXT ID</span>
                      </button>
                    </td>
                    <td className="text-center">
                      <span className="d-ltr d-block">01/06/08 - 11:34</span>
                    </td>
                    <td className="text-center">
                      <span className="text-success">پرداخت شده</span>
                    </td>
                    <td className="text-center">
                      <a href="#" className="btn-simple">
                        مشاهده جزئیات
                      </a>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </TabPane>
          <TabPane tabId="4">
            <div className="table-responsive">
              <Table className="table-modern table-modern--fonts-md">
                <thead>
                  <tr>
                    <th scope="col" className="text-center">
                      مقدار (تومان)
                    </th>
                    <th scope="col" className="text-center">
                      شماه شبا
                    </th>
                    <th scope="col" className="text-center">
                      تاریخ درخواست
                    </th>
                    <th scope="col" className="text-center">
                      وضعیت
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">بیتکوین - 67000 تومان</td>
                    <td className="text-center">IR670520000088940500142280</td>
                    <td className="text-center">
                      <span className="d-ltr d-block">01/06/08 - 11:34</span>
                    </td>
                    <td className="text-center">
                      <span className="text-success">پرداخت شده</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">بیتکوین - 67000 تومان</td>
                    <td className="text-center">IR670520000088940500142280</td>
                    <td className="text-center">
                      <span className="d-ltr d-block">01/06/08 - 11:34</span>
                    </td>
                    <td className="text-center">
                      <span className="text-success">پرداخت شده</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">بیتکوین - 67000 تومان</td>
                    <td className="text-center">IR670520000088940500142280</td>
                    <td className="text-center">
                      <span className="d-ltr d-block">01/06/08 - 11:34</span>
                    </td>
                    <td className="text-center">
                      <span className="text-success">پرداخت شده</span>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </TabPane>
        </TabContent>
      </CardBody>
    </Card>
  );
}

export const StatusHandler = ({ status }: { status: TransactionStatus }) => {
  switch (status) {
    case "SUCCESSFUL":
      return <span className="text-success">پرداخت شده</span>;

    case "FAILED":
    case "CANCELED":
      return <span className="text-danger">پرداخت ناموفق</span>;

    case "PROCESSING":
    case "INITIATED":
      return <span className="text-info">پرداخت در حال پردازش</span>;

    case "EXPIRED":
      return <span className="text-muted">پرداخت منقضی شده</span>;
    case "DRAFT":
    default:
      return <span className="text-dark"> پیش نویس</span>;
  }
};

export const DepositTypes = ({ flow }: { flow: FlowType }) => {
  switch (flow) {
    case "REDIRECT":
      return "درگاه پرداخت آنلاین";

    case "MANUAL_WITH_WALLET_ADDRESS":
      return "واریز به آدرس ولت";
    case "MANUAL_WITH_PAYMENT_IDENTIFIER":
      return "واریز بین بانکی";
    case "DEBIT":
      return "شارژ سریع";
    default:
      return "";
  }
  // REDIRECT: ,
  // MANUAL_WITH_PAYMENT_IDENTIFIER:"",
  // MANUAL_WITH_WALLET_ADDRESS:""
};
export const RenderAmount = ({
  amount,
  type,
}: {
  amount: string;
  type: "IRR" | "TRY" | "USDT";
}) => {
  switch (type) {
    case "TRY":
      return lirShow({ value: amount, currency: "TRY" });
    case "USDT":
      return coinShow(amount, "USDT");
    case "IRR":
    default:
      return tomanShow({ value: amount, currency: "IRR" });
  }
};
