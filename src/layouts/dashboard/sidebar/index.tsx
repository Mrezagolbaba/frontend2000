import LogoArsonex from "assets/img/logo/dark.png";
import Home from "assets/img/icons/home.svg";
import Wallet from "assets/img/icons/wallet.svg";
import Order from "assets/img/icons/paper.svg";
import History from "assets/img/icons/time-circle.svg";
import AddFriend from "assets/img/icons/add-user.svg";
import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button, Nav, NavItem } from "reactstrap";

import { CiEdit, CiLogout } from "react-icons/ci";

import personIcon from "assets/img/icons/profile.png";

import dashboard from "assets/scss/dashboard/dashboard.module.scss";
import useLogout from "services/auth/logout";
import { useAppSelector } from "store/hooks";

type Props = {
  isOpen: boolean;
  onSidebarToggle: () => void;
};

export default function Sidebar({ isOpen, onSidebarToggle }: Props) {
  const { firstName, lastName } = useAppSelector((state) => state.user);
  const [activeItem, setActiveItem] = useState("");
  const logout = useLogout();

  const location = useLocation();

  React.useEffect(() => {
    const path = location.pathname;
    setActiveItem(path);
  }, [location]);

  const handleClick = (key: string) => {
    setActiveItem(key);
  };
  const handleLogout = async () => {
    try {
      await logout.mutateAsync({}).then((res) => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      });
    } catch (error) {
      console.log(error);
    }
  };
  const items = [
    {
      path: "/dashboard",
      label: "پیشخوان",
      icon: <img src={Home} alt="" />,
    },
    {
      path: "/dashboard/wallet",
      label: "کیف پول",
      icon: <img src={Wallet} alt="" />,
    },
    {
      path: "/dashboard/orders",
      label: "سفارشات من",
      icon: <img src={Order} alt="" />,
    },
    {
      path: "/dashboard/history",
      label: "تاریخچه",
      icon: <img src={History} alt="" />,
    },
  ];

  return (
    <div className={`${dashboard.sidebar} ${isOpen ? dashboard.expanded : ""}`}>
      <button
        className={dashboard.sidebar__close}
        onClick={() => onSidebarToggle()}
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

      <div className={dashboard.sidebar__logo}>
        <Link to="/">
          <img src={LogoArsonex} alt="" className="" />
        </Link>
      </div>
      {location.pathname !== "/dashboard" && (
        <div className={dashboard.sidebar__user}>
          <span>{firstName[0]}</span>
          <div>
            <h6 className={dashboard.sidebar__user__name}>
              {firstName + " " + lastName}
            </h6>
            <Button
              className="profile-btn"
              outline
              color="secondary"
              href="/dashboard/profile"
            >
              <CiEdit />
              پروفایل کاربری
            </Button>
          </div>
        </div>
      )}
      <Nav
        className={`${dashboard.sidebar__navbar} ${
          location.pathname !== "/dashboard" ? dashboard["short-navbar"] : ""
        }`}
        vertical
      >
        {items.map((item) => (
          <NavItem
            key={item.path}
            className={` ${dashboard.sidebar__navbar__item} ${
              activeItem === item.path ? dashboard.active : ""
            }`}
            onClick={() => handleClick(item.path)}
          >
            <Link to={item.path}>
              <span className="icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          </NavItem>
        ))}
        <NavItem
          key="logout"
          className={`${dashboard.sidebar__navbar__item} ${dashboard["item-logout"]}`}
          onClick={() => {}}
        >
          <a
            onClick={handleLogout}
            style={{
              cursor: "pointer",
            }}
          >
            <span className="icon">
              <CiLogout />
            </span>
            <span>خروج از حساب</span>
          </a>
        </NavItem>
      </Nav>
    </div>
  );
}
