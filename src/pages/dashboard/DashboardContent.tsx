import User from "assets/img/icons/user.png";

import chart from "assets/img/chart-img.png";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

import USDT from "assets/img/coins/usdt.svg";
import Turkey from "assets/img/coins/try.svg";
import Deposit from "assets/img/icons/depositIcon.svg";
import Exchange from "assets/img/icons/exchange.svg";
import Market from "assets/img/icons/markets.svg";
import User1 from "assets/img/level-1.svg";
import User2 from "assets/img/level-2.svg";

import { useAppDispatch, useAppSelector } from "store/hooks";

import { BsCalendar2Event, BsCheck2 } from "react-icons/bs";
import { TbArrowsExchange, TbLayersSubtract } from "react-icons/tb";
import { LuDownload } from "react-icons/lu";
import { BiSupport } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowDropup } from "react-icons/io";
import { IoIosArrowDropdown } from "react-icons/io";
import { CgDanger } from "react-icons/cg";
import useSession from "services/auth/session";
// import CurrencyInput from "../../components/currencyInput";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import { CiEdit } from "react-icons/ci";

import "./style.scss";

import { useGetMe } from "services/auth/user";
import { useEffect, useState } from "react";
import ExchangeInput from "components/Input/ExchangeInput";
import { Isessions } from "types/user";
import moment from "jalali-moment";
import { getCurrencySwap } from "services/exchange";
import { getTransactionsList } from "store/reducers/features/transaction/transactionSlice";
import { getExchangeList } from "store/reducers/features/exchange/exchangeSlice";
import { convertIRRToToman, convertText, convertTextSingle, extractLeftSide } from "helpers";
import { Link, useNavigate } from "react-router-dom";
import { getRates } from "store/reducers/features/rates/rateSlice";

const DashboardContent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const transactions = useAppSelector((state) => state.transaction);
  const exchange = useAppSelector((state) => state.exchange);
  const rates = useAppSelector((state) => state.rates);
  const [lastSession, setLastSession] = useState("");
  const [payValue, setPayValue] = useState({
    amount: "",
    currency: "",
  });
  const [receiveValue, setReceiveValue] = useState({
    amount: "",
    currency: "",
  });
  const session = useSession();

  const { firstName, lastName } = user;
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    speed: 20000,
    autoplaySpeed: 20000,
    cssEase: "linear",
    loop: true,
  };
  const getSession = async () => {
    try {
      await session.mutateAsync({}).then((res) => {
        const transformedArray = res.map((item) => {
          return item;
        });
        const lastItem = transformedArray[transformedArray.length - 1];
        setLastSession(
          moment(lastItem.createdAt).locale("fa").format(" DD MMMM YYYY")
        );
      });
    } catch (err) { }
  };
  useEffect(() => {
    dispatch(getExchangeList(user.id));
    dispatch(getTransactionsList(user.id));
    dispatch(getRates());
    getSession();
  }, []);
  const convertType = (type: string) => {
    if (type === "DEPOSIT") {
      return "واریز";
    }
    if (type === "WITHDRAW") {
      return "برداشت";
    }
    if (type === "BUY") {
      return "خرید";
    }
    if (type === "SELL") {
      return "فروش";
    }
    if (type === "EXCHANGE_SOURCE" || type === "EXCHANGE_DESTINATION") {
      return "تبدیل";
    }
  };
  const tableBodyStyle: any =
    transactions?.data?.length > 10
      ? { maxHeight: "300px", overflowY: "auto" }
      : "";
  return (
    <>
      <section className="mb-3">
        <Card className="custom-card user-summary">
          <CardBody>
            <Row className="align-items-start">
              <Col
                xs={12}
                sm={1}
                className="user-summary__section user-summary-avatar text-center"
              >
                <img src={User} alt="" className="avatar" />
              </Col>
              <Col
                xs={12}
                sm={2}
                className="user-summary__section user-summary-edit text-sm-left"
              >
                <h6>{firstName + " " + lastName}</h6>
                <Button
                  className="profile-btn"
                  outline
                  color="secondary"
                  href="/dashboard/profile"
                >
                  <CiEdit />
                  پروفایل کاربری
                </Button>
              </Col>
              <Col
                xs={12}
                sm={2}
                className="user-summary__section user-summary-lastseen  text-sm-left"
              >
                <h6>آخرین ورود</h6>
                <div className="user-summary-date">
                  <BsCalendar2Event />
                  {lastSession}
                </div>
              </Col>
              <Col
                xs={12}
                sm={2}
                className="user-summary__section user-summary-lastseen text-sm-left"
              >
                <h6> سطح احراز هویت شما</h6>
                <div className="user-summary-date">
                {user?.firstTierVerified ? <img src={User1} alt="" style={{width:'20px',marginLeft:'5px'}} /> :  <img src={User2} alt="" style={{width:'20px',marginLeft:'5px'}} />}
                  {user?.firstTierVerified ? <span><span>سطح یک</span>{" "}<a href="/dashboard/profile" style={{ color:'#111bff'}}>ارتقا سطح</a></span> :  <span>سطح دو</span>}
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </section>

      <section className="mb-4">
        <Card className="custom-card  auth-jumbotron " style={{backgroundColor:'#111bff08'}}>
          <CardHeader>
            <CardTitle tag="h5">احراز هویت</CardTitle>
          </CardHeader>
          <CardBody>
            <Row className="g-4">
              <Col xxl={5}>
                <div className="auth-jumbotron__summary">
                  <p>
                    برای استفاده کامل و بدون محدودیت از آرسونیکس باید فرایند
                    احراز هویت را تکمیل کنید، زمان بررسی و تایید اطلاعات ۱ ساعت
                    &zwnj;می&zwnj;باشد.{" "}
                  </p>
                  <Button outline color="primary">
                    شروع احراز هویت سطح دو
                  </Button>
                </div>
              </Col>
              <Col xxl={3} md={6}>
                <ul className="auth-jumbotron__advantages">
                  <li>
                    <h5>احراز هویت سطح یک</h5>
                  </li>
                  <li>
                    <BsCheck2 className="icon" size={15} color={"#ff8d00"} />
                    ﻭﺍﺭﯾﺰ تومان ﺭﻭﺯﺍﻧﻪ   :
                    <strong>۱ میلیون تومان</strong>
                  </li>
                  <li>
                    <BsCheck2 className="icon" size={15} color={"#55cd51"} />
                    برداشت تومان ﺭﻭﺯﺍﻧﻪ 
                    <strong>نامحدود</strong>
                  </li>
                  <li>
                    <BsCheck2 className="icon" size={15} color={"#55cd51"} />
                    واریز و برداشت رمزارز ﺭﻭﺯﺍﻧﻪ  :
                    <strong>نامحدود</strong>
                  </li>
                  <li>
                    <BsCheck2 className="icon" size={15} color={"#55cd51"} />
                    واریز و برداشت فیات روزانه :
                    <strong>معادل ۵۰۰ دلار</strong>
                    
                   
                  </li>
                </ul>
              </Col>
              <Col xxl={4} md={6}>
                <ul className="auth-jumbotron__advantages">
                  <li>
                    <h5>احراز هویت سطح دو</h5>
                  </li>
                  <li>
                  <BsCheck2 className="icon" size={15} color={"#55cd51"} />
                      ﻭﺍﺭﯾﺰ تومان ﺭﻭﺯﺍﻧﻪ:
                    <strong>نامحدود </strong>
                  </li>
                  <li>
                  <BsCheck2 className="icon" size={15} color={"#55cd51"} />
                  برداشت تومان ﺭﻭﺯﺍﻧﻪ:
                    <strong>  نامحدود  </strong>
                  </li>
                  <li>
                  <BsCheck2 className="icon" size={15} color={"#55cd51"} />
                  واریز و برداشت رمزارز ﺭﻭﺯﺍﻧﻪ:
                    <strong>نامحدود</strong>
                  </li>
                  <li>
                  <BsCheck2 className="icon" size={15} color={"#55cd51"} />
                  ﻭﺍﺭﯾﺰ و برداشت فیات ﺭﻭﺯﺍﻧﻪ  :
                    <strong>۳۵ هزار دلار</strong>
                  </li>
                </ul>
              </Col>
              <Col xl={12} className="d-none">
                <div className="auth-jumbotron__summary">
                  <Link
                    className="btn btn-outline-primary"
                    to="profile#kyc-section"
                  >
                    شروع احراز هویت
                  </Link>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </section>

      <section className="mb-4">
        <Row className="g-4">
          <Col xxl={7} xl={6}>
            <Card className="custom-card currency-exchange card--h100pc card-secondary">
              <CardHeader>
                <CardTitle tag="h5">خرید و فروش</CardTitle>
              </CardHeader>
              <CardBody>
                <form action="">
                  <Row className="mt-3">
                    <Col xs={12} md={6}>
                      <div className="currency-exchange__control-group">
                        <label
                          className="form-label"
                          style={{ color: "#03041b66" }}
                        >
                          پرداخت می‌کنید:
                        </label>
                        <ExchangeInput
                          name={"amount"}
                          value={payValue.amount}
                          onChange={(value) => 
                            setPayValue({
                              ...payValue,
                              amount:value
                            })
                          }
                          onChangeCoin={(e) =>{
                              setPayValue({
                                ...payValue,
                                currency:e
                              })
                          } }
                        />
                      </div>
                    </Col>
                    <Col xs={12} md={6}>
                      <div className="currency-exchange__control-group">
                        <label
                          className="form-label"
                          style={{ color: "#03041b66" }}
                        >
                          دریافت می‌کنید:
                        </label>
                        <ExchangeInput
                          name={"amount"}
                          value={receiveValue.amount}
                          onChange={(value) =>{
                            setReceiveValue({
                              ...receiveValue,
                              amount: value,
                            });
                          } }
                          onChangeCoin={(e) => {
                            setReceiveValue({
                              ...receiveValue,
                              currency: e,
                            });
                          }}
                        />
                      </div>
                    </Col>
                  </Row>

                  <div className="mt-5 mb-4 d-flex align-items-center justify-content-center">
                    <button
                      onClick={() =>
                        navigate(`/dashboard/buy-sell`, {
                          state: {
                            source: payValue,
                            destination: receiveValue,
                          },
                        })
                      }
                      type="button"
                      className="btn btn-primary"
                      style={{ padding: "18px 70px" }}
                    >
                      ثبت و ادامه
                    </button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </Col>
          <Col xxl={5} xl={6}>
            <Card className="custom-card wallet-card card--h100pc card-secondary">
              <CardHeader className="d-flex flex-row justify-content-between align-items-center">
                <CardTitle tag="h5"> بازارهای معاملاتی</CardTitle>
                <div className="card-action">
                  <Button href="/dashboard/market">مشاهده تمام بازارها </Button>
                </div>
              </CardHeader>
              <CardBody>
                <div className="table-responsive">
                  <table
                    id="responsive"
                    className="table-modern table table-borderless"
                  >
                    <thead>
                      <tr>
                        <th className="text-center" >نام ارز</th>
                        <th className="text-center" >قیمت واحد (تومان)</th>
                        {/* <th>تغییرات 24 ساعته</th> */}
                        <th >معامله در بازار</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rates.data.length > 0 &&
                        rates.data.map((data, index) => (
                          <tr className="tr-responsive">
                            <td data-th="نام ارز">
                              <div>
                                <span className="icon">
                                  {data.pair==="USDT/IRR" ? <img src={USDT} alt="" style={{width:'20px',marginLeft:'5px'}} /> :
                                    <img src={Turkey} alt="" style={{width:'20px',marginLeft:'5px'}} />}
                                </span>
                                <span className="text-50">
                                  {convertTextSingle(
                                    extractLeftSide(data.pair)
                                  )}
                                </span>
                              </div>
                            </td>
                            <td className="text-center" data-th="قیمت واحد (تومان)">
                              <span className="td-responsive">
                                {convertIRRToToman(data?.rate)}
                              </span>
                            </td>
                            {/* <td data-th="تغییرات ۲۴ ساعته">
                            <div className="tm__crypto-changes">
                              <span className="icon">
                                <IoIosArrowDropdown color="red" />
                              </span>
                              <strong className="text-danger">{data?.change}</strong>
                            </div>
                          </td> */}
                            <td className="text-center" 
                              data-th="معامله در بازار
    "
                            >
                              <a
                                href="/dashboard/buy-sell"
                                className="btn-simple tm__actions"
                              >
                                شروع معامله
                              </a>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </section>
      <section className="mb-4 mt-4">
        <Row className="gx-4">
          <Col className="col align-items-center justify-content-center d-flex">
            <h6 className="easy-text">دسترسی سریع به خدمات آرسونیکس</h6>
          </Col>
          <Col className="services col-6 col-sm-3 col-xxl-2 mx-xxl-2 mx-md-2 m-0">
            <a
              className="element-box ar-tablo centered trend-in-corner smaller"
              href="/dashboard/buy-sell"
            >
              <img
                src={Exchange}
                style={{
                  height: '25px',
                  width: '25px',
                  background: '#fff',
                }}
              />
              <div className="value">خرید و فروش</div>
            </a>
          </Col>
          <Col className="services col-6 col-sm-3 col-xxl-2 mx-xxl-2 mx-md-2  m-0">
            <a
              className="element-box ar-tablo centered trend-in-corner smaller"
              href="#"
            >
              <img
                src={Market}
                style={{
                  height: '25px',
                  width: '25px',
                  background: '#fff',
                }}
              />
              <div className="value">بازارها</div>
            </a>
          </Col>
          <Col className="services col-6 col-sm-3 col-xxl-2 mx-xxl-2 mx-md-2  m-0">
            <a
              className="element-box ar-tablo centered trend-in-corner smaller"
              href="/dashboard/wallet"
            >
              <img
                src={Deposit}
                style={{
                  height: '25px',
                  width: '25px',
                  background: '#fff',
                }}
              />
              <div className="value">واریز تتر</div>
            </a>
          </Col>
          <Col className="services col-6 col-sm-3 col-xxl-2 mx-xxl-2 mx-md-2  m-0">
            <a href="/dashboard/wallet">
              <img
                src={Deposit}
                alt=""
                style={{
                  height: '25px',
                  width: '25px',
                  background: '#fff',
                }}
              />
              <div className="value">واریز تومان</div>
            </a>
          </Col>
          <Col className="services col-6 col-sm-3 col-xxl-2 mx-xxl-2 mx-md-2  m-0 ">
            <a
              className="element-box ar-tablo centered trend-in-corner smaller"
              href="#"
            >
              <BiSupport color="#111BFF" size={25} />
              <div className="value">پشتیبانی</div>
              <div className="trending trending-up">
                <span>آنلاین</span>
                <i className="os-icon os-icon-arrow-up6"></i>
              </div>
            </a>
          </Col>
        </Row>
      </section>
      <section className="mb-4">
        <Row className="gx-4">
          <Col xxl={7} xl={6}>
            <Card className="ccard--h100pc card-secondary">
              <CardHeader className="d-flex flex-row justify-content-between align-items-center">
                <CardTitle tag="h5">تراکنش&zwnj;های اخیر</CardTitle>
              </CardHeader>
              <CardBody>
                  <div className="table-responsive  ">
                    <table className={`table table-borderless ${transactions.data.length === 0 ? 'table-modern' : 'table-striped'}`}>
                     {transactions.data.length > 0 && <thead>
                        <tr>
                          <th scope="col">نوع</th>
                          <th scope="col" className="text-center">
                            مقدار
                          </th>
                          <th scope="col" className="text-center">
                            دارایی
                          </th>
                          <th scope="col" className="text-center">
                            زمان
                          </th>
                        </tr>
                      </thead>}
                      <tbody>
                        {transactions.data.map((data, index) => {
                          if (
                            (data.type === "DEPOSIT" ||
                              data.type === "WITHDRAW") &&
                            data.status !== "EXPIRED"
                          ) {
                            return (
                              <tr key={index}>
                                <td>
                                  <span
                                    className={
                                      data.type === "DEPOSIT"
                                        ? "text-success"
                                        : "text-danger"
                                    }
                                  >
                                    {convertType(data.type)}
                                  </span>
                                </td>
                                <td className={`text-center`}>
                                  <span>
                                    <span style={{ fontSize: "10px" }}>
                                      {data.currencyCode === "IRR"
                                        ? "TMN"
                                        : data.currencyCode}
                                    </span>{" "}
                                    {data.amount}
                                  </span>
                                </td>
                                <td className={`text-center`}>
                                  <span>
                                    {convertTextSingle(data.currencyCode)}
                                  </span>
                                </td>
                                <td className={`text-center`}>
                                  <span>
                                    {moment(data?.createdAt)
                                      .locale("fa")
                                      .format("DD MMMM YYYY")}
                                  </span>
                                </td>
                              </tr>
                            );
                          }
                        })}
                        {transactions.data.length === 0 && (
                          <tr>
                            <td colSpan={4} className="text-center">
                              <img
                                src={Exchange}
                                style={{
                                  height: '50px',
                                  width: '50px',
                                  marginBottom: '10px',
                                }}
                              />
                              <p>اولین معامله خود را با آرسونیکس تجربه کنید</p>

                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
              </CardBody>
            </Card>
          </Col>
          <Col xxl={5} xl={6}>
            <Card className="custom-card currencies-online-rates card-secondary">
              <CardHeader className="d-flex flex-row justify-content-between align-items-center">
                <CardTitle tag="h5">آخرین معاملات </CardTitle>
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
                    <tbody className={tableBodyStyle}>
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
                            <img
                              src={Deposit}
                              style={{
                                height: '50px',
                                width: '50px',
                                marginBottom: '10px',
                              }}
                            />
                            <p>اولین تراکنش خود را با آرسونیکس تجربه کنید</p>

                          </td>
                        </tr>
                      )}

                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default DashboardContent;
