import { useEffect, useState } from "react";
import { Container } from "reactstrap";

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

import home from "assets/scss/landing/home.module.scss";
import { Link } from "react-router-dom";
import { convertIRRToToman } from "helpers";
import { useAppSelector } from "store/hooks";
import { useLazyGetCoinsQuery } from "store/api/publices";

interface ExchangeRateData {
  expiresAt: string;
  pair: string;
  rate: string;
}

const SpotRate = () => {
  const [getCurrency1, { isLoading }] = useLazyGetCoinsQuery();
  const { id } = useAppSelector((state) => state.user);
  const [exchangeRates, setExchangeRates] = useState<{
    [key: string]: { IRR: number | string; USD: number | string };
  }>({});
  const [activeTab, setActiveTab] = useState("tab2");

  const currencyPairs = [
    { code: "USDT", name: "تتر", imgSrc: USDT },
    // { code: "EUR", name: "یورو", imgSrc: EUR },
    // { code: "CAD", name: "دلار کانادا", imgSrc: CAD },
    // { code: "GBP", name: "پوند", imgSrc: GBP },
    // { code: "TRY", name: "لیر", imgSrc: lira },
    // Add more currency pairs as needed
  ];

  useEffect(() => {
    const fetchExchangeRates = async () => {
      const rates: {
        [key: string]: { IRR: number | string; USD: number | string };
      } = {};

      for (const currencyPair of currencyPairs) {
        // let data1, data2;
        try {
          const data1 = await getCurrency1({
            source: currencyPair.code,
            destination: "IRR",
          })
            .unwrap()
            .then((res) => {
              return res.rate;
            });

          rates[currencyPair.code] = { IRR: data1, USD: "-" };
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
    <section className={`${home["currency-rates"]} ${home["section-gap"]}`}>
      <Container>
        <div className={home["section-title"]}>
          <h3 className={home["section-title__title"]}>
            نرخ لحظه ای <span className="text-primary">ارزها</span>
          </h3>
        </div>
        {/* <div className={home["currency-rates__tabs"]}>
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
                    {currencyPairs.map((currencyPair: any, index: number) => (
                      <tr key={index}>
                        <td>
                          <div className={home["currency-rates__table__title"]}>
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
                                exchangeRates[currencyPair.code]?.USD || 0,
                              ).toLocaleString()} $`}
                            </span>
                          </td>
                        ) : (
                          <td>
                            <span className="fs-md">
                              {`${Math.floor(
                                Number(exchangeRates[currencyPair.code]?.IRR) /
                                  10 || 0,
                              ).toLocaleString()} تومان`}
                            </span>
                          </td>
                        )}
                        <td>
                          <div className="table-crypto-actions">
                            <Link
                              to={id ? "/dashboard/exchange" : "/login"}
                              className="btn btn-outline-primary "
                            >
                              معامله
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
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
        {/* <div className={home["more-section-button"]}>
          <a href="/coins">
            دیدن همه
            <span className="icon">
              <HiOutlineChevronLeft />
            </span>
          </a>
        </div> */}
      </Container>
    </section>
  );
};

export default SpotRate;
