import React from "react";
import { Link } from "react-router-dom";

const BottomBanner = () => {
  return (
    <section className="landing-crypto-banner">
      <div className="container">
        <div className="crypto-banner">
          <h2 className="crypto-banner-title">
            هر جای دنیا هستی ریال برات تبدیل به ارز دلخواهت می&zwnj;کنیم
          </h2>
          <Link to="#" className="btn btn-white">
           شروع کنید
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BottomBanner;
