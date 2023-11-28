import User from "assets/img/icons/user.png";

import chart from "assets/img/chart-img.png";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

import T from "assets/img/coins/tether.png";
import Turkey from "assets/img/icons/flag-turkey.png";

import { useAppDispatch, useAppSelector } from "redux/hooks";

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
import { setUser } from "redux/features/user/userSlice";
import ExchangeInput from "components/Input/ExchangeInput";
import { Isessions } from "types/user";
import moment from "jalali-moment";
import { getCurrencySwap } from "services/exchange";
import { getTransactionsList } from "redux/features/transaction/transactionSlice";
import { getExchangeList } from "redux/features/exchange/exchangeSlice";
import { convertText, convertTextSingle } from "helpers";
import { Link } from "react-router-dom";

const DashboardContent = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const transactions = useAppSelector((state) => state.transaction);
  const exchange = useAppSelector((state) => state.exchange);
  const [lastSession, setLastSession] = useState('')
  const session = useSession()

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
          moment(lastItem.createdAt).locale('fa').format(' DD MMMM YYYY')
        )
      })

    } catch (err) {

    }
  }
  useEffect(() => {
    dispatch(getExchangeList(user.id))
    dispatch(getTransactionsList(user.id))
    getSession()

  }, [])

  const handleExchange = () => {
    console.log("handleExchange");
  }
  const convertType = (type: string) => {
    if (type === 'DEPOSIT') {
      return 'واریز'
    }
    if (type === 'WITHDRAW') {
      return 'برداشت'
    }
    if (type === 'BUY') {
      return 'خرید'
    }
    if (type === 'SELL') {
      return 'فروش'
    } if (type === 'EXCHANGE_SOURCE' || type === 'EXCHANGE_DESTINATION') {
      return 'تبدیل'
    }
  }
  const tableBodyStyle: any = transactions.data.length > 10
    ? { maxHeight: '300px', overflowY: 'auto' }
    : '';
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
                className="user-summary__section user-summary-edit text-center text-sm-left"
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
                className="user-summary__section user-summary-lastseen text-center text-sm-left"
              >
                <h6>آخرین ورود</h6>
                <div className="user-summary-date">
                  <BsCalendar2Event />
                  {lastSession}
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </section>

      <section className="mb-4">
        <Card className="custom-card  auth-jumbotron">
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
                    <BsCheck2 className="icon" size={15} color={"#55cd51"} />
                    ﻭﺍﺭﯾﺰ و برداشت تومانی ﺭﻭﺯﺍﻧﻪ:
                    <strong>۱ میلیون تومان</strong>
                  </li>
                  <li>
                    <BsCheck2 className="icon" size={15} color={"#55cd51"} />
                    واریز و برداشت فیات روزانه: <strong>معادل ۵۰۰ دلار</strong>
                  </li>
                  <li>
                    <BsCheck2 className="icon" size={15} color={"#55cd51"} />
                    واریز رمزارز ﺭﻭﺯﺍﻧﻪ:
                    <strong>نامحدود</strong>
                  </li>
                  <li>
                    <BsCheck2 className="icon" size={15} color={"#55cd51"} />
                    برداشت رمزارز ﺭﻭﺯﺍﻧﻪ:
                    <strong>نامحدود</strong>
                  </li>
                </ul>
              </Col>
              <Col xxl={4} md={6}>
                <ul className="auth-jumbotron__advantages">
                  <li>
                    <h5>احراز هویت سطح دو</h5>
                  </li>
                  <li>
                    <CgDanger className="icon" size={15} color={"red"} />
                    ﻭﺍﺭﯾﺰ و برداشت ﺗﻮﻣﺎنی ﺭﻭﺯﺍﻧﻪ:
                    <strong>۱۰۰ میلیون تومان - ۱ میلیارد تومان</strong>
                  </li>
                  <li>
                    <CgDanger className="icon" size={15} color={"red"} />
                    ﻭﺍﺭﯾﺰ و برداشت فیات ﺭﻭﺯﺍﻧﻪ:
                    <strong>معادل ۳۵ هزار دلار </strong>
                  </li>
                  <li>
                    <CgDanger className="icon" size={15} color={"red"} />
                    واریز رمزارز ﺭﻭﺯﺍﻧﻪ:
                    <strong>نامحدود</strong>
                  </li>
                  <li>
                    <CgDanger className="icon" size={15} color={"red"} />
                    برداشت رمزارز ﺭﻭﺯﺍﻧﻪ:
                    <strong>نامحدود</strong>
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
                          value={""}
                          onChange={(value) => console.log(value)}
                          onChangeCoin={(e) => console.log(e)}
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
                          value={""}
                          onChange={(value) => console.log(value)}
                          onChangeCoin={(e) => console.log(e)}
                        />
                      </div>
                    </Col>
                  </Row>

                  <div className="mt-5 mb-4 d-flex align-items-center justify-content-center">
                    <button
                      onClick={handleExchange}
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
                        <th>نام ارز</th>
                        <th>قیمت واحد (تومان)</th>
                        <th>تغییرات 24 ساعته</th>
                        <th>معامله در بازار</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="tr-responsive">
                        <td data-th="نام ارز">
                          <div>
                            <span className="icon">
                              <svg
                                viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#000000"
                              >
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g
                                  id="SVGRepo_tracerCarrier"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                  <g fill="none" fill-rule="evenodd">
                                    <circle
                                      cx="16"
                                      cy="16"
                                      r="16"
                                      fill="#26A17B"
                                    ></circle>
                                    <path
                                      fill="#FFF"
                                      d="M17.922 17.383v-.002c-.11.008-.677.042-1.942.042-1.01 0-1.721-.03-1.971-.042v.003c-3.888-.171-6.79-.848-6.79-1.658 0-.809 2.902-1.486 6.79-1.66v2.644c.254.018.982.061 1.988.061 1.207 0 1.812-.05 1.925-.06v-2.643c3.88.173 6.775.85 6.775 1.658 0 .81-2.895 1.485-6.775 1.657m0-3.59v-2.366h5.414V7.819H8.595v3.608h5.414v2.365c-4.4.202-7.709 1.074-7.709 2.118 0 1.044 3.309 1.915 7.709 2.118v7.582h3.913v-7.584c4.393-.202 7.694-1.073 7.694-2.116 0-1.043-3.301-1.914-7.694-2.117"
                                    ></path>
                                  </g>
                                </g>
                              </svg>
                            </span>
                            <span className="text-50">تتر</span>
                          </div>
                        </td>
                        <td data-th="قیمت واحد (تومان)">
                          <span className="td-responsive">48,700 </span>
                        </td>
                        <td data-th="تغییرات ۲۴ ساعته">
                          <div className="tm__crypto-changes">
                            <span className="icon">
                              <IoIosArrowDropdown color="red" />
                            </span>
                            <strong className="text-danger">0.25%</strong>
                          </div>
                        </td>
                        <td
                          data-th="معامله در بازار
    "
                        >
                          <a href="#" className="btn-simple tm__actions">
                            شروع معامله
                          </a>
                        </td>
                      </tr>
                      <tr className="tr-responsive">
                        <td data-th="ارز">
                          <div>
                            <span className="icon">
                              <svg
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                              >
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g
                                  id="SVGRepo_tracerCarrier"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                  <path
                                    clip-rule="evenodd"
                                    d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm11-6a1 1 0 1 0-2 0v1.28l-2.316.771a1 1 0 1 0 .632 1.898L10 9.387v.892l-2.316.772a1 1 0 0 0 .632 1.898L10 12.387V17a1 1 0 0 0 1 1c.993 0 2.461-.29 3.71-1.189C16.008 15.876 17 14.326 17 12a1 1 0 1 0-2 0c0 1.674-.675 2.624-1.46 3.188a4.402 4.402 0 0 1-1.54.687V11.72l2.316-.772a1 1 0 0 0-.632-1.898L12 9.613V8.72l2.316-.772a1 1 0 1 0-.632-1.898L12 6.613V6z"
                                    fill-rule="evenodd"
                                    fill="#ff0505"
                                  ></path>
                                </g>
                              </svg>
                            </span>
                            <span className="text-50">لیر</span>
                          </div>
                        </td>
                        <td data-th="قیمت واحد (تومان)">
                          <span className="td-responsive"> 48,230 </span>
                        </td>
                        <td data-th="تغییرات ۲۴ ساعته">
                          <div className="tm__crypto-changes">
                            <span className="icon">
                              <IoIosArrowDropup color="green" />
                            </span>
                            <strong className="text-success">0.25%</strong>
                          </div>
                        </td>
                        <td data-th="معامله در بازار">
                          <a href="#" className="btn-simple tm__actions">
                            شروع معامله
                          </a>
                        </td>
                      </tr>
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
              <TbArrowsExchange color="#111BFF" size={25} />
              <div className="value">خرید و فروش</div>
            </a>
          </Col>
          <Col className="services col-6 col-sm-3 col-xxl-2 mx-xxl-2 mx-md-2  m-0">
            <a
              className="element-box ar-tablo centered trend-in-corner smaller"
              href="#"
            >
              <TbLayersSubtract color="#111BFF" size={25} />
              <div className="value">بازارها</div>
            </a>
          </Col>
          <Col className="services col-6 col-sm-3 col-xxl-2 mx-xxl-2 mx-md-2  m-0">
            <a
              className="element-box ar-tablo centered trend-in-corner smaller"
              href="/dashboard/wallet"
            >
              <LuDownload color="#111BFF" size={25} />
              <div className="value">واریز تتر</div>
            </a>
          </Col>
          <Col className="services col-6 col-sm-3 col-xxl-2 mx-xxl-2 mx-md-2  m-0">
            <a href="/dashboard/wallet">
              <LuDownload color="#111BFF" size={25} />
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
                <CardTitle tag="h5" >تراکنش&zwnj;های اخیر</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="card-body">
                  <div className="table-responsive  ">
                    <table
                      className="table table-borderless table-striped"
                    >
                      <thead>
                        <tr>
                          <th scope="col">نوع</th>
                          <th scope="col" className="text-center">مقدار</th>
                          <th scope="col" className="text-center">دارایی</th>
                          <th scope="col" className="text-center">زمان</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.data.map((data, index) => {
                          if ((data.type === 'DEPOSIT' || data.type === 'WITHDRAW') && data.status !== 'EXPIRED') {
                            return (
                              <tr key={index}>
                                <td>
                                  <span className={
                                    data.type === 'DEPOSIT' ? 'text-success' : 'text-danger'
                                  }>{convertType(data.type)}</span>
                                </td>
                                <td className={`text-center`}>
                                  <span><span style={{ fontSize: '10px' }}>{data.currencyCode === "IRR" ? "TMN" : data.currencyCode}</span>{" "}{data.amount}</span>
                                </td>
                                <td className={`text-center`}>
                                  <span>{convertTextSingle(data.currencyCode)}</span>
                                </td>
                                <td className={`text-center`}>
                                  <span>{moment(data?.createdAt).locale('fa').format('DD MMMM YYYY')}</span>
                                </td>
                              </tr>
                            )
                          }
                        })}
                      </tbody>
                    </table>
                  </div>
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
                  <table className="table table-borderless table-striped ">
                    <thead>
                      <tr>
                        <th scope="col" className="text-center">بازار</th>
                        <th scope="col" className="text-center">مقدار</th>
                        <th scope="col" className="text-center">قیمت واحد</th>
                        <th scope="col" className="text-start">تاریخ</th>
                      </tr>
                    </thead>
                    <tbody className={tableBodyStyle}>
                      {exchange.data.length > 0 && exchange.data.map((data, index) => (
                        <tr key={index}>
                          <td className="text-center"><span className="text-success">{convertTextSingle(data.destinationCurrencyCode)}</span>{" "}- {" "}<span className="text-danger">{convertTextSingle(data?.sourceCurrencyCode)}</span></td>
                          <td className="text-center"><span style={{ fontSize: '10px' }}>{data.destinationCurrencyCode === "IRR" ? "TMN" : data.destinationCurrencyCode}</span>{" "} {data?.sourceAmount}</td>
                          <td className="text-center">{data?.exchangeRate.substring(0, 5)}</td>
                          <td className="text-start">
                            <span className="d-ltr d-block">{moment(data?.createdAt).locale('fa').format('DD MMMM YYYY')}</span>
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
    </>
  );
};

export default DashboardContent;
