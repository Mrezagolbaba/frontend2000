import { FilterNavCoin } from "components/FilterNavCoin";
import LandingLayout from "layouts/Landing";
import { useEffect, useState } from "react";

import { Breadcrumb, BreadcrumbItem, Container } from "reactstrap";
import BottomBanner from "pages/Home/BottomBanner";
import { Link } from "react-router-dom";
import request from "services/adapter";

import { CiSearch } from "react-icons/ci";

import USDT from "assets/img/coins/USDT.png";
import lira from "assets/img/coins/lira.png";
import CAD from "assets/img/coins/CAD.svg";
import EUR from "assets/img/coins/Euro.png";
import GBP from "assets/img/coins/GBP.png";

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
    { code: "USDT", name: "تتر", imgSrc: USDT },
    { code: "EUR", name: "یورو", imgSrc: EUR },
    { code: "CAD", name: "دلار کانادا", imgSrc: CAD },
    { code: "GBP", name: "پوند", imgSrc: GBP },
    { code: "TRY", name: "لیر", imgSrc: lira },
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
            <div className={home["currency-rates__tabs"]}>
              <FilterNavCoin
                activeTab={activeTab}
                handleTabClick={handleTabClick}
              />
            </div>
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
                                    className="btn btn-outline-success "
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
