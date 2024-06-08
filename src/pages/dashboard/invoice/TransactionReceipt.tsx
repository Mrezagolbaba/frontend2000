import style, {
  transaction,
  transaction__field,
  transaction__field__data,
  transaction__field__label,
  transaction__icon,
  transaction__icon__loading,
} from "assets/scss/dashboard/invoice.module.scss";
import { Badge, Col, Row } from "reactstrap";
import { useTransactionQuery } from "store/api/wallet-management";
import moment from "jalali-moment";
import { normalizeAmount, renderStatus } from "helpers";
import CopyInput from "components/Input/CopyInput";
import DownCircleIcon from "components/Icons/DownCircleIcon";

type Props = {
  transactionID: string;
  type: "DEPOSIT" | "WITHDRAW";
};
const TransactionReceipt = ({ transactionID, type }: Props) => {
  // ==============|| Hooks ||================= //
  const { data, isLoading, isFetching } = useTransactionQuery(transactionID);

  // ==============|| handlers ||================= //
  const depositTypes = (flow: any) => {
    switch (flow) {
      case "REDIRECT":
        return "درگاه پرداخت آنلاین";

      case "MANUAL_WITH_WALLET_ADDRESS":
        return "واریز به آدرس ولت";
      case "MANUAL_WITH_PAYMENT_IDENTIFIER":
        return "واریز بین بانکی";
      case "DEBIT":
        return "شارژ سریع";
      default:
        return "";
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
            <DownCircleIcon />
          </Col>
        )}
        <Col xs={12}>
          <h5>واریز لیر</h5>
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
                ? normalizeAmount(data?.amount, data?.currencyCode, false)
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
                ? normalizeAmount(data?.fee, data?.currencyCode, false)
                : " - "}
            </span>
          )}
        </Col>
      </Row>
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
