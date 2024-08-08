import { FormFeedback, Spinner } from "reactstrap";
import * as Yup from "yup";
import RenderBankItem from "./RenderBankItem";
import { Controller, useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import DropdownInput, { OptionType } from "components/Input/Dropdown";
import {
  useBanksQuery,
  useDebitSubscriptionMutation,
} from "store/api/profile-management";

import wallet from "assets/scss/dashboard/wallet.module.scss";
import button from "assets/scss/components/button.module.scss";

export default function AddDebit() {
  // ==============|| States ||================= //
  const [isRedirect, setIsRedirect] = useState<boolean>(false);
  const [optionList, setOptionList] = useState<OptionType[] | any[]>([]);

  // ==============|| Validation ||================= //
  const resolver = yupResolver(
    Yup.object().shape({
      bankId: Yup.string().required("انتخاب بانک مبدا الزامی است."),
    }),
  );

  // ==============|| Hooks ||================= //
  const { data, isSuccess, isLoading } = useBanksQuery({
    filter: ["currencyCode||$eq||IRR", "vandarDebitCode||$ne||'null'"],
  });
  const [
    debitRequest,
    { data: debit, isSuccess: successDebit, isLoading: loadingDebit },
  ] = useDebitSubscriptionMutation();
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
    },
    resolver,
  });

  // ==============|| Handlers ||================= //
  const onSubmit = (data: { bankId: string }) => {
    debitRequest(data.bankId);
  };
  const handleList = useCallback(() => {
    if (isSuccess) {
      if (data.length > 0) {
        setOptionList(
          data.map((bank) => {
            return {
              content: (
                <RenderBankItem
                  id={bank.id}
                  name={bank.name}
                  website={bank.website}
                  logoPath={bank.logoPath as string}
                />
              ),
              value: bank.id,
            };
          }),
        );
        reset({
          bankId: data[0].id,
        });
      }
    }
  }, [data, isSuccess, reset]);

  // ==============|| Life Cycle ||================= //
  useEffect(() => handleList(), [handleList]);
  useEffect(() => {
    if (successDebit && debit) {
      setIsRedirect(true);
      window.location.replace(debit?.url);
    }
  }, [debit, successDebit]);

  // ==============|| Render ||================= //
  return (
    <>
      {isRedirect && (
        <div className="overlay-redirect">
          <Spinner />
          <span>درحال انتقال به صفحه مورد نظر ...</span>
        </div>
      )}
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
                    options={optionList}
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
            <div className="mt-3 text-center">
              <button
                disabled={loadingDebit || isLoading}
                type="submit"
                className={`${button["arsonex-btn"]} ${button["primary-outline"]} ${button["full-width"]} mb-2`}
              >
                ثبت و ادامه
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
