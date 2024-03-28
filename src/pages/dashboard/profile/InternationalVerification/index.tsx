import FinalStep from "./FinalStep";
import NameStep from "./NameStep";
import ResidentCardStep from "./ResidentCardStep";
import { Button, Col, Container, Row } from "reactstrap";
import { useState } from "react";

import profile from "assets/scss/dashboard/profile.module.scss";

export default function InternationalVerification() {
  // ==============|| States ||================= //
  const [step, setStep] = useState<0 | 1 | 2>(0);

  // ==============|| Handlers ||================= //
  const renderSteps = () => {
    switch (step) {
      case 2:
        return <FinalStep />;
      case 1:
        return <ResidentCardStep successHandler={() => setStep(2)} />;
      case 0:
      default:
        return <NameStep successHandler={() => setStep(1)} />;
    }
  };

  // ==============|| Render ||================= //
  return (
    <Container>
      <Row>
        <Col className={profile["modal-title"]}>
          <h5> خدمات بین المللی </h5>
          <Button color="link" tag="a" href="#">
            چرا باید کارت اقامت ارسال کنم؟
          </Button>
        </Col>
      </Row>
      {renderSteps()}
    </Container>
  );
}
