import { useState } from "react";
import { BsCheck2, BsCheck2Circle } from "react-icons/bs";
import {
  Alert,
  Button,
  Col,
  Divider,
  List,
  Modal,
  Row,
  Typography,
} from "antd";

import FirstStep from "./FirstStep";
import VideoStep from "./VideoStep";
import PhotoStep from "./PhotoStep";

import "./style.sass";

const { Title } = Typography;

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
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [activeState, setActiveState] = useState<1 | 2 | 3>(1);

  const renderSteps = () => {
    switch (activeState) {
      case 3:
        return <PhotoStep onClick={setActiveState}/>;
      case 2:
        return <VideoStep onClick={setActiveState}/>;
      case 1:
      default:
        return <FirstStep onClick={setActiveState} />;
    }
  };
  return (
    <div className="card card-secondary authentication-card mb-4">
      <div className="card-header">
        <Title level={5} className="card-title">
          احراز هویت
        </Title>
      </div>
      <div className="card-body">
        <Row gutter={16}>
          <Col xs={24} sm={12} className="gutter-row">
            <List
              className="auth-jumbotron-advantages"
              size="small"
              bordered={false}
              header={<Title level={5}>احراز هویت سطح یک</Title>}
              dataSource={dataLevel1}
              renderItem={(item) => (
                <List.Item>
                  <span className="icon">
                    <BsCheck2 />
                  </span>
                  {item}
                </List.Item>
              )}
            />
            <Alert
              className="mb-4 mt-3"
              message="احراز هویت سطح یک شما با موفقیت انجام شده است."
              type="success"
              showIcon
              icon={<BsCheck2Circle />}
            />
          </Col>
          <Col xs={24} sm={12}>
            <List
              className="auth-jumbotron-advantages"
              size="small"
              bordered={false}
              header={<Title level={5}>احراز هویت سطح دو</Title>}
              dataSource={dataLevel2}
              renderItem={(item) => (
                <List.Item>
                  <span className="icon">
                    <BsCheck2 />
                  </span>
                  {item}
                </List.Item>
              )}
            />
            <Button
              type="primary"
              size="large"
              block
              className="Authenticate-button mb-4 mt-3"
              onClick={() => {
                setIsOpenDialog(true);
              }}
            >
              شروع احراز هویت سطح 2
            </Button>
          </Col>
        </Row>
      </div>
      <Modal
        className="modal-container"
        open={isOpenDialog}
        onCancel={() => setIsOpenDialog(false)}
        title="احراز هویت سطح 2"
        footer={null}
        width={800}
      >
        <Divider />
        {renderSteps()}
      </Modal>
    </div>
  );
};

export default AuthSection;
