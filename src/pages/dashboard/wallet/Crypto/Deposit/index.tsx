import { FormFeedback, Input, Spinner } from "reactstrap";
import * as Yup from "yup";
import { Controller, useForm as useRHF } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useCancelTransactionMutation,
  useDepositMutation,
  useLazyTransactionQuery,
} from "store/api/wallet-management";
import DropdownInput from "components/Input/Dropdown";
import CountdownTimer from "components/Input/CountDownInput";
import CopyInput from "components/Input/CopyInput";
import tron from "assets/img/network/tron.svg";

import wallet from "assets/scss/dashboard/wallet.module.scss";
import button from "assets/scss/components/button.module.scss";
import { AlertInfo, AlertWarning } from "components/AlertWidget";
import tetherIcon from "assets/img/coins/tether.svg";

type CryptoFormType = {
  network: string;
};

type Props = {
  currency: any;
};

const DepositCrypto = ({ currency }: Props) => {
  const [showResult, setShowResult] = useState<boolean>(false);
  const [result, setResult] = useState({
    networkName: "",
    walletAddress: "",
    amount: "",
    endTime: "",
  });

  const [depositRequest, { data, isLoading, isSuccess }] = useDepositMutation();

  const [
    getTransAction,
    {
      data: transaction,
      isLoading: loadingTransaction,
      isFetching: FetchingTransaction,
      isSuccess: successGetTransaction,
    },
  ] = useLazyTransactionQuery();
  const [cancelTransaction] = useCancelTransactionMutation();

  const resolver = yupResolver(
    Yup.object().shape({
      network: Yup.string().required(),
    }),
  );

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useRHF<CryptoFormType>({
    mode: "onChange",
    defaultValues: {
      network: "TRC20",
    },
    resolver,
  });
  const onSubmit = () => {
    depositRequest({
      currencyCode: currency,
      amount: "1",
      flow: "MANUAL_WITH_WALLET_ADDRESS",
    });
  };

  const handleClose = () => {
    reset({
      network: "TRC20",
    });
    setResult({
      networkName: "",
      walletAddress: "",
      amount: "",
      endTime: "",
    });
    setShowResult(false);
    data && cancelTransaction(data?.id);
    localStorage.removeItem("cryptoWalletId");
    localStorage.removeItem("cryptoWalletExpiredTime");
  };

  useEffect(() => {
    const id = localStorage.getItem("cryptoWalletId");
    const expiredTime = localStorage.getItem("cryptoWalletExpiredTime");
    if (id && new Date(expiredTime as string) > new Date()) {
      getTransAction(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (successGetTransaction && transaction) {
      if (new Date(transaction.expiresAt as string) < new Date()) {
        setShowResult(false);
      } else {
        setShowResult(true);
        setResult({
          networkName: transaction.currencyCode,
          walletAddress: transaction.providerData.flowWalletAddress,
          amount: transaction.amount,
          endTime: transaction.expiresAt as string,
        });
      }
    }
  }, [successGetTransaction, transaction]);

  useEffect(() => {
    if (isSuccess && data) {
      setShowResult(true);
      setResult({
        networkName: data.currencyCode,
        walletAddress: data.providerData.flowWalletAddress,
        amount: data.amount,
        endTime: data.expiresAt as string,
      });
      localStorage.setItem("cryptoWalletId", data.id);
      localStorage.setItem("cryptoWalletExpiredTime", data.expiresAt as string);
    }
  }, [data, isSuccess]);

  return (
    <>
      <div className={wallet["form-container"]}>
        {loadingTransaction || FetchingTransaction ? (
          <div className={`${wallet["form-wrapper"]} pt-3`}>
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
        ) : (
          <div className={wallet["form-wrapper"]}>
            {showResult ? (
              <>
                <div>
                  <div>
                    <div className={wallet["form-group"]}>
                      <div className={wallet["form-group__label"]}>
                        <label htmlFor="tether">نام ارز</label>
                      </div>
                      <DropdownInput
                        id="tether"
                        value="USDT"
                        options={[
                          {
                            value: "USDT",
                            content: (
                              <div className={wallet["items-credit"]}>
                                <span className={wallet["items-credit__icon"]}>
                                  <img
                                    width={15}
                                    height={15}
                                    className="bank-svg"
                                    src={tetherIcon}
                                    alt="tether-flag"
                                  />
                                </span>
                                <span dir="ltr"> تتر - USDT</span>
                              </div>
                            ),
                          },
                        ]}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div>
                    <div className={wallet["form-group"]}>
                      <div className={wallet["form-group__label"]}>
                        <label htmlFor="network">شبکه ارز </label>
                      </div>
                      <DropdownInput
                        id="network"
                        value="TRC20"
                        options={[
                          {
                            content: (
                              <div className={wallet["items-credit"]}>
                                <span className={wallet["items-credit__icon"]}>
                                  <img
                                    width={20}
                                    height={20}
                                    alt="TRC20"
                                    src={tron}
                                    className="bank-svg"
                                  />
                                </span>
                                <span>TRC20</span>
                              </div>
                            ),
                            value: "TRC20",
                          },
                        ]}
                        disabled={true}
                        // hasError={Boolean(errors?.[name])}
                      />
                    </div>
                  </div>
                  <div>
                    <div className={wallet["form-group"]}>
                      <div className={wallet["form-group__label"]}>
                        <label> زمان اتمام تراکنش </label>
                      </div>
                      <CountdownTimer targetDate={result.endTime} />
                    </div>
                  </div>
                  <div>
                    <div className={wallet["form-group"]}>
                      <div className={wallet["form-group__label"]}>
                        <label htmlFor="walletAddress"> نمایش کیف پول </label>
                      </div>
                      <CopyInput
                        name="آدرس کیف پول"
                        text={result.walletAddress}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mt-3 text-center">
                    <button
                      disabled={isLoading}
                      className={`${button["arsonex-btn"]} ${button["primary-outline"]} ${button["full-width"]} mb-2`}
                      onClick={handleClose}
                    >
                      لغو تراکنش
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <div>
                    <div className={wallet["form-group"]}>
                      <div className={wallet["form-group__label"]}>
                        <label htmlFor="tether">نام ارز</label>
                      </div>
                      <DropdownInput
                        id="tether"
                        value="USDT"
                        options={[
                          {
                            value: "USDT",
                            content: (
                              <div className={wallet["items-credit"]}>
                                <span className={wallet["items-credit__icon"]}>
                                  <img
                                    width={15}
                                    height={15}
                                    className="bank-svg"
                                    src={tetherIcon}
                                    alt="tether-flag"
                                  />
                                </span>
                                <span dir="ltr"> تتر - USDT</span>
                              </div>
                            ),
                          },
                        ]}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div>
                    <Controller
                      name="network"
                      control={control}
                      render={({ field: { name, value } }) => (
                        <div className={wallet["form-group"]}>
                          <div className={wallet["form-group__label"]}>
                            <label htmlFor={name}>شبکه ارز </label>
                          </div>
                          <DropdownInput
                            id={name}
                            value={value}
                            onChange={(val) => setValue(name, val)}
                            options={[
                              {
                                content: (
                                  <div className={wallet["items-credit"]}>
                                    <span
                                      className={wallet["items-credit__icon"]}
                                    >
                                      <img
                                        width={20}
                                        height={20}
                                        alt="TRC20"
                                        src={tron}
                                        className="bank-svg"
                                      />
                                    </span>
                                    <span>TRC20</span>
                                  </div>
                                ),
                                value: "TRC20",
                              },
                            ]}
                            disabled={true}
                            // hasError={Boolean(errors?.[name])}
                          />
                          {errors?.[name] && (
                            <FormFeedback tooltip>
                              {errors[name]?.message}
                            </FormFeedback>
                          )}
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div>
                  <div className="mt-3 text-center">
                    <button
                      disabled={isLoading}
                      type="submit"
                      className={`${button["arsonex-btn"]} ${button["primary"]} ${button["full-width"]} mb-2`}
                    >
                      {isLoading ? <Spinner /> : "ساخت کیف پول"}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
      <div className={wallet.info}>
        <AlertWarning
          hasIcon
          text="از واریز قرارداد هوشمند و یا توکن‌های غیرواقعی خودداری کنید."
        />
        <AlertWarning
          hasIcon
          text="در هنگام واریز، لطفاً اطمینان حاصل کنید که آدرس واریز با آدرس نمایش داده‌شده مطابقت داشته باشد؛ در غیر این صورت، ممکن است دارایی شما از بین برود."
        />
        <AlertInfo
          hasIcon
          text="برای حفظ امنیت شما در برابر تهدیدات بین‌المللی (تحریم شهروندان ایرانی)، آرسونیکس در هر بار درخواست واریز کیف پول جدیدی را به شما ارائه می‌کند."
        />
      </div>
    </>
  );
};

export default DepositCrypto;
