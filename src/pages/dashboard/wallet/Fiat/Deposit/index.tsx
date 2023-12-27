import { AlertInfo, AlertWarning } from "components/AlertWidget";
import CopyInput from "components/Input/CopyInput";
import DropdownInput, { OptionType } from "components/Input/Dropdown";
import { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Label, Row } from "reactstrap";
import {
  useDepositInfoQuery,
  useDepositMutation,
} from "store/api/wallet-management";

import wallet from "assets/scss/dashboard/wallet.module.scss";
import { useAppSelector } from "store/hooks";
import { useBankAccountsQuery } from "store/api/profile-management";
import { isEmpty } from "lodash";
import { useCheckVerificationsQuery } from "store/api/user";
import Dialog from "components/Dialog";
import InternationalVerification from "pages/dashboard/profile/InternationalVerification";

const DepositFiat = ({ onClose }: { onClose: () => void }) => {
  const { firstNameEn, lastNameEn, internationalServicesVerified } =
    useAppSelector((state) => state.user);

  const [isVerified, setIsVerified] = useState<1 | 2 | 3>(1);
  const [optionList, setOptionList] = useState<OptionType[] | []>([]);
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [otherInfo, setOtherInfo] = useState<{
    ownerName?: string;
    code?: string;
  }>({
    ownerName: "",
    code: "",
  });
  const { data, isLoading, isSuccess } = useDepositInfoQuery("TRY");
  const { data: accounts, isSuccess: getSuccessAccounts } =
    useBankAccountsQuery({
      filters: "currencyCode||$eq||TRY",
    });

  const [
    depositRequest,
    {
      data: depResponse,
      isLoading: isLoadingDeposit,
      isSuccess: isSubmitSuccess,
    },
  ] = useDepositMutation();

  useEffect(() => {
    let list = [] as OptionType[] | [];
    if (data && data?.length > 0) {
      setSelectedBank(data[0].iban);
      setOtherInfo({
        ownerName: data[0].accountOwnerName,
      });
      list = data.map((item) => {
        const ibanValue = item.iban.replace("TR", "");
        // const bank = searchTurkishBanks(ibanValue);
        return {
          value: item.iban,
          otherOptions: {
            ownerName: item.accountOwnerName,
          },
          content: (
            <div className={wallet["items-credit"]}>
              {/* <span className={wallet["items-credit__icon"]}>
                <span
                  className="mx-3"
                  dangerouslySetInnerHTML={{ __html: bank.logo }}
                />
              </span> */}
              <span dir="ltr">{item.bankName}</span>
            </div>
          ),
        };
      });
    }
    setOptionList(list);
  }, [data, isSuccess]);

  useEffect(() => {
    accounts &&
      depositRequest({
        currencyCode: "TRY",
        amount: "1",
        flow: "MANUAL_WITH_PAYMENT_IDENTIFIER",
        bankAccountId: accounts[0]?.id,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts, getSuccessAccounts]);

  return (
    <div className="px-2">
      {!internationalServicesVerified ? (
        <>
          <AlertInfo
            hasIcon
            text="برای استفاده از خدمات لیر ترکیه، باید کارت اقامت ترکیه خود را ارسال نمایید."
            key="passport-alert"
          />
          <Row>
            <Col className="text-center">
              <Button
                className="px-5 py-3"
                color="primary"
                outline
                onClick={() => setIsOpenDialog(true)}
              >
                ارسال کارت اقامت
              </Button>
            </Col>
          </Row>
        </>
      ) : (
        <Form>
          {!isEmpty(firstNameEn) && !isEmpty(lastNameEn) && (
            <AlertWarning
              hasIcon
              text={`در صورت ارسال مبلغ از حسابی بجز ${
                firstNameEn + " " + lastNameEn
              }   عودت مبلغ بعد از 72 ساعت با کسر کارمزد بانکی انجام می‌شود.`}
            />
          )}
          <AlertWarning
            hasIcon
            text="در هنگام واریز حتما شناسه واریز را  در بخش Description یا Aciklama به طور دقیق وارد کنید، در صورت رعایت نکردن این مساله مبلغ به حساب کاربری شما واریز نمی‌شود و بعد از ۷۲ ساعت کاری به حساب شما پس از کسر کارمزد بانکی عودت داده می‌شود."
          />

          <Row>
            <Col xs={12} md={6}>
              <FormGroup>
                <Label htmlFor="bank-name"> بانک مقصد:</Label>
                <DropdownInput
                  id="bank-name"
                  value={selectedBank}
                  onChange={(val, otherOption) => {
                    setSelectedBank(val);
                    setOtherInfo({
                      ownerName: otherOption.ownerName,
                    });
                  }}
                  options={optionList}
                  // hasError={Boolean(errors?.[name])}
                />
              </FormGroup>
            </Col>
            <Col xs={12} md={6}>
              <FormGroup>
                <Label htmlFor="ownerAccount">نام صاحب حساب:</Label>
                <CopyInput
                  text={otherInfo.ownerName || ""}
                  key="owner-account"
                />
              </FormGroup>
            </Col>
            <Col xs={12} md={6}>
              <FormGroup>
                <Label htmlFor="iban"> شماره IBAN:</Label>
                <CopyInput text={selectedBank || ""} key="iban-account" />
              </FormGroup>
            </Col>
            {depResponse && (
              <Col xs={12} md={6}>
                <FormGroup>
                  <Label htmlFor="ownerAccount"> شناسه واریز :</Label>
                  <CopyInput
                    text={depResponse.providerData.flowPaymentIdentifier || ""}
                    key="number-account"
                  />
                </FormGroup>
              </Col>
            )}
          </Row>
        </Form>
      )}
      <Dialog
        title="ارسال کارت اقامت"
        isOpen={isOpenDialog}
        hasCloseButton={true}
        onClose={() => setIsOpenDialog(false)}
      >
        <InternationalVerification />
      </Dialog>
    </div>
  );
};

export default DepositFiat;
