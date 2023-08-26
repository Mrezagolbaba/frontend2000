import { ReactNode, useState } from "react";
import DashboardHeader from "../header";
// import LogoArsonex from '../../assets/img/logo-arsonex.png';
import "assets/css/app.css";
import "assets/css/custom.css";

import Sidebar from "../sidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="wrapper" id="root">
      <div id="menuOverlay" className="menu-overlay"></div>
      <Sidebar isOpen={isSidebarOpen} onSidebarToggle={handleSidebarToggle} />
      <main className="main-wrapper">
        <DashboardHeader onSidebarToggle={handleSidebarToggle} />
        {children}
      </main>
    </div>
  );
};
export default Layout;
