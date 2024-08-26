import React, { useContext } from 'react';
import styles from './index.module.css';
import Link from 'next/link';
import Dashboard from '../../public/images/Dashboard.png';
// import dynamic from 'next/dynamic';
import Accordion from '../Accordion/Accordion';
import TableT1 from '../TableT1/TableT1';
import Advantages from '../Advantage/Advantages';
import Profitable from '../Profitable/Profitable';
import ThemeContext from '../ThemeContext';
import Blogs from '../Blog/Blogs';
import Image from 'next/image';
import { ADMIN_ADDRESS } from '@/data/config';

// Dynamically import the ApexChart component
// const ApexChart = dynamic(() => import('../ApexChart'), { ssr: false });

const accordionData = [
  {
    title: 'پلتفرم آرسونیکس چیست؟',
    description:
      'آرسونیکس نخستین بستر معامله ارز دیجیتال در ایران است که امکان خرید و فروش تک‌نرخی را در حالت OTC فراهم می‌کند. همچنین، این پلتفرم خدمات منحصر به فردی را برای ایرانیان مقیم خارج از کشور ارائه می‌دهد.',
  },
  {
    title: 'انجام معامله در آرسونیکس چه مزایایی دارد؟',
    description:
      'در آرسونیکس، علاوه بر سهولت استفاده، به امنیت و سرعت در انجام معاملات، واریز و برداشت سریع دارایی، و همچنین پشتیبانی حرفه‌ای برای پاسخ به هرگونه سوال یا چالش شما توجه ویژه‌ای شده است.',
  },
  {
    title: 'چه روش های معاملاتی در آرسونیکس وجود دارد؟',
    description:
      'در حال حاضر، شما می‌توانید از قابلیت معامله سریع (OTC) و همچنین معامله حرفه‌ای (Spot) در آرسونیکس بهره‌مند شوید.',
  },
  {
    title: 'آرسونیکس تا چه اندازه امن است؟',
    description:
      'بهره‌مندی از جدیدترین تکنولوژی‌های روز دنیا در زیرساخت آرسونیکس و وجود متخصصین مجرب در بخش امنیت، که به‌طور مداوم به رصد و بررسی بخش‌های مختلف می‌پردازند، اصلی‌ترین دغدغه کاربران در زمینه امنیت را به‌طور کامل پوشش می‌دهد.',
  },
];

export default function Index() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <main className={`container ${theme === 'dark' ? 'theme-dark' : ''}`}>
      <section className={styles.banner}>
        <div className={styles.banner_title_holder}>
          <h2 className={`title ${styles.bannert_title}`}>
            معامله ارز دیجیتال و جابجایی بین‌المللی فیات
          </h2>
          <p className={styles.banner_description}>
            در آرسونیکس، ارزهای دیجیتال را با سرعت و امنیت بالا معامله کنید و در
            صورت اقامت در خارج از ایران، از خدمات ویژه بین‌المللی آرسونیکس
            بهره‌مند شوید.
          </p>
          <Link href={`${ADMIN_ADDRESS}/login`} className={styles.blue_btn}>
            همین حالا امتحان کنید
          </Link>
        </div>
        <Image
          width={100}
          height={100}
          src={Dashboard.src}
          className={styles.dashboard_img}
          alt="Dashboard"
        />
      </section>

      <section className={styles.current_rate_holder}>
        <TableT1 />

        <Link href="/coinsList" className={styles.blue_btn}>
          مشاهده همه ارزها
        </Link>
      </section>

      <Advantages dark={theme === 'dark'} />

      {/* <Profitable /> */}

      <section className={styles.acc_holder}>
        <div className={styles.acc_holder_title_holder}>
          <h3 className="section_title">
            سوالاتی که ممکن است برای شما بوجود آمده باشد
          </h3>
        </div>

        <div className={styles.acc_container}>
          {accordionData.map((item, index) => (
            <Accordion
              key={index}
              item={item}
              dark={theme === 'dark'}
              className={styles.question_acc}
            />
          ))}

          <div className={styles.find_answer}>
            <span className={styles.find_answer_title}>
              پاسخ سوال خود را نیافتید؟
            </span>
            <Link href="https://help.arsonex.com/">مرکز راهنمایی آرسونیکس</Link>
          </div>
        </div>
      </section>

      {/* <Blogs /> */}
    </main>
  );
}
