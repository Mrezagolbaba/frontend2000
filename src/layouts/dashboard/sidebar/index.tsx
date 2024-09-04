import LogoArsonex from "assets/img/logo-arsonex.png";
import useAuth from "hooks/useAuth";
import { Button, Collapse, Nav, NavItem } from "reactstrap";
import { CiEdit } from "react-icons/ci";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TbPower } from "react-icons/tb";
import { useAppSelector } from "store/hooks";
import { useLocation, Link, useNavigate } from "react-router-dom";
import WalletIcon from "components/Icons/WalletIcon";
import HomeIcon from "components/Icons/HomeIcon";
import MarketsIcon from "components/Icons/MarketsIcon";
import InviteFriendsIcon from "components/Icons/InviteFriendsIcon";
import TradeIcon from "components/Icons/TradeIcon";
import ArrowIcon from "components/Icons/ArrowIcon";

import dashboard from "assets/scss/dashboard/dashboard.module.scss";

export default function Sidebar() {
  // ==============|| Hooks ||================= //
  const { firstName, lastName } = useAppSelector((state) => state.user);
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  // ==============|| States ||================= //
  const [isOpenCollapse, setIsOpenCollapse] = useState(-1);

  // ==============|| Variables ||================= //
  const items = [
    {
      id: "home",
      path: "/dashboard",
      label: "پیشخوان",
      icon: <HomeIcon fill="none" stroke="#03041b" />,
    },
    {
      id: "wallet",
      path: "/dashboard/wallet",
      label: "کیف پول",
      icon: <WalletIcon fill="none" stroke="#03041b" />,
      children: [
        {
          id: "deposit",
          path: "/dashboard/wallet/deposit",
          label: "واریز",
        },
        {
          id: "withdraw",
          path: "/dashboard/wallet/withdraw",
          label: "برداشت",
        },
        {
          id: "bank-accounts",
          path: "/dashboard/profile",
          label: "حساب های بانکی",
        },
      ],
    },
    {
      id: "exchange",
      path: "/dashboard/exchange",
      label: "معامله سریع",
      icon: <TradeIcon fill="none" stroke="#03041b" />,
    },
    {
      id: "market",
      path: "/dashboard/market",
      label: "بازارها",
      icon: <MarketsIcon fill="none" stroke="#03041b" />,
    },
    {
      id: "addFriends",
      path: "/dashboard/add-friends",
      label: " دعوت دوستان",
      icon: <InviteFriendsIcon fill="none" stroke="#03041b" />,
    },
  ];

  // ==============|| Handlers ||================= //
  const handleLogout = async () =>
    await logout().then(() => navigate("/login"));

  const renderActiveClass = (item) => {
    if (
      item.children &&
      item.children.length > 0 &&
      location.pathname.includes(item.path)
    )
      return true;
    else if (!item.children && location.pathname === item.path) return true;
    else return false;
  };

  // ==============|| Render ||================= //
  return (
    <div className={dashboard.sidebar}>
      {/* /\ \/ /\ \/ [clos-button in mobile] /\ \/ /\ \/ */}

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
          {items.map((item, key) => (
            <NavItem
              key={key}
              className={`${dashboard.sidebar__navbar__item} ${
                renderActiveClass(item) ? dashboard.active : ""
              }`}
            >
              <a
                onClick={() => {
                  navigate(item.path);
                  setIsOpenCollapse(key);
                }}
              >
                <span className="icon">{item.icon}</span>
                <span
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.path);
                  }}
                >
                  {item.label}
                </span>
              </a>
              {item.children && item.children.length > 0 && (
                <span
                  className={`${dashboard["arrow-icon"]} ${
                    isOpenCollapse === key ? dashboard["active-sub"] : ""
                  }`}
                  onClick={() =>
                    isOpenCollapse !== key
                      ? setIsOpenCollapse(key)
                      : setIsOpenCollapse(-1)
                  }
                >
                  <ArrowIcon />
                </span>
              )}
              {item.children && item.children.length > 0 && (
                <Collapse
                  className={dashboard.submenu}
                  isOpen={isOpenCollapse === key}
                >
                  {item.children.map((sub, index) => (
                    <NavItem
                      key={index}
                      className={` ${dashboard.sidebar__navbar__item} ${
                        location.pathname.includes(sub.path)
                          ? dashboard.active_sub
                          : ""
                      }`}
                    >
                      <Link
                        to={
                          sub.path === "/dashboard/profile"
                            ? "/dashboard/profile#iranian-accounts"
                            : sub.path
                        }
                      >
                        {sub.label}
                      </Link>
                    </NavItem>
                  ))}
                </Collapse>
              )}
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
