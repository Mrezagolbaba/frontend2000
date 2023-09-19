import { Link } from "react-router-dom";
import Logo from "assets/img/logo-light.png";
import classNames from "classnames";
import "./style.scss";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [openOverlayMenu, setOpenOverlayMenu] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(true);
  //how to find user agant

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const headerClassNames = classNames('landing-header', {
    'header--landing--mobile': isMobile,
    'header--landing': !isMobile,
  });

  return (
    <>
      <div
        id="menuOverlay"
        className={`menu-overlay ${openOverlayMenu ? "show" : ""}`}
      ></div>
      <header className={headerClassNames}>
        <div className="header__top">
          <div className="header__logo">
            <Link to="/">
              <img src={Logo} className="logo" />
            </Link>
          </div>

          <nav>
            <ul
              className={`navbar navbar--light ${
                openOverlayMenu ? "expanded" : ""
              }`}
              id="navbar"
            >
              <li>
                <div className="header__auth">
                  <ul className="navbar navbar--simple">
                    <li className="navbar__item header__auth--login">
                      <a href="/login">ورود</a>
                    </li>
                    <li className="header__auth--register">
                      <a href="/register" className="btn btn-primary">
                        ثبت نام
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="navbar__item navbar__item--active">
                <a href="/">صفحه اصلی</a>
              </li>
              <li className="navbar__item">
                <a href="/market">بازارها</a>
              </li>
              <li className="navbar__item">
                <a href="/terms">قوانین</a>
              </li>
              <li className="navbar__item">
                <a href="https://www.arsonex.com/blog" target="_blank">بلاگ</a>
              </li>
              <li className="navbar__item">
                <a href="/aboutUs">درباره ما</a>
              </li>
              <li className="navbar__item">
                <a href="/contact">تماس با ما</a>
              </li>
              <li>
                <div className="navbar-close">
                  {/* <button type="button" onclick={()=>respMenu.dismiss()}> */}
                  <button
                    type="button"
                    onClick={() => setOpenOverlayMenu(false)}
                  >
                    <span className="icon">
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="24"
                          cy="24"
                          r="23.25"
                          stroke="#040F4A"
                          stroke-opacity="0.1"
                          stroke-width="1.5"
                        ></circle>
                        <path
                          d="M17 31L31.1421 16.8579"
                          stroke="#040F4A"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        ></path>
                        <path
                          d="M17 17L31.1421 31.1421"
                          stroke="#040F4A"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </li>
            </ul>
          </nav>

          <div className="header__auth">
            <ul className="navbar navbar--simple">
              <li className="navbar__item header__auth--login">
                <a href="/login">ورود</a>
              </li>
              <li className="header__auth--register">
                <a href="/register" className="btn btn-primary">
                  ثبت نام
                </a>
              </li>
            </ul>
          </div>
          <div className="header-hamburger">
            {/* <button type="button" onclick="respMenu.open()"> */}
            <button type="button" onClick={() => setOpenOverlayMenu(true)}>
              <span className="icon">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="24"
                    cy="24"
                    r="23.25"
                    stroke="#040F4A"
                    stroke-opacity="0.1"
                    stroke-width="1.5"
                  ></circle>
                  <path
                    d="M14 20H34"
                    stroke="#040F4A"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>
                  <path
                    d="M14 28H34"
                    stroke="#040F4A"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
        <div className="container">
          <div className="header-intro">
            <h1>آرسونیکس، همراه ارز دیجیتال شما</h1>
            <p>
              مهم نیست ارز دیجیتال نیاز داشته باشی یا واحد پول یه کشور دیگه،
              آرسونیکس برات به آسانی تبدیل می&zwnj;کنه.
            </p>
            <a href="/register" className="btn btn-primary">
              با آرسونیکس شروع کنید
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
