import { ReactNode } from "react";

import logo from "assets/img/logo-arsonex.png";
import { Link } from "react-router-dom";
import { PiShieldCheckeredFill } from "react-icons/pi";

import auth from "assets/scss/auth/auth.module.scss";

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <div className={auth.wrapper}>
      <main>
        <header className={auth.header}>
          <div className={auth.logo}>
            <Link to="/">
              <img src={logo} alt="arsonex-logo" />
            </Link>
          </div>
          <div className={auth.confidence}>
            <p>از یکسان بودن آدرس صفحه با آدرس زیر مطمئن شوید.</p>
            <div className="d-ltr">
              <label>
                <span>https://</span>arsonex.com
              </label>
              <span className="icon">
                <PiShieldCheckeredFill />
              </span>
            </div>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
};
export default AuthLayout;
