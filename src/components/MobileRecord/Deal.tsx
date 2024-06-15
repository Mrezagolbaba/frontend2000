import moment from "jalali-moment";
import style, {
  amount,
  title,
  transaction,
  transaction__counter,
  transaction__data,
  transaction__data__deal,
  transaction__data__detail,
  transaction__data__others,
} from "assets/scss/components/mobileRecord.module.scss";
import { convertText, normalizeAmount } from "helpers";

type Props = {
  record: any;
  id: string | number;
};

const Deal = ({ record, id }: Props) => {
  return (
    <div className={transaction}>
      <div className={`${transaction__counter} ${style.primary}`}>
        <span>{Number(id) + 1}</span>
      </div>
      <div className={transaction__data}>
        <div className={transaction__data__detail}>
          <div
            className={title}
          >{`${convertText(record?.sourceCurrencyCode, "enToFa")} - ${convertText(record?.destinationCurrencyCode, "enToFa")}`}</div>
          <div className={amount}>
            <div>
              <span>کارمزد: </span>
              <span>
                {normalizeAmount(
                  record.transactions.find(
                    (t) => t.currencyCode === record.feeCurrencyCode,
                  )?.fee,
                  record.feeCurrencyCode,
                  true,
                )}
              </span>
            </div>
          </div>
        </div>
        <div className={transaction__data__others}>
          <div>
            <span>تاریخ معامله: </span>
            <span>
              {moment(record.createdAt).locale("fa").format("hh:mm YYYY/MM/DD")}
            </span>
          </div>
        </div>
        <div className={transaction__data__deal}>
          <div>
            <span>پرداخت شده: </span>
            <span>
              {normalizeAmount(
                record.sourceAmount,
                record.sourceCurrencyCode,
                true,
              )}
            </span>
          </div>
          <div>
            <span>دریافت شده: </span>
            <span>
              {normalizeAmount(
                record.destinationAmount,
                record.destinationCurrencyCode,
                true,
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deal;
