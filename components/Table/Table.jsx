import React from 'react';
import styles from './Table.module.css';
import Link from 'next/link';
import ApexChart from '../ApexChart';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import IconTether from '../../public/images/icon_tether.svg';
import { BASE_URL } from '@/data/config';

export default function Table({ currentTable, children }) {
  const dataEntries = Object.fromEntries(
    currentTable.map(({ shortName }) => [shortName, []]),
  );
  const [lowHigh, setLowHigh] = useState(dataEntries);
  const [chartData, setChartData] = useState(dataEntries);
  const [lastPrice, setlastPrice] = useState(dataEntries);

  useEffect(() => {
    Promise.all(
      currentTable.map(({ shortName }) =>
        fetch(`${BASE_URL}rates?selectedCurrency=${shortName}`),
      ),
    )
      .then((response) => Promise.all(response.map((res) => res.json())))
      .then((response) => {
        const states = response.map((data) => {
          const USD = data.filter((item) => item.pair.endsWith('/USD'))[0];

          const coin = USD.pair.split('/')[0];

          let lowVal = 0;
          let highVal = 0;

          const seriesData = USD.kline?.map(
            ({ open, time, low, high }, index) => {
              if (index === 0) {
                lowVal = Number(low);
                highVal = Number(high);
              } else {
                lowVal = Number(low) < lowVal ? Number(low) : lowVal;
                highVal = Number(high) > highVal ? Number(high) : highVal;
              }

              let date = new Date(Number(time)).getTime();

              if (isNaN(date)) {
                date = new Date(time).getTime();
              }

              return {
                y: Number(open),
                x: date,
              };
            },
          );

          return {
            coin,
            seriesData,
            lowVal,
            highVal,
            lastPrice: USD.rate,
          };
        });

        setChartData(
          Object.fromEntries(
            states.map(({ coin, seriesData }) => [coin, seriesData]),
          ),
        );
        setLowHigh(
          Object.fromEntries(
            states.map(({ coin, lowVal, highVal }) => [
              coin,
              { lowVal, highVal },
            ]),
          ),
        );
        setlastPrice(
          Object.fromEntries(
            states.map(({ coin, lastPrice }) => [coin, lastPrice]),
          ),
        );
      });
  }, [currentTable]);

  return (
    <div className={styles.current_rate_container}>
      <header className={styles.current_rate_header}>{children}</header>

      <div className={styles.table_holder}>
        <table className={styles.current_rate_table}>
          <thead>
            <tr>
              <th className="text_right">ارز</th>
              <th>قیمت واحد</th>
              <th>تغییرات 24 ساعت گذشته</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentTable &&
              currentTable.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className={styles.currency}>
                      <Image
                        width={36}
                        height={36}
                        src={item.icon}
                        className={`${styles.currency_img} ${styles.fiat_icon}`}
                        alt={item.shortName}
                      />
                      <ul className={styles.currency_name_holder}>
                        <li className={styles.currency_name}>{item.name}</li>
                        <li className={styles.currency_short_name}>
                          {item.shortName}
                        </li>
                      </ul>
                    </div>
                  </td>

                  <td className={styles.price}>
                    <span className={styles.dollar}>
                      {lastPrice[item.shortName]}
                      <Image
                        src={IconTether}
                        width={25}
                        height={25}
                        alt="tether"
                      />
                    </span>
                  </td>

                  <td className={styles.price}>
                    <span className={styles.dollar}>
                      {lowHigh[item.shortName]?.lowVal ?? '---'}
                      <Image
                        src={IconTether}
                        width={25}
                        height={25}
                        alt="tether"
                      />
                    </span>
                  </td>

                  <td className={styles.chart_holder}>
                    <ApexChart
                      data={chartData[item.shortName]}
                      strokeColor={`${
                        item.trends == 'upward' ? 'var(--green)' : 'var(--red)'
                      }`}
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
        {currentTable.length === 0 && (
          <div className={styles.no_content}>اطلاعاتی یافت نشد</div>
        )}
      </div>
    </div>
  );
}
