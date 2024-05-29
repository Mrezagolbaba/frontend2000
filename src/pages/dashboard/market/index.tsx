import ATable from "components/ATable";
import Turkey from "assets/img/coins/try.svg";
import USDT from "assets/img/coins/usdt.svg";
import { Card, CardBody, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";
import { convertTextSingle, extractLeftSide, normalizeAmount } from "helpers";
import { useGetRatesQuery } from "store/api/publices";
import { useMemo } from "react";

const Market = () => {
  // ==============|| Hooks ||================= //
  const { data, isSuccess, isLoading, isFetching } = useGetRatesQuery({});

  // ==============|| Constants ||================= //
  const columns = useMemo(
    () => [
      {
        id: "0",
        accessorKey: "pair",
        accessorFn: (row: any) => (
          <>
            <span className="icon">
              <img
                src={row?.pair === "USDT/IRR" ? USDT : Turkey}
                alt=""
                style={{ width: "20px", marginLeft: "5px" }}
              />
            </span>
            <span className="text-50 m-fa">
              {convertTextSingle(extractLeftSide(row.pair))}
            </span>
          </>
        ),
        header: "ارز",
      },
      {
        id: "1",
        accessorKey: "lastPrice",
        accessorFn: (row) => normalizeAmount(row?.rate, "IRR", true),
        header: "آخرین قیمت (تومان)",
      },
      {
        id: "3",
        accessorKey: "start",
        header: "",
        accessorFn: () => (
          <Link to="/dashboard/exchange" className="btn-simple tm__actions">
            شروع معامله
          </Link>
        ),
      },
    ],
    [],
  );

  // ==============|| Render ||================= //
  return (
    <section className="page page-market">
      <Card>
        <CardHeader>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h5 className="card-title">بازارهای معاملاتی</h5>
            <div className="card-action">
              <Link to="/dashboard/exchange" className="btn-simple">
                معامله سریع
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <ATable
            data={
              isSuccess
                ? data.filter(
                    (record) =>
                      record.pair === "USDT/IRR" || record.pair === "TRY/IRR",
                  )
                : []
            }
            isLoading={isLoading || isFetching}
            columns={columns}
          />
        </CardBody>
      </Card>
    </section>
  );
};
export default Market;
