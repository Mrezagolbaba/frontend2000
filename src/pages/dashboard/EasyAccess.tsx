import React from "react";
import { Col, Row } from "reactstrap";

import Deposit from "assets/img/icons/depositIcon.svg";
import Exchange from "assets/img/icons/exchange.svg";
import Market from "assets/img/icons/markets.svg";

import dashboard from "assets/scss/dashboard/dashboard.module.scss";
import { BiSupport } from "react-icons/bi";

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
        <a className={dashboard["easy-box"]} href="/dashboard/buy-sell">
          <img
            src={Exchange}
            style={{
              height: "25px",
              width: "25px",
              background: "#fff",
            }}
          />
          <div className="value">خرید و فروش</div>
        </a>
      </Col>
      <Col xs={6} sm={3} xxl={2}>
        <a className={dashboard["easy-box"]} href="#">
          <img
            src={Market}
            style={{
              height: "25px",
              width: "25px",
              background: "#fff",
            }}
          />
          <div className="value">بازارها</div>
        </a>
      </Col>
      <Col xs={6} sm={3} xxl={2}>
        <a className={dashboard["easy-box"]} href="/dashboard/wallet">
          <img
            src={Deposit}
            style={{
              height: "25px",
              width: "25px",
              background: "#fff",
            }}
          />
          <div className="value">واریز تتر</div>
        </a>
      </Col>
      <Col xs={6} sm={3} xxl={2}>
        <a className={dashboard["easy-box"]} href="/dashboard/wallet">
          <img
            src={Deposit}
            alt=""
            style={{
              height: "25px",
              width: "25px",
              background: "#fff",
            }}
          />
          <div className="value">واریز تومان</div>
        </a>
      </Col>
      <Col xs={6} sm={3} xxl={2}>
        <a className={dashboard["easy-box"]} href="#">
          <BiSupport color="#111BFF" size={25} />
          <div className="value">پشتیبانی</div>
          <div className={`${dashboard["trading"]} ${dashboard["trading-up"]}`}>
            <span>آنلاین</span>
            <i className="os-icon os-icon-arrow-up6"></i>
          </div>
        </a>
      </Col>
    </Row>
  );
}
