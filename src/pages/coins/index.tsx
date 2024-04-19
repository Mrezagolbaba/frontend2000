import { FilterNavCoin } from "components/FilterNavCoin";
import LandingLayout from "layouts/Landing";
import { useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, Container } from "reactstrap";
import BottomBanner from "pages/Home/BottomBanner";
import { Link } from "react-router-dom";
import { CryptoData } from "types/exchange";
import { get24hChanges } from "helpers";
import CoinRecord from "components/CoinRecord";

import TRX from "assets/img/coins/trx.png";
import BTC from "assets/img/coins/BTC.png";
import USDT from "assets/img/coins/USDT.png";
import ETH from "assets/img/coins/ETH.png";
import SOL from "assets/img/coins/Solana_logo.png";
import XRP from "assets/img/coins/xrp-xrp-logo.png";
import DOGE from "assets/img/coins/dogecoin-doge-logo-625F9D262A-seeklogo.com.png";
import PEPE from "assets/img/coins/pepecoin.jpeg";
import SHIB from "assets/img/coins/shiba.png";
import BONK from "assets/img/coins/bonk-coin.png";
import APEX from "assets/img/coins/apex-coin.jpg";
import ARB from "assets/img/coins/arb-coin.jpeg";
import lira from "assets/img/coins/lira.png";
import CAD from "assets/img/coins/CAD.svg";
import EUR from "assets/img/coins/Euro.png";
import GBP from "assets/img/coins/GBP.png";

import home from "assets/scss/landing/home.module.scss";
import coins from "assets/scss/landing/coins.module.scss";

export default function CoinPage() {
  const [activeTab, setActiveTab] = useState<"IRR" | "USDT">("IRR");
  const [coinChanges, setCoinChanges] = useState<CryptoData[] | []>([]);
  const [mode, setMode] = useState<"crypto" | "fiat">("crypto");

  const handleTabClick = (e: any, tabId: string) => {
    e.preventDefault();
    setActiveTab(tabId === "tab2" ? "IRR" : "USDT");
  };
  const handleModeClick = (e: any, tabId: string) => {
    e.preventDefault();
    setMode(tabId === "tab2" ? "crypto" : "fiat");
  };

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
    {
      code: "DOGE",
      name: "دوج کوین",
      originName: "dogecoin",
      imgSrc: DOGE,
    },
    {
      code: "PEPE",
      name: "پپه",
      originName: "pepe",
      imgSrc: PEPE,
    },
    {
      code: "SHIB",
      name: "شیبا",
      originName: "shiba",
      imgSrc: SHIB,
    },
    {
      code: "BONK",
      name: "بونک",
      originName: "bonk",
      imgSrc: BONK,
    },
    {
      code: "ARB",
      name: "آربیتروم",
      originName: "arbitrum",
      imgSrc: ARB,
    },
    {
      code: "APEX",
      name: "اپکس",
      originName: "apex",
      imgSrc: APEX,
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

  useEffect(() => {
    if (mode === "crypto") {
      const cryptoIds: string[] = [
        "bitcoin",
        "tether",
        "tron",
        "ethereum",
        "solana",
        "ripple",
        "dogecoin",
        "pepe",
        "bonk",
        "shiba",
        "arbitrum ",
        "apex",
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
  }, [mode]);

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
                        {currencyPairs.map(
                          (currencyPair: any, index: number) => {
                            if (
                              currencyPair.code === "USDT" &&
                              activeTab === "USDT"
                            )
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
                                      (coin) =>
                                        coin.id === currencyPair.originName,
                                    ) as CryptoData
                                  }
                                />
                              );
                          },
                        )}
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
          </Container>
        </section>

        <BottomBanner />
      </main>
    </LandingLayout>
  );
}
