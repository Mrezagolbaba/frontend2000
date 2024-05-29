import User1 from "assets/img/level-1.svg";
import User2 from "assets/img/level-2.svg";
import moment from "jalali-moment";
import { Card, CardBody } from "reactstrap";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import { RxCalendar } from "react-icons/rx";
import { useAppSelector } from "store/hooks";
import { useEffect, useState } from "react";
import { useGetSessionQuery } from "store/api/auth";

import dashboard from "assets/scss/dashboard/dashboard.module.scss";

export default function UserInformation() {
  // ==============|| States ||================= //
  const [lastSession, setLastSession] = useState("");

  // ==============|| Hooks ||================= //
  const { firstName, lastName, secondTierVerified } = useAppSelector(
    (state) => state.user,
  );
  const { data, isSuccess } = useGetSessionQuery({});

  // ==============|| Life Cycle ||================= //
  useEffect(() => {
    if (isSuccess && data) {
      const lastItem = data[data.length - 1];
      setLastSession(
        moment(lastItem.createdAt).locale("fa").format("hh:mm YYYY/MM/DD"),
      );
    }
  }, [data, isSuccess]);

  // ==============|| Render ||================= //
  return (
    <Card className={dashboard["user-summary"]}>
      <CardBody className={dashboard["user-summary__body"]}>
        <ul>
          <li className={dashboard["user-summary__avatar"]}>
            <span>{firstName?.[0]}</span>
          </li>
          <li className={dashboard["user-summary__edit"]}>
            <h6>{firstName + " " + lastName}</h6>
            <Link
              className="btn btn-outline-secondary profile-btn"
              to="/dashboard/profile"
            >
              <CiEdit />
              پروفایل کاربری
            </Link>
          </li>
          <li className={dashboard["user-summary__last-seen"]}>
            <h6>آخرین ورود</h6>
            <div>
              <RxCalendar />
              {lastSession}
            </div>
          </li>
          <li className={dashboard["user-summary__level"]}>
            <h6> سطح احراز هویت شما</h6>
            <div className="user-summary-date">
              {secondTierVerified ? (
                <img
                  src={User2}
                  alt=""
                  style={{ width: "20px", marginLeft: "5px" }}
                />
              ) : (
                <img
                  src={User1}
                  alt=""
                  style={{ width: "20px", marginLeft: "5px" }}
                />
              )}
              {secondTierVerified ? (
                <span>سطح دو</span>
              ) : (
                <span>
                  <span>سطح یک</span>{" "}
                  <Link
                    to="/dashboard/profile#kyc-section"
                    style={{ color: "#111bff" }}
                  >
                    ارتقا سطح
                  </Link>
                </span>
              )}
            </div>
          </li>
        </ul>
      </CardBody>
    </Card>
  );
}
