import Layout from "layouts/dashboard";
import { Switch } from "antd";
import {BsApple,BsGooglePlay} from 'react-icons/bs'
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";

const Setting = () => {
  const handleChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
  return (
    <section className="page page-settings">
      <Row>
        <Col xl={6} lg={6}>
          <Card>
            <CardHeader>
              <CardTitle>تنظیمات امنیتی</CardTitle>
            </CardHeader>
            <CardBody>
              <form action="" className="security-form">
                <h6>
                  نحوه تایید هویت دو مرحله ای جهت ورود به حساب کاربری و
                  درخواست برداشت
                </h6>
                <Row>
                  <Col xl={3} lg={3}>
                    <div className="radio-toggle-control">
                      <input type="radio" name="rtc" id="rtc1" />
                      <label>ایمیل</label>
                    </div>
                  </Col>
                  <Col xl={3} lg={3}>
                    <div className="radio-toggle-control">
                      <input type="radio" name="rtc" id="rtc2" />
                      <label>پیامک</label>
                    </div>
                  </Col>
                  <Col xl={6} lg={6}>
                    <div className="radio-toggle-control">
                      <input type="radio" name="rtc" id="rtc3" />
                      <label> Google Authenticator</label>
                    </div>
                  </Col>
                </Row>
                <div className="alert alert-success">
                  در ابتدا برنامه را از طریق
                  <button type="button" className="btn btn-google">
                    <BsGooglePlay/>{" "}
                    گوگل پلی{" "}
                  </button>
                  یا
                  <button type="button" className="btn btn-apple">
                    <BsApple/>{" "}
                    اپل استور{" "}
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
            </CardBody>
          </Card>
        </Col>

        <Col xl={6} lg={6}>
          <Card>
            <CardHeader>
              <CardTitle>اطلاع رسانی</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="table-responsive">
                <table className="table ">
                  <thead>
                    <tr>
                      <th scope="col">پیام ها</th>
                      <th scope="col">ایمیل</th>
                      <th scope="col">پیامک</th>
                      <th scope="col" className="text-center"></th>
                    </tr>
                  </thead>
                  <tbody >
                    <tr>
                      <td >
                        <span className="text-50">واریز تومان و فیات</span>
                      </td>
                      <td className="text-center">
                        <div className="notice__toggle">
                          <Switch
                            id="cb1"
                            onChange={handleChange}
                          />
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="notice__toggle">
                          <Switch
                            // className="switch-toggle"
                            id="cb1"
                            onChange={handleChange}
                          />
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
            </CardBody>
          </Card>
        </Col>
      </Row>
    </section>
  );
};
export default Setting;
