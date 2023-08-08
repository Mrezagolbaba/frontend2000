import LogoArsonex from "../../../assets/img/logo-arsonex.png";
import Home from "../../../assets/img/icons/home.svg";
import Wallet from "../../../assets/img/icons/wallet.svg";
import Order from "../../../assets/img/icons/paper.svg";
import History from "../../../assets/img/icons/time-circle.svg";
import AddFriend from "../../../assets/img/icons/add-user.svg";
import Logout from "../../../assets/img/icons/logout.svg";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import React from "react";
import { Menu } from "antd";

import { Link } from "react-router-dom";

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onSidebarToggle }) => {
  const [activeItem, setActiveItem] = useState("");

  const location = useLocation();

  React.useEffect(() => {
    const path = location.pathname;
    setActiveItem(path);
  }, [location]);

  const handleClick = (e: any) => {
    setActiveItem(e.key);
  };
  const items = [
    {
      path: "/",
      label: "پیشخوان",
      icon: <img src={Home} alt="" />,
    },
    {
      path: "/wallet",
      label: "کیف پول",
      icon: <img src={Wallet} alt="" />,
    },
    {
      path: "/orders",
      label: "سفارشات من",
      icon: <img src={Order} alt="" />,
    },
    {
      path: "/history",
      label: "تاریخچه",
      icon: <img src={History} alt="" />,
    },
    {
      path: "/add-friends",
      label: "دعوت دوستان",
      icon: <img src={AddFriend} alt="" />,
    },
    {
      path: "/login",
      label: "خروج از حساب",
      icon: <img src={Logout} alt="" />,
    },
  ];
  const renderItem = (item: any) => (
    <div
      key={item.path}
      className={`navbar__item ${
        activeItem === item.path ? "navbar__item--active" : ""
      }`}
    >
      <Link to={item.path}>
        <span className="icon">{item.icon}</span>
        <span>{item.label}</span>
      </Link>
    </div>
  );

  return (
    <Menu
      onClick={handleClick}
      className={`sidebar ${isOpen ? "expanded" : ""}`}
      // style={{ width: 256 }}
      defaultSelectedKeys={["0"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      //@ts-ignore
      style={
        window.screen.width < 768
          ? { width: 256, position: "sticky", top: 0 }
          : { width: 256, top: 0 }
      }
      selectedKeys={[activeItem]}
    >
      <div className="sidebar__header">
        <button className="sidebar__close" onClick={() => onSidebarToggle()}>
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
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M13 13L1 0.999999"
                stroke="#03041B"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </button>

        <div className="sidebar-logo">
          <a>
            <img src={LogoArsonex} alt="" className="" />
          </a>
        </div>
      </div>
      <ul className="navbar">{items.map(renderItem)}</ul>
    </Menu>
  );
};

export default Sidebar;
