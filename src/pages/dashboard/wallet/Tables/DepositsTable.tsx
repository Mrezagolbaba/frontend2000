import moment from "jalali-moment";
import { DepositTypes, RenderAmount, StatusHandler } from ".";

import { useTransactionsQuery } from "store/api/wallet-management";
import CopyInput from "components/Input/CopyInput";

type Props = {
  type: "IRR" | "TRY" | "USDT";
};

export default function DepositsTable({ type }: Props) {
  const { data, isLoading } = useTransactionsQuery({
    filter: [`currencyCode||eq||${type}`, "type||eq||DEPOSIT"],
    sort: "createdAt,DESC",
    limit: 5,
  });

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
              {type !== "USDT" ? "شناسه پرداخت" : "آدرس ولت"}
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
                  <DepositTypes flow={record.providerData.flow} />
                </td>
                <td className="text-center">
                  <RenderAmount amount={record.amount} type={type} />
                </td>
                <td className="text-center">
                  <div className="d-flex flex-row justify-content-center">
                    <CopyInput
                      text={
                        type === "USDT"
                          ? record.providerData.flowWalletAddress
                          : record.providerData.flowPaymentIdentifier
                      }
                      maxCharacter={10}
                      hasBox={false}
                    />
                  </div>
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
