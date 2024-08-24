import React, { useEffect, useState } from 'react';
import Advantage from './Advantage';
import SelectBox from '../SelectBox/SelectBox';
import styles from '../Advantage/Advantage.module.css';
import MgIcon from '../../public/images/iran.png';
import UeIcon from '../../public/images/usa.png';
import CoinConverter from '../CoinConverter/CoinConverter';
import { getAllCoins } from '@/helpers/api';
import Image from 'next/image';

export default function Advantages({ dark }) {
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
      setCurrentIndex((currentIndex + 1) % cryptoData.length);

      setBandsBtnCls(styles.actions_button);
      setTimeout(() => {
        setBandsBtnCls(
          `${styles.actions_button} ${styles.actions_button_load}`,
        );
      }, 10);
    }, 1500);

    return () => clearInterval(interval);
  }, [cryptoData, currentIndex]);

  const currentCrypto = cryptoData?.[currentIndex];

  return (
    <section className={styles.options_holder}>
      <Advantage
        className={styles.adv1}
        title="به راحتی دلار، یورو، لیر و سایر ارزها را معامله کنید"
        description="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک چاپگرها و متون بلکه روزنامه و مجله در ستون سطر آنچنان که لازم است،"
        address="#"
        actionHolderCls={styles.adv1_holder}
      >
        <CoinConverter {...{ dark }} />
      </Advantage>

      <Advantage
        className={styles.adv2}
        title="24 ساعته پشتیبانی آرسونیکس پاسخگوی شما خواهد بود"
        description="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک چاپگرها و متون بلکه روزنامه و مجله در ستون سطر آنچنان که لازم است،"
        address="#"
      >
        <form>
          <SelectBox
            key="3"
            className={styles.select_subject}
            subject={subject}
            defaultVal={subject[0]}
          />

          <div className={`${styles.input_holder} ${styles.mt_25}`}>
            <input
              type="text"
              name="support"
              placeholder="توضیحات"
              value={change.support}
              onChange={handleChangeForm}
            />
          </div>

          <button className={styles.actions_button}>درخواست پشتیبانی</button>
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
        description="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک چاپگرها و متون بلکه روزنامه و مجله در ستون سطر آنچنان که لازم است،"
        address="#"
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
            با یک نرخ بفروشید <br /> و با همان نرخ بخرید
          </>
        }
        description="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک چاپگرها و متون بلکه روزنامه و مجله در ستون سطر آنچنان که لازم است،"
        address="#"
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
            <span>{Number(currentCrypto?.rate?.['USD']).toFixed(6)}</span>
          </li>
          <li>
            قیمت فروش{' '}
            <span>{Number(currentCrypto?.rate?.['USD']).toFixed(6)}</span>
          </li>
        </ul>

        <button className={bandsBtnCls}>خرید و فروش</button>
      </Advantage>
    </section>
  );
}
