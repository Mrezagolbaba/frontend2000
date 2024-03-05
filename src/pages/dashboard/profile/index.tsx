import SecondTierSection from "./SecondTierSection";
import PersonalInformation from "./PersonalInformation";
import BankInformation from "./BankInformation";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { isEmpty } from "lodash";
const Profile = () => {
  const location = useLocation();

  useEffect(() => {
    if (!isEmpty(location.hash)) window.location.href = location.hash;
  }, [location.hash]);

  return (
    <section className="page page-profile">
      <PersonalInformation />

      <BankInformation />

      <SecondTierSection />
    </section>
  );
};
export default Profile;
