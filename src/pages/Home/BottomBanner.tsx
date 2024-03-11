import { Button, Container } from "reactstrap";
import home from "assets/scss/landing/home.module.scss";
import { useAppSelector } from "store/hooks";

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
            در کمتر از دو دقیقه، بدون ارسال هیچ مدرکی با احراز هویت خودکار؛
            اولین معامله را انجام خواهید داد
          </p>
          <Button
            href={id && firstTierVerified ? "/dashboard" : "/register"}
            tag="a"
            color="light"
            className={home["bottom-banner__button"]}
          >
            شروع کنید
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default BottomBanner;
