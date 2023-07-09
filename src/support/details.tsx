import Layout from "../components/layout/dashboard";

const Support_details = () => {
  return (
    <Layout>
      <section className="page page-support">
        <div className="card card-secondary">
          <div className="card-header card-header-flex">
            <h5 className="card-title">پشتیبانی</h5>
            <div className="card-action">
              <button
                className="btn btn-outline-primary"
                data-bs-toggle="modal"
              >
                بستن تیکت
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="table-responsive mb-4">
                    <table className="table ">
                      <thead>
                        <tr>
                          <th>تاریخ ثبت تیکت</th>
                          <th>تاریخ بروزرسانی تیکت</th>
                          <th>عنوان تیکت</th>
                          <th>موضوع تیکت</th>
                          <th>وضعیت تیکت</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1402/03/30</td>
                          <td>1402/03/31</td>
                          <td>احراز هویت انجام نشده</td>
                          <td>
                            <span>احراز هویت</span>
                          </td>
                          <td>
                            <span className="text-primary">در دست بررسی</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="comment">
                    <div className="comment-body">
                      <p className="comment-text">
                        سلام امیدوارم حالتون خوب باشه، من احراز هویت انجام دادم
                        ولی تکمیل نشده
                      </p>
                      <div className="comment-footer">
                        <span className="comment-meta">بهزاد بابایی</span>
                      </div>
                    </div>
                  </div>
                  <div className="comment">
                    <div className="answer comment-body">
                      <p className="comment-text">
                        سلام وقت شما بخیر. بررسی انجام شد و احراز هویت تکمیل شد
                      </p>
                      <div className="comment-footer">
                        <span className="comment-meta">
                          علی حسینی، اپراتور پشتیبانی
                        </span>
                      </div>
                    </div>
                  </div>

                  <h5 className="mb-30 padding-top-1x">
                    ارسال پاسخ برای این تیکت
                  </h5>
                  <form method="post">
                    <div className="form-group">
                      <textarea
                        className="form-control form-control-rounded"
                        id="review_text"
                        placeholder="پاسخ خود را در این قسمت بنویسید"
                      ></textarea>
                    </div>
                    <div className="text-right mt-4">
                      <button className="btn btn-outline-primary" type="submit">
                        ارسال پاسخ{" "}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>{" "}
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default Support_details;
