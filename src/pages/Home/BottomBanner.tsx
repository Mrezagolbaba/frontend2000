import { Button, Container } from "reactstrap";
import home from "assets/scss/landing/home.module.scss";
import { useAppSelector } from "store/hooks";

const BottomBanner = () => {
  const { id } = useAppSelector((state) => state.user);
  return (
    <section className={home["bottom-banner"]}>
      <Container>
        <div className={home["bottom-banner__container"]}>
          <h2 className={home["bottom-banner__title"]}>
            آرسونیکس یعنی؛ بهترین نرخ و کمترین کارمزد
          </h2>
          <p className={home["bottom-banner__desc"]}>
            در کمتر از دو دقیقه بدون ارسال هیچ مدرکی اولین معامله را انجام
            خواهید داد
          </p>
          <Button
            href={id ? "/dashboard" : "/register"}
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
