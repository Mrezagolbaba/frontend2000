import { FormFeedback } from "reactstrap";

import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import button from "assets/scss/components/button.module.scss";
import wallet from "assets/scss/dashboard/wallet.module.scss";
import DropdownInput, { OptionType } from "components/Input/Dropdown";
import {
  useDepositMutation,
  useLazyWalletsQuery,
} from "store/api/wallet-management";
import { useAppSelector } from "store/hooks";
import { useDisconnectDebitMutation } from "store/api/profile-management";
import Notify from "components/Notify";
import CurrencyInput from "components/Input/CurrencyInput/newCurrencyInput";
import { persianToEnglishNumbers } from "helpers";

export default function DepositDebit({
  data,
  isLoading,
  onClose,
}: {
  data: any;
  isLoading: boolean;
  onClose: () => void;
}) {
  // ==============|| States ||================= //
  const [options, setOptions] = useState<OptionType[]>([]);
  const [hasAccount, setHasAccount] = useState<boolean>(false);

  // ==============|| Validation ||================= //
  const resolver = yupResolver(
    Yup.object().shape({
      bankId: Yup.string().required("انتخاب بانک مبدا الزامی است."),
      amount: Yup.string().required("لطفا مبلغ مورد نظر خود را وارد کنید."),
    }),
  );

  // ==============|| Hooks ||================= //
  const [getWallet] = useLazyWalletsQuery();
  const { token } = useAppSelector((state: any) => state.auth);
  const [depositRequest, { isLoading: loadingDeposit, isSuccess }] =
    useDepositMutation();
  const [
    disconnect,
    { isLoading: loadingDisconnect, isSuccess: successDisconnect },
  ] = useDisconnectDebitMutation();
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      bankId: "",
      amount: "",
    },
    resolver,
  });

  // ==============|| Handlers ||================= //
  const onSubmit = (data: { bankId: string; amount: string }) =>
    depositRequest({
      currencyCode: "IRR",
      amount: (Number(data.amount) * 10).toString(),
      bankAccountId: data.bankId,
      flow: "DEBIT",
    });

  const handleList = useCallback(() => {
    if (data.length <= 0) {
      setHasAccount(false);
    } else {
      setOptions(
        data.map((bank: any) => {
          let result = "";
          try {
            // Fetch the image data from your API
            const response: any = fetch(
              `${"https://dev-api.paydirham.me/v1/"}admin/banks/logo/${bank.id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );
            const imageData = response.blob();
            result = URL.createObjectURL(imageData);
          } catch (error) {
            console.error("Error fetching image:", error);
          }

          return {
            content: (
              <div className="flex">
                <img
                  width="20"
                  height="20"
                  src={result ? result : "/images/banks/bankDefault.svg"}
                  alt={bank?.bank.name}
                />
                <span className="mx-2">{bank?.bank.website}</span>
              </div>
            ),
            value: bank.id,
          };
        }),
      );
      reset({
        bankId: data[0].id,
      });
    }
  }, [data, reset, token]);

  const handleClose = useCallback(() => {
    if (isSuccess) {
      Notify({ type: "success", text: "موجودی شما با موفقیت شارژ شد." });
      onClose?.();
      getWallet();
    } else if (successDisconnect) {
      Notify({
        type: "success",
        text: "سرویس شارژ سریع برای شما غیر فعال شد.",
      });
      onClose?.();
    }
  }, [getWallet, isSuccess, onClose, successDisconnect]);

  // ==============|| Life Cycle ||================= //
  useEffect(() => handleList(), [handleList]);
  useEffect(() => {
    handleClose();
  }, [handleClose]);

  // ==============|| Render ||================= //
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div>
          <Controller
            name="bankId"
            control={control}
            render={({ field: { name, value } }) => (
              <div className={wallet["form-group"]}>
                <div className={wallet["form-group__label"]}>
                  <label htmlFor={name}> بانک مبدا </label>
                </div>
                <DropdownInput
                  id={name}
                  value={value}
                  onChange={(val) => {
                    setValue(name, val);
                  }}
                  options={options}
                  hasError={Boolean(errors?.[name])}
                />
                {errors?.[name] && (
                  <FormFeedback tooltip>{errors[name]?.message}</FormFeedback>
                )}
              </div>
            )}
          />
        </div>
        <div>
          <Controller
            name="amount"
            control={control}
            render={({ field: { name, value } }) => (
              <div className={wallet["form-group"]}>
                <div className={wallet["form-group__label"]}>
                  <label htmlFor={name}>مقدار واریز </label>
                </div>
                <CurrencyInput
                  thousandSeparator=","
                  name={name}
                  value={value}
                  onChange={(e: any) => {
                    const amountTemp = e.target.value.replaceAll(",", "");
                    setValue(name, persianToEnglishNumbers(amountTemp));
                  }}
                  placeholder="تومان"
                  // hasError={Boolean(errors?.[name])}
                />
                {errors?.[name] && (
                  <FormFeedback tooltip>{errors[name]?.message}</FormFeedback>
                )}
              </div>
            )}
          />
        </div>
        <div>
          <div className="mt-3 text-center">
            <button
              className={`${button["arsonex-btn"]} ${button["primary"]} ${button["full-width"]} mb-2`}
              disabled={isLoading || loadingDeposit || loadingDisconnect}
              type="submit"
            >
              پرداخت از طریق شارژ سریع
            </button>
            <button
              disabled={loadingDisconnect || isLoading || loadingDeposit}
              className={`${button["arsonex-btn"]} ${button["primary-outline"]} ${button["full-width"]} mb-2`}
              onClick={() => {
                !isLoading && data && disconnect(data[0]?.id);
              }}
            >
              قطع دسترسی به حساب
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
