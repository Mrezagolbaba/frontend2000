import LandingLayout from "layouts/Landing";
import BottomBanner from "pages/Home/BottomBanner";

import home from "assets/scss/landing/home.module.scss";
import about from "assets/scss/landing/about-us.module.scss";
import { Breadcrumb, BreadcrumbItem, Container } from "reactstrap";
import friends from "assets/img/unnamed.png";
import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <LandingLayout disableBanner={true}>
      <main className={home["main-wrapper"]}>
        <section className={home["section-holder"]}>
          <Container>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/">آرسونیکس</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active> درباره ما </BreadcrumbItem>
            </Breadcrumb>
            <div className={home["section-holder__title"]}>
              <h3>
                همراه ارز دیجیتال شما،{" "}
                <span className="text-primary">آرسونیکس</span>
              </h3>
              <p
                className={home["section-holder__subtitle"]}
                style={{ fontSize: "1.1rem" }}
              >
                از زمان ظهور دنیای ارز دیجیتال و ورود سریع کاربران ایرانی به این
                عرصه، همواره نیاز به یک پلتفرم تک نرخی صرافی ارز دیجیتال در حالت معامله آسان و فوری احساس می‌شد. نبود چنین امکانی می‌تواند برای معامله‌گران، در تبادل ارزهای دیجیتال اختلافی چشم گیر در مبلغ نهایی ایجاد کند
              </p>
            </div>
            <div
              className={home["section-holder__title"]}
              style={{ marginBottom: "0px" }}
            >
              <img src={friends} />
            </div>
            <div className={about.summary}>
              <div className={about.summary__card}>
                <div className={about["summary__card-body"]}>
                  <p className={about.summary__text}>
                    آرسونیکس (هور تابان تبادل الکترونیک)، به عنوان اولین صرافی
                    ارز دیجیتال در ایران با ارائه ویژگی ذکر شده، برای رفع نیاز
                    این دسته از کاربران ارائه شده و با رفع این نیاز، امکان
                    مبادله‌ی دارایی‌های دیجیتال به صورت تک نرخی را در اختیار
                    کاربران گذاشته است. آرسونیکس همچنین با فراهم آوردن امکان
                    معامله برای افراد مقیم خارج از کشور پا به عرصه ظهور گذاشته و
                    این قابلیت را به کاربران می‌دهد که به روش‌های مختلفی، از
                    جمله تبدیل دارایی‌های خود در کشوری که در آن اقامت دارند
                    (بصورت کاملا قانونی)، به تومان یا ارزهای دیجیتال از تغییرات
                    بازار بهره‌مند شوند و دارایی‌های خود را بدون مشکل معامله
                    کنند.
                  </p>
                </div>
              </div>
            </div>
            {/* <ul className={about["counter-list"]}>
              <li>
                <div>
                  <h5>تعداد کاربران فعال</h5>
                  <span>
                    <strong>12345</strong>
                    نفر
                  </span>
                </div>
              </li>
              <li>
                <div>
                  <h5>تعداد معاملات</h5>
                  <span>
                    <strong>12345</strong>
                    نفر
                  </span>
                </div>
              </li>
            </ul> */}
          </Container>
        </section>
        <BottomBanner />
      </main>
    </LandingLayout>
  );
}
