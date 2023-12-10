import { Card, CardBody, CardHeader, Table } from "reactstrap";
import { useAppSelector } from "store/hooks";
import logo from "assets/img/logo-arsonex.png";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import "./styles.module.scss";
import { convertText } from "helpers";
import moment from "jalali-moment";
import { useLocation } from "react-router-dom";

const Invoice = () => {
  const user = useAppSelector((state) => state.user);
  const location = useLocation();
  const { firstName, lastName, phoneNumber, nationalId } = user;
  const invoice = location.state;
  return (
    <section className="page page-wallet mt-4">
      <Card>
        <CardHeader>
          <div className="card-back">
            <a href="#">
              <span className="icon">
                <MdOutlineKeyboardArrowRight color="black" />
              </span>
            </a>
          </div>
        </CardHeader>
        <CardBody>
          <div className="invoice__header">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-sm-12 col-md-4">
                  <div className="invoice-id text-md-end text-center">
                    شناسه فاکتور: 12345678
                  </div>
                </div>
                <div className="col-sm-12 col-md-4">
                  <div className="text-center mb-2 mt-2">
                    <img src={logo} alt="" className="invoice-logo" />
                  </div>
                </div>
                <div className="col-sm-12 col-md-4">
                  <div className="invoice-date text-md-start text-center">
                    تاریخ معامله:
                    <time className="d-inline-block d-ltr">
                      {moment(invoice.createdAt)
                        .locale("fa")
                        .format("YYYY/MM/DD")}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="invoice__body">
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
                      <td data-th="نحوه پرداخت کارمزد" className="text-center">
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
                        {phoneNumber}
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
                        تبدیل{" "}
                        {convertText(invoice.sourceCurrencyCode, "enToFa")} به{" "}
                        {convertText(invoice.destinationCurrencyCode, "enToFa")}
                      </td>
                      <td data-th="مقدار خرید	" className="text-center">
                        {invoice.sourceAmount}{" "}
                        {convertText(invoice.sourceCurrencyCode, "enToFa")}
                      </td>
                      <td data-th="مقدار خرید	" className="text-center">
                        {invoice.destinationAmount}{" "}
                        {convertText(invoice.destinationCurrencyCode, "enToFa")}
                      </td>
                      <td data-th="کارمزد" className="text-center">
                        54,000 تومان
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
          <div className="invoice__footer">
            <div className="table-responsive"></div>
            <p className="invoice-desc"></p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <button type="button" className="btn btn-primary mb-2 mr-2">
                برداشت تتر
              </button>
              <a href="#" className="btn btn-outline-primary mb-2 ml-2">
                چاپ فاکتور
              </a>
            </div>
          </div>
        </CardBody>
      </Card>
    </section>
  );
};
export default Invoice;
