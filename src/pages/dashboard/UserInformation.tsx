import React, { useEffect, useState } from "react";
import { Button, Card, CardBody } from "reactstrap";

import { CiEdit } from "react-icons/ci";
import { RxCalendar } from "react-icons/rx";
import { useAppSelector } from "store/hooks";
import useSession from "services/auth/session";
import moment from "jalali-moment";

import User1 from "assets/img/level-1.svg";
import User2 from "assets/img/level-2.svg";

import dashboard from "assets/scss/dashboard/dashboard.module.scss";

export default function UserInformation() {
  const { firstName, lastName, secondTierVerified } = useAppSelector(
    (state) => state.user,
  );
  const [lastSession, setLastSession] = useState("");

  const session = useSession();
  const getSession = async () => {
    try {
      await session.mutateAsync({}).then((res) => {
        const transformedArray = res.map((item) => {
          return item;
        });
        const lastItem = transformedArray[transformedArray.length - 1];
        setLastSession(
          moment(lastItem.createdAt).locale("fa").format(" DD MMMM YYYY"),
        );
      });
    } catch (err) {}
  };

  useEffect(() => {
    getSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className={dashboard["user-summary"]}>
      <CardBody className={dashboard["user-summary__body"]}>
        <ul>
          <li className={dashboard["user-summary__avatar"]}>
            <span>{firstName?.[0]}</span>
          </li>
          <li className={dashboard["user-summary__edit"]}>
            <h6>{firstName + " " + lastName}</h6>
            <Button
              className="profile-btn"
              outline
              color="secondary"
              href="/dashboard/profile"
            >
              <CiEdit />
              پروفایل کاربری
            </Button>
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
                  <a href="/dashboard/profile" style={{ color: "#111bff" }}>
                    ارتقا سطح
                  </a>
                </span>
              )}
            </div>
          </li>
        </ul>
      </CardBody>
    </Card>
  );
}
