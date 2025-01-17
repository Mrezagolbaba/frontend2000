import logo from "assets/img/logo-arsonex.png";
import moment from "jalali-moment";
import { Button, Card, CardBody, CardHeader, Table } from "reactstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { convertText, normalizeAmount } from "helpers";
import { useAppSelector } from "store/hooks";
import { useGetCurrencySwapQuery } from "store/api/exchange-management";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

import "./styles.module.scss";

const Invoice = () => {
  // ==============|| Hooks ||================= //
  const { id } = useParams();
  const navigate = useNavigate();
  const componentRef = useRef() as any;
  const { firstName, lastName, irPhoneNumber, nationalId } = useAppSelector(
    (state) => state.user,
  );
  const { data: invoice, isLoading } = useGetCurrencySwapQuery(id as string);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current as any,
  });

  // ==============|| Handlers ||================= //
  const renderFee = () => {
    const transaction = invoice?.transactions.find(
      (t) => t.currencyCode === invoice?.feeCurrencyCode,
    );
    return normalizeAmount(transaction.fee, invoice?.feeCurrencyCode, true);
  };

  // ==============|| Render ||================= //
  return (
    <section className="page page-wallet mt-4">
      <Card>
        <CardHeader>
          <div className="card-back">
            <Link to="/">
              <span className="icon">
                <MdOutlineKeyboardArrowRight color="black" />
              </span>
            </Link>
          </div>
        </CardHeader>
        <CardBody>
          <div ref={componentRef as any} className="p-3" dir="rtl">
            <div className="invoice__header">
              <div className="container px-4">
                <div className="row align-items-center">
                  <div className="col-sm-12 col-md-4">
                    <div className="invoice-id text-md-end text-center d-flex">
                      <span>شناسه فاکتور:</span>
                      {isLoading ? (
                        <span className="text-center placeholder-glow d-flex justify-content-between w-50">
                          <span className="placeholder col-11 bg-secondary rounded py-2" />
                        </span>
                      ) : (
                        <span className="px-2">
                          {invoice?.transactions[0]?.invoiceNumber}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-4">
                    <div className="text-center mb-2 mt-2">
                      <img src={logo} alt="" className="invoice-logo" />
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-4">
                    <div className="invoice-id text-md-end text-center d-flex justify-content-end">
                      <span>تاریخ معامله:</span>
                      {isLoading ? (
                        <span className="text-center placeholder-glow d-flex justify-content-between w-50">
                          <span className="placeholder col-11 bg-secondary rounded py-2" />
                        </span>
                      ) : (
                        <time className="d-inline-block d-ltr px-2">
                          {moment(invoice?.createdAt)
                            .locale("fa")
                            .format("hh:mm YYYY/MM/DD")}
                        </time>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="invoice__body px-4">
              <div className="invoice-table">
                <h6 className="invoice-title">مشخصات خریدار:</h6>
                <div className="table-responsive">
                  <Table responsive style={{ border: "1px solid #E4E4E4" }}>
                    <thead className="table-light">
                      <tr>
                        <th scope="col" className="text-center">
                          نام
                        </th>
                        <th scope="col" className="text-center">
                          کدملی
                        </th>
                        <th scope="col" className="text-center">
                          شماره موبایل
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="tr-responsive">
                        <td
                          data-th="نحوه پرداخت کارمزد"
                          className="text-center"
                        >
                          <fieldset>
                            {firstName} {lastName}
                          </fieldset>
                        </td>
                        <td className="text-center">{nationalId}</td>
                        <td
                          className="text-center"
                          style={{
                            direction: "ltr",
                            textAlign: "center",
                          }}
                        >
                          <a href={`tel:${irPhoneNumber}`}>{irPhoneNumber}</a>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
              <div className="invoice-table">
                <h6 className="invoice-title">جزئیات معامله:</h6>
                <div className="table-responsive">
                  <Table responsive style={{ border: "1px solid #E4E4E4" }}>
                    <thead className="table-light">
                      <tr>
                        <th scope="col" className="text-center">
                          بازار معاملاتی
                        </th>
                        <th scope="col" className="text-center">
                          مقدار خرید
                        </th>
                        <th scope="col" className="text-center">
                          مقدار دریافت
                        </th>
                        <th scope="col" className="text-center">
                          کارمزد
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="tr-responsive">
                        <td data-th="بازار معاملاتی" className="text-center">
                          {isLoading ? (
                            <span className="text-center placeholder-glow d-flex justify-content-between w-100">
                              <span className="placeholder col-11 bg-secondary rounded py-2" />
                            </span>
                          ) : (
                            <span className="px-2">
                              {` تبدیل ${convertText(
                                invoice.sourceCurrencyCode,
                                "enToFa",
                              )} به ${convertText(
                                invoice.destinationCurrencyCode,
                                "enToFa",
                              )}`}
                            </span>
                          )}
                        </td>
                        <td data-th="مقدار خرید	" className="text-center">
                          {isLoading ? (
                            <span className="text-center placeholder-glow d-flex justify-content-between w-100">
                              <span className="placeholder col-11 bg-secondary rounded py-2" />
                            </span>
                          ) : (
                            <span className="px-2">
                              {normalizeAmount(
                                invoice?.sourceAmount,
                                invoice?.sourceCurrencyCode,
                                true,
                              )}
                            </span>
                          )}
                        </td>
                        <td data-th="مقدار دریافت	" className="text-center">
                          {isLoading ? (
                            <span className="text-center placeholder-glow d-flex justify-content-between w-100">
                              <span className="placeholder col-11 bg-secondary rounded py-2" />
                            </span>
                          ) : (
                            <span className="px-2">
                              {normalizeAmount(
                                invoice?.destinationAmount,
                                invoice?.destinationCurrencyCode,
                                true,
                              )}
                            </span>
                          )}
                        </td>
                        <td data-th="کارمزد" className="text-center">
                          {isLoading ? (
                            <span className="text-center placeholder-glow d-flex justify-content-between w-100">
                              <span className="placeholder col-11 bg-secondary rounded py-2" />
                            </span>
                          ) : (
                            <span className="px-2">{renderFee()}</span>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>

          <div className="invoice__footer">
            <div className="table-responsive"></div>
            <p className="invoice-desc"></p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                type="button"
                color="primary"
                className="px-5 py-3 mx-2"
                onClick={() => navigate("/dashboard/wallet")}
              >
                برداشت {convertText(invoice?.destinationCurrencyCode, "enToFa")}
              </Button>
              <Button
                color="primary"
                outline
                onClick={handlePrint}
                className="px-5 py-3 mx-2"
              >
                چاپ فاکتور
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </section>
  );
};
export default Invoice;
