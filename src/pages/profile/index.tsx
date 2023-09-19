import Layout from "layouts/dashboard";
import AuthSection from "./AuthSection";
import { useAppSelector } from "redux/hooks";
import { Col, FormGroup, Input, Label, Row } from 'reactstrap'
import { AiOutlineEdit } from "react-icons/ai";
const Profile = () => {
  const user = useAppSelector(state => state.user)
  const { firstName, lastName, nationalId, birthDate } = user;
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
                <Col lg={6} xl={5}>
                  <Row className="mb-2">
                    <Col lg={2} className="col-form-label text-end text-lg-end">
                      <Label for="input1">نام:</Label>
                    </Col>
                    <Col lg={8} className=" bg-light bg-gradient">
                      <span >{firstName}</span>
                    </Col>
                  </Row>
                </Col>
                <Col lg={6} xl={5}>
                  <Row className="mb-2">
                    <Col lg={3} className="col-form-label text-end text-lg-end">
                      <Label for="input2">نام خانوادگی:</Label>
                    </Col>
                    <Col lg={8} className=" bg-light bg-gradient">
                      <span >{lastName}</span>
                    </Col>
                  </Row>
                </Col>
                <Col lg={6} xl={5}>
                  <Row className="mb-2">
                    <Col lg={2} className="col-form-label text-end text-lg-end">
                      <Label for="input1"> کدملی:</Label>
                    </Col>
                    <Col lg={8} className=" bg-light bg-gradient">
                      <span >{nationalId}</span>
                    </Col>
                  </Row>
                </Col>
                <Col lg={6} xl={5}>
                  <Row className="mb-2">
                    <Col lg={3} className="col-form-label text-end text-lg-end">
                      <Label for="input1"> تاریخ تولد:</Label>
                    </Col>
                    <Col lg={8} className=" bg-light bg-gradient">
                      <span >{birthDate}</span>
                    </Col>
                  </Row>
                </Col>
                <Col lg={6} xl={5}>
                  <Row className="mb-2">
                    <Col lg={3} className="col-form-label text-end text-lg-end">
                      <Label for="input2"> شماره ثابت:</Label>
                    </Col>
                    <Col lg={8}>
                      <FormGroup className="d-flex align-items-center">
                        <Input
                          type="text"
                          className="form-control"
                          id="input4"
                          placeholder="شماره ثابت را وارد کنید"
                        />
                        <AiOutlineEdit size={20} />
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
                <Col lg={6} xl={5}>
                  <Row className="mb-2">
                    <Col lg={4} className="col-form-label text-end text-lg-end">
                      <Label for="input1">    شماره موبایل:</Label>
                    </Col>
                    <Col lg={8}>
                      <FormGroup className="d-flex align-items-center">
                        <Input
                          type="text"
                          className="form-control"
                          id="input4"
                          placeholder="شماره موبایل را وارد کنید"
                        />
                        <AiOutlineEdit size={20} />
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
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

        <AuthSection />
      </section>
    </Layout>
  );
};
export default Profile;
