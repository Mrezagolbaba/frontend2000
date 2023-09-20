import Layout from "layouts/dashboard";
import AuthSection from "./AuthSection";
import PersonalInformation from "./PersonalInformation";
import BankInformation from "./BankInformation";
const Profile = () => {
  return (
    <Layout>
      <section className="page page-profile">
        <PersonalInformation />

        <BankInformation />
        
        <AuthSection />
      </section>
    </Layout>
  );
};
export default Profile;
