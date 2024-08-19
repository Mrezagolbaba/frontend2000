import { useContext, useState } from "react";
import ThemeContext from "contexts/ThemeContext";
import { Link } from "react-router-dom";
import {
  CloseMenu,
  DarkCloseMenu,
  DarkPhoneMenuIcon,
  DarkPhoneTheme,
  PhoneMenuIcon,
  PhoneTheme,
} from "components/Icons/landingIcons";

import home from "assets/scss/landing/new-home.module.scss";
import { useAppSelector } from "store/hooks";

export default function PhoneMenu({ menuItems, menuBtn }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [activeMenu, setActiveMenu] = useState(false);

  const { id, firstTierVerified, firstName, lastName } = useAppSelector(
    (state) => state.user,
  );

  return (
    <>
      <button
        className={home["mobile-menu-button"]}
        onClick={() => setActiveMenu(true)}
      >
        {theme === "dark" ? <DarkPhoneMenuIcon /> : <PhoneMenuIcon />}
      </button>
      <div
        className={`${home["mobile-menu"]} ${activeMenu ? home["show-menu"] : ""}`}
      >
        <div className={home["mobile-menu__header"]}>
          <h2
            className={`${home.header__title} ${theme === "dark" && home["dark-header-title"]}`}
          >
            آرسونیکس
          </h2>

          <button
            className={home["mobile-menu-button"]}
            onClick={() => setActiveMenu(false)}
          >
            {theme === "dark" ? <DarkCloseMenu /> : <CloseMenu />}
          </button>
        </div>

        <ul className={home["mobile-menu__list"]}>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link to={item.address}>
                {theme === "dark" ? item.DarkIcon : item.icon}
                {item.title}
              </Link>
            </li>
          ))}

          <li className={home.header__switch}>
            <span className={home.header__switch__title}>
              {theme === "dark" ? <DarkPhoneTheme /> : <PhoneTheme />}
              تغییر تم
            </span>

            <label className={home.header__switch__input}>
              <input
                type="checkbox"
                checked={theme === "light"}
                onChange={toggleTheme}
              />
              <span className={`${home.slider} ${home.round}`}></span>
            </label>
          </li>
        </ul>

        <div className={home["mobile-buttons"]}>
          {!id && !firstTierVerified ? (
            menuBtn.map((item, index) => (
              <Link key={index} className={item.phoneClass} to={item.address}>
                {item.title}
              </Link>
            ))
          ) : (
            <Link to="https://dev.paydirham.me/dashboard">
              {`${firstName} ${lastName}`}
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
