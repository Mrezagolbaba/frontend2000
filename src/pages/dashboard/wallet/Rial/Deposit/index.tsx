import { useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

import CreditCardForm from "./CreditCardForm";
import ShebaForm from "./ShebaForm";

import wallet from "assets/scss/dashboard/wallet.module.scss";
import { AlertInfo } from "components/AlertWidget";
import { useAppSelector } from "store/hooks";

export default function Deposit() {
  const [activeTab, setActiveTab] = useState<"1" | "2">("1");
  const { secondTierVerified } = useAppSelector((state) => state.user);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  return (
    <div className={wallet["deposit-form"]}>
      <Nav pills className={`${wallet["deposit-form__nav"]} mb-3`}>
        <NavItem>
          <NavLink
            className={`${wallet["nav-link"]} ${
              activeTab === "1" ? wallet.active : ""
            }`}
            tag="button"
            onClick={() => toggleTab("1")}
          >
            درگاه پرداخت (کارت بانکی)
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={`${wallet["nav-link"]} ${
              activeTab === "2" ? wallet.active : ""
            }`}
            tag="button"
            disabled={!secondTierVerified}
            onClick={() => toggleTab("2")}
          >
            واریز بین بانکی (پایا، ساتنا و...)
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <CreditCardForm />
        </TabPane>
        <TabPane tabId="2">
          <AlertInfo
            hasIcon
            text=" از حساب‌هایی که در پروفایل خود وارد کرده‌اید امکان واریز وجود دارد."
          />
          <AlertInfo
            hasIcon
            text=" شناسه واریز را در قسمت توضیحات یا شناسه واریز وارد نمایید."
          />
          <AlertInfo
            hasIcon
            text=" تمامی روش‌های پرداخت بجز روش پل مورد تایید می‌باشد."
          />
          <ShebaForm activeTab={activeTab} />
        </TabPane>
      </TabContent>
    </div>
  );
}
