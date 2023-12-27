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
import Dialog from "components/Dialog";
import { useState } from "react";
import DepositCrypto from "./Deposit";
import WithdrawCrypto from "./Withdraw";

import teter from "assets/img/coins/tether.svg";
import trx from "assets/img/coins/trx.png";

import wallet from "assets/scss/dashboard/wallet.module.scss";
import { useNavigate } from "react-router-dom";
import WithdrawOTP from "components/WithdrawOTP";
import { useResendOtpWithdrawMutation, useVerifyOtpWithdrawMutation } from "store/api/wallet-management";
import { useAppSelector } from "store/hooks";
import toast from "react-hot-toast";

export default function CryptoCard({ USDT, TRX, isLoading, isSuccess }: any) {
  const user = useAppSelector((state) => state.user);

  const navigate = useNavigate();
  const [otpCode, setOtpCode] = useState("");
  const [verifyOtpWithdraw, { isSuccess: isVerifySuccess }] = useVerifyOtpWithdrawMutation()
  const [resendOtpWithdraw, { isSuccess: isResendSuccess }] = useResendOtpWithdrawMutation()
  const [showOtp, setShowOtp] = useState<boolean>(false);
  const [transactionId, setTransactionId] = useState<string>('');
  const [depositForm, setDepositForm] = useState<{
    isOpen: boolean;
    currency: string;
  }>({ isOpen: false, currency: "" });
  const [withdrawForm, setWithdrawForm] = useState<{
    isOpen: boolean;
    currency: string;
    stock: number;
  }>({ isOpen: false, currency: "", stock: 0 });

  const handleSendOtp = async () => {
    if (otpCode.length > 6) return toast.error('لطفا کد را وارد کنید', { position: 'bottom-left' })
    const data = {
      transactionId,
      code: otpCode
    }
    await verifyOtpWithdraw(data).then(() => {
      if (isVerifySuccess) {
        toast.success('برداشت با موفقیت انجام شد', { position: 'bottom-left' })
        setShowOtp(false)
      } else {
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
  return (
    <Card className="mb-4 h-100">
      <CardHeader>
        <CardTitle tag="h5">موجودی ارز دیجیتال</CardTitle>
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
                  <>
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
                    <tr>
                      <th scope="row" className="placeholder-glow">
                        <div className="placeholder col-12 rounded" />
                      </th>
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
                  </>
                ) : isSuccess ? (
                  <>
                    <tr key={0}>
                      <td>
                        <div>
                          <img
                            src={teter}
                            alt=""
                            className={wallet["crypto-img"]}
                          />
                          <span className={wallet["crypto-name"]}>تتر</span>
                        </div>
                      </td>
                      <td className="text-center">
                        {Number(USDT.availableBalance | 0).toLocaleString()}
                      </td>
                      <td className="text-center">
                        <Button
                          color="secondary"
                          className="px-4 py-1"
                          onClick={() => {
                            setDepositForm({
                              isOpen: true,
                              currency: "USDT",
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
                          disabled={USDT.balance <= 0}
                          onClick={() =>
                            setWithdrawForm({
                              isOpen: true,
                              currency: "USDT",
                              stock: USDT.balance,
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
                          disabled={false}
                          onClick={() =>
                            navigate(`/dashboard/buy-sell`, {
                              state: {
                                source: "USDT",
                              },
                            })
                          }
                        >
                          معامله
                        </Button>
                      </td>
                    </tr>
                    {/* <tr key={1}>
                      <td>
                        <div>
                          <img
                            src={trx}
                            alt=""
                            className={wallet["crypto-img"]}
                          />
                          <span className={wallet["crypto-name"]}>ترون</span>
                        </div>
                      </td>
                      <td className="text-center">{Number(TRX.balance | 0)}</td>
                      <td className="text-center">
                        {Number(TRX.availableBalance | 0)}
                      </td>
                      <td className="text-center">
                        <Button
                          color="secondary"
                          className="px-4 py-1"
                          onClick={() => {
                            setDepositForm({
                              isOpen: true,
                              currency: "TRX",
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
                          disabled={TRX.balance <= 0}
                          onClick={() =>
                            setWithdrawForm({
                              isOpen: true,
                              currency: "TRX",
                              stock: TRX.balance,
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
                            navigate(`/dashboard/buy-sell`, {
                              state: {
                                source: "TRX",
                              },
                            })
                          }
                        >
                          معامله
                        </Button>
                      </td>
                    </tr> */}
                  </>
                ) : (
                  <tr>دیتایی موجود نیست</tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </CardBody>
      <Dialog
        title={depositForm.currency === "USDT" ? "واریز تتر" : "واریز ترون"}
        isOpen={depositForm.isOpen}
        onClose={() => setDepositForm({ isOpen: false, currency: "" })}
        hasCloseButton
      >
        <DepositCrypto
          onClose={() => setDepositForm({ isOpen: false, currency: "" })}
          currency={depositForm.currency}
        />
      </Dialog>
      <Dialog
        title={withdrawForm.currency === "USDT" ? "برداشت تتر" : "برداشت ترون"}
        isOpen={withdrawForm.isOpen}
        onClose={() =>
          setWithdrawForm({ isOpen: false, currency: "", stock: 0 })
        }
        hasCloseButton
      >
        <WithdrawCrypto
          setTransactionId={(id) => setTransactionId(id)}
          setShowOtp={()=>{
            setShowOtp(true)
          }}
          onCloseModal={() => setWithdrawForm({ isOpen: false, currency: "", stock: 0 })}
          currency={withdrawForm.currency}
          stock={withdrawForm.stock}
          onClose={() =>
            setWithdrawForm({ isOpen: false, currency: "", stock: 0 })
          }
        />
      </Dialog>
      <Modal isOpen={showOtp} toggle={() => setShowOtp(false)} >
        <WithdrawOTP
          onClose={() => setShowOtp(false)}
          handleSendOtp={handleSendOtp}
          securitySelection={user.otpMethod}
          handleResend={handleReSendOtp}
          handleGetCode={(code) => {
            if (code.length === 6) {
              setOtpCode(code);
              handleSendOtp()
            }
          }}
        />
      </Modal>
    </Card>
  );
}
