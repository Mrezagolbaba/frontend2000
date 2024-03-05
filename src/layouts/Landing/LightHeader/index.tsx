import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "reactstrap";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { TbMenu } from "react-icons/tb";
import Logo from "assets/img/logo/dark.png";

import home from "assets/scss/landing/home.module.scss";
import { useAppSelector } from "store/hooks";

const LightHeader = ({
  className,
  HasRemoveAuthButton = false,
}: {
  className?: string;
  HasRemoveAuthButton?: boolean;
}) => {
  const { pathname } = useLocation();
  const [openOverlayMenu, setOpenOverlayMenu] = useState<boolean>(false);
  const user = useAppSelector((state) => state.user);
  return (
    <>
      <div
        id="menuOverlay"
        className={`${home["menu-overlay"]} ${openOverlayMenu ? home.show : ""
          }`}
      />
      <header className={`${home.header__page} ${className}`}>
        <div className={home.header__top}>
          <div className={home.header__logo}>
            <Link to="/">
              <img src={Logo} className="logo" />
            </Link>
          </div>

          <nav>
            <ul
              className={`${home.navbar} navbar--light ${openOverlayMenu ? home.expanded : ""
                }`}
              id="navbar"
            >
              <li>
                <div className={home.header__auth}>
                  {user.id ?
                    <div>
                      <Button
                        tag="a"
                        href="/dashboard/profile"
                        color="landing-primary"
                        className={home["rounded-button"]}
                      >
                        {user.firstName + " " + user.lastName}
                      </Button>
                    </div>
                    :
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
                    </ul>}
                </div>
              </li>
              <li
                className={`${home.page__navitem} ${pathname === "/" ? home.active : ""
                  }`}
              >
                <Link to="/">صفحه اصلی</Link>
              </li>
              <li
                className={`${home.page__navitem} ${pathname === "/coins" ? home.active : ""
                  }`}
              >
                <Link to="/coins">قیمت لحظه ای</Link>
              </li>
              <li
                className={`${home.page__navitem} ${pathname === "/dashboard" ? home.active : ""
                  }`}
              >
                <Link to="/dashboard">خرید و فروش آنی</Link>
              </li>
              <li className={home.page__navitem}>
                <Link to="https://help.arsonex.com/">مرکز راهنمایی</Link>
              </li>
              <li
                className={`${home.page__navitem} ${pathname === "/about-us" ? home.active : ""
                  }`}
              >
                <Link to="/about-us">درباره ما</Link>
              </li>
              <li
                className={`${home.page__navitem} ${pathname === "/contact-us" ? home.active : ""
                  }`}
              >
                <Link to="/contact-us">تماس با ما</Link>
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

          {!HasRemoveAuthButton && (
            <div className={home.header__auth}>
              {user.id ?
                <div>
                  <Button
                    href="/dashboard/profile"
                    color="landing-primary"
                    className={home["rounded-button"]}
                  >
                    {user.firstName + " " + user.lastName}
                  </Button>
                </div>
                :
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
                </ul>}
            </div>
          )}
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
};

export default LightHeader;
