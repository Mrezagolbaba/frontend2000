import { Button, Container } from "reactstrap";

const BottomBanner = () => {
  return (
    <section className="landing-crypto-banner">
      <Container>
        <div className="crypto-banner">
          <h2 className="crypto-banner__title">
            آرسونیکس یعنی؛ بهترین نرخ و کمترین کارمزد
          </h2>
          <p className="crypto-banner__desc">
            در کمتر از 2 دقیقه بدون ارسال هیچ مدرکی اولین معامله را انجام خواهید
            داد
          </p>
          <Button href="/register" tag="a" color="light">
            شروع کنید
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default BottomBanner;
