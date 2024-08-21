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
} from '../../helpers/api';
import { formatNumber } from '../../helpers/number';

export function TableT1() {
  const unitTab = [
    {
      code: 0,
      codeName: 'IRR',
      title: (
        <>
          تومان
          <Image src={IconToman} width={25} height={25} alt="toman" />
        </>
      ),
    },
    {
      code: 1,
      codeName: 'USD',
      title: (
        <>
          تتر
          <Image src={IconTether} width={25} height={25} alt="tether" />
        </>
      ),
    },
  ];

  const sortTab = [
    { code: 0, callback: getMostProfitableCoins, title: 'پرسود ترین' },
    { code: 1, callback: getMostLovedCoins, title: 'محبوب ترین' },
    { code: 2, callback: getNewestCoins, title: 'جدید ترین' },
  ];

  const getUnitIcon = (code) =>
    unitTab.find((tab) => tab.code === code).codeName === 'IRR'
      ? IconToman
      : IconTether;

  const getPriceChangesColor = (value) =>
    value >= 0 ? 'var(--green)' : 'var(--red)';

  const [fetchedData, setFetchedData] = useState({});
  const [activeUnit, setActiveUnit] = useState(unitTab[0].code);
  const [activeSort, setActiveSort] = useState(sortTab[0].code);
  const [tableData, setTableData] = useState({});

  useEffect(() => {
    setTableData({});
    const datakey = `${activeUnit}.${activeSort}`;

    if (!fetchedData[datakey]) {
      const callbackFn = sortTab.find(
        (tab) => tab.code === activeSort,
      ).callback;

      callbackFn().then((response) => {
        const states = response.map((data) => {
          const pairCodeName = unitTab.find(
            ({ code }) => code === activeUnit,
          ).codeName;

          const coinData = getCoinDataByPair(data, pairCodeName);
          const codeName = getCoinCodeName(coinData);
          const seriesData = getChartData(coinData);
          const unitPrice = getUnitPrice(coinData);
          const priceChange = getCoinChanges();

          return {
            codeName,
            seriesData,
            unitPrice,
            priceChange,
          };
        });

        const fetchedDataClone = { ...fetchedData };
        fetchedDataClone[datakey] = {};

        states.forEach(({ codeName, ...rest }) => {
          const { shortName, ...coin } = getAvailableCoins().find(
            (coin) => coin.shortName === codeName,
          );
          fetchedDataClone[datakey][codeName] = { ...rest, ...coin };
        });

        setFetchedData(fetchedDataClone);
        setTableData(fetchedDataClone[datakey]);
      });
    } else {
      setTableData(fetchedData[datakey]);
    }
  }, [activeUnit, activeSort]);

  return (
    <div className={styles.current_rate_container}>
      <header className={styles.current_rate_header}>
        <Tab
          tabContent={unitTab}
          fcn={(unit) => setActiveUnit(unit)}
          activeTab={activeUnit}
          label="قیمت واحد:"
        />
        <h3 className={`section_title ${styles.current_rate_header_title}`}>
          نرخ لحظه‌ای رمزارزها
        </h3>
        <Tab
          tabContent={sortTab}
          fcn={(sort) => setActiveSort(sort)}
          activeTab={activeSort}
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
            {Object.keys(tableData).length > 0 &&
              Object.entries(tableData).map(([codeName, data], index) => (
                <tr key={index}>
                  <td>
                    <div className={styles.currency}>
                      <Image
                        src={data.icon}
                        className={`${styles.currency_img} ${styles.fiat_icon}`}
                        alt={codeName}
                      />
                      <ul className={styles.currency_name_holder}>
                        <li className={styles.currency_name}>{data.name}</li>
                        <li className={styles.currency_short_name}>
                          {codeName}
                        </li>
                      </ul>
                    </div>
                  </td>

                  <td className={styles.price}>
                    <span className={styles.dollar}>
                      {formatNumber(data.unitPrice)}
                      <Image
                        src={getUnitIcon(activeUnit)}
                        width={25}
                        height={25}
                        alt="unit"
                      />
                    </span>
                  </td>

                  <td className={styles.price}>
                    <span
                      className={styles.dollar}
                      style={{
                        direction: 'ltr',
                        color: getPriceChangesColor(data.priceChange),
                      }}
                    >
                      {data.priceChange}%
                    </span>
                  </td>

                  <td className={styles.chart_holder}>
                    <ApexChart
                      data={data.seriesData}
                      strokeColor={getPriceChangesColor(data.priceChange)}
                    />
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
        {Object.keys(tableData).length === 0 && (
          <div className={styles.no_content}>در حال بارگذاری...</div>
        )}
      </div>
    </div>
  );
}

export default TableT1;
