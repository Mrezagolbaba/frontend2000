import { ReactNode, useState } from "react";
import Header from "./Header";
import "./style.scss";
import Footer from "./Footer";

type Props = {
  children: ReactNode;
};

const LandingLayout = ({ children }: Props) => {
  return (
    <div className="landing-wrapper">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default LandingLayout;
