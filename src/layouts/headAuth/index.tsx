import { Button } from "reactstrap";
import { FC, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";

import home from "assets/scss/landing/home.module.scss";

const HeadAuth: FC = () => {
  const [openOverlayMenu, setOpenOverlayMenu] = useState<boolean>(false);
  return (
    <header className="auth-header auth-header--bg">
      <div className="auth-logo">
        <Link to="/">
          <img src="assets/img/logo-arsonex.png" alt="" />
        </Link>
      </div>
      <nav
        style={{
          borderBottom: "1px solid #e2e2e2",
          paddingBottom: "20px",
          marginBottom: "50px",
        }}
      >
        <ul
          className={`${home.navbar} navbar--simple ${
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
                  <Link
                    to="/register"
                    className={`btn btn-primary ${home["rounded-button"]}`}
                  >
                    ثبت نام
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className={`${home.navbar__item} ${home.active}`}>
            <Link to="/">صفحه اصلی</Link>
          </li>
          <li className={home.navbar__item}>
            <Link to="/market">قیمت لحظه ای</Link>
          </li>
          <li className={home.navbar__item}>
            <Link to="/terms">معامله سریع</Link>
          </li>
          <li className={home.navbar__item}>
            <Link to="https://www.arsonex.com/blog" target="_blank">
              بلاگ
            </Link>
          </li>
          <li className={home.navbar__item}>
            <Link to="/aboutUs">درباره ما</Link>
          </li>
          <li className={home.navbar__item}>
            <Link to="/contact">تماس با ما</Link>
          </li>
          <li>
            <div className={home.navbar__close}>
              {/* <button type="button" onclick={()=>respMenu.dismiss()}> */}
              <button type="button" onClick={() => setOpenOverlayMenu(false)}>
                <span className="icon">
                  <IoIosCloseCircleOutline />
                </span>
              </button>
            </div>
          </li>
        </ul>
      </nav>
      {/* <div className="auth-gain-confidence">
        <div className="d-ltr">
          <span className="icon">
            <img src={LogoPrimary} alt='logo' />
          </span>
        </div>
      </div> */}
    </header>
  );
};
export default HeadAuth;
