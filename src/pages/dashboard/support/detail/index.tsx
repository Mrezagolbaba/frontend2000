import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";
import ReplyTickets from "./List";
import TicketForm from "./Form";
import moment from "jalali-moment";
import { useAppSelector } from "store/hooks";
import { useCloseTicketMutation, useGetTicketQuery } from "store/api/ticket";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading: loadingTicket } = useGetTicketQuery(id as string);
  const [closeTicket, { isSuccess }] = useCloseTicketMutation();

  const { firstName, lastName } = useAppSelector((state) => state.user);

  const handleCloseTicket = () => {
    closeTicket({ ticketId: id as string });
  };

  useEffect(() => {
    isSuccess && navigate("/dashboard/support");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <section className="page page-support">
      <Card className="custom-card currencies-online-rates card-secondary">
        <CardHeader className="d-flex flex-row justify-content-between align-items-center">
          <CardTitle tag="h5">پشتیبانی</CardTitle>
          <div className="card-action">
            {data?.ticket.status !== "CLOSE" && !loadingTicket && (
              <Button color="primary" outline onClick={handleCloseTicket}>
                بستن تیکت
              </Button>
            )}
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
                              .format("hh:mm YYYY/MM/DD")}
                          </td>
                          <td>
                            {moment(data?.ticket.updatedAt)
                              .locale("fa")
                              .format("hh:mm YYYY/MM/DD")}
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
                <ReplyTickets
                  id={id as string}
                  description={data?.ticket.description}
                />

                <h5 className="mb-30 padding-top-1x">
                  ارسال پاسخ برای این تیکت
                </h5>
                <TicketForm id={id as string} />
              </Col>
            </Row>
          </Container>
        </CardBody>
      </Card>
    </section>
  );
}
Detail;
