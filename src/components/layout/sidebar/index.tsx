import LogoArsonex from "../../../assets/img/logo-arsonex.png";
import Profile from "../../../assets/img/icons/profile.png";
import Edit from "../../../assets/img/icons/edit.svg";
import Home from "../../../assets/img/icons/home.svg";
import Wallet from "../../../assets/img/icons/wallet.svg";
import Order from "../../../assets/img/icons/paper.svg";
import History from "../../../assets/img/icons/time-circle.svg";
import AddFriend from "../../../assets/img/icons/add-user.svg";
import Logout from "../../../assets/img/icons/logout.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


interface SidebarProps {
  isOpen: boolean;
  onSidebarToggle: () => void;
}

const Sidebar = ({isOpen,onSidebarToggle}:SidebarProps) => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(0);

  const handleItemClick = (index: number, path: string) => {
    setActiveItem(index);
    navigate(path);
    console.log(index);
  };

  return (
    <aside className={`sidebar ${isOpen ? 'expanded' : ''}`} id="respMenu">
      <button
        className="sidebar__close"
          onClick={()=>onSidebarToggle()}
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

      <div className="sidebar-logo">
        <a >
          <img src={LogoArsonex} alt="" className="" />
        </a>
      </div>

      <div className="sidebar__user">
        <div className="sidebar__user__img">
          <img src={Profile} alt="" />
        </div>
        <div>
          <h6 className="sidebar__user__name">نام کاربری</h6>
          <a href="/profile" className="btn btn-transparent">
            <span className="icon">
              <img src={Edit} alt="" />
            </span>
            ویرایش
          </a>
        </div>
      </div>

      <ul className="navbar">
        <li
          className={`navbar__item ${
            activeItem === 0 ? "navbar__item--active" : ""
          }`}
          onClick={() => handleItemClick(0, "/")}
        >
          <a >
            <span className="icon">
              <img src={Home} alt="" />
            </span>
            پیشخوان
          </a>
        </li>
        <li
          className={`navbar__item ${
            activeItem === 1 ? "navbar__item--active" : ""
          }`}
          onClick={() => handleItemClick(1, "/wallet")}
        >
          <a >
            <span className="icon">
              <img src={Wallet} alt="" />
            </span>
            کیف پول
          </a>
        </li>
        <li
          className={`navbar__item ${
            activeItem === 2 ? "navbar__item--active" : ""
          }`}
          onClick={() => handleItemClick(2, "/orders")}
        >
          <a >
            <span className="icon">
              <img src={Order} alt="" />
            </span>
            سفارشات من
          </a>
        </li>
        <li
          className={`navbar__item ${
            activeItem === 3 ? "navbar__item--active" : ""
          }`}
          onClick={() => handleItemClick(3, "/history")}
        >
          <a>
            <span className="icon">
              <img src={History} alt="" />
            </span>
            تاریخچه
          </a>
        </li>
        <li
          className={`navbar__item ${
            activeItem === 4 ? "navbar__item--active" : ""
          }`}
          onClick={() => handleItemClick(4, "/add-friends")}
        >
          <a href="/add-friends">
            <span className="icon">
              <img src={AddFriend} alt="" />
            </span>
            دعوت دوستان
          </a>
        </li>
        <li className="navbar__item navbar__item--logout">
          <a>
            <span className="icon">
              <img src={Logout} alt="" />
            </span>
            خروج از حساب
          </a>
        </li>
      </ul>
    </aside>
  );
};
export default Sidebar;
