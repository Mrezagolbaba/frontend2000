import LandingLayout from "layouts/Landing";
import SpotRate from "./SpotRate";
import Advantages from "./Advantages";
import UserComments from "./UserComments";
import LastBlogs from "./LastBlogs";
import BottomBanner from "./BottomBanner";

import home from "assets/scss/landing/home.module.scss";

export default function HomePage() {
  return (
    <LandingLayout>
      <main className={home["main-wrapper"]}>
        <SpotRate />
        <Advantages />

        <UserComments />
        <LastBlogs />
        <BottomBanner />
      </main>
    </LandingLayout>
  );
}
