import * as Yup from "yup";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Col,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from "reactstrap";
import CopyInput from "components/Input/CopyInput";
import { AlertInfo } from "components/AlertWidget";

import wallet from "assets/scss/dashboard/wallet.module.scss";
import {
  useDepositInfoQuery,
  useRefCodeMutation,
  useTransactionFeeQuery,
} from "store/api/wallet-management";
import DropdownInput, { OptionType } from "components/Input/Dropdown";
import { useBankAccountsQuery } from "store/api/profile-management";
import BanksWrapper from "components/BanksWrapper";
import { tomanShow } from "helpers";
import { useAppSelector } from "store/hooks";
import { useNavigate } from "react-router-dom";

type ShebaFormType = {
  accountName: string;
  shebaNumber: string;
  depositId: string;
  bankName: string;
};
const ShebaForm = ({ activeTab }: { activeTab: "1" | "2" | "3" }) => {
  const [optionList, setOptionList] = useState<OptionType[] | []>([]);
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [otherInfo, setOtherInfo] = useState<{
    ownerName?: string;
    code?: string;
  }>({
    ownerName: "",
    code: "",
  });

  const navigate = useNavigate();
  const { secondTierVerified } = useAppSelector((state) => state.user);

  const { data, isSuccess } = useDepositInfoQuery("IRR");
  const { data: fee } = useTransactionFeeQuery("IRR");
  const [initRefCode, { data: depResponse }] = useRefCodeMutation();

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

  return secondTierVerified ? (
    <>
      <AlertInfo
        hasIcon
        text=" از حساب‌هایی که در پروفایل خود وارد کرده‌اید امکان واریز وجود دارد."
      />
      <AlertInfo
        hasIcon
        text=" شناسه واریز را در قسمت توضیحات یا شناسه واریز وارد نمایید."
      />
      <AlertInfo
        hasIcon
        text=" تمامی روش‌های پرداخت بجز روش پل مورد تایید می‌باشد."
      />
      <form>
        <Row>
          <Col xs={12} lg={6}>
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
              />
            </FormGroup>
          </Col>
          <Col xs={12} lg={6}>
            <Controller
              name="accountName"
              control={control}
              render={({ field: { name, value, onChange, ref } }) => (
                <FormGroup>
                  <Label htmlFor={name}>نام صاحب حساب:</Label>
                  <Input
                    disabled
                    type="text"
                    name={name}
                    value={otherInfo?.ownerName}
                    onChange={onChange}
                    ref={ref}
                  />
                </FormGroup>
              )}
            />
          </Col>
          {data && data.length > 0 && (
            <Col xs={12} lg={6}>
              <Controller
                name="shebaNumber"
                control={control}
                render={({ field: { name, value } }) => (
                  <FormGroup>
                    <Label htmlFor={name}> شماره شبا:</Label>
                    <CopyInput text={selectedBank || ""} />
                    {fee && (
                      <FormText>
                        حداقل مبلغ واریز:
                        {tomanShow({
                          value: fee.depositMinAmount,
                          currency: "IRR",
                        })}
                      </FormText>
                    )}
                  </FormGroup>
                )}
              />
            </Col>
          )}
          {depResponse && (
            <Col xs={12} lg={6}>
              <Controller
                name="depositId"
                control={control}
                render={({ field: { name, value } }) => (
                  <FormGroup>
                    <Label htmlFor={name}> شناسه واریز:</Label>
                    <CopyInput text={depResponse.refCode || ""} />
                    <FormText>کارمزد انتقال: 0.02%</FormText>
                  </FormGroup>
                )}
              />
            </Col>
          )}
        </Row>
      </form>
    </>
  ) : (
    <Row>
      <AlertInfo
        text="واریز بین بانکی در صورتی برای شما فعال می‌شود که به سطح دو کاربری ارتقا پیدا کنید."
        hasIcon={true}
      />
      <div className="text-center mt-3">
        <Button
          className="px-5 py-3"
          color="primary"
          type="button"
          onClick={() => {
            navigate("/dashboard/profile#kyc-section");
          }}
        >
          ارتقاع به سطح دو
        </Button>
      </div>
    </Row>
  );
};

export default ShebaForm;
