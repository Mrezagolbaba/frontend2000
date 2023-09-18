import Wallet from "assets/img/logo-wallex.png";
import Notifications from "assets/img/icons/notification.svg";
import Support from "assets/img/icons/support.svg";
import Setting from "assets/img/icons/setting.svg";
import { GiHamburgerMenu } from "react-icons/gi";

import "./style.scss";
import { useState } from "react";

interface Props {
  onSidebarToggle: () => void;
}

const Header = ({ onSidebarToggle }: Props) => {
  const [isLeftMenuOpen, setIsLefMenuOpen] = useState<boolean>(false);
  return (
    <header className="dashboard-header header">
      <div className="card">
        <div className="card-body">
          <div className="dashboard-header__logo">
            <a href="#">
              <img src={Wallet} alt="" className="logo" />
            </a>
          </div>
          <ul className="dashboard-header__navbar">
            <li>
              <a href="/market">بازارها</a>
            </li>

            <li>
              <a href="/fast-buy-sell">خرید و فروش سریع</a>
            </li>
          </ul>
          <div className="dashboard-header__support">
            <a href="/support" className="">
              <span className="icon">
                <img src={Support} alt="support" />
              </span>
              پشتیبانی
            </a>
          </div>
          <div className="dashboard-header__setting">
            <a href="/setting">
              <span className="icon">
                <img src={Setting} alt="setting" />
              </span>
            </a>
          </div>
          <div className="dashboard-header__notification">
            <a href="/notification">
              <span className="icon">
                <img src={Notifications} alt="notification" />
              </span>
            </a>
          </div>

          <div className="dashboard-header__subheader">
            <button
              className="dashboard-header__hamburger-btn"
              onClick={() => onSidebarToggle()}
            >
              <span className="icon">
                <GiHamburgerMenu />
              </span>
            </button>
            <button
              className="dashboard-header__hamburger-btn"
              onClick={() => setIsLefMenuOpen(true)}
            >
              <span className="icon">
                <GiHamburgerMenu />
              </span>
            </button>
            <ul
              className={`dashboard-header__navbar ${
                isLeftMenuOpen ? "expanded" : ""
              }`}
            >
              <li className="dashboard-header__navbar__close">
                <button
                onClick={() => setIsLefMenuOpen(false)}
                >
                  <span className="icon">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13 1L1 13"
                        stroke="#03041B"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M13 13L1 0.999999"
                        stroke="#03041B"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </svg>
                  </span>
                </button>
              </li>
              <li>
                <a href="#">بازارها</a>
              </li>
              <li>
                <a href="#">خرید و فروش پیشرفته</a>
              </li>
              <li>
                <a href="#">خرید و فروش سریع</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;