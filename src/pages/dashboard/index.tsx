import Layout from "../../components/layout/dashboard";
import User from "../assets/img/icons/user.png";
import Level from "../assets/img/user/level-gold.png";
import Bronz from "../assets/img/user/level-bronze.png";
import Silver from "../assets/img/user/level-silver.png";
import Platinum from "../assets/img/user/level-platinum.png";
import Uranium from "../assets/img/user/level-uranium.png";
import Gold from "../assets/img/user/level-gold.png";
import Edit from "../assets/img/icons/edit.svg";
import Calendar from "../assets/img/icons/calendar2.svg";
import Slider from "react-slick";
import T from "../assets/img/coins/tether.png";
import Turkey from "../assets/img/icons/flag-turkey.png";
import CurrencyInput from "../../components/CurrencyInput";
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

const Dashboard: React.FC = () => {
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
    <Layout>
      <section className="mb-4">
        <div className="card user-summary">
          <div className="card-body">
            <ul>
              <li className="user-summary-avatar">
                <img src={User} alt="" className="avatar" />
              </li>
              <li className="user-summary-edit">
                <h6> بهزاد بابایی</h6>
                <a href="/profile" className="btn btn-transparent">
                  <span className="icon">
                    <img src={Edit} alt="" />
                  </span>
                  پروفایل کاربری
                </a>
              </li>
              <li className="user-summary-lastseen">
                <h6>آخرین ورود</h6>
                <div className="user-summary-date">
                  <span className="icon">
                    <img src={Calendar} alt="" />
                  </span>
                  دوشنبه، 22 آبان 1401
                </div>
              </li>
              <li className="user-summary-level">
                <h6>سطح کاربری شما</h6>
                <div>
                  <img src={Gold} alt="" />
                  <span>برنزی</span>
                  <a href="#">ارتقا سطح</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-4">
        <div className="card auth-jumbotron">
          <div className="card-header">
            <h5 className="card-title">احراز هویت</h5>
          </div>
          <div className="card-body">
            <div className="row g-4">
              <div className="col-xxl-6">
                <div className="auth-jumbotron-summary auth-jumbotron-summary--first">
                  <p>
                    برای استفاده کامل و بدون محدودیت از آرسونیکس باید فرایند
                    احراز هویت را تکمیل کنید، زمان بررسی و تایید اطلاعات ۱ ساعت
                    &zwnj;می&zwnj;باشد.{" "}
                  </p>
                  <a href="#" className="btn btn-outline-primary">
                    شروع احراز هویت
                  </a>
                </div>
              </div>
              <div className="col-xxl-3 col-md-6">
                <ul className="auth-jumbotron-advantages">
                  <li>
                    <h5 className="">احراز هویت سطح یک</h5>
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
                    ﻭﺍﺭﯾﺰ و برداشت تومانی ﺭﻭﺯﺍﻧﻪ:
                    <strong>۱ میلیون تومان</strong>
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
                    واریز و برداشت فیات روزانه: <strong>معادل ۵۰۰ دلار</strong>
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
                    واریز رمزارز ﺭﻭﺯﺍﻧﻪ:
                    <strong>نامحدود</strong>
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
                    برداشت رمزارز ﺭﻭﺯﺍﻧﻪ:
                    <strong>نامحدود</strong>
                  </li>
                </ul>
              </div>
              <div className="col-xxl-3 col-md-6">
                <ul className="auth-jumbotron-advantages">
                  <li>
                    <h5>احراز هویت سطح دو</h5>
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
                    ﻭﺍﺭﯾﺰ و برداشت ﺗﻮﻣﺎنی ﺭﻭﺯﺍﻧﻪ:
                    <strong>۱۰۰ میلیون تومان - ۱ میلیارد تومان</strong>
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
                    ﻭﺍﺭﯾﺰ و برداشت فیات ﺭﻭﺯﺍﻧﻪ:
                    <strong>معادل ۳۵ هزار دلار </strong>
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
                    واریز رمزارز ﺭﻭﺯﺍﻧﻪ:
                    <strong>نامحدود</strong>
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
                    برداشت رمزارز ﺭﻭﺯﺍﻧﻪ:
                    <strong>نامحدود</strong>
                  </li>
                </ul>
              </div>
              <div className="col-12">
                <div className="auth-jumbotron-summary">
                  <a href="#" className="btn btn-outline-primary">
                    شروع احراز هویت
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-4">
        <div className="row g-4">
          <div className="col-xxl-7 col-xl-6">
            <div className="card currency-exchange card--h100pc card-secondary">
              <div className="card-header">
                <h5 className="card-title">خرید و فروش</h5>
              </div>
              <div className="card-body">
                <form action="">
                  <div className="currency-exchange__controls">
                    <div className="currency-exchange__control-group">
                      <label className="form-label">پرداخت می‌کنید:</label>
                      <div className="">
                        <CurrencyInput
                          value={""}
                          onChange={(value) => {
                            console.log(value);
                          }}
                        />
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
                        <CurrencyInput
                          value={""}
                          onChange={(value) => {
                            console.log(value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="currency-exchange__action">
                    <button type="button" className="btn btn-primary">
                      ثبت و ادامه
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-xxl-5 col-xl-6">
            <div className="card wallet-card card--h100pc card-secondary">
              <div className="card-header">
                <h5 className="card-title">کیف پول</h5>
              </div>
              <div className="card-body">
                <div className="wallet">
                  <div className="wallet-value">
                    ارزش کل کیف پول
                    <strong className="d-inline-block d-ltr">
                      893,548,200
                      <small>IRT</small>
                    </strong>
                  </div>
                  <div className="wallet-chart">
                    <ul className="wallet-chart-legends"></ul>
                    <div id="walletChart"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="">
        <div className="card currencies-online-rates card-secondary">
          <div className="card-header">
            <h5 className="card-title">بازارهای معاملاتی</h5>
          </div>
          <div className="card-body">
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
          </div>
        </div>
      </section>

      <section className="mb-4 mt-4">
        <div className="slide features-slider">
          <div className="">
            <Slider {...settings}>
              <div className="slide-item features-slider-item--blue">
                <div
                  className="features-slider-caption"
                  style={{
                    justifyContent: "center",
                    display: "fle",
                    flexDirection: "column",
                  }}
                >
                  <h4 className="features-slider-title">
                    تضمین بهترین نرخ لیر{" "}
                  </h4>
                  <h5 className="features-slider-subtitle">
                    شروع به معامله کنید
                  </h5>
                </div>
                <div className="features-slider-img">
                  <img src="assets/img/slides/slide-001.jpg" alt="" />
                </div>
              </div>
              <div className="slide-item features-slider-item--darkblue">
                <div className="features-slider-caption">
                  <h4 className="features-slider-title">تتر به لیر یا ریال</h4>
                  <h5 className="features-slider-subtitle">
                    پول خود را به راحتی به ارز دیجیتال تبدیل کنید
                  </h5>
                </div>
              </div>
              <div className="slide-item features-slider-item--blue">
                <div
                  className="features-slider-caption"
                  style={{
                    justifyContent: "center",
                    display: "fle",
                    flexDirection: "column",
                  }}
                >
                  <h4 className="features-slider-title"> به لیر یا ریال</h4>
                  <h5 className="features-slider-subtitle">
                    شروع به معامله کنید
                  </h5>
                </div>
              </div>
              <div className="slide-item features-slider-item--gold">
                <div
                  className="features-slider-caption"
                  style={{
                    justifyContent: "center",
                    display: "fle",
                    flexDirection: "column",
                  }}
                >
                  <h4 className="features-slider-title">
                    ریال بدون محدودیت تبدیل کن
                  </h4>
                  <h5 className="features-slider-subtitle">
                    لیر یا تتر شما آماده استفاده هست!
                  </h5>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </section>

      <section className="mb-4">
        <div className="row g-4">
          <div className="col-xxl-7 col-xl-6">
            <div className="card market-transactions card--h100pc card-secondary coming">
              <div className="card-header soon">
                <h5 className="card-title">معاملات در بازار</h5>
              </div>
              <div className="card-body">
                <div className="slide crypto-slider">
                  <div className="owl-carousel owl-theme">
                    <div data-dot="<button>1</button>" className="crypto-item">
                      <div className="crypto-item__header">
                        <img
                          src="assets/img/coins/coin-008.png"
                          alt=""
                          className="crypto-item__img"
                        />
                        <div>
                          <h3 className="crypto-item__title">اتریوم</h3>
                          <span className="crypto-item__subtitle">ETH</span>
                        </div>
                      </div>
                      <div className="crypto-item__body">
                        <p className="crypto-item__text">
                          بهترین خرید:
                          <strong className="text-success"></strong>
                          <span></span>
                        </p>
                        <p className="crypto-item__text">
                          بهترین فروش:
                          <strong className="text-success"></strong>
                          <span></span>
                        </p>
                      </div>
                      <div className="crypto-item__footer">
                        <a href="#" className="btn-simple">
                          شروع معامله
                        </a>
                      </div>
                    </div>
                    <div data-dot="<button>2</button>" className="crypto-item">
                      <div className="crypto-item__header">
                        <img
                          src="assets/img/coins/coin-007.png"
                          alt=""
                          className="crypto-item__img"
                        />
                        <div>
                          <h3 className="crypto-item__title">بیتکوین</h3>
                          <span className="crypto-item__subtitle">BTC</span>
                        </div>
                      </div>
                      <div className="crypto-item__body">
                        <p className="crypto-item__text">
                          بهترین خرید:
                          <strong className="text-success"></strong>
                          <span></span>
                        </p>
                        <p className="crypto-item__text">
                          بهترین فروش:
                          <strong className="text-success"></strong>
                          <span></span>
                        </p>
                      </div>
                      <div className="crypto-item__footer">
                        <a href="#" className="btn-simple">
                          شروع معامله
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="crypto-slider-footer">
                    <div className="crypto-slider-navs"></div>
                    <div className="crypto-slider-dots"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-5 col-xl-6">
            <div className="card card--h100pc card-secondary">
              <div className="card-header card-header-flex">
                <h5 className="card-title"> تراکنش‌های اخیر</h5>
                <select
                  name=""
                  className="bs-select-control bs-select-dropdown"
                >
                  <option value="3">لیر به ریال</option>
                  <option value="1">تتر به لیر</option>
                </select>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table-modern table-modern--compact">
                    <thead>
                      <tr>
                        <th scope="col" className="text-center">
                          مقدار (BTC)
                        </th>
                        <th scope="col" className="text-center">
                          قیمت واحد (تومان)
                        </th>
                        <th scope="col" className="text-center">
                          زمان
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataArray.map((data, index) => (
                        <tr key={index}>
                          <td className="text-center">
                            <span
                              className={
                                index % 2 === 0 ? "text-success" : "text-danger"
                              }
                            >
                              {data.value}
                            </span>
                          </td>
                          <td className="text-center">
                            <span
                              className={
                                index % 2 === 0 ? "text-success" : "text-danger"
                              }
                            >
                              {data.number}
                            </span>
                          </td>
                          <td className="text-center">
                            <span
                              className={
                                index % 2 === 0 ? "text-success" : "text-danger"
                              }
                            >
                              {data.time}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-4">
        <div className="row g-4">
          <div className="col-xxl-7 col-xl-6">
            <div className="card card--h100pc card-secondary">
              <div className="card-header">
                <h5 className="card-title">آخرین معاملات</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table-modern table-my-transactions">
                    <thead>
                      <tr>
                        <th scope="col">نوع</th>
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
                    </thead>
                    <tbody>
                      {dataArray2.map((data, index) => (
                        <tr key={index}>
                          <td>
                            <span
                              className={
                                data.type === "خرید"
                                  ? "text-success"
                                  : "text-danger"
                              }
                            >
                              {data.type}
                            </span>
                          </td>
                          <td className="text-center">{data.currency}</td>
                          <td className="text-center">{data.value}</td>
                          <td className="text-center">{data.number}</td>
                          <td className="text-start">
                            <span className="d-ltr d-block">{data.time}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-5 col-xl-6">
            <div className="card account-level-card card--h100pc card-secondary coming">
              <div className="card-header card-header-flex soon">
                <h5 className="card-title">
                  سطح کاربری شما
                  <small>(براساس معاملات شما در سه ماه اخیر)</small>
                </h5>
                <div className="card-action">
                  <a href="#" className="btn-simple">
                    ارتقا سطح
                  </a>
                </div>
              </div>
              <div className="card-body">
                <ul className="progress-cups">
                  <li className="progress-cup progress-cup--gold progress-cup--current">
                    <div className="progress-cup-img">
                      <span>برنزی</span>
                      <img src={Level} alt="" />
                    </div>
                    <div className="progress-cup-wage"> </div>
                  </li>
                  <li className="progress-cup progress-cup--bronze">
                    <div className="progress-cup-img">
                      <span>برنزی</span>
                      <img src={Bronz} alt="" />
                    </div>
                  </li>
                  <li className="progress-cup progress-cup--silver">
                    <div className="progress-cup-img">
                      <span>نقره‌ای</span>
                      <img src={Silver} alt="" />
                    </div>
                  </li>
                  <li className="progress-cup progress-cup--platinum">
                    <div className="progress-cup-img">
                      <span>پلاتینیوم</span>
                      <img src={Platinum} alt="" />
                    </div>
                  </li>
                  <li className="progress-cup progress-cup--uranium">
                    <div className="progress-cup-img">
                      <span>اورانیوم</span>
                      <img src={Uranium} alt="" />
                    </div>
                  </li>
                </ul>
                <div className="progress-item">
                  <div className="progress-item__header">
                    <span>سطح طلایی</span>
                    <span>سطح پلاتینیوم</span>
                  </div>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "25%" }}
                      // aria-valuenow="25"
                      // aria-valuemin="0"
                      // aria-valuemax="100"
                    ></div>
                  </div>
                  <div className="progress-item__footer">
                    <span>- تومان</span>
                    <span>- تومان</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default Dashboard;
