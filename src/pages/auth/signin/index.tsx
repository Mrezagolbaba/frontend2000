import React, { useState } from "react";
import IrFlag from "../../../assets/img/icons/flag-iran.svg";
import TrFlag from "../../../assets/img/icons/flag-turkey.png";

const optionsArray = [
  { value: "90+", label: "90+", flagIcon: TrFlag },
  { value: "44+", label: "44+", flagIcon: "URL_TO_FLAG_ICON" },
  { value: "33+", label: "33+", flagIcon: "URL_TO_FLAG_ICON" },
  { value: "98+", label: "98+", flagIcon: IrFlag },
];

const LoginPage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState(optionsArray[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const handleOptionChange = (option: any) => {
    setSelectedOption(option);
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Do something with the login values, e.g., make an API call
    console.log("Selected Option:", selectedOption);
    console.log("Phone Number:", phoneNumber);
    console.log("Password:", password);
    // Implement your login logic here
  };
  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumber(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  // const { data, isLoading } = useQuery('loginData', fetchData);

  // Define the fetchData function to fetch login data from your API
  // async function fetchData() {
  //   // Implement your API call here and return the data
  //   // Example:
  //   // const response = await fetch('/api/login');
  //   // return response.json();
  //   return {};
  // }

  // Loading state
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  return (
    <div className="auth-wrapper" id="root">
      <main className="auth-main">
        <header className="auth-header auth-header--bg">
          <div className="auth-logo">
            <a href="#">
              <img src="assets/img/logo-arsonex.png" alt="" />
            </a>
          </div>
          <div className="auth-gain-confidence">
            <p>از یکسان بودن آدرس صفحه با آدرس زیر مطمئن شوید.</p>
            <div className="d-ltr">
              <span className="icon">
                <svg
                  width="12"
                  height="16"
                  viewBox="0 0 12 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 0.666656L0 3.33332V7.33332C0 11.0333 2.56 14.4933 6 15.3333C9.44 14.4933 12 11.0333 12 7.33332V3.33332L6 0.666656ZM6 7.99332H10.6667C10.3133 10.74 8.48 13.1867 6 13.9533V7.99999H1.33333V4.19999L6 2.12666V7.99332Z"
                    fill="#39D98A"
                  />
                </svg>
              </span>
              <label>
                <span>https://</span>arsonex.com
              </label>
            </div>
          </div>
        </header>

        <section className="auth auth-signin">
          <div className="card auth-card">
            <div className="card-body">
              <h4 className="auth-title">ورود به حساب کاربری</h4>
              <p className="auth-text"> شماره تلفن خود را وارد کنید</p>

              <form action="" className="auth-form" onSubmit={handleSubmit}>
                <div className="mb-2">
                  <div className="row">
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Button group with nested dropdown"
                    >
                      <div className="col-lg-8">
                        <div className="float-control float-control-icon">
                          <input
                            type="phone"
                            className="form-control phone-control d-ltr"
                            id="input1"
                            placeholder=" شماره همراه"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                          />
                          <label className="float-control-label">
                            شماره همراه
                          </label>
                          <span className="icon">
                            <svg
                              width="15"
                              height="18"
                              viewBox="0,0,256,256"
                              xmlns="http://www.w3.org/2000/svg"
                              version="1.1"
                            >
                              <g
                                fill="#a6a7ad"
                                fill-rule="nonzero"
                                stroke="none"
                                stroke-width="1"
                                stroke-linecap="butt"
                                stroke-linejoin="miter"
                                stroke-miterlimit="10"
                                stroke-dasharray=""
                                stroke-dashoffset="0"
                                font-family="none"
                                font-weight="none"
                                font-size="none"
                                text-anchor="none"
                                style={{ mixBlendMode: "normal" }}
                              >
                                <g transform="scale(5.12,5.12)">
                                  <path d="M17.8125,3c-3.16797,0 -5.8125,2.88672 -5.8125,6v32c0,1.87109 0.91797,3.39453 2.09375,4.40625c1.17578,1.01172 2.58984,1.59375 3.90625,1.59375h14.40625c3.05859,0 5.59375,-2.53516 5.59375,-5.59375v-32.8125c0,-3.05859 -2.53516,-5.59375 -5.59375,-5.59375zM17.8125,5h14.59375c1.94141,0 3.59375,1.65234 3.59375,3.59375v32.8125c0,1.94141 -1.65234,3.59375 -3.59375,3.59375h-14.40625c-0.68359,0 -1.76953,-0.38281 -2.59375,-1.09375c-0.82422,-0.71094 -1.40625,-1.67969 -1.40625,-2.90625v-32c0,-1.88672 1.98047,-4 3.8125,-4zM16.8125,8c-0.47656,0.08984 -0.82031,0.51172 -0.8125,1v31c0,0.55078 0.44922,1 1,1h16c0.55078,0 1,-0.44922 1,-1v-31c0,-0.55078 -0.44922,-1 -1,-1h-16c-0.03125,0 -0.0625,0 -0.09375,0c-0.03125,0 -0.0625,0 -0.09375,0zM18,10h14v29h-14zM25,41.5c-0.82812,0 -1.5,0.67188 -1.5,1.5c0,0.82813 0.67188,1.5 1.5,1.5c0.82813,0 1.5,-0.67187 1.5,-1.5c0,-0.82812 -0.67187,-1.5 -1.5,-1.5z"></path>
                                </g>
                              </g>
                            </svg>
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-4" style={{ marginRight: "15px" }}>
                        <div className="dropdown bootstrap-select bs-select-control bs-form-select">
                          <button
                            type="button"
                            className="btn dropdown-toggle bs-placeholder btn-light country-control"
                            data-bs-toggle="dropdown"
                            role="combobox"
                            aria-owns="bs-select-1"
                            aria-haspopup="listbox"
                            aria-expanded="false"
                            title="انتخاب کنید"
                            data-id="inputTopic"
                          >
                            <div className="filter-option">
                              <div className="filter-option-inner">
                                <div className="filter-option-inner-inner">
                                  {selectedOption.value}
                                  <span className="icon country-icon">
                                    {/* Replace "URL_TO_FLAG_ICON" with the actual URL to the flag icon */}
                                    <img
                                      src={selectedOption.flagIcon}
                                      alt={selectedOption.label}
                                    />
                                  </span>
                                </div>
                              </div>{" "}
                            </div>
                          </button>
                          <div
                            className="dropdown-menu"
                            style={{
                              maxHeight: "348.406px",
                              overflow: "hidden",
                              minHeight: "121px",
                            }}
                          >
                            <div
                              className="inner show"
                              role="listbox"
                              id="bs-select-1"
                              aria-activedescendant="bs-select-1-0"
                              style={{
                                maxHeight: "338.406px",
                                overflow: " hidden auto",
                                minHeight: "111px",
                              }}
                            >
                              <ul
                                className="dropdown-menu inner show"
                                role="presentation"
                                style={{
                                  marginTop: "0px",
                                  marginBottom: "0px",
                                }}
                              >
                                {optionsArray.map((option, index) => (
                                  <li key={index}>
                                    <button
                                      role="option"
                                      className="dropdown-item"
                                      id={`bs-select-1-${index + 1}`}
                                      aria-setsize={optionsArray.length}
                                      aria-posinset={index + 1}
                                      onClick={() => handleOptionChange(option)}
                                    >
                                      {option.value}
                                      <span className="icon country-icon">
                                        {/* Replace "URL_TO_FLAG_ICON" with the actual URL to the flag icon */}
                                        <img
                                          src={option.flagIcon}
                                          alt={option.label}
                                        />
                                      </span>
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>{" "}
                  </div>
                </div>
                <div className="mb-2">
                  <div className="float-control float-control-icon password-control strenghtify-control">
                    <input
                      type="password"
                      className="form-control strengthify"
                      id="input2"
                      placeholder="رمز عبور"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    <label className="float-control-label">رمز عبور</label>
                    <span className="icon">
                      <svg
                        width="15"
                        height="18"
                        viewBox="0 0 15 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.6862 6.87272V5.08355C11.6862 2.98939 9.98783 1.29105 7.89366 1.29105C5.79949 1.28189 4.09449 2.97189 4.08533 5.06689V5.08355V6.87272"
                          stroke="#03041B"
                          stroke-opacity="0.4"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M11.0694 16.7067H4.70187C2.95687 16.7067 1.54187 15.2925 1.54187 13.5467V9.9725C1.54187 8.22667 2.95687 6.8125 4.70187 6.8125H11.0694C12.8144 6.8125 14.2294 8.22667 14.2294 9.9725V13.5467C14.2294 15.2925 12.8144 16.7067 11.0694 16.7067Z"
                          stroke="#03041B"
                          stroke-opacity="0.4"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M7.88578 10.8359V12.6868"
                          stroke="#03041B"
                          stroke-opacity="0.4"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </span>
                    <button
                      type="button"
                      className="password-control-btn"
                    ></button>
                  </div>
                  <div className="auth-forgot mb-4">
                    <a href="/forget">رمز عبور را فراموش کرده&zwnj;ام!</a>
                  </div>
                  <div className="auth-footer">
                    <div className="mb-3">
                      <button
                        type="submit"
                        className="btn btn-primary auth-submit"
                      >
                        ورود به حساب
                      </button>
                      <button
                        type="submit"
                        className="btn btn-outline-primary auth-submit mt-3"
                      >
                        ورود با استفاده از ایمیل
                      </button>
                    </div>
                    <div className="auth-already">
                      عضو نیستم:
                      <a href="/register">ثبت نام</a>
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

export default LoginPage;
