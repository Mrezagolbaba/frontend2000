import CloseIcon from "components/Icons/CloseIcon";
import Exchange from "components/Icons/ExchangeIcon";
import Home from "components/Icons/HomeIcon";
import MORE from "components/Icons/MoreAppIcon";
import Market from "components/Icons/MarketsIcon";
import Wallet from "components/Icons/WalletIcon";
import { Link, useNavigate } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
import { useAppSelector } from "store/hooks";
import { useEffect, useState } from "react";

import dashboard from "assets/scss/dashboard/dashboard.module.scss";

export default function MobileMenu() {
  // ==============|| States ||================= //
  const [activeItem, setActiveItem] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // ==============|| hooks ||================= //
  const { secondTierVerified } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  // ==============|| Handlers ||================= //
  const toggleMenu = () => {
    setIsOpen((val) => !val);
  };
  const handleClick = (e, key: string, isHelper) => {
    e.preventDefault();
    setActiveItem(key);
    setIsOpen(false);
    if (isHelper) window.location.replace(key);
    else navigate(key);
  };

  // ==============|| Constants ||================= //
  const items = [
    {
      id: "home",
      path: "/dashboard",
      label: "خانه",
      icon: <Home />,
    },
    {
      id: "wallet",
      path: "/dashboard/wallet",
      label: "کیف پول",
      icon: <Wallet />,
    },
    {
      id: "exchange",
      path: "/dashboard/exchange",
      label: "معامله",
      icon: <Exchange />,
      hasBold: true,
    },
    {
      id: "market",
      path: "/dashboard/market",
      label: "بازارها",
      icon: <Market />,
    },
    {
      id: "addFriends",
      path: "#more",
      label: "بیشتر",
      icon: !isOpen ? <MORE /> : <CloseIcon />,
      onClick: () => toggleMenu(),
    },
  ];
  const otherItems = [
    {
      id: "kyc",
      path: "/dashboard/profile#kyc-section",
      label: "احراز هویت",
    },
    {
      id: "add-friends",
      path: "/dashboard/add-friends",
      label: "دعوت از دوستان",
    },
    {
      id: "accounts",
      path: "/dashboard/profile#iranian-accounts",
      label: "حساب های بانکی",
    },
    {
      id: "helper",
      path: "https://help.arsonex.com/",
      label: "مرکز راهنمایی",
    },
    {
      id: "support",
      path: "/dashboard/support",
      label: "پشتیبانی",
    },
    {
      id: "orders",
      path: "/dashboard/orders",
      label: "سفارشات من",
    },
    {
      id: "history",
      path: "/dashboard/history",
      label: "تاریخچه",
    },
  ];

  // ==============|| Life Cycle ||================= //
  useEffect(() => {
    const path = location.pathname;
    setActiveItem(path);
  }, []);

  // ==============|| Render ||================= //
  return (
    <>
      <div className={dashboard["mobile-menu"]}>
        <Nav>
          {items.map((item, key) => (
            <NavItem
              key={key}
              className={`${activeItem === item.path ? dashboard.active : ""} ${item?.hasBold ? dashboard["bold-item"] : ""}`}
              onClick={(e) =>
                item.onClick ? item.onClick() : handleClick(e, item.path, false)
              }
            >
              <Link to={item.path}>
                <span className={dashboard["icon-item"]}>{item.icon}</span>
                <span className={dashboard["sub-item"]}>{item.label}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
        <div
          className={`${dashboard["more-menu"]} ${isOpen ? dashboard["show-more"] : ""}`}
        >
          <div className={dashboard["more-menu__wrapper"]}>
            <Nav className="row">
              {otherItems.map((item, key) =>
                secondTierVerified &&
                item.path === "/dashboard/profile#kyc-section" ? null : (
                  <NavItem
                    key={key}
                    className={`${activeItem === item.path ? dashboard.active : ""} ${item.id === "kyc" ? "col-12" : "col-4"}`}
                    onClick={(e) => handleClick(e, item.path, true)}
                  >
                    <Link
                      to={item.path}
                      replace={item.id === "helper" ? true : false}
                      target={item.id === "helper" ? "_blank" : "_self"}
                    >
                      <span className={dashboard["sub-item"]}>
                        {item.label}
                      </span>
                    </Link>
                  </NavItem>
                ),
              )}
            </Nav>
          </div>
        </div>
      </div>
    </>
  );
}
