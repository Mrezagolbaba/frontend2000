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
                از هیچ معامله ای{" "}
                <span className="text-primary">عقب نمیمونی!</span>
              </h3>
              <p className={home["section-holder__subtitle"]}>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است،
              </p>
            </div>
            <div className={about.summary}>
              <div className={about.summary__card}>
                <div className={about["summary__card-body"]}>
                  <p className={about.summary__text}>
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                    با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه
                    و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی
                    تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای
                    کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و
                    آینده، شناخت فراوان جامعه و متخصصان را می طلبد،
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
