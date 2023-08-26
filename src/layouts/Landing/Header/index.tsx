import { Link } from "react-router-dom";
import Logo from "assets/img/logo-light.png";

import "./style.scss";

const Header = () => {
  return (
    <header className="landing-header header--landing">
      <div className="header__top">
        <div className="header__logo">
          <Link to="/">
            <img src={Logo} className="logo" />
          </Link>
        </div>

        <nav>
          <ul className="navbar navbar--light" id="navbar">
            <li>
              <div className="header__auth">
                <ul className="navbar navbar--simple">
                  <li className="navbar__item header__auth--login">
                    <a href="#">ورود</a>
                  </li>
                  <li className="header__auth--register">
                    <a href="#" className="btn btn-primary">
                      ثبت نام
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="navbar__item navbar__item--active">
              <a href="#">صفحه اصلی</a>
            </li>
            <li className="navbar__item">
              <a href="#">بازارها</a>
            </li>
            <li className="navbar__item">
              <a href="#">قوانین</a>
            </li>
            <li className="navbar__item">
              <a href="#">بلاگ</a>
            </li>
            <li className="navbar__item">
              <a href="#">درباره ما</a>
            </li>
            <li className="navbar__item">
              <a href="#">تماس با ما</a>
            </li>
            <li>
              <div className="navbar-close">
                {/* <button type="button" onclick={()=>respMenu.dismiss()}> */}
                <button type="button">
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
              <a href="#">ورود</a>
            </li>
            <li className="header__auth--register">
              <a href="#" className="btn btn-primary">
                ثبت نام
              </a>
            </li>
          </ul>
        </div>
        <div className="header-hamburger">
          {/* <button type="button" onclick="respMenu.open()"> */}
          <button type="button">
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
          <a href="#" className="btn btn-primary">
            با آرسونیکس شروع کنید
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
