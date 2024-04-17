import Dialog from "components/Dialog";
import {
  CardTitle,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";

import { useState } from "react";
import DepositCrypto from "pages/dashboard/wallet/Crypto/Deposit";

import ExchangeForm from "./ExchangeForm";
import DepositFiat from "../wallet/Fiat/Deposit";
import Deposit from "../wallet/Rial/Deposit";
import { CurrencyCode } from "types/wallet";

import exchange from "assets/scss/dashboard/exchange.module.scss";
import { Link } from "react-router-dom";

const accordionData = [
  {
    id: "1",
    question: "برای استفاده از بخش معاملات سریع چه پیش نیاز‌هایی لازم است؟",
    answer:
      "برای استفاده بدون محدودیت از بخش معاملات سریع باید سطح دو احراز هویت را تکمیل نمایید. شما در حالت عادی با احراز هویت سطح یک قابلیت معاملات تمامی ارزها را خواهید داشت، اما محدودیت اصلی میزان برداشت دارایی‌های شما از کیف پول می‌باشد که با ارتقا سطح حساب کاربری می‌توانید بدون محدودیت تمام دارایی‌های خود را برداشت کنید. برای انجام احراز هویت وارد بخش پروفایل شوید و مراحل احراز هویت را تکمیل نمایید.",
  },
  {
    id: "2",
    question: "چطور مبدا معامله را به حساب کاربری خود واریز کنم؟",
    answer:
      "می‌توانید از بخش کیف پول اقدام به شارژ دارایی خود در آرسونیکس کنید.همچنین شما می‌توانید در هنگام تعیین مقدار مبدا معامله با استفاده از بخش واریز که در بالای فرم معامله مشاهده می‌کنید اقدام به واریز نمایید.",
  },
  {
    id: "3",
    question: "چرا امکان واریز فیات دیجیتال برای من وجود ندارد؟",
    answer:
      "در صورتی که کارت اقامت محل زندگی خود (بجز ایران) را از قسمت احراز هویت ارسال کنید قابلیت واریز فیات دیجیتال برای شما فعال می‌شود. با توجه به اینکه در آرسونیکس حفظ بدون ریسک دارایی کاربران در اولویت وجود دارد، سیاست اجرایی آرسونیکس در دریافت پول کاملا مطابق با قوانین بین‌المللی می‌باشد، شما می‌توانید با ارسال کارت اقامت محل زندگی خود در خارج از ایران دارایی خود در حساب‌های قاره‌های آسیا، اروپا، امریکا و اقیانوسیه به حساب کاربری خود واریز کنید. برای فعالسازی قابلیت واریز فیات دیجیتال وارد بخش پروفایل شوید و مراحل احراز هویت را تکمیل نمایید.",
  },
  {
    id: "4",
    question: "چقدر زمان برای دریافت فیات دیجیتال لازم است؟",
    answer:
      "لیر ترکیه ۲۴/۷ واریز می‌شود، اتحادیه اروپا و انگلستان در روزهای کاری ۲۴ ساعته واریز می‌شود.کشورهای دیگر مانند امارات، استرالیا یا نیوزلند، در اولین سیکل کاری بانک واریز می‌شود.",
  },
  {
    id: "5",
    question: "چقدر زمان برای دریافت ارز دیجیتال لازم است؟",
    answer:
      "در آرسونیکس ارز دیجیتال بعد از درخواست برداشت به حساب کاربر بدون وقفه زمانی واریز می‌شود. در صورتی که مراحل احراز هویت خود را به طور کامل انجام دهید، ارز دیجیتال شما بدون معطلی به کیف پول شما واریز می‌شود.",
  },
  {
    id: "6",
    question: "چقدر زمان برای دریافت تومان لازم است؟",
    answer:
      "واریز تومان بلافاصله بعد از ثبت برداشت در اولین سیکل پایا در روزهای کاری واریز می‌شود. در صورتی که مراحل احراز هویت را به طور کامل انجام داده باشید، برای اینکه بتوانید در روز به صورت نامحدود درخواست برداشت تومان داشته باشید باید سطح احراز هویت خود را ارتقا دهید.",
  },
];
export default function Exchange() {
  const [configDialog, setConfigdialog] = useState<{
    isOpen: boolean;
    currency: CurrencyCode;
  }>({ isOpen: false, currency: "IRR" });

  const [open, setOpen] = useState("");
  const toggle = (id) => {
    if (open === id) {
      setOpen("");
    } else {
      setOpen(id);
    }
  };
  const accordionItems = accordionData.map((item) => (
    <AccordionItem key={item.id}>
      <AccordionHeader
        className={exchange["accordion-header"]}
        targetId={item.id}
      >
        {item.question}
      </AccordionHeader>
      <AccordionBody
        accordionId={item.id}
        className={exchange["accordion-body"]}
      >
        <strong>{item.answer}</strong>
      </AccordionBody>
    </AccordionItem>
  ));

  const initDialog = () => {
    setConfigdialog({ isOpen: false, currency: "IRR" });
  };

  return (
    <section className="page page-wallet">
      <Row className="g-4">
        <Col xs={12} xxl={7} className="h-100">
          <ExchangeForm setIsOpenDialog={setConfigdialog} />
        </Col>
        <Col xs={12} xxl={5}>
          <Card className="h-100">
            <CardHeader className="d-flex flex-row justify-content-between align-items-center">
              <CardTitle tag="h5"> سوالات متداول</CardTitle>
              <div className="card-action">
                <Link
                  target="_blank"
                  className="btn btn-link"
                  to="https://help.arsonex.com/"
                >
                  مرکز راهنمایی{" "}
                </Link>
              </div>
            </CardHeader>

            <CardBody>
              <Accordion
                flush
                className="border-less"
                open={open}
                toggle={toggle}
              >
                {accordionItems}
              </Accordion>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Dialog
        title={
          configDialog.currency === "USDT"
            ? "واریز تتر"
            : configDialog.currency === "TRY"
              ? "واریز لیر"
              : "واریز تومان"
        }
        isOpen={configDialog.isOpen}
        onClose={() => initDialog()}
        hasCloseButton
      >
        {configDialog.currency === "USDT" ? (
          <DepositCrypto onClose={() => initDialog()} currency="USDT" />
        ) : configDialog.currency === "TRY" ? (
          <DepositFiat onClose={() => initDialog()} />
        ) : (
          <Deposit />
        )}
      </Dialog>
    </section>
  );
}
