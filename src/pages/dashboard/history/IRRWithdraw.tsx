import ATable from "components/ATable";
import CopyInput from "components/Input/CopyInput";
import moment from "jalali-moment";
import { Button } from "reactstrap";
import { StatusHandler } from ".";
import { normalizeAmount, renderStatus } from "helpers";
import { useMemo, useState } from "react";
import { useTransactionsQuery } from "store/api/wallet-management";

import style, {
  amount,
  title,
  transaction,
  transaction__counter,
  transaction__data,
  transaction__data__detail,
  transaction__data__others,
} from "assets/scss/dashboard/history.module.scss";
import Dialog from "components/Dialog";
import TransactionReceipt from "../invoice/TransactionReceipt";

function IRRWithdraw({ limit }: { limit?: number | undefined }) {
  // ==============|| States ||================= //
  const [modal, setModal] = useState({ isOpen: false, id: "" });

  // ==============|| Hooks ||================= //
  const { data, isLoading, isFetching, isSuccess } = useTransactionsQuery({
    filter: [
      `currencyCode||eq||IRR`,
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
        accessorKey: "amount",
        header: "مقدار",
        accessorFn: (row: any) => normalizeAmount(row?.amount, "IRR", false),
        meta: {
          hasMobile: true,
        },
      },
      {
        id: "2",
        accessorKey: "fee",
        accessorFn: (row: any) => normalizeAmount(row?.fee, "IRR", false),
        header: "کارمزد",
      },
      {
        id: "3",
        accessorKey: "finalAmount",
        accessorFn: (row: any) =>
          normalizeAmount(
            (Number(row.amount) - Number(row?.fee)).toString(),
            "IRR",
            false,
          ),
        header: "مقدار برداشت شده",
      },
      {
        id: "4",
        accessorKey: "iban",
        header: "شماره شبا",
        accessorFn: (row: any) => (
          <CopyInput
            text={row?.destination?.iban}
            hasBox={false}
            maxCharacter={10}
          />
        ),
      },
      {
        id: "5",
        accessorKey: "displayId",
        header: "کد رهگیری",
        accessorFn: (row: any) => (
          <CopyInput text={row?.displayId} hasBox={false} maxCharacter={10} />
        ),
      },
      {
        id: "6",
        accessorKey: "status",
        header: "وضعیت",
        accessorFn: (row: any) => <StatusHandler status={row?.status} />,
      },
    ],
    [],
  );

  // ==============|| Render ||================= //
  return (
    <>
      <ATable
        data={isSuccess ? data : []}
        isLoading={isLoading || isFetching}
        columns={columns}
        noDataText="اولین تراکنش تومان با آرسونیکس را تجربه کنید."
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
                >{`برداشت ${renderStatus(row.original.status).label}`}</div>
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
                  <span>کارمزد: </span>
                  <span>
                    {normalizeAmount(
                      row.original.fee,
                      row.original.currencyCode,
                      true,
                    )}
                  </span>
                </div>
                <div>
                  <span>مقدار برداشت شده: </span>
                  <span>
                    {normalizeAmount(
                      (
                        Number(row?.original?.amount) -
                        Number(row?.original?.fee)
                      ).toString(),
                      row?.original?.currencyCode,
                      true,
                    )}
                  </span>
                </div>
                <div>
                  <span>تاریخ برداشت: </span>
                  <span>
                    {moment(row.original.createdAt)
                      .locale("fa")
                      .format("hh:mm YYYY/MM/DD")}
                  </span>
                </div>
                <div>
                  <span className="d-flex align-items-center">
                    شماره شبا:
                    <CopyInput
                      text={row.original?.destination?.iban}
                      maxCharacter={12}
                      hasBox={false}
                    />
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
                <div className="d-flex justify-content-center">
                  <Button
                    outline
                    color="primary"
                    onClick={() =>
                      setModal({ isOpen: true, id: row.original.id })
                    }
                  >
                    نمایش جزئیات
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      />
      <Dialog
        isOpen={modal.isOpen}
        onClose={() => setModal({ isOpen: false, id: "" })}
        hasCloseButton
        size="md"
      >
        <TransactionReceipt
          onClose={() => setModal({ isOpen: false, id: "" })}
          type="WITHDRAW"
          transactionID={modal.id}
        />
      </Dialog>
    </>
  );
}

export default IRRWithdraw;
