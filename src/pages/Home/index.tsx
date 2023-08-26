import LandingLayout from "layouts/Landing";
import Slider from "react-slick";

import USDT from "assets/img/coins/USDT.png";
import lira from "assets/img/coins/lira.png";
import BTC from "assets/img/coins/BTC.png";
import ETH from "assets/img/coins/ETH.png";
import LTC from "assets/img/coins/LTC.png";
import shib from "assets/img/coins/SHIB.png";
import ADA from "assets/img/coins/ADA.png";
import graphG from "assets/img/graph-g.png";
import graphR from "assets/img/graph-r.png";

import feature003 from "assets/img/features/feature003.png";
import feature004 from "assets/img/features/feature004.png";
import feature001 from "assets/img/features/feature001.png";
import feature002 from "assets/img/features/feature002.png";

import dashboard from "assets/img/lay/dashboard.png";
import face003 from "assets/img/people/face003.jpg";
import face002 from "assets/img/people/face002.jpg";

import "./style.scss";
import { useEffect } from "react";

export default function HomePage() {
  const commentSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    rtl: false,
  };
  const blogSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    rtl: false,
  };

  useEffect(() => {
    fetch("https://dev-api.arsonex.market/v1/rates/USD-IRR")
      .then((response) => {
        // Check if the response status is OK (status code 200)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Parse the JSON response
        return response.json();
      })
      .then((data) => {
        // Handle the JSON data
        console.log("Data:", data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Fetch error:", error);
      });
  }, []);

  return (
    <LandingLayout>
      <main className="main-wrapper">
        <section className="landing-currency-rates section-gap">
          <div className="container">
            <div className="section-title">
              <h3 className="section-title__title">
                نرخ لحظه ای
                <span className="text-primary">ارزها</span>
              </h3>
            </div>
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
                    همه ارزها
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
                    داغ ترین ها
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
                    بیشترین سود
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
                    کمترین سود
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
                  <table className="table-crypto">
                    <thead>
                      <tr>
                        <th className="text-center">ارز</th>
                        <th className="text-center">قیمت واحد (دلار)</th>
                        <th className="text-center">قیمت واحد (ریال)</th>
                        <th className="text-center">تغییرات 24 ساعته</th>
                        <th className="text-center"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="table-crypto-title">
                            <img src={USDT} alt="USDT" />
                            <h6>تتر</h6>
                            <span>USDT</span>
                          </div>
                        </td>
                        <td className="text-center">
                          <span className="d-inline-block d-ltr">$1</span>
                        </td>
                        <td className="text-center">
                          <span className="fs-md">50,950 تومان</span>
                        </td>
                        <td className="text-center">
                          <div className="table-crypto-changes">
                            <span className="text-success fw-medium d-inline-block d-ltr">
                              +2.5%
                            </span>
                            <img src={graphG} alt="graph" />
                          </div>
                        </td>
                        <td className="text-start">
                          <div className="table-crypto-actions">
                            <a href="#" className="btn btn-outline-primary">
                              معامله
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="table-crypto-title">
                            <img src={lira} alt="Lira" />
                            <h6>لیر</h6>
                            <span>TL</span>
                          </div>
                        </td>
                        <td className="text-center">
                          <span className="d-inline-block d-ltr">$0.03</span>
                        </td>
                        <td className="text-center">
                          <span className="fs-md">1,950 تومان</span>
                        </td>
                        <td className="text-center">
                          <div className="table-crypto-changes">
                            <span className="text-danger fw-medium d-inline-block d-ltr">
                              -2.3%
                            </span>
                            <img src={graphR} alt="graph" />
                          </div>
                        </td>
                        <td className="text-start">
                          <div className="table-crypto-actions">
                            <a href="#" className="btn btn-outline-primary">
                              معامله
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="table-crypto-title">
                            <img src={BTC} alt="BTC" />
                            <h6>بیت کوین</h6>
                            <span>BTC</span>
                          </div>
                        </td>
                        <td className="text-center">
                          <span className="d-inline-block d-ltr">
                            $17,232.32
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="fs-md">430,807.5 تومان</span>
                        </td>
                        <td className="text-center">
                          <div className="table-crypto-changes">
                            <span className="text-success fw-medium d-inline-block d-ltr">
                              +2.5%
                            </span>
                            <img src={graphG} />
                          </div>
                        </td>
                        <td className="text-start"></td>
                      </tr>
                      <tr>
                        <td>
                          <div className="table-crypto-title">
                            <img src={ETH} alt="ETH" />
                            <h6>اتریوم</h6>
                            <span>ETH</span>
                          </div>
                        </td>
                        <td className="text-center">
                          <span className="d-inline-block d-ltr">
                            $17,232.32
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="fs-md">430,807.5 تومان</span>
                        </td>
                        <td className="text-center">
                          <div className="table-crypto-changes">
                            <span className="text-danger fw-medium d-inline-block d-ltr">
                              -2.3%
                            </span>
                            <img src={graphR} />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="table-crypto-title">
                            <img src={LTC} alt="LTC" />
                            <h6>لایت کوین</h6>
                            <span>LTC</span>
                          </div>
                        </td>
                        <td className="text-center">
                          <span className="d-inline-block d-ltr">
                            $17,232.32
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="fs-md">430,807.5 تومان</span>
                        </td>
                        <td className="text-center">
                          <div className="table-crypto-changes">
                            <span className="text-danger fw-medium d-inline-block d-ltr">
                              -2.3%
                            </span>
                            <img src={graphR} />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="table-crypto-title">
                            <img src={shib} alt="Shib" />
                            <h6>شیبا</h6>
                            <span>SHIB</span>
                          </div>
                        </td>
                        <td className="text-center">
                          <span className="d-inline-block d-ltr">
                            $17,232.32
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="fs-md">430,807.5 تومان</span>
                        </td>
                        <td className="text-center">
                          <div className="table-crypto-changes">
                            <span className="text-success fw-medium d-inline-block d-ltr">
                              +2.5%
                            </span>
                            <img src={graphG} />
                          </div>
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
                  <table className="table-crypto">
                    <thead>
                      <tr>
                        <th className="text-center">ارز</th>
                        <th className="text-center">قیمت واحد (دلار)</th>
                        <th className="text-center">قیمت واحد (ریال)</th>
                        <th className="text-center">تغییرات 24 ساعته</th>
                        <th className="text-center"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="table-crypto-title">
                            <img src={BTC} />
                            <h6>بیت کوین</h6>
                            <span>BTC</span>
                          </div>
                        </td>
                        <td className="text-center">
                          <span className="d-inline-block d-ltr">
                            $17,232.32
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="fs-md">430,807.5 تومان</span>
                        </td>
                        <td className="text-center">
                          <div className="table-crypto-changes">
                            <span className="text-success fw-medium d-inline-block d-ltr">
                              +2.5%
                            </span>
                            <img src={graphG} />
                          </div>
                        </td>
                        <td className="text-start">
                          <div className="table-crypto-actions">
                            <a href="#" className="btn btn-outline-primary">
                              معامله
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="table-crypto-title">
                            <img src={USDT} />
                            <h6>تتر</h6>
                            <span>USDT</span>
                          </div>
                        </td>
                        <td className="text-center">
                          <span className="d-inline-block d-ltr">
                            $17,232.32
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="fs-md">430,807.5 تومان</span>
                        </td>
                        <td className="text-center">
                          <div className="table-crypto-changes">
                            <span className="text-success fw-medium d-inline-block d-ltr">
                              +2.5%
                            </span>
                            <img src={graphG} />
                          </div>
                        </td>
                        <td className="text-start">
                          <div className="table-crypto-actions">
                            <a href="#" className="btn btn-outline-primary">
                              معامله
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="table-crypto-title">
                            <img src={LTC} />
                            <h6>لایت کوین</h6>
                            <span>LTC</span>
                          </div>
                        </td>
                        <td className="text-center">
                          <span className="d-inline-block d-ltr">
                            $17,232.32
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="fs-md">430,807.5 تومان</span>
                        </td>
                        <td className="text-center">
                          <div className="table-crypto-changes">
                            <span className="text-danger fw-medium d-inline-block d-ltr">
                              -2.3%
                            </span>
                            <img src={graphR} />
                          </div>
                        </td>
                        <td className="text-start">
                          <div className="table-crypto-actions">
                            <a href="#" className="btn btn-outline-primary">
                              معامله
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="table-crypto-title">
                            <img src={shib} />
                            <h6>شیبا</h6>
                            <span>SHIB</span>
                          </div>
                        </td>
                        <td className="text-center">
                          <span className="d-inline-block d-ltr">
                            $17,232.32
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="fs-md">430,807.5 تومان</span>
                        </td>
                        <td className="text-center">
                          <div className="table-crypto-changes">
                            <span className="text-success fw-medium d-inline-block d-ltr">
                              +2.5%
                            </span>
                            <img src={graphG} />
                          </div>
                        </td>
                        <td className="text-start">
                          <div className="table-crypto-actions">
                            <a href="#" className="btn btn-outline-primary">
                              معامله
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="table-crypto-title">
                            <img src={ETH} />
                            <h6>اتریوم</h6>
                            <span>ETH</span>
                          </div>
                        </td>
                        <td className="text-center">
                          <span className="d-inline-block d-ltr">
                            $17,232.32
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="fs-md">430,807.5 تومان</span>
                        </td>
                        <td className="text-center">
                          <div className="table-crypto-changes">
                            <span className="text-danger fw-medium d-inline-block d-ltr">
                              -2.3%
                            </span>
                            <img src={graphR} />
                          </div>
                        </td>
                        <td className="text-start">
                          <div className="table-crypto-actions">
                            <a href="#" className="btn btn-outline-primary">
                              معامله
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="table-crypto-title">
                            <img src={ADA} />
                            <h6>کاردانو</h6>
                            <span>ADA</span>
                          </div>
                        </td>
                        <td className="text-center">
                          <span className="d-inline-block d-ltr">
                            $17,232.32
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="fs-md">430,807.5 تومان</span>
                        </td>
                        <td className="text-center">
                          <div className="table-crypto-changes">
                            <span className="text-danger fw-medium d-inline-block d-ltr">
                              -2.3%
                            </span>
                            <img src={graphR} />
                          </div>
                        </td>
                        <td className="text-start">
                          <div className="table-crypto-actions">
                            <a href="#" className="btn btn-outline-primary">
                              معامله
                            </a>
                          </div>
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
                  <table className="table-crypto">
                    <thead>
                      <tr>
                        <th className="text-center">ارز</th>
                        <th className="text-center">قیمت واحد (دلار)</th>
                        <th className="text-center">قیمت واحد (ریال)</th>
                        <th className="text-center">تغییرات 24 ساعته</th>
                        <th className="text-center"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="table-crypto-title">
                            <img src={BTC} />
                            <h6>بیت کوین</h6>
                            <span>BTC</span>
                          </div>
                        </td>
                        <td className="text-center">
                          <span className="d-inline-block d-ltr">
                            $17,232.32
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="fs-md">430,807.5 تومان</span>
                        </td>
                        <td className="text-center">
                          <div className="table-crypto-changes">
                            <span className="text-success fw-medium d-inline-block d-ltr">
                              +2.5%
                            </span>
                            <img src={graphG} />
                          </div>
                        </td>
                        <td className="text-start">
                          <div className="table-crypto-actions">
                            <a href="#" className="btn btn-outline-primary">
                              معامله
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="table-crypto-title">
                            <img src={USDT} />
                            <h6>تتر</h6>
                            <span>USDT</span>
                          </div>
                        </td>
                        <td className="text-center">
                          <span className="d-inline-block d-ltr">
                            $17,232.32
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="fs-md">430,807.5 تومان</span>
                        </td>
                        <td className="text-center">
                          <div className="table-crypto-changes">
                            <span className="text-success fw-medium d-inline-block d-ltr">
                              +2.5%
                            </span>
                            <img src={graphG} />
                          </div>
                        </td>
                        <td className="text-start">
                          <div className="table-crypto-actions">
                            <a href="#" className="btn btn-outline-primary">
                              معامله
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="table-crypto-title">
                            <img src={LTC} />
                            <h6>لایت کوین</h6>
                            <span>LTC</span>
                          </div>
                        </td>
                        <td className="text-center">
                          <span className="d-inline-block d-ltr">
                            $17,232.32
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="fs-md">430,807.5 تومان</span>
                        </td>
                        <td className="text-center">
                          <div className="table-crypto-changes">
                            <span className="text-danger fw-medium d-inline-block d-ltr">
                              -2.3%
                            </span>
                            <img src={graphR} />
                          </div>
                        </td>
                        <td className="text-start">
                          <div className="table-crypto-actions">
                            <a href="#" className="btn btn-outline-primary">
                              معامله
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="table-crypto-title">
                            <img src={shib} />
                            <h6>شیبا</h6>
                            <span>SHIB</span>
                          </div>
                        </td>
                        <td className="text-center">
                          <span className="d-inline-block d-ltr">
                            $17,232.32
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="fs-md">430,807.5 تومان</span>
                        </td>
                        <td className="text-center">
                          <div className="table-crypto-changes">
                            <span className="text-success fw-medium d-inline-block d-ltr">
                              +2.5%
                            </span>
                            <img src={graphG} />
                          </div>
                        </td>
                        <td className="text-start">
                          <div className="table-crypto-actions">
                            <a href="#" className="btn btn-outline-primary">
                              معامله
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="table-crypto-title">
                            <img src={ETH} />
                            <h6>اتریوم</h6>
                            <span>ETH</span>
                          </div>
                        </td>
                        <td className="text-center">
                          <span className="d-inline-block d-ltr">
                            $17,232.32
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="fs-md">430,807.5 تومان</span>
                        </td>
                        <td className="text-center">
                          <div className="table-crypto-changes">
                            <span className="text-danger fw-medium d-inline-block d-ltr">
                              -2.3%
                            </span>
                            <img src={graphR} />
                          </div>
                        </td>
                        <td className="text-start">
                          <div className="table-crypto-actions">
                            <a href="#" className="btn btn-outline-primary">
                              معامله
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="table-crypto-title">
                            <img src={ADA} />
                            <h6>کاردانو</h6>
                            <span>ADA</span>
                          </div>
                        </td>
                        <td className="text-center">
                          <span className="d-inline-block d-ltr">
                            $17,232.32
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="fs-md">430,807.5 تومان</span>
                        </td>
                        <td className="text-center">
                          <div className="table-crypto-changes">
                            <span className="text-danger fw-medium d-inline-block d-ltr">
                              -2.3%
                            </span>
                            <img src={graphR} />
                          </div>
                        </td>
                        <td className="text-start">
                          <div className="table-crypto-actions">
                            <a href="#" className="btn btn-outline-primary">
                              معامله
                            </a>
                          </div>
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
                  <table className="table-crypto">
                    <thead>
                      <tr>
                        <th className="text-center">ارز</th>
                        <th className="text-center">قیمت واحد (دلار)</th>
                        <th className="text-center">قیمت واحد (ریال)</th>
                        <th className="text-center">تغییرات 24 ساعته</th>
                        <th className="text-center"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="table-crypto-title">
                            <img src={BTC} />
                            <h6>بیت کوین</h6>
                            <span>BTC</span>
                          </div>
                        </td>
                        <td className="text-center">
                          <span className="d-inline-block d-ltr">
                            $17,232.32
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="fs-md">430,807.5 تومان</span>
                        </td>
                        <td className="text-center">
                          <div className="table-crypto-changes">
                            <span className="text-success fw-medium d-inline-block d-ltr">
                              +2.5%
                            </span>
                            <img src={graphG} />
                          </div>
                        </td>
                        <td className="text-start">
                          <div className="table-crypto-actions">
                            <a href="#" className="btn btn-outline-primary">
                              معامله
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="table-crypto-title">
                            <img src={USDT} />
                            <h6>تتر</h6>
                            <span>USDT</span>
                          </div>
                        </td>
                        <td className="text-center">
                          <span className="d-inline-block d-ltr">
                            $17,232.32
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="fs-md">430,807.5 تومان</span>
                        </td>
                        <td className="text-center">
                          <div className="table-crypto-changes">
                            <span className="text-success fw-medium d-inline-block d-ltr">
                              +2.5%
                            </span>
                            <img src={graphG} />
                          </div>
                        </td>
                        <td className="text-start">
                          <div className="table-crypto-actions">
                            <a href="#" className="btn btn-outline-primary">
                              معامله
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="table-crypto-title">
                            <img src={LTC} />
                            <h6>لایت کوین</h6>
                            <span>LTC</span>
                          </div>
                        </td>
                        <td className="text-center">
                          <span className="d-inline-block d-ltr">
                            $17,232.32
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="fs-md">430,807.5 تومان</span>
                        </td>
                        <td className="text-center">
                          <div className="table-crypto-changes">
                            <span className="text-danger fw-medium d-inline-block d-ltr">
                              -2.3%
                            </span>
                            <img src={graphR} />
                          </div>
                        </td>
                        <td className="text-start">
                          <div className="table-crypto-actions">
                            <a href="#" className="btn btn-outline-primary">
                              معامله
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="table-crypto-title">
                            <img src={shib} />
                            <h6>شیبا</h6>
                            <span>SHIB</span>
                          </div>
                        </td>
                        <td className="text-center">
                          <span className="d-inline-block d-ltr">
                            $17,232.32
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="fs-md">430,807.5 تومان</span>
                        </td>
                        <td className="text-center">
                          <div className="table-crypto-changes">
                            <span className="text-success fw-medium d-inline-block d-ltr">
                              +2.5%
                            </span>
                            <img src={graphG} />
                          </div>
                        </td>
                        <td className="text-start">
                          <div className="table-crypto-actions">
                            <a href="#" className="btn btn-outline-primary">
                              معامله
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="table-crypto-title">
                            <img src={ETH} />
                            <h6>اتریوم</h6>
                            <span>ETH</span>
                          </div>
                        </td>
                        <td className="text-center">
                          <span className="d-inline-block d-ltr">
                            $17,232.32
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="fs-md">430,807.5 تومان</span>
                        </td>
                        <td className="text-center">
                          <div className="table-crypto-changes">
                            <span className="text-danger fw-medium d-inline-block d-ltr">
                              -2.3%
                            </span>
                            <img src={graphR} />
                          </div>
                        </td>
                        <td className="text-start">
                          <div className="table-crypto-actions">
                            <a href="#" className="btn btn-outline-primary">
                              معامله
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="table-crypto-title">
                            <img src={ADA} />
                            <h6>کاردانو</h6>
                            <span>ADA</span>
                          </div>
                        </td>
                        <td className="text-center">
                          <span className="d-inline-block d-ltr">
                            $17,232.32
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="fs-md">430,807.5 تومان</span>
                        </td>
                        <td className="text-center">
                          <div className="table-crypto-changes">
                            <span className="text-danger fw-medium d-inline-block d-ltr">
                              -2.3%
                            </span>
                            <img src={graphR} />
                          </div>
                        </td>
                        <td className="text-start">
                          <div className="table-crypto-actions">
                            <a href="#" className="btn btn-outline-primary">
                              معامله
                            </a>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="section-more">
              <a href="#">
                دیدن همه
                <span className="icon">
                  <svg
                    width="8"
                    height="12"
                    viewBox="0 0 8 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.41 10.59L2.83 6L7.41 1.41L6 0L0 6L6 12L7.41 10.59Z"
                      fill="#3360FC"
                    ></path>
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </section>

        <section className="landing-features">
          <div className="section-title">
            <h3 className="section-title__title">
              مزایای استفاده از
              <span className="text-primary">آرسونیکس</span>
            </h3>
          </div>
          <section className="landing-features__wrapper">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div className="feature">
                    <div className="feature-img">
                      <img src={feature003} />
                    </div>
                    <div className="feature-body">
                      <h3 className="feature-title">پشتیبانی آنلاین</h3>
                      <p className="feature-text">
                        پشتیبانی آرسونیکس به تمام مشکلات شما در ۲۴ ساعت شبانه
                        روز از طریق تیکت، چت آنلاین یا تماس تلفنی کمک
                        می&zwnj;کند.{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="feature">
                    <div className="feature-img">
                      <img src={feature004} />
                    </div>
                    <div className="feature-body">
                      <h3 className="feature-title">کارمزد منصفانه</h3>
                      <p className="feature-text">
                        ما به شما تضمین کمترین کارمزد را در بین تمامی
                        صرافی&zwnj;های داخل و خارج ایران می&zwnj;دهیم.{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="feature">
                    <div className="feature-img">
                      <img src={feature001} />
                    </div>
                    <div className="feature-body">
                      <h3 className="feature-title">
                        خرید و فروش سریع و تک نرخی
                      </h3>
                      <p className="feature-text">
                        در آرسونیکس تمام ارزها یک نرخ دارند، با یک نرخ
                        می&zwnj;فروشید و با همان نرخ می&zwnj;توانید بخرید؛ در
                        سریع&zwnj;ترین زمان ممکن.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="feature">
                    <div className="feature-img">
                      <img src={feature002} />
                    </div>
                    <div className="feature-body">
                      <h3 className="feature-title">امنیت</h3>
                      <p className="feature-text">
                        اطلاعات و دارایی&zwnj;های شما در امن&zwnj;ترین حالت ممکن
                        نگهداری می&zwnj;شوند و هیچ ارگان و دولتی به آن&zwnj;ها
                        دسترسی نخواهد داشت.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="landing-features__slide">
            <div className="features-slider">
              <div className="row g-4">
                <div className="col-lg-6">
                  <div className="feature-slide feature-slide--blue">
                    <div className="feature-slide-caption">
                      <h4 className="feature-slide-title">
                        بدون تحریم، ریال به دلار یا لیر تبدیل کن
                      </h4>
                      <h5 className="feature-slide-subtitle">
                        در حساب بانکی بین المللی خودت دریافت کن!
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="feature-slide feature-slide--darkblue">
                    <div className="feature-slide-caption">
                      <h4 className="feature-slide-title">چرا دلار کاغذی؟</h4>
                      <h5 className="feature-slide-subtitle">
                        با بهترین نرخ بازار سرمایه خودت آنلاین حفظ کن!
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="landing-features__banner">
            <div className="container">
              <div className="feature-banner">
                <p>سادگی، با آرسونیکس معنای تازه&zwnj;ای پیدا کرده...</p>
                <img src={dashboard} />
              </div>
            </div>
          </section>
        </section>

        <section className="landing-comments">
          <div className="container">
            <div className="section-title">
              <h3 className="section-title__title">
                نظرات
                <span className="text-primary">کاربران</span>
              </h3>
            </div>
            <div className="comments-slider">
              <Slider {...commentSettings}>
                <div>
                  <div>
                    <div className="comment">
                      <div className="comment-header">
                        <div className="comment-user">
                          <img src={face003} className="avatar" />
                          <h6 className="comment-username">سارا محمدی</h6>
                        </div>
                      </div>
                      <div className="comment-body">
                        <p className="comment-text">
                          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                          چاپ، و با استفاده از طراحان گرافیک است
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div>
                    <div className="comment">
                      <div className="comment-header">
                        <div className="comment-user">
                          <img src={face003} className="avatar" />
                          <h6 className="comment-username">سارا محمدی</h6>
                        </div>
                      </div>
                      <div className="comment-body">
                        <p className="comment-text">
                          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                          چاپ، و با استفاده از طراحان گرافیک است
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div>
                    <div className="comment">
                      <div className="comment-header">
                        <div className="comment-user">
                          <img src={face002} className="avatar" />
                          <h6 className="comment-username">سارا محمدی</h6>
                        </div>
                      </div>
                      <div className="comment-body">
                        <p className="comment-text">
                          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                          چاپ، و با استفاده از طراحان گرافیک است
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </section>

        <section className="landing-articles">
          <div className="container">
            <div className="section-title">
              <h3 className="section-title__title">
                آخرین
                <span className="text-primary">مطالب</span>
              </h3>
            </div>
            <div className="articles-slider">
              <Slider {...blogSettings}>
                <div className="slide-item">
                  <article className="article">
                    <div className="article-header">
                      <span className="icon">
                        <svg
                          width="25"
                          height="28"
                          viewBox="0 0 25 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16.9544 20.6309H7.32776C6.77576 20.6309 6.32776 20.1829 6.32776 19.6309C6.32776 19.0789 6.77576 18.6309 7.32776 18.6309H16.9544C17.5064 18.6309 17.9544 19.0789 17.9544 19.6309C17.9544 20.1829 17.5064 20.6309 16.9544 20.6309Z"
                            fill="#335FFC"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16.9544 15.0488H7.32776C6.77576 15.0488 6.32776 14.6008 6.32776 14.0488C6.32776 13.4968 6.77576 13.0488 7.32776 13.0488H16.9544C17.5064 13.0488 17.9544 13.4968 17.9544 14.0488C17.9544 14.6008 17.5064 15.0488 16.9544 15.0488Z"
                            fill="#335FFC"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M11.0006 9.48047H7.32727C6.77527 9.48047 6.32727 9.03247 6.32727 8.48047C6.32727 7.92847 6.77527 7.48047 7.32727 7.48047H11.0006C11.5526 7.48047 12.0006 7.92847 12.0006 8.48047C12.0006 9.03247 11.5526 9.48047 11.0006 9.48047Z"
                            fill="#335FFC"
                          ></path>
                          <mask
                            id="mask0_626_194"
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="25"
                            height="28"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M0 0.666016H24.2196V27.2124H0V0.666016Z"
                              fill="white"
                            ></path>
                          </mask>
                          <g mask="url(#mask0_626_194)">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M17.2116 2.66602L6.95963 2.67135C3.85563 2.69002 1.99963 4.61002 1.99963 7.80868V20.07C1.99963 23.29 3.87297 25.2127 7.00763 25.2127L17.2596 25.2087C20.3636 25.19 22.2196 23.2673 22.2196 20.07V7.80868C22.2196 4.58868 20.3476 2.66602 17.2116 2.66602ZM7.00897 27.2127C2.81697 27.2127 -0.000366211 24.342 -0.000366211 20.07V7.80868C-0.000366211 3.49802 2.72897 0.696682 6.95297 0.671349L17.2103 0.666016H17.2116C21.4036 0.666016 24.2196 3.53668 24.2196 7.80868V20.07C24.2196 24.3794 21.4903 27.182 17.2663 27.2087L7.00897 27.2127Z"
                              fill="#335FFC"
                            ></path>
                          </g>
                        </svg>
                      </span>
                      <h3 className="article-title">
                        <a href="#">عنوان وبلاگ</a>
                      </h3>
                      <span className="article-date">1400/02/02</span>
                    </div>
                    <div className="article-body">
                      <p className="article-text">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون
                        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است،
                      </p>
                    </div>
                    <div className="article-footer">
                      <a href="#" className="article-more">
                        خواندن
                      </a>
                    </div>
                  </article>
                </div>
                <div className="slide-item">
                  <article className="article">
                    <div className="article-header">
                      <span className="icon">
                        <svg
                          width="25"
                          height="28"
                          viewBox="0 0 25 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16.9544 20.6309H7.32776C6.77576 20.6309 6.32776 20.1829 6.32776 19.6309C6.32776 19.0789 6.77576 18.6309 7.32776 18.6309H16.9544C17.5064 18.6309 17.9544 19.0789 17.9544 19.6309C17.9544 20.1829 17.5064 20.6309 16.9544 20.6309Z"
                            fill="#335FFC"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16.9544 15.0488H7.32776C6.77576 15.0488 6.32776 14.6008 6.32776 14.0488C6.32776 13.4968 6.77576 13.0488 7.32776 13.0488H16.9544C17.5064 13.0488 17.9544 13.4968 17.9544 14.0488C17.9544 14.6008 17.5064 15.0488 16.9544 15.0488Z"
                            fill="#335FFC"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M11.0006 9.48047H7.32727C6.77527 9.48047 6.32727 9.03247 6.32727 8.48047C6.32727 7.92847 6.77527 7.48047 7.32727 7.48047H11.0006C11.5526 7.48047 12.0006 7.92847 12.0006 8.48047C12.0006 9.03247 11.5526 9.48047 11.0006 9.48047Z"
                            fill="#335FFC"
                          ></path>
                          <mask
                            id="mask0_626_194"
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="25"
                            height="28"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M0 0.666016H24.2196V27.2124H0V0.666016Z"
                              fill="white"
                            ></path>
                          </mask>
                          <g mask="url(#mask0_626_194)">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M17.2116 2.66602L6.95963 2.67135C3.85563 2.69002 1.99963 4.61002 1.99963 7.80868V20.07C1.99963 23.29 3.87297 25.2127 7.00763 25.2127L17.2596 25.2087C20.3636 25.19 22.2196 23.2673 22.2196 20.07V7.80868C22.2196 4.58868 20.3476 2.66602 17.2116 2.66602ZM7.00897 27.2127C2.81697 27.2127 -0.000366211 24.342 -0.000366211 20.07V7.80868C-0.000366211 3.49802 2.72897 0.696682 6.95297 0.671349L17.2103 0.666016H17.2116C21.4036 0.666016 24.2196 3.53668 24.2196 7.80868V20.07C24.2196 24.3794 21.4903 27.182 17.2663 27.2087L7.00897 27.2127Z"
                              fill="#335FFC"
                            ></path>
                          </g>
                        </svg>
                      </span>
                      <h3 className="article-title">
                        <a href="#">عنوان وبلاگ</a>
                      </h3>
                      <span className="article-date">1400/02/02</span>
                    </div>
                    <div className="article-body">
                      <p className="article-text">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون
                        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است،
                      </p>
                    </div>
                    <div className="article-footer">
                      <a href="#" className="article-more">
                        خواندن
                      </a>
                    </div>
                  </article>
                </div>
                <div className="slide-item">
                  <article className="article">
                    <div className="article-header">
                      <span className="icon">
                        <svg
                          width="25"
                          height="28"
                          viewBox="0 0 25 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16.9544 20.6309H7.32776C6.77576 20.6309 6.32776 20.1829 6.32776 19.6309C6.32776 19.0789 6.77576 18.6309 7.32776 18.6309H16.9544C17.5064 18.6309 17.9544 19.0789 17.9544 19.6309C17.9544 20.1829 17.5064 20.6309 16.9544 20.6309Z"
                            fill="#335FFC"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16.9544 15.0488H7.32776C6.77576 15.0488 6.32776 14.6008 6.32776 14.0488C6.32776 13.4968 6.77576 13.0488 7.32776 13.0488H16.9544C17.5064 13.0488 17.9544 13.4968 17.9544 14.0488C17.9544 14.6008 17.5064 15.0488 16.9544 15.0488Z"
                            fill="#335FFC"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M11.0006 9.48047H7.32727C6.77527 9.48047 6.32727 9.03247 6.32727 8.48047C6.32727 7.92847 6.77527 7.48047 7.32727 7.48047H11.0006C11.5526 7.48047 12.0006 7.92847 12.0006 8.48047C12.0006 9.03247 11.5526 9.48047 11.0006 9.48047Z"
                            fill="#335FFC"
                          ></path>
                          <mask
                            id="mask0_626_194"
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="25"
                            height="28"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M0 0.666016H24.2196V27.2124H0V0.666016Z"
                              fill="white"
                            ></path>
                          </mask>
                          <g mask="url(#mask0_626_194)">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M17.2116 2.66602L6.95963 2.67135C3.85563 2.69002 1.99963 4.61002 1.99963 7.80868V20.07C1.99963 23.29 3.87297 25.2127 7.00763 25.2127L17.2596 25.2087C20.3636 25.19 22.2196 23.2673 22.2196 20.07V7.80868C22.2196 4.58868 20.3476 2.66602 17.2116 2.66602ZM7.00897 27.2127C2.81697 27.2127 -0.000366211 24.342 -0.000366211 20.07V7.80868C-0.000366211 3.49802 2.72897 0.696682 6.95297 0.671349L17.2103 0.666016H17.2116C21.4036 0.666016 24.2196 3.53668 24.2196 7.80868V20.07C24.2196 24.3794 21.4903 27.182 17.2663 27.2087L7.00897 27.2127Z"
                              fill="#335FFC"
                            ></path>
                          </g>
                        </svg>
                      </span>
                      <h3 className="article-title">
                        <a href="#">عنوان وبلاگ</a>
                      </h3>
                      <span className="article-date">1400/02/02</span>
                    </div>
                    <div className="article-body">
                      <p className="article-text">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون
                        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است،
                      </p>
                    </div>
                    <div className="article-footer">
                      <a href="#" className="article-more">
                        خواندن
                      </a>
                    </div>
                  </article>
                </div>
                <div className="slide-item">
                  <article className="article">
                    <div className="article-header">
                      <span className="icon">
                        <svg
                          width="25"
                          height="28"
                          viewBox="0 0 25 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16.9544 20.6309H7.32776C6.77576 20.6309 6.32776 20.1829 6.32776 19.6309C6.32776 19.0789 6.77576 18.6309 7.32776 18.6309H16.9544C17.5064 18.6309 17.9544 19.0789 17.9544 19.6309C17.9544 20.1829 17.5064 20.6309 16.9544 20.6309Z"
                            fill="#335FFC"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16.9544 15.0488H7.32776C6.77576 15.0488 6.32776 14.6008 6.32776 14.0488C6.32776 13.4968 6.77576 13.0488 7.32776 13.0488H16.9544C17.5064 13.0488 17.9544 13.4968 17.9544 14.0488C17.9544 14.6008 17.5064 15.0488 16.9544 15.0488Z"
                            fill="#335FFC"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M11.0006 9.48047H7.32727C6.77527 9.48047 6.32727 9.03247 6.32727 8.48047C6.32727 7.92847 6.77527 7.48047 7.32727 7.48047H11.0006C11.5526 7.48047 12.0006 7.92847 12.0006 8.48047C12.0006 9.03247 11.5526 9.48047 11.0006 9.48047Z"
                            fill="#335FFC"
                          ></path>
                          <mask
                            id="mask0_626_194"
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="25"
                            height="28"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M0 0.666016H24.2196V27.2124H0V0.666016Z"
                              fill="white"
                            ></path>
                          </mask>
                          <g mask="url(#mask0_626_194)">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M17.2116 2.66602L6.95963 2.67135C3.85563 2.69002 1.99963 4.61002 1.99963 7.80868V20.07C1.99963 23.29 3.87297 25.2127 7.00763 25.2127L17.2596 25.2087C20.3636 25.19 22.2196 23.2673 22.2196 20.07V7.80868C22.2196 4.58868 20.3476 2.66602 17.2116 2.66602ZM7.00897 27.2127C2.81697 27.2127 -0.000366211 24.342 -0.000366211 20.07V7.80868C-0.000366211 3.49802 2.72897 0.696682 6.95297 0.671349L17.2103 0.666016H17.2116C21.4036 0.666016 24.2196 3.53668 24.2196 7.80868V20.07C24.2196 24.3794 21.4903 27.182 17.2663 27.2087L7.00897 27.2127Z"
                              fill="#335FFC"
                            ></path>
                          </g>
                        </svg>
                      </span>
                      <h3 className="article-title">
                        <a href="#">عنوان وبلاگ</a>
                      </h3>
                      <span className="article-date">1400/02/02</span>
                    </div>
                    <div className="article-body">
                      <p className="article-text">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون
                        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است،
                      </p>
                    </div>
                    <div className="article-footer">
                      <a href="#" className="article-more">
                        خواندن
                      </a>
                    </div>
                  </article>
                </div>
                <div className="slide-item">
                  <article className="article">
                    <div className="article-header">
                      <span className="icon">
                        <svg
                          width="25"
                          height="28"
                          viewBox="0 0 25 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16.9544 20.6309H7.32776C6.77576 20.6309 6.32776 20.1829 6.32776 19.6309C6.32776 19.0789 6.77576 18.6309 7.32776 18.6309H16.9544C17.5064 18.6309 17.9544 19.0789 17.9544 19.6309C17.9544 20.1829 17.5064 20.6309 16.9544 20.6309Z"
                            fill="#335FFC"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16.9544 15.0488H7.32776C6.77576 15.0488 6.32776 14.6008 6.32776 14.0488C6.32776 13.4968 6.77576 13.0488 7.32776 13.0488H16.9544C17.5064 13.0488 17.9544 13.4968 17.9544 14.0488C17.9544 14.6008 17.5064 15.0488 16.9544 15.0488Z"
                            fill="#335FFC"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M11.0006 9.48047H7.32727C6.77527 9.48047 6.32727 9.03247 6.32727 8.48047C6.32727 7.92847 6.77527 7.48047 7.32727 7.48047H11.0006C11.5526 7.48047 12.0006 7.92847 12.0006 8.48047C12.0006 9.03247 11.5526 9.48047 11.0006 9.48047Z"
                            fill="#335FFC"
                          ></path>
                          <mask
                            id="mask0_626_194"
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="25"
                            height="28"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M0 0.666016H24.2196V27.2124H0V0.666016Z"
                              fill="white"
                            ></path>
                          </mask>
                          <g mask="url(#mask0_626_194)">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M17.2116 2.66602L6.95963 2.67135C3.85563 2.69002 1.99963 4.61002 1.99963 7.80868V20.07C1.99963 23.29 3.87297 25.2127 7.00763 25.2127L17.2596 25.2087C20.3636 25.19 22.2196 23.2673 22.2196 20.07V7.80868C22.2196 4.58868 20.3476 2.66602 17.2116 2.66602ZM7.00897 27.2127C2.81697 27.2127 -0.000366211 24.342 -0.000366211 20.07V7.80868C-0.000366211 3.49802 2.72897 0.696682 6.95297 0.671349L17.2103 0.666016H17.2116C21.4036 0.666016 24.2196 3.53668 24.2196 7.80868V20.07C24.2196 24.3794 21.4903 27.182 17.2663 27.2087L7.00897 27.2127Z"
                              fill="#335FFC"
                            ></path>
                          </g>
                        </svg>
                      </span>
                      <h3 className="article-title">
                        <a href="#">عنوان وبلاگ</a>
                      </h3>
                      <span className="article-date">1400/02/02</span>
                    </div>
                    <div className="article-body">
                      <p className="article-text">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون
                        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است،
                      </p>
                    </div>
                    <div className="article-footer">
                      <a href="#" className="article-more">
                        خواندن
                      </a>
                    </div>
                  </article>
                </div>
                <div className="slide-item">
                  <article className="article">
                    <div className="article-header">
                      <span className="icon">
                        <svg
                          width="25"
                          height="28"
                          viewBox="0 0 25 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16.9544 20.6309H7.32776C6.77576 20.6309 6.32776 20.1829 6.32776 19.6309C6.32776 19.0789 6.77576 18.6309 7.32776 18.6309H16.9544C17.5064 18.6309 17.9544 19.0789 17.9544 19.6309C17.9544 20.1829 17.5064 20.6309 16.9544 20.6309Z"
                            fill="#335FFC"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16.9544 15.0488H7.32776C6.77576 15.0488 6.32776 14.6008 6.32776 14.0488C6.32776 13.4968 6.77576 13.0488 7.32776 13.0488H16.9544C17.5064 13.0488 17.9544 13.4968 17.9544 14.0488C17.9544 14.6008 17.5064 15.0488 16.9544 15.0488Z"
                            fill="#335FFC"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M11.0006 9.48047H7.32727C6.77527 9.48047 6.32727 9.03247 6.32727 8.48047C6.32727 7.92847 6.77527 7.48047 7.32727 7.48047H11.0006C11.5526 7.48047 12.0006 7.92847 12.0006 8.48047C12.0006 9.03247 11.5526 9.48047 11.0006 9.48047Z"
                            fill="#335FFC"
                          ></path>
                          <mask
                            id="mask0_626_194"
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="25"
                            height="28"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M0 0.666016H24.2196V27.2124H0V0.666016Z"
                              fill="white"
                            ></path>
                          </mask>
                          <g mask="url(#mask0_626_194)">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M17.2116 2.66602L6.95963 2.67135C3.85563 2.69002 1.99963 4.61002 1.99963 7.80868V20.07C1.99963 23.29 3.87297 25.2127 7.00763 25.2127L17.2596 25.2087C20.3636 25.19 22.2196 23.2673 22.2196 20.07V7.80868C22.2196 4.58868 20.3476 2.66602 17.2116 2.66602ZM7.00897 27.2127C2.81697 27.2127 -0.000366211 24.342 -0.000366211 20.07V7.80868C-0.000366211 3.49802 2.72897 0.696682 6.95297 0.671349L17.2103 0.666016H17.2116C21.4036 0.666016 24.2196 3.53668 24.2196 7.80868V20.07C24.2196 24.3794 21.4903 27.182 17.2663 27.2087L7.00897 27.2127Z"
                              fill="#335FFC"
                            ></path>
                          </g>
                        </svg>
                      </span>
                      <h3 className="article-title">
                        <a href="#">عنوان وبلاگ</a>
                      </h3>
                      <span className="article-date">1400/02/02</span>
                    </div>
                    <div className="article-body">
                      <p className="article-text">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون
                        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است،
                      </p>
                    </div>
                    <div className="article-footer">
                      <a href="#" className="article-more">
                        خواندن
                      </a>
                    </div>
                  </article>
                </div>
                <div className="slide-item">
                  <article className="article">
                    <div className="article-header">
                      <span className="icon">
                        <svg
                          width="25"
                          height="28"
                          viewBox="0 0 25 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16.9544 20.6309H7.32776C6.77576 20.6309 6.32776 20.1829 6.32776 19.6309C6.32776 19.0789 6.77576 18.6309 7.32776 18.6309H16.9544C17.5064 18.6309 17.9544 19.0789 17.9544 19.6309C17.9544 20.1829 17.5064 20.6309 16.9544 20.6309Z"
                            fill="#335FFC"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16.9544 15.0488H7.32776C6.77576 15.0488 6.32776 14.6008 6.32776 14.0488C6.32776 13.4968 6.77576 13.0488 7.32776 13.0488H16.9544C17.5064 13.0488 17.9544 13.4968 17.9544 14.0488C17.9544 14.6008 17.5064 15.0488 16.9544 15.0488Z"
                            fill="#335FFC"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M11.0006 9.48047H7.32727C6.77527 9.48047 6.32727 9.03247 6.32727 8.48047C6.32727 7.92847 6.77527 7.48047 7.32727 7.48047H11.0006C11.5526 7.48047 12.0006 7.92847 12.0006 8.48047C12.0006 9.03247 11.5526 9.48047 11.0006 9.48047Z"
                            fill="#335FFC"
                          ></path>
                          <mask
                            id="mask0_626_194"
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="25"
                            height="28"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M0 0.666016H24.2196V27.2124H0V0.666016Z"
                              fill="white"
                            ></path>
                          </mask>
                          <g mask="url(#mask0_626_194)">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M17.2116 2.66602L6.95963 2.67135C3.85563 2.69002 1.99963 4.61002 1.99963 7.80868V20.07C1.99963 23.29 3.87297 25.2127 7.00763 25.2127L17.2596 25.2087C20.3636 25.19 22.2196 23.2673 22.2196 20.07V7.80868C22.2196 4.58868 20.3476 2.66602 17.2116 2.66602ZM7.00897 27.2127C2.81697 27.2127 -0.000366211 24.342 -0.000366211 20.07V7.80868C-0.000366211 3.49802 2.72897 0.696682 6.95297 0.671349L17.2103 0.666016H17.2116C21.4036 0.666016 24.2196 3.53668 24.2196 7.80868V20.07C24.2196 24.3794 21.4903 27.182 17.2663 27.2087L7.00897 27.2127Z"
                              fill="#335FFC"
                            ></path>
                          </g>
                        </svg>
                      </span>
                      <h3 className="article-title">
                        <a href="#">عنوان وبلاگ</a>
                      </h3>
                      <span className="article-date">1400/02/02</span>
                    </div>
                    <div className="article-body">
                      <p className="article-text">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون
                        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است،
                      </p>
                    </div>
                    <div className="article-footer">
                      <a href="#" className="article-more">
                        خواندن
                      </a>
                    </div>
                  </article>
                </div>
                <div className="slide-item">
                  <article className="article">
                    <div className="article-header">
                      <span className="icon">
                        <svg
                          width="25"
                          height="28"
                          viewBox="0 0 25 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16.9544 20.6309H7.32776C6.77576 20.6309 6.32776 20.1829 6.32776 19.6309C6.32776 19.0789 6.77576 18.6309 7.32776 18.6309H16.9544C17.5064 18.6309 17.9544 19.0789 17.9544 19.6309C17.9544 20.1829 17.5064 20.6309 16.9544 20.6309Z"
                            fill="#335FFC"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16.9544 15.0488H7.32776C6.77576 15.0488 6.32776 14.6008 6.32776 14.0488C6.32776 13.4968 6.77576 13.0488 7.32776 13.0488H16.9544C17.5064 13.0488 17.9544 13.4968 17.9544 14.0488C17.9544 14.6008 17.5064 15.0488 16.9544 15.0488Z"
                            fill="#335FFC"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M11.0006 9.48047H7.32727C6.77527 9.48047 6.32727 9.03247 6.32727 8.48047C6.32727 7.92847 6.77527 7.48047 7.32727 7.48047H11.0006C11.5526 7.48047 12.0006 7.92847 12.0006 8.48047C12.0006 9.03247 11.5526 9.48047 11.0006 9.48047Z"
                            fill="#335FFC"
                          ></path>
                          <mask
                            id="mask0_626_194"
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="25"
                            height="28"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M0 0.666016H24.2196V27.2124H0V0.666016Z"
                              fill="white"
                            ></path>
                          </mask>
                          <g mask="url(#mask0_626_194)">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M17.2116 2.66602L6.95963 2.67135C3.85563 2.69002 1.99963 4.61002 1.99963 7.80868V20.07C1.99963 23.29 3.87297 25.2127 7.00763 25.2127L17.2596 25.2087C20.3636 25.19 22.2196 23.2673 22.2196 20.07V7.80868C22.2196 4.58868 20.3476 2.66602 17.2116 2.66602ZM7.00897 27.2127C2.81697 27.2127 -0.000366211 24.342 -0.000366211 20.07V7.80868C-0.000366211 3.49802 2.72897 0.696682 6.95297 0.671349L17.2103 0.666016H17.2116C21.4036 0.666016 24.2196 3.53668 24.2196 7.80868V20.07C24.2196 24.3794 21.4903 27.182 17.2663 27.2087L7.00897 27.2127Z"
                              fill="#335FFC"
                            ></path>
                          </g>
                        </svg>
                      </span>
                      <h3 className="article-title">
                        <a href="#">عنوان وبلاگ</a>
                      </h3>
                      <span className="article-date">1400/02/02</span>
                    </div>
                    <div className="article-body">
                      <p className="article-text">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون
                        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است،
                      </p>
                    </div>
                    <div className="article-footer">
                      <a href="#" className="article-more">
                        خواندن
                      </a>
                    </div>
                  </article>
                </div>
                <div className="slide-item">
                  <article className="article">
                    <div className="article-header">
                      <span className="icon">
                        <svg
                          width="25"
                          height="28"
                          viewBox="0 0 25 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16.9544 20.6309H7.32776C6.77576 20.6309 6.32776 20.1829 6.32776 19.6309C6.32776 19.0789 6.77576 18.6309 7.32776 18.6309H16.9544C17.5064 18.6309 17.9544 19.0789 17.9544 19.6309C17.9544 20.1829 17.5064 20.6309 16.9544 20.6309Z"
                            fill="#335FFC"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16.9544 15.0488H7.32776C6.77576 15.0488 6.32776 14.6008 6.32776 14.0488C6.32776 13.4968 6.77576 13.0488 7.32776 13.0488H16.9544C17.5064 13.0488 17.9544 13.4968 17.9544 14.0488C17.9544 14.6008 17.5064 15.0488 16.9544 15.0488Z"
                            fill="#335FFC"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M11.0006 9.48047H7.32727C6.77527 9.48047 6.32727 9.03247 6.32727 8.48047C6.32727 7.92847 6.77527 7.48047 7.32727 7.48047H11.0006C11.5526 7.48047 12.0006 7.92847 12.0006 8.48047C12.0006 9.03247 11.5526 9.48047 11.0006 9.48047Z"
                            fill="#335FFC"
                          ></path>
                          <mask
                            id="mask0_626_194"
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="25"
                            height="28"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M0 0.666016H24.2196V27.2124H0V0.666016Z"
                              fill="white"
                            ></path>
                          </mask>
                          <g mask="url(#mask0_626_194)">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M17.2116 2.66602L6.95963 2.67135C3.85563 2.69002 1.99963 4.61002 1.99963 7.80868V20.07C1.99963 23.29 3.87297 25.2127 7.00763 25.2127L17.2596 25.2087C20.3636 25.19 22.2196 23.2673 22.2196 20.07V7.80868C22.2196 4.58868 20.3476 2.66602 17.2116 2.66602ZM7.00897 27.2127C2.81697 27.2127 -0.000366211 24.342 -0.000366211 20.07V7.80868C-0.000366211 3.49802 2.72897 0.696682 6.95297 0.671349L17.2103 0.666016H17.2116C21.4036 0.666016 24.2196 3.53668 24.2196 7.80868V20.07C24.2196 24.3794 21.4903 27.182 17.2663 27.2087L7.00897 27.2127Z"
                              fill="#335FFC"
                            ></path>
                          </g>
                        </svg>
                      </span>
                      <h3 className="article-title">
                        <a href="#">عنوان وبلاگ</a>
                      </h3>
                      <span className="article-date">1400/02/02</span>
                    </div>
                    <div className="article-body">
                      <p className="article-text">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون
                        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است،
                      </p>
                    </div>
                    <div className="article-footer">
                      <a href="#" className="article-more">
                        خواندن
                      </a>
                    </div>
                  </article>
                </div>
                <div className="slide-item">
                  <article className="article">
                    <div className="article-header">
                      <span className="icon">
                        <svg
                          width="25"
                          height="28"
                          viewBox="0 0 25 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16.9544 20.6309H7.32776C6.77576 20.6309 6.32776 20.1829 6.32776 19.6309C6.32776 19.0789 6.77576 18.6309 7.32776 18.6309H16.9544C17.5064 18.6309 17.9544 19.0789 17.9544 19.6309C17.9544 20.1829 17.5064 20.6309 16.9544 20.6309Z"
                            fill="#335FFC"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16.9544 15.0488H7.32776C6.77576 15.0488 6.32776 14.6008 6.32776 14.0488C6.32776 13.4968 6.77576 13.0488 7.32776 13.0488H16.9544C17.5064 13.0488 17.9544 13.4968 17.9544 14.0488C17.9544 14.6008 17.5064 15.0488 16.9544 15.0488Z"
                            fill="#335FFC"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M11.0006 9.48047H7.32727C6.77527 9.48047 6.32727 9.03247 6.32727 8.48047C6.32727 7.92847 6.77527 7.48047 7.32727 7.48047H11.0006C11.5526 7.48047 12.0006 7.92847 12.0006 8.48047C12.0006 9.03247 11.5526 9.48047 11.0006 9.48047Z"
                            fill="#335FFC"
                          ></path>
                          <mask
                            id="mask0_626_194"
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="25"
                            height="28"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M0 0.666016H24.2196V27.2124H0V0.666016Z"
                              fill="white"
                            ></path>
                          </mask>
                          <g mask="url(#mask0_626_194)">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M17.2116 2.66602L6.95963 2.67135C3.85563 2.69002 1.99963 4.61002 1.99963 7.80868V20.07C1.99963 23.29 3.87297 25.2127 7.00763 25.2127L17.2596 25.2087C20.3636 25.19 22.2196 23.2673 22.2196 20.07V7.80868C22.2196 4.58868 20.3476 2.66602 17.2116 2.66602ZM7.00897 27.2127C2.81697 27.2127 -0.000366211 24.342 -0.000366211 20.07V7.80868C-0.000366211 3.49802 2.72897 0.696682 6.95297 0.671349L17.2103 0.666016H17.2116C21.4036 0.666016 24.2196 3.53668 24.2196 7.80868V20.07C24.2196 24.3794 21.4903 27.182 17.2663 27.2087L7.00897 27.2127Z"
                              fill="#335FFC"
                            ></path>
                          </g>
                        </svg>
                      </span>
                      <h3 className="article-title">
                        <a href="#">عنوان وبلاگ</a>
                      </h3>
                      <span className="article-date">1400/02/02</span>
                    </div>
                    <div className="article-body">
                      <p className="article-text">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون
                        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است،
                      </p>
                    </div>
                    <div className="article-footer">
                      <a href="#" className="article-more">
                        خواندن
                      </a>
                    </div>
                  </article>
                </div>
                <div className="slide-item">
                  <article className="article">
                    <div className="article-header">
                      <span className="icon">
                        <svg
                          width="25"
                          height="28"
                          viewBox="0 0 25 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16.9544 20.6309H7.32776C6.77576 20.6309 6.32776 20.1829 6.32776 19.6309C6.32776 19.0789 6.77576 18.6309 7.32776 18.6309H16.9544C17.5064 18.6309 17.9544 19.0789 17.9544 19.6309C17.9544 20.1829 17.5064 20.6309 16.9544 20.6309Z"
                            fill="#335FFC"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16.9544 15.0488H7.32776C6.77576 15.0488 6.32776 14.6008 6.32776 14.0488C6.32776 13.4968 6.77576 13.0488 7.32776 13.0488H16.9544C17.5064 13.0488 17.9544 13.4968 17.9544 14.0488C17.9544 14.6008 17.5064 15.0488 16.9544 15.0488Z"
                            fill="#335FFC"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M11.0006 9.48047H7.32727C6.77527 9.48047 6.32727 9.03247 6.32727 8.48047C6.32727 7.92847 6.77527 7.48047 7.32727 7.48047H11.0006C11.5526 7.48047 12.0006 7.92847 12.0006 8.48047C12.0006 9.03247 11.5526 9.48047 11.0006 9.48047Z"
                            fill="#335FFC"
                          ></path>
                          <mask
                            id="mask0_626_194"
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="25"
                            height="28"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M0 0.666016H24.2196V27.2124H0V0.666016Z"
                              fill="white"
                            ></path>
                          </mask>
                          <g mask="url(#mask0_626_194)">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M17.2116 2.66602L6.95963 2.67135C3.85563 2.69002 1.99963 4.61002 1.99963 7.80868V20.07C1.99963 23.29 3.87297 25.2127 7.00763 25.2127L17.2596 25.2087C20.3636 25.19 22.2196 23.2673 22.2196 20.07V7.80868C22.2196 4.58868 20.3476 2.66602 17.2116 2.66602ZM7.00897 27.2127C2.81697 27.2127 -0.000366211 24.342 -0.000366211 20.07V7.80868C-0.000366211 3.49802 2.72897 0.696682 6.95297 0.671349L17.2103 0.666016H17.2116C21.4036 0.666016 24.2196 3.53668 24.2196 7.80868V20.07C24.2196 24.3794 21.4903 27.182 17.2663 27.2087L7.00897 27.2127Z"
                              fill="#335FFC"
                            ></path>
                          </g>
                        </svg>
                      </span>
                      <h3 className="article-title">
                        <a href="#">عنوان وبلاگ</a>
                      </h3>
                      <span className="article-date">1400/02/02</span>
                    </div>
                    <div className="article-body">
                      <p className="article-text">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون
                        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است،
                      </p>
                    </div>
                    <div className="article-footer">
                      <a href="#" className="article-more">
                        خواندن
                      </a>
                    </div>
                  </article>
                </div>
                <div className="slide-item">
                  <article className="article">
                    <div className="article-header">
                      <span className="icon">
                        <svg
                          width="25"
                          height="28"
                          viewBox="0 0 25 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16.9544 20.6309H7.32776C6.77576 20.6309 6.32776 20.1829 6.32776 19.6309C6.32776 19.0789 6.77576 18.6309 7.32776 18.6309H16.9544C17.5064 18.6309 17.9544 19.0789 17.9544 19.6309C17.9544 20.1829 17.5064 20.6309 16.9544 20.6309Z"
                            fill="#335FFC"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16.9544 15.0488H7.32776C6.77576 15.0488 6.32776 14.6008 6.32776 14.0488C6.32776 13.4968 6.77576 13.0488 7.32776 13.0488H16.9544C17.5064 13.0488 17.9544 13.4968 17.9544 14.0488C17.9544 14.6008 17.5064 15.0488 16.9544 15.0488Z"
                            fill="#335FFC"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M11.0006 9.48047H7.32727C6.77527 9.48047 6.32727 9.03247 6.32727 8.48047C6.32727 7.92847 6.77527 7.48047 7.32727 7.48047H11.0006C11.5526 7.48047 12.0006 7.92847 12.0006 8.48047C12.0006 9.03247 11.5526 9.48047 11.0006 9.48047Z"
                            fill="#335FFC"
                          ></path>
                          <mask
                            id="mask0_626_194"
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="25"
                            height="28"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M0 0.666016H24.2196V27.2124H0V0.666016Z"
                              fill="white"
                            ></path>
                          </mask>
                          <g mask="url(#mask0_626_194)">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M17.2116 2.66602L6.95963 2.67135C3.85563 2.69002 1.99963 4.61002 1.99963 7.80868V20.07C1.99963 23.29 3.87297 25.2127 7.00763 25.2127L17.2596 25.2087C20.3636 25.19 22.2196 23.2673 22.2196 20.07V7.80868C22.2196 4.58868 20.3476 2.66602 17.2116 2.66602ZM7.00897 27.2127C2.81697 27.2127 -0.000366211 24.342 -0.000366211 20.07V7.80868C-0.000366211 3.49802 2.72897 0.696682 6.95297 0.671349L17.2103 0.666016H17.2116C21.4036 0.666016 24.2196 3.53668 24.2196 7.80868V20.07C24.2196 24.3794 21.4903 27.182 17.2663 27.2087L7.00897 27.2127Z"
                              fill="#335FFC"
                            ></path>
                          </g>
                        </svg>
                      </span>
                      <h3 className="article-title">
                        <a href="#">عنوان وبلاگ</a>
                      </h3>
                      <span className="article-date">1400/02/02</span>
                    </div>
                    <div className="article-body">
                      <p className="article-text">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون
                        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است،
                      </p>
                    </div>
                    <div className="article-footer">
                      <a href="#" className="article-more">
                        خواندن
                      </a>
                    </div>
                  </article>
                </div>
                <div className="slide-item">
                  <article className="article">
                    <div className="article-header">
                      <span className="icon">
                        <svg
                          width="25"
                          height="28"
                          viewBox="0 0 25 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16.9544 20.6309H7.32776C6.77576 20.6309 6.32776 20.1829 6.32776 19.6309C6.32776 19.0789 6.77576 18.6309 7.32776 18.6309H16.9544C17.5064 18.6309 17.9544 19.0789 17.9544 19.6309C17.9544 20.1829 17.5064 20.6309 16.9544 20.6309Z"
                            fill="#335FFC"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16.9544 15.0488H7.32776C6.77576 15.0488 6.32776 14.6008 6.32776 14.0488C6.32776 13.4968 6.77576 13.0488 7.32776 13.0488H16.9544C17.5064 13.0488 17.9544 13.4968 17.9544 14.0488C17.9544 14.6008 17.5064 15.0488 16.9544 15.0488Z"
                            fill="#335FFC"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M11.0006 9.48047H7.32727C6.77527 9.48047 6.32727 9.03247 6.32727 8.48047C6.32727 7.92847 6.77527 7.48047 7.32727 7.48047H11.0006C11.5526 7.48047 12.0006 7.92847 12.0006 8.48047C12.0006 9.03247 11.5526 9.48047 11.0006 9.48047Z"
                            fill="#335FFC"
                          ></path>
                          <mask
                            id="mask0_626_194"
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="25"
                            height="28"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M0 0.666016H24.2196V27.2124H0V0.666016Z"
                              fill="white"
                            ></path>
                          </mask>
                          <g mask="url(#mask0_626_194)">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M17.2116 2.66602L6.95963 2.67135C3.85563 2.69002 1.99963 4.61002 1.99963 7.80868V20.07C1.99963 23.29 3.87297 25.2127 7.00763 25.2127L17.2596 25.2087C20.3636 25.19 22.2196 23.2673 22.2196 20.07V7.80868C22.2196 4.58868 20.3476 2.66602 17.2116 2.66602ZM7.00897 27.2127C2.81697 27.2127 -0.000366211 24.342 -0.000366211 20.07V7.80868C-0.000366211 3.49802 2.72897 0.696682 6.95297 0.671349L17.2103 0.666016H17.2116C21.4036 0.666016 24.2196 3.53668 24.2196 7.80868V20.07C24.2196 24.3794 21.4903 27.182 17.2663 27.2087L7.00897 27.2127Z"
                              fill="#335FFC"
                            ></path>
                          </g>
                        </svg>
                      </span>
                      <h3 className="article-title">
                        <a href="#">عنوان وبلاگ</a>
                      </h3>
                      <span className="article-date">1400/02/02</span>
                    </div>
                    <div className="article-body">
                      <p className="article-text">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون
                        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است،
                      </p>
                    </div>
                    <div className="article-footer">
                      <a href="#" className="article-more">
                        خواندن
                      </a>
                    </div>
                  </article>
                </div>
                <div className="slide-item">
                  <article className="article">
                    <div className="article-header">
                      <span className="icon">
                        <svg
                          width="25"
                          height="28"
                          viewBox="0 0 25 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16.9544 20.6309H7.32776C6.77576 20.6309 6.32776 20.1829 6.32776 19.6309C6.32776 19.0789 6.77576 18.6309 7.32776 18.6309H16.9544C17.5064 18.6309 17.9544 19.0789 17.9544 19.6309C17.9544 20.1829 17.5064 20.6309 16.9544 20.6309Z"
                            fill="#335FFC"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16.9544 15.0488H7.32776C6.77576 15.0488 6.32776 14.6008 6.32776 14.0488C6.32776 13.4968 6.77576 13.0488 7.32776 13.0488H16.9544C17.5064 13.0488 17.9544 13.4968 17.9544 14.0488C17.9544 14.6008 17.5064 15.0488 16.9544 15.0488Z"
                            fill="#335FFC"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M11.0006 9.48047H7.32727C6.77527 9.48047 6.32727 9.03247 6.32727 8.48047C6.32727 7.92847 6.77527 7.48047 7.32727 7.48047H11.0006C11.5526 7.48047 12.0006 7.92847 12.0006 8.48047C12.0006 9.03247 11.5526 9.48047 11.0006 9.48047Z"
                            fill="#335FFC"
                          ></path>
                          <mask
                            id="mask0_626_194"
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="25"
                            height="28"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M0 0.666016H24.2196V27.2124H0V0.666016Z"
                              fill="white"
                            ></path>
                          </mask>
                          <g mask="url(#mask0_626_194)">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M17.2116 2.66602L6.95963 2.67135C3.85563 2.69002 1.99963 4.61002 1.99963 7.80868V20.07C1.99963 23.29 3.87297 25.2127 7.00763 25.2127L17.2596 25.2087C20.3636 25.19 22.2196 23.2673 22.2196 20.07V7.80868C22.2196 4.58868 20.3476 2.66602 17.2116 2.66602ZM7.00897 27.2127C2.81697 27.2127 -0.000366211 24.342 -0.000366211 20.07V7.80868C-0.000366211 3.49802 2.72897 0.696682 6.95297 0.671349L17.2103 0.666016H17.2116C21.4036 0.666016 24.2196 3.53668 24.2196 7.80868V20.07C24.2196 24.3794 21.4903 27.182 17.2663 27.2087L7.00897 27.2127Z"
                              fill="#335FFC"
                            ></path>
                          </g>
                        </svg>
                      </span>
                      <h3 className="article-title">
                        <a href="#">عنوان وبلاگ</a>
                      </h3>
                      <span className="article-date">1400/02/02</span>
                    </div>
                    <div className="article-body">
                      <p className="article-text">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون
                        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است،
                      </p>
                    </div>
                    <div className="article-footer">
                      <a href="#" className="article-more">
                        خواندن
                      </a>
                    </div>
                  </article>
                </div>
              </Slider>
              <div className="articles-slider-footer">
                <div>
                  <a href="#" className="btn-slider">
                    همه وبلاگ ها
                  </a>
                </div>
                <div className="articles-slider-navs">
                  <button
                    type="button"
                    role="presentation"
                    className="owl-prev"
                  >
                    <span className="icon">
                      <svg
                        width="56"
                        height="56"
                        viewBox="0 0 56 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="28"
                          cy="28"
                          r="27.25"
                          stroke="#335FFC"
                          stroke-opacity="0.1"
                          stroke-width="1.5"
                        ></circle>
                        <path
                          d="M30.6666 23L36 28L30.6666 33"
                          stroke="#335FFC"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M36 28L20 28"
                          stroke="#335FFC"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </span>
                  </button>
                  <button
                    type="button"
                    role="presentation"
                    className="owl-prev"
                  >
                    <span className="icon">
                      <svg
                        width="56"
                        height="56"
                        viewBox="0 0 56 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="28"
                          cy="28"
                          r="27.25"
                          stroke="#335FFC"
                          stroke-opacity="0.1"
                          stroke-width="1.5"
                        ></circle>
                        <path
                          d="M30.6666 23L36 28L30.6666 33"
                          stroke="#335FFC"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M36 28L20 28"
                          stroke="#335FFC"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </span>
                  </button>
                  <button
                    type="button"
                    role="presentation"
                    className="owl-next"
                  >
                    <span className="icon">
                      <svg
                        width="56"
                        height="56"
                        viewBox="0 0 56 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="28"
                          cy="28"
                          r="27.25"
                          transform="rotate(-180 28 28)"
                          stroke="#335FFC"
                          stroke-opacity="0.1"
                          stroke-width="1.5"
                        ></circle>
                        <path
                          d="M25.3333 33L19.9999 28L25.3333 23"
                          stroke="#335FFC"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M20 28L36 28"
                          stroke="#335FFC"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </span>
                  </button>
                  <button
                    type="button"
                    role="presentation"
                    className="owl-next"
                  >
                    <span className="icon">
                      <svg
                        width="56"
                        height="56"
                        viewBox="0 0 56 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="28"
                          cy="28"
                          r="27.25"
                          transform="rotate(-180 28 28)"
                          stroke="#335FFC"
                          stroke-opacity="0.1"
                          stroke-width="1.5"
                        ></circle>
                        <path
                          d="M25.3333 33L19.9999 28L25.3333 23"
                          stroke="#335FFC"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M20 28L36 28"
                          stroke="#335FFC"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-crypto-banner">
          <div className="container">
            <div className="crypto-banner">
              <h2 className="crypto-banner-title">
                هر جای دنیا هستی ریال برات تبدیل به ارز دلخواهت می&zwnj;کنیم
              </h2>
              <a href="#" className="btn btn-white">
                با آرسونیکس آسان شروع کن
              </a>
            </div>
          </div>
        </section>
      </main>
    </LandingLayout>
  );
}
