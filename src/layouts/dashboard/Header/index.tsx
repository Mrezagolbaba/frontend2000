import Wallet from "assets/img/logo-wallex.png";
import Notifications from "assets/img/icons/notification.svg";
import Support from "assets/img/icons/support.svg";
import Setting from "assets/img/icons/setting.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import dashboard from "assets/scss/dashboard/dashboard.module.scss";
import { Link } from "react-router-dom";

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
            <Link to="/dashboard">
              <img src={Wallet} alt="" className="logo" />
            </Link>
          </div>
          <ul className={dashboard.header__navbar}>
            <li>
              <Link to="/dashboard/exchange">خرید و فروش سریع</Link>
            </li>
            <li>
              <Link to="/dashboard/market">بازارها</Link>
            </li>
            <li>
              <Link to="/dashboard/wallet">واریز و برداشت</Link>
            </li>
            <li>
              <Link to="https://help.arsonex.com/"> مرکز راهنمایی </Link>
            </li>
          </ul>
          <div className={dashboard.header__support}>
            <Link to="/dashboard/support" className="">
              <span className="icon">
                <img src={Support} alt="support" />
              </span>
              <span style={{ marginRight: "10px" }}>پشتیبانی</span>
            </Link>
          </div>
          <div>
            <Link to="/dashboard/setting">
              <span className="icon">
                <img src={Setting} alt="setting" />
              </span>
            </Link>
          </div>
          {/* <div className={dashboard.header__notification}>
            <Link to="/dashboard/notification">
              <span className="icon">
                <img src={Notifications} alt="notification" />
              </span>
            </Link>
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
                        <Link to="/dashboard/buy-sell">خرید و فروش سریع</Link>
                      </li>
                    </button>
                  </li>
                </ul>
                <div className={dashboard.header__support}>
                  <Link to="/support" className="">
                    <span className="icon">
                      <img src={Support} alt="support" />
                    </span>
                    پشتیبانی
                  </Link>
                </div>
                <div>
                  <Link to="/setting">
                    <span className="icon">
                      <img src={Setting} alt="setting" />
                    </span>
                  </Link>
                </div>
                <div className={dashboard.header__notification}>
                  <Link to="/notification">
                    <span className="icon">
                      <img src={Notifications} alt="notification" />
                    </span>
                  </Link>
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
                <Link to="/dashboard/market">بازارها</Link>
              </li>
              {/* <li>
                <Link to="#">خرید و فروش پیشرفته</Link>
              </li> */}
              <li>
                <Link to="/dashboard/exchange">خرید و فروش سریع</Link>
              </li>
            </ul>
          </div>
        </CardBody>
      </Card>
    </header>
  );
};
export default Header;
