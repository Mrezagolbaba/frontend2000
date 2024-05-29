import ATable from "components/ATable";
import moment from "jalali-moment";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";
import { convertText, normalizeAmount } from "helpers";
import { useMemo } from "react";
import { useTransactionsQuery } from "store/api/wallet-management";

import dashboard from "assets/scss/dashboard/dashboard.module.scss";

function LatestDeals() {
  // ==============|| Hooks ||================= //
  const { data, isLoading, isSuccess, isFetching } = useTransactionsQuery({
    sort: "createdAt,DESC",
    filter: [
      `currencyCode||eq||USDT`,
      "status||$ne||DRAFT",
      "status||$ne||EXPIRED",
      "status||$ne||INITIATED",
    ],
    or: ["type||eq||DEPOSIT", "type||eq||WITHDRAW"],
    limit: 10,
  });

  // ==============|| Constants ||================= //
  const columns = useMemo(
    () => [
      {
        id: "0",
        accessorKey: "type",
        accessorFn: (row: any) =>
          row?.type === "DEPOSIT" ? (
            <span className="text-success">واریز</span>
          ) : (
            <span className="text-danger">برداشت</span>
          ),
        header: "نوع تراکنش",
      },
      {
        id: "1",
        accessorKey: "cryptoName",
        accessorFn: (row) => convertText(row?.currencyCode, "enToFa"),
        header: "نوع ارز",
      },
      {
        id: "3",
        accessorKey: "amount",
        header: "مقدار",
        accessorFn: (row: any) =>
          normalizeAmount(row?.amount, row?.currencyCode, false),
      },
      {
        id: "6",
        accessorKey: "status",
        header: "وضعیت",
        accessorFn: (row: any) =>
          row?.status === "SUCCESSFUL" ? (
            <span className="text-success">موفق</span>
          ) : (
            <span className="text-danger">ناموفق</span>
          ),
      },
      {
        id: "3",
        accessorKey: "createdAt",
        header: "تاریخ",
        accessorFn: (row: any) =>
          moment(row.createdAt).locale("fa").format("hh:mm YYYY/MM/DD"),
      },
    ],
    [],
  );

  return (
    <Card className="h-100">
      <CardHeader className="d-flex flex-row justify-content-between align-items-center">
        <CardTitle tag="h5"> تراکنش های اخیر</CardTitle>
        <Link className={dashboard["sub-link"]} to="/dashboard/history">
          تاریخچه
        </Link>
      </CardHeader>
      <CardBody>
        <ATable
          size="small"
          data={isSuccess ? data : []}
          isLoading={isLoading || isFetching}
          columns={columns}
        />
      </CardBody>
    </Card>
  );
}

export default LatestDeals;
