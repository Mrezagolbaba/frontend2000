import {
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
  const { data, isSuccess, isError, isLoading } = useList({
    resource: "transactions",
  });

  const [isOpenDepositForm, setIsOpenDepositForm] = useState<boolean>(false);
  const [isOpenWithdrawForm, setIsOpenWithdrawForm] = useState<boolean>(false);

  return (
    <Card className="custom-card card-secondary mb-4">
      <CardHeader>
        <CardTitle tag="h5">موجودی ارز دیجیتال</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col xs={6} className="table-responsive">
            <Table borderless className={wallet["table-view"]}>
              <thead>
                <tr>
                  <th>ارز</th>
                  <th className="text-center">موجودی</th>
                  <th className="text-center"> ارزش تخمینی</th>
                </tr>
              </thead>
              <tbody>
                {data && data.length > 0 ? (
                  <tr>
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
                    <td className="text-center">54.32</td>
                    <td className="text-center">17,232.32</td>
                  </tr>
                ) : (
                  <tr>دیتایی موجود نیست</tr>
                )}
              </tbody>
            </Table>
          </Col>
          <Col
            xs={6}
            className="d-flex justify-content-evenly align-items-center"
          >
            <button
              type="button"
              className={`btn ${wallet["silver-button"]}`}
              onClick={() => {
                setIsOpenDepositForm(true);
              }}
            >
              واریز
            </button>
            <button
              type="button"
              className={`btn ${wallet["silver-button"]}`}
              onClick={() => setIsOpenWithdrawForm(true)}
            >
              برداشت
            </button>
            <button
              type="button"
              className={`btn ${wallet["transaction-button"]}`}
            >
              معامله
            </button>
          </Col>
        </Row>
      </CardBody>
      <Dialog
        title="واریز ارز دیجیتال"
        isOpen={isOpenDepositForm}
        onClose={() => setIsOpenDepositForm(false)}
        hasCloseButton
      >
        <DepositCrypto />
      </Dialog>
      <Dialog
        title="برداشت ارز دیجیتال"
        isOpen={isOpenWithdrawForm}
        onClose={() => setIsOpenWithdrawForm(false)}
        hasCloseButton
      >
        <WithdrawCrypto />
      </Dialog>
    </Card>
  );
}
