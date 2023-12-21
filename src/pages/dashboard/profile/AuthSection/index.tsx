import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  List,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import { useState } from "react";
import { BsCheck2 } from "react-icons/bs";

import FirstStep from "./FirstStep";
import VideoStep from "./VideoStep";
import PhotoStep from "./PhotoStep";
import FinalStep from "./FinalStep";

import profile from "assets/scss/dashboard/profile.module.scss";
import { AlertSuccess } from "components/AlertWidget";
import { useAppSelector } from "store/hooks";

const dataLevel1 = [
  <>
    ﻭﺍﺭﯾﺰ و برداشت تومان ﺭﻭﺯﺍﻧﻪ:
    <strong>۱ میلیون تومان</strong>
  </>,
  <>
    واریز و برداشت فیات روزانه:
    <strong>معادل ۵۰۰ دلار</strong>
  </>,
  <>
    واریز رمزارز ﺭﻭﺯﺍﻧﻪ:
    <strong>نامحدود</strong>
  </>,
  <>
    برداشت رمزارز ﺭﻭﺯﺍﻧﻪ:
    <strong>نامحدود</strong>
  </>,
];
const dataLevel2 = [
  <>
    ﻭﺍﺭﯾﺰ و برداشت تومان ﺭﻭﺯﺍﻧﻪ:
    <strong>۱۰۰ میلیون تومان</strong>
  </>,
  <>
    ﻭﺍﺭﯾﺰ و برداشت فیات ﺭﻭﺯﺍﻧﻪ:
    <strong>معادل ۳۵ هزار دلار </strong>
  </>,
  <>
    واریز رمزارز ﺭﻭﺯﺍﻧﻪ:
    <strong>نامحدود</strong>
  </>,
  <>
    برداشت رمزارز ﺭﻭﺯﺍﻧﻪ:
    <strong>نامحدود</strong>
  </>,
];

const AuthSection = () => {
  const { firstTierVerified, secondTierVerified } = useAppSelector(
    (state) => state.user
  );

  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [activeState, setActiveState] = useState<1 | 2 | 3 | 4>(1);

  const renderSteps = () => {
    switch (activeState) {
      case 4:
        return <FinalStep onClick={setActiveState} />;
      case 3:
        return <PhotoStep onClick={setActiveState} />;
      case 2:
        return <VideoStep onClick={setActiveState} />;
      case 1:
      default:
        return <FirstStep onClick={setActiveState} />;
    }
  };
  return (
    <Card className="mb-4" id="kyc-section">
      <CardHeader>
        <CardTitle tag="h5">احراز هویت</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col xs={12} sm={6} className="gutter-row">
            <h5 className={profile["auth-title"]}>احراز هویت سطح یک</h5>
            <List className={profile["auth-list"]}>
              {dataLevel1.map((item) => (
                <li>
                  <span className="icon">
                    <BsCheck2 />
                  </span>
                  {item}
                </li>
              ))}
            </List>
            {firstTierVerified && (
              <AlertSuccess
                hasIcon
                key="success-tier1"
                text="احراز هویت سطح یک شما با موفقیت انجام شده است."
              />
            )}
          </Col>
          <Col xs={12} sm={6}>
            <h5 className={profile["auth-title"]}>احراز هویت سطح دو</h5>
            <List className={profile["auth-list"]}>
              {dataLevel2.map((item) => (
                <li>
                  <span className="icon">
                    <BsCheck2 />
                  </span>
                  {item}
                </li>
              ))}
            </List>
            {firstTierVerified && !secondTierVerified && (
              <Button
                color="primary"
                outline
                className="px-5 py-3 w-100"
                onClick={() => {
                  setIsOpenDialog(true);
                }}
              >
                شروع احراز هویت سطح 2
              </Button>
            )}
          </Col>
        </Row>
      </CardBody>
      <Modal
        className={profile["kyc-modal"]}
        isOpen={isOpenDialog}
        toggle={() => setIsOpenDialog(!isOpenDialog)}
        size="lg"
      >
        <ModalHeader toggle={() => setIsOpenDialog(!isOpenDialog)}>
          احراز هویت سطح 2
        </ModalHeader>
        <ModalBody>{renderSteps()}</ModalBody>
      </Modal>
    </Card>
  );
};

export default AuthSection;
