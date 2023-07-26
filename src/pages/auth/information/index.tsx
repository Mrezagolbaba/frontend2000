import { useState } from "react";

const Information: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [nationalCode, setNationalCode] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here using the state values
    const formData = {
      fullName,
      nationalCode,
      birthDate,
      year,
      month,
      day,
      phone,
      email,
    };
    console.log(formData);
  };

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

        <section className="auth auth-signup">
          <div className="card auth-card auth-card--bordered">
            <div className="card-body">
              <h4 className="auth-title">اطلاعات هویتی</h4>
              <p className="auth-text">اطلاعات هویتی خود را تکمیل کنید</p>
              <form action="" className="auth-form" onSubmit={handleSubmit}>
                <div className="mb-2">
                  <div className="float-control float-control-icon">
                    <input
                      type="email"
                      className="form-control"
                      id="input1"
                      placeholder="نام و نام خانوادگی"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    <label className="float-control-label">
                      نام و نام خانوادگی
                    </label>
                    <span className="icon">
                      <svg
                        width="15"
                        height="18"
                        viewBox="0 0 15 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <ellipse
                          cx="7.64917"
                          cy="5.06568"
                          rx="3.98169"
                          ry="3.98169"
                          stroke="#03041B"
                          stroke-opacity="0.4"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></ellipse>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M1.33339 14.5856C1.33232 14.3057 1.39492 14.0292 1.51645 13.7771C1.89784 13.0143 2.97336 12.61 3.86581 12.4269C4.50944 12.2896 5.16196 12.1978 5.81851 12.1523C7.03407 12.0456 8.25665 12.0456 9.47221 12.1523C10.1287 12.1984 10.7812 12.2901 11.4249 12.4269C12.3174 12.61 13.3929 12.9761 13.7743 13.7771C14.0187 14.2911 14.0187 14.8878 13.7743 15.4018C13.3929 16.2027 12.3174 16.5688 11.4249 16.7443C10.782 16.8873 10.1293 16.9816 9.47221 17.0265C8.48285 17.1104 7.48886 17.1257 6.49739 17.0723C6.26855 17.0723 6.04735 17.0723 5.81851 17.0265C5.1639 16.9822 4.51364 16.8878 3.87343 16.7443C2.97336 16.5688 1.90547 16.2027 1.51645 15.4018C1.39554 15.1467 1.333 14.8679 1.33339 14.5856Z"
                          stroke="#03041B"
                          stroke-opacity="0.4"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="float-control float-control-icon">
                    <input
                      type="email"
                      className="form-control"
                      id="input1"
                      placeholder="کدملی"
                      value={nationalCode}
                      onChange={(e) => setNationalCode(e.target.value)}
                    />
                    <label className="float-control-label">کدملی</label>
                    <span className="icon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M3 5C2.44772 5 2 5.44771 2 6V18C2 18.5523 2.44772 19 3 19H21C21.5523 19 22 18.5523 22 18V6C22 5.44772 21.5523 5 21 5H3ZM0 6C0 4.34315 1.34314 3 3 3H21C22.6569 3 24 4.34315 24 6V18C24 19.6569 22.6569 21 21 21H3C1.34315 21 0 19.6569 0 18V6ZM6 10.5C6 9.67157 6.67157 9 7.5 9C8.32843 9 9 9.67157 9 10.5C9 11.3284 8.32843 12 7.5 12C6.67157 12 6 11.3284 6 10.5ZM10.1756 12.7565C10.69 12.1472 11 11.3598 11 10.5C11 8.567 9.433 7 7.5 7C5.567 7 4 8.567 4 10.5C4 11.3598 4.31002 12.1472 4.82438 12.7565C3.68235 13.4994 3 14.7069 3 16C3 16.5523 3.44772 17 4 17C4.55228 17 5 16.5523 5 16C5 15.1145 5.80048 14 7.5 14C9.19952 14 10 15.1145 10 16C10 16.5523 10.4477 17 11 17C11.5523 17 12 16.5523 12 16C12 14.7069 11.3177 13.4994 10.1756 12.7565ZM13 8C12.4477 8 12 8.44772 12 9C12 9.55228 12.4477 10 13 10H19C19.5523 10 20 9.55228 20 9C20 8.44772 19.5523 8 19 8H13ZM14 12C13.4477 12 13 12.4477 13 13C13 13.5523 13.4477 14 14 14H18C18.5523 14 19 13.5523 19 13C19 12.4477 18.5523 12 18 12H14Z"
                            fill="#bababa"
                          ></path>{" "}
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="mb-2">
                  <fieldset>
                    <div className="float-control float-control-icon">
                      <input
                        type="email"
                        className="form-control"
                        id="input1"
                        placeholder="تاریخ تولد"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                      />
                      <label className="float-control-label">تاریخ تولد</label>
                      <span className="icon">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              d="M21 10H3M16 2V6M8 2V6M10.5 14L12 13V18M10.75 18H13.25M7.8 22H16.2C17.8802 22 18.7202 22 19.362 21.673C19.9265 21.3854 20.3854 20.9265 20.673 20.362C21 19.7202 21 18.8802 21 17.2V8.8C21 7.11984 21 6.27976 20.673 5.63803C20.3854 5.07354 19.9265 4.6146 19.362 4.32698C18.7202 4 17.8802 4 16.2 4H7.8C6.11984 4 5.27976 4 4.63803 4.32698C4.07354 4.6146 3.6146 5.07354 3.32698 5.63803C3 6.27976 3 7.11984 3 8.8V17.2C3 18.8802 3 19.7202 3.32698 20.362C3.6146 20.9265 4.07354 21.3854 4.63803 21.673C5.27976 22 6.11984 22 7.8 22Z"
                              stroke="#b0b0b0"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>{" "}
                          </g>
                        </svg>
                      </span>
                    </div>
                  </fieldset>
                </div>
                <div className="mb-2">
                  <div className="row">
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Button group with nested dropdown"
                    >
                      <div className="col-lg-4">
                        <div className="dropdown bootstrap-select bs-select-control bs-form-select">
                          <button
                            type="button"
                            className="btn dropdown-toggle bs-placeholder btn-light"
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
                                  سال
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
                                overflow: "hidden auto",
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
                                <li className="disabled selected active">
                                  <a
                                    role="option"
                                    className="dropdown-item disabled selected active"
                                    id="bs-select-1-0"
                                    aria-disabled="true"
                                    aria-setsize="4"
                                    aria-posinset="undefined"
                                    aria-selected="true"
                                  >
                                    <span className="text">انتخاب کنید</span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    role="option"
                                    className="dropdown-item"
                                    id="bs-select-1-1"
                                    aria-setsize="4"
                                    aria-posinset="1"
                                  >
                                    <span className="text">1402</span>
                                  </a>
                                  <a
                                    role="option"
                                    className="dropdown-item"
                                    id="bs-select-1-1"
                                    aria-setsize="4"
                                    aria-posinset="1"
                                  >
                                    <span className="text">1401</span>
                                  </a>
                                  <a
                                    role="option"
                                    className="dropdown-item"
                                    id="bs-select-1-1"
                                    aria-setsize="4"
                                    aria-posinset="1"
                                  >
                                    <span className="text">1400</span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="dropdown bootstrap-select bs-select-control bs-form-select">
                          <button
                            type="button"
                            className="btn dropdown-toggle bs-placeholder btn-light"
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
                                  ماه
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
                                overflow: "hidden auto",
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
                                <li className="disabled selected active">
                                  <a
                                    role="option"
                                    className="dropdown-item disabled selected active"
                                    id="bs-select-1-0"
                                    aria-disabled="true"
                                    aria-setsize="4"
                                    aria-posinset="undefined"
                                    aria-selected="true"
                                  >
                                    <span className="text">انتخاب کنید</span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    role="option"
                                    className="dropdown-item"
                                    id="bs-select-1-1"
                                    aria-setsize="4"
                                    aria-posinset="1"
                                  >
                                    <span className="text">فروردین</span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    role="option"
                                    className="dropdown-item"
                                    id="bs-select-1-2"
                                  >
                                    <span className="text">اردیبهشت</span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    role="option"
                                    className="dropdown-item"
                                    id="bs-select-1-3"
                                  >
                                    <span className="text">خرداد</span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="dropdown bootstrap-select bs-select-control bs-form-select">
                          <button
                            type="button"
                            className="btn dropdown-toggle bs-placeholder btn-light"
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
                                  روز
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
                                overflow: "hidden auto",
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
                                <li className="disabled selected active">
                                  <a
                                    role="option"
                                    className="dropdown-item disabled selected active"
                                    id="bs-select-1-0"
                                    aria-disabled="true"
                                    aria-setsize="4"
                                    aria-posinset="undefined"
                                    aria-selected="true"
                                  >
                                    <span className="text">انتخاب کنید</span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    role="option"
                                    className="dropdown-item"
                                    id="bs-select-1-1"
                                    aria-setsize="4"
                                    aria-posinset="1"
                                  >
                                    <span className="text">01</span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    role="option"
                                    className="dropdown-item"
                                    id="bs-select-1-2"
                                  >
                                    <span className="text">02</span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    role="option"
                                    className="dropdown-item"
                                    id="bs-select-1-3"
                                  >
                                    <span className="text">03</span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>{" "}
                  </div>
                </div>
                <div className="mb-2">
                  <div className="float-control float-control-icon">
                    <input
                      type="phone"
                      className="form-control"
                      id="input1"
                      placeholder="شماره تلفن ایران"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <label className="float-control-label">
                      تلفن همراه ایران (اختیاری)
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
                          style={{
                            mixBlendMode: "normal",
                          }}
                        >
                          <g transform="scale(5.12,5.12)">
                            <path d="M17.8125,3c-3.16797,0 -5.8125,2.88672 -5.8125,6v32c0,1.87109 0.91797,3.39453 2.09375,4.40625c1.17578,1.01172 2.58984,1.59375 3.90625,1.59375h14.40625c3.05859,0 5.59375,-2.53516 5.59375,-5.59375v-32.8125c0,-3.05859 -2.53516,-5.59375 -5.59375,-5.59375zM17.8125,5h14.59375c1.94141,0 3.59375,1.65234 3.59375,3.59375v32.8125c0,1.94141 -1.65234,3.59375 -3.59375,3.59375h-14.40625c-0.68359,0 -1.76953,-0.38281 -2.59375,-1.09375c-0.82422,-0.71094 -1.40625,-1.67969 -1.40625,-2.90625v-32c0,-1.88672 1.98047,-4 3.8125,-4zM16.8125,8c-0.47656,0.08984 -0.82031,0.51172 -0.8125,1v31c0,0.55078 0.44922,1 1,1h16c0.55078,0 1,-0.44922 1,-1v-31c0,-0.55078 -0.44922,-1 -1,-1h-16c-0.03125,0 -0.0625,0 -0.09375,0c-0.03125,0 -0.0625,0 -0.09375,0zM18,10h14v29h-14zM25,41.5c-0.82812,0 -1.5,0.67188 -1.5,1.5c0,0.82813 0.67188,1.5 1.5,1.5c0.82813,0 1.5,-0.67187 1.5,-1.5c0,-0.82812 -0.67187,-1.5 -1.5,-1.5z"></path>
                          </g>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="float-control float-control-icon">
                    <input
                      type="email"
                      className="form-control"
                      id="input1"
                      placeholder="ایمیل"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="float-control-label">ایمیل</label>
                    <span className="icon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M4 7L10.94 11.3375C11.5885 11.7428 12.4115 11.7428 13.06 11.3375L20 7M5 18H19C20.1046 18 21 17.1046 21 16V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18Z"
                            stroke="#bababa"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>{" "}
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="auth-footer">
                  <div className="mb-3">
                    <button
                      type="submit"
                      className="btn btn-primary auth-submit"
                    >
                      ثبت اطلاعات
                    </button>
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
export default Information;
