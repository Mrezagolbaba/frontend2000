import { CardBody, Card } from "reactstrap";
import { TransactionResponse } from "types/wallet";

const FailedPayment = ({ data }: any) => {
  return (
      <CardBody className="text-center p-4">
        <h4 className="auth-title mt-4 mb-4">پرداخت ناموفق</h4>
        <div className="text-center mt-4 mb-4">
          <span className="icon">
            <svg
              fill="#ed0202"
              viewBox="0 -8 528 528"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#ed0202"
              style={{ width: "100px", height: "100px" }}
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M264 456Q210 456 164 429 118 402 91 356 64 310 64 256 64 202 91 156 118 110 164 83 210 56 264 56 318 56 364 83 410 110 437 156 464 202 464 256 464 310 437 356 410 402 364 429 318 456 264 456ZM264 288L328 352 360 320 296 256 360 192 328 160 264 224 200 160 168 192 232 256 168 320 200 352 264 288Z"></path>
              </g>
            </svg>
          </span>
        </div>
        <p className="auth-tex mt-4 mb-4" style={{ fontSize: "14px" }}>
          متاسفانه در پرداخت شما با کد رهیگیری: {data?.providerRef} مشکلی به
          وجود آمده است، در صورت کسر مبلغ از حساب بانکی شما تا ۷۲ ساعت کاری به
          صورت خودکار بازگردانده می&zwnj;شود.
        </p>
        <div className="text-center mt-4 mb-4">
          <a href="/dashboard/wallet" className="btn btn-outline-primary mb-2">
            بازگشت به کیف پول
          </a>
        </div>
      </CardBody>
  );
};
export default FailedPayment;
