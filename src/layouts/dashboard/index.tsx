import Header from "./Header";
import Sidebar from "./sidebar";
import { Container } from "reactstrap";
import { ReactNode, useState } from "react";

import dashboard from "assets/scss/dashboard/dashboard.module.scss";

export default function Layout({ children }: { children: ReactNode }) {
  // ==============|| States ||================= //
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // ==============|| Handlers ||================= //
  const handleSidebarToggle = () => {
    setIsSidebarOpen((prevStat) => !prevStat);
  };

  // ==============|| Render ||================= //
  return (
    <div className={dashboard.wrapper}>
      <div id="menuOverlay" className={dashboard["menu-overlay"]} />
      <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <Container fluid>
        <div className={dashboard["main-wrapper"]}>
          <Header onSidebarToggle={handleSidebarToggle} />
          {children}
        </div>
      </Container>
    </div>
  );
}
