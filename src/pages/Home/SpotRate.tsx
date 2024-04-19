import { Container } from "reactstrap";
import { CryptoData } from "types/exchange";
import { FilterNavCoin } from "components/FilterNavCoin";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import { get24hChanges } from "helpers";
import { useEffect, useState } from "react";

import BTC from "assets/img/coins/BTC.png";
import CoinRecord from "components/CoinRecord";
import ETH from "assets/img/coins/ETH.png";
import SOL from "assets/img/coins/Solana_logo.png";
import TRX from "assets/img/coins/trx.png";
import XRP from "assets/img/coins/xrp-xrp-logo.png";
import USDT from "assets/img/coins/USDT.png";
import lira from "assets/img/coins/lira.png";
import CAD from "assets/img/coins/CAD.svg";
import EUR from "assets/img/coins/Euro.png";
import GBP from "assets/img/coins/GBP.png";

import home from "assets/scss/landing/home.module.scss";

const SpotRate = () => {
  // ==============|| States ||================= //
  const [activeTab, setActiveTab] = useState<"IRR" | "USDT">("IRR");
  const [mode, setMode] = useState<"crypto" | "fiat">("crypto");
  const [coinChanges, setCoinChanges] = useState<CryptoData[] | []>([]);

  // ==============|| Constants ||================= //
  const currencyPairs = [
    {
      code: "BTC",
      name: "بیت کوین",
      originName: "bitcoin",
      imgSrc: BTC,
    },
    {
      code: "USDT",
      name: "تتر",
      originName: "tether",
      imgSrc: USDT,
      activeDeal: true,
    },
    {
      code: "TRX",
      name: "ترون",
      originName: "tron",
      imgSrc: TRX,
    },
    {
      code: "ETH",
      name: "اتریوم",
      originName: "ethereum",
      imgSrc: ETH,
    },
    {
      code: "SOL",
      name: "سولانا",
      originName: "solana",
      imgSrc: SOL,
    },
    {
      code: "XRP",
      name: "ریپل",
      originName: "ripple",
      imgSrc: XRP,
    },
    // Add more currency pairs as needed
  ];

  const fiatPairs = [
    { code: "TRY", name: "لیر", imgSrc: lira, activeDeal: true },
    { code: "EUR", name: "یورو", imgSrc: EUR },
    { code: "CAD", name: "دلار کانادا", imgSrc: CAD },
    { code: "GBP", name: "پوند", imgSrc: GBP },
    // Add more currency pairs as needed
  ];

  // ==============|| Handlers ||================= //
  const handleTabClick = (e: any, tabId: string) => {
    e.preventDefault();
    setActiveTab(tabId === "tab2" ? "IRR" : "USDT");
  };
  const handleModeClick = (e: any, tabId: string) => {
    e.preventDefault();
    setMode(tabId === "tab2" ? "crypto" : "fiat");
  };

  // ==============|| Life Cycle ||================= //
  useEffect(() => {
    if (mode === "crypto") {
      const cryptoIds: string[] = [
        "bitcoin",
        "tether",
        "tron",
        "ethereum",
        "solana",
        "ripple",
      ]; // List of cryptocurrency IDs
      get24hChanges(cryptoIds)
        .then((changes) => {
          if (changes) {
            setCoinChanges(changes);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  // ==============|| Render ||================= //
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
            handleTabClick={handleModeClick}
            leftTitle="فیات دیجیتال"
            rightTitle="ارزهای دیجیتال"
          />
          {mode === "crypto" && (
            <FilterNavCoin
              handleTabClick={handleTabClick}
              leftTitle=" تتر USDT"
              rightTitle="تومان IRT"
            />
          )}
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
                    {mode === "crypto" && (
                      <th className="text-center"> تغییرات ۲۴ ساعته</th>
                    )}
                    <th className="text-center">معامله</th>
                  </tr>
                </thead>
                {mode === "crypto" && (
                  <tbody>
                    {currencyPairs.map((currencyPair: any, index: number) => {
                      if (currencyPair.code === "USDT" && activeTab === "USDT")
                        return null;
                      else
                        return (
                          <CoinRecord
                            mode="crypto"
                            key={index}
                            destinationCode={activeTab}
                            source={{
                              imgSrc: currencyPair.imgSrc,
                              currencyCode: currencyPair.code,
                              name: currencyPair.name,
                              originName: currencyPair.originName,
                              activeDeal: currencyPair?.activeDeal,
                            }}
                            changesLog={
                              coinChanges.find(
                                (coin) => coin.id === currencyPair.originName,
                              ) as CryptoData
                            }
                          />
                        );
                    })}
                  </tbody>
                )}
                {mode === "fiat" && (
                  <tbody>
                    {fiatPairs.map((currencyPair: any, index: number) => {
                      return (
                        <CoinRecord
                          mode="fiat"
                          key={index}
                          destinationCode={"IRR"}
                          source={{
                            imgSrc: currencyPair.imgSrc,
                            currencyCode: currencyPair.code,
                            name: currencyPair.name,
                            originName: currencyPair.name,
                            activeDeal: currencyPair?.activeDeal,
                          }}
                        />
                      );
                    })}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
        <div className={home["more-section-button"]}>
          <Link to="/coins">
            دیدن همه
            <span className="icon">
              <HiOutlineChevronLeft />
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default SpotRate;
