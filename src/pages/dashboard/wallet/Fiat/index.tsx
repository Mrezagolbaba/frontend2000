import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Modal,
  Row,
  Table,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Dialog from "components/Dialog";
import DepositFiat from "./Deposit";

import lirFlag from "assets/img/coins/lira.png";

import wallet from "assets/scss/dashboard/wallet.module.scss";
import WithdrawFiat from "./Withdraw";
import WithdrawOTP from "components/WithdrawOTP";
import { useAppSelector } from "store/hooks";
import toast from "react-hot-toast";
import {
  useResendOtpWithdrawMutation,
  useVerifyOtpWithdrawMutation,
} from "store/api/wallet-management";
import { InitiateCurrency } from "types/wallet";
import { lirShow } from "helpers";

interface FiatProps {
  TRY: InitiateCurrency;
  isLoading: boolean;
  isSuccess: boolean;
}

export default function Fiat({ TRY, isLoading, isSuccess }: FiatProps) {
  // ==============|| States ||================= //
  const [depositForm, setDepositForm] = useState<{
    isOpen: boolean;
    currency: string;
  }>({ isOpen: false, currency: "" });
  const [withdrawForm, setWithdrawForm] = useState<{
    isOpen: boolean;
    currency: string;
    stock: number;
  }>({ isOpen: false, currency: "", stock: 0 });
  const [showOtp, setShowOtp] = useState<boolean>(false);
  const [transactionId, setTransactionId] = useState<string>("");

  // ==============|| Hooks ||================= //
  const navigate = useNavigate();
  const [resendOtpWithdraw, { isSuccess: isResendSuccess }] =
  useResendOtpWithdrawMutation();
  const [verifyOtpWithdraw] = useVerifyOtpWithdrawMutation();
  const user = useAppSelector((state) => state.user);

  // ==============|| Handlers ||================= //
  const handleCloseModal = () => {
    setShowOtp(false);
  };
  const handleSendOtp = async (data: { code: string }) => {
    if (data.code.length > 6)
      return toast.error("لطفا کد را وارد کنید", { position: "bottom-left" });
    const newData = {
      transactionId,
      code: data.code,
    };
    await verifyOtpWithdraw(newData).then((res: any) => {
      if (res) {
        handleCloseModal();
        toast.success("برداشت با موفقیت انجام شد", { position: "bottom-left" });
        window.location.reload();
      }
    });
  };
  const handleReSendOtp = async () => {
    await resendOtpWithdraw(transactionId).then(() => {
      if (isResendSuccess) {
        toast.success("کد مجددا ارسال شد", { position: "bottom-left" });
      }
    });
  };

  // ==============|| Render ||================= //
  return (
    <Card className="mb-4 h-100">
      <CardHeader>
        <CardTitle tag="h5">موجودی فیات دیجیتال</CardTitle>
      </CardHeader>
      <CardBody>
        <Row className={wallet["desktop-view"]}>
          <Col xs={12} className="table-responsive">
            <Table borderless className={wallet["table-view"]}>
              <thead>
                <tr>
                  <th>ارز</th>
                  <th className="text-center">موجودی</th>
                  <th className="text-center">موجودی در دسترس</th>
                  <th className="text-center" />
                  <th className="text-center" />
                  <th className="text-center" />
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td className="placeholder-glow">
                      <div className="placeholder col-12 rounded" />
                    </td>
                    <td className="placeholder-glow">
                      <div className="placeholder col-12 rounded" />
                    </td>
                    <td className="text-center placeholder-glow">
                      <div className="placeholder col-12 rounded" />
                    </td>
                    <td className="text-center placeholder-glow">
                      <div className="placeholder col-12 rounded" />
                    </td>
                    <td className="text-center placeholder-glow">
                      <div className="placeholder col-12 rounded" />
                    </td>
                    <td className="text-center placeholder-glow">
                      <div className="placeholder col-12 rounded" />
                    </td>
                  </tr>
                ) : isSuccess ? (
                  <tr key={0}>
                    <td>
                      <div>
                        <img
                          src={lirFlag}
                          alt=""
                          className={wallet["crypto-img"]}
                        />
                        <span className={wallet["crypto-name"]}>لیر</span>
                      </div>
                    </td>
                    <td className="text-center">
                      {lirShow({ value: TRY.balance })}
                    </td>
                    <td className="text-center">
                      {lirShow({ value: TRY.availableBalance })}
                    </td>
                    <td className="text-center">
                      <Button
                        color="secondary"
                        className="px-4 py-1"
                        onClick={() => {
                          setDepositForm({
                            isOpen: true,
                            currency: "TRY",
                          });
                        }}
                      >
                        واریز
                      </Button>
                    </td>
                    <td className="text-center">
                      <Button
                        color="secondary"
                        className="px-4 py-1"
                        disabled={Number(TRY.balance) <= 0}
                        onClick={() =>
                          setWithdrawForm({
                            isOpen: true,
                            currency: "TRY",
                            stock: Number(TRY.availableBalance),
                          })
                        }
                      >
                        برداشت
                      </Button>
                    </td>
                    <td className="text-center">
                      <Button
                        color="primary"
                        className="px-4 py-1"
                        outline
                        onClick={() =>
                          navigate("/dashboard/exchange", {
                            state: {
                              source: "TRY",
                            },
                          })
                        }
                      >
                        معامله
                      </Button>
                    </td>
                  </tr>
                ) : (
                  <tr>دیتایی موجود نیست</tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className={wallet["mobile-view"]}>
          <Col xs={12}>
            <div className="d-flex flex-column">
              <span className={wallet["crypto-name"]}>لیر</span>
              <img src={lirFlag} alt="" className={wallet["crypto-img"]} />
            </div>
          </Col>
          <Col xs={12} sm={6} className="text-center my-3">
            موجودی: {lirShow({ value: TRY.balance })}
          </Col>

          <Col xs={12} sm={6} className="text-center my-3">
            موجودی در دسترس:
            {lirShow({ value: TRY.availableBalance })}
          </Col>
          <Col xs={12} sm={4} className="text-center my-3">
            <Button
              color="secondary"
              className="px-5 py-3"
              onClick={() => {
                setDepositForm({
                  isOpen: true,
                  currency: "TRY",
                });
              }}
            >
              واریز
            </Button>
          </Col>
          <Col xs={12} sm={4} className="text-center my-3">
            <Button
              color="secondary"
              className="py-3"
              disabled={Number(TRY.balance) <= 0}
              onClick={() =>
                setWithdrawForm({
                  isOpen: true,
                  currency: "TRY",
                  stock: Number(TRY.availableBalance),
                })
              }
            >
              برداشت
            </Button>
          </Col>
          <Col xs={12} sm={4} className="text-center my-3">
            <Button
              color="primary"
              className="px-5 py-3"
              outline
              disabled={false}
              onClick={() =>
                navigate("/dashboard/exchange", {
                  state: {
                    source: "TRY",
                  },
                })
              }
            >
              معامله
            </Button>
          </Col>
        </Row>
      </CardBody>
      <Dialog
        title="واریز لیر"
        isOpen={depositForm.isOpen}
        onClose={() => setDepositForm({ isOpen: false, currency: "" })}
        hasCloseButton
      >
        <DepositFiat
          onClose={() => setDepositForm({ isOpen: false, currency: "" })}
        />
      </Dialog>
      <Dialog
        title="برداشت لیر"
        isOpen={withdrawForm.isOpen}
        onClose={() =>
          setWithdrawForm({ isOpen: false, currency: "", stock: 0 })
        }
        hasCloseButton
      >
        <WithdrawFiat
          setShowOtp={() => {
            setShowOtp(true);
          }}
          setTransactionId={(id) => setTransactionId(id)}
          onCloseModal={() =>
            setWithdrawForm({ isOpen: false, currency: "", stock: 0 })
          }
          open={withdrawForm.isOpen}
          stock={withdrawForm.stock}
          currency={withdrawForm.currency}
          onClose={() =>
            setWithdrawForm({ isOpen: false, currency: "", stock: 0 })
          }
        />
      </Dialog>
      <Modal isOpen={showOtp} toggle={handleCloseModal}>
        <WithdrawOTP
          onClose={handleCloseModal}
          securitySelection={user.otpMethod}
          handleResend={handleReSendOtp}
          handleGetCode={handleSendOtp}
        />
      </Modal>
    </Card>
  );
}
