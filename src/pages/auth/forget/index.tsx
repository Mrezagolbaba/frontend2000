import { useState } from "react";
import { CiMail, CiMobile2 } from "react-icons/ci";
import InputComponent from "../../../components/Input";
import HeadAuth from "../../../components/layout/headAuth";
import SelectComponent from "../../../components/Select";

const Forget: React.FC = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  return (
    <div className="auth-wrapper" id="root">
      <main className="auth-main">
        <HeadAuth />
        <section className="auth auth-signin">
          <div className="card auth-card">
            <div className="card-body">
              <h4 className="auth-title">فراموشی رمز عبور</h4>
              <p className="auth-text">
                {" "}
                شماره تلفن همراه یا ایمیل خود را وارد کنید
              </p>
              <form action="" className="auth-form" >
                <div className="mb-2">
                  <InputComponent
                    type="email"
                    id="input1"
                    placeholder="ایمیل "
                    value=""
                    onChange={(e) => handleEmail(e)}
                    size="large"
                    prefix={<CiMail />}
                    className="form-control"
                  />
                </div>
                <div className="mb-2">
                  <div className="row">
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Button group with nested dropdown"
                    >
                      <div className="col-lg-8">
                        <InputComponent
                          type="phone"
                          id="input1"
                          placeholder="شماره همراه "
                          value=""
                          onChange={(e) => handleEmail(e)}
                          size="large"
                          prefix={<CiMobile2 />}
                          className="form-control"
                        />
                      </div>
                      <div className="col-lg-4">
                        <SelectComponent
                          id="inputTopic"
                          placeholder="کد کشور"
                          value=""
                          handleChange={(e) => console.log(e)}
                          size="large"
                          options={[]}
                        />
                      </div>
                    </div>{" "}
                  </div>
                </div>{" "}
                <div className="mb-2">
                  <div className="auth-footer">
                    <div className="mb-3">
                      <button
                        type="submit"
                        className="btn btn-primary auth-submit"
                      >
                        ثبت درخواست
                      </button>
                    </div>
                    <div className="auth-already">
                      فراموش نکرده&zwnj;اید:{" "}
                      <a href="/login">ورود به حساب کاربری</a>
                    </div>
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
export default Forget;
