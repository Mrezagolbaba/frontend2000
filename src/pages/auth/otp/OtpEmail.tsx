const OtpEmail: React.FC = () => {
  return (
    <div className="auth-wrapper" id="root">
      <main className="auth-main">
        <header className="auth-header auth-header--bg">
          <div className="auth-logo">
            <a href="#">
              <img src="assets/img/logo-arsonex.png" alt="" />
            </a>
          </div>
          <div className="auth-gain-confidence">
            <p>از یکسان بودن آدرس صفحه با آدرس زیر مطمئن شوید.</p>
            <div className="d-ltr">
              <span className="icon">
                <svg
                  width="12"
                  height="16"
                  viewBox="0 0 12 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 0.666656L0 3.33332V7.33332C0 11.0333 2.56 14.4933 6 15.3333C9.44 14.4933 12 11.0333 12 7.33332V3.33332L6 0.666656ZM6 7.99332H10.6667C10.3133 10.74 8.48 13.1867 6 13.9533V7.99999H1.33333V4.19999L6 2.12666V7.99332Z"
                    fill="#39D98A"
                  />
                </svg>
              </span>
              <label>
                <span>https://</span>arsonex.com
              </label>
            </div>
          </div>
        </header>

        <section className="auth auth-confirmation">
          <div className="card auth-card auth-card--bordered">
            <div className="card-body">
              <h4 className="auth-title">تایید ایمیل</h4>
              <div className="auth-summary">
                <p className="auth-text text-end">
                  کد تایید ارسال شده به
                  <span className="d-ltr d-inline-block">
                    ex***le@email.com
                  </span>
                  را وارد کنید.
                </p>
                <span className="auth-counter text-start d-ltr">1:48</span>
              </div>

              <form action="" className="auth-form">
                <div className="mb-4">
                  <div className="code-input-control">
                    <input
                      type="number"
                      className="form-control d-ltr control-auto-focus"
                      placeholder="-"
                    />
                    <input
                      type="number"
                      className="form-control d-ltr control-auto-focus"
                      placeholder="-"
                    />
                    <input
                      type="number"
                      className="form-control d-ltr control-auto-focus"
                      placeholder="-"
                    />
                    <input
                      type="number"
                      className="form-control d-ltr control-auto-focus"
                      placeholder="-"
                    />
                    <input
                      type="number"
                      className="form-control d-ltr control-auto-focus"
                      placeholder="-"
                    />
                    <input
                      type="number"
                      className="form-control d-ltr control-auto-focus"
                      placeholder="-"
                    />
                  </div>
                </div>
                <div className="auth-footer">
                  <div className="mb-3">
                    <button
                      type="submit"
                      className="btn btn-primary auth-submit"
                    >
                      ورود
                    </button>
                  </div>
                  <div className="auth-edit-mobile text-center">
                    <a href="#">ویرایش ایمیل</a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
export default OtpEmail;
