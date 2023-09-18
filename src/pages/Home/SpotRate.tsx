import { useEffect, useState } from "react";

//components
import { FilterNavCoin } from "components/FilterNavCoin";
import request from "services/adapter";

//images
import USDT from "assets/img/coins/USDT.png";
import lira from "assets/img/coins/lira.png";
import CAD from "assets/img/coins/CAD.svg";
import EUR from "assets/img/coins/Euro.png";
import GBP from "assets/img/coins/GBP.png";
import BTC from "assets/img/coins/BTC.png";
import ETH from "assets/img/coins/ETH.png";
import LTC from "assets/img/coins/LTC.png";
import shib from "assets/img/coins/SHIB.png";
import ADA from "assets/img/coins/ADA.png";
import graphG from "assets/img/graph-g.png";
import graphR from "assets/img/graph-r.png";

interface ExchangeRateData {
  expiresAt: string;
  pair: string;
  rate: string;
}

const SpotRate = () => {
  const [exchangeRates, setExchangeRates] = useState<{
    [key: string]: { IRR: number | string; USD: number | string };
  }>({});
  const [activeTab, setActiveTab] = useState("tab1");

  const currencyPairs = [
    { code: "USDT", name: "تتر", imgSrc: USDT },
    { code: "EUR", name: "یورو", imgSrc: EUR },
    { code: "CAD", name: "دلار کانادا", imgSrc: CAD },
    { code: "GBP", name: "پوند", imgSrc: GBP },
    { code: "TRY", name: "لیر", imgSrc: lira },
    // Add more currency pairs as needed
  ];

  useEffect(() => {
    const fetchExchangeRates = async () => {
      const rates: {
        [key: string]: { IRR: number | string; USD: number | string };
      } = {};

      for (const currencyPair of currencyPairs) {
        try {
          const response1 = await request.get<ExchangeRateData>(
            `rates/${currencyPair.code}-IRR`
          );
          const response2 = await request.get<ExchangeRateData>(
            `rates/${currencyPair.code}-USD`
          );
          const data1 = response1.data;
          const data2 = response2.data;
          rates[currencyPair.code] = { IRR: data1.rate, USD: data2.rate };
        } catch (error: any) {
          console.error(`Error fetching ${currencyPair}: ${error.message}`);
          rates[currencyPair.code] = { IRR: "-", USD: "-" };
        }
      }

      setExchangeRates(rates);
    };

    fetchExchangeRates();
  }, []);

  const handleTabClick = (e: any, tabId: string) => {
    e.preventDefault();
    setActiveTab(tabId);
  };
  return (
    <section className="landing-currency-rates section-gap">
      <div className="container">
        <div className="section-title">
          <h3 className="section-title__title">
            نرخ لحظه ای <span className="text-primary">ارزها</span>
          </h3>
        </div>
        <div className="nav-tabs-wrapper">
          <FilterNavCoin
            activeTab={activeTab}
            handleTabClick={handleTabClick}
          />
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
                  {currencyPairs.map((currencyPair: any, index: number) => (
                    <tr key={index}>
                      <td>
                        <div className="table-crypto-title">
                          <img
                            src={currencyPair.imgSrc}
                            alt={currencyPair.code}
                          />
                          <h6>{currencyPair.name}</h6>
                          <span>{currencyPair.code}</span>
                        </div>
                      </td>
                      <td className="text-center">
                        <span className="d-inline-block d-ltr">
                          {`${Number(
                            exchangeRates[currencyPair.code]?.USD
                          ).toLocaleString()} $`}
                        </span>
                      </td>
                      <td className="text-center">
                        <span className="fs-md">
                          {`${Number(
                            exchangeRates[currencyPair.code]?.IRR
                          ).toLocaleString("IRR")} ﷼`}
                        </span>
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
                        <div className="table-crypto-actions text-center">
                          <a href="#" className="btn btn-outline-success ">
                            خرید و فروش
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
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
                      <span className="d-inline-block d-ltr">$17,232.32</span>
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
                      <span className="d-inline-block d-ltr">$17,232.32</span>
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
                      <span className="d-inline-block d-ltr">$17,232.32</span>
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
                      <span className="d-inline-block d-ltr">$17,232.32</span>
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
                      <span className="d-inline-block d-ltr">$17,232.32</span>
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
                      <span className="d-inline-block d-ltr">$17,232.32</span>
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
                      <span className="d-inline-block d-ltr">$17,232.32</span>
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
                      <span className="d-inline-block d-ltr">$17,232.32</span>
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
                      <span className="d-inline-block d-ltr">$17,232.32</span>
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
                      <span className="d-inline-block d-ltr">$17,232.32</span>
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
                      <span className="d-inline-block d-ltr">$17,232.32</span>
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
                      <span className="d-inline-block d-ltr">$17,232.32</span>
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
                      <span className="d-inline-block d-ltr">$17,232.32</span>
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
                      <span className="d-inline-block d-ltr">$17,232.32</span>
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
                      <span className="d-inline-block d-ltr">$17,232.32</span>
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
                      <span className="d-inline-block d-ltr">$17,232.32</span>
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
                      <span className="d-inline-block d-ltr">$17,232.32</span>
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
                      <span className="d-inline-block d-ltr">$17,232.32</span>
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
          <a href="/coins">
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
  );
};

export default SpotRate;
