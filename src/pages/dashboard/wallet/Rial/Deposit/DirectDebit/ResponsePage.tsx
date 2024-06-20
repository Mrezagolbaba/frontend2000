import Layout from "layouts/dashboard";
import useQueryParams from "hooks/useQueryParams";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";

export default function ResponsePage() {
  // ==============|| Hooks ||================= //
  const query = useQueryParams();
  const status = query.get("status") || "";
  const navigate = useNavigate();

  // ==============|| Render ||================= //
  return (
    <Layout>
      <Card>
        <CardBody>
          <Container>
            <Row>
              <Col xs={12}>
                <h4 className="auth-title mt-4 mb-4 text-center">
                  {status === "SUCCEED" ? "اتصال موفق" : "اتصال ناموفق"}
                </h4>
              </Col>
              <Col xs={12} className="px-3">
                <div
                  className="rounded-1 d-flex justify-content-center align-items-center"
                  style={{ height: "200px" }}
                >
                  {status === "SUCCEED" ? (
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      <div className="text-center mb-4 mt-4">
                        <span className="icon">
                          <svg
                            viewBox="0 0 512 512"
                            version="1.1"
                            fill="#18ff14"
                            stroke="#18ff14"
                            style={{ width: "100px", height: "100px" }}
                          >
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              <title>success-filled</title>
                              <g
                                id="Page-1"
                                stroke="none"
                                stroke-width="1"
                                fill="none"
                                fill-rule="evenodd"
                              >
                                <g
                                  id="add-copy-2"
                                  fill="#008521"
                                  transform="translate(42.666667, 42.666667)"
                                >
                                  <path
                                    d="M213.333333,3.55271368e-14 C95.51296,3.55271368e-14 3.55271368e-14,95.51296 3.55271368e-14,213.333333 C3.55271368e-14,331.153707 95.51296,426.666667 213.333333,426.666667 C331.153707,426.666667 426.666667,331.153707 426.666667,213.333333 C426.666667,95.51296 331.153707,3.55271368e-14 213.333333,3.55271368e-14 Z M293.669333,137.114453 L323.835947,167.281067 L192,299.66912 L112.916693,220.585813 L143.083307,190.4192 L192,239.335893 L293.669333,137.114453 Z"
                                    id="Shape"
                                  ></path>
                                </g>
                              </g>
                            </g>
                          </svg>
                        </span>
                      </div>
                      <p>
                        ثبت حساب شما با موفقیت انجام شد، هم اکنون میتوانید
                        موجودی خود را افزایش دهید.
                      </p>
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
              <Col xs={12} className="text-center mb-3">
                <Button
                  color="primary"
                  outline
                  onClick={() => navigate("/dashboard/wallet")}
                >
                  بازگشت به صفحه کیف پول
                </Button>
              </Col>
            </Row>
          </Container>
        </CardBody>
      </Card>
    </Layout>
  );
}
