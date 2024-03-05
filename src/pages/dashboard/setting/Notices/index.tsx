import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Input,
  Label,
  Row,
} from "reactstrap";

import setting from "../styles.module.scss";
import {
  useGetUserSettingsQuery,
  useUpdateUserSettingMutation,
} from "store/api/settings";

export default function Notices() {
  const { data, isLoading, isSuccess } = useGetUserSettingsQuery();

  const [update, { isLoading: loadingUpdate }] = useUpdateUserSettingMutation();

  const rows = [
    {
      email: "FIAT_DEPOSIT_EMAIL",
      sms: "FIAT_DEPOSIT_SMS",
      label: "واریز تومان و فیات",
    },
    {
      email: "FIAT_WITHDRAW_EMAIL",
      sms: "FIAT_WITHDRAW_SMS",
      label: "برداشت تومان و فیات",
    },
    {
      email: "CRYPTO_DEPOSIT_EMAIL",
      sms: "CRYPTO_DEPOSIT_SMS",
      label: "واریز ارز دیجیتال",
    },
    {
      email: "CRYPTO_WITHDRAW_EMAIL",
      sms: "CRYPTO_WITHDRAW_SMS",
      label: "برداشت ارز دیجیتال",
    },
    { email: "LOGIN_EMAIL", sms: "LOGIN_SMS", label: "ورود به حساب کاربری" },
    {
      email: "UPDATES_EMAIL",
      sms: "UPDATES_SMS",
      label: "جشنواره‌ها و بروزرسانی‌ها",
    },
  ];

  const submitChange = (e, key) => {
    e.preventDefault();
    !loadingUpdate && update(key);
  };

  const handleChecked = (key) => {
    const row = data.find((record) => {
      return record.key === key;
    });

    return row?.value || false;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>اطلاع رسانی</CardTitle>
      </CardHeader>
      <CardBody>
        <Container>
          <Row className={setting["notices-row"]}>
            <Col xs={6}>پیام ها</Col>
            <Col xs={3}>ایمیل</Col>
            <Col xs={3}>پیامک</Col>
          </Row>
          {rows.map((row, index) => (
            <Row className={setting["notices-row"]} key={index}>
              <Col xs={6} className="d-flex align-items-center">
                <span className="text-50">{row.label}</span>
              </Col>
              {isLoading ? (
                <>
                  <Col xs={3} className="placeholder-glow">
                    <div className="placeholder col-12 rounded" />
                  </Col>
                  <Col xs={3} className="placeholder-glow">
                    <div className="placeholder col-12 rounded" />
                  </Col>
                </>
              ) : (
                <>
                  <Col xs={3} className="d-flex align-items-center">
                    <div
                      className="notice__toggle"
                      onClick={(e) => submitChange(e, row.email)}
                    >
                      <Input
                        disabled={loadingUpdate}
                        type="checkbox"
                        name={row.email}
                        className={setting["switch-input"]}
                        id={`switch-${index}-1`}
                        checked={isSuccess && handleChecked(row.email)}
                      />
                      <Label
                        className={setting["switch-toggle"]}
                        for={`switch-${index}-1`}
                      />
                    </div>
                  </Col>
                  <Col xs={3} className="d-flex align-items-center">
                    <div
                      className="notice__toggle"
                      onClick={(e) => submitChange(e, row.sms)}
                    >
                      <Input
                        disabled={loadingUpdate}
                        type="checkbox"
                        name={row.sms}
                        className={setting["switch-input"]}
                        id={`switch-${index}-2`}
                        checked={isSuccess && handleChecked(row.sms)}
                      />
                      <Label
                        className={setting["switch-toggle"]}
                        for={`switch-${index}-2`}
                      />
                    </div>
                  </Col>
                </>
              )}
            </Row>
          ))}
        </Container>
      </CardBody>
    </Card>
  );
}
