import { ReactNode, useEffect, useState } from "react";
import Header from "./Header";

import dashboard from "assets/scss/dashboard/dashboard.module.scss";

import Sidebar from "./sidebar";
import { Container } from "reactstrap";
import { useAppDispatch } from "store/hooks";
import { setUser } from "store/reducers/features/user/userSlice";
import { useGetMeQuery } from "store/api/user";

const Layout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prevStat) => !prevStat);
  };

  const dispatch = useAppDispatch();
  const { data, isSuccess } = useGetMeQuery();

  useEffect(() => {
    if (isSuccess && data) dispatch(setUser(data));
  }, [data, dispatch, isSuccess]);

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
};
export default Layout;
