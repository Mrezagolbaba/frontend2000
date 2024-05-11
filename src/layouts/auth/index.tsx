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
        {children}
      </main>
    </div>
  );
};
export default AuthLayout;
