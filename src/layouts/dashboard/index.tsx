import Header from "./Header";
import Sidebar from "./sidebar";
import { Container, Progress } from "reactstrap";
import { ReactNode, Suspense, useState } from "react";

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
    <Suspense
      fallback={
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 2001,
            width: "100%",
          }}
        >
          <Progress color="primary" />
        </div>
      }
    >
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
    </Suspense>
  );
}
