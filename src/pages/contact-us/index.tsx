import LandingLayout from "layouts/Landing";
import home from "assets/scss/landing/home.module.scss";

import contact from "assets/scss/landing/contactUs.module.scss";
import { Card, CardBody, Container } from "reactstrap";
import BottomBanner from "pages/Home/BottomBanner";

export default function ContactUs() {
  return (
    <LandingLayout disableBanner={true}>
      <main className={home["main-wrapper"]}>
        <section className={contact.section}>
          <Container>
            <div className={home["section-title"]}>
              <h3 className={home["section-title__title"]}>
                <span className="text-primary">تماس با ما</span>
              </h3>
            </div>
            <div>
              <Card className={contact.card}>
                <CardBody>
                  <h5>تلفن تماس</h5>
                  <a href="#" className="text-primary d-ltr">
                    021-92004581
                  </a>
                </CardBody>
              </Card>
              <Card className={contact.card}>
                <CardBody>
                  <h5>پست الکترونیکی</h5>
                  <a href="#" className="text-primary d-ltr">
                    support@arsonex.com
                  </a>
                </CardBody>
              </Card>
              <Card className={contact.card}>
                <CardBody>
                  <h5>آدرس</h5>
                  <a className="text-primary d-ltr">
                    خیابان ۱۵ خرداد بازار بین الحرمین کوچه شیخ رضا پلاک ۴۶
                  </a>
                </CardBody>
              </Card>
            </div>
            <ul className={contact.social}>
              <li>
                <a href="https://t.me/Arsonexchange">
                  <div
                    className={`${contact["social-tile"]} ${contact["social-telegram"]}`}
                  >
                    <div className={contact["tile-icon"]}>
                      <span className="icon">
                        <svg
                          width="24"
                          height="20"
                          viewBox="0 0 24 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.41718 13.181L9.02018 18.765C9.58818 18.765 9.83418 18.521 10.1292 18.228L12.7922 15.683L18.3102 19.724C19.3222 20.288 20.0352 19.991 20.3082 18.793L23.9302 1.82101L23.9312 1.82001C24.2522 0.324009 23.3902 -0.260991 22.4042 0.106009L1.11418 8.25701C-0.338822 8.82101 -0.316822 9.63101 0.867178 9.99801L6.31018 11.691L18.9532 3.78001C19.5482 3.38601 20.0892 3.60401 19.6442 3.99801L9.41718 13.181Z"
                            fill="#335FFC"
                          ></path>
                        </svg>
                      </span>
                    </div>
                    <h5 className={contact["tile-title"]}>تلگرام</h5>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://twitter.com/Arsonexchange">
                  <div
                    className={`${contact["social-tile"]} ${contact["social-twitter"]}`}
                  >
                    <div className={contact["tile-icon"]}>
                      <span className="icon">
                        <svg
                          width="24"
                          height="21"
                          viewBox="0 0 24 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.90879 20.4913C5.21075 20.4913 2.5976 19.7084 0.352263 18.2266C-0.331846 17.7757 0.0592181 16.668 0.851451 16.7794C2.38236 16.9749 4.10223 16.7174 5.65739 15.945C4.22753 15.3271 3.08365 14.0933 2.5784 12.5148C2.48745 12.2311 2.55819 11.9126 2.77241 11.6982C1.62347 10.6641 0.91006 9.14871 0.91006 7.49982C0.91006 7.11413 1.16167 6.75787 1.56891 6.68325C0.713012 5.04277 0.702907 3.01134 1.68713 1.2584C1.95391 0.783384 2.59052 0.733991 2.92601 1.15331C4.96924 3.72386 7.89969 5.37801 11.0717 5.78051C10.9777 3.67867 12.0215 1.75549 13.899 0.704565C16.0474 -0.49979 18.5969 -0.134069 20.3097 1.60205C21.1484 1.84692 21.9638 1.70399 22.8581 1.15751C23.3694 0.849592 24 1.23318 24 1.83746C24 3.41384 22.8804 5.0312 21.9285 5.87825C21.9972 9.61847 20.6158 13.3041 18.1047 16.047C15.4805 18.9128 11.8598 20.4913 7.90879 20.4913Z"
                            fill="#335FFC"
                          ></path>
                        </svg>
                      </span>
                    </div>
                    <h5 className={contact["tile-title"]}>توییتر</h5>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/Arsonexchange/">
                  <div
                    className={`${contact["social-tile"]} ${contact["social-instagram"]}`}
                  >
                    <div className={contact["tile-icon"]}>
                      <span className="icon">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_165_147)">
                            <path
                              d="M23.4195 4.14449C23.7149 4.90416 23.9211 5.78085 23.9773 7.05607C24.0335 8.33604 24.0383 8.7439 24.0383 12.0023C24.0383 15.2608 24.0242 15.6686 23.968 16.9486C23.9117 18.2238 23.7053 19.096 23.4101 19.8602C22.7865 21.4729 21.5113 22.7482 19.8984 23.3718C19.1389 23.6672 18.2622 23.8734 16.987 23.9296C15.707 23.986 15.2992 23.9999 12.0407 23.9999C8.78228 23.9999 8.37424 23.986 7.09445 23.9296C5.81905 23.8734 4.94712 23.6672 4.18287 23.3718C3.38584 23.0718 2.65914 22.5982 2.05898 21.9887C1.44949 21.3885 0.976072 20.6666 0.671326 19.8602C0.375919 19.1005 0.169519 18.2238 0.113295 16.9486C0.0570706 15.6686 0.0429688 15.2608 0.0429688 12.0023C0.0429688 8.7439 0.0570706 8.33604 0.118057 7.0513C0.174281 5.77609 0.380498 4.90416 0.675904 4.13991C0.976072 3.34288 1.44949 2.61617 2.05898 2.01602C2.65914 1.40176 3.38108 0.932922 4.18763 0.628174C4.94712 0.332951 5.82381 0.126551 7.09903 0.0703262C8.379 0.0141019 8.78685 0 12.0453 0C15.3037 0 15.7116 0.0141019 16.9963 0.0750879C18.2715 0.131312 19.1437 0.337529 19.9077 0.632936C20.7048 0.932922 21.4315 1.40652 22.0316 2.01602C22.6459 2.61617 23.1147 3.33812 23.4195 4.14449Z"
                              fill="#335FFC"
                            ></path>
                            <path
                              d="M12.0442 5.83719C8.64049 5.83719 5.87891 8.59859 5.87891 12.0025C5.87891 15.4063 8.64049 18.1677 12.0442 18.1677C15.448 18.1677 18.2094 15.4063 18.2094 12.0025C18.2094 8.59859 15.448 5.83719 12.0442 5.83719ZM12.0442 16.0017C9.83604 16.0017 8.04492 14.2108 8.04492 12.0025C8.04492 9.79414 9.83604 8.0032 12.0442 8.0032C14.2525 8.0032 16.0434 9.79414 16.0434 12.0025C16.0434 14.2108 14.2525 16.0017 12.0442 16.0017Z"
                              fill="white"
                            ></path>
                            <path
                              d="M19.8925 5.5933C19.8925 6.38814 19.248 7.03261 18.453 7.03261C17.6581 7.03261 17.0137 6.38814 17.0137 5.5933C17.0137 4.79828 17.6581 4.15399 18.453 4.15399C19.248 4.15399 19.8925 4.79828 19.8925 5.5933Z"
                              fill="white"
                            ></path>
                          </g>
                          <defs>
                            <clipPath id="clip0_165_147">
                              <rect width="24" height="24" fill="white"></rect>
                            </clipPath>
                          </defs>
                        </svg>
                      </span>
                    </div>
                    <h5 className={contact["tile-title"]}>اینستاگرام</h5>
                  </div>
                </a>
              </li>
            </ul>
          </Container>
        </section>

        <BottomBanner />
      </main>
    </LandingLayout>
  );
}
