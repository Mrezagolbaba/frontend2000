import Layout from "layouts/dashboard";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";
import { useAppSelector } from "store/hooks";
import support from "./styles.module.scss";
import {
  useCloseTicketMutation,
  useGetRepliesQuery,
  useGetTicketQuery,
  useReplyTicketMutation,
} from "store/api/ticket";
import { useParams } from "react-router-dom";
import { useState } from "react";
import moment from "jalali-moment";
import ReplyTicket from "./ReplyTicketList";
import ReplyTicketForm from "./ReplyTicketForm";

const categoryRender = (value) => {
  switch (value) {
    case "USER_PROFILE_AND_VERIFICATION":
      return "اطلاعات هویتی و احراز";
    case "TICKET_DEPOSIT_WITHDRAW":
      return "واریز و برداشت";
    case "TICKET_TECHNICAL_ISSUES":
      return "مشکلات فنی";
    case "TICKET_TO_ADMIN":
      return "مدیریت";
    case "TICKETـCRITICSـAND_SUGGESSTIONS":
    default:
      return "انتقادات و پیشنهادات";
  }
};

export default function Detail() {
  const { firstName, lastName } = useAppSelector((state) => state.user);
  const { id } = useParams();
  const [reply, setReplay] = useState("");
  const [closeTicket] = useCloseTicketMutation();
  const { data, isLoading: loadingTicket } = useGetTicketQuery(id as string);
  const [replyTicket] = useReplyTicketMutation();

  const handleCloseTicket = () => {
    closeTicket({ ticketId: id as string });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const data = {
      ticketId: id as string,
      content: reply,
    };
    replyTicket(data);
  };
  return (
    <section className="page page-support">
      <Card className="custom-card currencies-online-rates card-secondary">
        <CardHeader className="d-flex flex-row justify-content-between align-items-center">
          <CardTitle tag="h5">پشتیبانی</CardTitle>
          <div className="card-action">
            <button
              className="btn btn-outline-primary"
              data-bs-toggle="modal"
              onClick={handleCloseTicket}
            >
              بستن تیکت
            </button>
          </div>
        </CardHeader>
        <CardBody>
          <Container>
            <Row>
              <Col xs={12} lg={12}>
                <div className="table-responsive">
                  <table
                    id="responsive"
                    style={{ fontSize: ".75rem" }}
                    className="table-modern table table-borderless"
                  >
                    <thead>
                      <tr>
                        <th
                          style={{
                            color: "#03041b66",
                          }}
                        >
                          زمان ایجاد
                        </th>
                        <th
                          style={{
                            color: "#03041b66",
                          }}
                        >
                          بروزرسانی
                        </th>
                        <th
                          style={{
                            color: "#03041b66",
                          }}
                        >
                          وضعیت تیکت
                        </th>
                        <th
                          style={{
                            color: "#03041b66",
                          }}
                        >
                          دسته بندی
                        </th>
                        <th
                          style={{
                            color: "#03041b66",
                          }}
                        >
                          ایجاد کننده
                        </th>
                        <th
                          style={{
                            color: "#03041b66",
                          }}
                        >
                          عنوان تیکت
                        </th>
                      </tr>
                    </thead>
                    {loadingTicket ? (
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
                          <td className="placeholder-glow">
                            <div className="placeholder col-12 rounded" />
                          </td>
                        </tr>
                      </tbody>
                    ) : (
                      <tbody>
                        <tr>
                          <td>
                            {moment(data?.ticket.createdAt)
                              .locale("fa")
                              .format("YYYY/MM/DD")}
                          </td>
                          <td>
                            {moment(data?.ticket.updatedAt)
                              .locale("fa")
                              .format("YYYY/MM/DD")}
                          </td>
                          <td>
                            <span className="text-primary">
                              {" "}
                              {data?.ticket.status === "OPEN"
                                ? "در دست بررسی"
                                : "بسته"}
                            </span>
                          </td>
                          <td>{categoryRender(data.ticket.category)}</td>
                          <td>{`${firstName} ${lastName}`}</td>
                          <td>{data.ticket.subject}</td>
                        </tr>
                      </tbody>
                    )}
                  </table>
                </div>
                <ReplyTicket
                  id={id as string}
                  description={data?.ticket.description}
                />

                <h5 className="mb-30 padding-top-1x">
                  ارسال پاسخ برای این تیکت
                </h5>
                <ReplyTicketForm id={id as string} />
              </Col>
            </Row>
          </Container>
        </CardBody>
      </Card>
    </section>
  );
}
Detail;
