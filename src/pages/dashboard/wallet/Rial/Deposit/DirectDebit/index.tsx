
import { useGetDebitAccountQuery } from "store/api/profile-management";
import AddDebit from "./AddDebit";
import DepositDebit from "./DepositDebit";
import { Col, Row } from "reactstrap";

export default function DirectDebit({ onClose }: { onClose: () => void }) {
  // ==============|| Hooks ||================= //
  const { data, isLoading } = useGetDebitAccountQuery({});

  // ==============|| Render ||================= //
  return isLoading ? (
    <Row className="placeholder-glow">
      <Col xs={12} className="px-2 my-3">
        <div
          className="placeholder rounded"
          style={{ height: "50px", width: "100%" }}
        />
      </Col>
      <Col xs={12} lg={6} className="px-2 my-3">
        <div
          className="placeholder rounded"
          style={{ height: "50px", width: "100%" }}
        />
      </Col>
      <Col xs={12} lg={6} className="px-2 my-3">
        <div
          className="placeholder rounded"
          style={{ height: "50px", width: "100%" }}
        />
      </Col>
    </Row>
  ) : !data || data?.length <= 0 ? (
    <AddDebit />
  ) : (
    <DepositDebit onClose={onClose} data={data} isLoading={isLoading} />
  );
}
