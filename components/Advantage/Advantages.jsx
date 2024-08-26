import React, { useEffect, useState } from 'react';
import Advantage from './Advantage';
import SelectBox from '../SelectBox/SelectBox';
import styles from '../Advantage/Advantage.module.css';
import MgIcon from '../../public/images/iran.png';
import UeIcon from '../../public/images/usa.png';
import CoinConverter from '../CoinConverter/CoinConverter';
import { getAllCoins } from '@/helpers/api';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { ADMIN_ADDRESS } from '@/data/config';
import { formatNumber, normalizeAmount } from '@/helpers/number';

export default function Advantages({ dark }) {
  const router = useRouter();
  const countries = [
    { value: 'IRR', label: 'تومان', icon: MgIcon.src },
    { value: 'TRY', label: 'تتر', icon: UeIcon.src },
  ];

  const subject = [
    { value: 'subject1', label: 'انتخاب موضوع' },
    { value: 'subject2', label: 'انتخاب موضوع2' },
  ];

  const [bandsBtnCls, setBandsBtnCls] = useState(
    `${styles.actions_button} ${styles.actions_button_load}`,
  );
  const [cryptoData, setCryptoData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [change, setchange] = useState({
    changeFrom: '100000',
    changeTo: '',
    support: '',
  });

  useEffect(() => {
    getAllCoins('coins').then((data) => {
      const list = data.filter((item) => item.codeName !== 'USDT');
      setCryptoData(list);
    });
  }, []);

  const handleChangeForm = (event) => {
    const { name, value } = event.target;
    setchange({ ...change, [name]: value });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((Number(currentIndex) + 1) % cryptoData.length);

      setBandsBtnCls(styles.actions_button);
      setTimeout(() => {
        setBandsBtnCls(
          `${styles.actions_button} ${styles.actions_button_load}`,
        );
      }, 10);
    }, 3000);

    return () => clearInterval(interval);
  }, [cryptoData, currentIndex]);

  const currentCrypto = cryptoData?.[currentIndex];

  const handleRoute = (e) => {
    e.preventDefault();
    router.push(`${ADMIN_ADDRESS}/support`);
    // window.location.replace(`${ADMIN_ADDRESS}/support`)
  };

  return (
    <section className={styles.options_holder}>
      <Advantage
        className={styles.adv1}
        title="به راحتی بیش از ۳۰ واحد پول مختلف را با ارز دیجیتال معامله کنید"
        description="در آرسونیکس، می‌توانید از سرویس‌های ویژه‌ای که برای تبدیل دارایی‌های خود در کشور محل اقامتتان فراهم کرده‌ایم، مانند معامله، واریز یا برداشت فیات دیجیتال، بهره‌مند شوید."
        address="https://help.arsonex.com/trading-methods/"
        actionHolderCls={styles.adv1_holder}
      >
        <CoinConverter {...{ dark }} />
      </Advantage>

      <Advantage
        className={styles.adv2}
        title="۲۴/۷ پاسخگوی شما هستیم"
        description="شما می‌توانید به‌صورت ۲۴ ساعته و در تمام ایام هفته از خدمات پشتیبانی آرسونیکس بهره‌مند شوید. این خدمات از طریق چت آنلاین، تماس تلفنی و یا ارسال تیکت در دسترس شما قرار دارد تا در هر زمان که نیاز داشته باشید، پشتیبانی لازم را دریافت کنید."
      >
        <form>
          {/* <SelectBox
            key="3"
            className={styles.select_subject}
            subject={subject}
            defaultVal={subject[0]}
          /> */}

          <div className={`${styles.input_holder} ${styles.mt_25}`}>
            <input
              type="text"
              name="support"
              placeholder="توضیحات"
              value={change.support}
              onChange={handleChangeForm}
            />
          </div>

          <button
            // href={`${ADMIN_ADDRESS}/support`}
            className={styles.actions_button}
            onClick={handleRoute}
          >
            درخواست پشتیبانی
          </button>
        </form>
      </Advantage>

      <Advantage
        className={styles.adv3}
        title={
          <>
            با کمترین نرخ کارمزد، <br />
            خرید و فروش کنید
          </>
        }
        description="ارائه خدمات با کیفیت بالا و تأمین امنیت در یک پلتفرم معاملاتی ارز دیجیتال از مهم‌ترین ویژگی‌هایی است که باید مورد توجه قرار گیرد. آرسونیکس این ویژگی‌ها را با کارمزدی پایین فراهم کرده و تجربه‌ای لذت‌بخش را برای استفاده از این خدمات در اختیار شما قرار می‌دهد."
        address="https://help.arsonex.com/fees/"
      >
        <div className={styles.commission}>
          <h6>نرخ کارمزد</h6>

          <ul
            className={`${styles.commission_chart} ${
              dark && styles.dark_commission_chart
            }`}
          >
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </Advantage>

      <Advantage
        className={styles.adv4}
        title={
          <>
            با یک نرخ بخرید <br /> و با همان نرخ بفروشید
          </>
        }
        description="آیا همیشه نگران پر شدن سفارش خرید یا فروش خود هستید؟ آیا اختلاف نرخ بین خرید و فروش در معاملات سریع (OTC) باعث ضرر شما می‌شود؟ با استفاده از قابلیت معاملات تک نرخی خرید و فروش سریع آرسونیکس، می‌توانید از تجربه‌ای مطمئن و بدون دغدغه لذت ببرید."
      >
        <div className={styles.currency}>
          <Image
            width={36}
            height={36}
            src={currentCrypto?.icon}
            className={styles.currency_img}
            alt="currency"
          />

          <ul className={styles.currency_name_holder}>
            <li className={styles.currency_name}>{currentCrypto?.name}</li>
            <li className={styles.currency_short_name}>
              {currentCrypto?.shortName}
            </li>
          </ul>
        </div>

        <ul className={styles.price}>
          <li>
            قیمت خرید{' '}
            <span>
              {normalizeAmount(
                currentCrypto?.rate?.['IRR'],
                'IRR',
                false,
                false,
              )}
            </span>
          </li>
          <li>
            قیمت فروش{' '}
            <span>
              {normalizeAmount(
                currentCrypto?.rate?.['IRR'],
                'IRR',
                false,
                false,
              )}
            </span>
          </li>
        </ul>

        <button className={bandsBtnCls}>خرید و فروش</button>
      </Advantage>
    </section>
  );
}
