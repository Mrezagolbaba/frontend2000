import Layout from "layouts/dashboard";
import { Outlet } from "react-router-dom";
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6";
import request from "services/adapter";

const Dashboard = () => {
  return (
    <Layout>
      <Refine
        dataProvider={dataProvider(
          process.env.REACT_APP_BASE_URL as string,
          request as any
        )}
        routerProvider={routerProvider}
        resources={[
          {
            name: "wallet",
            list: "/wallet",
            create: "/wallet/create",
          },
          {
            name: "transactions",
            list: "/transactions",
            create: "/wallets/create",
          },
        ]}
      >
        <Outlet />
      </Refine>
    </Layout>
  );
};
export default Dashboard;
