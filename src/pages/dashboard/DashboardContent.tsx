import User from "assets/img/icons/user.png";

import chart from "assets/img/chart-img.png";

import T from "assets/img/coins/tether.png";
import Turkey from "assets/img/icons/flag-turkey.png";

import { useAppDispatch, useAppSelector } from "redux/hooks";

import { BsCalendar2Event, BsCheck2 } from "react-icons/bs";
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
import { useEffect } from "react";
import { setUser } from "redux/features/user/userSlice";

const dataArray = [
  { value: "0.00256", number: "45،154", time: "11:30" },
  { value: "0.00256", number: "45،154", time: "11:30" },
  { value: "0.00256", number: "45،154", time: "11:30" },
  { value: "0.00256", number: "45،154", time: "11:30" },
  { value: "0.00256", number: "45،154", time: "11:30" },
  { value: "0.00256", number: "45،154", time: "11:30" },
  { value: "0.00256", number: "45،154", time: "11:30" },
];
const dataArray2 = [
  {
    type: "خرید",
    currency: "بیتکوین - ریال",
    value: "0.004524567",
    number: "32,322,345",
    time: "01/06/08 - 11:34",
  },
  {
    type: "فروش",
    currency: "بیتکوین - ریال",
    value: "0.004524567",
    number: "32,322,345",
    time: "01/06/08 - 11:34",
  },
  // Add more data objects as needed
];

const DashboardContent = () => {
  const user = useAppSelector((state) => state.user);

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

  return (
    <>
      <section className="mb-3">
        <Card className="custom-card user-summary">
          <CardBody>
            <Row className="align-items-start">
              <Col
                xs={12}
                sm={1}
                className="user-summary__section user-summary-avatar"
              >
                <img src={User} alt="" className="avatar" />
              </Col>
              <Col
                xs={12}
                sm={2}
                className="user-summary__section user-summary-edit"
              >
                <h6>{firstName + " " + lastName}</h6>
                <Button
                  className="profile-btn"
                  outline
                  color="secondary"
                  href="/profile"
                >
                  <CiEdit />
                  پروفایل کاربری
                </Button>
              </Col>
              <Col
                xs={12}
                sm={2}
                className="user-summary__section user-summary-lastseen"
              >
                <h6>آخرین ورود</h6>
                <div className="user-summary-date">
                  <BsCalendar2Event />
                  دوشنبه، 22 آبان 1401
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
              <Col xxl={6}>
                <div className="auth-jumbotron__summary">
                  <p>
                    برای استفاده کامل و بدون محدودیت از آرسونیکس باید فرایند
                    احراز هویت را تکمیل کنید، زمان بررسی و تایید اطلاعات ۱ ساعت
                    &zwnj;می&zwnj;باشد.{" "}
                  </p>
                  <Button outline color="primary">
                    شروع احراز هویت
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
              <Col xxl={3} md={6}>
                <ul className="auth-jumbotron__advantages">
                  <li>
                    <h5>احراز هویت سطح دو</h5>
                  </li>
                  <li>
                    <BsCheck2 className="icon" size={15} color={"#55cd51"} />
                    ﻭﺍﺭﯾﺰ و برداشت ﺗﻮﻣﺎنی ﺭﻭﺯﺍﻧﻪ:
                    <strong>۱۰۰ میلیون تومان - ۱ میلیارد تومان</strong>
                  </li>
                  <li>
                    <BsCheck2 className="icon" size={15} color={"#55cd51"} />
                    ﻭﺍﺭﯾﺰ و برداشت فیات ﺭﻭﺯﺍﻧﻪ:
                    <strong>معادل ۳۵ هزار دلار </strong>
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
              <Col xl={12} className="d-none">
                <div className="auth-jumbotron__summary">
                  <a href="#" className="btn btn-outline-primary">
                    شروع احراز هویت
                  </a>
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
                  <div className="currency-exchange__controls">
                    <div className="currency-exchange__control-group">
                      <label className="form-label">پرداخت می‌کنید:</label>
                      <div className="">
                        {/* <CurrencyInput
                          value={""}
                          onChange={(value: string) => {
                            console.log(value);
                          }}
                        /> */}
                      </div>
                    </div>
                    <div className="currency-exchange__divider">
                      <span className="icon">
                        <svg
                          width="19"
                          height="17"
                          viewBox="0 0 19 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18 5H1L5 1"
                            stroke="#03041B"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M1 12L18 12L14 16"
                            stroke="#03041B"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                    <div className="currency-exchange__control-group">
                      <label className="form-label">دریافت می‌کنید:</label>
                      <div className="">
                        {/* <CurrencyInput
                          value={""}
                          onChange={(value: string) => {
                            console.log(value);
                          }}
                        /> */}
                      </div>
                    </div>
                  </div>
                  <div className="currency-exchange__action">
                    <button type="button" className="btn btn-primary">
                      ثبت و ادامه
                    </button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </Col>
          <Col xxl={5} xl={6}>
            <Card className="custom-card wallet-card card--h100pc card-secondary">
              <CardHeader className="card-header-flex">
                <CardTitle tag="h5">کیف پول</CardTitle>
                <div className="card-action">
                  <Button href="#">مشاهده کیف پول</Button>
                </div>
              </CardHeader>
              <CardBody>
                <Row className="g-4">
                  <Col xxl={9} md={6}>
                    <Row className="g-2 mb-2">
                      <Col sm={3} xxl={6} className="col-6">
                        <div className="box-wallet usdt-box">
                          <div className="dot-wallet usdt-show"></div>
                          <span className="name-currency-wallet">تتر</span>
                          <span className="now-wallet-show">USDT 1,244</span>
                        </div>
                      </Col>
                      <Col sm={3} xxl={6} className="col-6">
                        <div className="box-wallet tl-box">
                          <div className="dot-wallet tl-show"></div>
                          <span className="name-currency-wallet">لیر</span>
                          <span className="now-wallet-show">TL 2,656,01</span>
                        </div>
                      </Col>
                    </Row>
                    <Row className="g-2 mb-2">
                      <Col sm={3} xxl={6} className="col-6">
                        <div className="box-wallet aed-box">
                          <div className="dot-wallet aed-show"></div>
                          <span className="name-currency-wallet">درهم</span>
                          <span className="now-wallet-show">AED 1,345,07</span>
                        </div>
                      </Col>
                      <Col sm={3} xxl={6} className="col-6">
                        <div className="box-wallet usd-box">
                          <div className="dot-wallet usd-show"></div>
                          <span className="name-currency-wallet">دلار</span>
                          <span className="now-wallet-show">USD 243</span>
                        </div>
                      </Col>
                    </Row>
                    <Row className="g-2 mb-2">
                      <Col sm={3} xxl={6} className="col-6">
                        <div className="box-wallet gbp-box">
                          <div className="dot-wallet gbp-show"></div>
                          <span className="name-currency-wallet">پوند</span>
                          <span className="now-wallet-show">GBP 3,421</span>
                        </div>
                      </Col>
                      <Col sm={3} xxl={6} className="col-6">
                        <div className="box-wallet eur-box">
                          <div className="dot-wallet eur-show"></div>
                          <span className="name-currency-wallet">یورو </span>
                          <span className="now-wallet-show">EUR 789</span>
                        </div>
                      </Col>
                    </Row>
                    <Row className="g-2 mt-2">
                      <Col sm={6} className="mx-auto">
                        <div className="full-toman">
                          <span className="toman-text">
                            دارایی شما به تومان:
                          </span>
                          <span className="toman-number">۱،۵۴۳،۰۶۹،۳۲۱</span>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col xxl={3} md={6}>
                    <Row className="g-2 mb-2">
                      <Col sm={3} xxl={6} className="col-6">
                        <img
                          src={chart}
                          alt=""
                          className="wallet-img-chart mt-4"
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </section>

      <section className="mb-4">
        <Card className="custom-card currencies-online-rates card-secondary">
          <CardHeader className="card-header-flex">
            <CardTitle tag="h5">بازارهای معاملاتی</CardTitle>
            <div className="card-action">
              <Button href="#">مشاهده تمام بازارها</Button>
            </div>
          </CardHeader>
          <CardBody>
            <div className="table-responsive">
              <table className="table-modern">
                <thead>
                  <tr>
                    <th scope="col">ارز</th>
                    <th scope="col" className="text-center">
                      قیمت واحد (دلار)
                    </th>
                    <th scope="col" className="text-center">
                      قیمت واحد (تومان)
                    </th>

                    <th scope="col" className="text-center">
                      تغییرات 24 ساعته
                    </th>

                    <th scope="col" className="text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div>
                        <img src={T} alt="" className="tm__crypto-img" />
                        <span className="text-50">تتر</span>
                      </div>
                    </td>
                    <td className="text-center">0,993</td>
                    <td className="text-center">48,230</td>
                    <td className="text-center">
                      <div className="tm__crypto-changes">
                        <span className="icon">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0.833466 7C0.833466 10.4053 3.59413 13.1667 7.00013 13.1667C10.4055 13.1667 13.1668 10.4053 13.1668 7C13.1668 3.59467 10.4055 0.833333 7.00013 0.833333C3.59413 0.833334 0.833466 3.59467 0.833466 7Z"
                              stroke="#FF1F11"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M4.686 6.03847L7 8.36247L9.314 6.03847"
                              stroke="#FF1F11"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </span>
                        <strong className="text-danger">0.25%</strong>
                      </div>
                    </td>

                    <td className="text-center tm__actions">
                      <a href="#" className="btn-simple">
                        شروع معامله
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div>
                        <img src={Turkey} alt="" className="tm__crypto-img" />
                        <span className="text-50">لیر</span>
                      </div>
                    </td>
                    <td className="text-center">0,041</td>
                    <td className="text-center">2,346</td>
                    <td className="text-center">
                      <div className="tm__crypto-changes">
                        <span className="icon">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M13.1665 7C13.1665 3.59467 10.4059 0.833334 6.99987 0.833334C3.59453 0.833334 0.833201 3.59467 0.833201 7C0.833201 10.4053 3.59453 13.1667 6.99987 13.1667C10.4059 13.1667 13.1665 10.4053 13.1665 7Z"
                              stroke="#0ED039"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M9.314 7.96153L7 5.63753L4.686 7.96153"
                              stroke="#0ED039"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </span>
                        <strong className="text-success">0.25%</strong>
                      </div>
                    </td>

                    <td className="text-center tm__actions">
                      <a href="#" className="btn-simple">
                        شروع معامله
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>{" "}
            </div>
          </CardBody>
        </Card>
      </section>
    </>
  );
};

export default DashboardContent;
