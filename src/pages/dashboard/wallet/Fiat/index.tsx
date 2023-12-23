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
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Dialog from "components/Dialog";
import DepositFiat from "./Deposit";

import turkeyFlag from "assets/img/icons/flag-turkey.png";

import wallet from "assets/scss/dashboard/wallet.module.scss";
import WithdrawFiat from "./Withdraw";

export default function Fiat({ TRY, isLoading, isSuccess }: any) {
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
        <CardTitle tag="h5">موجودی فیات دیجیتال</CardTitle>
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
                    <td className="text-center placeholder-glow">
                      <div className="placeholder col-12 rounded" />
                    </td>
                  </tr>
                ) : isSuccess ? (
                  <tr key={0}>
                    <td>
                      <div>
                        <img
                          src={turkeyFlag}
                          alt=""
                          className={wallet["crypto-img"]}
                        />
                        <span className={wallet["crypto-name"]}>لیر</span>
                      </div>
                    </td>
                    <td className="text-center">{Number(TRY.balance | 0)}</td>
                    <td className="text-center">
                      {Number(TRY.availableBalance | 0)}
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
                            stock: TRY.balance,
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
          stock={withdrawForm.stock}
          currency={withdrawForm.currency}
          onClose={() =>
            setWithdrawForm({ isOpen: false, currency: "", stock: 0 })
          }
        />
      </Dialog>
    </Card>
  );
}
