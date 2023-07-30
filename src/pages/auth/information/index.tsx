import { useState } from "react";
import { Input } from "antd";
import SelectComponent from "../../../components/Select";
import {
  generateLabelValueArray,
  generatePersianMonths,
} from "../../../helpers";
import { CiMobile2, CiUser, CiMail } from "react-icons/ci";
import { LiaIdCardSolid } from "react-icons/lia";
import "./styles.css";
import HeadAuth from "../../../components/layout/headAuth";

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
        <HeadAuth />
        <section className="auth auth-signup">
          <div className="card auth-card auth-card--bordered">
            <div className="card-body">
              <h4 className="auth-title">اطلاعات هویتی</h4>
              <p className="auth-text">اطلاعات هویتی خود را تکمیل کنید</p>
              <form action="" className="auth-form" onSubmit={handleSubmit}>
                <div className="mb-2">
                  <Input
                    type="email"
                    id="input1"
                    placeholder="نام "
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    size="large"
                    prefix={<CiUser size={20} />}
                    style={{ padding: "10px", height: "50px" }}
                  />
                </div>
                <div className="mb-2">
                  <Input
                    type="email"
                    id="input1"
                    placeholder=" نام خانوادگی"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    size="large"
                    prefix={<CiUser size={20} />}
                    style={{ padding: "10px", height: "50px" }}
                  />
                </div>
                <div className="mb-2">
                  <Input
                    type="text"
                    id="input2"
                    placeholder=" کدملی  "
                    value={nationalCode}
                    onChange={(e) => setNationalCode(e.target.value)}
                    size="large"
                    prefix={<LiaIdCardSolid size={20} />}
                    style={{ padding: "10px", height: "50px" }}
                  />
                </div>
                <div className="mb-2">
                    <div className="row">
                      <div className="col-lg-4">
                        <SelectComponent
                          id="inputYear"
                          placeholder="سال"
                          value={year}
                          handleChange={(val) => setYear(val)}
                          size="large"
                          options={generateLabelValueArray(1302, 1402)}
                        />
                      </div>
                      <div className="col-lg-4">
                        <SelectComponent
                          id="inputYear"
                          placeholder="ماه"
                          value={month}
                          handleChange={(val) => setMonth(val)}
                          size="large"
                          options={generatePersianMonths()}
                        />
                      </div>
                      <div className="col-lg-4">
                        <SelectComponent
                          id="inputYear"
                          placeholder="روز"
                          value={day}
                          handleChange={(val) => setDay(val)}
                          size="large"
                          options={generateLabelValueArray(1, 31)}
                        />
                      </div>
                    </div>
                </div>
                <div className="mb-2">
                  <Input
                    type="text"
                    id="input4"
                    placeholder="شماره تلفن ایران"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    size="large"
                    prefix={<CiMobile2 size={20} />}
                    style={{
                      padding: "10px",
                      height: "50px",
                      color: "#000",
                      fontFamily: " IRANYekanX",
                    }}
                  />
                </div>
                <div className="mb-2">
                  <Input
                    style={{
                      padding: "10px",
                      height: "50px",
                      color: "#000",
                      fontFamily: " IRANYekanX",
                    }}
                    type="email"
                    id="input1"
                    placeholder="ایمیل"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    size="large"
                    prefix={<CiMail size={20} />}
                  />
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
