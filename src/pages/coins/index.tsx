import { FilterNavCoin } from "components/FilterNavCoin";
import LandingLayout from "layouts/Landing";
import { useEffect, useState } from "react";

import { Breadcrumb, BreadcrumbItem, Container } from "reactstrap";
import BottomBanner from "pages/Home/BottomBanner";
import { Link } from "react-router-dom";
import request from "services/adapter";

import USDT from "assets/img/coins/USDT.png";
import TRX from "assets/img/coins/trx.png";
import BTC from "assets/img/coins/BTC.png";
import ETH from "assets/img/coins/ETH.png";
import SOL from "assets/img/coins/Solana_logo.png";
import XRP from "assets/img/coins/xrp-xrp-logo.png";
import DOGE from "assets/img/coins/dogecoin-doge-logo-625F9D262A-seeklogo.com.png";
import PEPE from "assets/img/coins/pepecoin.jpeg";
import SHIP from "assets/img/coins/shipchain-coin.jpeg";
import BONK from "assets/img/coins/bonk-coin.png";
import APEX from "assets/img/coins/apex-coin.jpg";
import ARB from "assets/img/coins/arb-coin.jpeg";

import home from "assets/scss/landing/home.module.scss";
import coins from "assets/scss/landing/coins.module.scss";

interface ExchangeRateData {
  expiresAt: string;
  pair: string;
  rate: string;
}

export default function CoinPage() {
  const [activeTab, setActiveTab] = useState("tab2");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [exchangeRates, setExchangeRates] = useState<{
    [key: string]: { IRR: number | string; USD: number | string };
  }>({});

  const handleTabClick = (e: any, tabId: string) => {
    e.preventDefault();
    setActiveTab(tabId);
  };

  const currencyPairs = [
    { code: "BTC", name: "Bitcoin", imgSrc: BTC },
    { code: "َUSDT", name: "Tether", imgSrc: USDT },
    { code: "TRX", name: "Tron", imgSrc: TRX },
    { code: "BTC", name: "Bitcoin", imgSrc: BTC },
    { code: "ETH", name: "Ethereum", imgSrc: ETH },
    { code: "SOL", name: "Solana", imgSrc: SOL },
    { code: "XRP", name: "Ripple", imgSrc: XRP },
    { code: "DOGE", name: "Doge coin", imgSrc: DOGE },
    { code: "PEPE", name: "Pepe coin", imgSrc: PEPE },
    { code: "SHIP", name: "Ship coin", imgSrc: SHIP },
    { code: "BONK", name: "Bonk token", imgSrc: BONK },
    { code: "ARB", name: "ARBITRAGE", imgSrc: ARB },
    { code: "APEX", name: "Apex Token", imgSrc: APEX },
    // Add more currency pairs as needed
  ];

  useEffect(() => {
    setIsLoading(true);
    const fetchExchangeRates = async () => {
      const rates: {
        [key: string]: { IRR: number | string; USD: number | string };
      } = {};

      for (const currencyPair of currencyPairs) {
        try {
          const response1 = await request.get<ExchangeRateData>(
            `rates/${currencyPair.code}-IRR`,
          );
          const response2 = await request.get<ExchangeRateData>(
            `rates/${currencyPair.code}-USD`,
          );
          const data1 = response1.data;
          const data2 = response2.data;
          rates[currencyPair.code] = { IRR: data1.rate, USD: data2.rate };
          setIsLoading(false);
        } catch (error: any) {
          console.error(`Error fetching ${currencyPair}: ${error.message}`);
          rates[currencyPair.code] = { IRR: "-", USD: "-" };
        }
      }

      setExchangeRates(rates);
    };

    fetchExchangeRates();
  }, []);

  return (
    <LandingLayout disableBanner>
      <main className={home["main-wrapper"]}>
        <section className={home["section-holder"]}>
          <Container>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/">آرسونیکس</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>نرخ لحظه ای ارزها</BreadcrumbItem>
            </Breadcrumb>

            <div className={coins.header}>
              <h1 className={coins.title}>نرخ لحظه ای ارزها</h1>
              {/* <form className={coins["modern-search"]}>
                <input type="text" placeholder="جستجو در ارزها" />
                <button type="submit">
                  <span className="icon">
                    <CiSearch />
                  </span>
                </button>
              </form> */}
            </div>
{/*             <div className={home["currency-rates__tabs"]}>
              <FilterNavCoin
                activeTab={activeTab}
                handleTabClick={handleTabClick}
              />
            </div> */}
            <div className={home["tab-content"]} id="myTabContent">
              <div
                className={`${home.fade} ${home.show} ${home.active}}`}
                id="tab-1"
                role="tabpanel"
                aria-labelledby="tab1"
              >
                <div className="table-responsive">
                  <table className={home["currency-rates__table"]}>
                    <thead>
                      <tr>
                        <th>ارز</th>
                        <th>قیمت ارز</th>
                        <th>معامله</th>
                      </tr>
                    </thead>
                    {!isLoading ? (
                      <tbody>
                        {currencyPairs.map(
                          (currencyPair: any, index: number) => (
                            <tr key={index}>
                              <td>
                                <div
                                  className={
                                    home["currency-rates__table__title"]
                                  }
                                >
                                  <img
                                    src={currencyPair.imgSrc}
                                    alt={currencyPair.code}
                                  />
                                  <h6>{currencyPair.name}</h6>
                                  <span>{currencyPair.code}</span>
                                </div>
                              </td>
                              {activeTab === "tab1" ? (
                                <td>
                                  <span className="d-inline-block d-ltr">
                                    {`${Number(
                                      exchangeRates[currencyPair.code]?.USD ||
                                        0,
                                    ).toLocaleString()} $`}
                                  </span>
                                </td>
                              ) : (
                                <td>
                                  <span className="fs-md">
                                    {`${Math.floor(
                                      Number(
                                        exchangeRates[currencyPair.code]?.IRR,
                                      ) / 10 || 0,
                                    ).toLocaleString()} تومان`}
                                  </span>
                                </td>
                              )}
                              <td>
                                <div className="table-crypto-actions">
                                  <Link
                                    to="/dashboard"
                                    className="btn btn-outline-primary "
                                  >
                                    خرید و فروش
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          ),
                        )}
                      </tbody>
                    ) : (
                      <tbody>
                        <>
                          <tr>
                            <td className="placeholder-glow">
                              <div className="placeholder col-12 rounded" />
                            </td>
                            <td className="text-center placeholder-glow">
                              <div className="placeholder col-12 rounded" />
                            </td>
                            <td className="text-center placeholder-glow">
                              <div className="placeholder col-12 rounded" />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row" className="placeholder-glow">
                              <div className="placeholder col-12 rounded" />
                            </th>
                            <td className="text-center placeholder-glow">
                              <div className="placeholder col-12 rounded" />
                            </td>
                            <td className="text-center placeholder-glow">
                              <div className="placeholder col-12 rounded" />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row" className="placeholder-glow">
                              <div className="placeholder col-12 rounded" />
                            </th>
                            <td className="text-center placeholder-glow">
                              <div className="placeholder col-12 rounded" />
                            </td>
                            <td className="text-center placeholder-glow">
                              <div className="placeholder col-12 rounded" />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row" className="placeholder-glow">
                              <div className="placeholder col-12 rounded" />
                            </th>
                            <td className="text-center placeholder-glow">
                              <div className="placeholder col-12 rounded" />
                            </td>
                            <td className="text-center placeholder-glow">
                              <div className="placeholder col-12 rounded" />
                            </td>
                          </tr>
                        </>
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <BottomBanner />
      </main>
    </LandingLayout>
  );
}
