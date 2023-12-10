import { ReactNode } from "react";
import Header from "./Header";
import style from "assets/scss/landing/home.module.scss";
import Footer from "./Footer";

type Props = {
  children: ReactNode;
};

const LandingLayout = ({ children }: Props) => {
  return (
    <div className={style.wrapper}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default LandingLayout;
