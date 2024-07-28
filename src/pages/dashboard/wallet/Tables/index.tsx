import {
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";

import { TransactionStatus } from "types/wallet";
import { useState } from "react";

import wallet from "assets/scss/dashboard/wallet.module.scss";
import FiatDeposit from "pages/dashboard/history/FiatDeposit";
import IRRDeposit from "pages/dashboard/history/IRRDeposit";
import IRRWithdraw from "pages/dashboard/history/IRRWithdraw";
import USDTDeposit from "pages/dashboard/history/USDTDeposit";
import USDTWithdraw from "pages/dashboard/history/USDTWithdraw";
import FiatWithdraw from "pages/dashboard/history/FiatWithdraw";

export default function Tables() {
  const [activeTab, setActiveTab] = useState<"1" | "2" | "3" | "4" | "5" | "6">(
    "1",
  );

  return (
    <Card className="mb-5">
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
            <IRRDeposit limit={5} />
          </TabPane>
          <TabPane tabId="2">
            <IRRWithdraw limit={5} />
          </TabPane>
          <TabPane tabId="3">
            <USDTDeposit limit={5} />
          </TabPane>
          <TabPane tabId="4">
            <USDTWithdraw limit={5} />
          </TabPane>
          <TabPane tabId="5">
            <FiatDeposit limit={5} />
          </TabPane>
          <TabPane tabId="6">
            <FiatWithdraw limit={5} />
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
    case "WAITED_TO_BE_WITHDREW":
      return <span className="text-warning">در انتظار پرداخت</span>;
    case "FAILED":
    case "CANCELED":
    case "EXPIRED":
      return <span className="text-danger">ناموفق</span>;

    case "PROCESSING":
    case "INITIATED":
      return <span className="text-info">در حال پردازش</span>;
    case "REFUND":
      return <span className="text-warning"> عودت</span>;
    case "DRAFT":
    default:
      return <span className="text-dark"> پیش نویس</span>;
  }
};
