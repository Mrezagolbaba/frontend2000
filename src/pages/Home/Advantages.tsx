import React from "react";

import feature003 from "assets/img/features/feature003.png";
import feature004 from "assets/img/features/feature004.png";
import feature001 from "assets/img/features/feature001.png";
import feature002 from "assets/img/features/feature002.png";

import dashboard from "assets/img/lay/dashboard.png";

import home from "assets/scss/landing/home.module.scss";
import { Col, Container, Row } from "reactstrap";

const Advantages = () => {
  return (
    <section className={home.features}>
      <div className={home["section-title"]}>
        <h3 className={home["section-title__title"]}>
          مزایای استفاده از <span className="text-primary">آرسونیکس</span>
        </h3>
      </div>
      <section className={home["features__wrapper"]}>
        <Container>
          <Row>
            <Col md={6}>
              <div className={home.feature}>
                <div className={home["feature__image"]}>
                  <img src={feature003} />
                </div>
                <div className={home["feature__body"]}>
                  <h3 className={home["feature__title"]}>پشتیبانی آنلاین</h3>
                  <p className={home["feature__text"]}>
                    شما می‌توانید در ۲۴ ساعت شبانه‌روز از پشتیبانی آرسونیکس که
                    در ایران و خارج از ایران فعالیت می‌کند سوالات خود را بپرسید
                    و به سرعت به پاسخ برسید.
                  </p>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className={home.feature}>
                <div className={home["feature__image"]}>
                  <img src={feature004} />
                </div>
                <div className={home["feature__body"]}>
                  <h3 className={home["feature__title"]}>کارمزد منصفانه</h3>
                  <p className={home["feature__text"]}>
                    کارمزد معاملات فیات‌های مختلف در آرسونیکس در کمترین سطح ممکن
                    قرار دارند. همچنین با توجه به معامله تک‌ نرخی ارزهای دیجیتال
                    شما ارزان‌ترین معاملات را در آرسونیکس تجربه می‌کنید.
                  </p>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className={home.feature}>
                <div className={home["feature__image"]}>
                  <img src={feature001} />
                </div>
                <div className={home["feature__body"]}>
                  <h3 className={home["feature__title"]}>
                    خرید و فروش سریع و تک نرخی
                  </h3>
                  <p className={home["feature__text"]}>
                    اختلاف نرخ و کارمزد زیاد در خرید و فروش سریع صرافی‌ها همیشه
                    یک چالش برای کاربران بوده، در آرسونیکس با یک نرخ کوین،
                    میم‌کوین‌ یا فیات‌ دیجیتال را معامله کنید.
                  </p>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className={home.feature}>
                <div className={home["feature__image"]}>
                  <img src={feature002} />
                </div>
                <div className={home["feature__body"]}>
                  <h3 className={home["feature__title"]}>امنیت</h3>
                  <p className={home["feature__text"]}>
                    مهم‌ترین هدف فنی آرسونیکس، حفظ دارایی مشتریان و انجام
                    معاملات در محیطی کاملا امن می‌باشد. تیم امنیت ما همواره در
                    حال رصد و بروزرسانی‌های بخش‌های امنیتی پلتفرم هستند.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className={home["features__slide"]}>
        <div className={home["features__slide__container"]}>
          <Row className="g-4">
            <Col md={6} tag="a" href="https://help.arsonex.com/">
              <div className={`${home["feature__box"]} ${home["box--blue"]}`}>
                <div className={home["feature__box__caption"]}>
                  <h4 className={home["feature__box__title"]}>
                    پاسخ سوالات شما؛ اینجاست
                  </h4>
                  <h5 className={home["feature__box__subtitle"]}>
                    به تمام سوالات پرتکرار کاربران در مرکز راهنمایی آرسونیکس
                    پاسخ داده‌ایم.
                  </h5>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div
                className={`${home["feature__box"]} ${home["box--darkblue"]}`}
              >
                <div className={home["feature__box__caption"]}>
                  <h4 className={home["feature__box__title"]}>
                    25% درصد کارمزد، برای شما
                  </h4>
                  <h5 className={home["feature__box__subtitle"]}>
                    فقط از دوستان خود دعوت کنید، 35% کارمزد بعد از هر معامله
                    بصورت آنی دریافت کنید.
                  </h5>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>
      <section>
        <Container>
          <div className={home["feature__banner"]}>
            <p>سادگی، با آرسونیکس معنای تازه&zwnj;ای پیدا کرده...</p>
            <img src={dashboard} />
          </div>
        </Container>
      </section>
    </section>
  );
};

export default Advantages;
