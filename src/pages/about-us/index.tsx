import LandingLayout from "layouts/Landing";
import BottomBanner from "pages/Home/BottomBanner";

import home from "assets/scss/landing/home.module.scss";
import about from "assets/scss/landing/about-us.module.scss";
import { Container } from "reactstrap";

export default function AboutUs() {
  return (
    <LandingLayout disableBanner={true}>
      <main className={home["main-wrapper"]}>
        <section className={home["section-holder"]}>
          <Container>
            <div className={home["section-holder__title"]}>
              <h3>
                همراه ارز دیجیتال شما{" "}
                <span className="text-primary">آرسونیکس</span>
              </h3>
              <p className={home["section-holder__subtitle"]}>
                راهی آسان برای ارتباط بین سادگی و سرعت در اختیار شماست، آسودگی
                خاطر از کیفیت دریافت خدمات در دنیای دیجیتال را برای شما به
                تجربه‌ای فراموش نشدنی تبدیل خواهیم کرد.
              </p>
            </div>
            <div className={about.summary}>
              <div className={about.summary__card}>
                <div className={about["summary__card-body"]}>
                  <p className={about.summary__text}>
                    همراه کمبود یک پلتفرم که قابلیت که علاوه بر تومان از
                    فیات‌های بین‌المللی دیگری پشتیبانی کند در ایران حس می‌شد،
                    آرسونیکس (هور تابان تجارت الکترونیک) با استفاده از تمام
                    ظرفیت‌های قانونی که ایرانیان می‌توانند از آن بهره‌مند شوند
                    اقدام به ایجاد به پلتفرمی تک نرخی برای معامله و مبادله ارز
                    دیجیتال و فیات را در ایران فراهم کرد تا هم ایرانیان ساکن
                    کشورهای دیگر بتوانند تجربه‌ای نوین را در استفاده از ارز
                    دیجیتال داشته باشند هم ایرانیان داخل ایران بتوانند از
                    تک‌نرخی بودن و کیفیت بالای یک پلتفرم بومی بهره‌مند شوند.
                  </p>
                </div>
              </div>
            </div>
            <ul className={about["counter-list"]}>
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
            </ul>
          </Container>
        </section>
        <BottomBanner />
      </main>
    </LandingLayout>
  );
}
