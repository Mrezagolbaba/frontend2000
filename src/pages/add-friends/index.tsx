import Layout from "layouts/dashboard";


const AddFriends = () => {
  return (
    <Layout>
      <section className="page page-add-friends">
        <div className="card card-secondary invite-friends-card mb-4">
          <div className="card-header">
            <h5 className="card-title">از معامله دوستان خودت کسب درآمد کن!</h5>
          </div>
          <div className="card-body">
            <div className="invite-friends-card__right">
              <p className="card-text">
                با دعوت دوستان خود میتوانید ۱۵ درصد از کارمزد معاملات آن&zwnj;ها
                را در حساب کاربری خود دریافت کنید!
              </p>
              <div className="invite-link mb-3">
                <label>کد دعوت:</label>
                <div className="invite-control">
                  <button data-clipboard-target="#invitationCode">
                    <span className="icon">
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 19 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_193_5658)">
                          <path
                            d="M15.8062 7.27905H8.82944C7.97318 7.27905 7.27905 7.97318 7.27905 8.82944V15.8062C7.27905 16.6624 7.97318 17.3566 8.82944 17.3566H15.8062C16.6624 17.3566 17.3566 16.6624 17.3566 15.8062V8.82944C17.3566 7.97318 16.6624 7.27905 15.8062 7.27905Z"
                            stroke="#03041B"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M4.17812 11.9303H3.40293C2.99174 11.9303 2.59739 11.767 2.30664 11.4762C2.01588 11.1855 1.85254 10.7911 1.85254 10.3799V3.40317C1.85254 2.99198 2.01588 2.59764 2.30664 2.30688C2.59739 2.01613 2.99174 1.85278 3.40293 1.85278H10.3797C10.7909 1.85278 11.1852 2.01613 11.476 2.30688C11.7667 2.59764 11.9301 2.99198 11.9301 3.40317V4.17836"
                            stroke="#03041B"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_193_5658">
                            <rect
                              width="18.6047"
                              height="18.6047"
                              fill="white"
                              transform="translate(0.302246 0.302368)"
                            ></rect>
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                  </button>
                  <div id="invitationCode" className="invite-control-text">
                    JkPZ
                  </div>
                </div>
              </div>
              <div className="invite-link">
                <label>لینک دعوت:</label>
                <div className="invite-control">
                  <button data-clipboard-target="#invitationLink">
                    <span className="icon">
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 19 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_193_5658)">
                          <path
                            d="M15.8062 7.27905H8.82944C7.97318 7.27905 7.27905 7.97318 7.27905 8.82944V15.8062C7.27905 16.6624 7.97318 17.3566 8.82944 17.3566H15.8062C16.6624 17.3566 17.3566 16.6624 17.3566 15.8062V8.82944C17.3566 7.97318 16.6624 7.27905 15.8062 7.27905Z"
                            stroke="#03041B"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M4.17812 11.9303H3.40293C2.99174 11.9303 2.59739 11.767 2.30664 11.4762C2.01588 11.1855 1.85254 10.7911 1.85254 10.3799V3.40317C1.85254 2.99198 2.01588 2.59764 2.30664 2.30688C2.59739 2.01613 2.99174 1.85278 3.40293 1.85278H10.3797C10.7909 1.85278 11.1852 2.01613 11.476 2.30688C11.7667 2.59764 11.9301 2.99198 11.9301 3.40317V4.17836"
                            stroke="#03041B"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_193_5658">
                            <rect
                              width="18.6047"
                              height="18.6047"
                              fill="white"
                              transform="translate(0.302246 0.302368)"
                            ></rect>
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                  </button>
                  <div id="invitationLink" className="invite-control-text">
                    https://arsonex.com/app/register/JkPZ
                  </div>
                </div>
              </div>
            </div>
            <div className="invite-friends-card__left">
              <ul className="invitation-counter">
                <li>
                  <label>میزان سود من:</label>
                  <div>
                    <span className="icon">
                      <svg
                        width="48"
                        height="42"
                        viewBox="0 0 48 42"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M47.3251 12.542H37.4442C32.846 12.55 29.121 16.182 29.1127 20.6653C29.1065 25.1587 32.8356 28.8069 37.4442 28.8129H47.3334V29.5268C47.3334 37.365 42.5817 42 34.5405 42H13.4617C5.41845 42 0.666748 37.365 0.666748 29.5268V12.455C0.666748 4.61678 5.41845 0 13.4617 0H34.5322C42.5734 0 47.3251 4.61678 47.3251 12.455V12.542ZM11.7254 12.5237H24.8854H24.8937H24.9103C25.8955 12.5197 26.6919 11.7371 26.6878 10.7745C26.6836 9.81392 25.8789 9.03738 24.8937 9.04142H11.7254C10.7464 9.04546 9.95207 9.81998 9.94792 10.7765C9.94377 11.7371 10.7402 12.5197 11.7254 12.5237Z"
                          fill="#03041B"
                          fill-opacity="0.1"
                        ></path>
                        <path
                          opacity="0.4"
                          d="M33.4208 21.6918C33.9087 23.9113 35.8546 25.4728 38.0762 25.4322H45.6594C46.5837 25.4322 47.3335 24.6666 47.3335 23.7204V17.8134C47.3315 16.8692 46.5837 16.1016 45.6594 16.0996H37.8977C35.3706 16.1077 33.3295 18.2053 33.3335 20.7903C33.3335 21.0928 33.3633 21.3954 33.4208 21.6918Z"
                          fill="#03041B"
                          fill-opacity="0.1"
                        ></path>
                        <ellipse
                          cx="38.0001"
                          cy="20.7669"
                          rx="2.33334"
                          ry="2.33333"
                          fill="#03041B"
                          fill-opacity="0.1"
                        ></ellipse>
                      </svg>
                    </span>
                    <h6>4,300 تومان</h6>
                  </div>
                </li>
                <li>
                  <label>تعداد دوستان من:</label>
                  <div>
                    <span className="icon">
                      <svg
                        width="52"
                        height="38"
                        viewBox="0 0 52 38"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M25.8808 24.9258C17.8308 24.9258 11.0386 26.2412 11.0386 31.3179C11.0386 36.3968 17.8747 37.6659 25.8808 37.6659C33.9307 37.6659 40.723 36.3505 40.723 31.2738C40.723 26.195 33.8869 24.9258 25.8808 24.9258Z"
                          fill="#03041B"
                          fill-opacity="0.1"
                        ></path>
                        <path
                          opacity="0.4"
                          d="M25.881 20.0894C31.3319 20.0894 35.7027 15.6935 35.7027 10.2112C35.7027 4.72682 31.3319 0.333008 25.881 0.333008C20.4301 0.333008 16.0593 4.72682 16.0593 10.2112C16.0593 15.6935 20.4301 20.0894 25.881 20.0894Z"
                          fill="#03041B"
                          fill-opacity="0.1"
                        ></path>
                        <path
                          opacity="0.4"
                          d="M47.2054 12.511C48.6157 6.96362 44.481 1.98145 39.216 1.98145C38.6436 1.98145 38.0962 2.04448 37.5613 2.15165C37.4903 2.16846 37.4109 2.20418 37.3691 2.26722C37.3211 2.34707 37.3566 2.45424 37.4088 2.52358C38.9904 4.75516 39.8992 7.47214 39.8992 10.3887C39.8992 13.1835 39.0656 15.7891 37.6031 17.9513C37.4527 18.174 37.5864 18.4745 37.8517 18.5208C38.2194 18.5859 38.5955 18.6195 38.9799 18.63C42.8138 18.7309 46.2548 16.2493 47.2054 12.511Z"
                          fill="#03041B"
                          fill-opacity="0.1"
                        ></path>
                        <path
                          d="M51.2217 25.5721C50.5197 24.0676 48.8253 23.0358 46.2492 22.5294C45.0333 22.231 41.7427 21.8108 38.6819 21.8675C38.6359 21.8738 38.6109 21.9053 38.6067 21.9263C38.6004 21.9558 38.6129 22.0062 38.6735 22.0377C40.088 22.7416 45.5556 25.8032 44.8682 32.2605C44.839 32.54 45.0625 32.7816 45.3404 32.7396C46.6859 32.5463 50.1478 31.7982 51.2217 29.4679C51.8151 28.2365 51.8151 26.8055 51.2217 25.5721Z"
                          fill="#03041B"
                          fill-opacity="0.1"
                        ></path>
                        <path
                          opacity="0.4"
                          d="M14.4375 2.15263C13.9047 2.04336 13.3552 1.98242 12.7827 1.98242C7.51778 1.98242 3.38311 6.9646 4.79546 12.512C5.74399 16.2502 9.18502 18.7319 13.0188 18.631C13.4033 18.6205 13.7814 18.5848 14.147 18.5217C14.4124 18.4755 14.5461 18.175 14.3957 17.9523C12.9332 15.7879 12.0996 13.1844 12.0996 10.3897C12.0996 7.47101 13.0105 4.75403 14.5921 2.52456C14.6422 2.45521 14.6798 2.34805 14.6297 2.2682C14.5879 2.20306 14.5106 2.16944 14.4375 2.15263Z"
                          fill="#03041B"
                          fill-opacity="0.1"
                        ></path>
                        <path
                          d="M5.75022 22.5296C3.17414 23.036 1.48183 24.0678 0.779834 25.5723C0.184391 26.8058 0.184391 28.2368 0.779834 29.4702C1.85372 31.7985 5.31565 32.5486 6.66114 32.7398C6.93901 32.7819 7.16047 32.5423 7.13122 32.2607C6.44385 25.8056 11.9115 22.744 13.328 22.04C13.3865 22.0064 13.399 21.9581 13.3928 21.9266C13.3886 21.9055 13.3656 21.874 13.3197 21.8698C10.2568 21.811 6.96826 22.2312 5.75022 22.5296Z"
                          fill="#03041B"
                          fill-opacity="0.1"
                        ></path>
                      </svg>
                    </span>
                    <h6>4 نفر</h6>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="card card-secondary">
          <div className="card-header">
            <h5 className="card-title">لیست دوستان</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table-modern table-modern--fonts-md">
                <thead>
                  <tr>
                    <th scope="col" className="text-center">
                      کد کاربری دوستان
                    </th>
                    <th scope="col" className="text-center">
                      پاداش دریافتی (IRT)
                    </th>

                    <th scope="col" className="text-center">
                      زمان ثبت نام
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">FVGDS124L</td>
                    <td className="text-center">IRT 0.00002256</td>

                    <td className="text-center">
                      <span className="d-inline-block d-ltr">
                        01/01/01 - 00:00
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">FVGDS124L</td>
                    <td className="text-center">IRT 0.00002256</td>

                    <td className="text-center">
                      <span className="d-inline-block d-ltr">
                        01/01/01 - 00:00
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">FVGDS124L</td>
                    <td className="text-center">IRT 0.00002256</td>

                    <td className="text-center">
                      <span className="d-inline-block d-ltr">
                        01/01/01 - 00:00
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">FVGDS124L</td>
                    <td className="text-center">IRT 0.00002256</td>

                    <td className="text-center">
                      <span className="d-inline-block d-ltr">
                        01/01/01 - 00:00
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default AddFriends;
