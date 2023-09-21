import { ReactNode, useEffect, useState } from "react";
import Header from "./Header";
// import LogoArsonex from '../../assets/img/logo-arsonex.png';


import "./style.scss";

// import "assets/css/app.css"

import Sidebar from "./sidebar";
import { Container } from "reactstrap";
import { useAppDispatch } from "redux/hooks";
import { useGetMe } from "services/auth/user";
import { setUser } from "redux/features/user/userSlice";

const Layout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  const dispatch = useAppDispatch();
  const getMe = useGetMe();
  useEffect(() => {
    getMe.mutateAsync(null).then((res) => {
      res && dispatch(setUser(res));
    });
  }, []);
  return (
    <div className="admin-wrapper" id="root">
      <div id="menuOverlay" className="menu-overlay"></div>
      <Sidebar isOpen={isSidebarOpen} onSidebarToggle={handleSidebarToggle} />
      <Container fluid className="main-wrapper">
        <Header onSidebarToggle={handleSidebarToggle} />
        {children}
      </Container>
    </div>
  );
};
export default Layout;
