import { FilterNavCoin } from "components/FilterNavCoin";
import LandingLayout from "layouts/Landing";
import { useCallback, useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, Container } from "reactstrap";
import BottomBanner from "pages/Home/BottomBanner";
import { Link } from "react-router-dom";
import { CryptoData } from "types/exchange";
import { get24hChanges } from "helpers";
import CoinRecord from "components/CoinRecord";

import TRX from "assets/img/coins/trx.png";
import BTC from "assets/img/coins/icon_btc.png";
import USDT from "assets/img/coins/USDT.png";
import ETH from "assets/img/coins/icon_eth.svg";
import SOL from "assets/img/coins/icon_sol.svg";
import XRP from "assets/img/coins/icon_xrp.png";
import DOGE from "assets/img/coins/icon_doge.svg";
import SHIB from "assets/img/coins/icon_shib.svg";
import ADA from "assets/img/coins/icon_ada.svg";
import BCH from "assets/img/coins/icon_bch.svg";
import ETC from "assets/img/coins/icon_eth.svg";

import lira from "assets/img/coins/lira.png";
import CAD from "assets/img/coins/icon_cad.svg";
import EUR from "assets/img/coins/icon_eur.svg";
import GBP from "assets/img/coins/icon_gbp.svg";

import home from "assets/scss/landing/home.module.scss";
import coins from "assets/scss/landing/coins.module.scss";
import axios from "axios";

export default function CoinPage() {
  const [hasNotIR, setHasNotIR] = useState(false);
  const [activeTab, setActiveTab] = useState<"IRR" | "USDT">("IRR");
  const [coinChanges, setCoinChanges] = useState<CryptoData[] | []>([]);
  const [mode, setMode] = useState<"crypto" | "fiat">("crypto");
  const [fiatChanges, setFiatChanges] = useState<CryptoData[] | []>([]);

  const handleTabClick = (e: any, tabId: string) => {
    e.preventDefault();
    setActiveTab(tabId === "tab2" ? "IRR" : "USDT");
  };
  const handleModeClick = (e: any, tabId: string) => {
    e.preventDefault();
    setMode(tabId === "tab1" ? "crypto" : "fiat");
  };
  const currencyPairs = [
    {
      code: "BTC",
      name: "بیت کوین",
      originName: "bitcoin",
      imgSrc: BTC,
      activeDeal: true,
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
      activeDeal: true,
    },
    {
      code: "ETH",
      name: "اتریوم",
      originName: "ethereum",
      imgSrc: ETH,
      activeDeal: true,
    },
    {
      code: "SOL",
      name: "سولانا",
      originName: "solana",
      imgSrc: SOL,
      activeDeal: true,
    },
    {
      code: "XRP",
      name: "ریپل",
      originName: "ripple",
      imgSrc: XRP,
      activeDeal: true,
    },
    {
      code: "DOGE",
      name: "دوج کوین",
      originName: "dogecoin",
      imgSrc: DOGE,
      activeDeal: true,
    },
    {
      code: "ADA",
      name: "کاردانو",
      originName: "cardano",
      imgSrc: ADA,
      activeDeal: true,
    },
    {
      code: "SHIB",
      name: "شیبا",
      originName: "shiba",
      imgSrc: SHIB,
      activeDeal: true,
    },
    {
      code: "BCH",
      name: "بیت کوین کش",
      originName: "bitcoin-cash",
      imgSrc: BCH,
      activeDeal: true,
    },

    {
      code: "ETC",
      name: "اتریوم کلاسیک",
      originName: "ethereum-classic",
      imgSrc: ETC,
      activeDeal: true,
    },

    // Add more currency pairs as needed
  ];
  const fiatPairs = [
    { code: "TRY", name: "لیر", imgSrc: lira, activeDeal: true },
    { code: "EUR", name: "یورو", imgSrc: EUR, activeDeal: true },
    { code: "CAD", name: "دلار کانادا", imgSrc: CAD, activeDeal: true },
    { code: "GBP", name: "پوند", imgSrc: GBP, activeDeal: true },
    // Add more currency pairs as needed
  ];

  const checkLocation = useCallback(async () => {
    await axios.get("https://ipapi.co/json/").then((res) => {
      if (res.data.country_code !== "IR") setHasNotIR(true);
    });
  }, []);

  useEffect(() => {
    const cryptoIds: string[] = [
      "tether",
      "bitcoin",
      "ethereum",
      "binancecoin",
      "xrp",
      "ton",
      "cardano",
      "shiba",
      "tron",
      "bitcoin-cash",
      "polkadot",
      "ethereum-classic",
      "uniswap",
      "matic",
      "solana",
      "ripple",
      "dogecoin",
      "pepe",
      "bonk",
      "arbitrum ",
      "apex",
    ]; // List of cryptocurrency IDs
    get24hChanges(cryptoIds)
      .then((changes) => {
        if (changes) {
          setCoinChanges(changes);
          changes.forEach((crypto) => {});
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  useEffect(() => {
    checkLocation();
  }, [checkLocation]);

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
              {hasNotIR ? (
                <FilterNavCoin
                  activeTab={mode}
                  handleTabClick={handleModeClick}
                  leftTitle=" ارزهای دیجیتال"
                  rightTitle="  فیات دیجیتال"
                />
              ) : (
                <div />
              )}
              {mode === "crypto" && (
                <FilterNavCoin
                  activeTab={activeTab}
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
                                  key={index}
                                  mode="crypto"
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
                              key={index}
                              mode="fiat"
                              destinationCode={"IRR"}
                              source={{
                                imgSrc: currencyPair.imgSrc,
                                currencyCode: currencyPair.code,
                                name: currencyPair.name,
                                originName: currencyPair.name,
                                activeDeal: currencyPair?.activeDeal,
                              }}
                              changesLog={
                                fiatChanges.find(
                                  (fiat) => fiat.id === currencyPair.name,
                                ) as CryptoData
                              }
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
