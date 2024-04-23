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
import BNB from "assets/img/coins/bnb.png";
import TON from "assets/img/coins/ton.png";
import MATIC from "assets/img/coins/matic.png";
import DOT from "assets/img/coins/dot.png";
import ADA from "assets/img/coins/ada.png";
import BCH from "assets/img/coins/bch.png";
import ETC from "assets/img/coins/etc.png";
import UNI from "assets/img/coins/uni.png";

import lira from "assets/img/coins/lira.png";
import CAD from "assets/img/coins/CAD.svg";
import EUR from "assets/img/coins/Euro.png";
import GBP from "assets/img/coins/GBP.png";


import home from "assets/scss/landing/home.module.scss";
import coins from "assets/scss/landing/coins.module.scss";

export default function CoinPage() {
  const [activeTab, setActiveTab] = useState<"IRR" | "USDT">("IRR");
  const [coinChanges, setCoinChanges] = useState<CryptoData[] | []>([]);
  const [mode, setMode] = useState<"crypto" | "fiat">("crypto")
  const [fiatChanges, setFiatChanges] = useState<CryptoData[] | []>([]);

  const handleTabClick = (e: any, tabId: string) => {
    e.preventDefault();
    setActiveTab(tabId === "tab2" ? "IRR" : "USDT");
  };
  const handleModeClick = (e: any, tabId: string) => {
    e.preventDefault();
    setMode(tabId === "tab1" ? "crypto" : "fiat");
  }
  const currencyPairs = [
    {
      code: "USDT",
      name: "تتر",
      originName: "tether",
      imgSrc: USDT,
      activeDeal: true,
    },
    {
      code: "BTC",
      name: "بیت کوین",
      originName: "bitcoin",
      imgSrc: BTC,
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
      code: "BNB",
      name: "بایننس کوین",
      originName: "binancecoin",
      imgSrc: BNB,
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
    /*{
      code: "TON",
      name: "تون",
      originName: "ton",
      imgSrc: TON,
      activeDeal: true,
    },*/
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
      code: "TRX",
      name: "ترون",
      originName: "tron",
      imgSrc: TRX,
      activeDeal: true,
    },
    {
      code: "BCH",
      name: "بیت کوین کش",
      originName: "bitcoincash",
      imgSrc: BCH,
      activeDeal: true,
    },
    /*{
      code: "DOT",
      name: "پولکادات",
      originName: "polkadot",
      imgSrc: DOT,
      activeDeal: true,
    },*/
    {
      code: "ETC",
      name: "اتریوم کلاسیک",
      originName: "ethereumclassic",
      imgSrc: ETC,
      activeDeal: true,
    },
   /* {
      code: "UNI",
      name: "یونی سواپ",
      originName: "uniswap",
      imgSrc: UNI,
      activeDeal: true,
    }, */
    /*{
      code: "MATIC",
      name: "متیک",
      originName: "matic",
      imgSrc: MATIC,
      activeDeal: true,
    } */

   
    // Add more currency pairs as needed
  ];
  const fiatPairs = [
    { code: "TRY", name: "لیر", imgSrc: lira, activeDeal: true },
    { code: "EUR", name: "یورو", imgSrc: EUR, activeDeal: true },
    { code: "CAD", name: "دلار کانادا", imgSrc: CAD, activeDeal: true },
    { code: "GBP", name: "پوند", imgSrc: GBP, activeDeal: true },
    // Add more currency pairs as needed
  ];
 
  useEffect(() => {
    const cryptoIds: string[] = [
      "tether",
      "bitcoin",
      "ethereum",
      "binancecoin",
      "xrp",
      "ton",
      "ada",
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
          changes.forEach((crypto) => { });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
                activeTab={mode}
                handleTabClick={handleModeClick}
                leftTitle=" ارزهای دیجیتال"
                rightTitle="  فیات دیجیتال"
              />
              {mode === "crypto" &&
                <FilterNavCoin
                  activeTab={activeTab}
                  handleTabClick={handleTabClick}
                  leftTitle=" تتر USDT"
                  rightTitle="تومان IRT"
                />}
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
                    {mode === 'crypto' && <tbody>
                      {currencyPairs.map((currencyPair: any, index: number) => {
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
                                  (coin) => coin.id === currencyPair.originName,
                                ) as CryptoData
                              }
                            />
                          );
                      })}
                    </tbody>}
                    {mode === 'fiat' && <tbody>
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
                      }
                      )}
                    </tbody>}
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
