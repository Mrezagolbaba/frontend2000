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
  useDepositMutation,
  useTransactionFeeQuery,
} from "store/api/wallet-management";
import DropdownInput, { OptionType } from "components/Input/Dropdown";
import { useBankAccountsQuery } from "store/api/profile-management";
import BanksWrapper from "components/BanksWrapper";
import { tomanShow } from "helpers";

type ShebaFormType = {
  accountName: string;
  shebaNumber: string;
  depositId: string;
  bankName: string;
};
const ShebaForm = ({ activeTab }: { activeTab: "1" | "2" }) => {
  const [hasLevel2, setHasLevel2] = useState<boolean>(true);
  const [optionList, setOptionList] = useState<OptionType[] | []>([]);
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [otherInfo, setOtherInfo] = useState<{
    ownerName?: string;
    code?: string;
  }>({
    ownerName: "",
    code: "",
  });

  const { data, isSuccess } = useDepositInfoQuery("IRR");
  const { data: fee } = useTransactionFeeQuery("IRR");
  const [depositRequest, { data: depResponse }] = useDepositMutation();

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
  const { handleSubmit, control } = useForm<ShebaFormType>({
    mode: "onChange",
    defaultValues: {
      accountName: "",
      shebaNumber: "",
      depositId: "",
      bankName: "",
    },
    resolver,
  });
  const onSubmit = async (data: ShebaFormType) => {
    console.log(data);
  };

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
    activeTab === "2" &&
      accounts &&
      depositRequest({
        currencyCode: "IRR",
        amount: fee?.depositMinAmount,
        flow: "MANUAL_WITH_PAYMENT_IDENTIFIER",
        bankAccountId: accounts[0]?.id,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts, getSuccessAccounts, activeTab]);

  return hasLevel2 ? (
    <form onSubmit={handleSubmit(onSubmit)}>
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
                    حداقل مبلغ واریز:{" "}
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
        {depResponse && (
          <Col xs={12} lg={6}>
            <Controller
              name="depositId"
              control={control}
              render={({ field: { name, value } }) => (
                <FormGroup>
                  <Label htmlFor={name}> شناسه واریز:</Label>
                  <CopyInput
                    text={depResponse.providerData.flowPaymentIdentifier || ""}
                  />
                  <FormText>کارمزد واریز بین بانکی: صفر تومان</FormText>
                </FormGroup>
              )}
            />
          </Col>
        )}
      </Row>
    </form>
  ) : (
    <Row>
      <AlertInfo
        text="واریز بین بانکی در صورتی برای شما فعال می‌شود که به سطح دو کاربری ارتقا پیدا کنید."
        hasIcon={true}
      />
      <div className="text-center mt-3">
        <Button color="primary" type="button" onClick={() => {}} outline>
          ارتقاع سطح کاربری
        </Button>
      </div>
    </Row>
  );
};

export default ShebaForm;
