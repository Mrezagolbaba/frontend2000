import Wallet from "assets/img/logo-wallex.png";
import dashboard from "assets/scss/dashboard/dashboard.module.scss";
import { Card, CardBody, Tooltip } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import SettingsIcon from "components/Icons/SettingsIcon";
import SupportIcon from "components/Icons/SupportIcon";
import { useEffect, useState } from "react";
import useAuth from "hooks/useAuth";
import LogoutIcon from "components/Icons/LogoutIcon";

const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const toggle = () => setTooltipOpen(!tooltipOpen);

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
              <Link target="_blank" to="/helper">
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
              <span style={{ marginRight: "10px" }}>پشتیبانی</span>
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
          <div className={dashboard.header__profile} onClick={toggle}>
            <a id="profile-tooltip">
              <span>م</span>
            </a>
            <Tooltip
              className={dashboard.header__profile__btn}
              isOpen={tooltipOpen}
              target="profile-tooltip"
              toggle={toggle}
            >
              <Link to="/dashboard/profile">پروفایل کاربری</Link>
              <a
                onClick={async () =>
                  await logout().then(() => navigate("/login"))
                }
              >
                <LogoutIcon />
                خروج
              </a>
            </Tooltip>
          </div>
        </CardBody>
      </Card>
    </header>
  );
};
export default Header;
