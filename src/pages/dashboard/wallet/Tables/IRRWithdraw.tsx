import ATable from "components/ATable";
import CopyInput from "components/Input/CopyInput";
import moment from "jalali-moment";
import { StatusHandler } from ".";
import { normalizeAmount } from "helpers";
import { useMemo } from "react";
import { useTransactionsQuery } from "store/api/wallet-management";

function IRRWithdraw() {
  // ==============|| Hooks ||================= //
  const { data, isLoading, isFetching, isSuccess } = useTransactionsQuery({
    filter: [
      `currencyCode||eq||IRR`,
      "status||$ne||DRAFT",
      "type||eq||WITHDRAW",
    ],
    sort: "createdAt,DESC",
    limit: 5,
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
        id: "3",
        accessorKey: "finalAmount",
        accessorFn: (row: any) =>
          normalizeAmount(
            (Number(row.amount) - Number(row?.fee)).toString(),
            "IRR",
            false,
          ),
        header: "مقدار برداشت شده",
      },
      {
        id: "4",
        accessorKey: "iban",
        header: "شماره شبا",
        accessorFn: (row: any) => (
          <CopyInput
            text={row?.destination?.iban}
            hasBox={false}
            maxCharacter={10}
          />
        ),
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

export default IRRWithdraw;
