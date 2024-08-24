import React, { useState, useEffect } from 'react';
import styles from './TableT1.module.css';
import Link from 'next/link';
import ApexChart from '../ApexChart';
import Image from 'next/image';
import IconTether from '../../public/images/icon_tether.svg';
import IconToman from '../../public/images/icon_toman.svg';
import Tab from '../Tab/Tab';
import {
  getChartData,
  getCoinChanges,
  getCoinCodeName,
  getCoinDataByPair,
  getMostLovedCoins,
  getMostProfitableCoins,
  getNewestCoins,
  getUnitPrice,
  getAvailableCoins,
  getAllCoins,
} from '../../helpers/api';
import { formatNumber } from '../../helpers/number';

export function TableT1() {
  const unitTab = [
    {
      code: 'coin',
      codeName: 'coin',
      title: 'ارز دیجیتال',
    },
    {
      code: 'fiat',
      codeName: 'fiat',
      title: 'فیات دیجیتال',
    },
  ];

  const sortTab = [
    { code: 0, callback: getMostProfitableCoins, title: 'پرسود ترین' },
    { code: 1, callback: getMostLovedCoins, title: 'محبوب ترین' },
    { code: 2, callback: getNewestCoins, title: 'جدید ترین' },
  ];

  const getPriceChangesColor = (value) => {
    if (value > 0) return 'var(--green)';
    else if (value < 0) return 'var(--red)';
    else return 'var(--text-black)';
  };

  const [fetchedData, setFetchedData] = useState({});
  const [activeUnit, setActiveUnit] = useState(unitTab[0].code);
  const [activeSort, setActiveSort] = useState(sortTab[0].code);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      getAllCoins(activeUnit).then((data) => {
        setTableData(data);
      });
    }, [6000]);

    return () => clearInterval(interval);

    // const datakey = `${activeUnit}.${activeSort}`;

    // if (!fetchedData[datakey]) {
    //   const callbackFn = sortTab.find(
    //     (tab) => tab.code === activeSort,
    //   ).callback;

    //   callbackFn().then((response) => {
    //     // const states = response.map((data) => {
    //     //   const pairCodeName = unitTab.find(
    //     //     ({ code }) => code === activeUnit,
    //     //   ).codeName;

    //     //   const coinData = getCoinDataByPair(data, pairCodeName);
    //     //   const codeName = getCoinCodeName(coinData);
    //     //   const seriesData = getChartData(coinData);
    //     //   const unitPrice = getUnitPrice(coinData);
    //     //   const priceChange = getCoinChanges();

    //     //   return {
    //     //     codeName,
    //     //     seriesData,
    //     //     unitPrice,
    //     //     priceChange,
    //     //   };
    //     // });

    //     const fetchedDataClone = { ...fetchedData };
    //     fetchedDataClone[datakey] = {};

    //     states.forEach(({ codeName, ...rest }) => {
    //       const { shortName, ...coin } = getAvailableCoins().find(
    //         (coin) => coin.shortName === codeName,
    //       );
    //       fetchedDataClone[datakey][codeName] = { ...rest, ...coin };
    //     });

    //     setFetchedData(fetchedDataClone);

    //   });
    // }
  }, [activeUnit]);

  return (
    <div className={styles.current_rate_container}>
      <header className={styles.current_rate_header}>
        <Tab
          tabContent={unitTab}
          fcn={(unit) => setActiveUnit(unit)}
          activeTab={activeUnit}
        />
        <h3 className={`section_title ${styles.current_rate_header_title}`}>
          نرخ لحظه‌ای رمزارزها
        </h3>
        <Tab
          tabContent={sortTab}
          fcn={(sort) => setActiveSort(sort)}
          activeTab={activeSort}
          style={{ opacity: 0, visibility: 'hidden' }}
        />
      </header>

      <div className={styles.table_holder}>
        <table className={styles.current_rate_table}>
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
            {tableData.length > 0 &&
              tableData.map((data, index) => (
                <tr key={index}>
                  <td>
                    <div className={styles.currency}>
                      <Image
                        src={data?.icon}
                        className={`${styles.currency_img}`}
                        alt={data?.codeName}
                      />
                      <ul className={styles.currency_name_holder}>
                        <li className={styles.currency_name}>{data?.name}</li>
                        <li className={styles.currency_short_name}>
                          {data?.codeName}
                        </li>
                      </ul>
                    </div>
                  </td>

                  <td className={styles.price}>
                    {data?.rate?.['IRR'] && (
                      <span className={styles.dollar}>
                        {formatNumber(data?.rate?.['IRR'])}
                        <Image
                          src={IconToman}
                          width={25}
                          height={25}
                          alt="unit"
                        />
                      </span>
                    )}
                    {activeUnit === 'coin' && data?.rate?.['USD'] && (
                      <span className={styles.dollar}>
                        {formatNumber(data?.rate?.['USD'])}
                        <Image
                          src={IconTether}
                          width={25}
                          height={25}
                          alt="unit"
                        />
                      </span>
                    )}
                  </td>

                  <td className={styles.price}>
                    <span
                      className={styles.dollar}
                      style={{
                        direction: 'ltr',
                        color: getPriceChangesColor(
                          data?.ohlc?.dailyChangePercentage,
                        ),
                      }}
                    >
                      {data?.ohlc?.dailyChangePercentage ? (
                        (
                          Number(data?.ohlc?.dailyChangePercentage) * 100
                        ).toFixed(2) + '%'
                      ) : (
                        <span
                          style={{
                            direction: 'ltr',
                            color: getPriceChangesColor(
                              data?.ohlc?.dailyChangePercentage,
                            ),
                          }}
                        >
                          -
                        </span>
                      )}
                    </span>
                  </td>

                  <td className={styles.chart_holder}>
                    {data?.ohlc?.dailyChangePercentage &&
                    data?.kline?.length > 0 ? (
                      <ApexChart
                        data={getChartData(data)}
                        strokeColor={getPriceChangesColor(
                          data?.ohlc?.dailyChangePercentage,
                        )}
                      />
                    ) : (
                      <span
                        style={{
                          direction: 'ltr',
                          color: getPriceChangesColor(
                            data?.ohlc?.dailyChangePercentage,
                          ),
                        }}
                      >
                        -
                      </span>
                    )}
                  </td>

                  <td>
                    <Link
                      href="https://arsonex.com/dashboard/exchange"
                      className={styles.bargain}
                    >
                      خرید و فروش
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {tableData.length === 0 && (
          <div className={styles.no_content}>در حال بارگذاری...</div>
        )}
      </div>
    </div>
  );
}

export default TableT1;
