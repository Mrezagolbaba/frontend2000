import moment from "jalali-moment";
import { DepositTypes, RenderAmount, StatusHandler } from ".";
import Deposit from "assets/img/icons/depositIcon.svg";
import { useTransactionsQuery } from "store/api/wallet-management";
import CopyInput from "components/Input/CopyInput";
import { Link } from "react-router-dom";

type Props = {
  type: "IRR" | "TRY" | "USDT";
};

export default function DepositsTable({ type }: Props) {
  const { data, isLoading } = useTransactionsQuery({
    filter: [
      `currencyCode||eq||${type}`,
      "type||eq||DEPOSIT",
      "status||$ne||DRAFT",
    ],
    sort: "createdAt,DESC",
    limit: 5,
  });

  return (
    <div className="table-responsive">
      <table className="table table-borderless table-striped">
        {data && data?.length > 0 && (
          <thead>
            <tr>
              <th
                scope="col"
                style={{ color: "#03041b66" }}
                className="text-center"
              >
                نوع واریزی
              </th>
              <th
                scope="col"
                style={{ color: "#03041b66" }}
                className="text-center"
              >
                مقدار واریزی
              </th>
              <th
                scope="col"
                style={{ color: "#03041b66" }}
                className="text-center"
              >
                {type !== "USDT" ? "شناسه پرداخت" : "TXID"}
              </th>
              <th
                scope="col"
                style={{ color: "#03041b66" }}
                className="text-center"
              >
                تاریخ پرداخت
              </th>
              <th
                scope="col"
                style={{ color: "#03041b66" }}
                className="text-center"
              >
                وضعیت پرداخت
              </th>
            </tr>
          </thead>
        )}
        <tbody>
          {isLoading ? (
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
                <td className="placeholder-glow">
                  <div className="placeholder col-12 rounded" />
                </td>
              </tr>
            </>
          ) : data && data?.length > 0 ? (
            data?.map((record, index) => (
              <tr key={index}>
                <td className="text-center">
                  <DepositTypes
                    flow={
                      record.sourceType === "DEBIT"
                        ? record.sourceType
                        : record.providerData.flow
                    }
                  />
                </td>
                <td className="text-center">
                  <RenderAmount amount={record.amount} type={type} />
                </td>
                <td className="text-center">
                  <div className="d-flex flex-row justify-content-center">
                    {type === "USDT" ? (
                      <Link
                        target="_blank"
                        to={`https://tronscan.org/#/transaction/${record.providerRef}`}
                      >
                        لینک تراکنش
                      </Link>
                    ) : (
                      <CopyInput
                        text={record.id}
                        maxCharacter={10}
                        hasBox={false}
                      />
                    )}
                  </div>
                </td>
                <td className="text-center">
                  {moment(record.createdAt)
                    .locale("fa")
                    .format("hh:mm DD MMMM YYYY")}
                </td>
                <td className="text-center">
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
