import React from "react";
import { Badge, Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";

import home from "assets/scss/landing/home.module.scss";

const Footer = (): React.JSX.Element => {
  return (
    <footer className={home.footer}>
      <Container>
        <Row className="g-4">
          <Col xs={12} lg={6}>
            <div className="footer-widget newsletter">
              <h3 className={home["footer-widget-title"]}>
                با ما در ارتباط باشید
              </h3>
              <p className={home["footer-text"]}>support@arsonex.com</p>

              <p className={home["footer-text"]}>021-92004581</p>
              <p className={home["footer-text"]}>
                {" "}
                خیابان ۱۵ خرداد بازار بین الحرمین کوچه شیخ رضا پلاک ۴۶{" "}
              </p>
              <p className={home["footer-text"]}>
                ۲۴ ساعت شبانه روز پاسخگوی شما هستیم
              </p>
            </div>
          </Col>
          <Col lg={2} md={4} xs={6}>
            <div className="footer-widget">
              <h3 className={home["footer-widget-title"]}>آرسونیکس</h3>
              <ul className={home["footer-links"]}>
                <li>
                  <Link to="/aboutUs">درباره ما</Link>
                </li>
                <li>
                  <Link to="/contact">تماس با ما</Link>
                </li>
                <li>
                  <Link to="#">کارمزد&zwnj;ها</Link>
                </li>
                <li>
                  <Link to="/coming-soon">بروزرسانی‌ها</Link>
                </li>
                <li>
                  <Link to="/rules">قوانین و مقررات</Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col lg={2} md={4} xs={6}>
            <div className="footer-widget">
              <h3 className={home["footer-widget-title"]}>امکانات</h3>
              <ul className={home["footer-links"]}>
                <li>
                  <a href="https://help.arsonex.com">معامله سریع تک نرخی</a>
                </li>
                <li>
                  <a href="https://help.arsonex.com">
                    واریز و برداشت بین‌المللی
                  </a>
                </li>
                <li>
                  <a href="#">آرسونیکس کارت</a>
                  <Badge className={home["badge-custom"]}>بزودی</Badge>
                </li>
                <li>
                  <a href="#">کسب درآمد</a>
                  <Badge className={home["badge-custom"]}>تا سقف 30%</Badge>
                </li>
              </ul>
            </div>
          </Col>
          <Col lg={2} md={4} xs={6}>
            <div className="footer-widget">
              <h3 className={home["footer-widget-title"]}>راهنمای استفاده</h3>
              <ul className={home["footer-links"]}>
                <li>
                  <a href="https://help.arsonex.com">مرکز راهنمایی</a>
                </li>
                <li>
                  <a href="https://help.arsonex.com">معامله ارز دیجیتال</a>
                </li>
                <li>
                  <a href="https://help.arsonex.com">معامله فیات دیجیتال</a>
                </li>
                <li>
                  <a href="https://help.arsonex.com">احراز هویت فوری</a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>

        <div className={home["footer-bottom"]}>
          <div className={home["footer-copyright"]}>
            © 1399 تا امروز، تمامی حقوق (مادی و معنوی) این وب سایت برای
            آرسونیکس محفوظ است.
          </div>
          <ul className={home["social-media"]}>
            <li>
              <a href="https://t.me/Arsonexchange">
                <span className="icon">
                  <svg
                    width="24"
                    height="23"
                    viewBox="0 0 24 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.6294 1.47854C23.3363 1.10567 22.8972 0.900391 22.3929 0.900391C22.1188 0.900391 21.8284 0.960376 21.5299 1.07901L1.21439 9.14428C0.136268 9.57218 -0.00893449 10.2143 0.000403879 10.559C0.00974225 10.9037 0.189735 11.5363 1.28947 11.9002C1.29606 11.9023 1.30265 11.9044 1.30924 11.9063L5.52323 13.1604L7.80216 19.9378C8.11289 20.8618 8.81034 21.4358 9.6226 21.4358C10.1347 21.4358 10.6385 21.2126 11.0794 20.7906L13.6859 18.2946L17.4665 21.4605C17.4668 21.4609 17.4674 21.4611 17.4678 21.4615L17.5036 21.4916C17.5069 21.4942 17.5104 21.4971 17.5137 21.4997C17.9339 21.8387 18.3926 22.0177 18.8407 22.0179H18.8409C19.7163 22.0179 20.4134 21.344 20.6164 20.3012L23.9451 3.20745C24.0788 2.52133 23.9667 1.90738 23.6294 1.47854ZM6.93296 12.9222L15.063 8.6027L10.0007 14.197C9.91776 14.2885 9.85899 14.4007 9.83006 14.5228L8.85392 18.6349L6.93296 12.9222ZM10.1267 19.7147C10.093 19.7468 10.0591 19.7756 10.0252 19.8021L10.9309 15.9874L12.5783 17.367L10.1267 19.7147ZM22.5669 2.91704L19.2382 20.011C19.2062 20.1745 19.1038 20.5552 18.8407 20.5552C18.7107 20.5552 18.5473 20.4815 18.3802 20.3476L14.0962 16.7603C14.0957 16.7598 14.0949 16.7592 14.0942 16.7588L11.5452 14.6241L18.8659 6.53406C19.1003 6.27508 19.1216 5.87841 18.9163 5.59391C18.7109 5.30941 18.3386 5.21991 18.0341 5.38177L5.99345 11.7791L1.72214 10.5081L22.0315 2.44535C22.203 2.37717 22.3228 2.36289 22.3929 2.36289C22.4359 2.36289 22.5125 2.36822 22.5409 2.40459C22.5782 2.45201 22.6258 2.61369 22.5669 2.91704Z"
                      fill="white"
                      fill-opacity="0.4"
                    ></path>
                  </svg>
                </span>
              </a>
            </li>
            <li>
              <a href="https://twitter.com/Arsonexchange">
                <span className="icon">
                  <svg
                    width="24"
                    height="21"
                    viewBox="0 0 24 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.47287 18.379C2.69487 19.8454 5.28087 20.6202 7.95087 20.6202C11.8609 20.6202 15.4439 19.0581 18.0409 16.222C20.5259 13.5076 21.8929 9.86032 21.8249 6.15896C22.7669 5.32072 23.8749 3.72016 23.8749 2.16016C23.8749 1.56216 23.2509 1.18256 22.7449 1.48728C21.8599 2.02808 21.0529 2.16952 20.2229 1.9272C18.5279 0.209121 16.0049 -0.152799 13.8789 1.03904C12.0209 2.07904 10.9879 3.98224 11.0809 6.06224C7.94187 5.66392 5.04187 4.02696 3.01987 1.48312C2.68787 1.06816 2.05787 1.11704 1.79387 1.58712C0.81987 3.32184 0.82987 5.33216 1.67687 6.9556C1.27387 7.02944 1.02487 7.382 1.02487 7.76368C1.02487 9.39544 1.73087 10.8951 2.86787 11.9185C2.65587 12.1306 2.58587 12.4458 2.67587 12.7266C3.17587 14.2886 4.30787 15.5096 5.72287 16.1211C4.18387 16.8855 2.48187 17.1403 0.96687 16.9469C0.18287 16.8366 -0.20413 17.9328 0.47287 18.379ZM8.15587 16.3884C8.71687 15.9402 8.41887 15.0062 7.71487 14.9906C6.47487 14.9636 5.34587 14.3282 4.64287 13.3287C4.98187 13.3058 5.33287 13.2518 5.66687 13.1582C6.42787 12.9439 6.39187 11.802 5.61887 11.6408C4.21587 11.3475 3.11487 10.2846 2.70187 8.916C3.07887 9.01272 3.46287 9.0668 3.84587 9.07408C4.60487 9.07824 4.89187 8.06632 4.27287 7.64304C2.87787 6.68728 2.28287 4.99936 2.67687 3.41232C5.11287 5.97904 8.41787 7.52552 11.9139 7.70024C12.4149 7.73248 12.7909 7.24264 12.6809 6.74656C12.2059 4.6052 13.3559 3.10448 14.5909 2.41288C15.8129 1.72648 17.7749 1.51224 19.2789 3.15336C19.7259 3.6432 21.2339 3.66192 22.0009 3.47576C21.6569 4.14968 21.1279 4.78928 20.6329 5.14912C20.4219 5.30304 20.3009 5.55888 20.3139 5.82616C20.4749 9.24256 19.2509 12.6392 16.9559 15.1446C14.6439 17.6686 11.4469 19.0591 7.95187 19.0591C6.56187 19.0591 5.19887 18.8241 3.91087 18.3706C5.45087 18.0607 6.91387 17.3826 8.15587 16.3884Z"
                      fill="white"
                      fill-opacity="0.4"
                    ></path>
                  </svg>
                </span>
              </a>
            </li>

            <li>
              <a href="https://www.instagram.com/Arsonexchange/">
                <span className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path
                      d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                      fill="white"
                      fill-opacity="0.4"
                    ></path>
                  </svg>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
