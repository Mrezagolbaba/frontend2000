import LandingLayout from "layouts/Landing";
import SpotRate from "./SpotRate";
import Advantages from "./Advantages";
import UserComments from "./UserComments";
import LastBlogs from "./LastBlogs";
import BottomBanner from "./BottomBanner";
import dashboardImage from "assets/img/Dashboard.png";

import home from "assets/scss/landing/new-home.module.scss";
import { useContext } from "react";
import ThemeContext from "contexts/ThemeContext";
import { Link } from "react-router-dom";
import Profitable from "./Portfolio";
import Faq from "./FAQ";
import Blogs from "./Blog/Blogs";

export default function HomePage() {
  const { theme } = useContext(ThemeContext);
  return (
    <LandingLayout>
      <main
        className={`${home.container} ${theme === "dark" ? "theme-dark" : ""}`}
      >
        <section className={home.banner}>
          <div className={home.banner__content}>
            <h2 className={home.title}>
              معامله ارز دیجیتال و جابجایی بین‌المللی فیات
            </h2>
            <p>
              در آرسونیکس، ارزهای دیجیتال یا ارزهای رایج مانند دلار، پوند، لیر و
              ریال را سریع و امن معامله کنید و به‌راحتی ارزهای رایج را از یک
              کشور به کشور دیگر منتقل کنید.
            </p>
            <Link to="#" className={home["blue-btn"]}>
              همین حالا امتحان کنید
            </Link>
          </div>
          <img src={dashboardImage} alt="Dashboard" />
        </section>
        <section className={home["spot-rate"]}>
          <SpotRate />
          <Link to="/coins" className={home["blue-btn"]}>
            مشاهده همه ارزها
          </Link>
        </section>
        <Advantages dark={theme === "dark"} />
        <Profitable />
        <Faq />
        <Blogs />
      </main>
    </LandingLayout>
  );
}
