import ATable from "components/ATable";
import CopyInput from "components/Input/CopyInput";
import moment from "jalali-moment";
import { StatusHandler } from ".";
import { normalizeAmount } from "helpers";
import { useMemo } from "react";
import { useTransactionsQuery } from "store/api/wallet-management";

function IRRDeposit() {
  // ==============|| Hooks ||================= //
  const { data, isLoading, isFetching, isSuccess } = useTransactionsQuery({
    filter: [`currencyCode||eq||IRR`, "status||$ne||DRAFT"],
    or: ["type||eq||DEPOSIT", "type||eq||PROMOTION"],
    sort: "createdAt,DESC",
  });

  // ==============|| handlers ||================= //
  const depositTypes = (flow: any) => {
    switch (flow) {
      case "REDIRECT":
        return "درگاه پرداخت آنلاین";

      case "MANUAL_WITH_WALLET_ADDRESS":
        return "واریز به آدرس ولت";
      case "MANUAL_WITH_PAYMENT_IDENTIFIER":
        return "واریز بین بانکی";
      case "DEBIT":
        return "شارژ سریع";
      default:
        return "";
    }
    // REDIRECT: ,
    // MANUAL_WITH_PAYMENT_IDENTIFIER:"",
    // MANUAL_WITH_WALLET_ADDRESS:""
  };

  // ==============|| Constants ||================= //
  const columns = useMemo(
    () => [
      {
        id: "0",
        accessorKey: "createdAt",
        accessorFn: (row: any) =>
          moment(row.createdAt).locale("fa").format("hh:mm YYYY/MM/DD"),
        header: "تاریخ",
      },
      {
        id: "1",
        accessorKey: "amount",
        header: "مقدار",
        accessorFn: (row: any) => normalizeAmount(row?.amount, "IRR", false),
      },
      {
        id: "2",
        accessorKey: "fee",
        accessorFn: (row: any) => normalizeAmount(row?.fee, "IRR", false),
        header: "کارمزد",
      },

      {
        id: "4",
        accessorKey: "type",
        accessorFn: (row: any) =>
          depositTypes(
            row?.sourceType === "DEBIT"
              ? row?.sourceType
              : row?.providerData.flow,
          ),
        header: "نوع واریز",
      },
      {
        id: "5",
        accessorKey: "displayId",
        header: "کد رهگیری",
        accessorFn: (row: any) => (
          <CopyInput text={row?.displayId} hasBox={false} maxCharacter={10} />
        ),
      },
      {
        id: "6",
        accessorKey: "status",
        header: "وضعیت",
        accessorFn: (row: any) => <StatusHandler status={row?.status} />,
      },
    ],
    [],
  );

  // ==============|| Render ||================= //
  return (
    <ATable
      data={isSuccess ? data : []}
      isLoading={isLoading || isFetching}
      columns={columns}
    />
  );
}

export default IRRDeposit;
