import {
  header__profile,
  header__profile__btn,
  header__profile__list,
  header__profile__overlay,
  profile__open,
} from "assets/scss/dashboard/dashboard.module.scss";
import LogoutIcon from "components/Icons/LogoutIcon";
import useAuth from "hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "store/hooks";
import { useState } from "react";

const MobileProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { firstName } = useAppSelector((state) => state.user);

  return (
    <div className={header__profile}>
      <span
        className={header__profile__btn}
        onClick={() => setIsOpen((oldVal) => !oldVal)}
      >
        {firstName[0]}
      </span>
      <div
        className={`${header__profile__list} ${isOpen ? profile__open : ""}`}
      >
        <Link to="/dashboard/profile" onClick={() => setIsOpen(false)}>
          پروفایل کاربری
        </Link>
        <a
          onClick={async () => {
            setIsOpen(false);
            await logout().then(() => navigate("/login"));
          }}
        >
          <LogoutIcon />
          خروج
        </a>
      </div>
      {isOpen && (
        <div
          className={header__profile__overlay}
          onClick={() => {
            console.log("click");

            setIsOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default MobileProfile;
