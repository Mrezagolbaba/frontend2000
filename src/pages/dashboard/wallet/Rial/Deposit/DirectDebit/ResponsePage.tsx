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
                      ثبت حساب شما با موفقیت انجام شد، هم اکنون میتوانید موجودی
                      خود را افزایش دهید.
                    </span>
                  </div>
                ) : (
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <span className="icon">
                      <svg
                        fill="#ed0202"
                        viewBox="0 -8 528 528"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="#ed0202"
                        style={{ width: "100px", height: "100px" }}
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path d="M264 456Q210 456 164 429 118 402 91 356 64 310 64 256 64 202 91 156 118 110 164 83 210 56 264 56 318 56 364 83 410 110 437 156 464 202 464 256 464 310 437 356 410 402 364 429 318 456 264 456ZM264 288L328 352 360 320 296 256 360 192 328 160 264 224 200 160 168 192 232 256 168 320 200 352 264 288Z"></path>
                        </g>
                      </svg>
                    </span>
                    <span className="text-dark">
                      متاسفانه مشکلی در ثبت حساب شما بوجود آمده است، لطفا مجدد
                      درخواست خود را ثبت کنید.
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
