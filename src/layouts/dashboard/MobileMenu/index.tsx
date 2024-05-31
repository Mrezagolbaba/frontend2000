import dashboard from "assets/scss/dashboard/dashboard.module.scss";
import { Link } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
import Home from "components/Icons/HomeIcon";
import Market from "components/Icons/MarketsIcon";
import Wallet from "components/Icons/WalletIcon";
import Exchange from "components/Icons/ExchangeIcon";
import MORE from "components/Icons/MoreAppIcon";
import { useEffect, useState } from "react";
export default function MobileMenu() {
  // ==============|| States ||================= //
  const [activeItem, setActiveItem] = useState("");

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
      icon: <MORE />,
    },
  ];

  // ==============|| Handlers ||================= //
  const handleClick = (e, key: string) => {
    e.preventDefault();
    setActiveItem(key);
  };

  // ==============|| Life Cycle ||================= //
  useEffect(() => {
    const path = location.pathname;
    setActiveItem(path);
  }, []);

  // ==============|| Render ||================= //
  return (
    <div className={dashboard["mobile-menu"]}>
      <Nav>
        {items.map((item, key) => (
          <NavItem
            key={key}
            className={activeItem === item.path ? dashboard.active : ""}
            onClick={(e) => handleClick(e, item.path)}
          >
            <Link to={item.path}>
              <span className={dashboard["icon-item"]}>{item.icon}</span>
              <span className={dashboard["sub-item"]}>{item.label}</span>
            </Link>
          </NavItem>
        ))}
      </Nav>
    </div>
  );
}
