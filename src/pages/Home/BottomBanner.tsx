import { Button, Container } from "reactstrap";
import home from "assets/scss/landing/home.module.scss";
import { useAppSelector } from "store/hooks";
import { Link } from "react-router-dom";

const BottomBanner = () => {
  const { id, firstTierVerified } = useAppSelector((state) => state.user);
  return (
    <section className={home["bottom-banner"]}>
      <Container>
        <div className={home["bottom-banner__container"]}>
          <h2 className={home["bottom-banner__title"]}>
            آرسونیکس ، بهترین نرخ و کمترین کارمزد
          </h2>
          <p className={home["bottom-banner__desc"]}>
            در کمتر از دو دقیقه، با احراز هویت خودکار؛
            اولین معامله را انجام خواهید داد
          </p>
          <Link
            to={id && firstTierVerified ? "/dashboard" : "/register"}
            className={`btn btn-light ${home["bottom-banner__button"]}`}
          >
            شروع کنید
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default BottomBanner;
