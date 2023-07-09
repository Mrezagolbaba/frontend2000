import { ReactNode } from "react";
import DashboardHeader from "../header";
// import LogoArsonex from '../../assets/img/logo-arsonex.png';

import Sidebar from "../sidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="wrapper" id="root">
      <div id="menuOverlay" className="menu-overlay"></div>
      <Sidebar />
      <main className="main-wrapper">
        <DashboardHeader />
        {children}
      </main>
    </div>
  );
};
export default Layout;
