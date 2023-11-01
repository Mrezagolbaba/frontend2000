import { AuthenticationLevel2Props } from "./types";
import { Button, Col, Container, Row } from "reactstrap";

import profile from "assets/scss/dashboard/profile.module.scss";
export default function ConfirmInternationalService({
  onClick,
}: AuthenticationLevel2Props) {
  return (
    <Container>
      <Row className="justify-content-between my-3">
        <Col className={profile["modal-title"]}>
          <h5> خدمات بین المللی </h5>
          <Button color="link" onClick={() => {}} className="title-help">
            خدمات بین المللی چیست؟
          </Button>
        </Col>
      </Row>
      <Row>
        <div className="alert alert-info mb-4 mt-3">
          خدمات بین المللی آرسونیکس برای ایرانیان مقیم خارج از کشور می باشد.
        </div>

        <p className={profile["video-summary-text"]}>
          قصد استفاده از خدمات بین المللی آرسونیکس را دارید؟
          <br />
          (می توانید دارایی های خود را در حساب های بانکی خارج از ایران را به
          تومان یا ارز دیجیتال و بالعکس تبدیل کنید.)
        </p>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center pt-5">
          <Button
            style={{ minWidth: "180px" }}
            color="primary"
            size="large"
            outline
            className="py-3 px-5 mx-2"
            onClick={() => onClick?.(5)}
          >
            بله
          </Button>
          <Button
            style={{ minWidth: "180px" }}
            color="danger"
            size="large"
            className="py-3 px-5 mx-2"
          >
            خیر
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
