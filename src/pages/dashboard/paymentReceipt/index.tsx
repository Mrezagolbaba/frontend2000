import FailedPayment from "components/paymeny/failedPayment";
import SuccessfullPyment from "components/paymeny/successfullPyment";
import useQueryParams from "hooks/useQueryParams";
import { Card, CardBody, Spinner } from "reactstrap";
import { useTransactionStatusQuery } from "store/api/wallet-management";

const PaymentRecipt = () => {
  const query = useQueryParams();
  const id = query.get("id") || "";
  const { data, isLoading, isError } = useTransactionStatusQuery(id);
  return (
    <section className="page page-wallet mt-4 d-flex justify-content-center">
      <Card className="w-100" style={{ minHeight: "300px" }}>
        {isLoading ? (
          <CardBody className="d-flex justify-content-center align-items-center">
            <Spinner color="primary" />
          </CardBody>
        ) : (
          <>
            {data?.status === "SUCCESSFUL" && <SuccessfullPyment data={data} />}
            {(data?.status === "FAILED" ||
              data?.status === "CANCELED" ||
              data?.status === "EXPIRED" ||
              isError) && <FailedPayment data={data} />}
          </>
        )}
      </Card>
    </section>
  );
};
export default PaymentRecipt;
