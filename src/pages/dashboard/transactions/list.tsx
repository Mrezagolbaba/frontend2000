import { useList } from "@refinedev/core";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";

export const TransactionList = () => {
  const { data, isSuccess, isError, isLoading } = useList({
    resource: "transactions",
  });
  console.log(data,'data');
  return (
      <section className="page page-wallet">
        <Card className="card-secondary mb-4">
          <CardHeader>
            <CardTitle tag="h5">موجودی تومانی</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="wallet-balance">
              <div className="wallet-balance__value">
                <strong className="d-inline-block d-ltr">
                  893,548,200
                  <small>تومان</small>
                </strong>
              </div>
              <div className="wallet-balance__actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#onlineDeposit"
                >
                  واریز تومان{" "}
                </button>
                <a
                  href="#"
                  className="btn btn-outline-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#onlineWithdraw"
                >
                  برداشت تومان
                </a>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="card-secondary mb-4">
          <CardHeader>
            <CardTitle tag="h5">موجودی رمز ارز و فیات</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="table-responsive">
              <table className="table-modern crypto-balance-table">
                <thead>
                  <tr>
                    <th scope="col">ارز</th>

                    <th scope="col" className="text-center">
                      موجودی
                    </th>
                    <th scope="col" className="text-center">
                      ارزش دارایی (تومان)
                    </th>
                    <th scope="col" className="text-center">
                      نوع دارایی
                    </th>
                    <th scope="col" className="text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div>
                        <img
                          src="assets/img/coins/tether.png"
                          alt=""
                          className="tm__crypto-img"
                        />
                        <span className="text-50">تتر</span>
                      </div>
                    </td>

                    <td className="text-center">54.32</td>
                    <td className="text-center">17,232.32</td>
                    <td className="text-center">ارز دیجیتال</td>
                    <td className="text-start tm__nowrap">
                      <button
                        className="btn btn-silver"
                        data-bs-toggle="modal"
                        data-bs-target="#onlineDepositCrypto"
                      >
                        واریز
                      </button>
                      <button
                        className="btn btn-silver"
                        data-bs-toggle="modal"
                        data-bs-target="#onlineWithdrawCrypto"
                      >
                        برداشت
                      </button>
                      <a href="#" className="btn btn-outline-primary">
                        معامله
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div>
                        <img
                          src="assets/img/icons/flag-turkey.png"
                          alt=""
                          className="tm__crypto-img"
                        />
                        <span className="text-50">لیر</span>
                      </div>
                    </td>

                    <td className="text-center">312.65</td>
                    <td className="text-center">17,232.32</td>
                    <td className="text-center">فیات</td>
                    <td className="text-start tm__nowrap">
                      <a href="#" className="btn btn-silver">
                        واریز
                      </a>
                      <a href="#" className="btn btn-silver">
                        برداشت
                      </a>
                      <a href="#" className="btn btn-outline-primary">
                        معامله
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="nav-tabs-wrapper">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="tab1"
                    data-bs-toggle="tab"
                    data-bs-target="#tab-1"
                    type="button"
                    role="tab"
                    aria-controls="tab-1"
                    aria-selected="true"
                  >
                    آخرین واریزهای ریالی
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="tab2"
                    data-bs-toggle="tab"
                    data-bs-target="#tab-2"
                    type="button"
                    role="tab"
                    aria-controls="tab-2"
                    aria-selected="false"
                  >
                    آخرین واریزهای کوین
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="tab3"
                    data-bs-toggle="tab"
                    data-bs-target="#tab-3"
                    type="button"
                    role="tab"
                    aria-controls="tab-3"
                    aria-selected="false"
                  >
                    آخرین درخواست های تسویه حساب کوین
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="tab4"
                    data-bs-toggle="tab"
                    data-bs-target="#tab-4"
                    type="button"
                    role="tab"
                    aria-controls="tab-4"
                    aria-selected="false"
                  >
                    آخرین درخواست های تسویه حساب ریالی
                  </button>
                </li>
              </ul>
            </div>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="tab-1"
                role="tabpanel"
                aria-labelledby="tab1"
              >
                <div className="table-responsive">
                  <table className="table-modern table-modern--fonts-md">
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
                          <span className="d-ltr d-block">
                            01/06/08 - 11:34
                          </span>
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
                          <span className="d-ltr d-block">
                            01/06/08 - 11:34
                          </span>
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
                          <span className="d-ltr d-block">
                            01/06/08 - 11:34
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="text-success">پرداخت شده</span>
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
                <div className="table-responsive">
                  <table className="table-modern table-modern--fonts-md">
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
                          <span className="d-ltr d-block">
                            01/06/08 - 11:34
                          </span>
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
                          <span className="d-ltr d-block">
                            01/06/08 - 11:34
                          </span>
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
                          <span className="d-ltr d-block">
                            01/06/08 - 11:34
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="text-success">پرداخت شده</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="tab-3"
                role="tabpanel"
                aria-labelledby="tab3"
              >
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
                        <td className="text-center">
                          <span className="d-ltr d-inline-block">
                            0.01801534 BTC
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="d-ltr d-inline-block">
                            0.0004 BTC
                          </span>
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
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M4.17812 11.9303H3.40293C2.99174 11.9303 2.59739 11.767 2.30664 11.4762C2.01588 11.1855 1.85254 10.7911 1.85254 10.3799V3.40317C1.85254 2.99198 2.01588 2.59764 2.30664 2.30688C2.59739 2.01613 2.99174 1.85278 3.40293 1.85278H10.3797C10.7909 1.85278 11.1852 2.01613 11.476 2.30688C11.7667 2.59764 11.9301 2.99198 11.9301 3.40317V4.17836"
                                    stroke="#03041B"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    stroke-linejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_193_5658">
                                    <rect
                                      width="18.6047"
                                      height="18.6047"
                                      fill="white"
                                      transform="translate(0.302246 0.302368)"
                                    />
                                  </clipPath>
                                </defs>
                              </svg>
                            </span>
                            <span id="copyTarget1">TXT ID</span>
                          </button>
                        </td>
                        <td className="text-center">
                          <span className="d-ltr d-block">
                            01/06/08 - 11:34
                          </span>
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
                          <span className="d-ltr d-inline-block">
                            0.0004 BTC
                          </span>
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
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M4.17812 11.9303H3.40293C2.99174 11.9303 2.59739 11.767 2.30664 11.4762C2.01588 11.1855 1.85254 10.7911 1.85254 10.3799V3.40317C1.85254 2.99198 2.01588 2.59764 2.30664 2.30688C2.59739 2.01613 2.99174 1.85278 3.40293 1.85278H10.3797C10.7909 1.85278 11.1852 2.01613 11.476 2.30688C11.7667 2.59764 11.9301 2.99198 11.9301 3.40317V4.17836"
                                    stroke="#03041B"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    stroke-linejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_193_5658">
                                    <rect
                                      width="18.6047"
                                      height="18.6047"
                                      fill="white"
                                      transform="translate(0.302246 0.302368)"
                                    />
                                  </clipPath>
                                </defs>
                              </svg>
                            </span>
                            <span id="copyTarget2">TXT ID</span>
                          </button>
                        </td>
                        <td className="text-center">
                          <span className="d-ltr d-block">
                            01/06/08 - 11:34
                          </span>
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
                          <span className="d-ltr d-inline-block">
                            0.0004 BTC
                          </span>
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
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M4.17812 11.9303H3.40293C2.99174 11.9303 2.59739 11.767 2.30664 11.4762C2.01588 11.1855 1.85254 10.7911 1.85254 10.3799V3.40317C1.85254 2.99198 2.01588 2.59764 2.30664 2.30688C2.59739 2.01613 2.99174 1.85278 3.40293 1.85278H10.3797C10.7909 1.85278 11.1852 2.01613 11.476 2.30688C11.7667 2.59764 11.9301 2.99198 11.9301 3.40317V4.17836"
                                    stroke="#03041B"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    stroke-linejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_193_5658">
                                    <rect
                                      width="18.6047"
                                      height="18.6047"
                                      fill="white"
                                      transform="translate(0.302246 0.302368)"
                                    />
                                  </clipPath>
                                </defs>
                              </svg>
                            </span>
                            <span id="copyTarget3">TXT ID</span>
                          </button>
                        </td>
                        <td className="text-center">
                          <span className="d-ltr d-block">
                            01/06/08 - 11:34
                          </span>
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
                  </table>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="tab-4"
                role="tabpanel"
                aria-labelledby="tab4"
              >
                <div className="table-responsive">
                  <table className="table-modern table-modern--fonts-md">
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
                        <td className="text-center">
                          IR670520000088940500142280
                        </td>
                        <td className="text-center">
                          <span className="d-ltr d-block">
                            01/06/08 - 11:34
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="text-success">پرداخت شده</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-center">بیتکوین - 67000 تومان</td>
                        <td className="text-center">
                          IR670520000088940500142280
                        </td>
                        <td className="text-center">
                          <span className="d-ltr d-block">
                            01/06/08 - 11:34
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="text-success">پرداخت شده</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-center">بیتکوین - 67000 تومان</td>
                        <td className="text-center">
                          IR670520000088940500142280
                        </td>
                        <td className="text-center">
                          <span className="d-ltr d-block">
                            01/06/08 - 11:34
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="text-success">پرداخت شده</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <div
          className="modal fade"
          id="onlineDepositCrypto"
          aria-labelledby="onlineDepositLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="onlineDepositLabel">
                  واریز تتر (Tether USDT)
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p className="modal-text">
                  کاربر گرامی موجودی حساب تتر شما بعد از انجام واریز توسط شما و
                  تایید شبکه به صورت خودکار در کیف پول شما قابل مشاهده و معامله
                  می‌باشد
                </p>
                <div className="alert alert-warning">
                  در هنگام واریز به شبکه انتخابی دقت فرمایید در صورت واریز به
                  شبکه اشتباه رمز ارز از دست خواهد رفت.
                </div>
                <div className="alert alert-success">
                  حداقل واریز 1 USDT می‌باشد، واریز تتر به آرسونیکس هیچ کارمزدی
                  ندارد.
                </div>
                <form className="modal-form">
                  <div className="row">
                    <div className="col-lg-10">
                      <div className="row mb-3">
                        <label className="col-lg-4 col-form-label">شبکه:</label>
                        <div className="col-lg-8">
                          <select
                            name=""
                            id="inputCardNum"
                            className="bs-select-control bs-form-select"
                          >
                            <option value="2">TRC20 (ترون - TRON)</option>
                          </select>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-lg-4 col-form-label">
                          آدرس کیف پول
                        </label>
                        <div className="col-lg-8 mt-2 mb-4">
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
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M4.17812 11.9303H3.40293C2.99174 11.9303 2.59739 11.767 2.30664 11.4762C2.01588 11.1855 1.85254 10.7911 1.85254 10.3799V3.40317C1.85254 2.99198 2.01588 2.59764 2.30664 2.30688C2.59739 2.01613 2.99174 1.85278 3.40293 1.85278H10.3797C10.7909 1.85278 11.1852 2.01613 11.476 2.30688C11.7667 2.59764 11.9301 2.99198 11.9301 3.40317V4.17836"
                                    stroke="#03041B"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    stroke-linejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_193_5658">
                                    <rect
                                      width="18.6047"
                                      height="18.6047"
                                      fill="white"
                                      transform="translate(0.302246 0.302368)"
                                    />
                                  </clipPath>
                                </defs>
                              </svg>
                            </span>
                            <span id="copyTarget1">
                              TTjJzGWnN5jzCZPFyaNyRFWoNN3LVAMYpR
                            </span>
                          </button>
                          <img
                            src="assets/img/qr.png"
                            alt=""
                            className=""
                            style={{ width: "20%" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="onlineWithdrawCrypto"
          aria-labelledby="onlineDepositLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="onlineDepositLabel">
                  برداشت تتر (Tether USDT)
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p className="modal-text">
                  برداشت تتر از آرسونیکس به صورت کاملا سیستمی انجام می‌شود و
                  اپراتور هیچ دخالتی در برداشت رمز ارز ندارد.
                </p>
                <div className="alert alert-warning">
                  در هنگام برداشت به آدرس وارد شده نمایید در صورت برداشت اشتباه
                  رمز ارز از دست خواهد رفت.
                </div>
                <div className="alert alert-success">
                  کارمزد شبکه ترون برای برداشت تتر در حال حاضر 1.2$ می‌باشد.
                </div>
                <form className="modal-form">
                  <div className="row">
                    <div className="col-lg-10">
                      <div className="row mb-3">
                        <label className="col-lg-4 col-form-label">شبکه:</label>
                        <div className="col-lg-8">
                          <select
                            name=""
                            id="inputCardNum"
                            className="bs-select-control bs-form-select"
                          >
                            <option value="2">TRC20 (ترون - TRON)</option>
                          </select>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-lg-4 col-form-label">
                          آدرس کیف پول
                        </label>
                        <div className="col-lg-8 mt-2 mb-4">
                          <div className="col-lg-8">
                            <input
                              type="text"
                              className="form-control"
                              id="inputPrice"
                              placeholder="آدرس کیف پول مقصد را وارد نمایید"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-lg-4 col-form-label">
                          روش تایید برداشت:
                        </label>
                        <div className="col-lg-8">
                          <select
                            name=""
                            id="inputCardNum"
                            className="bs-select-control bs-form-select"
                          >
                            <option value="2">پیامک</option>
                            <option value="1">Google Authenticator</option>
                          </select>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-lg-4 col-form-label">
                          روش تایید برداشت:
                        </label>

                        <div className="input-group wtc">
                          {" "}
                          <input
                            type="text"
                            name="cardNumber"
                            placeholder="کد تایید را در این قسمت وارد نمایید"
                            className="form-control wtcfm"
                          />
                          <div className="input-group-append ">
                            {" "}
                            <span className="btn btn-primary wtcbtn">
                              {" "}
                              ارسال پیامک - تایید کد
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="onlineDeposit"
          aria-labelledby="onlineDepositLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="onlineDepositLabel">
                  واریز از طریق درگاه پرداخت آنلاین
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p className="modal-text">
                  جهت افزایش اعتبار کیف پول ریالی خود با استفاده درگاه پرداخت
                  آنلاین ، ابتدا مبلغ مورد نظر برای افزایش موجودی را در کادر زیر
                  به تومان وارد کنید، سپس با کلیک بر روی دکمه «انتقال به درگاه
                  پرداخت» به درگاه پرداخت بانک منتقل می شوید. سپس می توانید با
                  استفاده از کارت بانکی خود و رمز دوم آن ، اقدام به پرداخت و
                  افزایش موجودی خود کنید.
                </p>
                <div className="alert alert-success">
                  در حال حاضر در هر ۲۴ ساعت می‌توانید مبلغ ۱۰۰ میلیون تومان (با
                  دو کارت متفاوت) واریز نمایید.
                </div>
                <form className="modal-form">
                  <div className="row">
                    <div className="col-lg-10">
                      <div className="row mb-3">
                        <label className="col-lg-4 col-form-label">
                          مبلغ واریزی به تومان:
                        </label>
                        <div className="col-lg-8">
                          <input
                            type="text"
                            className="form-control"
                            id="inputPrice"
                            placeholder="مبلغ مورد نظر خود را وارد کنید"
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-lg-4 col-form-label">
                          شماره کارت پرداختی:
                        </label>
                        <div className="col-lg-8">
                          <select
                            name=""
                            id="inputCardNum"
                            className="bs-select-control bs-form-select"
                          >
                            <option value="3" selected disabled>
                              انتخاب کنید
                            </option>
                            <option value="2">6219861000000000</option>
                            <option value="1">6039691400000000</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-outline-primary">
                      انتقال به درگاه پرداخت
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="onlineWithdraw"
          aria-labelledby="onlineDepositLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="onlineDepositLabel">
                  برداشت تومان
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p className="modal-text">
                  برداشت ریال به صورت سیستمی انجام می‌شود و اپراتور در برداشت آن
                  هیچ نقشی ندارد، مدت زمان واریز ریال نهایتا ۲۴ ساعت بعد از ثبت
                  درخواست می‌باشد لطفا توجه داشته باشید بعد از ثبت درخواست شما
                  پروسه برداشت در صف پایا قرار خواهد گرفت و زمان دقیق واریز قابل
                  تخمین دقیق نیست.
                </p>
                <div className="alert alert-success">
                  با توجه به دستور بانک مرکزی، هر حساب در هر ۲۴ ساعت می‌تواند
                  مبلغ ۱۰۰ میلیون تومان برداشت کند در صورت برداشت مبالغ بیشتر
                  حساب‌های بیشتر خود را به آرسونیکس معرفی کنید.
                </div>
                <form className="modal-form">
                  <div className="row">
                    <div className="col-lg-10">
                      <div className="row mb-3">
                        <label className="col-lg-4 col-form-label">
                          مبلغ برداشت به تومان:
                        </label>
                        <div className="col-lg-8">
                          <input
                            type="text"
                            className="form-control"
                            id="inputPrice"
                            placeholder="مبلغ مورد نظر خود را وارد کنید"
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-lg-4 col-form-label">
                          واریز به شبا :
                        </label>
                        <div className="col-lg-8">
                          <select
                            name=""
                            id="inputCardNum"
                            className="bs-select-control bs-form-select"
                          >
                            <option value="3" selected disabled>
                              انتخاب کنید
                            </option>
                            <option value="2">IR12345678909876543777</option>
                            <option value="1">IR12345678909876543777</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-outline-primary">
                      ثبت درخواست برداشت
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};
