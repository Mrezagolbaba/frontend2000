import React, { useState } from "react";

import home from "assets/scss/landing/home.module.scss";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { TbMenu } from "react-icons/tb";
import Logo from "assets/img/logo-wallex.png";

function NormalHeader() {
  const [openOverlayMenu, setOpenOverlayMenu] = useState<boolean>(false);
  return (
    <>
      <div
        id="menuOverlay"
        className={`${home["menu-overlay"]} ${
          openOverlayMenu ? home.show : ""
        }`}
      />
      <header className={home.header__page}>
        <div className={home.header__top}>
          <div className={home.header__logo}>
            <Link to="/">
              <img src={Logo} className="logo" />
            </Link>
          </div>

          <nav>
            <ul
              className={`${home.navbar} navbar--light ${
                openOverlayMenu ? home.expanded : ""
              }`}
              id="navbar"
            >
              <li>
                <div className={home.header__auth}>
                  <ul className={`${home.navbar} ${home["navbar--simple"]}`}>
                    <li className={home.navbar__item}>
                      <Link to="/login">ورود</Link>
                    </li>
                    <li className={home.header__auth__register}>
                      <Button
                        tag="a"
                        href="/register"
                        color="page-primary"
                        className={home["rounded-button"]}
                      >
                        ثبت نام
                      </Button>
                    </li>
                  </ul>
                </div>
              </li>
              <li className={`${home.navbar__item} ${home.active}`}>
                <Link to="/">صفحه اصلی</Link>
              </li>
              <li className={home.page__navitem}>
                <Link to="/market">قیمت لحظه ای</Link>
              </li>
              <li className={home.page__navitem}>
                <Link to="/terms">خرید و فروش آنی</Link>
              </li>
              <li className={home.page__navitem}>
                <Link to="https://www.arsonex.com/blog" target="_blank">
                  بلاگ
                </Link>
              </li>
              <li className={home.page__navitem}>
                <Link to="/aboutUs">درباره ما</Link>
              </li>
              <li className={home.page__navitem}>
                <Link to="/contact">تماس با ما</Link>
              </li>
              <li>
                <div className={home.navbar__close}>
                  {/* <button type="button" onclick={()=>respMenu.dismiss()}> */}
                  <button
                    type="button"
                    onClick={() => setOpenOverlayMenu(false)}
                  >
                    <span className="icon">
                      <IoIosCloseCircleOutline />
                    </span>
                  </button>
                </div>
              </li>
            </ul>
          </nav>

          <div className={home.header__auth}>
            <ul className={`${home.navbar} ${home["navbar--simple"]}`}>
              <li className={home.navbar__item}>
                <Link to="/login">ورود</Link>
              </li>
              <li className={home.header__auth__register}>
                <Button
                  tag="a"
                  href="/register"
                  color="page-primary"
                  className={home["rounded-button"]}
                >
                  ثبت نام
                </Button>
              </li>
            </ul>
          </div>
          <div className={home.header__hamburger}>
            {/* <button type="button" onclick="respMenu.open()"> */}
            <button type="button" onClick={() => setOpenOverlayMenu(true)}>
              <span className="icon">
                <TbMenu />
              </span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default NormalHeader;
