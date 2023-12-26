import { ReactNode } from "react";
import { useState } from "react";
import Footer from "layouts/Landing/Footer";
import BottomBanner from "pages/Home/BottomBanner";
import NormalHeader from "./NormalHeader";
type Props = {
  children: ReactNode;
};
const NormalLayout = ({ children }: Props) => {
  const [openOverlayMenu, setOpenOverlayMenu] = useState<boolean>(false);

  return (
    <>
      <NormalHeader />

      {children}
      <BottomBanner />
      <Footer />
    </>
  );
};

export default NormalLayout;
