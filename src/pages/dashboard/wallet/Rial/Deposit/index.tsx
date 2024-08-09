import { useState } from "react";
import CreditCardForm from "./CreditCardForm";
import ShebaForm from "./ShebaForm";
import DirectDebit from "./DirectDebit";
import { useAppSelector } from "store/hooks";
import { useGetDebitAccountQuery } from "store/api/profile-management";

import wallet from "assets/scss/dashboard/wallet.module.scss";

export default function IRTDeposit() {
  // ==============|| States ||================= //
  const [activeTab, setActiveTab] = useState<"1" | "2" | "3">("1");

  // ==============|| Hooks ||================= //
  const { gateways } = useAppSelector((state: any) => state.user);
  const { data } = useGetDebitAccountQuery({});

  // ==============|| Handlers ||================= //
  const toggleTab = (tab: "1" | "2" | "3") => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  const renderForm = () => {
    switch (activeTab) {
      case "2":
        return <CreditCardForm />;
      case "3":
        return <ShebaForm activeTab="3" />;
      case "1":
      default:
        return <DirectDebit onClose={() => {}} />;
    }
  };

  // ==============|| Render ||================= //
  return (
    <>
      <div className={wallet["form-container"]}>
        <div className={wallet["type-list"]}>
          <div
            className={`${wallet["type-list__radio"]} ${activeTab === "1" ? wallet["active"] : ""}`}
            onClick={() => toggleTab("1")}
          >
            <div>
              <span>پیشنهاد آرسونیکس</span>
              <input type="radio" checked={activeTab === "1"} id="debit" />
              <label htmlFor="debit">شارژ سریع</label>
            </div>
          </div>
          <div
            className={`${wallet["type-list__radio"]} ${gateways?.length <= 0 ? wallet["disabled"] : ""} ${activeTab === "2" ? wallet["active"] : ""}`}
            onClick={() => toggleTab("2")}
          >
            <div>
              <input
                type="radio"
                checked={activeTab === "2"}
                disabled={gateways?.length <= 0}
                id="payment"
              />
              <label htmlFor="payment"> درگاه پرداخت</label>
            </div>
          </div>
          <div
            className={`${wallet["type-list__radio"]} ${activeTab === "3" ? wallet["active"] : ""}`}
            onClick={() => toggleTab("3")}
          >
            <div>
              <span>پابا، ساتنا، حساب به حساب</span>
              <input type="radio" checked={activeTab === "3"} id="iban" />
              <label htmlFor="iban">واریز شناسه دار</label>
            </div>
          </div>
        </div>
        <div className={wallet["form-wrapper"]}>{renderForm()}</div>
      </div>
      <div className={wallet.info}>
        <div className={`${wallet.info__box} ${wallet["danger-box"]}`}>
          لطفاً در صورت استفاده از فیلترشکن، آن را خاموش کنید.به دستور پلیس فتا،
          برای واریز ریالی IP شما باید کشور ایران باشد.
        </div>
        {activeTab === "1" && data && data.length > 0 && (
          <div className={`${wallet.info__box} ${wallet["info-box"]}`}>
            می توانید برای تغییر حساب انتخاب شده، از قابلیت قطع دسترسی به حساب و
            تنظیم مجدد برداشت مستقیم استفاده کنید.
          </div>
        )}
        {activeTab === "1" && data && data.length <= 0 && (
          <div className={`${wallet.info__box} ${wallet["info-box"]}`}>
            شماره موبایلی که در حساب کاربری آرسونیکس خود وارد کرده اید؛ باید با
            شماره موبایل حساب بانکی شما یکسان باشد.
          </div>
        )}
        {activeTab === "3" && (
          <div className={`${wallet.info__box} ${wallet["info-box"]}`}>
            از حساب‌هایی که در پروفایل خود وارد کرده‌اید امکان واریز وجود دارد.
          </div>
        )}
        {activeTab === "3" && (
          <div className={`${wallet.info__box} ${wallet["info-box"]}`}>
            شناسه واریز را در قسمت توضیحات یا شناسه واریز وارد نمایید.
          </div>
        )}
        {activeTab === "3" && (
          <div className={`${wallet.info__box} ${wallet["info-box"]}`}>
            تمامی روش‌های پرداخت بجز روش پل مورد تایید می‌باشد.
          </div>
        )}
      </div>
    </>
  );
}
