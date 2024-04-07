import Dialog from "components/Dialog";
import { useEffect, useState } from "react";
import { Col, Input, Row } from "reactstrap";
import { useRequestSwitchOtpMethodMutation } from "store/api/settings";
import { OTPType } from "types/settings";
import Level1 from "./Level1";
import { useAppSelector } from "store/hooks";
import Level2 from "./Level2";

import setting from "../styles.module.scss";

export default function Authenticator() {
  const { otpMethod } = useAppSelector((state) => state.user);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const [value, setValue] = useState<OTPType>(otpMethod);
  const [successValue, setSuccessValue] = useState<OTPType>(otpMethod);
  const [level, setLevel] = useState<0 | 1 | 2>(0);

  const [level1Req, { isError, isSuccess }] =
    useRequestSwitchOtpMethodMutation();

  const handleChange = (e, name: OTPType) => {
    e.preventDefault();
    setIsDisabled(true);
    if (name !== value) {
      setValue(name);
      setIsOpenModal(true);
      level1Req(name);
    }
  };

  useEffect(() => {
    if (isError) {
      setIsDisabled(false);
    }
  }, [isError]);

  useEffect(() => {
    setSuccessValue(otpMethod);
    setValue(otpMethod);
    setLevel(1);
  }, [otpMethod]);

  const handleClose = () => {
    setIsDisabled(false);
    setIsOpenModal(false);
    setSuccessValue(otpMethod);
    setValue(otpMethod);
    setLevel(0);
  };

  return (
    <Row className="mb-4">
      <Col xl={3} lg={3} md={2} sm={2}>
        <div
          className={setting["authenticator-select"]}
          onClick={(e) => handleChange(e, "EMAIL")}
        >
          <Input
            name="EMAIL"
            type="radio"
            value="EMAIL"
            id="EMAIL"
            className="m-2"
            disabled={isDisabled}
            checked={successValue === "EMAIL"}
            onChange={(e) => handleChange(e, "EMAIL")}
          />
          <span>ایمیل</span>
        </div>
      </Col>
      <Col xl={3} lg={3} md={2} sm={2}>
        <div
          className={setting["authenticator-select"]}
          onClick={(e) => !isDisabled && handleChange(e, "PHONE")}
        >
          <Input
            name="PHONE"
            type="radio"
            value="PHONE"
            id="PHONE"
            className="m-2"
            disabled={isDisabled}
            checked={successValue === "PHONE"}
            onChange={(e) => !isDisabled && handleChange(e, "PHONE")}
          />
          <span>پیامک</span>
        </div>
      </Col>
      <Col xl={6} lg={6} md={2} sm={2}>
        <div
          className={setting["authenticator-select"]}
          onClick={(e) => !isDisabled && handleChange(e, "AUTHENTICATOR")}
        >
          <Input
            name="AUTHENTICATOR"
            id="AUTHENTICATOR"
            type="radio"
            value="AUTHENTICATOR"
            disabled={isDisabled}
            checked={successValue === "AUTHENTICATOR"}
            onChange={(e) => handleChange(e, "AUTHENTICATOR")}
          />
          <span className="latin-font">Google Authenticator</span>
        </div>
      </Col>
      <Dialog
        isOpen={isOpenModal && isSuccess}
        onClose={() => handleClose()}
        hasCloseButton
        size="xs"
        title={level === 1 ? "تغییر نحوه احراز" : "تایید نحوه احراز جدید"}
      >
        {level === 1 ? (
          <Level1
            handleLevel={() => {
              setLevel(2);
            }}
          />
        ) : level === 2 ? (
          <Level2
            newOtpMethod={value}
            handleSuccess={() => setSuccessValue(value)}
            handleClose={() => handleClose()}
          />
        ) : (
          ""
        )}
      </Dialog>
    </Row>
  );
}
