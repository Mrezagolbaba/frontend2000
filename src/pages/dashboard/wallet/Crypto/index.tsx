import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
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

export default function CryptoCard({ USDT, TRX, isLoading, isSuccess }: any) {
  const navigate = useNavigate();
  const [depositForm, setDepositForm] = useState<{
    isOpen: boolean;
    currency: string;
  }>({ isOpen: false, currency: "" });
  const [withdrawForm, setWithdrawForm] = useState<{
    isOpen: boolean;
    currency: string;
    stock: number;
  }>({ isOpen: false, currency: "", stock: 0 });

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
          currency={withdrawForm.currency}
          stock={withdrawForm.stock}
          onClose={() =>
            setWithdrawForm({ isOpen: false, currency: "", stock: 0 })
          }
        />
      </Dialog>
    </Card>
  );
}
