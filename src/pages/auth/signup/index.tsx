// import { useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import Logo from "../../../assets/img/logo-arsonex.png";
import InputComponent from "../../../components/Input";
import HeadAuth from "../../../components/layout/headAuth";
import { CiMobile2, CiUser, CiMail, CiLock } from "react-icons/ci";
import { useCreateUser } from "../../../services/auth";
import SelectComponent from "../../../components/Select";
import { countries } from "../../../helpers";
import { toast } from "react-hot-toast";
import { Spin } from 'antd'
import { useNavigate } from "react-router-dom";
import './styles.css'



const SignupPage: React.FC = () => {
  const createUserMutation = useCreateUser();
  const router = useNavigate();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });
  const [countryCode, setCountryCode] = useState<string>('')
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checked === false) return toast.error('لطفا قوانین را مطالعه کنید و تایید کنید')
    setLoading(true)
    try {
      const userData = {
        phoneNumber: countryCode + formData.phoneNumber,
        password: formData.password,
      };
      await createUserMutation.mutateAsync(userData);
      setLoading(false)
      router('/')
    } catch (error: any) {
      console.error('Signup error:', error.message);
      setLoading(false)
    }
  };

  return (
    <div className="auth-wrapper" id="root">
      <main className="auth-main">
        <HeadAuth />
        <section className="auth auth-signup">
          <div className="card auth-card auth-card--bordered">
            <div className="card-body">
              <h4 className="auth-title">ثبت نام</h4>
              <p className="auth-text">  شماره تلفن خود را وارد کنید.</p>

              <form action="" className="auth-form" onSubmit={handleSignup}>
                <div className="mb-2">
                  <div className="row">
                    <div className="col-12 col-md-8" style={{ paddingLeft: '0' }}>
                      <InputComponent
                        type="phone"
                        id="input1"
                        style={{
                          borderTopLeftRadius: 0,
                          borderBottomLeftRadius: 0,
                        }}
                        placeholder="شماره همراه"
                        value={formData.phoneNumber}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            phoneNumber: e.target.value,
                          });
                        }}
                        size={"large"}
                        prefix={<CiUser />}
                      />
                    </div>
                    <div className="col-12 col-md-4" style={{ paddingRight: '0' }}>
                      <SelectComponent
                        id="select1"
                        placeholder="کد"
                        options={countries}
                        size={"large"}
                        handleChange={(val: string) => {
                          setCountryCode(val)
                        }}
                        className="select-component"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-2">
                  <InputComponent
                    type="password"
                    id="input2"
                    placeholder="رمز عبور"
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      });
                    }}
                    size={"large"}
                    prefix={<CiLock />}
                  />
                </div>
                {/* <ul className="auth-checkout mb-4">
                  <li className="passed">
                    <span className="icon">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 0.5C3.86 0.5 0.5 3.86 0.5 8C0.5 12.14 3.86 15.5 8 15.5C12.14 15.5 15.5 12.14 15.5 8C15.5 3.86 12.14 0.5 8 0.5ZM6.5 11.75L2.75 8L3.8075 6.9425L6.5 9.6275L12.1925 3.935L13.25 5L6.5 11.75Z"
                          fill="#03041B"
                          fill-opacity="0.5"
                        />
                      </svg>
                    </span>
                    حداقل ۸ کاراکتر
                  </li>
                  <li className="passed">
                    <span className="icon">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 0.5C3.86 0.5 0.5 3.86 0.5 8C0.5 12.14 3.86 15.5 8 15.5C12.14 15.5 15.5 12.14 15.5 8C15.5 3.86 12.14 0.5 8 0.5ZM6.5 11.75L2.75 8L3.8075 6.9425L6.5 9.6275L12.1925 3.935L13.25 5L6.5 11.75Z"
                          fill="#03041B"
                          fill-opacity="0.5"
                        />
                      </svg>
                    </span>
                    حداقل یک کاراکتر با حرف کوچک
                  </li>
                  <li className="passed">
                    <span className="icon">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 0.5C3.86 0.5 0.5 3.86 0.5 8C0.5 12.14 3.86 15.5 8 15.5C12.14 15.5 15.5 12.14 15.5 8C15.5 3.86 12.14 0.5 8 0.5ZM6.5 11.75L2.75 8L3.8075 6.9425L6.5 9.6275L12.1925 3.935L13.25 5L6.5 11.75Z"
                          fill="#03041B"
                          fill-opacity="0.5"
                        />
                      </svg>
                    </span>
                    حداقل یک کاراکتر با حرف بزرگ
                  </li>
                  <li>
                    <span className="icon">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 0.5C3.86 0.5 0.5 3.86 0.5 8C0.5 12.14 3.86 15.5 8 15.5C12.14 15.5 15.5 12.14 15.5 8C15.5 3.86 12.14 0.5 8 0.5ZM6.5 11.75L2.75 8L3.8075 6.9425L6.5 9.6275L12.1925 3.935L13.25 5L6.5 11.75Z"
                          fill="#03041B"
                          fill-opacity="0.5"
                        />
                      </svg>
                    </span>
                    حداقل یک عدد
                  </li>
                  <li>
                    <span className="icon">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 0.5C3.86 0.5 0.5 3.86 0.5 8C0.5 12.14 3.86 15.5 8 15.5C12.14 15.5 15.5 12.14 15.5 8C15.5 3.86 12.14 0.5 8 0.5ZM6.5 11.75L2.75 8L3.8075 6.9425L6.5 9.6275L12.1925 3.935L13.25 5L6.5 11.75Z"
                          fill="#03041B"
                          fill-opacity="0.5"
                        />
                      </svg>
                    </span>
                    حداقل یک کاراکتر ویژه از قبیل: !@#$%^&*()-+
                  </li>
                </ul> */}
                {/* <div className="auth-referral control-slide mb-3">
                  <button type="button">
                    کد معرف (اختیاری)
                    <span className="icon">
                      <svg
                        width="12"
                        height="6"
                        viewBox="0 0 12 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.827336 0.163933C1.02214 -0.0347736 1.32696 -0.0528378 1.54177 0.10974L1.60331 0.163933L5.99996 4.64894L10.3966 0.163933C10.5914 -0.0347736 10.8962 -0.0528378 11.111 0.10974L11.1726 0.163933C11.3674 0.362639 11.3851 0.673582 11.2257 0.892695L11.1726 0.95547L6.38795 5.83607C6.19315 6.03477 5.88832 6.05284 5.67351 5.89026L5.61197 5.83607L0.827336 0.95547C0.613056 0.736893 0.613056 0.38251 0.827336 0.163933Z"
                          fill="#03041B"
                          fill-opacity="1"
                        />
                      </svg>
                    </span>
                  </button>
                  <div className="control-slide__wrapper">
                    <input
                      type="text"
                      className="form-control control-slide__input"
                      placeholder="کد معرف"
                    />
                  </div>
                </div> */}
                <div className="auth-footer">
                  <div className="auth-terms mb-3">
                    <div className="form-check form-check--lg auth-terms">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="ch1"
                        onChange={
                          (e) => setChecked(e.target.checked)
                        }
                      />
                      <label className="form-check-label">
                        <a href="#"> مقررات آرسونیکس</a>{" "}
                        را خوانده‌ام و با آن موافقم.
                      </label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <button
                      type="submit"
                      className="btn btn-primary auth-submit"
                    >
                      {loading ? <Spin style={{ color: "white" }} /> : 'ثبت نام'}

                    </button>
                  </div>
                  <div className="auth-already">
                    عضو هستم:
                    <a href="/login">ورود</a>
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

export default SignupPage;
