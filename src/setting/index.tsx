import Layout from "../components/layout/dashboard";
import { Switch } from 'antd';

const Setting = () => {
  const handleChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
  return (
    <Layout>
      <section className="page page-settings">
        <div className="row g-4">
          <div className="col-xl-7 col-lg-6">
            <div className="card card-secondary security-card">
              <div className="card-header">
                <h5 className="card-title">تنظیمات امنیتی</h5>
              </div>
              <div className="card-body">
                <form action="" className="security-form">
                  <h6>
                    نحوه تایید هویت دو مرحله ای جهت ورود به حساب کاربری و
                    درخواست برداشت
                  </h6>
                  <fieldset>
                    <div className="radio-toggle-control">
                      <input type="radio" name="rtc" id="rtc1" />
                      <label>ایمیل</label>
                    </div>
                    <div className="radio-toggle-control">
                      <input type="radio" name="rtc" id="rtc2" />
                      <label>پیامک</label>
                    </div>
                    <div className="radio-toggle-control">
                      <input type="radio" name="rtc" id="rtc3" />
                      <label> Google Authenticator</label>
                    </div>
                  </fieldset>
                  <div className="alert alert-success">
                    در ابتدا برنامه را از طریق
                    <button type="button" className="btn btn-google">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-google-play"
                        viewBox="0 0 16 16"
                      >
                        <path d="M14.222 9.374c1.037-.61 1.037-2.137 0-2.748L11.528 5.04 8.32 8l3.207 2.96 2.694-1.586Zm-3.595 2.116L7.583 8.68 1.03 14.73c.201 1.029 1.36 1.61 2.303 1.055l7.294-4.295ZM1 13.396V2.603L6.846 8 1 13.396ZM1.03 1.27l6.553 6.05 3.044-2.81L3.333.215C2.39-.341 1.231.24 1.03 1.27Z"></path>
                      </svg>{" "}
                      گوگل پلی{" "}
                    </button>
                    یا
                    <button type="button" className="btn btn-apple">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-apple"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z"></path>
                        <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z"></path>
                      </svg>{" "}
                      پلی استور{" "}
                    </button>
                    دانلود نمایید.
                  </div>
                  <div className="alert alert-success">
                    سپس این عکس{" "}
                    <img
                      src="assets/img/qr.png"
                      alt=""
                      className=""
                      style={{ width: "6%" }}
                    />{" "}
                    را از طریق برنامه Authenticator اسکن کنید یا کد AAAAAAA را
                    در برنامه وارد نمایید.
                  </div>
                  <div className="alert alert-success">
                    حالا برای فعال شدن قابلیت استفاده از Google Authenticator کد
                    6 رقمی نمایش داده شده در برنامه را در فیلد زیر وارد کرده و
                    دکمه تایید را بزنید.
                  </div>
                  <div className="d-flex justify-content-center align-items-center container">
                    <div className="py-5 px-3">
                      <h5 className="m-0">کد تایید Google Authenticator</h5>
                      <div className="d-flex flex-row mt-5">
                        <input type="text" className="form-control" />
                        <input type="text" className="form-control" />
                        <input type="text" className="form-control" />
                        <input type="text" className="form-control" />
                        <input type="text" className="form-control" />
                        <input type="text" className="form-control" />
                      </div>
                      <div className="text-center mt-5">
                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn btn-outline-primary"
                          >
                            ثبت و فعالسازی
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-xl-3 col-lg-5 col-form-label">
                      رمزعبور:
                    </label>
                    <div className="col-xl-6 col-lg-7">
                      <input
                        type="password"
                        className="form-control"
                        id="inputPass1"
                        placeholder="رمز را وارد کنید"
                      />
                    </div>
                  </div>
                  <div className="row mb-4">
                    <label className="col-xl-3 col-lg-5 col-form-label">
                      تکرار رمزعبور:
                    </label>
                    <div className="col-xl-6 col-lg-7">
                      <input
                        type="password"
                        className="form-control"
                        id="inputPass2"
                        placeholder="تکرار رمز عبور"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-outline-primary">
                      ذخیره
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-xl-5 col-lg-6">
            <div className="card card-secondary mb-4">
              <div className="card-header">
                <h5 className="card-title">اطلاع رسانی</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table-modern crypto-balance-table">
                    <thead>
                      <tr>
                        <th scope="col">پیام ها</th>

                        <th scope="col">ایمیل</th>
                        <th scope="col">پیامک</th>
                        <th scope="col" className="text-center"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div>
                            <span className="text-50">واریز تومان و فیات</span>
                          </div>
                        </td>

                        <td className="text-center">
                          <div className="notice__toggle">
                            <Switch
                              // className="switch-toggle"
                              id="cb1"
                              onChange={handleChange}
                            />
                            <label className="switch-toggle-btn"></label>
                          </div>
                        </td>
                        <td className="text-center">
                          <div className="notice__toggle">
                          <Switch
                              // className="switch-toggle"
                              id="cb1"
                              onChange={handleChange}
                            />
                            <label className="switch-toggle-btn"></label>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div>
                            <span className="text-50">برداشت تومان و فیات</span>
                          </div>
                        </td>

                        <td className="text-center">
                          <div className="notice__toggle">
                          <Switch
                              // className="switch-toggle"
                              id="cb1"
                              onChange={handleChange}
                            />
                            <label className="switch-toggle-btn"></label>
                          </div>
                        </td>
                        <td className="text-center">
                          <div className="notice__toggle">
                          <Switch
                              // className="switch-toggle"
                              id="cb1"
                              onChange={handleChange}
                            />
                            <label className="switch-toggle-btn"></label>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div>
                            <span className="text-50">واریز ارز دیجیتال</span>
                          </div>
                        </td>

                        <td className="text-center">
                          <div className="notice__toggle">
                          <Switch
                              // className="switch-toggle"
                              id="cb1"
                              onChange={handleChange}
                            />
                            <label className="switch-toggle-btn"></label>
                          </div>
                        </td>
                        <td className="text-center">
                          <div className="notice__toggle">
                          <Switch
                              // className="switch-toggle"
                              id="cb1"
                              onChange={handleChange}
                            />
                            <label className="switch-toggle-btn"></label>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div>
                            <span className="text-50">برداشت ارز دیجیتال</span>
                          </div>
                        </td>

                        <td className="text-center">
                          <div className="notice__toggle">
                          <Switch
                              // className="switch-toggle"
                              id="cb1"
                              onChange={handleChange}
                            />
                            <label className="switch-toggle-btn"></label>
                          </div>
                        </td>
                        <td className="text-center">
                          <div className="notice__toggle">
                          <Switch
                              // className="switch-toggle"
                              id="cb1"
                              onChange={handleChange}
                            />
                            <label className="switch-toggle-btn"></label>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div>
                            <span className="text-50">ورود به حساب کاربری</span>
                          </div>
                        </td>

                        <td className="text-center">
                          <div className="notice__toggle">
                          <Switch
                              // className="switch-toggle"
                              id="cb1"
                              onChange={handleChange}
                            />
                            <label className="switch-toggle-btn"></label>
                          </div>
                        </td>
                        <td className="text-center">
                          <div className="notice__toggle">
                          <Switch
                              // className="switch-toggle"
                              id="cb1"
                              onChange={handleChange}
                            />
                            <label className="switch-toggle-btn"></label>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div>
                            <span className="text-50">
                              جشنواره&zwnj;ها و بروزرسانی&zwnj;ها
                            </span>
                          </div>
                        </td>

                        <td className="text-center">
                          <div className="notice__toggle">
                          <Switch
                              // className="switch-toggle"
                              id="cb1"
                              onChange={handleChange}
                            />
                            <label className="switch-toggle-btn"></label>
                          </div>
                        </td>
                        <td className="text-center">
                          <div className="notice__toggle">
                          <Switch
                              // className="switch-toggle"
                              id="cb1"
                              onChange={handleChange}
                            />
                            <label className="switch-toggle-btn"></label>
                          </div>
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
  );
};
export default Setting;
