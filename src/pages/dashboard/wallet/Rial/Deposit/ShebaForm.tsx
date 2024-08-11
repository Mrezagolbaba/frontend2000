import { Button, Input, Row } from "reactstrap";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import DropdownInput, { OptionType } from "components/Input/Dropdown";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "store/hooks";
import {
  useDepositInfoQuery,
  useRefCodeMutation,
  useTransactionFeeQuery,
} from "store/api/wallet-management";
import { useBankAccountsQuery } from "store/api/profile-management";
import BanksWrapper from "components/BanksWrapper";
import CopyInput from "components/Input/CopyInput";
import { normalizeAmount } from "helpers";
import { AlertInfo } from "components/AlertWidget";

import wallet from "assets/scss/dashboard/wallet.module.scss";

type ShebaFormType = {
  accountName: string;
  shebaNumber: string;
  depositId: string;
  bankName: string;
};
const ShebaForm = ({ activeTab }: { activeTab: "1" | "2" | "3" }) => {
  // ==============|| States ||================= //
  const [optionList, setOptionList] = useState<OptionType[] | []>([]);
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [otherInfo, setOtherInfo] = useState<{
    ownerName?: string;
    code?: string;
  }>({
    ownerName: "",
    code: "",
  });

  // ==============|| Hooks ||================= //
  const navigate = useNavigate();
  const { secondTierVerified } = useAppSelector((state) => state.user);

  const { data, isSuccess } = useDepositInfoQuery("IRR");
  const { data: fee } = useTransactionFeeQuery("IRR");
  const [initRefCode, { data: depResponse, isLoading }] = useRefCodeMutation();
  const { data: accounts, isSuccess: getSuccessAccounts } =
    useBankAccountsQuery({
      filter: "currencyCode||$eq||IRR",
    });
  const resolver = yupResolver(
    Yup.object().shape({
      accountName: Yup.string().required(),
      shebaNumber: Yup.string().required(),
      depositId: Yup.string().required(),
      bankName: Yup.string().required(),
    }),
  );
  const { control } = useForm<ShebaFormType>({
    mode: "onChange",
    defaultValues: {
      accountName: "",
      shebaNumber: "",
      depositId: "",
      bankName: "",
    },
    resolver,
  });

  // ==============|| Life Cycle ||================= //
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
                type="IRR"
                value={item.iban}
                isSheba={true}
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
    if (
      getSuccessAccounts &&
      data &&
      data?.length > 0 &&
      activeTab === "3" &&
      accounts
    ) {
      initRefCode({
        currencyCode: "IRR",
        flow: "MANUAL_WITH_PAYMENT_IDENTIFIER",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts, getSuccessAccounts, activeTab]);

  // ==============|| Render ||================= //
  return secondTierVerified ? (
    <>
      <form>
        <div>
          <div>
            <div className={wallet["form-group"]}>
              <div className={wallet["form-group__label"]}>
                <label htmlFor="bank-name"> بانک مقصد</label>
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
              />
            </div>
          </div>
          <div>
            <Controller
              name="accountName"
              control={control}
              render={({ field: { name, onChange, ref } }) => (
                <div className={wallet["form-group"]}>
                  <div className={wallet["form-group__label"]}>
                    <label htmlFor="bank-name"> نام صاحب حساب</label>
                  </div>
                  <Input
                    disabled
                    name={name}
                    value={otherInfo?.ownerName}
                    onChange={onChange}
                    ref={ref}
                  />
                </div>
              )}
            />
          </div>
          {data && data.length > 0 && depResponse && (
            <div>
              <Controller
                name="shebaNumber"
                control={control}
                render={() => (
                  <div className={wallet["form-group"]}>
                    <div className={wallet["form-group__label"]}>
                      <label htmlFor="bank-name">شماره شبا</label>
                    </div>
                    <CopyInput name="شماره شبا" text={selectedBank || ""} />
                    {fee && (
                      <span className={wallet["form-group__hint"]}>
                        {`حداقل مبلغ واریز: ${normalizeAmount(
                          fee?.depositMinAmount,
                          "IRR",
                          true,
                        )}`}
                      </span>
                    )}
                  </div>
                )}
              />
            </div>
          )}
          {depResponse && !isLoading && (
            <div>
              <Controller
                name="depositId"
                control={control}
                render={() => (
                  <div className={wallet["form-group"]}>
                    <div className={wallet["form-group__label"]}>
                      <label htmlFor="bank-name">شماره واریز</label>
                    </div>
                    <CopyInput
                      name="شماره واریز"
                      text={depResponse.refCode || ""}
                    />
                    <span className={wallet["form-group__hint"]}>
                      کارمزد انتقال: 0.02%
                    </span>
                  </div>
                )}
              />
            </div>
          )}
        </div>
      </form>
    </>
  ) : (
    <Row>
      <AlertInfo
        text="واریز بین بانکی در صورتی برای شما فعال می‌شود که به سطح دو کاربری ارتقا پیدا کنید."
        hasIcon={true}
      />
      <div className="mt-3 text-center">
        <Button
          className="px-5 py-3"
          color="primary"
          type="button"
          onClick={() => {
            navigate("/dashboard/profile#kyc-section");
          }}
        >
          ارتقا به سطح دو
        </Button>
      </div>
    </Row>
  );
};

export default ShebaForm;
