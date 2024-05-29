import ATable from "components/ATable";
import CopyInput from "components/Input/CopyInput";
import moment from "jalali-moment";
import { StatusHandler } from ".";
import { normalizeAmount } from "helpers";
import { useMemo } from "react";
import { useTransactionsQuery } from "store/api/wallet-management";

function USDTWithdraw() {
  // ==============|| Hooks ||================= //
  const { data, isLoading, isFetching, isSuccess } = useTransactionsQuery({
    filter: [
      `currencyCode||eq||USDT`,
      "status||$ne||DRAFT",
      "type||eq||WITHDRAW",
    ],
    sort: "createdAt,DESC",
  });

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
      },
      {
        id: "4",
        accessorKey: "fee",
        accessorFn: (row: any) => normalizeAmount(row?.fee, "USDT", false),
        header: "کارمزد",
      },
      {
        id: "5",
        accessorKey: "finalAmount",
        accessorFn: (row: any) =>
          normalizeAmount(
            (Number(row.amount) - Number(row?.fee)).toString(),
            "USDT",
            false,
          ),
        header: "مقدار برداشت شده",
      },
      {
        id: "6",
        accessorKey: "iban",
        header: "آدرس مقصد",
        accessorFn: (row: any) => (
          <CopyInput
            text={row?.destination?.iban}
            hasBox={false}
            maxCharacter={10}
          />
        ),
      },
      {
        id: "7",
        accessorKey: "txid",
        header: "TXID",
        accessorFn: (row: any) => (
          <CopyInput text={row?.providerRef} hasBox={false} maxCharacter={10} />
        ),
      },
      {
        id: "8",
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

export default USDTWithdraw;
