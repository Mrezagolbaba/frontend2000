import React, { useEffect } from "react";
import Timer from "./Timer";
import "./style.scss";

export default function ComingSoon() {
  useEffect(() => {
    const preload = document.querySelector(".preloader") as HTMLDivElement;
    preload &&
      setTimeout(() => {
        preload.style.opacity = "0";
        setTimeout(() => {
          preload.style.display = "none";
        }, 1000);
      }, 3000);
  }, []);

  return (
    <div className="coming-wrapper">
      <div className="App">
        <div className="coming-wrapper__container">
          <h1>
            ما در حال
            <br />
            تکمیل پلتفرم هستیم.
          </h1>
          <Timer />
          <div className="optin">
            <p>Want to be the first to know when we launch?</p>
            <button onClick={() => {}}>Click Me</button>
            <div id="modal">
              <div className="wrapper">
                <h3>Enter Your Email</h3>
                <div className="clearfix">
                  <div className="col-8" />
                  <div className="col-3" />
                </div>
              </div>
            </div>
          </div>
          <div className="preloader">
            <div className="spinner_wrap">
              <div className="spinner" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
