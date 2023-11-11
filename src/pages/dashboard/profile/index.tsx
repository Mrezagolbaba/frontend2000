import AuthSection from "./AuthSection";
import PersonalInformation from "./PersonalInformation";
import BankInformation from "./BankInformation";
const Profile = () => {
  return (
    <section className="page page-profile">
      <PersonalInformation />

      <BankInformation />

      <AuthSection />
    </section>
  );
};
export default Profile;
