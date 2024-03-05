import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "assets/img/logo/light.png";
import LogoPrimary from "assets/img/logo-primary.png";

import home from "assets/scss/landing/home.module.scss";
import { Button, Container } from "reactstrap";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { TbMenu } from "react-icons/tb";
import { useAppSelector } from "store/hooks";

type Props = {
  disableBanner?: boolean;
};
const Header = ({ disableBanner = false }: Props) => {
  const [openOverlayMenu, setOpenOverlayMenu] = useState<boolean>(false);
  const user = useAppSelector((state) => state.user);

  const { pathname } = useLocation();

  return (
    <>
      <div
        id="menuOverlay"
        className={`${home["menu-overlay"]} ${
          openOverlayMenu ? home.show : ""
        }`}
      />
      <header
        className={`${home.header} ${disableBanner ? home.withoutBg : ""}`}
      >
        <div className={home.header__top}>
          <div className={home.header__logo}>
            <Link to="/">
              <img src={!disableBanner ? Logo : LogoPrimary} className="logo" />
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
                  {user.id ? (
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
                  ) : (
                    <ul className={`${home.navbar} ${home["navbar--simple"]}`}>
                      <li className={home.navbar__item}>
                        <Link to="/login">ورود</Link>
                      </li>
                      <li className={home.header__auth__register}>
                        <Button
                          tag="a"
                          href="/register"
                          color="primary"
                          className={home["rounded-button"]}
                        >
                          ثبت نام
                        </Button>
                      </li>
                    </ul>
                  )}
                </div>
              </li>
              <li
                className={`${home.navbar__item} ${
                  pathname === "/" ? home.active : ""
                }`}
              >
                <Link to="/">صفحه اصلی</Link>
              </li>
              <li
                className={`${home.navbar__item} ${
                  pathname === "/coins" ? home.active : ""
                }`}
              >
                <Link to="/coins">قیمت لحظه ای</Link>
              </li>
              <li
                className={`${home.navbar__item} ${
                  pathname === "/dashboard" ? home.active : ""
                }`}
              >
                <Link to="/dashboard">خرید و فروش آنی</Link>
              </li>
              <li className={`${home.navbar__item}`}>
                <Link to="https://help.arsonex.com/">مرکز راهنمایی</Link>
              </li>
              <li
                className={`${home.navbar__item} ${
                  pathname === "/about-us" ? home.active : ""
                }`}
              >
                <Link to="/about-us">درباره ما</Link>
              </li>
              <li
                className={`${home.navbar__item} ${
                  pathname === "/contact-us" ? home.active : ""
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

          <div className={home.header__auth}>
            {user.id ? (
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
            ) : (
              <ul className={`${home.navbar} ${home["navbar--simple"]}`}>
                <li className={home.navbar__item}>
                  <Link to="/login">ورود</Link>
                </li>
                <li className={home.header__auth__register}>
                  <Button
                    tag="a"
                    href="/register"
                    color="landing-primary"
                    className={home["rounded-button"]}
                  >
                    ثبت نام
                  </Button>
                </li>
              </ul>
            )}
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
        {!disableBanner && (
          <Container>
            <div className={`${home["img_bottom_right"]} position-absolute `}>
              <div className={home.i_b_r_img}></div>
            </div>
            <div className={`${home["img_top_right"]} position-absolute `}>
              <div className={home.i_t_r_img}></div>
            </div>
            <div className={home.header__intro}>
              <h1>آرسونیکس، همراه ارز دیجیتال شما</h1>
              <p>
              تسویه آنی تومان و بیش از 30 واحد پول دیگر
              </p>
              <Button
                tag="a"
                href={user.id ? "/dashboard" : "/register"}
                color="landing-primary"
                className={home["rounded-button"]}
              >
                با آرسونیکس شروع کنید
              </Button>
            </div>
            <div className={`${home["img_top_left"]} position-absolute `}>
              <div className={home.i_t_l_img}></div>
            </div>
            <div className={`${home["img_bottom_left"]} position-absolute `}>
              <div className={home.i_b_l_img}></div>
            </div>
          </Container>
        )}
      </header>
    </>
  );
};

export default Header;
