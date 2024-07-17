import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import FiatDeposit from "./FiatDeposit";
import FiatWithdraw from "./FiatWithdraw";
import IRRDeposit from "./IRRDeposit";
import IRRWithdraw from "./IRRWithdraw";
import USDTDeposit from "./USDTDeposit";
import USDTWithdraw from "./USDTWithdraw";
import { TransactionStatus } from "types/wallet";
import { useState } from "react";

import wallet from "assets/scss/dashboard/wallet.module.scss";

export default function Tables() {
  const [activeTab, setActiveTab] = useState<"1" | "2" | "3" | "4" | "5" | "6">(
    "1",
  );

  return (
    <Card>
      <CardHeader className="d-flex flex-row justify-content-between align-items-center">
        <CardTitle tag="h5">آخرین تراکنش ها</CardTitle>
      </CardHeader>
      <CardBody>
        <div className={wallet.transactions}>
          <Nav className={wallet.tabs} id="transactions">
            <NavItem>
              <NavLink
                className={`${wallet.tabs__item} ${
                  activeTab === "1" ? wallet.active : ""
                }`}
                id="tab1"
                tag="button"
                onClick={() => {
                  setActiveTab("1");
                }}
              >
                واریز تومان
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={`${wallet.tabs__item} ${
                  activeTab === "2" ? wallet.active : ""
                }`}
                id="tab4"
                tag="button"
                onClick={() => {
                  setActiveTab("2");
                }}
              >
                برداشت تومان
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={`${wallet.tabs__item} ${
                  activeTab === "3" ? wallet.active : ""
                }`}
                id="tab2"
                tag="button"
                onClick={() => {
                  setActiveTab("3");
                }}
              >
                واریز ارز دیجیتال
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={`${wallet.tabs__item} ${
                  activeTab === "4" ? wallet.active : ""
                }`}
                id="tab3"
                tag="button"
                onClick={() => {
                  setActiveTab("4");
                }}
              >
                برداشت ارز دیجیتال
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={`${wallet.tabs__item} ${
                  activeTab === "5" ? wallet.active : ""
                }`}
                id="tab2"
                tag="button"
                onClick={() => {
                  setActiveTab("5");
                }}
              >
                واریز فیات دیجیتال
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={`${wallet.tabs__item} ${
                  activeTab === "6" ? wallet.active : ""
                }`}
                id="tab4"
                tag="button"
                onClick={() => {
                  setActiveTab("6");
                }}
              >
                برداشت فیات دیجیتال
              </NavLink>
            </NavItem>
          </Nav>
        </div>
        <TabContent activeTab={activeTab} className="mt-3">
          <TabPane tabId="1">
            <IRRDeposit />
          </TabPane>
          <TabPane tabId="2">
            <IRRWithdraw />
          </TabPane>
          <TabPane tabId="3">
            <USDTDeposit />
          </TabPane>
          <TabPane tabId="4">
            <USDTWithdraw />
          </TabPane>
          <TabPane tabId="5">
            <FiatDeposit />
          </TabPane>
          <TabPane tabId="6">
            <FiatWithdraw />
          </TabPane>
        </TabContent>
      </CardBody>
    </Card>
  );
}

export const StatusHandler = ({ status }: { status: TransactionStatus }) => {
  switch (status) {
    case "SUCCESSFUL":
      return <span className="text-success"> موفق</span>;

    case "FAILED":
    case "CANCELED":
    case "EXPIRED":
      return <span className="text-danger">ناموفق</span>;

    case "PROCESSING":
    case "INITIATED":
      return <span className="text-info">در حال پردازش</span>;
    case "REFUND":
      return <span className="text-warning"> عودت</span>;
    case "WAITED_TO_BE_WITHDREW":
      return <span className="text-info"> در انتظار پرداخت</span>;
    case "DRAFT":
    default:
      return <span className="text-dark"> پیش نویس</span>;
  }
};
