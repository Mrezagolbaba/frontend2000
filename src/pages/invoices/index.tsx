import Layout from "layouts/dashboard";
import { useAppSelector } from "redux/hooks";

const Invoices = () => {
  const user = useAppSelector((state) => state.user);
  const { firstName, lastName, email, phoneNumber } = user;
  return (
    <Layout>
      <section className="page page-wallet mt-4">
        <div className="card card-secondary invoice">
          <div className="card-header card-header-flex">
            <div className="card-back">
              <a href="#" className="">
                <span className="icon">
                  <svg
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.454916 13.4658C0.206533 13.2223 0.183953 12.8412 0.387175 12.5727L0.454916 12.4958L6.06118 6.99998L0.454916 1.50417C0.206533 1.26067 0.183953 0.879632 0.387175 0.611126L0.454916 0.5342C0.703299 0.290701 1.09198 0.268564 1.36587 0.467791L1.44434 0.5342L7.54508 6.515C7.79347 6.75849 7.81605 7.13953 7.61282 7.40804L7.54508 7.48496L1.44434 13.4658C1.17112 13.7336 0.728137 13.7336 0.454916 13.4658Z"
                      fill="#03041B"
                      fill-opacity="0.4"
                    ></path>
                  </svg>
                </span>
              </a>
            </div>
          </div>
          <div className="card-body">
            <div className="invoice__header">
              <div className="containerr">
                <div className="row align-items-center">
                  <div className="col-sm-12 col-md-4">
                    <div className="invoice-id text-md-end text-center">
                      شناسه فاکتور: 12345678
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-4">
                    <div className="invoice-date text-md-start text-center">
                      تاریخ معامله:
                      <time className="d-inline-block d-ltr">
                        01/06/08 - 11:43
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
                  <table className="table table-new-ii">
                    <thead>
                      <tr>
                        <th scope="col" className="text-center">
                          نام
                        </th>
                        <th scope="col" className="text-center">
                          ایمیل
                        </th>
                        <th scope="col" className="text-center">
                          کد ملی
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-center">{`${firstName} ${lastName}`}</td>
                        <td className="text-center">{email}</td>
                        <td className="text-center">{phoneNumber}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="invoice-table">
                <h6 className="invoice-title">جزئیات معامله:</h6>
                <div className="table-responsive">
                  <table className="table table-new-ii">
                    <thead>
                      <tr>
                        <th scope="col" className="text-center">
                          بازار
                        </th>
                        <th scope="col" className="text-center">
                          مقدار (لیر)
                        </th>
                        <th scope="col" className="text-center">
                          قیمت واحد (تومان)
                        </th>
                        <th scope="col" className="text-center">
                          قیمت کل (تومان)
                        </th>
                        <th scope="col" className="text-center">
                          مبلغ کارمزد
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-center">ریال - لیر</td>
                        <td className="text-center">456</td>
                        <td className="text-center">2,070</td>
                        <td className="text-center">943,920.0</td>
                        <td className="text-center">۲۵ لیر</td>
                      </tr>
                      <tr className="invoice-summary">
                        <td
                        // colspan="6"
                        >
                          <strong> مبلغ کل معامله:</strong>943,920 تومان معادل
                          453 لیر ترکیه
                        </td>
                      </tr>
                      <tr className="invoice-summary">
                        <td
                        // colspan="5"
                        >
                          <strong>دریافتی شما:</strong>453 لیر
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="invoice__footer">
              <div className="table-responsive"></div>

              <p className="invoice-desc"></p>
              <div className="text-center">
                <a href="#" className="btn btn-outline-primary">
                  چاپ فاکتور
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default Invoices;
