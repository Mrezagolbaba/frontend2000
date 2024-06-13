import ATable from "components/ATable";
import moment from "jalali-moment";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";
import { convertText, normalizeAmount, renderStatus } from "helpers";
import { useCurrencySwapQuery } from "store/api/exchange-management";
import { useMemo } from "react";

import dashboard from "assets/scss/dashboard/dashboard.module.scss";
import style, {
  amount,
  title,
  transaction,
  transaction__counter,
  transaction__data,
  transaction__data__detail,
  transaction__data__others,
} from "assets/scss/dashboard/history.module.scss";
import CopyInput from "components/Input/CopyInput";

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
          mobileView={(row) => (
            <div className={transaction}>
              <div className={`${transaction__counter} ${style.primary}`}>
                <span>{Number(row.id) + 1}</span>
              </div>
              <div className={transaction__data}>
                <div className={transaction__data__detail}>
                  <div
                    className={title}
                  >{`${convertText(row.original?.sourceCurrencyCode, "enToFa")} - ${convertText(row.original?.destinationCurrencyCode, "enToFa")}`}</div>
                  <div className={amount}>
                    <span>
                      {normalizeAmount(
                        row.original.destinationAmount,
                        row.original.destinationCurrencyCode,
                        true,
                      )}
                    </span>
                  </div>
                </div>
                <div className={transaction__data__others}>
                  <div>
                    <span>مبلغ پرداخت شده: </span>
                    <span>
                      {normalizeAmount(
                        row.original.sourceAmount,
                        row.original.sourceCurrencyCode,
                        true,
                      )}
                    </span>
                  </div>
                  <div>
                    <span>تاریخ معامله: </span>
                    <span>
                      {moment(row.original.createdAt)
                        .locale("fa")
                        .format("hh:mm YYYY/MM/DD")}
                    </span>
                  </div>
                  <div>
                    <span>کارمزد: </span>
                    <span>
                      {normalizeAmount(
                        row.original.transactions.find(
                          (t) =>
                            t.currencyCode === row.original.feeCurrencyCode,
                        )?.fee,
                        row.original.feeCurrencyCode,
                        true,
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        />
      </CardBody>
    </Card>
  );
}
