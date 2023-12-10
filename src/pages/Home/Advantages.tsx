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
                    پشتیبانی آرسونیکس به تمام مشکلات شما در ۲۴ ساعت شبانه روز از
                    طریق تیکت، چت آنلاین یا تماس تلفنی کمک می&zwnj;کند.{" "}
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
                    ما به شما تضمین کمترین کارمزد را در بین تمامی صرافی&zwnj;های
                    داخل و خارج ایران می&zwnj;دهیم.{" "}
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
                    در آرسونیکس تمام ارزها یک نرخ دارند، با یک نرخ
                    می&zwnj;فروشید و با همان نرخ می&zwnj;توانید بخرید؛ در
                    سریع&zwnj;ترین زمان ممکن.
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
                    اطلاعات و دارایی&zwnj;های شما در امن&zwnj;ترین حالت ممکن
                    نگهداری می&zwnj;شوند و هیچ ارگان و دولتی به آن&zwnj;ها
                    دسترسی نخواهد داشت.
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
            <Col md={6}>
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
                    فقط از دوستان خود دعوت کنید، 25% کارمزد بعد از هر معامله
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
