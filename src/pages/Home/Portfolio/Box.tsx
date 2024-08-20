import { Link } from "react-router-dom";

import styles from "./Profitable.module.css";

export default function Box({ item, className }) {
  return (
    <Link to="#" className={`${styles.box} ${className}`}>
      <div className={styles.currency_info_holder}>
        <div className={styles.currency}>
          <img src={item.icon} alt="currency" />
          <ul>
            <li>{item.name} </li>
            <li>{item.shortName}</li>
          </ul>
        </div>

        <div className={styles.currency_chart_holder}>
          <span className={styles.percent}>{item.percent}</span>
        </div>
      </div>

      {item.type != 2 && (
        <ul className={styles.currency_price}>
          <li>
            قیمت امروز<span>{item.today}</span>
          </li>
          {item.type == 1 && (
            <>
              <li>
                پایین‌ترین قیمت<span>{item.low}</span>
              </li>
              <li>
                بالاترین قیمت<span>{item.high}</span>
              </li>
            </>
          )}
        </ul>
      )}
    </Link>
  );
}
