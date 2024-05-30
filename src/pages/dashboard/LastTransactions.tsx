import ATable from "components/ATable";
import moment from "jalali-moment";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";
import { normalizeAmount } from "helpers";
import { useCurrencySwapQuery } from "store/api/exchange-management";
import { useMemo } from "react";

import dashboard from "assets/scss/dashboard/dashboard.module.scss";

export default function LastTransactions() {
   // ==============|| Hooks ||================= //
  const { data, isSuccess, isLoading, isFetching } = useCurrencySwapQuery({
    sort: "createdAt,DESC",
    join: "transactions",
    limit: "10",
  });

  // ==============|| Constants ||================= //
  const columns = useMemo(
    () => [
      {
        id: "0",
        accessorKey: "market",
        accessorFn: (row: any) => (
          <>
            <span className="text-success">{row?.sourceCurrencyCode}</span>
            {" " + "-" + " "}
            <span className="text-danger">{row?.destinationCurrencyCode}</span>
          </>
        ),
        header: "بازار معاملاتی",
      },
      {
        id: "1",
        accessorKey: "sourceAmount",
        header: "مقدار خرید",
        accessorFn: (row: any) =>
          normalizeAmount(row?.sourceAmount, row?.sourceCurrencyCode, true),
      },
      {
        id: "2",
        accessorKey: "destinationAmount",
        header: "مقدار دریافت",
        accessorFn: (row: any) =>
          normalizeAmount(
            row?.destinationAmount,
            row?.destinationCurrencyCode,
            true,
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

  // ==============|| Render ||================= //
  return (
    <Card className="h-100">
      <CardHeader className="d-flex flex-row justify-content-between align-items-center">
        <CardTitle tag="h5"> آخرین معاملات</CardTitle>
        <Link className={dashboard["sub-link"]} to="/dashboard/orders">
          سفارشات من
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
