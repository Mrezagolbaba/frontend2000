import LandingLayout from "layouts/Landing";

import "./style.scss";
import SpotRate from "./SpotRate";
import Advantages from "./Advantages";
import UserComments from "./UserComments";
import LastBlogs from "./LastBlogs";
import BottomBanner from "./BottomBanner";

export default function HomePage() {
  return (
    <LandingLayout>
      <main className="main-wrapper">
        <SpotRate />
        <Advantages />

        <UserComments />
        <LastBlogs />
        <BottomBanner />
      </main>
    </LandingLayout>
  );
}
