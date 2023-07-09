import Layout from "../components/layout/dashboard";

const Support = () => {
    return (
        <Layout>
             <section className="page page-support">
          <div className="card card-secondary">
            <div className="card-header card-header-flex">
              <h5 className="card-title">پشتیبانی</h5>
              <div className="card-action">
                <button className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#newTicketModal">
                  ارسال تیکت
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table-modern table-modern--fonts-md">
                  <thead>
                    <tr>
                      <th scope="col" className="text-center">تاریخ ارسال</th>
                      <th scope="col" className="text-center">عنوان تیکت</th>
                      <th scope="col" className="text-center">وضعیت</th>
                      <th scope="col" className="text-center"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center">
                        <span className="d-ltr d-block">01/06/08 - 11:34</span>
                      </td>
                      <td className="text-center">افزودن حساب بانکی</td>
                      <td className="text-center">
                        <span className="text-success">باز</span>
                      </td>
                      <td className="text-center table-new__actions">
                        <a href="#">مشاهده جزئیات</a>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">
                        <span className="d-ltr d-block">01/06/08 - 11:34</span>
                      </td>
                      <td className="text-center">افزودن حساب بانکی</td>
                      <td className="text-center">
                        <span className="text-danger">بسته</span>
                      </td>
                      <td className="text-center table-new__actions">
                        <a href="#">مشاهده جزئیات</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="modal fade new-ticket-modal" id="newTicketModal"
               aria-labelledby="newTicketModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="newTicketModalLabel">ارسال تیکت</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <p className="modal-text">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
                  </p>
                  <form className="modal-form">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="row mb-2">
                          <label  className="col-lg-3 col-form-label">موضوع:</label>
                          <div className="col-lg-7">
                            <select name="" id="inputTopic" className="bs-select-control bs-form-select">
                              <option value="3" selected disabled>انتخاب کنید</option>
                              <option value="2">اطلاعات هویتی و احراز</option>
                              <option value="1">واریز و برداشت</option>
                              <option value="1">مشکلات فنی</option>
                              <option value="1">مدیریت</option>
                            </select>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <label  className="col-lg-3 col-form-label">عنوان:</label>
                          <div className="col-lg-7">
                            <input type="text" className="form-control" id="inputSubject"
                                   placeholder="عنوان" />
                          </div>
                        </div>
                        <div className="row mb-2">
                          <label  className="col-lg-3 col-form-label">متن:</label>
                          <div className="col-lg-9">
                            <textarea name="" id="inputText"  className="form-control"
                                      placeholder="متن خود را بنویسید"></textarea>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-lg-3"></div>
                          <div className="col-lg-9">
                            <div className="file-picker-control">
                              <label >
                                <span className="icon">
                                  <svg width="16" height="18" viewBox="0 0 16 18" fill="none"
                                       xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M10.2803 1.30176H4.73699C3.02116 1.30176 1.54199 2.69259 1.54199 4.40926V13.3568C1.54199 15.1701 2.92366 16.5959 4.73699 16.5959H11.3937C13.1103 16.5959 14.502 15.0734 14.502 13.3568V5.69842L10.2803 1.30176Z"
                                          stroke="#03041B" strokeWidth="1.5" strokeLinecap="round"
                                          stroke-linejoin="round" />
                                    <path
                                      d="M10.0613 1.29199V3.71616C10.0613 4.89949 11.0188 5.85949 12.2021 5.86199C13.2988 5.86449 14.4213 5.86533 14.4971 5.86033"
                                      stroke="#03041B" strokeWidth="1.5" strokeLinecap="round"
                                      stroke-linejoin="round" />
                                    <path d="M7.7006 6.86719V12.3447" stroke="#03041B" strokeWidth="1.5"
                                          strokeLinecap="round" stroke-linejoin="round" />
                                    <path d="M5.33521 9.24302L7.70021 6.86719L10.066 9.24302" stroke="#03041B"
                                          strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round" />
                                  </svg>
                                </span>
                                ارسال فایل
                              </label>
                              <input type="file" id="inputFile" />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-3"></div>
                          <div className="col-lg-9">
                            <div className="text-center text-md-end">
                              <button type="submit" className="btn btn-outline-primary">ارسال</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        </Layout>
    );
}
export default Support;