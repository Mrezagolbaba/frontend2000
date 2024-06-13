import ATable from "components/ATable";
import moment from "jalali-moment";
import { Button, Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";
import { convertText, normalizeAmount, renderStatus } from "helpers";
import { useMemo } from "react";
import { useTransactionsQuery } from "store/api/wallet-management";

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
          mobileView={(row) => (
            <div className={transaction}>
              <div
                className={`${transaction__counter} ${style[renderStatus(row.original.status).badgeName]}`}
              >
                <span>{Number(row.id) + 1}</span>
              </div>
              <div className={transaction__data}>
                <div className={transaction__data__detail}>
                  <div
                    className={title}
                  >{`${row.original.type === "DEPOSIT" ? "واریز" : "برداشت"} ${renderStatus(row.original.status).label}`}</div>
                  <div className={amount}>
                    <span>
                      {normalizeAmount(
                        row.original.amount,
                        row.original.currencyCode,
                        true,
                      )}
                    </span>
                  </div>
                </div>
                <div className={transaction__data__others}>
                  <div>
                    <span>نام ارز: </span>
                    <span>
                      {convertText(row.original?.currencyCode, "enToFa")}
                    </span>
                  </div>
                  <div>
                    <span>{`تاریخ ${row.original.type === "DEPOSIT" ? "واریز" : "برداشت"}: `}</span>
                    <span>
                      {moment(row.original.createdAt)
                        .locale("fa")
                        .format("hh:mm YYYY/MM/DD")}
                    </span>
                  </div>
                  <div>
                    <span className="d-flex align-items-center">
                      کد رهگیری:
                      <CopyInput
                        maxCharacter={12}
                        text={row.original.displayId}
                        hasBox={false}
                      />
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

export default LatestDeals;
