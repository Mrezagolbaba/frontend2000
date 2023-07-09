import { useNavigate } from "react-router-dom";
import Logo from "../../assets/img/logo-arsonex.png";
const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="auth-wrapper" id="root">
    <main className="auth-main">
      <header className="auth-header auth-header--bg">
        <div className="auth-logo">
          <a href="#">
            <img src={Logo} alt="" />
          </a>
        </div>
        <div className="auth-gain-confidence">
          <p>از یکسان بودن آدرس صفحه با آدرس زیر مطمئن شوید.</p>
          <div className="d-ltr">
            <span className="icon">
              <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6 0.666656L0 3.33332V7.33332C0 11.0333 2.56 14.4933 6 15.3333C9.44 14.4933 12 11.0333 12 7.33332V3.33332L6 0.666656ZM6 7.99332H10.6667C10.3133 10.74 8.48 13.1867 6 13.9533V7.99999H1.33333V4.19999L6 2.12666V7.99332Z"
                  fill="#39D98A" />
              </svg>
            </span>
            <label>
              <span>https://</span>arsonex.com
            </label>
          </div>
        </div>
      </header>

      <section className="auth auth-signup">
        <div className="card auth-card auth-card--bordered">
          <div className="card-body">
            <h4 className="auth-title">ثبت نام</h4>
            <p className="auth-text">ایمیل یا شماره تلفن خود را وارد کنید.</p>

            <form action="" className="auth-form">
              <div className="mb-2">
                <div className="float-control float-control-icon">
                  <input type="email" className="form-control" id="input1" placeholder="ایمیل / شماره همراه" />
                  <label  className="float-control-label">ایمیل / شماره همراه</label>
                  <span className="icon">
                    <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <ellipse cx="7.64917" cy="5.06568" rx="3.98169" ry="3.98169" stroke="#03041B"
                               stroke-opacity="0.4" strokeWidth="1.5" strokeLinecap="round"
                               stroke-linejoin="round" />
                      <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M1.33339 14.5856C1.33232 14.3057 1.39492 14.0292 1.51645 13.7771C1.89784 13.0143 2.97336 12.61 3.86581 12.4269C4.50944 12.2896 5.16196 12.1978 5.81851 12.1523C7.03407 12.0456 8.25665 12.0456 9.47221 12.1523C10.1287 12.1984 10.7812 12.2901 11.4249 12.4269C12.3174 12.61 13.3929 12.9761 13.7743 13.7771C14.0187 14.2911 14.0187 14.8878 13.7743 15.4018C13.3929 16.2027 12.3174 16.5688 11.4249 16.7443C10.782 16.8873 10.1293 16.9816 9.47221 17.0265C8.48285 17.1104 7.48886 17.1257 6.49739 17.0723C6.26855 17.0723 6.04735 17.0723 5.81851 17.0265C5.1639 16.9822 4.51364 16.8878 3.87343 16.7443C2.97336 16.5688 1.90547 16.2027 1.51645 15.4018C1.39554 15.1467 1.333 14.8679 1.33339 14.5856Z"
                            stroke="#03041B" stroke-opacity="0.4" strokeWidth="1.5" strokeLinecap="round"
                            stroke-linejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
              <div className="mb-2">
                <div className="float-control float-control-icon password-control strenghtify-control">
                  <input type="password" className="form-control strengthify" id="input2" placeholder="رمز عبور" />
                  <label  className="float-control-label">رمز عبور</label>
                  <span className="icon">
                    <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M11.6862 6.87272V5.08355C11.6862 2.98939 9.98783 1.29105 7.89366 1.29105C5.79949 1.28189 4.09449 2.97189 4.08533 5.06689V5.08355V6.87272"
                        stroke="#03041B" stroke-opacity="0.4" strokeWidth="1.5" strokeLinecap="round"
                        stroke-linejoin="round" />
                      <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M11.0694 16.7067H4.70187C2.95687 16.7067 1.54187 15.2925 1.54187 13.5467V9.9725C1.54187 8.22667 2.95687 6.8125 4.70187 6.8125H11.0694C12.8144 6.8125 14.2294 8.22667 14.2294 9.9725V13.5467C14.2294 15.2925 12.8144 16.7067 11.0694 16.7067Z"
                            stroke="#03041B" stroke-opacity="0.4" strokeWidth="1.5" strokeLinecap="round"
                            stroke-linejoin="round" />
                      <path d="M7.88578 10.8359V12.6868" stroke="#03041B" stroke-opacity="0.4" strokeWidth="1.5"
                            strokeLinecap="round" stroke-linejoin="round" />
                    </svg>
                  </span>
                  <button type="button" className="password-control-btn"></button>
                </div>
              </div>
              <ul className="auth-checkout mb-4">
                <li className="passed">
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8 0.5C3.86 0.5 0.5 3.86 0.5 8C0.5 12.14 3.86 15.5 8 15.5C12.14 15.5 15.5 12.14 15.5 8C15.5 3.86 12.14 0.5 8 0.5ZM6.5 11.75L2.75 8L3.8075 6.9425L6.5 9.6275L12.1925 3.935L13.25 5L6.5 11.75Z"
                        fill="#03041B" fill-opacity="0.5" />
                    </svg>
                  </span>
                  حداقل ۸ کاراکتر
                </li>
                <li className="passed">
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8 0.5C3.86 0.5 0.5 3.86 0.5 8C0.5 12.14 3.86 15.5 8 15.5C12.14 15.5 15.5 12.14 15.5 8C15.5 3.86 12.14 0.5 8 0.5ZM6.5 11.75L2.75 8L3.8075 6.9425L6.5 9.6275L12.1925 3.935L13.25 5L6.5 11.75Z"
                        fill="#03041B" fill-opacity="0.5" />
                    </svg>
                  </span>
                  حداقل یک کاراکتر با حرف کوچک
                </li>
                <li className="passed">
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8 0.5C3.86 0.5 0.5 3.86 0.5 8C0.5 12.14 3.86 15.5 8 15.5C12.14 15.5 15.5 12.14 15.5 8C15.5 3.86 12.14 0.5 8 0.5ZM6.5 11.75L2.75 8L3.8075 6.9425L6.5 9.6275L12.1925 3.935L13.25 5L6.5 11.75Z"
                        fill="#03041B" fill-opacity="0.5" />
                    </svg>
                  </span>
                  حداقل یک کاراکتر با حرف بزرگ
                </li>
                <li>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8 0.5C3.86 0.5 0.5 3.86 0.5 8C0.5 12.14 3.86 15.5 8 15.5C12.14 15.5 15.5 12.14 15.5 8C15.5 3.86 12.14 0.5 8 0.5ZM6.5 11.75L2.75 8L3.8075 6.9425L6.5 9.6275L12.1925 3.935L13.25 5L6.5 11.75Z"
                        fill="#03041B" fill-opacity="0.5" />
                    </svg>
                  </span>
                  حداقل یک عدد
                </li>
                <li>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8 0.5C3.86 0.5 0.5 3.86 0.5 8C0.5 12.14 3.86 15.5 8 15.5C12.14 15.5 15.5 12.14 15.5 8C15.5 3.86 12.14 0.5 8 0.5ZM6.5 11.75L2.75 8L3.8075 6.9425L6.5 9.6275L12.1925 3.935L13.25 5L6.5 11.75Z"
                        fill="#03041B" fill-opacity="0.5" />
                    </svg>
                  </span>
                  حداقل یک کاراکتر ویژه از قبیل: !@#$%^&*()-+
                </li>
              </ul>
              <div className="auth-referral control-slide mb-3">
                <button type="button">
                  کد معرف (اختیاری)
                  <span className="icon">
                    <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M0.827336 0.163933C1.02214 -0.0347736 1.32696 -0.0528378 1.54177 0.10974L1.60331 0.163933L5.99996 4.64894L10.3966 0.163933C10.5914 -0.0347736 10.8962 -0.0528378 11.111 0.10974L11.1726 0.163933C11.3674 0.362639 11.3851 0.673582 11.2257 0.892695L11.1726 0.95547L6.38795 5.83607C6.19315 6.03477 5.88832 6.05284 5.67351 5.89026L5.61197 5.83607L0.827336 0.95547C0.613056 0.736893 0.613056 0.38251 0.827336 0.163933Z"
                        fill="#03041B" fill-opacity="1" />
                    </svg>
                  </span>
                </button>
                <div className="control-slide__wrapper">
                  <input type="text" className="form-control control-slide__input" placeholder="کد معرف" />
                </div>
              </div>
              <div className="auth-footer">
                <div className="auth-terms mb-3">
                  <div className="form-check form-check--lg auth-terms">
                    <input className="form-check-input" type="checkbox" id="ch1" checked/>
                    <label className="form-check-label" >
                      <a href="#"> مقررات آرسونیکس</a>
                      را خوانده‌ام و با آن موافقم.
                    </label>
                  </div>
                </div>
                <div className="mb-3">
                  <a href="/otpMobile" type="submit" className="btn btn-primary auth-submit">ثبت نام</a>
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
  )
}

export default SignupPage;