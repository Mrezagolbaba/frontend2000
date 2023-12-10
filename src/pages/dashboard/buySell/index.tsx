import { useEffect } from "react";
import { useAppSelector } from "store/hooks";
import { Input } from "reactstrap";
import { Skeleton } from "antd";

import ExchangeInput from "components/Input/ExchangeInput";
import { CiWallet } from "react-icons/ci";
import { BsTag } from "react-icons/bs";
import buy from "./styles.module.scss";
import { getCurrencySwap } from "services/exchange";
import { getAllWallets } from "services/wallet";
import { convertIRRToToman, convertText, rialToToman } from "helpers";
import toast from "react-hot-toast";
import { setInvoice } from "store/reducers/features/invoice/invoiceSlice";
import { useNavigate } from "react-router-dom";
import Dialog from "components/Dialog";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";

import { useState } from "react";
import DepositCrypto from "pages/dashboard/wallet/Crypto/Deposit";

import ExchangeContextProvider from "./ContextProvider";
import ExchangeForm from "./ExchangeForm";

export default function BuySell() {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  return (
    <ExchangeContextProvider>
      <section className="page page-wallet">
        <Row className="g-4">
          <Col xxl={7} xs={12}>
            <ExchangeForm setIsOpenDialog={setIsOpenDialog} />
          </Col>
        </Row>
        <Dialog
          title="واریز تتر"
          isOpen={isOpenDialog}
          onClose={() => setIsOpenDialog(false)}
          hasCloseButton
        >
          <DepositCrypto
            onClose={() => setIsOpenDialog(false)}
            currency="USDT"
          />
        </Dialog>
      </section>
    </ExchangeContextProvider>
  );
}
