import { useEffect, useState } from "react";
import { Row } from "reactstrap";
import DropdownInput, { OptionType } from "components/Input/Dropdown";
import { useAppSelector } from "store/hooks";
import { useNavigate } from "react-router-dom";
import {
  useDepositInfoQuery,
  useRefCodeMutation,
} from "store/api/wallet-management";
import {
  useBankAccountsQuery,
  useGetVerificationsQuery,
} from "store/api/profile-management";
import BanksWrapper from "components/BanksWrapper";
import CopyInput from "components/Input/CopyInput";
import { AlertDanger, AlertInfo, AlertWarning } from "components/AlertWidget";

import wallet from "assets/scss/dashboard/wallet.module.scss";
import profile from "assets/scss/dashboard/profile.module.scss";

export enum REJECTION_REASON {
  INVALID_RESIDENCE_PERMIT = "INVALID_RESIDENCE_PERMIT",
  EXPIRED_RESIDENCE_PERMIT = "EXPIRED_RESIDENCE_PERMIT",
  POOR_QUALITY_RESIDENCE_PERMIT_FRONT = "POOR_QUALITY_RESIDENCE_PERMIT_FRONT",
  POOR_QUALITY_RESIDENCE_PERMIT_BACK = "POOR_QUALITY_RESIDENCE_PERMIT_BACK",
  NAME_IS_DIFFERENT_IN_RESIDENCE_PERMIT = "NAME_IS_DIFFERENT_IN_RESIDENCE_PERMIT",
}

export default function DepositFiat() {
  const [optionList, setOptionList] = useState<OptionType[] | []>([]);
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [internationalVerify, setInternationalVerify] = useState<any>();
  const [otherInfo, setOtherInfo] = useState<{
    ownerName?: string;
    code?: string;
  }>({
    ownerName: "",
    code: "",
  });

  const { firstNameEn, lastNameEn, secondTierVerified } = useAppSelector(
    (state) => state.user,
  );
  const navigate = useNavigate();
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
    useGetVerificationsQuery();

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

  const generateErrorReason = (reason: string, index: number) => {
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
        <div className="pt-3">
          <div className="placeholder-glow">
            <div
              className="placeholder col-12 rounded"
              style={{
                height: "48px",
                marginBottom: "1rem",
              }}
            />
          </div>
          <div className="placeholder-glow">
            <div
              className="placeholder col-12 rounded"
              style={{
                height: "48px",
                marginBottom: "1rem",
              }}
            />
          </div>
          <div className="placeholder-glow">
            <div
              className="placeholder col-12 rounded"
              style={{
                height: "48px",
                marginBottom: "1rem",
              }}
            />
          </div>
          <div className="placeholder-glow">
            <div
              className="placeholder col-12 rounded"
              style={{
                height: "48px",
                marginBottom: "1rem",
              }}
            />
          </div>
        </div>
      );
    } else {
      if (depositSuccess) {
        return (
          <div>
            <div>
              <div className={wallet["form-group"]}>
                <div className={wallet["form-group__label"]}>
                  <label htmlFor="bank-name"> بانک مقصد </label>
                </div>
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
              </div>
            </div>
            <div>
              <div className={wallet["form-group"]}>
                <div className={wallet["form-group__label"]}>
                  <label> شماره IBAN </label>
                </div>
                <CopyInput
                  name="IBAN"
                  text={selectedBank || ""}
                  key="iban-account"
                />
              </div>
            </div>
            {depResponse && (
              <div>
                <div className={wallet["form-group"]}>
                  <div className={wallet["form-group__label"]}>
                    <label> شناسه واریز </label>
                  </div>
                  <CopyInput
                    name="شناسه واریز"
                    text={depResponse.refCode || ""}
                    key="number-account"
                  />
                </div>
              </div>
            )}
            <div>
              <div className={wallet["form-group"]}>
                <div className={wallet["form-group__label"]}>
                  <label> نام صاحب حساب </label>
                </div>
                <CopyInput
                  name="نام صاحب حساب"
                  text={otherInfo.ownerName || ""}
                  key="owner-account"
                />
              </div>
            </div>
          </div>
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
    <>
      <div className={wallet["form-container"]}>
        <div className={wallet["form-wrapper"]}>{renderUI()}</div>
      </div>
      <div className={wallet.info}>
        {firstNameEn && lastNameEn && (
          <AlertDanger
            hasIcon
            text={`در صورت ارسال مبلغ از حسابی بجز ${
              firstNameEn.toUpperCase() + " " + lastNameEn.toUpperCase()
            }   عودت مبلغ بعد از 72 ساعت با کسر کارمزد بانکی انجام می‌شود.`}
          />
        )}
        <AlertWarning
          hasIcon
          text="در هنگام واریز، حتماً شناسه واریز را به‌طور دقیق در بخش Description یا Aciklama وارد نمایید. در صورت عدم رعایت این نکته، مبلغ به حساب کاربری شما واریز نخواهد شد و پس از ۷۲ ساعت کاری، به حساب شما با کسر کارمزد بانکی مسترد خواهد شد."
        />
        <AlertInfo
          hasIcon
          text="هیچ محدودیتی از نظر یکسان بودن بانک مبدا و مقصد وجود ندارد؛ به عبارت دیگر، امکان انجام تراکنش‌ها بین حساب‌های بانکی از بانک‌های مختلف وجود دارد و نیازی به هماهنگ بودن بانک مبدا و مقصد نیست."
        />
      </div>
    </>
    //   )}
    //   <Dialog
    //     title="ارسال کارت اقامت"
    //     isOpen={isOpenDialog}
    //     hasCloseButton={true}
    //     onClose={() => {
    //       onClose?.();
    //       setIsOpenDialog(false);
    //     }}
    //   >
    //     <InternationalVerification />
    //   </Dialog>
    // </div>
  );
}
