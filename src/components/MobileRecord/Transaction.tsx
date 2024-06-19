import Dialog from "components/Dialog";
import TransactionReceipt from "pages/dashboard/invoice/TransactionReceipt";
import moment from "jalali-moment";
import { Button } from "reactstrap";
import { normalizeAmount, renderStatus } from "helpers";
import { useState } from "react";

import style, {
  amount,
  title,
  transaction,
  transaction__counter,
  transaction__data,
  transaction__data__detail,
  transaction__data__others,
} from "assets/scss/components/mobileRecord.module.scss";

type Props = {
  record: any;
  id: string | number;
};

const Transaction = ({ record, id }: Props) => {
  const [modal, setModal] = useState({ isOpen: false, id: "" });
  return (
    <>
      <div className={transaction}>
        <div
          className={`${transaction__counter} ${style[renderStatus(record.status).badgeName]}`}
        >
          <span>{Number(id) + 1}</span>
        </div>
        <div className={transaction__data}>
          <div className={transaction__data__detail}>
            <div
              className={title}
            >{`${record.type === "DEPOSIT" ? "واریز" : "برداشت"} ${renderStatus(record.status).label}`}</div>
            <div className={amount}>
              <span>
                {normalizeAmount(record.amount, record.currencyCode, true)}
              </span>
            </div>
          </div>
          <div className={transaction__data__others}>
            <div>
              <span>{`تاریخ ${record.type === "DEPOSIT" ? "واریز" : "برداشت"}: `}</span>
              <span>
                {moment(record.createdAt)
                  .locale("fa")
                  .format("hh:mm YYYY/MM/DD")}
              </span>
            </div>
            <div>
              <Button
                outline
                color="primary"
                onClick={() => setModal({ isOpen: true, id: record.id })}
              >
                نمایش جزئیات
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        isOpen={modal.isOpen}
        onClose={() => setModal({ isOpen: false, id: "" })}
        hasCloseButton
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
};

export default Transaction;
