import { useState } from "react";
import CreditCardForm from "./CreditCardForm";
import ShebaForm from "./ShebaForm";
import DirectDebit from "./DirectDebit";
import { useAppSelector } from "store/hooks";
import { useGetDebitAccountQuery } from "store/api/profile-management";

import wallet from "assets/scss/dashboard/wallet.module.scss";
import { AlertDanger, AlertInfo, AlertWarning } from "components/AlertWidget";

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
        {activeTab === "1" && data && data.length > 0 && (
          <AlertInfo
            hasIcon
            text="می توانید برای تغییر حساب انتخاب شده، از قابلیت قطع دسترسی به حساب و تنظیم مجدد برداشت مستقیم استفاده کنید."
          />
        )}
        {activeTab === "1" && (
          <>
            <AlertWarning
              hasIcon
              text="لطفاً در صورت استفاده از فیلترشکن، آن را خاموش کنید.به دستور پلیس فتا، برای واریز ریالی IP شما باید کشور ایران باشد."
            />
            <AlertInfo
              hasIcon
              text="بعد از اتصال می‌توانید دسترسی به حساب را قطع یا حساب جدید دیگری را برای شارژ سریع اضافه کنید."
            />
          </>
        )}
        {activeTab === "1" && data && data.length <= 0 && (
          <AlertInfo
            hasIcon
            text="
            شماره موبایلی که در حساب کاربری آرسونیکس خود وارد کرده اید؛ باید با شماره موبایل حساب بانکی شما یکسان باشد."
          />
        )}
        {activeTab === "2" && data && data.length <= 0 && (
          <>
            <AlertWarning
              hasIcon
              text="
            اعلان نارنجی، کاربر گرامی؛ لطفاً با دقت به آدرس صفحه درگاه بانکی توجه فرمایید و تنها پس از اطمینان از ورود به سایت‌های سامانه شاپرک، اطلاعات کارت بانکی خود را وارد نمایید."
            />
            <AlertInfo
              hasIcon
              text="پیشنهاد آرسونیکس از استفاده از قابلیت شارژ سریع به جای درگاه پرداخت می‌باشد."
            />
          </>
        )}

        {activeTab === "3" && (
          <AlertInfo
            hasIcon
            text="
            از حساب‌هایی که در پروفایل خود وارد کرده‌اید امکان واریز وجود دارد."
          />
        )}
        {activeTab === "3" && (
          <>
            <AlertWarning
              hasIcon
              text="
            واریز وجه تنها از طریق روش‌های پایا، ساتنا و حساب به حساب و صرفاً با استفاده از شماره شبای اعلام‌شده و مورد تأیید امکان‌پذیر است. لطفاً توجه داشته باشید که زمان دریافت وجه بسته به روش انتخابی متفاوت خواهد بود. همچنین، از روش‌هایی نظیر پل امکان واریز وجود ندارد."
            />
            <AlertWarning
              hasIcon
              text="
لطفاً در هنگام واریز، شناسه واریز را در قسمت مربوطه در همراه بانک یا اینترنت بانک خود وارد نمایید. در غیر این صورت، تراکنش توسط آرسونیکس قابل پیگیری نخواهد بود و پس از گذشت ۷۲ ساعت کاری، مبلغ با کسر کارمزد به حساب شما مسترد خواهد شد."
            />
            <AlertInfo
              hasIcon
              text="
            شناسه واریز را در قسمت توضیحات یا شناسه واریز وارد نمایید."
            />
            <AlertInfo
              hasIcon
              text="
            تمامی روش‌های پرداخت بجز روش پل مورد تایید می‌باشد."
            />
          </>
        )}
      </div>
    </>
  );
}
