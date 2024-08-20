import Accordion from "components/Accordion";
import ThemeContext from "contexts/ThemeContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

import home from "assets/scss/landing/new-home.module.scss";

const accordionData = [
  {
    title: "چه ارزهایی در آرسونیکس قابل معامله با هم هستند؟",
    description:
      "در شرایط غیرعادی و وقوع اتفاقات ناگهانی، مانند بلایای طبیعی، جنگ، شورش، اعتصاب، تحریم، قطع ارتباطات داخلی و بین‌المللی، آرسونیکس کلیه تلاش‌های لازم را برای ارائه خدمات خود به کاربران انجام می‌دهد. اما در نهایت، مسئولیتی در قبال انجام نشدن تعهدات خود ندارد.",
  },
  {
    title: "چه روش‌های معاملاتی در آرسونیکس وجود دارید؟",
    description:
      "در شرایط غیرعادی و وقوع اتفاقات ناگهانی، مانند بلایای طبیعی، جنگ، شورش، اعتصاب، تحریم، قطع ارتباطات داخلی و بین‌المللی، آرسونیکس کلیه تلاش‌های لازم را برای ارائه خدمات خود به کاربران انجام می‌دهد. اما در نهایت، مسئولیتی در قبال انجام نشدن تعهدات خود ندارد.",
  },
  {
    title: "نگهداری فیات‌های دیجیتال در آرسونیکس چقدر امن است؟",
    description:
      "در شرایط غیرعادی و وقوع اتفاقات ناگهانی، مانند بلایای طبیعی، جنگ، شورش، اعتصاب، تحریم، قطع ارتباطات داخلی و بین‌المللی، آرسونیکس کلیه تلاش‌های لازم را برای ارائه خدمات خود به کاربران انجام می‌دهد. اما در نهایت، مسئولیتی در قبال انجام نشدن تعهدات خود ندارد.",
  },
  {
    title: "نگهداری ارزهای دیجیتال در آرسونیکس چقدر امن است؟",
    description:
      "در شرایط غیرعادی و وقوع اتفاقات ناگهانی، مانند بلایای طبیعی، جنگ، شورش، اعتصاب، تحریم، قطع ارتباطات داخلی و بین‌المللی، آرسونیکس کلیه تلاش‌های لازم را برای ارائه خدمات خود به کاربران انجام می‌دهد. اما در نهایت، مسئولیتی در قبال انجام نشدن تعهدات خود ندارد.",
  },
];

export default function Faq() {
  const { theme } = useContext(ThemeContext);
  return (
    <section className={home.acc_holder}>
      <div className={home.acc_holder_title_holder}>
        <h3 className={home["section-title"]}>
          سوالاتی که ممکن است برای شما بوجود آمده باشد
        </h3>
      </div>

      <div className={home.acc_container}>
        {accordionData.map((item, index) => (
          <Accordion
            key={index}
            item={item}
            dark={theme === "dark"}
            className={home.question_acc}
          />
        ))}

        <div className={home.find_answer}>
          <span className={home.find_answer_title}>
            پاسخ سوال خود را نیافتید؟
          </span>
          <Link to="https://help.arsonex.com/">مرکز راهنمایی آرسونیکس</Link>
        </div>
      </div>
    </section>
  );
}
