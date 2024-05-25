import { useState } from "react";
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

import wallet from "assets/scss/dashboard/wallet.module.scss";
import DepositsTable from "./DepositsTable";
import WithdrawsTable from "./WithdrawsTable";
import { FlowType, TransactionStatus } from "types/wallet";
import { coinShow, lirShow, tomanShow } from "helpers";

export default function Tables() {
  const [activeTab, setActiveTab] = useState<"1" | "2" | "3" | "4" | "5" | "6">(
    "1",
  );

  const clickTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h5">تراکنش های اخیر</CardTitle>
      </CardHeader>
      <CardBody className={wallet["data-tab-container"]}>
        <Nav className={wallet["data-tab"]}>
          <NavItem>
            <NavLink
              className={`${wallet["data-tab__item"]} ${
                activeTab === "1" ? wallet.active : ""
              }`}
              tag="button"
              onClick={() => clickTab("1")}
            >
              واریز تومانی
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={`${wallet["data-tab__item"]} ${
                activeTab === "2" ? wallet.active : ""
              }`}
              tag="button"
              // disabled={!secondTierVerified}
              onClick={() => clickTab("2")}
            >
              برداشت تومانی
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={`${wallet["data-tab__item"]} ${
                activeTab === "3" ? wallet.active : ""
              }`}
              tag="button"
              // disabled={!secondTierVerified}
              onClick={() => clickTab("3")}
            >
              واریز فیات دیجیتال
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={`${wallet["data-tab__item"]} ${
                activeTab === "4" ? wallet.active : ""
              }`}
              tag="button"
              // disabled={!secondTierVerified}
              onClick={() => clickTab("4")}
            >
              برداشت فیات دیجیتال
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={`${wallet["data-tab__item"]} ${
                activeTab === "5" ? wallet.active : ""
              }`}
              tag="button"
              // disabled={!secondTierVerified}
              onClick={() => clickTab("5")}
            >
              واریز ارز دیجیتال
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={`${wallet["data-tab__item"]} ${
                activeTab === "6" ? wallet.active : ""
              }`}
              tag="button"
              // disabled={!secondTierVerified}
              onClick={() => clickTab("6")}
            >
              برداشت ارز دیجیتال
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <DepositsTable type="IRR" />
          </TabPane>
          <TabPane tabId="2">
            <WithdrawsTable type="IRR" />
          </TabPane>
          <TabPane tabId="3">
            <DepositsTable type="TRY" />
          </TabPane>
          <TabPane tabId="4">
            <WithdrawsTable type="TRY" />
          </TabPane>
          <TabPane tabId="5">
            <DepositsTable type="USDT" />
          </TabPane>
          <TabPane tabId="6">
            <WithdrawsTable type="USDT" />
          </TabPane>
        </TabContent>
      </CardBody>
    </Card>
  );
}

export const StatusHandler = ({ status }: { status: TransactionStatus }) => {
  switch (status) {
    case "SUCCESSFUL":
      return <span className="text-success">پرداخت شده</span>;

    case "FAILED":
    case "CANCELED":
      return <span className="text-danger">پرداخت ناموفق</span>;

    case "PROCESSING":
    case "INITIATED":
      return <span className="text-info">پرداخت در حال پردازش</span>;

    case "EXPIRED":
      return <span className="text-muted">پرداخت منقضی شده</span>;
    case "DRAFT":
    default:
      return <span className="text-dark"> پیش نویس</span>;
  }
};

export const DepositTypes = ({ flow }: { flow: FlowType }) => {
  switch (flow) {
    case "REDIRECT":
      return "درگاه پرداخت آنلاین";

    case "MANUAL_WITH_WALLET_ADDRESS":
      return "واریز به آدرس ولت";
    case "MANUAL_WITH_PAYMENT_IDENTIFIER":
      return "واریز بین بانکی";
      case "DEBIT":
      return "شارژ سریع";
    default:
      return "";
  }
  // REDIRECT: ,
  // MANUAL_WITH_PAYMENT_IDENTIFIER:"",
  // MANUAL_WITH_WALLET_ADDRESS:""
};
export const RenderAmount = ({
  amount,
  type,
}: {
  amount: string;
  type: "IRR" | "TRY" | "USDT";
}) => {
  switch (type) {
    case "TRY":
      return lirShow({ value: amount, currency: "TRY" });
    case "USDT":
      return coinShow(amount, "USDT");
    case "IRR":
    default:
      return tomanShow({ value: amount, currency: "IRR" });
  }
};
