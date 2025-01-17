import LogoArsonex from "assets/img/logo-arsonex.png";
import Market from "assets/img/icons/chart-simple.svg";
import useAuth from "hooks/useAuth";
import { Button, Nav, NavItem } from "reactstrap";
import { CiEdit } from "react-icons/ci";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TbPower } from "react-icons/tb";
import { useAppSelector } from "store/hooks";
import { useLocation, Link, useNavigate } from "react-router-dom";

import dashboard from "assets/scss/dashboard/dashboard.module.scss";
import WalletIcon from "components/Icons/WalletIcon";
import HomeIcon from "components/Icons/HomeIcon";
import Exchange from "pages/dashboard/exchange";
import MarketsIcon from "components/Icons/MarketsIcon";
import ExchangeIcon from "components/Icons/ExchangeIcon";
import InviteFriendsIcon from "components/Icons/InviteFriendsIcon";
import TradeIcon from "components/Icons/TradeIcon";

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
      icon: <HomeIcon fill="none" stroke="#03041b" />,
    },
    {
      id: "wallet",
      path: "/dashboard/wallet",
      label: "کیف پول",
      icon: <WalletIcon fill="none" stroke="#03041b" />,
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
