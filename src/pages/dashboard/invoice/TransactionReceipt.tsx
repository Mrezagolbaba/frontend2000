import CloseIcon from "components/Icons/CloseIcon";
import CopyInput from "components/Input/CopyInput";
import DownCircleIcon from "components/Icons/DownCircleIcon";
import UpCircleIcon from "components/Icons/UpCircleIcon";
import moment from "jalali-moment";
import { Badge, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { convertText, normalizeAmount, renderStatus } from "helpers";
import { useTransactionQuery } from "store/api/wallet-management";

import style, {
  transaction,
  transaction__close,
  transaction__field,
  transaction__field__data,
  transaction__field__label,
  transaction__icon,
  transaction__icon__loading,
} from "assets/scss/dashboard/invoice.module.scss";

type Props = {
  transactionID: string;
  type: "DEPOSIT" | "WITHDRAW";
  onClose: () => void;
};
const TransactionReceipt = ({ transactionID, type, onClose }: Props) => {
  // ==============|| Hooks ||================= //
  const { data, isLoading, isFetching } = useTransactionQuery(transactionID);

  // ==============|| handlers ||================= //
  const depositTypes = (flow: any) => {
    switch (flow) {
      case "REDIRECT":
        return "درگاه پرداخت آنلاین";

      case "MANUAL_WITH_WALLET_ADDRESS":
        return "عادی";
      case "MANUAL_WITH_PAYMENT_IDENTIFIER":
        return "واریز بین بانکی";
      case "DEBIT":
        return "شارژ سریع";
      default:
        return "-";
    }
    // REDIRECT: ,
    // MANUAL_WITH_PAYMENT_IDENTIFIER:"",
    // MANUAL_WITH_WALLET_ADDRESS:""
  };
  const showStatus = (status) => {
    const result = renderStatus(status);

    return <Badge color={result.badgeName}>{result.label}</Badge>;
  };

  // ==============|| Render ||================= //
  return (
    <div className={transaction}>
      <Row>
        <Col xs={12}>
          <h3>جزئیات تراکنش</h3>
          <CloseIcon className={transaction__close} onClick={onClose} />
        </Col>
        {isLoading || isFetching ? (
          <Col xs={12} className="placeholder-glow text-center">
            <span className={`${transaction__icon__loading} placeholder`} />
          </Col>
        ) : (
          <Col
            xs={12}
            className={`${transaction__icon} ${data && style[renderStatus(data?.status).badgeName]}`}
          >
            {type === "DEPOSIT" ? <DownCircleIcon /> : <UpCircleIcon />}
          </Col>
        )}
        <Col xs={12}>
          <h5>{`${type === "DEPOSIT" ? "واریز" : "برداشت"} ${convertText(data?.currencyCode, "enToFa")}`}</h5>
        </Col>
      </Row>
      <Row
        className={`${transaction__field} ${isLoading || isFetching ? "placeholder-glow" : ""}`}
      >
        <Col xs={6} className={transaction__field__label}>
          <label>تاریخ</label>
        </Col>
        <Col xs={6} className={transaction__field__data}>
          {isLoading || isFetching ? (
            <span className="placeholder rounded">isLoading...</span>
          ) : (
            <span>
              {moment(data?.createdAt).locale("fa").format("hh:mm YYYY/MM/DD")}
            </span>
          )}
        </Col>
      </Row>
      <Row
        className={`${transaction__field} ${isLoading || isFetching ? "placeholder-glow" : ""}`}
      >
        <Col xs={6} className={transaction__field__label}>
          <label>مقدار</label>
        </Col>
        <Col xs={6} className={transaction__field__data}>
          {isLoading || isFetching ? (
            <span className="placeholder rounded">isLoading...</span>
          ) : (
            <span>
              {data
                ? normalizeAmount(data?.amount, data?.currencyCode, true)
                : " - "}
            </span>
          )}
        </Col>
      </Row>
      <Row
        className={`${transaction__field} ${isLoading || isFetching ? "placeholder-glow" : ""}`}
      >
        <Col xs={6} className={transaction__field__label}>
          <label>کارمزد</label>
        </Col>
        <Col xs={6} className={transaction__field__data}>
          {isLoading || isFetching ? (
            <span className="placeholder rounded">isLoading...</span>
          ) : (
            <span>
              {data
                ? normalizeAmount(data?.fee, data?.currencyCode, true)
                : " - "}
            </span>
          )}
        </Col>
      </Row>
      {type === "WITHDRAW" && (
        <Row
          className={`${transaction__field} ${isLoading || isFetching ? "placeholder-glow" : ""}`}
        >
          <Col xs={6} className={transaction__field__label}>
            <label>مقدار برداشت شده</label>
          </Col>
          <Col xs={6} className={transaction__field__data}>
            {isLoading || isFetching ? (
              <span className="placeholder rounded">isLoading...</span>
            ) : (
              <span>
                {data
                  ? normalizeAmount(
                      (Number(data?.amount) - Number(data?.fee)).toString(),
                      data?.currencyCode,
                      true,
                    )
                  : " - "}
              </span>
            )}
          </Col>
        </Row>
      )}
      {type === "DEPOSIT" && (
        <Row
          className={`${transaction__field} ${isLoading || isFetching ? "placeholder-glow" : ""}`}
        >
          <Col xs={6} className={transaction__field__label}>
            <label>نوع واریز</label>
          </Col>
          <Col xs={6} className={transaction__field__data}>
            {isLoading || isFetching ? (
              <span className="placeholder rounded">isLoading...</span>
            ) : (
              <span>{depositTypes(data?.providerData?.flow)}</span>
            )}
          </Col>
        </Row>
      )}
      {type === "WITHDRAW" &&
        (data?.currencyCode === "IRR" || data?.currencyCode === "TRY") && (
          <Row
            className={`${transaction__field} ${isLoading || isFetching ? "placeholder-glow" : ""}`}
          >
            <Col xs={6} className={transaction__field__label}>
              <label>{data?.currencyCode === "IRR" ? "شبا" : "IBAN"}</label>
            </Col>
            <Col xs={6} className={transaction__field__data}>
              {isLoading || isFetching ? (
                <span className="placeholder rounded">isLoading...</span>
              ) : (
                <span>
                  {" "}
                  {data?.destination ? (
                    <CopyInput hasBox={false} text={data?.destination?.iban} />
                  ) : (
                    "-"
                  )}
                </span>
              )}
            </Col>
          </Row>
        )}
      {data?.currencyCode === "USDT" && (
        <Row
          className={`${transaction__field} ${isLoading || isFetching ? "placeholder-glow" : ""}`}
        >
          <Col xs={6} className={transaction__field__label}>
            <label>TXID</label>
          </Col>
          <Col xs={6} className={transaction__field__data}>
            {isLoading || isFetching ? (
              <span className="placeholder rounded">isLoading...</span>
            ) : (
              <span>
                {" "}
                {data?.providerRef ? (
                  <Link
                    to={`https://tronscan.org/#/transaction/${data.providerRef}`}
                    target="_blank"
                  >
                    لینک تراکنش
                  </Link>
                ) : (
                  "-"
                )}
              </span>
            )}
          </Col>
        </Row>
      )}
      <Row
        className={`${transaction__field} ${isLoading || isFetching ? "placeholder-glow" : ""}`}
      >
        <Col xs={6} className={transaction__field__label}>
          <label>کد رهگیری</label>
        </Col>
        <Col xs={6} className={transaction__field__data}>
          {isLoading || isFetching ? (
            <span className="placeholder rounded">isLoading...</span>
          ) : (
            <span>
              {data ? <CopyInput hasBox={false} text={data?.displayId} /> : "-"}
            </span>
          )}
        </Col>
      </Row>
      <Row
        className={`${transaction__field} ${isLoading || isFetching ? "placeholder-glow" : ""}`}
      >
        <Col xs={6} className={transaction__field__label}>
          <label>وضعیت</label>
        </Col>
        <Col xs={6} className={transaction__field__data}>
          {isLoading || isFetching ? (
            <span className="placeholder rounded">isLoading...</span>
          ) : (
            <span>{data ? showStatus(data.status) : "-"}</span>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default TransactionReceipt;
