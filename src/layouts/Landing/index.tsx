import { ReactNode } from "react";
import Header from "./Header";
import style from "assets/scss/landing/home.module.scss";
import Footer from "./Footer";

type Props = {
  children: ReactNode;
  disableBanner?: boolean;
};

const LandingLayout = ({ children,disableBanner=false }: Props) => {
  return (
    <div className={style.wrapper}>
      <Header disableBanner={disableBanner}/>
      {children}
      <Footer />
    </div>
  );
};

export default LandingLayout;
