import ATable from "components/ATable";
import CopyInput from "components/Input/CopyInput";
import Dialog from "components/Dialog";
import TransactionReceipt from "../invoice/TransactionReceipt";
import moment from "jalali-moment";
import { StatusHandler } from ".";
import { normalizeAmount } from "helpers";
import { useMemo, useState } from "react";
import { useTransactionsQuery } from "store/api/wallet-management";

function USDTDeposit({ limit }: { limit?: number | undefined }) {
  // ==============|| States ||================= //
  const [modal, setModal] = useState({ isOpen: false, id: "" });

  // ==============|| Hooks ||================= //
  const { data, isLoading, isFetching, isSuccess } = useTransactionsQuery({
    filter: [`currencyCode||eq||USDT`, "status||$ne||DRAFT"],
    or: ["type||eq||DEPOSIT", "type||eq||PROMOTION"],
    sort: "createdAt,DESC",
    limit,
  });

  // ==============|| Handlers ||================= //
  const depositTypes = (flow: any) => {
    switch (flow) {
      case "PROMOTION":
        return "هدیه آرسونیکس";
      default:
        return "عادی";
    }
  };

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
        accessorKey: "cryptoName",
        accessorFn: () => "تتر (USDT)",
        header: "نام ارز",
      },
      {
        id: "2",
        accessorKey: "network",
        accessorFn: () => "TRC20",
        header: "شبکه",
      },
      {
        id: "3",
        accessorKey: "amount",
        header: "مقدار",
        accessorFn: (row: any) => normalizeAmount(row?.amount, "USDT", false),
        meta: {
          hasMobile: true,
        },
      },
      {
        id: "4",
        accessorKey: "type",
        accessorFn: (row: any) => depositTypes(row?.type),
        header: "نوع واریز",
      },
      {
        id: "5",
        accessorKey: "TXID",
        header: "TXID",
        accessorFn: (row: any) => (
          <CopyInput
            text={row?.providerData?.flowWalletAddress}
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
        rowClickFn={(id) => setModal({ isOpen: true, id: id })}
      />
      <Dialog
        isOpen={modal.isOpen}
        onClose={() => setModal({ isOpen: false, id: "" })}
        hasCloseButton
        size="md"
      >
        <TransactionReceipt type="DEPOSIT" transactionID={modal.id} />
      </Dialog>
    </>
  );
}

export default USDTDeposit;
