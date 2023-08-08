import { Modal } from "antd";
const ModalTeter = (props: any) => {
  return (
    <Modal
      title={null}
      open={props.visible}
      onCancel={props.onCancel}
      footer={null}
      width={800}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="onlineDepositLabel">
              واریز تتر (Tether USDT)
            </h5>
            {/* <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button> */}
          </div>
          <div className="modal-body">
            <p className="modal-text">
              کاربر گرامی موجودی حساب تتر شما بعد از انجام واریز توسط شما و
              تایید شبکه به صورت خودکار در کیف پول شما قابل مشاهده و معامله
              می‌باشد
            </p>
            <div className="alert alert-warning">
              در هنگام واریز به شبکه انتخابی دقت فرمایید در صورت واریز به شبکه
              اشتباه رمز ارز از دست خواهد رفت.
            </div>
            <div className="alert alert-success">
              حداقل واریز 1 USDT می‌باشد، واریز تتر به آرسونیکس هیچ کارمزدی
              ندارد.
            </div>
            <form className="modal-form">
              <div className="row">
                <div className="col-lg-10">
                  <div className="row mb-3">
                    <label className="col-lg-4 col-form-label">شبکه:</label>
                    <div className="col-lg-8">
                      <select
                        name=""
                        id="inputCardNum"
                        className="bs-select-control bs-form-select"
                      >
                        <option value="2">TRC20 (ترون - TRON)</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-lg-4 col-form-label">
                      آدرس کیف پول
                    </label>
                    <div className="col-lg-8 mt-2 mb-4">
                      <button
                        type="button"
                        className="btn-copy d-ltr"
                        data-clipboard-target="#copyTarget1"
                      >
                        <span className="icon">
                          <svg
                            width="19"
                            height="19"
                            viewBox="0 0 19 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_193_5658)">
                              <path
                                d="M15.8062 7.27905H8.82944C7.97318 7.27905 7.27905 7.97318 7.27905 8.82944V15.8062C7.27905 16.6624 7.97318 17.3566 8.82944 17.3566H15.8062C16.6624 17.3566 17.3566 16.6624 17.3566 15.8062V8.82944C17.3566 7.97318 16.6624 7.27905 15.8062 7.27905Z"
                                stroke="#03041B"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M4.17812 11.9303H3.40293C2.99174 11.9303 2.59739 11.767 2.30664 11.4762C2.01588 11.1855 1.85254 10.7911 1.85254 10.3799V3.40317C1.85254 2.99198 2.01588 2.59764 2.30664 2.30688C2.59739 2.01613 2.99174 1.85278 3.40293 1.85278H10.3797C10.7909 1.85278 11.1852 2.01613 11.476 2.30688C11.7667 2.59764 11.9301 2.99198 11.9301 3.40317V4.17836"
                                stroke="#03041B"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_193_5658">
                                <rect
                                  width="18.6047"
                                  height="18.6047"
                                  fill="white"
                                  transform="translate(0.302246 0.302368)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                        <span id="copyTarget1">
                          TTjJzGWnN5jzCZPFyaNyRFWoNN3LVAMYpR
                        </span>
                      </button>
                      <img
                        src="assets/img/qr.png"
                        alt=""
                        className=""
                        style={{ width: "20%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default ModalTeter;
