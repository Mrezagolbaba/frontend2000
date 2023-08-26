import { ReactNode } from "react";
import Header from "./Header";
import "./style.scss";
import Footer from "./Footer";

type Props = {
  children: ReactNode;
};

const LandingLayout = ({ children }: Props) => {
  return (
    <div className="landing-wrapper">
      <div id="menuOverlay" className="menu-overlay"></div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default LandingLayout;
