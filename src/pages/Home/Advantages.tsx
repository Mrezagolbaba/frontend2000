import React from "react";

import feature003 from "assets/img/features/feature003.png";
import feature004 from "assets/img/features/feature004.png";
import feature001 from "assets/img/features/feature001.png";
import feature002 from "assets/img/features/feature002.png";

import dashboard from "assets/img/lay/dashboard.png";

const Advantages = () => {
  return (
    <section className="landing-features">
      <div className="section-title">
        <h3 className="section-title__title">
          مزایای استفاده از <span className="text-primary">آرسونیکس</span>
        </h3>
      </div>
      <section className="landing-features__wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="feature">
                <div className="feature-img">
                  <img src={feature003} />
                </div>
                <div className="feature-body">
                  <h3 className="feature-title">پشتیبانی آنلاین</h3>
                  <p className="feature-text">
                    پشتیبانی آرسونیکس به تمام مشکلات شما در ۲۴ ساعت شبانه روز از
                    طریق تیکت، چت آنلاین یا تماس تلفنی کمک می&zwnj;کند.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="feature">
                <div className="feature-img">
                  <img src={feature004} />
                </div>
                <div className="feature-body">
                  <h3 className="feature-title">کارمزد منصفانه</h3>
                  <p className="feature-text">
                    ما به شما تضمین کمترین کارمزد را در بین تمامی صرافی&zwnj;های
                    داخل و خارج ایران می&zwnj;دهیم.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="feature">
                <div className="feature-img">
                  <img src={feature001} />
                </div>
                <div className="feature-body">
                  <h3 className="feature-title">خرید و فروش سریع و تک نرخی</h3>
                  <p className="feature-text">
                    در آرسونیکس تمام ارزها یک نرخ دارند، با یک نرخ
                    می&zwnj;فروشید و با همان نرخ می&zwnj;توانید بخرید؛ در
                    سریع&zwnj;ترین زمان ممکن.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="feature">
                <div className="feature-img">
                  <img src={feature002} />
                </div>
                <div className="feature-body">
                  <h3 className="feature-title">امنیت</h3>
                  <p className="feature-text">
                    اطلاعات و دارایی&zwnj;های شما در امن&zwnj;ترین حالت ممکن
                    نگهداری می&zwnj;شوند و هیچ ارگان و دولتی به آن&zwnj;ها
                    دسترسی نخواهد داشت.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="landing-features__slide">
        <div className="features-slider">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="feature-slide feature-slide--blue">
                <div className="feature-slide-caption">
                  <h4 className="feature-slide-title">
                    بدون تحریم، ریال به دلار یا لیر تبدیل کن
                  </h4>
                  <h5 className="feature-slide-subtitle">
                    در حساب بانکی بین المللی خودت دریافت کن!
                  </h5>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="feature-slide feature-slide--darkblue">
                <div className="feature-slide-caption">
                  <h4 className="feature-slide-title">چرا دلار کاغذی؟</h4>
                  <h5 className="feature-slide-subtitle">
                    با بهترین نرخ بازار سرمایه خودت آنلاین حفظ کن!
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="landing-features__banner">
        <div className="container">
          <div className="feature-banner">
            <p>سادگی، با آرسونیکس معنای تازه&zwnj;ای پیدا کرده...</p>
            <img src={dashboard} />
          </div>
        </div>
      </section>
    </section>
  );
};

export default Advantages;
