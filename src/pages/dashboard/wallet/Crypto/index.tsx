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

  const [isOpenDepositForm, setIsOpenDepositForm] = useState<boolean>(false);
  const [isOpenWithdrawForm, setIsOpenWithdrawForm] = useState<boolean>(false);

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle tag="h5">موجودی ارز دیجیتال</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col
            xs={12}
            className="d-flex justify-content-evenly align-items-center mb-3"
          >
            <Button
              color="secondary"
              onClick={() => {
                setIsOpenDepositForm(true);
              }}
            >
              واریز
            </Button>
            <Button
              color="secondary"
              onClick={() => setIsOpenWithdrawForm(true)}
            >
              برداشت
            </Button>
            <Button color="primary" outline>
              معامله
            </Button>
          </Col>
          <Col xs={12} className="table-responsive">
            <Table borderless className={wallet["table-view"]}>
              <thead>
                <tr>
                  <th>ارز</th>
                  <th className="text-center">موجودی</th>
                  <th className="text-center"> ارزش تخمینی</th>
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
        isOpen={isOpenDepositForm}
        onClose={() => setIsOpenDepositForm(false)}
        hasCloseButton
      >
        <DepositCrypto onClose={() => setIsOpenDepositForm(false)} />
      </Dialog>
      <Dialog
        title="برداشت ارز دیجیتال"
        isOpen={isOpenWithdrawForm}
        onClose={() => setIsOpenWithdrawForm(false)}
        hasCloseButton
      >
        <WithdrawCrypto
          wallets={data?.data}
          onClose={() => setIsOpenDepositForm(false)}
        />
      </Dialog>
    </Card>
  );
}
