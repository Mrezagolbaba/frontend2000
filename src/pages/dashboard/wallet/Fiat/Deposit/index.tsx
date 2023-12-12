import { AlertInfo, AlertWarning } from "components/AlertWidget";
import CopyInput from "components/Input/CopyInput";
import DropdownInput from "components/Input/Dropdown";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useBanksQuery } from "store/api/profile-management";
import { useDepositInfoQuery } from "store/api/wallet-management";

const DepositFiat = ({ onClose }: { onClose: () => void }) => {
  const { data, isLoading, isSuccess } = useDepositInfoQuery("TRY");

  console.log("test", data);

  return (
    <div className="px-2">
      <AlertInfo
        hasIcon
        text="برای استفاده از خدمات لیر ترکیه، باید کارت اقامت ترکیه خود را ارسال نمایید."
        key="passport-alert"
      />
      <Row>
        <Col className="text-center">
          <Button className="px-5 py-3" color="primary" outline>
            ارسال کارت اقامت
          </Button>
        </Col>
      </Row>
      <AlertWarning
        hasIcon
        text={`در صورت ارسال مبلغ از حسابی بجز ${""}   عودت مبلغ بعد از 72 ساعت با کسر کارمزد بانکی انجام می‌شود.`}
      />
      <Form>
        <Row>
          <Col xs={12} md={6}>
            <FormGroup>
              <Label htmlFor="ownerAccount"> بانک مقصد:</Label>
              <DropdownInput
                id="bank-name"
                value={""}
                onChange={(val, otherOption) => {
                  // setValue("accountId", otherOption.accountId);
                  // setValue(name, val);
                }}
                options={[]}
                // hasError={Boolean(errors?.[name])}
              />
            </FormGroup>
          </Col>
          <Col xs={12} md={6}>
            <FormGroup>
              <Label htmlFor="ownerAccount">نام صاحب حساب:</Label>
              <CopyInput text="value" key="owner-account" />
            </FormGroup>
          </Col>
          <Col xs={12} md={6}>
            <FormGroup>
              <Label htmlFor="ownerAccount"> شماره iban:</Label>
              <CopyInput text="value" key="iban-account" />
            </FormGroup>
          </Col>
          <Col xs={12} md={6}>
            <FormGroup>
              <Label htmlFor="ownerAccount"> شناسه واریز :</Label>
              <CopyInput text="value" key="number-account" />
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default DepositFiat;
