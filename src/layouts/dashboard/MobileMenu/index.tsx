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
  const handleClick = (e, key: string) => {
    e.preventDefault();
    navigate(key);
    setActiveItem(key);
    setIsOpen(false);
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
      id: "home",
      path: "/dashboard/add-friends",
      label: "دعوت از دوستان",
    },
    {
      id: "wallet",
      path: "/dashboard/profile#iranian-accounts",
      label: "حساب های بانکی",
    },
    {
      id: "exchange",
      path: "/dashboard/profile#kyc-section",
      label: "احراز هویت",
    },
    {
      id: "helper",
      path: "/helper",
      label: "مرکز راهنمایی",
    },
    {
      id: "addFriends",
      path: "/dashboard/support",
      label: "پشتیبانی",
    },
    {
      id: "addFriends",
      path: "/dashboard/profile",
      label: "پروفایل کاربری",
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
        <Nav dir="ltr">
          {items.map((item, key) => {
            if (
              secondTierVerified &&
              item.path === "/dashboard/profile#kyc-section"
            )
              return null;
            else
              return (
                <NavItem
                  key={key}
                  className={`${activeItem === item.path ? dashboard.active : ""} ${item?.hasBold ? dashboard["bold-item"] : ""}`}
                  onClick={(e) =>
                    item.onClick ? item.onClick() : handleClick(e, item.path)
                  }
                >
                  <Link to={item.path}>
                    <span className={dashboard["icon-item"]}>{item.icon}</span>
                    <span className={dashboard["sub-item"]}>{item.label}</span>
                  </Link>
                </NavItem>
              );
          })}
        </Nav>
        <div
          className={`${dashboard["more-menu"]} ${isOpen ? dashboard["show-more"] : ""}`}
        >
          <div className={dashboard["more-menu__wrapper"]}>
            <Nav className="row">
              {otherItems.map((item, key) => (
                <NavItem
                  key={key}
                  className={`${activeItem === item.path ? dashboard.active : ""} col-4`}
                  onClick={(e) => handleClick(e, item.path)}
                >
                  <Link
                    to={item.path}
                    target={item.id === "helper" ? "_blank" : "_self"}
                  >
                    <span className={dashboard["sub-item"]}>{item.label}</span>
                  </Link>
                </NavItem>
              ))}
            </Nav>
          </div>
        </div>
      </div>
    </>
  );
}
