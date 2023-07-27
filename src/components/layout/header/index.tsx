import Wallet from "../../../assets/img/logo-wallex.png";
import Notifications from "../../../assets/img/icons/notification.svg";

interface Props {
  onSidebarToggle: () => void;
}

const DashboardHeader = ({onSidebarToggle}:Props) => {
  return (
    <header className="header">
      <div className="card">
        <div className="card-body">
          <div className="header__logo">
            <a href="#">
              <img src={Wallet} alt="" className="logo" />
            </a>
          </div>
          <ul className="header-navbar">
            <li>
              <a href="/market">بازارها</a>
            </li>

            <li>
              <a href="/fast-buy-sell">خرید و فروش سریع</a>
            </li>
          </ul>
          <div className="header__support">
            <a href="/support" className="">
              <span className="icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0 10.015C0 4.74712 4.21 0 10.02 0C15.7 0 20 4.65699 20 9.98498C20 16.1642 14.96 20 10 20C8.36 20 6.54 19.5593 5.08 18.698C4.57 18.3876 4.14 18.1572 3.59 18.3375L1.57 18.9384C1.06 19.0986 0.6 18.698 0.75 18.1572L1.42 15.9139C1.53 15.6034 1.51 15.2729 1.35 15.0125C0.49 13.4301 0 11.6975 0 10.015ZM8.7 10.015C8.7 10.7261 9.27 11.2969 9.98 11.307C10.69 11.307 11.26 10.7261 11.26 10.025C11.26 9.31397 10.69 8.74311 9.98 8.74311C9.28 8.7331 8.7 9.31397 8.7 10.015ZM13.31 10.025C13.31 10.7261 13.88 11.307 14.59 11.307C15.3 11.307 15.87 10.7261 15.87 10.025C15.87 9.31397 15.3 8.74311 14.59 8.74311C13.88 8.74311 13.31 9.31397 13.31 10.025ZM5.37 11.307C4.67 11.307 4.09 10.7261 4.09 10.025C4.09 9.31397 4.66 8.74311 5.37 8.74311C6.08 8.74311 6.65 9.31397 6.65 10.025C6.65 10.7261 6.08 11.2969 5.37 11.307Z"
                    fill="#03041B"
                  />
                </svg>
              </span>
              پشتیبانی
            </a>
          </div>
          <div className="header__setting">
            <a href="/setting">
              <span className="icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18.4023 11.5801C18.7599 11.7701 19.0359 12.0701 19.23 12.3701C19.6082 12.9901 19.5775 13.7501 19.2096 14.4201L18.4942 15.6201C18.1161 16.2601 17.411 16.6601 16.6854 16.6601C16.3277 16.6601 15.9291 16.5601 15.6021 16.3601C15.3364 16.1901 15.0298 16.1301 14.7028 16.1301C13.691 16.1301 12.8428 16.9601 12.8121 17.9501C12.8121 19.1001 11.8719 20.0001 10.6967 20.0001H9.30683C8.12136 20.0001 7.18116 19.1001 7.18116 17.9501C7.16072 16.9601 6.3125 16.1301 5.30076 16.1301C4.96351 16.1301 4.65693 16.1901 4.40144 16.3601C4.07441 16.5601 3.66563 16.6601 3.31816 16.6601C2.58235 16.6601 1.8772 16.2601 1.49908 15.6201L0.793928 14.4201C0.415804 13.7701 0.395365 12.9901 0.773489 12.3701C0.937002 12.0701 1.24359 11.7701 1.59106 11.5801C1.8772 11.4401 2.06116 11.2101 2.23489 10.9401C2.74587 10.0801 2.43928 8.95011 1.57062 8.44011C0.558878 7.87011 0.231852 6.60011 0.814367 5.61011L1.49908 4.43011C2.09181 3.44011 3.35904 3.09011 4.381 3.67011C5.2701 4.15011 6.42491 3.83011 6.94611 2.98011C7.10962 2.70011 7.2016 2.40011 7.18116 2.10011C7.16072 1.71011 7.27314 1.34011 7.46731 1.04011C7.84543 0.420107 8.53015 0.0201068 9.27617 0.000106812H10.7171C11.4734 0.000106812 12.1581 0.420107 12.5362 1.04011C12.7202 1.34011 12.8428 1.71011 12.8121 2.10011C12.7917 2.40011 12.8837 2.70011 13.0472 2.98011C13.5684 3.83011 14.7232 4.15011 15.6225 3.67011C16.6343 3.09011 17.9117 3.44011 18.4942 4.43011L19.1789 5.61011C19.7717 6.60011 19.4447 7.87011 18.4227 8.44011C17.554 8.95011 17.2474 10.0801 17.7686 10.9401C17.9322 11.2101 18.1161 11.4401 18.4023 11.5801ZM7.10962 10.0101C7.10962 11.5801 8.40751 12.8301 10.012 12.8301C11.6165 12.8301 12.8837 11.5801 12.8837 10.0101C12.8837 8.44011 11.6165 7.18011 10.012 7.18011C8.40751 7.18011 7.10962 8.44011 7.10962 10.0101Z"
                    fill="#03041B"
                  />
                </svg>
              </span>
            </a>
          </div>
          <div className="header__notification">
            <a href="/notification">
              <span className="icon">
                <img src={Notifications} alt="notification" />
              </span>
            </a>
          </div>

          <div className="header__subheader">
            <button
              className="header__hamburger-btn"
              onClick={()=>onSidebarToggle()}
            >
              <span className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Outline"
                  viewBox="0 0 24 24"
                  width="512"
                  height="512"
                >
                  <rect y="11" width="24" height="2" rx="1" />
                  <rect y="4" width="24" height="2" rx="1" />
                  <rect y="18" width="24" height="2" rx="1" />
                </svg>
              </span>
            </button>
            <button
              className="header__hamburger-btn"
              onClick={()=>onSidebarToggle()}
            >
              <span className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Outline"
                  viewBox="0 0 24 24"
                  width="512"
                  height="512"
                >
                  <rect y="11" width="24" height="2" rx="1" />
                  <rect y="4" width="24" height="2" rx="1" />
                  <rect y="18" width="24" height="2" rx="1" />
                </svg>
              </span>
            </button>
            <ul className="header-navbar" id="headerNavbar">
              <li className="header-navbar__close">
                <button
                // onclick="headerNavbar.dismiss()"
                >
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
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M13 13L1 0.999999"
                        stroke="#03041B"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </svg>
                  </span>
                </button>
              </li>
              <li>
                <a href="#">بازارها</a>
              </li>
              <li>
                <a href="#">خرید و فروش پیشرفته</a>
              </li>
              <li>
                <a href="#">خرید و فروش سریع</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};
export default DashboardHeader;
