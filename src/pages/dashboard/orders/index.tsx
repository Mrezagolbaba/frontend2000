import ATable from "components/ATable";
import SquareInfo from "components/Icons/SquareInfo";
import moment from "jalali-moment";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { convertTextSingle, normalizeAmount } from "helpers";
import { useCurrencySwapQuery } from "store/api/exchange-management";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

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
        />
      </CardBody>
    </Card>
  );
};
export default History;
