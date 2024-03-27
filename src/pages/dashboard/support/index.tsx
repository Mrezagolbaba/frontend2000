import TicketModal from "./AddModal";
import moment from "jalali-moment";
import { Button, Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { ITicket } from "types/ticket";
import { Link } from "react-router-dom";
import { useGetTicketsQuery } from "store/api/ticket";
import { useState } from "react";

const Support = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useGetTicketsQuery();
  return (
    <section className="page page-support">
      <Card className="custom-card currencies-online-rates card-secondary">
        <CardHeader className="d-flex flex-row justify-content-between align-items-center">
          <CardTitle tag="h5">پشتیبانی</CardTitle>
          <div className="card-action">
            <Button
              className="mx-2 px-4"
              color="primary"
              size="sm"
              style={{
                fontSize: ".87rem",
              }}
              onClick={() => setIsModalOpen(true)}
            >
              مرکز راهنمایی
            </Button>
            <Button
              color="primary"
              outline
              size="sm"
              style={{
                fontSize: ".87rem",
              }}
              className="px-4"
              onClick={() => setIsModalOpen(true)}
            >
              ارسال تیکت
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <div
            className="table-responsive"
            style={{
              fontSize: ".87rem",
            }}
          >
            <table
              className={`table table-borderless ${data?.length === 0 ? "table-modern" : "table-striped"}`}
            >
              <thead>
                <tr>
                  <th
                    scope="col"
                    style={{ color: "#03041b66" }}
                    className="text-center"
                  >
                    تاریخ ارسال
                  </th>
                  <th
                    scope="col"
                    style={{ color: "#03041b66" }}
                    className="text-center"
                  >
                    عنوان تیکت
                  </th>
                  <th
                    scope="col"
                    style={{ color: "#03041b66" }}
                    className="text-center"
                  >
                    وضعیت
                  </th>
                  <th scope="col" className="text-center"></th>
                </tr>
              </thead>
              {isLoading ? (
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
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {data?.map((item: ITicket, index: number) => (
                    <tr key={index}>
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
                          <span className="text-success"> باز</span>
                        ) : (
                          <span className="text-danger">بسته </span>
                        )}
                      </td>
                      <td className="text-center table-new__actions">
                        <Link to={`details/${item.id}`}>مشاهده جزئیات</Link>
                      </td>
                    </tr>
                  ))}
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
