import Header from "./Header";
import Loader from "components/Loader";
import Sidebar from "./sidebar";
import { Container } from "reactstrap";
import { ReactNode, Suspense } from "react";

import dashboard from "assets/scss/dashboard/dashboard.module.scss";
import MobileMenu from "./MobileMenu";

export default function Layout({ children }: { children: ReactNode }) {
  // ==============|| Render ||================= //
  return (
    <Suspense fallback={<Loader />}>
      <div className={dashboard.wrapper}>
        <Sidebar />
        <Container fluid>
          <div className={dashboard["main-wrapper"]}>
            <Header />
            {children}
          </div>
          <MobileMenu />
        </Container>
      </div>
    </Suspense>
  );
}
