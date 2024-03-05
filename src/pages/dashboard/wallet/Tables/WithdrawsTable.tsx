import { tomanShow } from "helpers";
import moment from "jalali-moment";
import { useTransactionsQuery } from "store/api/wallet-management";
import { RenderAmount, StatusHandler } from ".";
import { useBankAccountsQuery } from "store/api/profile-management";
import BanksWrapper from "components/BanksWrapper";

import wallet from "assets/scss/dashboard/wallet.module.scss";
import CopyInput from "components/Input/CopyInput";

type Props = {
  type: "IRR" | "TRY" | "USDT";
};

export default function WithdrawsTable({ type }: Props) {
  const { data, isLoading } = useTransactionsQuery({
    filter: [`currencyCode||eq||${type}`, "type||eq||WITHDRAW"],
    sort: "createdAt,DESC",
    limit: 5,
  });
  const { data: accounts, isLoading: loadingAccount } = useBankAccountsQuery({
    params: { join: "bank", filter: `bank.currencyCode||$eq||${type}` },
  });

  const RenderIban = ({ id }: { id: string }) => {
    const list = new Set(accounts);
    let ibanNumber;
    list.forEach((bank) => bank.id === id && (ibanNumber = bank.iban));

    return (
      <div className="d-flex flex-row justify-content-center">
        <BanksWrapper
          value={ibanNumber}
          type={type as "TRY" | "IRR"}
          iconClassName={wallet["bank-icon"]}
          isSheba={type === "IRR"}
        >
          <CopyInput text={ibanNumber} maxCharacter={10} hasBox={false} />
        </BanksWrapper>
      </div>
    );
  };

  return (
    <div className="table-responsive">
      <table className="table table-borderless table-striped">
        <thead>
          <tr>
            <th
              scope="col"
              style={{ color: "#03041b66" }}
              className="text-center"
            >
              مقدار
            </th>
            <th
              scope="col"
              style={{ color: "#03041b66" }}
              className="text-center"
            >
              {type === "TRY" ? "IBAN" : "شماره شبا"}
            </th>
            <th
              scope="col"
              style={{ color: "#03041b66" }}
              className="text-center"
            >
              تاریخ درخواست
            </th>
            <th
              scope="col"
              style={{ color: "#03041b66" }}
              className="text-center"
            >
              وضعیت
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading || loadingAccount ? (
            <>
              <tr>
                <td className="placeholder-glow">
                  <div className="placeholder col-12 rounded" />
                </td>
                <td className="placeholder-glow">
                  <div className="placeholder col-12 rounded" />
                </td>
                <td className="placeholder-glow">
                  <div className="placeholder col-12 rounded" />
                </td>
                <td className="placeholder-glow">
                  <div className="placeholder col-12 rounded" />
                </td>
              </tr>
              <tr>
                <td className="placeholder-glow">
                  <div className="placeholder col-12 rounded" />
                </td>
                <td className="placeholder-glow">
                  <div className="placeholder col-12 rounded" />
                </td>
                <td className="placeholder-glow">
                  <div className="placeholder col-12 rounded" />
                </td>
                <td className="placeholder-glow">
                  <div className="placeholder col-12 rounded" />
                </td>
              </tr>
              <tr>
                <td className="placeholder-glow">
                  <div className="placeholder col-12 rounded" />
                </td>
                <td className="placeholder-glow">
                  <div className="placeholder col-12 rounded" />
                </td>
                <td className="placeholder-glow">
                  <div className="placeholder col-12 rounded" />
                </td>
                <td className="placeholder-glow">
                  <div className="placeholder col-12 rounded" />
                </td>
              </tr>
            </>
          ) : data && data?.length > 0 ? (
            data?.map((record, index) => (
              <tr key={index}>
                <td className="text-center">
                  <RenderAmount amount={record.amount} type={type} />
                </td>
                <td className="text-center">
                  <RenderIban id={record.destinationId} />
                  {/* <CopyInput
                    text={
                      type === "USDT"
                        ? record.providerData.flowWalletAddress
                        : record.providerData.flowPaymentIdentifier
                    }
                    maxCharacter={10}
                    hasBox={false}
                  />
                  {record.destinationType === "BANK_ACCOUNT"
                    ? renderIban(record.destinationId)
                    : "-"} */}
                </td>

                <td className="text-center">
                  {moment(record.createdAt).locale("fa").format("DD MMMM YYYY")}
                </td>
                <td className="text-center">
                  <StatusHandler status={record.status} />
                </td>
              </tr>
            ))
          ) : (
            <tr className="py-4">دیتایی وجود ندارد</tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
