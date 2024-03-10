import { FilterNavCoin } from "components/FilterNavCoin";
import LandingLayout from "layouts/Landing";
import { useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, Container } from "reactstrap";
import BottomBanner from "pages/Home/BottomBanner";
import { Link } from "react-router-dom";
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
import { CryptoData } from "types/exchange";
import { get24hChanges } from "helpers";
import CoinRecord from "components/CoinRecord";

interface ExchangeRateData {
  expiresAt: string;
  pair: string;
  rate: string;
}

export default function CoinPage() {
  const [activeTab, setActiveTab] = useState<"IRR" | "USDT">("IRR");
  const [coinChanges, setCoinChanges] = useState<CryptoData[] | []>([]);

  const handleTabClick = (e: any, tabId: string) => {
    e.preventDefault();
    setActiveTab(tabId === "tab2" ? "IRR" : "USDT");
  };

  const currencyPairs = [
    { code: "BTC", name: "بیت کوین", originName: "bitcoin", imgSrc: BTC },
    { code: "TRX", name: "ترون", originName: "tron", imgSrc: TRX },
    { code: "ETH", name: "اتریوم", originName: "ethereum", imgSrc: ETH },
    { code: "SOL", name: "سولانا", originName: "solana", imgSrc: SOL },
    { code: "XRP", name: "ریپل", originName: "ripple", imgSrc: XRP },
    { code: "DOGE", name: "دوج کوین", originName: "dogecoin", imgSrc: DOGE },
    { code: "PEPE", name: "پپه", originName: "pepe", imgSrc: PEPE },
    { code: "SHIP", name: "شیپ", originName: "ship", imgSrc: SHIP },
    { code: "BONK", name: "بونک", originName: "bonk", imgSrc: BONK },
    { code: "ARB", name: "آربیتروم", originName: "arbitrum", imgSrc: ARB },
    { code: "APEX", name: "اپکس", originName: "apex", imgSrc: APEX },
    // Add more currency pairs as needed
  ];

  useEffect(() => {
    const cryptoIds: string[] = [
      "bitcoin",
      "tron",
      "ethereum",
      "solana",
      "ripple",
      "dogecoin",
      "pepe",
      "bonk",
      "ship",
      "arbitrum ",
      "apex",
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
                        <th className="text-center">قیمت ارز</th>
                        <th className="text-center"> تغییرات ۲۴ ساعته</th>
                        <th className="text-center">معامله</th>
                      </tr>
                    </thead>
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
