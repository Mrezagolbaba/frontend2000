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
import { useResendOtpWithdrawMutation, useVerifyOtpWithdrawMutation } from "store/api/wallet-management";
import { TransactionResponse } from "types/wallet";

export default function Fiat({ TRY, isLoading, isSuccess }: any) {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [otpCode, setOtpCode] = useState("");
  const [verifyOtpWithdraw, { isSuccess: isVerifySuccess }] = useVerifyOtpWithdrawMutation()
  const [resendOtpWithdraw, { isSuccess: isResendSuccess }] = useResendOtpWithdrawMutation()
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
  const [transactionId, setTransactionId] = useState<string>('');

  const handleSendOtp = async (data: { code: string }) => {
    if (data.code.length > 6) return toast.error('لطفا کد را وارد کنید', { position: 'bottom-left' })
    const newData = {
      transactionId,
      code: data.code
    }
    await verifyOtpWithdraw(newData).then((res:any) => {
      if (res) {
        handleCloseModal()
        toast.success('برداشت با موفقیت انجام شد', { position: 'bottom-left' })
        window.location.reload()
      } else if(res.id === null) {
        toast.error('کد وارد شده صحیح نمی باشد', { position: 'bottom-left' })
      }
    })
  }

  const handleReSendOtp = async () => {
    await resendOtpWithdraw(transactionId).then(() => {
      if (isResendSuccess) {
        toast.success('کد مجددا ارسال شد', { position: 'bottom-left' })
      }
    })
  }
  const handleCloseModal = () => {
    setShowOtp(false)
  }
  return (
    <Card className="mb-4 h-100">
      <CardHeader>
        <CardTitle tag="h5">موجودی فیات دیجیتال</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col xs={12} className="table-responsive">
            <Table borderless className={wallet["table-view"]}>
              <thead>
                <tr>
                  <th>ارز</th>
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
                      {Number(TRY.availableBalance || 0).toLocaleString()}
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
                        disabled={TRY.balance <= 0}
                        onClick={() =>
                          setWithdrawForm({
                            isOpen: true,
                            currency: "TRY",
                            stock: TRY.availableBalance,
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
                          navigate("/dashboard/buy-sell", {
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
            setShowOtp(true)
          }}
          setTransactionId={(id) => setTransactionId(id)}
          onCloseModal={() => setWithdrawForm({ isOpen: false, currency: "", stock: 0 })}
          open={withdrawForm.isOpen}
          stock={withdrawForm.stock}
          currency={withdrawForm.currency}
          onClose={() =>
            setWithdrawForm({ isOpen: false, currency: "", stock: 0 })
          }
        />
      </Dialog>
      <Modal isOpen={showOtp} toggle={handleCloseModal} >
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
