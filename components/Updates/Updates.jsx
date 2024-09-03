import React from 'react';
import styles from './Updates.module.css';

export default function Updates() {
  const updatesDetails = [
    {
      number: 'V Beta - 1403/03/03',
      title: 'لانچ ورژن بتا',
      description:
        'نسخه بتای آرسونیکس برای کاربرانی که در فرآیند پیش‌ثبت‌نام شرکت کرده‌اند، منتشر شد.',
      improvement: [
        'اصلاح روند احراز هویت',
        'نمایش مبلغ خالص دریافتی پس از کسر کارمزد در فرآیند برداشت دارایی',
        'رفع مشکل ارسال پیامک به کشورهای حوزه اسکاندیناوی',
        'رفع مشکل دریافت دارایی از پلتفرم‌های کیف پول الکترونیک بین‌المللی',
        'رفع تداخل در تأیید برداشت دارایی با استفاده از اپلیکیشن‌های احراز هویت دو مرحله‌ای (2FA)',
      ],
    },
    {
      number: 'V 1.0.0 - 1403/06/20',
      title: 'باز طراحی صفحات وب سایت',
      description:
        'در نسخه جدید آرسونیکس، تمامی صفحات بازطراحی شده‌اند. در این نسخه، با توجه به بازخوردهای کاربران اولیه که در نسخه بتا گزارش‌هایی جهت بهبود ارائه داده بودند، تلاش شده تا تجربه کاربری بهبود یابد. همچنین، صفحاتی مانند "بروزرسانی" به صفحات قبلی اضافه شده و قابلیت حالت روز و شب برای استفاده آسان‌تر در ساعات مختلف شبانه‌روز در دسترس خواهد بود.',
      title2: 'باز طراحی کیف پول',
      description2:
        'در این نسخه، بخش کیف پول به‌طور کامل بازطراحی شده است. بخش‌های واریز و برداشت هر ارز به‌صورت جداگانه در دسترس شما قرار گرفته‌اند و تجربه کاربری بهتری را برای شما فراهم کرده‌اند.',
      improvement: [
        'بهبود بخش انتخاب کد کشور در صفحات ورود و ثبت‌نام',
        'رفع مشکل ارسال مجدد مدارک در بخش احراز هویت',
      ],
    },
  ];
  return (
    <main className="container">
      <section className={styles.terms_banner}>
        <h2 className={`title ${styles.terms_title}`}>آخرین بروزرسانی ها</h2>
        <p className={styles.terms_description}>
          در جریان آخرین تغییرات آرسونیکس باشید{' '}
        </p>
      </section>

      <section className={styles.last_changes_holder}>
        {updatesDetails.map((item, index) => (
          <article key={index} className={styles.changes_box}>
            <h6 className={styles.version}>{item.number}</h6>
            {item.description && (
              <div className={styles.updates_details}>
                <h6 className={styles.updates_details_title}>{item.title}</h6>
                <p className={styles.updates_details_description}>
                  {item.description}
                </p>
              </div>
            )}
            {item.description2 && (
              <div className={styles.updates_details}>
                <h6 className={styles.updates_details_title}>{item.title2}</h6>
                <p className={styles.updates_details_description}>
                  {item.description2}
                </p>
              </div>
            )}
            <div className={styles.updates_details}>
              <h6 className={styles.updates_details_title}>
                بهبود و رفع باگ‌ها
              </h6>
              <ul className={styles.updates_details_list}>
                {item.improvement.map((items, index) => (
                  <li key={index}>{items}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
