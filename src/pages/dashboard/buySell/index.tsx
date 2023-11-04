import { useEffect, useState } from "react";
import Layout from "layouts/dashboard";
import ModalTeter from "./modal";
import { useAppSelector } from "redux/hooks";
import { Card, CardBody, CardHeader, Col, Input, Row } from "reactstrap";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import ExchangeInput from "components/Input/exchangeInput";
import DropdownInput from "components/Input/Dropdown";
import { TbArrowsExchange2 } from "react-icons/tb";
import { CiWallet } from "react-icons/ci";
import { BsTag } from "react-icons/bs";
import buy from "./styles.module.scss";
import { exchangeCurrencySwap, getCurrencySwap } from "services/currencySwap";
import { getAllWallets } from "services/wallet";

interface wallet {
  availableBalance: string,
  balance: string,
  createdAt: string,
  currencyCode: string,
  id: string,
  updatedAt: string,
  userId: string,
}


const BuySell = () => {
  const user = useAppSelector((state) => state.user);
  const { firstName, lastName, email, phoneNumber } = user;
  const [visible, setVisible] = useState(false);
  const [walltes, setWalltes] = useState<wallet[]>([]);
  const [payValue, setPayValue] = useState<string>("0")
  const [getValue, setGetValue] = useState<string>("0");
  const [payDtails, setPayDtails] = useState({
    balance: "0",
    availableBalance: "0",
    currency: "IRR"
  });
  const [getDtails, setGetDtails] = useState({
    balance: "0",
    availableBalance: "0",
    currency: "TRY"
  });
  const hanldeModal = () => {
    setVisible(!visible);
  };
  useEffect(() => {

    getAllWallets().then((res) => {
      console.log(res, 'res');
      setWalltes(res);
    }).catch((err) => {
      console.log(err);
    })


  }, [user]);
  const handleCancel = () => {
    setVisible(false);
  };
  const convertText = (text, direction) => {
    const currencyMap = {
      'enToFa': {
        'USDT': 'تتر',
        'TRY': 'لیر',
        'IRR': 'ریال',
        'TRX': 'ترون',
      },
      'faToEn': {
        'تتر': 'USDT',
        'لیر': 'TRY',
        'ریال': 'IRR',
        'ترون': 'TRX',
      },
    };

    if (direction in currencyMap && text in currencyMap[direction]) {
      return currencyMap[direction][text];
    }
    return text;
  };
  const handleSelectAsset = (e: string, action: string) => {
    const data = walltes.find((item: wallet) => item.currencyCode === e);
    if (action === 'pay' && data) {
      setPayDtails({
        balance: data?.balance ?? "0",
        availableBalance: data?.availableBalance ?? "0",
        currency: convertText(data?.currencyCode, 'enToFa') ?? ""

      })
    } else if (action === 'get' && data) {
      setGetDtails({
        availableBalance: data?.availableBalance ?? "0",
        balance: data?.balance ?? "0",
        currency: convertText(data?.currencyCode, 'enToFa') ?? ""
      })
    } else if (action === 'pay' && !data) {
      console.log(e);
      setPayDtails({
        balance: "0",
        availableBalance: "0",
        currency: convertText(e, 'enToFa') ?? ""
      })
    } else if (action === 'get' && !data) {
      setGetDtails({
        balance: "0",
        availableBalance: "0",
        currency: convertText(e, 'enToFa') ?? ""
      })
    }

  }
  const handleExchange = () => {
    const data = {
      sourceCurrencyCode: convertText(payDtails.currency, 'faToEn'),
      sourceAmount: payValue,
      destinationCurrencyCode: convertText(getDtails.currency, 'faToEn'),
      feeCurrencyCode: convertText(payDtails.currency, 'faToEn'),
    }
    exchangeCurrencySwap(data).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  }
  return (
    <section className="page page-wallet">
      <div className="row g-4">
        <div className="col-xxl-7 col-xl-12">
          <Card className="card card-secondary currency-exchange card--h100pc">
            <CardHeader >
              <Row>
                <div className="card-back col-lg-6">
                  <a className="">
                    <span className="icon">
                      <MdOutlineKeyboardArrowRight color="black" />
                    </span>
                    معامله سریع
                  </a>
                </div>
                <div className="card-action col-lg-6 justify-content-end d-flex">
                  <button
                    className="btn btn-outline-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#addCoinModal"
                    onClick={hanldeModal}
                  >
                    واریز {convertText(payDtails.currency, 'enToFa')}
                  </button>
                </div>
              </Row>
            </CardHeader>
            <CardBody>
              <form action="" className={buy["formContainer"]}>
                <Row style={{ justifyContent: 'center' }}>
                  <Col lg={5} xs={12}> {/* On extra small screens, take up the full width */}
                    <div className="currency-exchange__control-group">
                      <label className="form-label">پرداخت می‌کنید:</label>
                      <ExchangeInput
                        name={"amount"}
                        value={payValue}
                        onChange={(value) => setPayValue(value)}
                        onChangeCoin={(e) => handleSelectAsset(e, 'pay')}

                      />
                      <div className={buy.amount}>
                        <div>
                          <CiWallet />
                          <span className="title">موجودی در دسترس: </span>
                          <span className="value">
                            {payDtails.availableBalance} {convertText(payDtails.currency, 'enToFa')}
                          </span>
                        </div>
                        <div >
                          <BsTag />
                          <span className="title">
                            نرخ {convertText(payDtails.currency, 'enToFa')} :
                          </span>
                          <span className="value">
                            48,900 تومان
                          </span>
                        </div>
                      </div>


                    </div>
                  </Col>
                  {/* <Col lg={1} xs={12} style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TbArrowsExchange2 size={30} />
                  </Col> */}
                  <Col lg={5} xs={12}>
                    <div className="currency-exchange__control-group">
                      <label className="form-label">دریافت می‌کنید:</label>
                      <ExchangeInput
                        name="amount"
                        value={getValue}
                        onChange={(val) => setGetValue(val)}
                        onChangeCoin={(e) => handleSelectAsset(e, 'get')}
                      />
                      <div className={buy.amount}>
                        <div>
                          <CiWallet />
                          <span className="title">موجودی در دسترس: </span>
                          <span className="value">
                            {getDtails.availableBalance} {convertText(getDtails.currency, 'enToFa')}
                          </span>
                        </div>

                        <div >
                          <BsTag />
                          <span className="title">
                            نرخ {convertText(getDtails.currency, 'enToFa')} :
                          </span>
                          <span className="value">
                            48,900 تومان
                          </span>
                        </div>

                      </div>


                    </div>
                  </Col>
                </Row>
                <div className="table-responsive mt-4">
                  <table className="table ">
                    <thead className={buy.headerTable}>
                      <tr>
                        <th scope="col" className="text-center">
                          نحوه پرداخت کارمزد
                        </th>
                        <th scope="col" className="text-center">
                          مبلغ کارمزد
                        </th>
                        <th scope="col" className="text-center">
                          مبلغ نهایی دریافت
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-center">
                          <Row>
                            <Col lg={4} xs={6}>
                              <div className="radio-toggle-control">
                                <Input type="radio" name="rtc" id="rtc1" className="m-2" />
                                <label>{convertText(payDtails.currency, 'enToFa')}</label>
                              </div>
                            </Col>
                            <Col lg={4} xs={6}>
                              <div className="radio-toggle-control">
                                <Input type="radio" name="rtc" id="rtc2" className="m-2" />
                                <label>{convertText(getDtails.currency, 'enToFa')}</label>
                              </div>
                            </Col>
                          </Row>
                        </td>
                        <td className="text-center">۲۵ لیر</td>
                        <td className="text-center">453 لیر</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="currency-exchange__action">
                  <button type="button" className="btn btn-outline-primary" onClick={handleExchange}>
                    ثبت نهایی سفارش{" "}
                  </button>
                </div>
              </form>
            </CardBody>
          </Card>
        </div>
        <div className="col-xxl-5 col-xl-12">
          <div className="card card-secondary currencies-online-rates card--h100pc">
            <div className="card-header">
              <h5 className="card-title">وضعیت حساب کاربری شما</h5>
            </div>
            <div className="card-body">
              <div className="">
                <ul className="auth-jumbotron-advantages trans">
                  <li></li>
                  <li>
                    <span className="icon">
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.00006 7.80007L1.20006 5.00006L0.266724 5.9334L4.00006 9.66673L12.0001 1.66673L11.0667 0.733398L4.00006 7.80007Z"
                          fill="#0ED039"
                        ></path>
                      </svg>
                    </span>
                    سطح احراز هویت:<strong>سطح یک</strong>
                  </li>
                  <li>
                    <span className="icon">
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.00006 7.80007L1.20006 5.00006L0.266724 5.9334L4.00006 9.66673L12.0001 1.66673L11.0667 0.733398L4.00006 7.80007Z"
                          fill="#0ED039"
                        ></path>
                      </svg>
                    </span>
                    تراکنش باقی مانده روزانه:
                    <strong>۵۰۰ دلار و ۱ میلیون تومان</strong>
                  </li>
                  <li>
                    <span className="icon">
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.00006 7.80007L1.20006 5.00006L0.266724 5.9334L4.00006 9.66673L12.0001 1.66673L11.0667 0.733398L4.00006 7.80007Z"
                          fill="#0ED039"
                        ></path>
                      </svg>
                    </span>
                    تراکنش باقی مانده ماهیانه:{" "}
                    <strong>۱۵۰۰۰ دلار و ۳۰ میلیون تومان</strong>
                  </li>
                  <li>
                    <span className="icon">
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.00006 7.80007L1.20006 5.00006L0.266724 5.9334L4.00006 9.66673L12.0001 1.66673L11.0667 0.733398L4.00006 7.80007Z"
                          fill="#0ED039"
                        ></path>
                      </svg>
                    </span>
                    کارمزد تراکنش:<strong>0.30% - زیر ۲۵۰ دلار یک تتر</strong>
                  </li>
                </ul>
                <div className="text-center mt-4">
                  <button type="button" className="btn btn-outline-primary">
                    برای رفع محدودیت هم اکنون احراز هویت خود را انجام دهید
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary mt-4"
                  >
                    برای افزایش سقف حساب کاربری احراز هویت خود را به سطح دو
                    ارتقا دهید
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="page page-wallet mt-4">
        <div className="card card-secondary invoice">
          <div className="card-header card-header-flex">
            <div className="card-back">
              <a href="#" className="">
                <span className="icon">
                  <svg
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.454916 13.4658C0.206533 13.2223 0.183953 12.8412 0.387175 12.5727L0.454916 12.4958L6.06118 6.99998L0.454916 1.50417C0.206533 1.26067 0.183953 0.879632 0.387175 0.611126L0.454916 0.5342C0.703299 0.290701 1.09198 0.268564 1.36587 0.467791L1.44434 0.5342L7.54508 6.515C7.79347 6.75849 7.81605 7.13953 7.61282 7.40804L7.54508 7.48496L1.44434 13.4658C1.17112 13.7336 0.728137 13.7336 0.454916 13.4658Z"
                      fill="#03041B"
                      fill-opacity="0.4"
                    ></path>
                  </svg>
                </span>
              </a>
            </div>
          </div>
          <div className="card-body">
            <div className="invoice__header">
              <div className="containerr">
                <div className="row align-items-center">
                  <div className="col-sm-12 col-md-4">
                    <div className="invoice-id text-md-end text-center">
                      شناسه فاکتور: 12345678
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-4">
                    <div className="invoice-date text-md-start text-center">
                      تاریخ معامله:
                      <time className="d-inline-block d-ltr">
                        01/06/08 - 11:43
                      </time>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="invoice__body">
              <div className="invoice-table">
                <h6 className="invoice-title">مشخصات خریدار:</h6>
                <div className="table-responsive">
                  <table className="table table-new-ii">
                    <thead>
                      <tr>
                        <th scope="col" className="text-center">
                          نام
                        </th>
                        <th scope="col" className="text-center">
                          ایمیل
                        </th>
                        <th scope="col" className="text-center">
                          کد ملی
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-center">{`${firstName} ${lastName}`}</td>
                        <td className="text-center">{email}</td>
                        <td className="text-center">{phoneNumber}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="invoice-table">
                <h6 className="invoice-title">جزئیات معامله:</h6>
                <div className="table-responsive">
                  <table className="table table-new-ii">
                    <thead>
                      <tr>
                        <th scope="col" className="text-center">
                          بازار
                        </th>
                        <th scope="col" className="text-center">
                          مقدار (لیر)
                        </th>
                        <th scope="col" className="text-center">
                          قیمت واحد (تومان)
                        </th>
                        <th scope="col" className="text-center">
                          قیمت کل (تومان)
                        </th>
                        <th scope="col" className="text-center">
                          مبلغ کارمزد
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-center">ریال - لیر</td>
                        <td className="text-center">456</td>
                        <td className="text-center">2,070</td>
                        <td className="text-center">943,920.0</td>
                        <td className="text-center">۲۵ لیر</td>
                      </tr>
                      <tr className="invoice-summary">
                        <td>
                          <strong> مبلغ کل معامله:</strong>943,920 تومان معادل
                          453 لیر ترکیه
                        </td>
                      </tr>
                      <tr className="invoice-summary">
                        <td>
                          <strong>دریافتی شما:</strong>453 لیر
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="invoice__footer">
              <div className="table-responsive"></div>

              <p className="invoice-desc"></p>
              <div className="text-center">
                <a href="#" className="btn btn-outline-primary">
                  چاپ فاکتور
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ModalTeter
        visible={visible}
        setVisible={hanldeModal}
        onCanceled={handleCancel}
      />
    </section>
  );
};
export default BuySell;
