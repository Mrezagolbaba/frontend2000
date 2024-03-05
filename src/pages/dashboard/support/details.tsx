import Layout from "layouts/dashboard";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { useAppSelector } from "store/hooks";
import support from './styles.module.scss'
import { useCloseTicketMutation, useGetRepliesQuery, useReplyTicketMutation } from "store/api/ticket";
import { useParams } from 'react-router-dom';
import { useState } from "react";


const SupportDetails = () => {
  let { id } = useParams();
  const [reply, setReplay] = useState('')
  const user = useAppSelector((state) => state.user);
  const [closeTicket] = useCloseTicketMutation();
  const { data: replies, error: errorReplies, isLoading: isLoadingReplies } = useGetRepliesQuery({ ticketId: id as string });
  const [replyTicket] = useReplyTicketMutation();

  const handleCloseTicket = () => {
    closeTicket({ ticketId: id as string });
  }
  console.log(replies)

  const onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const data = {
      ticketId: id as string,
      content: reply
    }
    replyTicket(data)
  }
  const { firstName, lastName } = user;
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

          <div className="container">
            <Row>
              <Col xs={12} lg={12}>
                <div className="table-responsive">
                  <table id="responsive" className="table-modern table table-borderless">
                    <thead>
                      <tr>
                        <th>تاریخ ثبت تیکت</th>
                        <th>تاریخ بروزرسانی تیکت</th>
                        <th>عنوان تیکت</th>
                        <th>موضوع تیکت</th>
                        <th>وضعیت تیکت</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1402/03/30</td>
                        <td>1402/03/31</td>
                        <td>احراز هویت انجام نشده</td>
                        <td>
                          <span>احراز هویت</span>
                        </td>
                        <td>
                          <span className="text-primary">در دست بررسی</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="comment" style={{ border: '1px solid #eaeaea', padding: "20px 30px", borderRadius: '10px', marginTop: '20px', marginBottom: '20px' }}>
                  <div className="comment-footer">
                    <span className="comment-meta">{`${firstName} ${lastName}`}</span>
                  </div>
                  <div className="comment-body">

                    <p className="comment-text">
                      سلام امیدوارم حالتون خوب باشه، من احراز هویت انجام دادم
                      ولی تکمیل نشده
                    </p>

                  </div>
                </div>
                <div className="comment" style={{ backgroundColor: '#2d59e833', padding: "20px 30px", borderRadius: '10px', marginTop: '20px', marginBottom: '20px' }}>
                  <div className="comment-footer">
                    <h6 className="comment-meta" style={{ color: "#eaeaea" }}>
                      اپراتور پشتیبانی
                    </h6>
                  </div>
                  <div className="answer comment-body">
                    <p className="comment-text">
                      سلام وقت شما بخیر. بررسی انجام شد و احراز هویت تکمیل شد
                    </p>

                  </div>
                </div>

                <h5 className="mb-30 padding-top-1x">
                  ارسال پاسخ برای این تیکت
                </h5>
                <form method="post" onSubmit={onSubmit}>
                  <div className="form-group">
                    <textarea
                      className="form-control form-control-rounded"
                      id="review_text"
                      placeholder="پاسخ خود را در این قسمت بنویسید"
                      style={{ height: "100px" }}
                      onChange={(e) => setReplay(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="text-right mt-4">
                    <button className="btn btn-outline-primary" type="submit">
                      ارسال پاسخ{" "}
                    </button>
                  </div>
                </form>
              </Col>
            </Row>
          </div>{" "}
        </CardBody>
      </Card>
    </section>
  );
};
export default SupportDetails;
