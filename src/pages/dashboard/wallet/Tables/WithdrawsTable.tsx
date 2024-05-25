import moment from "jalali-moment";
import { useTransactionsQuery } from "store/api/wallet-management";
import { RenderAmount, StatusHandler } from ".";
import { useBankAccountsQuery } from "store/api/profile-management";
import BanksWrapper from "components/BanksWrapper";
import CopyInput from "components/Input/CopyInput";
import Deposit from "assets/img/icons/depositIcon.svg";

import wallet from "assets/scss/dashboard/wallet.module.scss";

type Props = {
  type: "IRR" | "TRY" | "USDT";
};

export default function WithdrawsTable({ type }: Props) {
  const { data, isLoading } = useTransactionsQuery({
    filter: [
      `currencyCode||eq||${type}`,
      "type||eq||WITHDRAW",
      "status||$ne||DRAFT",
    ],
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
        {data && data?.length > 0 && (
          <thead>
            <tr>
              <th
                scope="col"
                style={{ color: "#03041b66" }}
                className="text"
              >
                مقدار
              </th>
              <th
                scope="col"
                style={{ color: "#03041b66" }}
                className="text-center"
              >
                {type === "TRY"
                  ? "IBAN"
                  : type === "USDT"
                    ? "آدرس ولت"
                    : "شماره شبا"}
              </th>
              <th
                scope="col"
                style={{ color: "#03041b66" }}
                className="text"
              >
                تاریخ درخواست
              </th>
              <th
                scope="col"
                style={{ color: "#03041b66" }}
                className="text"
              >
                وضعیت
              </th>
            </tr>
          </thead>
        )}
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
                <td className="text">
                  <RenderAmount amount={record.amount} type={type} />
                </td>
                <td className="d-flex justify-content-center">
                  {/* <RenderIban id={record.destinationId} /> */}
                  <CopyInput
                    text={
                      type === "USDT"
                        ? record?.destinationId
                        : record?.destination?.iban
                    }
                    maxCharacter={10}
                    hasBox={false}
                  />
                </td>

                <td className="text">
                  {moment(record.createdAt)
                    .locale("fa")
                    .format("DD MMMM YYYY hh:mm")}
                </td>
                <td className="text">
                  <StatusHandler status={record.status} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className="text-center"
                style={{ boxShadow: "none" }}
              >
                <img
                  src={Deposit}
                  style={{
                    height: "50px",
                    width: "50px",
                    margin: "20px 0",
                  }}
                />
                <p>اولین تراکنش خود را با آرسونیکس تجربه کنید</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
