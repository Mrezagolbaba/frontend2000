import HeadAuth from "../../../components/layout/headAuth";

const OtpMobile: React.FC = () => {
  return (
    <div className="auth-wrapper" id="root">
      <main className="auth-main">
        <HeadAuth />
        <section className="auth auth-confirmation">
          <div className="card auth-card auth-card--bordered">
            <div className="card-body">
              <h4 className="auth-title">تایید شماره همراه</h4>
              <div className="auth-summary">
                <p className="auth-text text-end">
                  کد تایید ارسال شده به
                  <span className="d-ltr d-inline-block">0912****789</span>
                  را وارد کنید.
                </p>
                <button className="btn-simple auth-resend">ارسال مجدد کد</button>
              </div>

              <form action="" className="auth-form">
                <div className="mb-4">
                  <div className="code-input-control">
                    <input type="number" className="form-control d-ltr control-auto-focus" placeholder="-" />
                    <input type="number" className="form-control d-ltr control-auto-focus" placeholder="-" />
                    <input type="number" className="form-control d-ltr control-auto-focus" placeholder="-" />
                    <input type="number" className="form-control d-ltr control-auto-focus" placeholder="-" />
                    <input type="number" className="form-control d-ltr control-auto-focus" placeholder="-" />
                    <input type="number" className="form-control d-ltr control-auto-focus" placeholder="-" />
                  </div>
                </div>
                <div className="auth-footer">
                  <div className="mb-3">
                    <button type="submit" className="btn btn-primary auth-submit">ثبت نام</button>
                  </div>
                  <div className="auth-edit-mobile text-center">
                    <a href="/register">ویرایش شماره همراه</a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
export default OtpMobile;