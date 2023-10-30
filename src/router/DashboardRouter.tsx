import ProtectedRoute from "./ProtectedRoute";
import { WalletList } from "pages/dashboard/wallet";
import Setting from "pages/dashboard/setting";
import DashboardContent from "pages/dashboard/DashboardContent";
import Dashboard from "pages/dashboard";

const DashboardRouter = {
  path: "dashboard",
  element: <Dashboard />,
  children: [
    {
      path: "",
      element: <ProtectedRoute children={<DashboardContent />} />,
    },
    {
      path: "wallet",
      element: <ProtectedRoute children={<WalletList />} />,
    },
    {
      path: "setting",
      element: <ProtectedRoute children={<Setting />} />,
    },
  ],
};

export default DashboardRouter;
