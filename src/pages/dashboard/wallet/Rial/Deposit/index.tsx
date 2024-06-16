import CreditCardForm from "./CreditCardForm";
import DirectDebit from "./DirectDebit";
import ShebaForm from "./ShebaForm";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { useAppSelector } from "store/hooks";
import { useEffect, useState } from "react";

import wallet from "assets/scss/dashboard/wallet.module.scss";

export default function Deposit({ onClose }: { onClose?: () => void }) {
  const [activeTab, setActiveTab] = useState<"1" | "2" | "3">("1");
  const { gateways } = useAppSelector((state) => state.user);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  useEffect(() => {
    if (gateways?.length <= 0) setActiveTab("2");
  }, [gateways]);

  return (
    <div className={wallet["deposit-form"]}>
      <Nav pills className={`${wallet["deposit-form__nav"]} mb-3`}>
        {gateways?.length > 0 && (
          <NavItem>
            <NavLink
              className={`${wallet["nav-link"]} ${
                activeTab === "1" ? wallet.active : ""
              }`}
              tag="button"
              onClick={() => toggleTab("1")}
            >
              درگاه بانکی
            </NavLink>
          </NavItem>
        )}
        <NavItem>
          <NavLink
            className={`${wallet["nav-link"]} ${
              activeTab === "2" ? wallet.active : ""
            }`}
            tag="button"
            onClick={() => toggleTab("2")}
          >
            برداشت مستقیم <span className={wallet.hide}>(Direct Debit)</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={`${wallet["nav-link"]} ${
              activeTab === "3" ? wallet.active : ""
            }`}
            tag="button"
            onClick={() => toggleTab("3")}
          >
            واریز با شناسه{" "}
            <span className={wallet.hide}>(پایا، ساتنا، حساب به حساب)</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <CreditCardForm />
        </TabPane>
        <TabPane tabId="3">
          <ShebaForm activeTab={activeTab} />
        </TabPane>
        <TabPane tabId="2">
          {activeTab === "2" && <DirectDebit onClose={() => onClose?.()} />}
        </TabPane>
      </TabContent>
    </div>
  );
}
