import home from "assets/scss/landing/new-home.module.scss";
import { Link } from "react-router-dom";
import IconTether from "assets/img/coins/icon_tether.svg";
import IconToman from "assets/img/coins/icon_toman.svg";
import { ReactNode, useCallback, useEffect, useState } from "react";
import SpotTab from "components/SpotTab";
import ApexChart from "components/ApexChart";
import { useLazyGetRateListQuery } from "store/api/publics";
import coins from "data/coins";
import { normalizeAmount } from "helpers";

const SpotRate = () => {
  // ==============|| Constant ||================= //
  const unitTab: {
    code: number;
    title: ReactNode;
    codeName: "IRR" | "USDT";
  }[] = [
    {
      code: 0,
      codeName: "IRR",
      title: (
        <>
          تومان
          <img src={IconToman} width={25} height={25} alt="toman" />
        </>
      ),
    },
    {
      code: 1,
      codeName: "USDT",
      title: (
        <>
          تتر
          <img src={IconTether} width={25} height={25} alt="tether" />
        </>
      ),
    },
  ];
  const sortTab = [
    { code: 0, title: "پرسود ترین" },
    { code: 1, title: "محبوب ترین" },
    { code: 2, title: "جدید ترین" },
  ];

  // ==============|| State ||================= //
  const [activeUnit, setActiveUnit] = useState(unitTab[0].code);
  const [activeSort, setActiveSort] = useState(sortTab[0].code);

  // ==============|| Hook ||================= //
  const [getRates, { data, isLoading, isFetching, isSuccess }] =
    useLazyGetRateListQuery();

  // ==============|| Handler ||================= //
  const getPriceChangesColor = (value) =>
    value >= 0 ? "var(--green)" : "var(--red)";

  const handleRates = useCallback(() => {
    const list = coins.map((coin) => coin.shortName);
    getRates(list);
  }, [getRates]);

  const findCorrectRate = (array) => {
    if (activeUnit === 0) {
      const rate = array.find((item) => item.dest === "IRR")?.rate;
      return normalizeAmount(rate, "IRR", false, false);
    } else {
      const rate = array.find((item) => item.dest === "USD")?.rate;
      return normalizeAmount(rate, "USDT", false, false);
    }
  };

  // ==============|| Hook ||================= //
  useEffect(() => {
    handleRates();
  }, [handleRates]);

  // ==============|| Render ||================= //
  return (
    <div className={home["spot-rate__container"]}>
      <header className={home["spot-rate__header"]}>
        <SpotTab
          tabContent={unitTab}
          handler={(unit) => setActiveUnit(unit)}
          activeTab={activeUnit}
          label="قیمت واحد:"
        />
        <h3 className={home.section_title}>نرخ لحظه‌ای رمزارزها</h3>
        {/* <div /> */}
        <SpotTab
          tabContent={sortTab}
          handler={(sort) => setActiveSort(sort)}
          activeTab={activeSort}
          styleSpot={{ opacity: 0, visibility: "hidden" }}
        />
      </header>

      <div className={home["spot-rate__table"]}>
        <table>
          <thead>
            <tr>
              <th className="text_right">ارز</th>
              <th>قیمت واحد</th>
              <th>تغییرات 24 ساعته</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {isSuccess &&
              data &&
              Object.entries(data).map(([codeName, data]: any, index) => {
                return (
                  !(codeName === "USDT" && activeUnit === 1) && (
                    <tr key={index}>
                      <td>
                        <div className={home.currency}>
                          <img
                            src={
                              coins.find((coin) => coin.shortName === codeName)
                                ?.icon
                            }
                            className={`${home.currency__img} ${home["fiat-icon"]}`}
                            alt={codeName}
                          />
                          <ul>
                            <li className={home.currency__name}>
                              {activeUnit === 0
                                ? coins.find(
                                    (coin) => coin.shortName === codeName,
                                  )?.name
                                : data[0]?.name}
                            </li>
                            <li className={home.currency__nickname}>
                              {codeName}
                            </li>
                          </ul>
                        </div>
                      </td>

                      <td className={home.price}>
                        <span className={home.dollar}>
                          {findCorrectRate(data)}
                          <img
                            src={
                              unitTab.find((tab) => tab.code === activeUnit)
                                ?.codeName === "IRR"
                                ? IconToman
                                : IconTether
                            }
                            width={25}
                            height={25}
                            alt="unit"
                          />
                        </span>
                      </td>

                      <td className={home.price}>
                        <span
                          className={home.dollar}
                          style={{
                            direction: "ltr",
                            color: getPriceChangesColor(
                              Number(data[0].ohlc.dailyChangePercentage),
                            ),
                          }}
                        >
                          {data[0].ohlc.dailyChangePercentage !== ""
                            ? Number(
                                (
                                  parseFloat(
                                    data[0].ohlc.dailyChangePercentage,
                                  ) * 100
                                ).toPrecision(12),
                              ) + "%"
                            : "-"}
                        </span>
                      </td>

                      <td className={home.chart}>
                        <ApexChart data={data[0]} />
                      </td>

                      <td>
                        <Link
                          to="https://arsonex.com/dashboard/exchange"
                          className={home.bargain}
                        >
                          خرید و فروش
                        </Link>
                      </td>
                    </tr>
                  )
                );
              })}
          </tbody>
        </table>
        {isLoading ||
          (isFetching && (
            <div className={home["no-content"]}>در حال بارگذاری...</div>
          ))}
      </div>
    </div>
  );
};

export default SpotRate;
