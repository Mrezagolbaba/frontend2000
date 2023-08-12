import Layout from "layouts/dashboard";

const Notifications = () => {
  return (
    <Layout>
      <section className="page page-notifications">
        <div className="card card-secondary">
          <div className="card-header card-header-flex">
            <h5 className="card-title">پیام های من</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table-modern table-modern--fonts-md">
                <thead>
                  <tr>
                    <th scope="col" className="text-center">
                      عنوان پیام
                    </th>
                    <th scope="col" className="text-center">
                      تاریخ ارسال
                    </th>
                    <th scope="col" className="text-center">
                      وضعیت
                    </th>
                    <th scope="col" className="text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">صدور فاکتور معامله</td>
                    <td className="text-center">
                      <span className="d-ltr d-block">01/06/08 - 11:34</span>
                    </td>
                    <td className="text-center">
                      <span className="text-success">مشاهده شده</span>
                    </td>
                    <td className="text-center table-new__actions">
                      <button
                        type="button"
                        className="btn-simple"
                        data-bs-toggle="modal"
                        data-bs-target="#notificationDetailsModal"
                      >
                        مشاهده جزئیات
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">صدور فاکتور معامله</td>
                    <td className="text-center">
                      <span className="d-ltr d-block">01/06/08 - 11:34</span>
                    </td>
                    <td className="text-center">
                      <span className="text-success">مشاهده شده</span>
                    </td>
                    <td className="text-center table-new__actions">
                      <button
                        type="button"
                        className="btn-simple"
                        data-bs-toggle="modal"
                        data-bs-target="#notificationDetailsModal"
                      >
                        مشاهده جزئیات
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="notificationDetailsModal"
          aria-labelledby="notificationDetailsModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="notificationDetailsModalLabel">
                  صدور فاکتور معامله
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p className="modal-text m-0">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                  با استفاده از طراحان گرافیک است،
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default Notifications;
