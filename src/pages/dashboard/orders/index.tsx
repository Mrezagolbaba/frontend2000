import ATable from "components/ATable";
import SquareInfo from "components/Icons/SquareInfo";
import moment from "jalali-moment";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { convertText, convertTextSingle, normalizeAmount } from "helpers";
import { useCurrencySwapQuery } from "store/api/exchange-management";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import style, {
  amount,
  title,
  transaction,
  transaction__counter,
  transaction__data,
  transaction__data__detail,
  transaction__data__others,
} from "assets/scss/dashboard/history.module.scss";

const History = () => {
  // ==============|| Hooks ||================= //
  const navigate = useNavigate();
  const { data, isLoading, isSuccess, isFetching } = useCurrencySwapQuery({
    sort: "createdAt,DESC",
    join: "transactions",
  });

  // ==============|| Handlers ||================= //
  const renderFee = (fee, transactions) => {
    const targetTransAction = transactions.find((t) => t.currencyCode === fee);
    return targetTransAction?.fee
      ? normalizeAmount(targetTransAction?.fee, fee, true)
      : "0";
  };

  // ==============|| Constants ||================= //
  const columns = useMemo(
    () => [
      {
        id: "0",
        accessorKey: "source",
        accessorFn: (row: any) => (
          <span className="text-success">
            {convertTextSingle(row?.sourceCurrencyCode)}
          </span>
        ),
        header: "بازار مبدا",
      },
      {
        id: "1",
        accessorKey: "destination",
        accessorFn: (row: any) => (
          <span className="text-danger">
            {convertTextSingle(row?.destinationCurrencyCode)}
          </span>
        ),
        header: "بازار مقصد",
      },
      {
        id: "2",
        accessorKey: "sourceAmount",
        header: "پرداخت شده",
        accessorFn: (row: any) =>
          normalizeAmount(row?.sourceAmount, row?.sourceCurrencyCode, true),
      },
      {
        id: "3",
        accessorKey: "fee",
        header: "کارمزد معامله",
        accessorFn: (row: any) =>
          renderFee(row?.feeCurrencyCode, row?.transactions),
      },
      {
        id: "4",
        accessorKey: "destinationAmount",
        header: "دریافت شده",
        accessorFn: (row: any) =>
          normalizeAmount(
            row?.destinationAmount,
            row?.destinationCurrencyCode,
            true,
          ),
      },
      {
        id: "5",
        accessorKey: "createdAt",
        header: "تاریخ",
        accessorFn: (row: any) =>
          moment(row.createdAt).locale("fa").format("hh:mm YYYY/MM/DD"),
      },
      {
        id: "6",
        accessorKey: "details",
        header: "جزئیات",
        accessorFn: (row: any) => (
          <SquareInfo
            onClick={() => navigate(`/dashboard/invoice/${row?.id}`)}
            width={24}
            height={24}
            style={{
              cursor: "pointer",
            }}
          />
        ),
      },
    ],
    [],
  );

  // ==============|| Render ||================= //
  return (
    <Card className="h-100">
      <CardHeader className="d-flex flex-row justify-content-between align-items-center">
        <CardTitle tag="h5"> سفارشات من </CardTitle>
      </CardHeader>
      <CardBody>
        <ATable
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
};
export default History;
