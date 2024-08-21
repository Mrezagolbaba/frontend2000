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

// Dynamically import the ApexChart component
// const ApexChart = dynamic(() => import('../ApexChart'), { ssr: false });

const accordionData = [
  {
    title: 'چه ارزهایی در آرسونیکس قابل معامله با هم هستند؟',
    description:
      'در شرایط غیرعادی و وقوع اتفاقات ناگهانی، مانند بلایای طبیعی، جنگ، شورش، اعتصاب، تحریم، قطع ارتباطات داخلی و بین‌المللی، آرسونیکس کلیه تلاش‌های لازم را برای ارائه خدمات خود به کاربران انجام می‌دهد. اما در نهایت، مسئولیتی در قبال انجام نشدن تعهدات خود ندارد.',
  },
  {
    title: 'چه روش‌های معاملاتی در آرسونیکس وجود دارید؟',
    description:
      'در شرایط غیرعادی و وقوع اتفاقات ناگهانی، مانند بلایای طبیعی، جنگ، شورش، اعتصاب، تحریم، قطع ارتباطات داخلی و بین‌المللی، آرسونیکس کلیه تلاش‌های لازم را برای ارائه خدمات خود به کاربران انجام می‌دهد. اما در نهایت، مسئولیتی در قبال انجام نشدن تعهدات خود ندارد.',
  },
  {
    title: 'نگهداری فیات‌های دیجیتال در آرسونیکس چقدر امن است؟',
    description:
      'در شرایط غیرعادی و وقوع اتفاقات ناگهانی، مانند بلایای طبیعی، جنگ، شورش، اعتصاب، تحریم، قطع ارتباطات داخلی و بین‌المللی، آرسونیکس کلیه تلاش‌های لازم را برای ارائه خدمات خود به کاربران انجام می‌دهد. اما در نهایت، مسئولیتی در قبال انجام نشدن تعهدات خود ندارد.',
  },
  {
    title: 'نگهداری ارزهای دیجیتال در آرسونیکس چقدر امن است؟',
    description:
      'در شرایط غیرعادی و وقوع اتفاقات ناگهانی، مانند بلایای طبیعی، جنگ، شورش، اعتصاب، تحریم، قطع ارتباطات داخلی و بین‌المللی، آرسونیکس کلیه تلاش‌های لازم را برای ارائه خدمات خود به کاربران انجام می‌دهد. اما در نهایت، مسئولیتی در قبال انجام نشدن تعهدات خود ندارد.',
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
            در آرسونیکس، ارزهای دیجیتال یا ارزهای رایج مانند دلار، پوند، لیر و
            ریال را سریع و امن معامله کنید و به‌راحتی ارزهای رایج را از یک کشور
            به کشور دیگر منتقل کنید.
          </p>
          <Link href="#" className={styles.blue_btn}>
            همین حالا امتحان کنید
          </Link>
        </div>
        <img
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

      <Profitable />

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

      <Blogs />
    </main>
  );
}
