import Footer from "layouts/Landing/Footer";

import style from "assets/scss/landing/home.module.scss";

export default function NotFound() {
  return (
    <div className={style.wrapper}>
      <main className={style["not-found"]}>
        <div className="d-flex align-items-center  flex-column justify-content-center pt-5">
          <img
            src="https://help.arsonex.com/wp-content/themes/blog-theme/assets/img/404.svg"
            alt=""
            className="404"
          />
          <h4 className="text-white mt-5">
            صفحه یا مطلب مورد نظر شما یافت نشد
          </h4>
          <p className="text-white mt-4 px-5 text-center">
            شما &zwnj;می&zwnj;توانید در مرکز راهنمایی آرسونیکس به مطالب بیشتری
            دسترسی پیدا کنید.
          </p>
          <a href="https://help.arsonex.com/" className="btn btn-primary mt-3">
            مرکز راهنمایی
          </a>
          <a className="text-white mt-4 d-flex" href="https://arsonex.com">
            <span>بازگشت به صفحه اصلی</span>
            <svg
              style={{ width: "18px", paddingRight: "3px" }}
              xmlns="http://www.w3.org/2000/svg"
              fill="#fff"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
              />
            </svg>
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
