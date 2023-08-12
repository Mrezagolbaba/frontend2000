import Layout from "layouts/dashboard";
import ImageFrame from "assets/img/image-frame.png";

const Profile = () => {
  return (
    <Layout>
      <section className="page page-profile">
        <div className="card card-secondary personal-info-card mb-4">
          <div className="card-header">
            <h5 className="card-title">اطلاعات شخصی</h5>
          </div>
          <div className="card-body">
            <div className="alert alert-primary">
              با وارد کردن اطلاعات زیر در صورتی که تمامی اطلاعات به نام شما باشد
              احراز هویت سطح یک شما به طور خودکار انجام خواهد شد
            </div>
            <div className="alert alert-danger">
              اطلاعات وارد شده با هم تطبیق ندارند، شماره موبایل وارد شده مربوط
              به کد ملی دیگری می&zwnj;باشد.{" "}
            </div>
            <div className="alert alert-success">
              احراز هویت شما با موفقیت انجام شد و هم اکنون به سطح یک کاربری
              ارتقا پیدا کرده&zwnj;اید.{" "}
            </div>
            <div className="alert alert-warning">
              در صورت تغییر شماره موبایل یا ایمیل تا ۲۴ ساعت قابلیت واریز و
              برداشت نخواهید داشت
            </div>
            <div className="alert alert-warning">
              در صورت تغییر شماره موبایل توجه داشته باشید باید خط به نام شخص
              بهزاد بابایی باشد در غیر اینصورت شماره موبایل تغییر نمی&zwnj;کند.
            </div>

            <form action="" className="">
              <div className="row justify-content-center">
                <div className="col-lg-6 col-xl-5">
                  <div className="row mb-2">
                    <label className="col-lg-4 col-form-label text-end text-lg-start">
                      نام:
                    </label>
                    <div className="col-lg-8">
                      <div className="self-edit self-edit--editing">
                        <input
                          type="text"
                          className="form-control"
                          id="input1"
                          placeholder="نام را وارد کنید"
                        />
                        <div className="self-edit-actions">
                          <button type="button" className="self-edit-cancel">
                            <span className="icon">
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M13 1L1 13"
                                  stroke="#03041B"
                                  strokeWidth="1.5"
                                  strokeOpacity=".4"
                                  strokeLinecap="round"
                                ></path>
                                <path
                                  d="M13 13L1 0.999999"
                                  stroke="#03041B"
                                  strokeWidth="1.5"
                                  strokeOpacity=".4"
                                  strokeLinecap="round"
                                ></path>
                              </svg>
                            </span>
                          </button>
                          <button type="button" className="self-edit-confirm">
                            <span className="icon">
                              <svg
                                width="12"
                                height="10"
                                viewBox="0 0 12 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4.00006 7.80007L1.20006 5.00006L0.266724 5.9334L4.00006 9.66673L12.0001 1.66673L11.0667 0.733398L4.00006 7.80007Z"
                                  fill="#0ED039"
                                ></path>
                              </svg>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-xl-5">
                  <div className="row mb-2">
                    <label className="col-lg-4 col-form-label text-end text-lg-start">
                      نام خانوادگی:
                    </label>
                    <div className="col-lg-8">
                      <div className="self-edit">
                        <input
                          type="text"
                          className="form-control"
                          id="input2"
                          placeholder="نام خانوادگی را وارد کنید"
                        />
                        <div className="self-edit-actions">
                          <button type="button" className="self-edit-pen">
                            <span className="icon">
                              <svg
                                width="13"
                                height="14"
                                viewBox="0 0 13 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M7.64116 1.7167C8.19391 1.01245 9.08716 1.0492 9.79216 1.60195L10.8347 2.41945C11.5397 2.9722 11.7894 3.82945 11.2367 4.5352L5.01991 12.4665C4.81216 12.732 4.49491 12.8887 4.15741 12.8925L1.75966 12.9232L1.21666 10.587C1.14016 10.2592 1.21666 9.9142 1.42441 9.64795L7.64116 1.7167Z"
                                  stroke="#03041B"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeOpacity=".4"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M6.47693 3.20215L10.0724 6.02065"
                                  stroke="#03041B"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeOpacity=".4"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-xl-5">
                  <div className="row mb-2">
                    <label className="col-lg-4 col-form-label text-end text-lg-start">
                      کدملی:
                    </label>
                    <div className="col-lg-8">
                      <div className="self-edit">
                        <input
                          type="text"
                          className="form-control"
                          id="input3"
                          placeholder="کدملی را وارد کنید"
                        />
                        <div className="self-edit-actions">
                          <button type="button" className="self-edit-pen">
                            <span className="icon">
                              <svg
                                width="13"
                                height="14"
                                viewBox="0 0 13 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M7.64116 1.7167C8.19391 1.01245 9.08716 1.0492 9.79216 1.60195L10.8347 2.41945C11.5397 2.9722 11.7894 3.82945 11.2367 4.5352L5.01991 12.4665C4.81216 12.732 4.49491 12.8887 4.15741 12.8925L1.75966 12.9232L1.21666 10.587C1.14016 10.2592 1.21666 9.9142 1.42441 9.64795L7.64116 1.7167Z"
                                  stroke="#03041B"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeOpacity=".4"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M6.47693 3.20215L10.0724 6.02065"
                                  stroke="#03041B"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeOpacity=".4"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-xl-5">
                  <div className="row mb-2">
                    <label className="col-lg-4 col-form-label text-end text-lg-start">
                      شماره ثابت:
                    </label>
                    <div className="col-lg-8">
                      <div className="self-edit">
                        <input
                          type="text"
                          className="form-control"
                          id="input4"
                          placeholder="شماره ثابت را وارد کنید"
                        />
                        <div className="self-edit-actions">
                          <button type="button" className="self-edit-pen">
                            <span className="icon">
                              <svg
                                width="13"
                                height="14"
                                viewBox="0 0 13 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M7.64116 1.7167C8.19391 1.01245 9.08716 1.0492 9.79216 1.60195L10.8347 2.41945C11.5397 2.9722 11.7894 3.82945 11.2367 4.5352L5.01991 12.4665C4.81216 12.732 4.49491 12.8887 4.15741 12.8925L1.75966 12.9232L1.21666 10.587C1.14016 10.2592 1.21666 9.9142 1.42441 9.64795L7.64116 1.7167Z"
                                  stroke="#03041B"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeOpacity=".4"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M6.47693 3.20215L10.0724 6.02065"
                                  stroke="#03041B"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeOpacity=".4"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-xl-5">
                  <div className="row mb-2">
                    <label className="col-lg-4 col-form-label text-end text-lg-start">
                      شماره موبایل:
                    </label>
                    <div className="col-lg-8">
                      <div className="self-edit">
                        <input
                          type="text"
                          className="form-control"
                          id="input5"
                          placeholder="شماره موبایل را وارد کنید"
                        />
                        <div className="self-edit-actions">
                          <button type="button" className="self-edit-pen">
                            <span className="icon">
                              <svg
                                width="13"
                                height="14"
                                viewBox="0 0 13 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M7.64116 1.7167C8.19391 1.01245 9.08716 1.0492 9.79216 1.60195L10.8347 2.41945C11.5397 2.9722 11.7894 3.82945 11.2367 4.5352L5.01991 12.4665C4.81216 12.732 4.49491 12.8887 4.15741 12.8925L1.75966 12.9232L1.21666 10.587C1.14016 10.2592 1.21666 9.9142 1.42441 9.64795L7.64116 1.7167Z"
                                  stroke="#03041B"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeOpacity=".4"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M6.47693 3.20215L10.0724 6.02065"
                                  stroke="#03041B"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeOpacity=".4"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-xl-5">
                  <div className="row mb-2">
                    <label className="col-lg-4 col-form-label text-end text-lg-start">
                      تاریخ تولد:
                    </label>
                    <div className="col-lg-8">
                      <div className="self-edit">
                        <input
                          type="text"
                          className="form-control"
                          id="input6"
                          placeholder="تاریخ تولد را وارد کنید"
                        />
                        <div className="self-edit-actions">
                          <button type="button" className="self-edit-pen">
                            <span className="icon">
                              <svg
                                width="13"
                                height="14"
                                viewBox="0 0 13 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M7.64116 1.7167C8.19391 1.01245 9.08716 1.0492 9.79216 1.60195L10.8347 2.41945C11.5397 2.9722 11.7894 3.82945 11.2367 4.5352L5.01991 12.4665C4.81216 12.732 4.49491 12.8887 4.15741 12.8925L1.75966 12.9232L1.21666 10.587C1.14016 10.2592 1.21666 9.9142 1.42441 9.64795L7.64116 1.7167Z"
                                  stroke="#03041B"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeOpacity=".4"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M6.47693 3.20215L10.0724 6.02065"
                                  stroke="#03041B"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeOpacity=".4"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 col-xl-10">
                  <div className="row">
                    <label className="col-lg-2 col-form-label text-end text-lg-start">
                      آدرس منزل:
                    </label>
                    <div className="col-lg-10">
                      <div className="self-edit">
                        <textarea
                          name=""
                          id="input7"
                          className="form-control"
                          placeholder="آدرس منزل را وارد کنید"
                        ></textarea>
                        <div className="self-edit-actions">
                          <button type="button" className="self-edit-pen">
                            <span className="icon">
                              <svg
                                width="13"
                                height="14"
                                viewBox="0 0 13 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M7.64116 1.7167C8.19391 1.01245 9.08716 1.0492 9.79216 1.60195L10.8347 2.41945C11.5397 2.9722 11.7894 3.82945 11.2367 4.5352L5.01991 12.4665C4.81216 12.732 4.49491 12.8887 4.15741 12.8925L1.75966 12.9232L1.21666 10.587C1.14016 10.2592 1.21666 9.9142 1.42441 9.64795L7.64116 1.7167Z"
                                  stroke="#03041B"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeOpacity=".4"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M6.47693 3.20215L10.0724 6.02065"
                                  stroke="#03041B"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeOpacity=".4"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="card card-secondary banking-info-card mb-4">
          <div className="card-header">
            <h5 className="card-title">اطلاعات بانکی</h5>
          </div>
          <div className="card-body">
            <div className="alert alert-warning">
              تنها حساب&zwnj;هایی که به نام بهزاد بابایی باشند قابلیت اضافه شدن
              را دارند، در نظر داشته باشید واریز و برداشت فقط از طریق حساب هایی
              که معرفی می&zwnj;کنید امکان پذیر خواهد بود.{" "}
            </div>

            <div className="bank-account">
              <label className="">شماره شبا:</label>
              <div className="iban-input-control">
                <span>IR</span>
                <input
                  type="text"
                  className="form-control d-ltr"
                  id="input21"
                  placeholder=""
                />
              </div>
              <label className="">شماره کارت:</label>
              <input
                type="text"
                className="form-control d-ltr"
                id="input22"
                placeholder=""
              />
              <div className="bank-account-actions">
                <button type="button" className="bank-account-cancel">
                  <span className="icon">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13 1L1 13"
                        stroke="#03041B"
                        strokeWidth="1.5"
                        strokeOpacity=".4"
                        strokeLinecap="round"
                      ></path>
                      <path
                        d="M13 13L1 0.999999"
                        stroke="#03041B"
                        strokeWidth="1.5"
                        strokeOpacity=".4"
                        strokeLinecap="round"
                      ></path>
                    </svg>
                  </span>
                </button>
                <button type="button" className="bank-account-remove">
                  <span className="icon">
                    <svg
                      width="19"
                      height="20"
                      viewBox="0 0 19 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.3249 7.46875C16.3249 7.46875 15.7819 14.2037 15.4669 17.0407C15.3169 18.3957 14.4799 19.1898 13.1089 19.2148C10.4999 19.2618 7.88791 19.2648 5.27991 19.2098C3.96091 19.1828 3.13791 18.3788 2.99091 17.0478C2.67391 14.1858 2.13391 7.46875 2.13391 7.46875"
                        stroke="#FF1F11"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M17.7082 4.24023H0.750214"
                        stroke="#FF1F11"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M14.4406 4.23998C13.6556 4.23998 12.9796 3.68498 12.8256 2.91598L12.5826 1.69998C12.4326 1.13898 11.9246 0.750977 11.3456 0.750977H7.11261C6.53361 0.750977 6.02561 1.13898 5.87561 1.69998L5.63261 2.91598C5.47861 3.68498 4.80261 4.23998 4.01761 4.23998"
                        stroke="#FF1F11"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </span>
                </button>
                <button type="button" className="bank-account-confirm">
                  <span className="icon">
                    <svg
                      width="12"
                      height="10"
                      viewBox="0 0 12 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.00006 7.80007L1.20006 5.00006L0.266724 5.9334L4.00006 9.66673L12.0001 1.66673L11.0667 0.733398L4.00006 7.80007Z"
                        fill="#0ED039"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
            <div className="bank-account">
              <label className="">شماره شبا:</label>
              <div className="iban-input-control">
                <span>IR</span>
                <input
                  type="text"
                  className="form-control d-ltr"
                  id="input23"
                  placeholder=""
                />
              </div>
              <label className="">شماره کارت:</label>
              <input
                type="text"
                className="form-control d-ltr"
                id="input24"
                placeholder=""
              />
              <div className="bank-account-actions">
                <button type="button" className="bank-account-pen">
                  <span className="icon">
                    <svg
                      width="13"
                      height="14"
                      viewBox="0 0 13 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.64116 1.7167C8.19391 1.01245 9.08716 1.0492 9.79216 1.60195L10.8347 2.41945C11.5397 2.9722 11.7894 3.82945 11.2367 4.5352L5.01991 12.4665C4.81216 12.732 4.49491 12.8887 4.15741 12.8925L1.75966 12.9232L1.21666 10.587C1.14016 10.2592 1.21666 9.9142 1.42441 9.64795L7.64116 1.7167Z"
                        stroke="#03041B"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeOpacity=".4"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M6.47693 3.20215L10.0724 6.02065"
                        stroke="#03041B"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeOpacity=".4"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
            <div className="bank-account">
              <label className="">شماره شبا:</label>
              <div className="iban-input-control">
                <span>IR</span>
                <input
                  type="text"
                  className="form-control d-ltr"
                  id="input25"
                  placeholder=""
                />
              </div>
              <label className="">شماره کارت:</label>
              <input
                type="text"
                className="form-control d-ltr"
                id="input26"
                placeholder=""
              />
              <div className="bank-account-actions">
                <button type="button" className="bank-account-pen">
                  <span className="icon">
                    <svg
                      width="13"
                      height="14"
                      viewBox="0 0 13 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.64116 1.7167C8.19391 1.01245 9.08716 1.0492 9.79216 1.60195L10.8347 2.41945C11.5397 2.9722 11.7894 3.82945 11.2367 4.5352L5.01991 12.4665C4.81216 12.732 4.49491 12.8887 4.15741 12.8925L1.75966 12.9232L1.21666 10.587C1.14016 10.2592 1.21666 9.9142 1.42441 9.64795L7.64116 1.7167Z"
                        stroke="#03041B"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeOpacity=".4"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M6.47693 3.20215L10.0724 6.02065"
                        stroke="#03041B"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeOpacity=".4"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>

            <div className="banking-info-card__action">
              <button className="btn-simple">اضافه کردن حساب جدید</button>
            </div>
          </div>
        </div>
        <div className="card card-secondary banking-info-card mb-4">
          <div className="card-header">
            <h5 className="card-title">اطلاعات بانکی بین&zwnj;المللی</h5>
          </div>
          <div className="card-body">
            <div className="alert alert-warning">
              تنها حساب&zwnj;هایی که به نام بهزاد بابایی باشند قابلیت اضافه شدن
              را دارند، در نظر داشته باشید واریز و برداشت فقط از طریق حساب هایی
              که معرفی می&zwnj;کنید امکان پذیر خواهد بود.{" "}
            </div>

            <div className="bank-account">
              <label className="">شماره شبا:</label>
              <div className="iban-input-control">
                <span>IR</span>
                <input
                  type="text"
                  className="form-control d-ltr"
                  id="input21"
                  placeholder=""
                />
              </div>
              <label className="">نام بانک:</label>
              <div className="col-lg-5">
                <div className="dropdown bootstrap-select bs-select-control bs-form-select">
                  <select
                    name=""
                    id="inputCardNum"
                    className="bs-select-control bs-form-select"
                  >
                    <option value="2">TRC20 (ترون - TRON)</option>
                  </select>
                  <button
                    type="button"
                    className="btn dropdown-toggle btn-light"
                    data-bs-toggle="dropdown"
                    role="combobox"
                    aria-owns="bs-select-1"
                    aria-haspopup="listbox"
                    aria-expanded="false"
                    title="TRC20 (ترون - TRON)"
                    data-id="inputCardNum"
                  >
                    <div className="filter-option">
                      <div className="filter-option-inner">
                        <div className="filter-option-inner-inner">
                          ZIRAAT BANKASI
                        </div>
                      </div>{" "}
                    </div>
                  </button>
                  <div
                    className="dropdown-menu"
                    style={{
                      maxHeight: "205.031px",
                      overflow: "hidden",
                      minHeight: "0px",
                    }}
                  >
                    <div
                      className="inner show"
                      role="listbox"
                      id="bs-select-1"
                      aria-activedescendant="bs-select-1-0"
                      style={{
                        maxHeight: "195.031px",
                        overflow: " hidden auto",
                        minHeight: "0px",
                      }}
                    >
                      <ul
                        className="dropdown-menu inner show"
                        role="presentation"
                        style={{ marginTop: "0px", marginBottom: "0px" }}
                      >
                        <li className="selected active">
                          {/* <a
                            role="option"
                            className="dropdown-item active selected"
                            id="bs-select-1-0"
                            aria-setsize="1"
                            aria-posinset="1"
                            aria-selected="true"
                          >
                            <span className="text">IS BANKASI</span>
                          </a> */}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bank-account-actions">
                <button type="button" className="bank-account-cancel">
                  <span className="icon">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13 1L1 13"
                        stroke="#03041B"
                        strokeWidth="1.5"
                        strokeOpacity=".4"
                        strokeLinecap="round"
                      ></path>
                      <path
                        d="M13 13L1 0.999999"
                        stroke="#03041B"
                        strokeWidth="1.5"
                        strokeOpacity=".4"
                        strokeLinecap="round"
                      ></path>
                    </svg>
                  </span>
                </button>
                <button type="button" className="bank-account-remove">
                  <span className="icon">
                    <svg
                      width="19"
                      height="20"
                      viewBox="0 0 19 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.3249 7.46875C16.3249 7.46875 15.7819 14.2037 15.4669 17.0407C15.3169 18.3957 14.4799 19.1898 13.1089 19.2148C10.4999 19.2618 7.88791 19.2648 5.27991 19.2098C3.96091 19.1828 3.13791 18.3788 2.99091 17.0478C2.67391 14.1858 2.13391 7.46875 2.13391 7.46875"
                        stroke="#FF1F11"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M17.7082 4.24023H0.750214"
                        stroke="#FF1F11"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M14.4406 4.23998C13.6556 4.23998 12.9796 3.68498 12.8256 2.91598L12.5826 1.69998C12.4326 1.13898 11.9246 0.750977 11.3456 0.750977H7.11261C6.53361 0.750977 6.02561 1.13898 5.87561 1.69998L5.63261 2.91598C5.47861 3.68498 4.80261 4.23998 4.01761 4.23998"
                        stroke="#FF1F11"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </span>
                </button>
                <button type="button" className="bank-account-confirm">
                  <span className="icon">
                    <svg
                      width="12"
                      height="10"
                      viewBox="0 0 12 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.00006 7.80007L1.20006 5.00006L0.266724 5.9334L4.00006 9.66673L12.0001 1.66673L11.0667 0.733398L4.00006 7.80007Z"
                        fill="#0ED039"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
            <div className="bank-account">
              <label className="">شماره شبا:</label>
              <div className="iban-input-control">
                <span>IR</span>
                <input
                  type="text"
                  className="form-control d-ltr"
                  id="input23"
                  placeholder=""
                />
              </div>
              <label className="">نام بانک</label>
              <div className="col-lg-5">
                <div className="dropdown bootstrap-select bs-select-control bs-form-select">
                  <select
                    name=""
                    id="inputCardNum"
                    className="bs-select-control bs-form-select"
                  >
                    <option value="2">TRC20 (ترون - TRON)</option>
                  </select>
                  <button
                    type="button"
                    className="btn dropdown-toggle btn-light"
                    data-bs-toggle="dropdown"
                    role="combobox"
                    aria-owns="bs-select-1"
                    aria-haspopup="listbox"
                    aria-expanded="false"
                    title="TRC20 (ترون - TRON)"
                    data-id="inputCardNum"
                  >
                    <div className="filter-option">
                      <div className="filter-option-inner">
                        <div className="filter-option-inner-inner">
                          ZIRAAT BANKASI
                        </div>
                      </div>
                    </div>
                  </button>
                  <div
                    className="dropdown-menu"
                    style={{
                      maxHeight: " 205.031px",
                      overflow: "hidden",
                      minHeight: "0px",
                    }}
                  >
                    <div
                      className="inner show"
                      role="listbox"
                      id="bs-select-1"
                      aria-activedescendant="bs-select-1-0"
                      style={{
                        maxHeight: "195.031px",
                        overflow: "hidden auto",
                        minHeight: "0px",
                      }}
                    >
                      <ul
                        className="dropdown-menu inner show"
                        role="presentation"
                        style={{ marginTop: "0px", marginBottom: "0px" }}
                      >
                        <li className="selected active">
                          {/* <a role="option" className="dropdown-item active selected" id="bs-select-1-0"  aria-setsize="1" aria-posinset="1" aria-selected="true">
                                    <span className="text">IS BANKASI</span>
                                    </a> */}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bank-account-actions">
                <button type="button" className="bank-account-pen">
                  <span className="icon">
                    <svg
                      width="13"
                      height="14"
                      viewBox="0 0 13 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.64116 1.7167C8.19391 1.01245 9.08716 1.0492 9.79216 1.60195L10.8347 2.41945C11.5397 2.9722 11.7894 3.82945 11.2367 4.5352L5.01991 12.4665C4.81216 12.732 4.49491 12.8887 4.15741 12.8925L1.75966 12.9232L1.21666 10.587C1.14016 10.2592 1.21666 9.9142 1.42441 9.64795L7.64116 1.7167Z"
                        stroke="#03041B"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeOpacity=".4"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M6.47693 3.20215L10.0724 6.02065"
                        stroke="#03041B"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeOpacity=".4"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>

            <div className="banking-info-card__action">
              <button className="btn-simple">اضافه کردن حساب جدید</button>
            </div>
          </div>
        </div>

        <div className="card-body">
          <div className="row">
            <div className="card card-secondary authentication-card mt-5">
              <div className="card-header">
                <h5 className="card-title">احراز هویت سطح دو</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-xl-6 col-lg-3">
                    <div className="alert alert-primary mb-2">
                      یک مدرک هویتی معتبر ایران مانند پاسپورت، کارت ملی یا
                      شناسنامه برای ما ارسال کنید. لطفا توجه داشته باشید که عکس
                      تار و یا بی کیفیت نباشد.{" "}
                    </div>
                    <div className="alert alert-warning mt-2 mb-2">
                      در صورتی که قصد برداشت پول به مقصد حساب&zwnj;های
                      بین&zwnj;المللی را دارید باید کارت اقامت کشوری که در آن
                      ساکن هستید را برای ما ارسال کنید.{" "}
                    </div>
                    <div className="alert alert-warning mt-2">
                      در صورت نداشتن کارت اقامت یا سوال درباره احراز هویت از
                      طریق تیکت یا چت آنلاین با ما گفتگو کنید.{" "}
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-3">
                    <div className="text-center">
                      <div className="alert alert-success mb-2">
                        تصویر تعهدنامه ارسالی تایید شد.{" "}
                      </div>
                      <div className="col-lg-12 mt-3">
                        <div className="file-picker-control">
                          <label>
                            <span className="icon">
                              <svg
                                width="16"
                                height="18"
                                viewBox="0 0 16 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M10.2803 1.30176H4.73699C3.02116 1.30176 1.54199 2.69259 1.54199 4.40926V13.3568C1.54199 15.1701 2.92366 16.5959 4.73699 16.5959H11.3937C13.1103 16.5959 14.502 15.0734 14.502 13.3568V5.69842L10.2803 1.30176Z"
                                  stroke="#03041B"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M10.0613 1.29199V3.71616C10.0613 4.89949 11.0188 5.85949 12.2021 5.86199C13.2988 5.86449 14.4213 5.86533 14.4971 5.86033"
                                  stroke="#03041B"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M7.7006 6.86719V12.3447"
                                  stroke="#03041B"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M5.33521 9.24302L7.70021 6.86719L10.066 9.24302"
                                  stroke="#03041B"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                              </svg>
                            </span>
                            آپلود کارت ملی
                          </label>
                          <input type="file" id="inputFile" />
                        </div>
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-small wth-100 mt-2"
                        >
                          ارسال کارت ملی
                        </button>
                        <div className="alert alert-danger mt-2 mb-3">
                          مدرک ارسالی مورد تایید قرار نگرفت مجددا ارسال نمایید.
                        </div>
                      </div>
                      <div className="col-lg-12 mt-3">
                        <div className="file-picker-control">
                          <label>
                            <span className="icon">
                              <svg
                                width="16"
                                height="18"
                                viewBox="0 0 16 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M10.2803 1.30176H4.73699C3.02116 1.30176 1.54199 2.69259 1.54199 4.40926V13.3568C1.54199 15.1701 2.92366 16.5959 4.73699 16.5959H11.3937C13.1103 16.5959 14.502 15.0734 14.502 13.3568V5.69842L10.2803 1.30176Z"
                                  stroke="#03041B"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M10.0613 1.29199V3.71616C10.0613 4.89949 11.0188 5.85949 12.2021 5.86199C13.2988 5.86449 14.4213 5.86533 14.4971 5.86033"
                                  stroke="#03041B"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M7.7006 6.86719V12.3447"
                                  stroke="#03041B"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M5.33521 9.24302L7.70021 6.86719L10.066 9.24302"
                                  stroke="#03041B"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                              </svg>
                            </span>
                            آپلود کارت اقامت
                          </label>
                          <input type="file" id="inputFile" />
                        </div>
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-small wth-100 mt-2"
                        >
                          ارسال کارت اقامت
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default Profile;
