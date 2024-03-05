import Wallet from "assets/img/logo-wallex.png";
import Notifications from "assets/img/icons/notification.svg";
import Support from "assets/img/icons/support.svg";
import Setting from "assets/img/icons/setting.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import dashboard from "assets/scss/dashboard/dashboard.module.scss";

interface Props {
  onSidebarToggle: () => void;
}

const Header = ({ onSidebarToggle }: Props) => {
  const [isLeftMenuOpen, setIsLefMenuOpen] = useState<boolean>(false);
  return (
    <header className={dashboard.header}>
      <Card className={dashboard.card}>
        <CardBody className={dashboard["card-body"]}>
          <div className={dashboard.header__logo}>
            <a href="#">
              <img src={Wallet} alt="" className="logo" />
            </a>
          </div>
          <ul className={dashboard.header__navbar}>
            <li>
              <a href="/dashboard/exchange">خرید و فروش سریع</a>
            </li>
            <li>
              <a href="/dashboard/market">بازارها</a>
            </li>
            <li>
              <a href="/dashboard/wallet">واریز و برداشت</a>
            </li>
            <li>
              <a href="https://help.arsonex.com/"> مرکز راهنمایی </a>
            </li>
          </ul>
          <div className={dashboard.header__support}>
            <a href="/dashboard/support" className="">
              <span className="icon">
                <img src={Support} alt="support" />
              </span>
              <span style={{ marginRight: "10px" }}>پشتیبانی</span>
            </a>
          </div>
          <div>
            <a href="/dashboard/setting">
              <span className="icon">
                <img src={Setting} alt="setting" />
              </span>
            </a>
          </div>
          {/* <div className={dashboard.header__notification}>
            <a href="/dashboard/notification">
              <span className="icon">
                <img src={Notifications} alt="notification" />
              </span>
            </a>
          </div> */}

          {/* <div className={dashboard.header__subheader}>
                <button
                  className={dashboard["header__hamburger-btn"]}
                  onClick={() => onSidebarToggle()}
                >
                  <span className="icon">
                    <GiHamburgerMenu />
                  </span>
                </button>
                <button
                  className={dashboard["header__hamburger-btn"]}
                  onClick={() => setIsLefMenuOpen(true)}
                >
                  <span className="icon">
                    <GiHamburgerMenu />
                  </span>
                </button>
                <ul
                  className={`${dashboard.header__navbar} ${isLeftMenuOpen ? dashboard.expanded : ""
                    }`}
                >
                  <li className={dashboard.header__navbar__close}>
                    <button onClick={() => setIsLefMenuOpen(false)}>
                      <li>
                        <a href="/dashboard/buy-sell">خرید و فروش سریع</a>
                      </li>
                    </button>
                  </li>
                </ul>
                <div className={dashboard.header__support}>
                  <a href="/support" className="">
                    <span className="icon">
                      <img src={Support} alt="support" />
                    </span>
                    پشتیبانی
                  </a>
                </div>
                <div>
                  <a href="/setting">
                    <span className="icon">
                      <img src={Setting} alt="setting" />
                    </span>
                  </a>
                </div>
                <div className={dashboard.header__notification}>
                  <a href="/notification">
                    <span className="icon">
                      <img src={Notifications} alt="notification" />
                    </span>
                  </a>
                </div>
              </div> */}
          <div className={dashboard.header__subheader}>
            <button
              className={dashboard["header__hamburger-btn"]}
              onClick={() => onSidebarToggle()}
            >
              <span className="icon">
                <GiHamburgerMenu />
              </span>
            </button>
            <button
              className={dashboard["header__hamburger-btn"]}
              onClick={() => setIsLefMenuOpen(true)}
            >
              <span className="icon">
                <GiHamburgerMenu />
              </span>
            </button>
            <ul
              className={`${dashboard.header__navbar} ${
                isLeftMenuOpen ? dashboard.expanded : ""
              }`}
            >
              <li className={dashboard.header__navbar__close}>
                <button onClick={() => setIsLefMenuOpen(false)}>
                  <span className="icon">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M13 1L1 13" stroke="#03041B" />
                      <path d="M13 13L1 0.999999" stroke="#03041B" />
                    </svg>
                  </span>
                </button>
              </li>
              <li>
                <a href="/dashboard/market">بازارها</a>
              </li>
              {/* <li>
                <a href="#">خرید و فروش پیشرفته</a>
              </li> */}
              <li>
                <a href="/dashboard/exchange">خرید و فروش سریع</a>
              </li>
            </ul>
          </div>
        </CardBody>
      </Card>
    </header>
  );
};
export default Header;
