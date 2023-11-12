import ProtectedRoute from "./ProtectedRoute";
import { WalletList } from "pages/dashboard/wallet";
import Setting from "pages/dashboard/setting";
import DashboardContent from "pages/dashboard/DashboardContent";
import Dashboard from "pages/dashboard";
import BuySell from "pages/dashboard/buySell";
import Profile from "pages/dashboard/profile";
import Invoice from "pages/dashboard/invoice";

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
      path: "setting",
      element: <ProtectedRoute children={<Setting />} />,
    },
    {
      path: "buy-sell",
      element: <ProtectedRoute children={<BuySell />} />,
    },
    {
      path: "invoice",
      element: <ProtectedRoute children={<Invoice />} />,
    }
  ],
};

export default DashboardRouter;
