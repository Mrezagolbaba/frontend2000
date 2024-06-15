import ATable from "components/ATable";
import Transaction from "components/MobileRecord/Transaction";
import moment from "jalali-moment";
import { Link } from "react-router-dom";
import { StatusHandler } from ".";
import { normalizeAmount } from "helpers";
import { useMemo } from "react";
import { useTransactionsQuery } from "store/api/wallet-management";

function USDTWithdraw({ limit }: { limit?: number | undefined }) {
  // ==============|| Hooks ||================= //
  const { data, isLoading, isFetching, isSuccess } = useTransactionsQuery({
    filter: [
      `currencyCode||eq||USDT`,
      "status||$ne||DRAFT",
      "type||eq||WITHDRAW",
    ],
    sort: "createdAt,DESC",
    limit,
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
          <Link
            to={`https://tronscan.org/#/transaction/${row.providerRef}`}
            target="_blank"
          >
            لینک تراکنش
          </Link>
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
      noDataText="اولین تراکنش ارز دیجیتال خود را با آرسونیکس را تجربه کنید."
      mobileView={(row) => (
        <Transaction record={row.original} id={row.id} />
      )}
    />
  );
}

export default USDTWithdraw;
