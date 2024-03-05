import { convertIRRToToman } from "helpers";
import { Card, CardBody } from "reactstrap";
import { TransactionResponse } from "types/wallet";

const SuccessfullPyment = ({ data }: any) => {
  const refineNumber = (num: number) => {
    const value = data.currencyCode === "IRR" ? convertIRRToToman(num) : num;
    return value;
  };
  return (
    <CardBody className="text-center p-4">
      <h4 className="auth-title mt-4 mb-4">پرداخت موفق</h4>
      <div className="text-center mb-4 mt-4">
        <span className="icon">
          <svg
            viewBox="0 0 512 512"
            version="1.1"
            fill="#18ff14"
            stroke="#18ff14"
            style={{ width: "100px", height: "100px" }}
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <title>success-filled</title>
              <g
                id="Page-1"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <g
                  id="add-copy-2"
                  fill="#008521"
                  transform="translate(42.666667, 42.666667)"
                >
                  <path
                    d="M213.333333,3.55271368e-14 C95.51296,3.55271368e-14 3.55271368e-14,95.51296 3.55271368e-14,213.333333 C3.55271368e-14,331.153707 95.51296,426.666667 213.333333,426.666667 C331.153707,426.666667 426.666667,331.153707 426.666667,213.333333 C426.666667,95.51296 331.153707,3.55271368e-14 213.333333,3.55271368e-14 Z M293.669333,137.114453 L323.835947,167.281067 L192,299.66912 L112.916693,220.585813 L143.083307,190.4192 L192,239.335893 L293.669333,137.114453 Z"
                    id="Shape"
                  ></path>
                </g>
              </g>
            </g>
          </svg>
        </span>
      </div>
      <p className="auth-text mb-4 mt-4" style={{ fontSize: "14px" }}>
        مبلغ {refineNumber(data?.walletBalanceChange)} تومان به کیف پول شما با
        کد رهگیری: {data?.providerRef} واریز شد.
      </p>
      <div className="text-center ">
        <a href="/dashboard/wallet" className="btn btn-outline-primary mb-2">
          بازگشت به کیف پول
        </a>
      </div>
    </CardBody>
  );
};
export default SuccessfullPyment;
