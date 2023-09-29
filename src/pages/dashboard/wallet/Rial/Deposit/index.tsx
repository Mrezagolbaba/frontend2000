import { useState } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";

import CreditCardForm from "./CreditCardForm";
import ShebaForm from "./ShebaForm";

import wallet from "../../style.module.scss";

export default function Deposit() {
  const [activeTab, setActiveTab] = useState("1");

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
          <ShebaForm />
        </TabPane>
      </TabContent>
    </div>
  );
}
