import AddFriend from "assets/img/icons/users.svg";
import Exchange from "assets/img/icons/swap.svg";
import Home from "assets/img/icons/house.svg";
import LogoArsonex from "assets/img/logo-arsonex.png";
import Market from "assets/img/icons/chart-simple.svg";
import Wallet from "assets/img/icons/wallet.svg";
import useAuth from "hooks/useAuth";
import { Button, Nav, NavItem } from "reactstrap";
import { CiEdit } from "react-icons/ci";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TbPower } from "react-icons/tb";
import { useAppSelector } from "store/hooks";
import { useLocation, Link, useNavigate } from "react-router-dom";

import dashboard from "assets/scss/dashboard/dashboard.module.scss";

type Props = {
  isOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Sidebar({ isOpen, setIsSidebarOpen }: Props) {
  // ==============|| Hooks ||================= //
  const { firstName, lastName } = useAppSelector((state) => state.user);
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  // ==============|| States ||================= //
  const [activeItem, setActiveItem] = useState("");

  // ==============|| Variables ||================= //
  const items = [
    {
      id: "home",
      path: "/dashboard",
      label: "پیشخوان",
      icon: Home,
    },
    {
      id: "wallet",
      path: "/dashboard/wallet",
      label: "کیف پول",
      icon: Wallet,
    },
    {
      id: "exchange",
      path: "/dashboard/exchange",
      label: "خرید و فروش سریع",
      icon: Exchange,
    },
    {
      id: "market",
      path: "/dashboard/market",
      label: "بازارها",
      icon: Market,
    },
    {
      id: "addFriends",
      path: "/dashboard/add-friends",
      label: " دعوت دوستان",
      icon: AddFriend,
    },
  ];

  // ==============|| Handlers ||================= //
  const handleClick = (key: string) => {
    setActiveItem(key);
  };
  const handleLogout = async () =>
    await logout().then(() => navigate("/login"));

  // ==============|| Life Cycle ||================= //
  useEffect(() => {
    const path = location.pathname;
    setActiveItem(path);
    setIsSidebarOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // ==============|| Render ||================= //
  return (
    <div className={`${dashboard.sidebar} ${isOpen ? dashboard.expanded : ""}`}>
      {/* /\ \/ /\ \/ [clos-button in mobile] /\ \/ /\ \/ */}
      <button
        className={dashboard.sidebar__close}
        onClick={() => setIsSidebarOpen(false)}
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

      {/* /\ \/ /\ \/ [logo and user-info] /\ \/ /\ \/ */}
      <div className={dashboard.sidebar__logo}>
        <Link to="/">
          <img src={LogoArsonex} alt="" className="" />
        </Link>
        {location.pathname !== "/dashboard" && (
          <div className={dashboard.sidebar__user}>
            <span>{firstName[0]}</span>
            <div>
              <h6 className={dashboard.sidebar__user__name}>
                {firstName + " " + lastName}
              </h6>
              <Link
                className="btn btn-outline-secondary profile-btn"
                to="/dashboard/profile"
              >
                <CiEdit />
                پروفایل کاربری
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* /\ \/ /\ \/ [navbar] /\ \/ /\ \/ */}
      <div className={dashboard["sidebar-wrapper"]}>
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
                <span className="icon">
                  <img src={item.icon} width={24} height={24} alt={item.id} />
                </span>
                <span style={{ fontSize: "12px" }}>{item.label}</span>
              </Link>
            </NavItem>
          ))}
          <NavItem
            key="logout"
            className={`${dashboard.sidebar__navbar__item} ${dashboard["item-logout"]}`}
          ></NavItem>
        </Nav>
      </div>

      {/* /\ \/ /\ \/ [logout-button] /\ \/ /\ \/ */}
      <div
        className={`${dashboard.sidebar__navbar__item} ${dashboard["item-logout"]}`}
      >
        <Button
          color="danger"
          outline
          block
          onClick={() => handleLogout()}
          className="my-2"
        >
          <span className="icon mx-2">
            <TbPower />
          </span>
          <span> خروج </span>
        </Button>
      </div>
    </div>
  );
}
