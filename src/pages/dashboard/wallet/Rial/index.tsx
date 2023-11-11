import { useState } from "react";
import { Button, Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import Dialog from "components/Dialog";
import Deposit from "./Deposit";

import wallet from "../style.module.scss";
import Withdraw from "./Withdraw";
import { useList } from "@refinedev/core";

export default function RialCard() {
  const [isOpenDepositForm, setIsOpenDepositForm] = useState<boolean>(false);
  const [isOpenWithdraw, setIsOpenWithdraw] = useState<boolean>(false);

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle tag="h5">موجودی تومانی</CardTitle>
      </CardHeader>
      <CardBody>
        <div className={wallet["balance"]}>
          <div className={wallet["balance__value"]}>
            <strong className="d-inline-block">
              {Number(893548200).toLocaleString("IRR")}
              <small>تومان</small>
            </strong>
          </div>
          <div className={wallet["balance__action"]}>
            <Button
              className={wallet["btn"]}
              type="button"
              color="primary"
              onClick={() => setIsOpenDepositForm(true)}
            >
              واریز تومان
            </Button>
            <Button
              className={wallet["btn"]}
              onClick={() => setIsOpenWithdraw(true)}
              color="primary"
              outline
            >
              برداشت تومان
            </Button>
          </div>
        </div>
      </CardBody>
      <Dialog
        title="واریز تومان"
        isOpen={isOpenDepositForm}
        onClose={() => setIsOpenDepositForm(false)}
        hasCloseButton
      >
        <Deposit />
      </Dialog>
      <Dialog
        title="برداشت تومان"
        isOpen={isOpenWithdraw}
        onClose={() => setIsOpenWithdraw(false)}
        hasCloseButton
      >
        <Withdraw />
      </Dialog>
    </Card>
  );
}
