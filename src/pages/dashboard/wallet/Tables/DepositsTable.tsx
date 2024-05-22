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
      "type||eq||PROMOTION",
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
                className="text"
              >
                نوع واریزی
              </th>
              <th
                scope="col"
                style={{ color: "#03041b66" }}
                className="text"
              >
                مقدار واریزی
              </th>
              <th
                scope="col"
                style={{ color: "#03041b66" }}
                className="text"
              >
                {type !== "USDT" ? "شناسه پرداخت" : "TXID"}
              </th>
              <th
                scope="col"
                style={{ color: "#03041b66" }}
                className="text"
              >
                تاریخ پرداخت
              </th>
              <th
                scope="col"
                style={{ color: "#03041b66" }}
                className="text"
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
                <td className="text">
                  <DepositTypes
                    flow={
                      record.sourceType === "DEBIT"
                        ? record.sourceType
                        : record.providerData.flow
                    }
                  />
                </td>
                <td className="text">
                  <RenderAmount amount={record.amount} type={type} />
                </td>
                <td className="text">
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
                <td className="text">
                  {moment(record.createdAt)
                    .locale("fa")
                    .format("hh:mm DD MMMM YYYY")}
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
                className="text"
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
