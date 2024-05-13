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

import wallet from "assets/scss/dashboard/wallet.module.scss";
import { useNavigate } from "react-router-dom";
import WithdrawOTP from "components/WithdrawOTP";
import {
  useResendOtpWithdrawMutation,
  useVerifyOtpWithdrawMutation,
} from "store/api/wallet-management";
import { useAppSelector } from "store/hooks";
import toast from "react-hot-toast";
import { coinShow, persianToEnglishNumbers } from "helpers";

export default function CryptoCard({ USDT, isLoading, isSuccess }: any) {
  // ==============|| States ||================= //
  const [showOtp, setShowOtp] = useState<boolean>(false);
  const [transactionId, setTransactionId] = useState<string>("");

  // ==============|| Hooks ||================= //
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [verifyOtpWithdraw] = useVerifyOtpWithdrawMutation();
  const [resendOtpWithdraw, { isSuccess: isResendSuccess }] =
    useResendOtpWithdrawMutation();
  const [depositForm, setDepositForm] = useState<{
    isOpen: boolean;
    currency: string;
  }>({ isOpen: false, currency: "" });
  const [withdrawForm, setWithdrawForm] = useState<{
    isOpen: boolean;
    currency: string;
    stock: number;
  }>({ isOpen: false, currency: "", stock: 0 });

  // ==============|| Handlers ||================= //
  const handleCloseModal = () => {
    setShowOtp(false);
  };
  const handleSendOtp = async (data: { code: string }) => {
    if (data.code.length > 6)
      return toast.error("لطفا کد را وارد کنید", { position: "bottom-left" });
    const newData = {
      transactionId,
      code: persianToEnglishNumbers(data.code),
    };
    await verifyOtpWithdraw(newData).then((res: any) => {
      if (res) {
        handleCloseModal();
        toast.success("برداشت با موفقیت انجام شد", { position: "bottom-left" });
        // window.location.reload();
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
        <CardTitle tag="h5">موجودی ارز دیجیتال</CardTitle>
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
                  <>
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
                    <tr>
                      <td className="placeholder-glow">
                        <div className="placeholder col-12 rounded" />
                      </td>
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
                        <div className="d-flex">
                          <img
                            src={teter}
                            alt=""
                            className={wallet["crypto-img"]}
                          />
                          <span className={wallet["crypto-name"]}>تتر</span>
                        </div>
                      </td>
                      <td className="text-center">{coinShow(USDT.balance)}</td>
                      <td className="text-center">
                        {coinShow(USDT.availableBalance)}
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
                            navigate(`/dashboard/exchange`, {
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
                  </>
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
              <span className={wallet["crypto-name"]}>تتر</span>
              <img src={teter} alt="" className={wallet["crypto-img"]} />
            </div>
          </Col>
          <Col xs={12} sm={6} className="text-center my-3">
            موجودی: {coinShow(USDT.balance)}
          </Col>

          <Col xs={12} sm={6} className="text-center my-3">
            موجودی در دسترس: {coinShow(USDT.availableBalance)}
          </Col>
          <Col xs={12} sm={4} className="text-center my-3">
            <Button
              color="secondary"
              className="py-3"
              onClick={() => {
                setDepositForm({
                  isOpen: true,
                  currency: "USDT",
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
          </Col>
          <Col xs={12} sm={4} className="text-center my-3">
            <Button
              color="primary"
              className="py-3"
              outline
              disabled={false}
              onClick={() =>
                navigate(`/dashboard/exchange`, {
                  state: {
                    source: "USDT",
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
          setShowOtp={() => {
            setShowOtp(true);
          }}
          onCloseModal={() =>
            setWithdrawForm({ isOpen: false, currency: "", stock: 0 })
          }
          currency={withdrawForm.currency}
          stock={withdrawForm.stock}
          onClose={() =>
            setWithdrawForm({ isOpen: false, currency: "", stock: 0 })
          }
        />
      </Dialog>
      <Modal isOpen={showOtp} toggle={handleCloseModal}>
        <WithdrawOTP
          title="تایید برداشت"
          onClose={handleCloseModal}
          securitySelection={user.otpMethod}
          handleResend={handleReSendOtp}
          handleGetCode={handleSendOtp}
        />
      </Modal>
    </Card>
  );
}
