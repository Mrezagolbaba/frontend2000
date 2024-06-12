import ATable from "components/ATable";
import CopyInput from "components/Input/CopyInput";
import moment from "jalali-moment";
import { StatusHandler } from ".";
import { normalizeAmount, renderStatus } from "helpers";
import { useMemo, useState } from "react";
import { useTransactionsQuery } from "store/api/wallet-management";
import Dialog from "components/Dialog";
import TransactionReceipt from "../invoice/TransactionReceipt";
import style, {
  amount,
  title,
  transaction,
  transaction__counter,
  transaction__data,
  transaction__data__detail,
  transaction__data__others,
} from "assets/scss/dashboard/history.module.scss";

export default function FiatDeposit({ limit }: { limit?: number | undefined }) {
  // ==============|| States ||================= //
  const [modal, setModal] = useState({ isOpen: false, id: "" });

  // ==============|| Hooks ||================= //
  const { data, isLoading, isFetching, isSuccess } = useTransactionsQuery({
    filter: [`currencyCode||eq||TRY`, "status||$ne||DRAFT"],
    or: ["type||eq||DEPOSIT", "type||eq||PROMOTION"],
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
        accessorKey: "fiatNamr",
        accessorFn: () => "لیر (TRY)",
        header: "نام فیات",
      },
      {
        id: "2",
        accessorKey: "amount",
        header: "مقدار",
        accessorFn: (row: any) => normalizeAmount(row?.amount, "TRY", false),
        meta: {
          hasMobile: true,
        },
      },
      {
        id: "3",
        accessorKey: "iban",
        header: "IBAN",
        accessorFn: (row: any) => (
          <CopyInput
            text={row?.source?.iban}
            hasBox={false}
            maxCharacter={10}
          />
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
        noDataText="اولین تراکنش فیات دیجیتال خود را با آرسونیکس را تجربه کنید."
        mobileView={(row) => (
          <div
            className={transaction}
            onClick={() => setModal({ isOpen: true, id: row.original.id })}
          >
            <div
              className={`${transaction__counter} ${style[renderStatus(row.original.status).badgeName]}`}
            >
              <span>{Number(row.id) + 1}</span>
            </div>
            <div className={transaction__data}>
              <div className={transaction__data__detail}>
                <div
                  className={title}
                >{`واریز ${renderStatus(row.original.status).label}`}</div>
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
                  <span>نام فیات: </span>
                  <span>لیر (TRY)</span>
                </div>
                <div>
                  <span>تاریخ واریز: </span>
                  <span>
                    {moment(row.original.createdAt)
                      .locale("fa")
                      .format("hh:mm YYYY/MM/DD")}
                  </span>
                </div>
                <div>
                  <span className="d-flex align-items-center">
                    IBAN:
                    <CopyInput
                      maxCharacter={12}
                      text={row.original?.source?.iban}
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
              </div>
            </div>
          </div>
        )}
      />
      <Dialog
        isOpen={modal.isOpen}
        onClose={() => setModal({ isOpen: false, id: "" })}
        size="md"
      >
        <TransactionReceipt
          onClose={() => setModal({ isOpen: false, id: "" })}
          type="DEPOSIT"
          transactionID={modal.id}
        />
      </Dialog>
    </>
  );
}
