import React from "react";
import { Col, Row } from "reactstrap";

import Deposit from "assets/img/icons/depositIcon.svg";
import Exchange from "assets/img/icons/exchange.svg";
import Market from "assets/img/icons/markets.svg";

import dashboard from "assets/scss/dashboard/dashboard.module.scss";
import { BiSupport } from "react-icons/bi";
import { Link } from "react-router-dom";
import ExchangeIcon from "components/Icons/ExchangeIcon";
import MarketsIcon from "components/Icons/MarketsIcon";
import WalletIcon from "components/Icons/WalletIcon";
import DepositIcon from "components/Icons/DepositIcon";
import SupportIcon from "components/Icons/SupportIcon";

export default function EasyAccess() {
  return (
    <Row className="pt-2">
      <Col
        xs={6}
        sm={3}
        xxl={2}
        className="d-flex justify-content-center align-items-center"
      >
        <h6 className={dashboard["easy-text"]}>
          دسترسی سریع به خدمات آرسونیکس
        </h6>
      </Col>
      <Col xs={6} sm={3} xxl={2}>
        <Link className={dashboard["easy-box"]} to="/dashboard/exchange">
          <span className="icon">
            <ExchangeIcon stroke="none" fill="#000" />
          </span>
          <div className={dashboard["easy-box__value"]}>خرید و فروش</div>
        </Link>
      </Col>
      <Col xs={6} sm={3} xxl={2}>
        <Link className={dashboard["easy-box"]} to="/dashboard/market">
          <span className="icon">
            <MarketsIcon stroke="#000" fill="none" />
          </span>
          <div className={dashboard["easy-box__value"]}>بازارها</div>
        </Link>
      </Col>
      <Col xs={6} sm={3} xxl={2}>
        <Link className={dashboard["easy-box"]} to="/dashboard/wallet">
          <span className="icon">
            <DepositIcon stroke="#000" fill="none" />
          </span>
          <div className={dashboard["easy-box__value"]}>واریز تتر</div>
        </Link>
      </Col>
      <Col xs={6} xxl={2} className="d-sm-none d-xxl-block">
        <Link className={dashboard["easy-box"]} to="/dashboard/wallet">
          <span className="icon">
            <DepositIcon stroke="#000" fill="none" />
          </span>
          <div className={dashboard["easy-box__value"]}>واریز تومان</div>
        </Link>
      </Col>
      <Col xs={6} xxl={2} className="d-sm-none d-xxl-block">
        <Link className={dashboard["easy-box"]} to="/dashboard/support">
          <span className="icon">
            <SupportIcon stroke="#000" fill="none" />
          </span>
          <div className={dashboard["easy-box__value"]}>پشتیبانی</div>
          <div className={`${dashboard["trading"]} ${dashboard["trading-up"]}`}>
            <span>آنلاین</span>
            <i className="os-icon os-icon-arrow-up6"></i>
          </div>
        </Link>
      </Col>
    </Row>
  );
}
