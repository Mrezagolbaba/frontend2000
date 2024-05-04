import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import { GiBrokenSkull } from "react-icons/gi";
import { RiBattery2ChargeFill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";

export default function ResponsePage() {
  // ==============|| Hooks ||================= //
  const { status } = useParams();
  const navigate = useNavigate();

  // ==============|| Render ||================= //
  return (
    <Card>
      <CardBody>
        <Container>
          <Row>
            <Col xs={12} className="my-3 px-3">
              <div
                className="bg-light bg-gradient rounded-1 d-flex justify-content-center align-items-center"
                style={{ height: "200px" }}
              >
                {status === "SUCCEED" ? (
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <RiBattery2ChargeFill className="text-success fs-2 mb-3" />
                    <span className="text-info">
                      امکان شارژ سریع برای شما با موفقیت ایجاد شد.
                    </span>
                  </div>
                ) : (
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <GiBrokenSkull className="text-danger fs-2 mb-3" />
                    <span className="text-dark">
                      متاسفاته مشکلی در ثبت حساب شما بوجود آمده است لطفا بعد از
                      هماهنگی با بانک خود دوباره تلاش کنید.
                    </span>
                  </div>
                )}
              </div>
            </Col>
            <Col xs={12} className="text-center mt-4">
              <Button
                color="primary"
                outline
                className="px-5 py-3"
                onClick={() => navigate("/dashboard/wallet")}
              >
                بازگشت به صفحه کیف پول
              </Button>
            </Col>
          </Row>
        </Container>
      </CardBody>
    </Card>
  );
}
