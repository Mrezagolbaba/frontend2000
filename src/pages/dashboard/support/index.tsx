import ATable from "components/ATable";
import TicketModal from "./AddModal";
import moment from "jalali-moment";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useGetTicketsQuery } from "store/api/ticket";
import { useMemo, useState } from "react";

import ticket from "assets/scss/dashboard/ticket.module.scss";

const Support = () => {
  // ==============|| States ||================= //
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ==============|| Hooks ||================= //
  const { data, isLoading, isSuccess, isFetching } = useGetTicketsQuery();

  const categoryRender = (value) => {
    switch (value) {
      case "USER_PROFILE_AND_VERIFICATION":
        return "اطلاعات هویتی و احراز";
      case "TICKET_DEPOSIT_WITHDRAW":
        return "واریز و برداشت";
      case "TICKET_TECHNICAL_ISSUES":
        return "مشکلات فنی";
      case "TICKET_TO_ADMIN":
        return "مدیریت";
      case "TICKETـCRITICSـAND_SUGGESSTIONS":
      default:
        return "انتقادات و پیشنهادات";
    }
  };
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
            noDataText="اولین تیکت خود را به پشتیبانی آرسونیکس ارسال کنید."
            mobileView={(row) => (
              <div className={ticket["mobile-view"]}>
                <div className={ticket.counter}>{Number(row.id) + 1}</div>
                <div className={ticket["mobile-view__body"]}>
                  <div className={ticket["mobile-view__title"]}>
                    <h5>{row.original.subject}</h5>
                    <div>
                      <span>
                        {row?.original?.status === "OPEN" ? (
                          <Badge color="success">باز</Badge>
                        ) : row?.original?.status === "CLOSE" ? (
                          <Badge color="danger">بسته</Badge>
                        ) : (
                          <Badge color="info">در حال بررسی</Badge>
                        )}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span>آخرین بروزرسانی: </span>
                    <span>
                      {moment(row.original.updatedAt)
                        .locale("fa")
                        .format("hh:mm YYYY/MM/DD")}
                    </span>
                  </div>
                  <div>
                    <span>دسته بندی: </span>
                    <span>{categoryRender(row.original.category)}</span>
                  </div>
                  <div className={ticket["mobile-view__button"]}>
                    <Link
                      to={`details/${row?.original?.id}`}
                      className="btn btn-outline-primary"
                    >
                      نمایش جزپیات
                    </Link>
                  </div>
                </div>
              </div>
            )}
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
