const Forget: React.FC = () => {
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
              <h4 className="auth-title">فراموشی رمز عبور</h4>
              <p className="auth-text">
                {" "}
                شماره تلفن همراه یا ایمیل خود را وارد کنید
              </p>

              <form action="" className="auth-form">
                <div className="mb-2">
                  <div className="float-control float-control-icon">
                    <input
                      type="email"
                      className="form-control"
                      id="input1"
                      placeholder="ایمیل "
                    />
                    <label className="float-control-label">ایمیل </label>
                    <span className="icon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="#bababa"
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
                            d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7"
                            stroke="#bababa"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>{" "}
                          <rect
                            x="3"
                            y="5"
                            width="18"
                            height="14"
                            rx="2"
                            stroke="#bababa"
                            stroke-width="2"
                            stroke-linecap="round"
                          ></rect>{" "}
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
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
                      <div className="col-lg-4">
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
                                  98+
                                  <span className="icon country-icon">
                                    <svg
                                      viewBox="0 0 36 36"
                                      xmlns="http://www.w3.org/2000/svg"
                                      aria-hidden="true"
                                      role="img"
                                      className="iconify iconify--twemoji"
                                      preserveAspectRatio="xMidYMid meet"
                                      fill="#000000"
                                    >
                                      <g
                                        id="SVGRepo_bgCarrier"
                                        stroke-width="0"
                                      ></g>
                                      <g
                                        id="SVGRepo_tracerCarrier"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      ></g>
                                      <g id="SVGRepo_iconCarrier">
                                        {" "}
                                        <path
                                          fill="#DA0001"
                                          d="M0 27a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4v-4H0v4z"
                                        >
                                          {" "}
                                        </path>{" "}
                                        <path fill="#EEE" d="M0 13h36v10H0z">
                                          {" "}
                                        </path>{" "}
                                        <path
                                          fill="#239F40"
                                          d="M36 13V9a4 4 0 0 0-4-4H4a4 4 0 0 0-4 4v4h36z"
                                        >
                                          {" "}
                                        </path>{" "}
                                        <path fill="#E96667" d="M0 23h36v1H0z">
                                          {" "}
                                        </path>{" "}
                                        <g fill="#BE1931">
                                          {" "}
                                          <path d="M19.465 14.969c.957.49 3.038 2.953.798 5.731c1.391-.308 3.162-4.408-.798-5.731zm-2.937 0c-3.959 1.323-2.189 5.423-.798 5.731c-2.24-2.778-.159-5.241.798-5.731zm1.453-.143c.04.197 1.101.436.974-.573c-.168.408-.654.396-.968.207c-.432.241-.835.182-.988-.227c-.148.754.587.975.982.593z">
                                            {" "}
                                          </path>{" "}
                                          <path d="M20.538 17.904c-.015-1.248-.677-2.352-1.329-2.799c.43.527 1.752 3.436-.785 5.351l.047-5.097l-.475-.418l-.475.398l.08 5.146l-.018-.015c-2.563-1.914-1.233-4.837-.802-5.365c-.652.447-1.315 1.551-1.329 2.799c-.013 1.071.477 2.243 1.834 3.205a6.375 6.375 0 0 1-1.678.201c.464.253 1.34.192 2.007.131l.001.068l.398.437l.4-.455v-.052c.672.062 1.567.129 2.039-.128a6.302 6.302 0 0 1-1.732-.213c1.344-.961 1.83-2.127 1.817-3.194z">
                                            {" "}
                                          </path>{" "}
                                        </g>{" "}
                                        <path fill="#7BC58C" d="M0 12h36v1H0z">
                                          {" "}
                                        </path>{" "}
                                      </g>
                                    </svg>
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
                                <li>
                                  <a
                                    role="option"
                                    className="dropdown-item"
                                    id="bs-select-1-1"
                                    // aria-setsize="4"
                                    // aria-posinset="1"
                                  >
                                    90+
                                    <span className="icon country-icon">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <path
                                          d="M24 18C24 18.7072 23.719 19.3855 23.219 19.8856C22.7189 20.3857 22.0406 20.6666 21.3333 20.6666H2.66667C1.95942 20.6666 1.28115 20.3857 0.781049 19.8856C0.280952 19.3855 0 18.7072 0 18V5.99998C0 5.29274 0.280952 4.61446 0.781049 4.11436C1.28115 3.61426 1.95942 3.33331 2.66667 3.33331H21.3333C22.0406 3.33331 22.7189 3.61426 23.219 4.11436C23.719 4.61446 24 5.29274 24 5.99998V18Z"
                                          fill="#E30917"
                                        ></path>
                                        <path
                                          d="M10.6666 16C9.60574 16 8.58833 15.5786 7.83818 14.8285C7.08804 14.0783 6.66661 13.0609 6.66661 12C6.66661 10.9392 7.08804 9.92174 7.83818 9.1716C8.58833 8.42145 9.60574 8.00002 10.6666 8.00002C11.5399 8.00002 12.3466 8.28336 13.0046 8.75869C12.5458 8.23685 11.9811 7.81881 11.348 7.53245C10.715 7.24609 10.0281 7.09799 9.33327 7.09802C8.03318 7.09802 6.78634 7.61448 5.86704 8.53378C4.94773 9.45309 4.43127 10.6999 4.43127 12C4.43119 12.6438 4.55792 13.2813 4.80423 13.8761C5.05054 14.471 5.4116 15.0114 5.8668 15.4667C6.322 15.922 6.86243 16.2831 7.45721 16.5295C8.05199 16.7759 8.68948 16.9027 9.33327 16.9027C10.7966 16.9027 12.1066 16.258 13.0046 15.2414C12.325 15.7349 11.5065 16.0005 10.6666 16ZM13.2753 12.1534L14.9019 12.528L15.0486 14.19L15.9073 12.7594L17.5339 13.1334L16.4379 11.8747L17.2959 10.4434L15.7606 11.0967L14.6646 9.83736L14.8113 11.5L13.2753 12.1534Z"
                                          fill="#EEEEEE"
                                        ></path>
                                      </svg>
                                    </span>
                                  </a>
                                </li>
                                <li></li>
                              </ul>
                              <ul
                                className="dropdown-menu inner show"
                                role="presentation"
                                style={{
                                  marginTop: "0px",
                                  marginBottom: "0px",
                                }}
                              >
                                <li>
                                  <a
                                    role="option"
                                    className="dropdown-item"
                                    id="bs-select-1-1"
                                    // aria-setsize="4"
                                    // aria-posinset="1"
                                  >
                                    44+
                                    <span className="icon country-icon">
                                      <svg
                                        version="1.1"
                                        id="Layer_1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                        fill="#000000"
                                      >
                                        <g
                                          id="SVGRepo_bgCarrier"
                                          stroke-width="0"
                                        ></g>
                                        <g
                                          id="SVGRepo_tracerCarrier"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        ></g>
                                        <g id="SVGRepo_iconCarrier">
                                          {" "}
                                          <path
                                            style={{ fill: "#41479B" }}
                                            d="M473.655,88.276H38.345C17.167,88.276,0,105.443,0,126.621V385.38 c0,21.177,17.167,38.345,38.345,38.345h435.31c21.177,0,38.345-17.167,38.345-38.345V126.621 C512,105.443,494.833,88.276,473.655,88.276z"
                                          ></path>{" "}
                                          <path
                                            style={{ fill: "#F5F5F5" }}
                                            d="M511.469,120.282c-3.022-18.159-18.797-32.007-37.814-32.007h-9.977l-163.54,107.147V88.276h-88.276 v107.147L48.322,88.276h-9.977c-19.017,0-34.792,13.847-37.814,32.007l139.778,91.58H0v88.276h140.309L0.531,391.717 c3.022,18.159,18.797,32.007,37.814,32.007h9.977l163.54-107.147v107.147h88.276V316.577l163.54,107.147h9.977 c19.017,0,34.792-13.847,37.814-32.007l-139.778-91.58H512v-88.276H371.691L511.469,120.282z"
                                          ></path>{" "}
                                          <g>
                                            {" "}
                                            <polygon
                                              style={{ fill: "#FF4B55;" }}
                                              points="282.483,88.276 229.517,88.276 229.517,229.517 0,229.517 0,282.483 229.517,282.483 229.517,423.724 282.483,423.724 282.483,282.483 512,282.483 512,229.517 282.483,229.517 "
                                            ></polygon>{" "}
                                            <path
                                              style={{ fill: "#FF4B55;" }}
                                              d="M24.793,421.252l186.583-121.114h-32.428L9.224,410.31 C13.377,415.157,18.714,418.955,24.793,421.252z"
                                            ></path>{" "}
                                            <path
                                              style={{ fill: "#FF4B55;" }}
                                              d="M346.388,300.138H313.96l180.716,117.305c5.057-3.321,9.277-7.807,12.287-13.075L346.388,300.138z"
                                            ></path>{" "}
                                            <path
                                              style={{ fill: "#FF4B55;" }}
                                              d="M4.049,109.475l157.73,102.387h32.428L15.475,95.842C10.676,99.414,6.749,104.084,4.049,109.475z"
                                            ></path>{" "}
                                            <path
                                              style={{ fill: "#FF4B55;" }}
                                              d="M332.566,211.862l170.035-110.375c-4.199-4.831-9.578-8.607-15.699-10.86L300.138,211.862H332.566z"
                                            ></path>{" "}
                                          </g>{" "}
                                        </g>
                                      </svg>
                                    </span>
                                  </a>
                                </li>
                                <li></li>
                              </ul>
                              <ul
                                className="dropdown-menu inner show"
                                role="presentation"
                                style={{
                                  marginTop: "0px",
                                  marginBottom: "0px",
                                }}
                              >
                                <li>
                                  <a
                                    role="option"
                                    className="dropdown-item"
                                    id="bs-select-1-1"
                                    // aria-setsize="4"
                                    // aria-posinset="1"
                                  >
                                    33+{" "}
                                    <span className="icon country-icon">
                                      {" "}
                                      <svg
                                        viewBox="0 0 36 36"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                        role="img"
                                        className="iconify iconify--twemoji"
                                        preserveAspectRatio="xMidYMid meet"
                                        fill="#000000"
                                      >
                                        <g
                                          id="SVGRepo_bgCarrier"
                                          stroke-width="0"
                                        ></g>
                                        <g
                                          id="SVGRepo_tracerCarrier"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        ></g>
                                        <g id="SVGRepo_iconCarrier">
                                          <path
                                            fill="#ED2939"
                                            d="M36 27a4 4 0 0 1-4 4h-8V5h8a4 4 0 0 1 4 4v18z"
                                          ></path>
                                          <path
                                            fill="#002495"
                                            d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h8V5H4z"
                                          ></path>
                                          <path
                                            fill="#EEE"
                                            d="M12 5h12v26H12z"
                                          ></path>
                                        </g>
                                      </svg>{" "}
                                    </span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
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
