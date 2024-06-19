import SettingsIcon from "components/Icons/SettingsIcon";
import SupportIcon from "components/Icons/SupportIcon";
import Wallet from "assets/img/logo-wallex.png";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import dashboard from "assets/scss/dashboard/dashboard.module.scss";
import MobileProfile from "./MobileProfile";

const Header = () => {
  const [activeItem, setActiveItem] = useState("");

  // ==============|| Life Cycle ||================= //
  useEffect(() => {
    const path = location.pathname;
    setActiveItem(path);
  }, []);

  return (
    <header className={dashboard.header}>
      <Card className={dashboard.card}>
        <CardBody className={dashboard["card-body"]}>
          <div className={dashboard.header__logo}>
            <Link to="/dashboard">
              <img src={Wallet} alt="" className="logo" />
            </Link>
          </div>
          <ul
            className={`${dashboard.header__navbar} ${dashboard["hide-in-mobile"]}`}
          >
            <li>
              <Link to="/dashboard/orders">سفارشات من</Link>
            </li>
            <li>
              <Link to="/dashboard/history">تاریخچه</Link>
            </li>
            <li>
              <Link to="/dashboard/wallet">واریز و برداشت</Link>
            </li>
            <li>
              <Link target="_blank" to="https://help.arsonex.com/">
                مرکز راهنمایی
              </Link>
            </li>
          </ul>
          <div
            className={`${dashboard.header__support} ${activeItem === "/dashboard/support" ? dashboard.active : ""}`}
          >
            <Link
              to="/dashboard/support"
              onClick={() => setActiveItem("/dashboard/support")}
            >
              <span className="icon">
                <SupportIcon />
              </span>
            </Link>
          </div>
          <div
            className={`${dashboard.header__settings} ${activeItem === "/dashboard/setting" ? dashboard.active : ""}`}
          >
            <Link
              to="/dashboard/setting"
              onClick={() => setActiveItem("/dashboard/setting")}
            >
              <span className="icon">
                <SettingsIcon />
              </span>
            </Link>
          </div>
          <MobileProfile />
        </CardBody>
      </Card>
    </header>
  );
};
export default Header;
