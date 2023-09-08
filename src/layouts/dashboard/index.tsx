import { ReactNode, useState } from "react";
import DashboardHeader from "../header";
// import LogoArsonex from '../../assets/img/logo-arsonex.png';


import "./style.scss";

// import "assets/css/app.css"

import Sidebar from "../sidebar";
import { Container } from "reactstrap";

const Layout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="admin-wrapper" id="root">
      <div id="menuOverlay" className="menu-overlay"></div>
      <Sidebar isOpen={isSidebarOpen} onSidebarToggle={handleSidebarToggle} />
      <Container fluid className="main-wrapper">
        <DashboardHeader onSidebarToggle={handleSidebarToggle} />
        {children}
      </Container>
    </div>
  );
};
export default Layout;
