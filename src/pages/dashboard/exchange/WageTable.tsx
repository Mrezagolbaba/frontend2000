import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { CurrencyCode } from "types/wallet";
import { Button, Col, Row, Table } from "reactstrap";
import { convertText, normalizeAmount } from "helpers";
import ExclamationIcon from "components/Icons/ExclamationIcon";
import { motion } from "framer-motion";
import Dialog from "components/Dialog";

import exchange from "assets/scss/dashboard/exchange.module.scss";

type Props = {
  sourceCode: CurrencyCode;
  destinationCode: CurrencyCode;
  data: any;
  feeCurrencyCode: CurrencyCode;
  setFeeCurrencyCode: Dispatch<SetStateAction<CurrencyCode>>;
  isLoading: boolean;
  sourceStock: string;
  wallet: any;
};
export default function WageTable({
  wallet,
  sourceStock,
  data,
  setFeeCurrencyCode,
  isLoading = false,
  sourceCode,
  destinationCode,
  feeCurrencyCode,
}: Props) {
  // ==============|| States ||================= //
  const [feeCost, setFeeCost] = useState<string | null>(null);
  const [feeAmount, setFeeAmount] = useState<string | null>(null);
  const [feeWithDiscount, setFeeWithDiscount] = useState<string | null>(null);
  const [finalAmount, setFinalAmount] = useState<string | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  // ==============|| Handlers ||================= //
  const handleDetails = useCallback(
    (key: 0 | 1) => {
      const targetFee = data?.transactions[key].fees[0];

      if (targetFee.format === "STATIC") {
        const coin = normalizeAmount(
          targetFee?.internalConvertedAmount,
          "USDT",
          true,
        );
        setFeeCost(coin);
      } else {
        const coin = (Number(targetFee.value) * 100).toPrecision(2);
        setFeeCost(`${coin}%`);
      }
      let feeTemp = 0;
      let finalFeeWithDiscount = 0;
      const discount = Number(
        data?.transactions[0].user?.referrerFeeDiscountPercentage,
      );

      if (discount > 0) {
        if (feeCurrencyCode === destinationCode) {
          finalFeeWithDiscount =
            Number(data.transactions[1].fee) -
            (Number(data.transactions[1].fee) * 15) / 100;
          feeTemp = Number(data?.transactions[1].amount) - finalFeeWithDiscount;
        } else {
          finalFeeWithDiscount =
            Number(data.transactions[0].fee) -
            (Number(data.transactions[0].fee) * 15) / 100;
          feeTemp = Number(data?.transactions[1].amount);
        }
      } else {
        if (feeCurrencyCode === destinationCode)
          feeTemp =
            Number(data?.transactions[1]?.amount) -
            Number(data.transactions[1]?.fee);
        else feeTemp = Number(data?.transactions[1]?.amount);
      }
      setFeeAmount(
        normalizeAmount(data?.transactions[key]?.fee, feeCurrencyCode, true),
      );
      discount > 0 &&
        setFeeWithDiscount(
          normalizeAmount(
            finalFeeWithDiscount.toString(),
            feeCurrencyCode,
            true,
          ),
        );
      setFinalAmount(
        normalizeAmount(feeTemp.toString(), destinationCode, true),
      );
    },
    [data, destinationCode, feeCurrencyCode],
  );
  const handleFeeOptions = useCallback(() => {
    if (
      Number(data?.sourceAmount) + Number(data?.transactions[0].fee) >
      Number(sourceStock)
    ) {
      setFeeCurrencyCode(destinationCode);
      return true;
    }
    return false;
  }, [
    data?.sourceAmount,
    data?.transactions,
    destinationCode,
    setFeeCurrencyCode,
    sourceStock,
  ]);

  const findShare = () => {
    const share =
      wallet?.meta?.share && (Object.values(wallet?.meta?.share)?.[0] as any);
    return normalizeAmount(share?.balance, sourceCode, true);
  };

  // ==============|| Life Cycle ||================= //
  useEffect(() => {
    if (data) {
      if (feeCurrencyCode === sourceCode) handleDetails(0);
      else handleDetails(1);
    }
  }, [data, feeCurrencyCode, handleDetails, sourceCode]);

  // ==============|| Render ||================= //
  return (
    <div className={exchange.wage}>
      <Table className={exchange.table}>
        <thead>
          <tr>
            <th scope="col" className="text-center">
              نحوه پرداخت کارمزد
            </th>
            <th scope="col" className="text-center">
              مبلغ کارمزد
            </th>
            <th scope="col" className="text-center">
              مبلغ نهایی دریافت
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td className="text-center">
                <fieldset className="text-center placeholder-glow d-flex justify-content-between">
                  <div className="placeholder col-5 bg-secondary rounded py-2 mx-1" />
                  <div className="placeholder col-5 bg-secondary rounded py-2 mx-1" />
                </fieldset>
              </td>
              <td className="text-center">
                <div className="text-center placeholder-glow d-flex justify-content-between">
                  <div className="placeholder col-12 bg-secondary rounded py-2 mx-1" />
                </div>
              </td>
              <td className="text-center">
                <div className="text-center placeholder-glow d-flex justify-content-between">
                  <div className="placeholder col-12 bg-secondary rounded py-2 mx-1" />
                </div>
              </td>
            </tr>
          ) : (
            <tr>
              <td className="text-center" data-th="نحوه پرداخت کارمزد">
                <fieldset>
                  <div className={exchange["radio-toggle-control"]}>
                    <input
                      type="radio"
                      name="rtc"
                      id="rtc1"
                      disabled={handleFeeOptions()}
                      checked={feeCurrencyCode === sourceCode}
                      onChange={() => setFeeCurrencyCode(sourceCode)}
                    />
                    <label htmlFor="rtc1">
                      {convertText(sourceCode, "enToFa")}
                    </label>
                  </div>

                  <div className={exchange["radio-toggle-control"]}>
                    <input
                      type="radio"
                      name="rtc"
                      id="rtc2"
                      checked={feeCurrencyCode === destinationCode}
                      onChange={() => setFeeCurrencyCode(destinationCode)}
                    />
                    <label htmlFor="rtc2">
                      {convertText(destinationCode, "enToFa")}
                    </label>
                  </div>
                </fieldset>
              </td>
              <td className="text-center d-flex flex-row" data-th="مبلغ کارمزد">
                {data?.transactions[0]?.fees[0]?.type ===
                  "INTERNAL_INDIRECT" && (
                  <motion.div
                    style={{
                      borderRadius: "50%",
                      cursor: "pointer",
                      width: "18px",
                      height: "18px",
                    }}
                    animate={{
                      scale: [1, 1.1, 1.1, 1, 1],
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "easeIn",
                      times: [0, 0.2, 0.8, 1],
                      repeat: Infinity,
                      repeatDelay: 0.5,
                    }}
                    onClick={() => setIsOpenModal(true)}
                  >
                    <ExclamationIcon
                      stroke="#ffc107"
                      fill="none"
                      width={18}
                      height={18}
                    />
                  </motion.div>
                )}
                <div className="mx-2">
                  {!feeCost && "-"}
                  {feeCost && feeCost}
                  {" معادل "}
                  {!feeAmount && "-"}
                  {feeAmount &&
                    (feeWithDiscount ? (
                      <>
                        <s>{feeAmount}</s> {feeWithDiscount}
                      </>
                    ) : (
                      feeAmount
                    ))}
                </div>
              </td>
              <td className="text-center" data-th="مبلغ نهایی دریافت">
                {finalAmount === null ? "-" : finalAmount}
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Dialog
        classNameDialog={exchange.wage__dialog}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        title="توضیحات کارمزد معامله"
      >
        <Row>
          <Col xs={12}>
            <p>
              کاربر گرامی، در نظر داشته باشید امکان تبدیل چندباره دارایی (که یک
              طرف معامله فیات دیجیتال باشد) در آرسونیکس وجود ندارد.
            </p>
            <p
              style={{
                fontWeight: "bold",
              }}
              className="text-center mt-5"
            >
              تا سقف {findShare()} کارمزد معاملاتی شما {feeCost && feeCost} می
              باشد.
            </p>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col xs={12} className="d-flex flex-row justify-content-end">
            <Button color="primary" onClick={() => setIsOpenModal(false)}>
              بستن
            </Button>
          </Col>
        </Row>
      </Dialog>
    </div>
  );
}
