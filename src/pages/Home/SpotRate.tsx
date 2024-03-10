import { useEffect, useState } from "react";
import { Container } from "reactstrap";
import { HiOutlineChevronLeft } from "react-icons/hi";
//components
import { FilterNavCoin } from "components/FilterNavCoin";

//images
import TRX from "assets/img/coins/trx.png";
import BTC from "assets/img/coins/BTC.png";
import ETH from "assets/img/coins/ETH.png";
import SOL from "assets/img/coins/Solana_logo.png";
import XRP from "assets/img/coins/xrp-xrp-logo.png";
import CoinRecord from "components/CoinRecord";
import { get24hChanges } from "helpers";
import { CryptoData } from "types/exchange";

import home from "assets/scss/landing/home.module.scss";

const SpotRate = () => {
  const [activeTab, setActiveTab] = useState<"IRR" | "USDT">("IRR");
  const [coinChanges, setCoinChanges] = useState<CryptoData[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);

  const currencyPairs = [
    { code: "BTC", name: "بیت کوین", originName: "bitcoin", imgSrc: BTC },
    { code: "TRX", name: "ترون", originName: "tron", imgSrc: TRX },
    { code: "ETH", name: "اتریوم", originName: "ethereum", imgSrc: ETH },
    { code: "SOL", name: "سولانا", originName: "solana", imgSrc: SOL },
    { code: "XRP", name: "ریپل", originName: "ripple", imgSrc: XRP },
    // Add more currency pairs as needed
  ];

  const handleTabClick = (e: any, tabId: string) => {
    e.preventDefault();
    setActiveTab(tabId === "tab2" ? "IRR" : "USDT");
  };

  useEffect(() => {
    const cryptoIds: string[] = [
      "bitcoin",
      "tron",
      "ethereum",
      "solana",
      "ripple",
    ]; // List of cryptocurrency IDs
    get24hChanges(cryptoIds)
      .then((changes) => {
        if (changes) {
          setCoinChanges(changes);
          changes.forEach((crypto) => {
            console.log(
              `${crypto.name}: ${crypto.price_change_percentage_24h}%`,
            );
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <section className={`${home["currency-rates"]} ${home["section-gap"]}`}>
      <Container>
        <div className={home["section-title"]}>
          <h3 className={home["section-title__title"]}>
            نرخ لحظه ای <span className="text-primary">ارزها</span>
          </h3>
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
                    <th className="text-center">قیمت ارز</th>
                    <th className="text-center"> تغییرات ۲۴ ساعته</th>
                    <th className="text-center">معامله</th>
                  </tr>
                </thead>
                {!isLoading ? (
                  <tbody>
                    {currencyPairs.map((currencyPair: any, index: number) => (
                      <CoinRecord
                        key={index}
                        destinationCode={activeTab}
                        source={{
                          imgSrc: currencyPair.imgSrc,
                          currencyCode: currencyPair.code,
                          name: currencyPair.name,
                          originName: currencyPair.originName,
                        }}
                        changesLog={
                          coinChanges.find(
                            (coin) => coin.id === currencyPair.originName,
                          ) as CryptoData
                        }
                      />
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
        <div className={home["more-section-button"]}>
          <a href="/coins">
            دیدن همه
            <span className="icon">
              <HiOutlineChevronLeft />
            </span>
          </a>
        </div>
      </Container>
    </section>
  );
};

export default SpotRate;
