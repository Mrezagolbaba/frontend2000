import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

import style from "assets/scss/landing/home.module.scss";
import home from "assets/scss/landing/new-home.module.scss";

type Props = {
  children: ReactNode;
  disableBanner?: boolean;
};

const LandingLayout = ({ children, disableBanner = false }: Props) => {
  return (
    <div className={home.wrapper}>
      <section>
        <Header disableBanner={disableBanner} HasRemoveAuthButton={false} />
        {children}
      </section>
      <Footer />
    </div>
  );
};

export default LandingLayout;
