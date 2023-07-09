import Layout from "../components/layout/dashboard"

const History = () => {
    return(
        <Layout>
             <section className="page page-history">
          <div className="card card-secondary">
            <div className="card-header">
              <h5 className="card-title">لیست تراکنش‌ها</h5>
            </div>
            <div className="card-body">
              <div className="nav-tabs-wrapper">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="tab1" data-bs-toggle="tab" data-bs-target="#tab-1"
                            type="button" role="tab" aria-controls="tab-1" aria-selected="true">
                      برداشت ریالی
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="tab2" data-bs-toggle="tab" data-bs-target="#tab-2" type="button"
                            role="tab" aria-controls="tab-2" aria-selected="false">
                      برداشت کوین
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="tab3" data-bs-toggle="tab" data-bs-target="#tab-3" type="button"
                            role="tab" aria-controls="tab-3" aria-selected="false">
                      واریز درگاه پرداخت
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="tab4" data-bs-toggle="tab" data-bs-target="#tab-4" type="button"
                            role="tab" aria-controls="tab-4" aria-selected="false">
                      واریز بانکی
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="tab5" data-bs-toggle="tab" data-bs-target="#tab-5" type="button"
                            role="tab" aria-controls="tab-5" aria-selected="false">
                      واریز کوین
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="tab6" data-bs-toggle="tab" data-bs-target="#tab-6" type="button"
                            role="tab" aria-controls="tab-6" aria-selected="false">
                      معاملات خرید
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="tab7" data-bs-toggle="tab" data-bs-target="#tab-7" type="button"
                            role="tab" aria-controls="tab-7" aria-selected="false">
                      معاملات فروش
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="tab8" data-bs-toggle="tab" data-bs-target="#tab-8" type="button"
                            role="tab" aria-controls="tab-8" aria-selected="false">
                      فاکتور معاملات
                    </button>
                  </li>
                </ul>
              </div>
              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="tab-1" role="tabpanel" aria-labelledby="tab1">
                  <div className="table-filters">
                    <div className="table-filter">
                      <select name="" className="bs-select-control bs-select-dropdown">
                        <option value="3">تایید شده</option>
                        <option value="1">تایید شده</option>
                      </select>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="table-modern table-modern--fonts-md">
                      <thead>
                        <tr>
                          <th scope="col" className="text-center">مقدار درخواستی</th>
                          <th scope="col" className="text-center">شماره شبا درخواستی</th>
                          <th scope="col" className="text-center">تاریخ درخواست</th>
                          <th scope="col" className="text-center">وضعیت</th>
                          <th scope="col" className="text-center">شماره پیگیری</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-center">1,234,413</td>
                          <td className="text-center">IR670520000032450456795670</td>
                          <td className="text-center">
                            <span className="d-ltr d-inline-block">01/06/08 - 11:34</span>
                          </td>
                          <td className="text-center">
                            <span className="text-success">تایید شده</span>
                          </td>
                          <td className="text-center">1234556356</td>
                        </tr>
                        <tr>
                          <td className="text-center">1,234,413</td>
                          <td className="text-center">IR670520000032450456795670</td>
                          <td className="text-center">
                            <span className="d-ltr d-inline-block">01/06/08 - 11:34</span>
                          </td>
                          <td className="text-center">
                            <span className="text-success">تایید شده</span>
                          </td>
                          <td className="text-center">1234556356</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="tab-pane fade" id="tab-2" role="tabpanel" aria-labelledby="tab2">
                  <div className="table-filters">
                    <div className="table-filter">
                      <select name="" className="bs-select-control bs-select-dropdown">
                        <option value="3">تایید شده</option>
                        <option value="1">تایید شده</option>
                      </select>
                    </div>
                    <div className="table-filter">
                      <select name="" className="bs-select-control bs-select-dropdown">
                        <option value="3">نوع کوین</option>
                        <option value="1">نوع کوین</option>
                      </select>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="table-modern table-modern--fonts-md">
                      <thead>
                        <tr>
                          <th scope="col" className="text-center">نوع کوین</th>
                          <th scope="col" className="text-center">مقدار درخواستی</th>
                          <th scope="col" className="text-center">کارمزد انتقال</th>
                          <th scope="col" className="text-center">شماره ولت جهت تسویه حساب</th>
                          <th scope="col" className="text-center">تاریخ درخواست</th>
                          <th scope="col" className="text-center">وضعیت</th>
                          <th scope="col" className="text-center">شناسه تراکنش</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-center">بیتکوین</td>
                          <td className="text-center">0.01801534 BTC</td>
                          <td className="text-center">0.0004 BTC</td>
                          <td className="text-center table-new__actions">
                            <a href="#" className="btn-simple">مشاهده جزئیات</a>
                          </td>
                          <td className="text-center">
                            <span className="d-ltr d-block">01/06/08 - 11:34</span>
                          </td>
                          <td className="text-center">
                            <span className="text-success">پرداخت شده</span>
                          </td>
                          <td className="text-center table-new__actions">
                            <a href="#" className="btn-simple">مشاهده جزئیات</a>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-center">بیتکوین</td>
                          <td className="text-center">0.01801534 BTC</td>
                          <td className="text-center">0.0004 BTC</td>
                          <td className="text-center table-new__actions">
                            <a href="#" className="btn-simple">مشاهده جزئیات</a>
                          </td>
                          <td className="text-center">
                            <span className="d-ltr d-block">01/06/08 - 11:34</span>
                          </td>
                          <td className="text-center">
                            <span className="text-success">پرداخت شده</span>
                          </td>
                          <td className="text-center table-new__actions">
                            <a href="#" className="btn-simple">مشاهده جزئیات</a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="tab-pane fade" id="tab-3" role="tabpanel" aria-labelledby="tab3">
                  <div className="table-responsive">
                    <table className="table-modern table-modern--fonts-md">
                      <thead>
                        <tr>
                          <th scope="col" className="text-center">مقدار واریزی (تومان)</th>
                          <th scope="col" className="text-center">شناسه پرداخت</th>
                          <th scope="col" className="text-center">تاریخ پرداخت</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-center">1,000,000</td>
                          <td className="text-center">12323412341234</td>
                          <td className="text-center">
                            <span className="d-ltr d-block">01/06/08 - 11:34</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-center">1,000,000</td>
                          <td className="text-center">12323412341234</td>
                          <td className="text-center">
                            <span className="d-ltr d-block">01/06/08 - 11:34</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="tab-pane fade" id="tab-4" role="tabpanel" aria-labelledby="tab4">
                  <div className="table-filters">
                    <div className="table-filter">
                      <select name="" className="bs-select-control bs-select-dropdown">
                        <option value="3">تایید شده</option>
                        <option value="1">تایید شده</option>
                      </select>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="table-modern table-modern--fonts-md">
                      <thead>
                        <tr>
                          <th scope="col" className="text-center">مقدار واریزی (تومان)</th>
                          <th scope="col" className="text-center">شناسه پرداخت</th>
                          <th scope="col" className="text-center">تاریخ پرداخت</th>
                          <th scope="col" className="text-center">وضعیت پرداخت</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-center">1,000,000</td>
                          <td className="text-center">12323412341234</td>
                          <td className="text-center">
                            <span className="d-ltr d-block">01/06/08 - 11:34</span>
                          </td>
                          <td className="text-center">
                            <span className="text-success">پرداخت شده</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-center">1,000,000</td>
                          <td className="text-center">12323412341234</td>
                          <td className="text-center">
                            <span className="d-ltr d-block">01/06/08 - 11:34</span>
                          </td>
                          <td className="text-center">
                            <span className="text-success">پرداخت شده</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="tab-pane fade" id="tab-5" role="tabpanel" aria-labelledby="tab5">
                  <div className="table-filters">
                    <div className="table-filter">
                      <select name="" className="bs-select-control bs-select-dropdown">
                        <option value="3">تایید شده</option>
                        <option value="1">تایید شده</option>
                      </select>
                    </div>
                    <div className="table-filter">
                      <select name="" className="bs-select-control bs-select-dropdown">
                        <option value="3">نوع کوین</option>
                        <option value="1">نوع کوین</option>
                      </select>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="table-modern table-modern--fonts-md">
                      <thead>
                        <tr>
                          <th scope="col" className="text-center">نوع کوین</th>
                          <th scope="col" className="text-center">مقدار</th>
                          <th scope="col" className="text-center">تعداد تاییدیه ها</th>
                          <th scope="col" className="text-center">شناسه تراکنش</th>
                          <th scope="col" className="text-center">تاریخ تراکنش</th>
                          <th scope="col" className="text-center">وضعیت پرداخت</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-center">بیتکوین</td>
                          <td className="text-center">0.01801534 BTC</td>
                          <td className="text-center">1</td>
                          <td className="text-center table-new__actions">
                            <a href="#" className="btn-simple">مشاهده جزئیات</a>
                          </td>
                          <td className="text-center">
                            <span className="d-ltr d-block">01/06/08 - 11:34</span>
                          </td>
                          <td className="text-center">
                            <span className="text-success">پرداخت شده</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-center">بیتکوین</td>
                          <td className="text-center">0.01801534 BTC</td>
                          <td className="text-center">1</td>
                          <td className="text-center table-new__actions">
                            <a href="#" className="btn-simple">مشاهده جزئیات</a>
                          </td>
                          <td className="text-center">
                            <span className="d-ltr d-block">01/06/08 - 11:34</span>
                          </td>
                          <td className="text-center">
                            <span className="text-success">پرداخت شده</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="tab-pane fade" id="tab-6" role="tabpanel" aria-labelledby="tab6">
                  <div className="table-filters">
                    <div className="table-filter">
                      <select name="" className="bs-select-control bs-select-dropdown">
                        <option value="3">تایید شده</option>
                        <option value="1">تایید شده</option>
                      </select>
                    </div>
                    <div className="table-filter me-2">
                      <button className="btn-simple">خروجی اکسل</button>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="table-modern table-modern--fonts-md">
                      <thead>
                        <tr>
                          <th scope="col" className="text-center">بازار</th>
                          <th scope="col" className="text-center">مقدار</th>
                          <th scope="col" className="text-center">قیمت واحدها</th>
                          <th scope="col" className="text-center">قیمت کل</th>
                          <th scope="col" className="text-center">کارمزد</th>
                          <th scope="col" className="text-center">دریافتی شما</th>
                          <th scope="col" className="text-center">تاریخچه معاملات</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-center">بیتکوین - ریال</td>
                          <td className="text-center">0.01801534 BTC</td>
                          <td className="text-center">234,213,123 تومان</td>
                          <td className="text-center">1,213,123 تومان</td>
                          <td className="text-center">3%</td>
                          <td className="text-center">0.01801534 BTC</td>
                          <td className="text-center">
                            <span className="d-ltr d-block">01/06/08 - 11:34</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-center">بیتکوین - ریال</td>
                          <td className="text-center">0.01801534 BTC</td>
                          <td className="text-center">234,213,123 تومان</td>
                          <td className="text-center">1,213,123 تومان</td>
                          <td className="text-center">3%</td>
                          <td className="text-center">0.01801534 BTC</td>
                          <td className="text-center">
                            <span className="d-ltr d-block">01/06/08 - 11:34</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="tab-pane fade" id="tab-7" role="tabpanel" aria-labelledby="tab7">
                  <div className="table-filters">
                    <div className="table-filter">
                      <select name="" className="bs-select-control bs-select-dropdown">
                        <option value="3">تایید شده</option>
                        <option value="1">تایید شده</option>
                      </select>
                    </div>
                    <div className="table-filter me-2">
                      <button className="btn-simple">خروجی اکسل</button>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="table-modern table-modern--fonts-md">
                      <thead>
                        <tr>
                          <th scope="col" className="text-center">بازار</th>
                          <th scope="col" className="text-center">مقدار</th>
                          <th scope="col" className="text-center">قیمت واحدها</th>
                          <th scope="col" className="text-center">قیمت کل</th>
                          <th scope="col" className="text-center">کارمزد</th>
                          <th scope="col" className="text-center">دریافتی شما</th>
                          <th scope="col" className="text-center">تاریخچه معاملات</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-center">بیتکوین - ریال</td>
                          <td className="text-center">0.01801534 BTC</td>
                          <td className="text-center">234,213,123 تومان</td>
                          <td className="text-center">1,213,123 تومان</td>
                          <td className="text-center">3%</td>
                          <td className="text-center">0.01801534 BTC</td>
                          <td className="text-center">
                            <span className="d-ltr d-block">01/06/08 - 11:34</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-center">بیتکوین - ریال</td>
                          <td className="text-center">0.01801534 BTC</td>
                          <td className="text-center">234,213,123 تومان</td>
                          <td className="text-center">1,213,123 تومان</td>
                          <td className="text-center">3%</td>
                          <td className="text-center">0.01801534 BTC</td>
                          <td className="text-center">
                            <span className="d-ltr d-block">01/06/08 - 11:34</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="tab-pane fade" id="tab-8" role="tabpanel" aria-labelledby="tab8">
                  <div className="table-responsive">
                    <table className="table-modern table-modern--fonts-md">
                      <thead>
                        <tr>
                          <th scope="col" className="text-center">شناسه فاکتور</th>
                          <th scope="col" className="text-center">تاریخ صدور</th>
                          <th scope="col" className="text-center"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-center">123456789</td>
                          <td className="text-center">
                            <span className="d-ltr d-inline-block">01/06/08 - 11:34</span>
                          </td>
                          <td className="text-center">
                            <a href="#" className="btn-simple">مشاهده فاکتور</a>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-center">123456789</td>
                          <td className="text-center">
                            <span className="d-ltr d-inline-block">01/06/08 - 11:34</span>
                          </td>
                          <td className="text-center">
                            <a href="#" className="btn-simple">مشاهده فاکتور</a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        </Layout>
    )   
}
export default History;
    