import { AlertDanger, AlertInfo, AlertWarning } from "components/AlertWidget";
import CopyInput from "components/Input/CopyInput";
import DropdownInput, { OptionType } from "components/Input/Dropdown";
import { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Label, Row } from "reactstrap";
import {
  useDepositInfoQuery,
  useRefCodeMutation,
} from "store/api/wallet-management";
import { useAppSelector } from "store/hooks";
import { useBankAccountsQuery } from "store/api/profile-management";
import { isEmpty } from "lodash";
import Dialog from "components/Dialog";
import InternationalVerification from "pages/dashboard/profile/InternationalVerification";
import BanksWrapper from "components/BanksWrapper";

import wallet from "assets/scss/dashboard/wallet.module.scss";
import { useCheckVerificationsQuery } from "store/api/user";

const DepositFiat = ({ onClose }: { onClose: () => void }) => {
  const { firstNameEn, lastNameEn, internationalServicesVerified } =
    useAppSelector((state) => state.user);
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
  const { data, isSuccess } = useDepositInfoQuery("TRY");
  const { data: accounts, isSuccess: getSuccessAccounts } =
    useBankAccountsQuery({
      filter: "currencyCode||$eq||TRY",
    });

  const [
    initRefCode,
    { data: depResponse, isLoading: LoadingDeposit, isSuccess: depositSuccess },
  ] = useRefCodeMutation();

  const { data: verifications } = useCheckVerificationsQuery();

  useEffect(() => {
    let list = [] as OptionType[] | [];
    if (data && data?.length > 0) {
      setSelectedBank(data[0].iban);
      setOtherInfo({
        ownerName: data[0].accountOwnerName,
      });
      list = data.map((item) => {
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
              <BanksWrapper
                value={item.iban}
                type={"TRY"}
                iconClassName={wallet["items-credit__icon"]}
              >
                <span dir="ltr">{item.bankName}</span>
              </BanksWrapper>
            </div>
          ),
        };
      });
    }
    setOptionList(list);
  }, [data, isSuccess]);

  useEffect(() => {
    accounts &&
      initRefCode({
        currencyCode: "TRY",
        flow: "MANUAL_WITH_PAYMENT_IDENTIFIER",
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts, getSuccessAccounts]);

  const renderUI = () => {
    if (LoadingDeposit) {
      return (
        <Row className="placeholder-glow">
          <Col xs={12} lg={6}>
            <div
              className="placeholder rounded mt-3 py-2 w-100"
              style={{ height: "30px" }}
            />
          </Col>
          <Col xs={12} lg={6}>
            <div
              className="placeholder rounded mt-3 py-2 w-100"
              style={{ height: "30px" }}
            />
          </Col>
          <Col xs={12} lg={4}>
            <div
              className="placeholder rounded mt-3 py-2 w-100"
              style={{ height: "30px" }}
            />
          </Col>
          <Col xs={12} lg={8}>
            <div
              className="placeholder rounded mt-3 py-2 w-100"
              style={{ height: "30px" }}
            />
          </Col>
        </Row>
      );
    } else {
      if (depositSuccess) {
        return (
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
                <Label htmlFor="iban"> شماره IBAN:</Label>

                <CopyInput
                  text={selectedBank || ""}
                  key="iban-account"
                  isIban={false}
                />
              </FormGroup>
            </Col>
            {depResponse && (
              <Col xs={12} md={4}>
                <FormGroup>
                  <Label htmlFor="ownerAccount"> شناسه واریز :</Label>
                  <CopyInput
                    text={depResponse.refCode || ""}
                    key="number-account"
                  />
                </FormGroup>
              </Col>
            )}
            <Col xs={12} md={8}>
              <FormGroup>
                <Label htmlFor="ownerAccount">نام صاحب حساب:</Label>
                <CopyInput
                  text={otherInfo.ownerName || ""}
                  key="owner-account"
                />
              </FormGroup>
            </Col>
          </Row>
        );
      } else {
        return (
          <Row>
            <AlertDanger
              hasIcon
              text="متاسفانه مشکلی در برقراری ارتباط با سرور پیش آمده است. لطفا از وصل بودن شبکه اینترنت خود اطمینان حاصل نمایید."
            />
          </Row>
        );
      }
    }
  };

  return (
    <div className="px-2">
      {verifications?.find((v) => v.type === "KYC_INTERNATIONAL_SERVICES")
        ?.status === "DRAFT" ||
      verifications?.find((v) => v.type === "KYC_INTERNATIONAL_SERVICES")
        ?.status === "REJECTED" ? (
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
      ) : verifications?.find((v) => v.type === "KYC_INTERNATIONAL_SERVICES")
          ?.status === "INITIATED" ? (
        <AlertInfo
          hasIcon
          text="درخواست فعال سازی خدمات بین المللی شما در حال بررسی توسط پشتیبانی آرسونیکس می باشد."
          key="passport-alert"
        />
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
          {renderUI()}
        </Form>
      )}
      <Dialog
        title="ارسال کارت اقامت"
        isOpen={isOpenDialog}
        hasCloseButton={true}
        onClose={() => {
          onClose?.();
          setIsOpenDialog(false);
        }}
      >
        <InternationalVerification />
      </Dialog>
    </div>
  );
};

export default DepositFiat;
