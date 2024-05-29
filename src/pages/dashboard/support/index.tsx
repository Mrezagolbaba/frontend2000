import ATable from "components/ATable";
import TicketModal from "./AddModal";
import moment from "jalali-moment";
import { Button, Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";
import { useGetTicketsQuery } from "store/api/ticket";
import { useMemo, useState } from "react";

const Support = () => {
  // ==============|| States ||================= //
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ==============|| Hooks ||================= //
  const { data, isLoading, isSuccess, isFetching } = useGetTicketsQuery();

  // ==============|| Constants ||================= //
  const columns = useMemo(
    () => [
      {
        id: "0",
        accessorKey: "createdAt",
        header: "تاریخ ارسال",
        accessorFn: (row: any) =>
          moment(row.createdAt).locale("fa").format("hh:mm YYYY/MM/DD"),
      },
      {
        id: "1",
        accessorKey: "subject",
        header: "عنوان تیکت",
      },
      {
        id: "2",
        accessorKey: "status",
        header: "وضعیت",
        accessorFn: (row: any) =>
          row?.status === "OPEN" ? (
            <span className="text-success">باز</span>
          ) : row?.status === "CLOSE" ? (
            <span className="text-danger">بسته</span>
          ) : (
            <span className="text-info">در حال بررسی</span>
          ),
      },
      {
        id: "3",
        accessorKey: "detail",
        header: "",
        accessorFn: (row: any) => (
          <Link to={`details/${row?.id}`}>مشاهده جزئیات</Link>
        ),
      },
    ],
    [],
  );

  // ==============|| Render ||================= //
  return (
    <section className="page page-support">
      <Card className="custom-card currencies-online-rates card-secondary">
        <CardHeader className="d-flex flex-row justify-content-between align-items-center">
          <CardTitle tag="h5">پشتیبانی</CardTitle>
          <div className="card-action support-btn">
            <Link
              className="px-4 mb-2 btn btn-primary btn-sm"
              style={{
                fontSize: ".87rem",
              }}
              target="_blank"
              to="https://help.arsonex.com/"
            >
              مرکز راهنمایی
            </Link>
            <Button
              color="primary"
              outline
              size="sm"
              style={{
                fontSize: ".87rem",
              }}
              onClick={() => setIsModalOpen(true)}
            >
              ارسال تیکت
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <ATable
            data={isSuccess ? data : []}
            isLoading={isLoading || isFetching}
            columns={columns}
          />
        </CardBody>
      </Card>
      <TicketModal
        isModalOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => setIsModalOpen(false)}
      />
    </section>
  );
};
export default Support;
