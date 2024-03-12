import Layout from "layouts/dashboard";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import TicketModal from "./addModal";
import { useState } from "react";
import { useGetTicketsQuery } from "store/api/ticket";
import { ITicket } from "types/ticket";
import moment from "jalali-moment";
import { Link } from "react-router-dom";

const Support = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, error, isLoading } = useGetTicketsQuery();
  // console.log(data)
  return (
    <section className="page page-support">
      <Card className="custom-card currencies-online-rates card-secondary">
        <CardHeader className="d-flex flex-row justify-content-between align-items-center">
          <CardTitle tag="h5">پشتیبانی</CardTitle>
          <div className="card-action">
            <button
              className="btn btn-outline-primary"
              onClick={() => setIsModalOpen(true)}
            >
              ارسال تیکت
            </button>
          </div>
        </CardHeader>
        <CardBody>
          <div className="table-responsive">
            <table className="table table-borderless ">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    تاریخ ارسال
                  </th>
                  <th scope="col" className="text-center">
                    عنوان تیکت
                  </th>
                  <th scope="col" className="text-center">
                    وضعیت
                  </th>
                  <th scope="col" className="text-center"></th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item: ITicket) => (
                  <tr>
                    <td className="text-center">
                      <span className="d-ltr d-block">
                        {moment(item?.createdAt)
                          .locale("fa")
                          .format("DD MMMM YYYY")}
                      </span>
                    </td>
                    <td className="text-center">{item.subject}</td>
                    <td className="text-center">
                      {item.status === "OPEN" ? (
                        <span className="text-success"> در دست بررسی </span>
                      ) : (
                        <span className="text-danger">خاتمه یافته</span>
                      )}
                    </td>
                    <td className="text-center table-new__actions">
                      <Link to={`/dashboard/support/details/${item.id}`}>
                        مشاهده جزئیات
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
              {isLoading && (
                <tbody>
                  <tr>
                    <td className="placeholder-glow">
                      <div className="placeholder col-12 rounded" />
                    </td>
                    <td className="placeholder-glow">
                      <div className="placeholder col-12 rounded" />
                    </td>
                    <td className="placeholder-glow">
                      <div className="placeholder col-12 rounded" />
                    </td>
                    <td className="placeholder-glow">
                      <div className="placeholder col-12 rounded" />
                    </td>
                    <td className="placeholder-glow">
                      <div className="placeholder col-12 rounded" />
                    </td>
                  </tr>
                  <tr>
                    <td className="placeholder-glow">
                      <div className="placeholder col-12 rounded" />
                    </td>
                    <td className="placeholder-glow">
                      <div className="placeholder col-12 rounded" />
                    </td>
                    <td className="placeholder-glow">
                      <div className="placeholder col-12 rounded" />
                    </td>
                    <td className="placeholder-glow">
                      <div className="placeholder col-12 rounded" />
                    </td>
                    <td className="placeholder-glow">
                      <div className="placeholder col-12 rounded" />
                    </td>
                  </tr>
                  <tr>
                    <td className="placeholder-glow">
                      <div className="placeholder col-12 rounded" />
                    </td>
                    <td className="placeholder-glow">
                      <div className="placeholder col-12 rounded" />
                    </td>
                    <td className="placeholder-glow">
                      <div className="placeholder col-12 rounded" />
                    </td>
                    <td className="placeholder-glow">
                      <div className="placeholder col-12 rounded" />
                    </td>
                    <td className="placeholder-glow">
                      <div className="placeholder col-12 rounded" />
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </CardBody>
      </Card>
      <TicketModal
        isModalOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => setIsModalOpen(false)}
      />
    </section>
  );
};
export default Support;
