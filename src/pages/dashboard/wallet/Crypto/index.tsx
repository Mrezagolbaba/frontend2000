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

import teter from "assets/img/coins/tether.png";

import wallet from "pages/dashboard/wallet/style.module.scss";
import { useList } from "@refinedev/core";
import Dialog from "components/Dialog";
import { useState } from "react";
import DepositCrypto from "./Deposit";
import WithdrawCrypto from "./Withdraw";

export default function CryptoCard() {
  const { data, isSuccess, isLoading } = useList({
    resource: "wallets",
  });

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
                    </tr>
                  </>
                ) : isSuccess && data && data.total > 0 ? (
                  data.data.map((item, key) => (
                    <tr key={key}>
                      <th scope="row">
                        <div>
                          <img
                            src={teter}
                            alt=""
                            className={wallet["crypto-img"]}
                          />
                          <span className={wallet["crypto-name"]}>
                            {item.currencyCode}
                          </span>
                        </div>
                      </th>
                      <td className="text-center">{item.balance}</td>
                      <td className="text-center">{item.availableBalance}</td>
                      <td className="text-center">
                        <Button
                          color="secondary"
                          className="px-3 py-2"
                          onClick={() => {
                            setDepositForm({
                              isOpen: true,
                              currency: item.currencyCode,
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
                          onClick={() =>
                            setWithdrawForm({
                              isOpen: true,
                              currency: item.currencyCode,
                              stock: item.balance,
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
                  ))
                ) : (
                  <tr>دیتایی موجود نیست</tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </CardBody>
      <Dialog
        title="واریز ارز دیجیتال"
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
        title="برداشت ارز دیجیتال"
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
