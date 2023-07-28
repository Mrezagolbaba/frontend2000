import { useState } from "react";
import { Input } from "antd";
import user from "../../../assets/img/icons/user.svg";
import card from "../../../assets/img/icons/card.svg";

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
                    <Input
                      type="email"
                      id="input1"
                      placeholder="نام و نام خانوادگی"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      size="large"
                      prefix={<img src={user} alt="user" />}
                    />
                  </div>
                </div>
                <div className="mb-2">
                  <div className="float-control float-control-icon">
                  <Input
                      type="text"
                      id="input2"
                      placeholder=" کدملی  "
                      value={nationalCode}
                      onChange={(e) => setNationalCode(e.target.value)}
                      size="large"
                      prefix={<img src={card} alt="card" />}
                    />
                  </div>
                </div>
                <div className="mb-2">
                  <fieldset>
                    <div className="float-control float-control-icon">
                    {/* <Input
                      type="text"
                      id="input2"
                      placeholder="تاریخ تولد"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      size="large"
                      prefix={<img src={card} alt="card" />}
                    />
                      <input
                        type="email"
                        className="form-control"
                        id="input1"
                        placeholder="تاریخ تولد"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                      /> */}
                    </div>
                  </fieldset>
                </div>
                <label>تاریخ تولد</label>
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
                                    // aria-setsize="4"
                                    // aria-posinset="undefined"
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
                                    // aria-setsize="4"
                                    // aria-posinset="1"
                                  >
                                    <span className="text">1402</span>
                                  </a>
                                  <a
                                    role="option"
                                    className="dropdown-item"
                                    id="bs-select-1-1"
                                    // aria-setsize="4"
                                    // aria-posinset="1"
                                  >
                                    <span className="text">1401</span>
                                  </a>
                                  <a
                                    role="option"
                                    className="dropdown-item"
                                    id="bs-select-1-1"
                                    // aria-setsize="4"
                                    // aria-posinset="1"
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
                                    // aria-setsize="4"
                                    // aria-posinset="undefined"
                                    // aria-selected="true"
                                  >
                                    <span className="text">انتخاب کنید</span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    role="option"
                                    className="dropdown-item"
                                    id="bs-select-1-1"
                                    // aria-setsize="4"
                                    // aria-posinset="1"
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
                                    // aria-setsize="4"
                                    // aria-posinset="undefined"
                                    // aria-selected="true"
                                  >
                                    <span className="text">انتخاب کنید</span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    role="option"
                                    className="dropdown-item"
                                    id="bs-select-1-1"
                                    // aria-setsize="4"
                                    // aria-posinset="1"
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
