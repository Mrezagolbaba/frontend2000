import React from "react";
import { Col, Row } from "reactstrap";

import Deposit from "assets/img/icons/depositIcon.svg";
import Exchange from "assets/img/icons/exchange.svg";
import Market from "assets/img/icons/markets.svg";

import dashboard from "assets/scss/dashboard/dashboard.module.scss";
import { BiSupport } from "react-icons/bi";
import { Link } from "react-router-dom";

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
            <svg
              fill="#000000"
              viewBox="0 0 24 24"
              id="exchange"
              data-name="Line Color"
              xmlns="http://www.w3.org/2000/svg"
              className="icon line-color"
              style={{ width: "50px", height: "30px" }}
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                <polyline
                  id="secondary"
                  points="7 17 4 14 20 14"
                  style={{
                    fill: "none",
                    stroke: "#111BFF",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "2",
                  }}
                />
                <polyline
                  id="primary"
                  points="17 7 20 10 4 10"
                  style={{
                    fill: "none",
                    stroke: "#000000",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "2",
                  }}
                />
              </g>
            </svg>
          </span>
          <div className={dashboard["easy-box__value"]}>خرید و فروش</div>
        </Link>
      </Col>
      <Col xs={6} sm={3} xxl={2}>
        <Link className={dashboard["easy-box"]} to="/dashboard/market">
          <span className="icon">
            <svg
              style={{
                width: "50px",
                height: "30px",
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M22 5.14999V7.85001C22 10.1 21.1 11 18.85 11H16.15C13.9 11 13 10.1 13 7.85001V5.14999C13 2.89999 13.9 2 16.15 2H18.85C21.1 2 22 2.89999 22 5.14999Z"
                  stroke="#292D32"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11 16.15V18.85C11 21.1 10.1 22 7.85 22H5.15C2.9 22 2 21.1 2 18.85V16.15C2 13.9 2.9 13 5.15 13H7.85C10.1 13 11 13.9 11 16.15Z"
                  stroke="#292D32"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17.38 11.0001V13.6201C17.38 16.3101 16.31 17.3801 13.62 17.3801H11V16.1501C11 13.9001 10.1 13.0001 7.85 13.0001H6.62V10.3801C6.62 7.69013 7.69 6.62012 10.38 6.62012H13V7.85013C13 10.1001 13.9 11.0001 16.15 11.0001H17.38Z"
                  stroke="#292D32"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  style={{
                    stroke: "#111BFF",
                  }}
                />
              </g>
            </svg>
          </span>
          <div className={dashboard["easy-box__value"]}>بازارها</div>
        </Link>
      </Col>
      <Col xs={6} sm={3} xxl={2}>
        <Link className={dashboard["easy-box"]} to="/dashboard/wallet">
          <span className="icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                width: "50px",
                height: "30px",
              }}
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M4 13V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V13"
                  stroke="#000000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 3L12 15M12 15L8.5 11.5M12 15L15.5 11.5"
                  stroke="#000000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  style={{
                    stroke: "#111BFF",
                  }}
                />
              </g>
            </svg>
          </span>
          <div className={dashboard["easy-box__value"]}>واریز تتر</div>
        </Link>
      </Col>
      <Col xs={6} xxl={2} className="d-sm-none d-xxl-block">
        <Link className={dashboard["easy-box"]} to="/dashboard/wallet">
          <span className="icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                width: "50px",
                height: "30px",
              }}
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M4 13V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V13"
                  stroke="#000000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 3L12 15M12 15L8.5 11.5M12 15L15.5 11.5"
                  stroke="#000000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  style={{
                    stroke: "#111BFF",
                  }}
                />
              </g>
            </svg>
          </span>
          <div className={dashboard["easy-box__value"]}>واریز تومان</div>
        </Link>
      </Col>
      <Col xs={6} xxl={2} className="d-sm-none d-xxl-block">
        <Link className={dashboard["easy-box"]} to="#">
          <span className="icon">
            <svg
              viewBox="0 0 24 24"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              aria-labelledby="supportIconTitle"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="none"
              color="#000000"
              style={{
                width: "50px",
                height: "30px",
              }}
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                <title id="supportIconTitle">Support</title>
                <path
                  d="M18,9 L16,9 C14.8954305,9 14,9.8954305 14,11 L14,13 C14,14.1045695 14.8954305,15 16,15 L16,15 C17.1045695,15 18,14.1045695 18,13 L18,9 C18,4.02943725 13.9705627,0 9,0 C4.02943725,0 0,4.02943725 0,9 L0,13 C1.3527075e-16,14.1045695 0.8954305,15 2,15 L2,15 C3.1045695,15 4,14.1045695 4,13 L4,11 C4,9.8954305 3.1045695,9 2,9 L0,9"
                  transform="translate(3 3)"
                />
                <path
                  d="M21,14 L21,18 C21,20 20.3333333,21 19,21 C17.6666667,21 16,21 14,21"
                  style={{
                    stroke: "#111BFF",
                  }}
                />
              </g>
            </svg>
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
