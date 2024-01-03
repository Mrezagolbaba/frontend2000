import { ReactNode } from "react";

import auth from "assets/scss/auth/auth.module.scss";
import LightHeader from "layouts/Landing/LightHeader";

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <div className={auth.wrapper}>
      <main>
        <LightHeader HasRemoveAuthButton className={auth["custom-header"]} />
        {/* <HeadAuth /> */}
        {/* <header className={auth.header}>
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
        </header> */}
        {children}
      </main>
    </div>
  );
};
export default AuthLayout;
