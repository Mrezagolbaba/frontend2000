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
import { useEffect, useState } from "react";
import { BsCheck2 } from "react-icons/bs";

//third-party
import ZeroStep from "./ZeroStep";
import FirstStep from "./FirstStep";
import VideoStep from "./Video";
import PhotoStep from "./PhotoStep";
import FinalStep from "./FinalStep";
import { useAppSelector } from "store/hooks";
import { AlertDanger, AlertInfo, AlertSuccess } from "components/AlertWidget";
import { useGetVerificationsQuery } from "store/api/profile-management";

//style
import profile from "assets/scss/dashboard/profile.module.scss";
import { useLocation } from "react-router-dom";

export enum REJECTION_REASON {
  NOT_ACCEPTABLE_VIDEO = "NOT_ACCEPTABLE_VIDEO",
  VIDEO_AND_AUDIO_NOT_SYNCED = "VIDEO_AND_AUDIO_NOT_SYNCED",
  POOR_QUALITY_VIDEO = "POOR_QUALITY_VIDEO",
  POOR_QUALITY_COMMITMENT_LETTER = "POOR_QUALITY_COMMITMENT_LETTER",
  INVALID_RESIDENCE_PERMIT = "INVALID_RESIDENCE_PERMIT",
  EXPIRED_RESIDENCE_PERMIT = "EXPIRED_RESIDENCE_PERMIT",
  POOR_QUALITY_RESIDENCE_PERMIT_FRONT = "POOR_QUALITY_RESIDENCE_PERMIT_FRONT",
  POOR_QUALITY_RESIDENCE_PERMIT_BACK = "POOR_QUALITY_RESIDENCE_PERMIT_BACK",
  INVALID_NATIONAL_CARD = "INVALID_NATIONAL_CARD",
  EXPIRED_NATIONAL_CARD = "EXPIRED_NATIONAL_CARD",
  POOR_QUALITY_NATIONAL_CARD_FRONT = "POOR_QUALITY_NATIONAL_CARD_FRONT",
  POOR_QUALITY_NATIONAL_CARD_BACK = "POOR_QUALITY_NATIONAL_CARD_BACK",
}

const dataLevel1 = [
  <>
    ﻭﺍﺭﯾﺰ تومان ﺭﻭﺯﺍﻧﻪ:
    <strong>۱ میلیون تومان</strong>
  </>,
  <>
    برداشت تومان روزانه:
    <strong> نامحدود </strong>
  </>,
  <>
    واریز و برداشت رمزارز ﺭﻭﺯﺍﻧﻪ:
    <strong>نامحدود</strong>
  </>,
  <>
    واریز و برداشت فیات روزانه:
    <strong>۵۰۰ دلار</strong>
  </>,
];
const dataLevel2 = [
  <>
    ﻭﺍﺭﯾﺰ تومان ﺭﻭﺯﺍﻧﻪ:
    <strong>نامحدود</strong>
  </>,
  <>
    برداشت تومان ﺭﻭﺯﺍﻧﻪ:
    <strong>نامحدود </strong>
  </>,
  <>
    واریز و برداشت رمزارز ﺭﻭﺯﺍﻧﻪ:
    <strong>نامحدود</strong>
  </>,
  <>
    واریز و برداشت فیات ﺭﻭﺯﺍﻧﻪ:
    <strong>۳۵ هزار دلار</strong>
  </>,
];

const AuthSection = () => {
  // ==============|| Hooks ||================= //
  const { hash } = useLocation();
  const { firstTierVerified, secondTierVerified, id } = useAppSelector(
    (state) => state.user,
  );
  const {
    data: userVerifications,
    isLoading,
    isSuccess,
  } = useGetVerificationsQuery();

  // ==============|| States ||================= //
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(
    hash.includes("#kyc-section") ? true : false,
  );
  const [activeState, setActiveState] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);
  const [allowStates, setAllowStates] = useState({
    nationalCard: false,
    video: false,
    commitLetter: false,
  });

  // ==============|| Handlers ||================= //
  const renderSteps = () => {
    switch (activeState) {
      case 4:
        return <FinalStep onClick={setActiveState} />;
      case 3:
        return <PhotoStep onClick={setActiveState} />;
      case 2:
        return <VideoStep onClick={setActiveState} />;
      case 1:
        return <FirstStep onClick={setActiveState} />;
      case 0:
        return <ZeroStep onClick={setActiveState} allowStates={allowStates} />;
      case 5:
      default: {
        setIsOpenDialog(false);
        setActiveState(0);
        return null;
      }
    }
  };
  const generateErrorReason = (reason, index) => {
    switch (reason) {
      case REJECTION_REASON.NOT_ACCEPTABLE_VIDEO:
        return (
          <li key={index} className={profile["reject-reason-list"]}>
            این ویدیو مورد قبول نمی باشد
          </li>
        );
      case REJECTION_REASON.VIDEO_AND_AUDIO_NOT_SYNCED:
        return (
          <li key={index} className={profile["reject-reason-list"]}>
            ویدیو ارسالی با صدای‌ آن هماهنگ نمی‌باشد.
          </li>
        );
      case REJECTION_REASON.POOR_QUALITY_VIDEO:
        return (
          <li key={index} className={profile["reject-reason-list"]}>
            کیفیت ویدیو پایین می‌باشد.
          </li>
        );
      case REJECTION_REASON.POOR_QUALITY_COMMITMENT_LETTER:
        return (
          <li key={index} className={profile["reject-reason-list"]}>
            کیفیت تعهدنامه ارسالی پایین می‌باشد.
          </li>
        );
      case REJECTION_REASON.INVALID_RESIDENCE_PERMIT:
        return null;
      case REJECTION_REASON.EXPIRED_RESIDENCE_PERMIT:
        return null;
      case REJECTION_REASON.POOR_QUALITY_RESIDENCE_PERMIT_FRONT:
        return null;
      case REJECTION_REASON.POOR_QUALITY_RESIDENCE_PERMIT_BACK:
        return null;
      case REJECTION_REASON.INVALID_NATIONAL_CARD:
        return (
          <li key={index} className={profile["reject-reason-list"]}>
            مدرک هویتی شما معتبر نمی‌باشد.
          </li>
        );
      case REJECTION_REASON.EXPIRED_NATIONAL_CARD:
        return (
          <li key={index} className={profile["reject-reason-list"]}>
            اعتبار مدرک هویتی شما به پایان رسیده است.
          </li>
        );
      case REJECTION_REASON.POOR_QUALITY_NATIONAL_CARD_FRONT:
        return (
          <li key={index} className={profile["reject-reason-list"]}>
            عکس روی مدرک هویتی شما بی‌کفیت می‌باشد.
          </li>
        );
      case REJECTION_REASON.POOR_QUALITY_NATIONAL_CARD_BACK:
        return (
          <li key={index} className={profile["reject-reason-list"]}>
            عکس پشت مدرک هویتی شما بی‌کفیت می‌باشد.
          </li>
        );
    }
  };

  // ==============|| Life Cycle ||================= //
  useEffect(() => {
    if (isSuccess && userVerifications) {
      const docStatus = userVerifications[2].status;
      if (docStatus === "REJECTED") {
        userVerifications[2].rejectReasons.forEach((reason) => {
          switch (reason) {
            case REJECTION_REASON.VIDEO_AND_AUDIO_NOT_SYNCED:
            case REJECTION_REASON.POOR_QUALITY_VIDEO:
            case REJECTION_REASON.NOT_ACCEPTABLE_VIDEO: {
              setAllowStates({ ...allowStates, video: true });
              break;
            }
            case REJECTION_REASON.INVALID_NATIONAL_CARD:
            case REJECTION_REASON.EXPIRED_NATIONAL_CARD: {
              setAllowStates({ ...allowStates, nationalCard: true });
              break;
            }
            case REJECTION_REASON.POOR_QUALITY_COMMITMENT_LETTER: {
              setAllowStates({ ...allowStates, commitLetter: true });
              break;
            }
          }
        });
      } else if (docStatus === "DRAFT")
        setAllowStates({
          nationalCard: true,
          video: true,
          commitLetter: true,
        });
      else
        setAllowStates({
          nationalCard: false,
          video: false,
          commitLetter: false,
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  // ==============|| Render ||================= //
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle tag="h5">احراز هویت</CardTitle>
      </CardHeader>
      <CardBody id="kyc-section">
        <Row>
          <Col xs={12} className="gutter-row">
            <Row>
              <Col xs={12} md={6}>
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
              </Col>
              <Col xs={12} md={6}>
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
              </Col>
            </Row>
            <Row>
              {firstTierVerified && !secondTierVerified && (
                <Col xs={12} sm={6}>
                  <AlertSuccess
                    hasIcon
                    key="success-tier1"
                    text="احراز هویت سطح یک شما با موفقیت انجام شده است."
                  />
                </Col>
              )}
              {firstTierVerified &&
                !secondTierVerified &&
                userVerifications?.[2].status === "DRAFT" && (
                  <Col xs={12} sm={6}>
                    <Button
                      color="primary"
                      outline
                      className="px-5 py-3 w-100"
                      onClick={() => {
                        setIsOpenDialog(true);
                      }}
                    >
                      شروع احراز هویت سطح دو
                    </Button>
                  </Col>
                )}{" "}
              {userVerifications?.[2].status === "INITIATED" && (
                <Col xs={12} sm={6}>
                  <AlertInfo
                    hasIcon
                    key="success-tier1"
                    text="مدارک شما در حال بررسی توسط کارشناس سیستم می باشد."
                  />
                </Col>
              )}
              {secondTierVerified && (
                <Col xs={12}>
                  <AlertSuccess
                    hasIcon
                    key="success-tier1"
                    text="احراز هویت سطح یک و دو شما با موفقیت انجام شده است."
                  />
                </Col>
              )}
            </Row>
            {userVerifications &&
              userVerifications[2].status === "REJECTED" && (
                <Row>
                  <Col xs={12}>
                    <AlertDanger
                      text={
                        <>
                          <h6>
                            موارد مورد نیاز به اصلاح در درخواست احراز هویت سطح
                            دو
                          </h6>
                          <List className="py-3">
                            {userVerifications[2].rejectReasons.map(
                              (reason, index) =>
                                generateErrorReason(reason, index),
                            )}
                            <Button
                              className="mt-3 px-3 py-2"
                              onClick={() => {
                                if (allowStates.nationalCard) {
                                  setActiveState(0);
                                } else if (
                                  (!allowStates.nationalCard &&
                                    allowStates.video) ||
                                  allowStates.commitLetter
                                ) {
                                  setActiveState(1);
                                }
                                setIsOpenDialog(true);
                              }}
                              color="warning"
                            >
                              اصلاح درخواست
                            </Button>
                          </List>
                        </>
                      }
                      hasIcon={false}
                    />
                  </Col>
                </Row>
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
          احراز هویت سطح دو
        </ModalHeader>
        <ModalBody>{renderSteps()}</ModalBody>
      </Modal>
    </Card>
  );
};

export default AuthSection;
