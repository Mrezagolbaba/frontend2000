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

import teter from "assets/img/coins/tether.png";
import trx from "assets/img/coins/trx.png";

import wallet from "assets/scss/dashboard/wallet.module.scss";

export default function CryptoCard({ USDT, TRX, isLoading, isSuccess }: any) {
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
    <Card className="mb-4">
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
                  <th className="text-center">موجودی</th>
                  <th className="text-center"> ارزش تخمینی</th>
                  <th className="text-center" />
                  <th className="text-center" />
                  <th className="text-center" />
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <>
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
                      <td className="text-center placeholder-glow">
                        <div className="placeholder col-12 rounded" />
                      </td>
                    </tr>
                  </>
                ) : isSuccess ? (
                  <>
                    <tr key={0}>
                      <th scope="row">
                        <div>
                          <img
                            src={teter}
                            alt=""
                            className={wallet["crypto-img"]}
                          />
                          <span className={wallet["crypto-name"]}>تتر</span>
                        </div>
                      </th>
                      <td className="text-center">
                        {Number(USDT.balance | 0)}
                      </td>
                      <td className="text-center">
                        {Number(USDT.availableBalance | 0)}
                      </td>
                      <td className="text-center">
                        <Button
                          color="secondary"
                          className="px-3 py-2"
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
                          className="px-3 py-2"
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
                          className="px-3 py-2"
                          outline
                          disabled={true}
                        >
                          معامله
                        </Button>
                      </td>
                    </tr>
                    <tr key={1}>
                      <th scope="row">
                        <div>
                          <img
                            src={trx}
                            alt=""
                            className={wallet["crypto-img"]}
                          />
                          <span className={wallet["crypto-name"]}>ترون</span>
                        </div>
                      </th>
                      <td className="text-center">{Number(TRX.balance | 0)}</td>
                      <td className="text-center">
                        {Number(TRX.availableBalance | 0)}
                      </td>
                      <td className="text-center">
                        <Button
                          color="secondary"
                          className="px-3 py-2"
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
                          className="px-3 py-2"
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
                          className="px-3 py-2"
                          outline
                          disabled={true}
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
