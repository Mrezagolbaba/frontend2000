import { useEffect, useState } from "react";
import ModalTeter from "./modal";
import { useAppSelector } from "redux/hooks";
import { Card, CardBody, CardHeader, CardTitle, Col, Input, Row } from "reactstrap";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import ExchangeInput from "components/Input/exchangeInput";
import { CiWallet } from "react-icons/ci";
import { BsTag } from "react-icons/bs";
import buy from "./styles.module.scss";
import { exchangeCurrencySwap, exchangeRateBYIRR, exchanteCommission, getCurrencySwap } from "services/currencySwap";
import { getAllWallets } from "services/wallet";
import { convertIRRToToman, convertText } from "helpers";
import toast from "react-hot-toast";
import { setInvoice } from "redux/features/invoice/invoiceSlice";
import { useNavigate } from "react-router-dom";

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
  const router = useNavigate();
  const { firstName, lastName, email, phoneNumber } = user;
  const [visible, setVisible] = useState(false);
  const [walltes, setWalltes] = useState<wallet[]>([]);
  const [payValue, setPayValue] = useState<string>("")
  const [getValue, setGetValue] = useState<string>("");
  const [payDtails, setPayDtails] = useState({
    balance: "0",
    availableBalance: "0",
    currency: "IRR",
    ratePerIRR: 0
  });
  const [getDtails, setGetDtails] = useState({
    balance: "0",
    availableBalance: "0",
    currency: "TRY",
    ratePerIRR: 0
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
  const setPayDetails = async (data) => {
    const sourceCurrencyCode = convertText(data?.currencyCode, 'faToEn');
    try {
      const res = await exchangeRateBYIRR(sourceCurrencyCode);
      setPayDtails({
        balance: data?.balance ?? "0",
        availableBalance: data?.availableBalance ?? "0",
        currency: convertText(data?.currencyCode, 'enToFa') ?? "",
        ratePerIRR: Number(res?.rate) ?? 0
      });
    } catch (err) {
      console.log(err);
    }
  };

  const setGetDetails = async (data) => {
    const sourceCurrencyCode = convertText(data?.currencyCode, 'faToEn');
    try {
      const res = await exchangeRateBYIRR(sourceCurrencyCode);
      setGetDtails({
        availableBalance: data?.availableBalance ?? "0",
        balance: data?.balance ?? "0",
        currency: convertText(data?.currencyCode, 'enToFa') ?? "",
        ratePerIRR: Number(res?.rate) ?? 0
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleCommission = async () => {
    if (!payValue) {
      toast.error('لطفا مقادیر را برای تبدیل وارد کنید');
      return;
    }
    if (payDtails.currency === getDtails.currency) {
      toast.error('نمیتوانید ارز یکسان را تبدیل کنید');
      return;
    }
    const data = {
      sourceCurrencyCode: convertText(payDtails.currency, 'faToEn'),
      sourceAmount: payValue,
      destinationCurrencyCode: convertText(getDtails.currency, 'faToEn'),
      feeCurrencyCode: convertText(payDtails.currency, 'faToEn'),
    }
    try {
      const res = await exchanteCommission(data);
      console.log(res,'commission');
    } catch (err) {
      console.log(err);
    }
  }

  const handleSelectAsset = async (e: string, action: string) => {
    const data = walltes.find((item: wallet) => item.currencyCode === e);
    handleCommission();
    if (action === 'pay' && data) {
      setPayDetails(data);
    } else if (action === 'get' && data) {
      setGetDetails(data);
    } else if (action === 'pay' && !data) {
      setPayDtails({
        balance: "0",
        availableBalance: "0",
        currency: convertText(e, 'enToFa') ?? "",
        ratePerIRR: 0
      });
    } else if (action === 'get' && !data) {
      setGetDtails({
        balance: "0",
        availableBalance: "0",
        currency: convertText(e, 'enToFa') ?? "",
        ratePerIRR: 0
      });
    }
  };

  const handleExchange = () => {
    if (!payValue) {
      toast.error('لطفا مقادیر را برای تبدیل وارد کنید');
      return;
    }
    if (payDtails.currency === getDtails.currency) {
      toast.error('نمیتوانید ارز یکسان را تبدیل کنید');
      return;
    }
    const data = {
      sourceCurrencyCode: convertText(payDtails.currency, 'faToEn'),
      sourceAmount: payValue,
      destinationCurrencyCode: convertText(getDtails.currency, 'faToEn'),
      feeCurrencyCode: convertText(payDtails.currency, 'faToEn'),
    }
    exchangeCurrencySwap(data).then((res) => {
      if (res) {
        setInvoice(res);
        toast.success('تبدیل با موفقیت انجام شد');
        router('/dashboard/invoice');
      }
    }).catch((err) => {
      console.log(err);
      toast.error('خطایی رخ داده است');
    })
  }
  return (
    <section className="page page-wallet">
      <div className="row g-4">
        <Col lg={7} xs={12}>
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
                  <Col lg={6} xs={12}> {/* On extra small screens, take up the full width */}
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
                            {convertIRRToToman(payDtails.ratePerIRR)} تومان
                          </span>
                        </div>
                      </div>
                    </div>
                  </Col>
                  {/* <Col lg={1} xs={12} style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TbArrowsExchange2 size={30} />
                  </Col> */}
                  <Col lg={6} xs={12}>
                    <div className="currency-exchange__control-group">
                      <label className="form-label">دریافت می‌کنید:</label>
                      <ExchangeInput
                        name="amount"
                        value={getValue}
                        onChange={(val) => setGetValue(val)}
                        onChangeCoin={(e) => handleSelectAsset(e, 'get')}
                      />
                      <div className={buy.amount}>
                        <div >
                          <div>
                            <CiWallet />
                            <span className="title">موجودی در دسترس: </span>
                            <span className="value">
                              {getDtails.availableBalance} {convertText(getDtails.currency, 'enToFa')}
                            </span>
                          </div>
                        </div>
                        <div >
                          <div >
                            <BsTag />
                            <span className="title">
                              نرخ {convertText(getDtails.currency, 'enToFa')} :
                            </span>
                            <span className="value">
                              {convertIRRToToman(getDtails.ratePerIRR)}تومان
                            </span>
                          </div>
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
                <div className={buy.currencyExchangeAction}>
                  <button type="button" className="btn btn-outline-primary" onClick={handleExchange}>
                    ثبت نهایی سفارش{" "}
                  </button>
                </div>
              </form>
            </CardBody>
          </Card>
        </Col>
        <Col lg={5} xs={12}>
          <Card>
            <CardHeader>
              <CardTitle>وضعیت حساب کاربری شما</CardTitle>
            </CardHeader>
            <CardBody>
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
            </CardBody>
          </Card>
        </Col>
      </div>
      <ModalTeter
        visible={visible}
        setVisible={hanldeModal}
        onCanceled={handleCancel}
      />
    </section>
  );
};
export default BuySell;
