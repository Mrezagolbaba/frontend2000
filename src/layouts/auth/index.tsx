import { ReactNode } from "react";

import auth from "assets/scss/auth/auth.module.scss";
import Header from "layouts/Landing/Header";

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <div className={auth.wrapper}>
      <main>
        <Header disableBanner={true} HasRemoveAuthButton={true}/>
        {children}
      </main>
    </div>
  );
};
export default AuthLayout;
