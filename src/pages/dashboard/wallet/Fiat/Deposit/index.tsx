import { AlertDanger, AlertInfo, AlertWarning } from "components/AlertWidget";
import CopyInput from "components/Input/CopyInput";
import DropdownInput, { OptionType } from "components/Input/Dropdown";
import { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Label, List, Row } from "reactstrap";
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
import { useCheckVerificationsQuery } from "store/api/user";

import wallet from "assets/scss/dashboard/wallet.module.scss";
import profile from "assets/scss/dashboard/profile.module.scss";
import { useNavigate } from "react-router-dom";

export enum REJECTION_REASON {
  INVALID_RESIDENCE_PERMIT = "INVALID_RESIDENCE_PERMIT",
  EXPIRED_RESIDENCE_PERMIT = "EXPIRED_RESIDENCE_PERMIT",
  POOR_QUALITY_RESIDENCE_PERMIT_FRONT = "POOR_QUALITY_RESIDENCE_PERMIT_FRONT",
  POOR_QUALITY_RESIDENCE_PERMIT_BACK = "POOR_QUALITY_RESIDENCE_PERMIT_BACK",
  NAME_IS_DIFFERENT_IN_RESIDENCE_PERMIT = "NAME_IS_DIFFERENT_IN_RESIDENCE_PERMIT",
}

const DepositFiat = ({ onClose }: { onClose: () => void }) => {
  const { firstNameEn, lastNameEn, secondTierVerified } = useAppSelector(
    (state) => state.user,
  );
  const navigate = useNavigate();
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

  const { data: verifications, isSuccess: internationalSuccess } =
    useCheckVerificationsQuery();
  const [internationalVerify, setInternationalVerify] = useState<any>();

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

  useEffect(() => {
    if (internationalSuccess && verifications)
      setInternationalVerify(
        verifications?.find((v) => v.type === "KYC_INTERNATIONAL_SERVICES"),
      );
  }, [internationalSuccess, verifications]);

  const generateErrorReason = (reason, index) => {
    switch (reason) {
      case REJECTION_REASON.INVALID_RESIDENCE_PERMIT:
        return (
          <li key={index} className={profile["reject-reason-list"]}>
            کارت اقامت معتبر نیست.
          </li>
        );
      case REJECTION_REASON.EXPIRED_RESIDENCE_PERMIT:
        return (
          <li key={index} className={profile["reject-reason-list"]}>
            کارت اقامت منقضی شده است.
          </li>
        );
      case REJECTION_REASON.POOR_QUALITY_RESIDENCE_PERMIT_FRONT:
        return (
          <li key={index} className={profile["reject-reason-list"]}>
            کیفیت تصویر روی کارت اقامت پایین است.
          </li>
        );
      case REJECTION_REASON.POOR_QUALITY_RESIDENCE_PERMIT_BACK:
        return (
          <li key={index} className={profile["reject-reason-list"]}>
            کیفیت تصویر پست کارت اقامت پایین است.
          </li>
        );

      case REJECTION_REASON.NAME_IS_DIFFERENT_IN_RESIDENCE_PERMIT:
        return (
          <li key={index} className={profile["reject-reason-list"]}>
            نام و نام خانوادگی لاتین با کارت اقامت متابقت ندارد.
          </li>
        );
    }
  };

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

                <CopyInput text={selectedBank || ""} key="iban-account" />
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
      {!secondTierVerified ? (
        <>
          <AlertInfo
            hasIcon
            text="لطفا ابتدا احراز هویت سطح دو خود را تکمیل کنید."
            key="passport-alert"
          />
          <Row>
            <Col className="text-center">
              <Button
                className="px-5 py-3"
                color="primary"
                outline
                onClick={() => navigate("/dashboard/profile#kyc-section")}
              >
                احراز هویت سطح دو
              </Button>
            </Col>
          </Row>
        </>
      ) : internationalVerify?.status === "DRAFT" ? (
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
      ) : internationalVerify?.status === "INITIATED" ? (
        <AlertInfo
          hasIcon
          text="درخواست فعال سازی خدمات بین المللی شما در حال بررسی توسط پشتیبانی آرسونیکس می باشد."
          key="passport-alert"
        />
      ) : internationalVerify?.status === "REJECTED" ? (
        <AlertDanger
          text={
            <>
              <h6>درخواست شما به دلایل زیر رد شده است:</h6>
              <List className="py-3">
                {internationalVerify?.rejectReasons.map((reason, index) =>
                  generateErrorReason(reason, index),
                )}
                <Button
                  className="mt-3 px-3 py-2"
                  onClick={() => setIsOpenDialog(true)}
                  color="warning"
                >
                  اصلاح درخواست
                </Button>
              </List>
            </>
          }
          hasIcon={false}
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
