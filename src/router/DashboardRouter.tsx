import ProtectedRoute from "./ProtectedRoute";
import { WalletList } from "pages/dashboard/wallet";
import DashboardContent from "pages/dashboard/DashboardContent";
import Dashboard from "pages/dashboard";
import BuySell from "pages/dashboard/buySell";
import Profile from "pages/dashboard/profile";

const DashboardRouter = {
  path: "dashboard",
  element: <Dashboard />,
  children: [
    {
      path: "",
      element: <ProtectedRoute children={<DashboardContent />} />,
    },
    {
      path: "profile",
      element: <ProtectedRoute children={<Profile />} />,
    },
    {
      path: "wallet",
      element: <ProtectedRoute children={<WalletList />} />,
    },
    {
      path: "buy-sell",
      element: <ProtectedRoute children={<BuySell />} />,
    }
  ],
};

export default DashboardRouter;
