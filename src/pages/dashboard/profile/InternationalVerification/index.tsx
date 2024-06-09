import FinalStep from "./FinalStep";
import NameStep from "./NameStep";
import ResidentCardStep from "./ResidentCardStep";
import { Button, Col, Container, Row } from "reactstrap";
import { useEffect, useState } from "react";
import { useGetVerificationsQuery } from "store/api/profile-management";

import profile from "assets/scss/dashboard/profile.module.scss";

export enum REJECTION_REASON {
  INVALID_RESIDENCE_PERMIT = "INVALID_RESIDENCE_PERMIT",
  EXPIRED_RESIDENCE_PERMIT = "EXPIRED_RESIDENCE_PERMIT",
  POOR_QUALITY_RESIDENCE_PERMIT_FRONT = "POOR_QUALITY_RESIDENCE_PERMIT_FRONT",
  POOR_QUALITY_RESIDENCE_PERMIT_BACK = "POOR_QUALITY_RESIDENCE_PERMIT_BACK",
}
export default function InternationalVerification() {
  // ==============|| States ||================= //
  const [step, setStep] = useState<0 | 1 | 2>(0);

  // ==============|| Hooks ||================= //
  const { data: userVerifications, isSuccess } = useGetVerificationsQuery();

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

  // ==============|| Life Cycle||================= //
  useEffect(() => {
    if (isSuccess && userVerifications) {
      const international = userVerifications.find(
        (item) => item.type === "KYC_INTERNATIONAL_SERVICES",
      );
      if (international?.status === "REJECTED") {
        setStep(1);
      }
    }
  }, [isSuccess, userVerifications]);

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
