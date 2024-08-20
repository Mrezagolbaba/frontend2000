import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "store/hooks";
import ThemeContext from "contexts/ThemeContext";
import PhoneMenu from "./PhoneMenu";
import MarketsIcon from "components/Icons/MarketsIcon";
import darkPhoneBlog from "assets/icons/dark-phone-blog.svg";
import darkPhoneCall from "assets/icons/dark-phone-call.svg";
import darkPhoneLogo from "assets/icons/dark-phone-logo.svg";
import phoneBlog from "assets/icons/phone-blog.svg";
import phoneCall from "assets/icons/phone-call.svg";
import phoneLogo from "assets/icons/phone-logo.svg";

import home from "assets/scss/landing/new-home.module.scss";

type Props = {
  disableBanner?: boolean;
  HasRemoveAuthButton?: boolean;
};
const Header = ({
  disableBanner = false,
  HasRemoveAuthButton = false,
}: Props) => {
  const { id, firstTierVerified, firstName, lastName } = useAppSelector(
    (state) => state.user,
  );
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { pathname } = useLocation();

  const menuItems = [
    {
      title: "بازارها",
      icon: <MarketsIcon stroke="#000" fill="none" />,
      address: "/coinsList",
      DarkIcon: <MarketsIcon stroke="#fff" fill="none" />,
    },
    {
      title: "بلاگ",
      icon: <img src={phoneBlog} alt="icon" />,
      address: "#",
      DarkIcon: <img src={darkPhoneBlog} alt="icon" />,
    },
    {
      title: "درباره ما",
      icon: <img src={phoneCall} alt="icon" />,
      address: "/aboutUs",
      DarkIcon: <img src={darkPhoneCall} alt="icon" />,
    },
    {
      title: "تماس با ما",
      icon: <img src={phoneLogo} alt="icon" />,
      address: "/contactUs",
      DarkIcon: <img src={darkPhoneLogo} alt="icon" />,
    },
  ];

  const menuBtn = [
    {
      title: "ورود",
      address: "https://dev.paydirham.me/login",
      class: home.login,
      phoneClass: home.mobile_login,
    },
    {
      title: "ثبت نام",
      address: "https://dev.paydirham.me/register",
      class: home.register,
      phoneClass: home.mobile_register,
    },
  ];

  return (
    <header
      className={`${home.container} ${home.header}  ${theme === "dark" ? "theme-dark" : ""}`}
    >
      <div className={home.header__logo}>
        <PhoneMenu menuItems={menuItems} menuBtn={menuBtn} />

        <Link to="/">
          <h1
            className={`${home.header__title} ${theme === "dark" && home["dark-header-title"]}}`}
          >
            آرسونیکس
          </h1>
        </Link>
      </div>

      <nav className={home.menu}>
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.address}
            className={pathname === item.address ? home["active-item"] : ""}
          >
            {item.title}
          </Link>
        ))}
      </nav>

      <div className={home["buttons-holder"]}>
        <label className={`${home.header__switch__input} ${home.large}`}>
          <input
            type="checkbox"
            checked={theme === "light"}
            onChange={toggleTheme}
          />
          <span className={`${home.slider} ${home.round}`}></span>
        </label>

        {!id && !firstTierVerified ? (
          menuBtn.map((item, index) => (
            <Link key={index} className={item.class} to={item.address}>
              {item.title}
            </Link>
          ))
        ) : (
          <Link to="https://dev.paydirham.me/dashboard">
            {`${firstName} ${lastName}`}
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
