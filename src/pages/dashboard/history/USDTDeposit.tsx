import ATable from "components/ATable";
import CopyInput from "components/Input/CopyInput";
import Transaction from "components/MobileRecord/Transaction";
import moment from "jalali-moment";
import { StatusHandler } from ".";
import { normalizeAmount } from "helpers";
import { useMemo } from "react";
import { useTransactionsQuery } from "store/api/wallet-management";

function USDTDeposit({ limit }: { limit?: number | undefined }) {
  // ==============|| Hooks ||================= //
  const { data, isLoading, isFetching, isSuccess } = useTransactionsQuery({
    filter: [`currencyCode||eq||USDT`, "type||eq||DEPOSIT"],
    sort: "createdAt,DESC",
    limit,
  });

  // ==============|| Handlers ||================= //
  const depositTypes = (flow: any) => {
    switch (flow) {
      case "PROMOTION":
        return "هدیه آرسونیکس";
      default:
        return "عادی";
    }
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
        meta: {
          hasMobile: true,
        },
      },
      {
        id: "1",
        accessorKey: "cryptoName",
        accessorFn: () => "تتر (USDT)",
        header: "نام ارز",
      },
      {
        id: "2",
        accessorKey: "network",
        accessorFn: () => "TRC20",
        header: "شبکه",
      },
      {
        id: "3",
        accessorKey: "amount",
        header: "مقدار",
        accessorFn: (row: any) => normalizeAmount(row?.amount, "USDT", false),
        meta: {
          hasMobile: true,
        },
      },
      {
        id: "4",
        accessorKey: "type",
        accessorFn: (row: any) => depositTypes(row?.type),
        header: "نوع واریز",
      },
      {
        id: "5",
        accessorKey: "TXID",
        header: "TXID",
        accessorFn: (row: any) => (
          <CopyInput
            text={row?.providerData?.flowWalletAddress}
            hasBox={false}
            maxCharacter={10}
          />
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
      noDataText="اولین تراکنش ارز دیجیتال خود را با آرسونیکس را تجربه کنید."
      mobileView={(row) => <Transaction record={row.original} id={row.id} />}
    />
  );
}

export default USDTDeposit;
