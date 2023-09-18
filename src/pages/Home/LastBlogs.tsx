import React from "react";
import Slider from "react-slick";

const LastBlogs = () => {
  const blogSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    rtl: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className="landing-articles">
      <div className="container">
        <div className="section-title">
          <h3 className="section-title__title">
            آخرین <span className="text-primary">مطالب</span>
          </h3>
        </div>
        <div className="articles-slider">
          <Slider {...blogSettings}>
            <div className="slide-item">
              <article className="article">
                <div className="article-header">
                  <span className="icon">
                    <svg
                      width="25"
                      height="28"
                      viewBox="0 0 25 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.9544 20.6309H7.32776C6.77576 20.6309 6.32776 20.1829 6.32776 19.6309C6.32776 19.0789 6.77576 18.6309 7.32776 18.6309H16.9544C17.5064 18.6309 17.9544 19.0789 17.9544 19.6309C17.9544 20.1829 17.5064 20.6309 16.9544 20.6309Z"
                        fill="#335FFC"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.9544 15.0488H7.32776C6.77576 15.0488 6.32776 14.6008 6.32776 14.0488C6.32776 13.4968 6.77576 13.0488 7.32776 13.0488H16.9544C17.5064 13.0488 17.9544 13.4968 17.9544 14.0488C17.9544 14.6008 17.5064 15.0488 16.9544 15.0488Z"
                        fill="#335FFC"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.0006 9.48047H7.32727C6.77527 9.48047 6.32727 9.03247 6.32727 8.48047C6.32727 7.92847 6.77527 7.48047 7.32727 7.48047H11.0006C11.5526 7.48047 12.0006 7.92847 12.0006 8.48047C12.0006 9.03247 11.5526 9.48047 11.0006 9.48047Z"
                        fill="#335FFC"
                      ></path>
                      <mask
                        id="mask0_626_194"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="25"
                        height="28"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0 0.666016H24.2196V27.2124H0V0.666016Z"
                          fill="white"
                        ></path>
                      </mask>
                      <g mask="url(#mask0_626_194)">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M17.2116 2.66602L6.95963 2.67135C3.85563 2.69002 1.99963 4.61002 1.99963 7.80868V20.07C1.99963 23.29 3.87297 25.2127 7.00763 25.2127L17.2596 25.2087C20.3636 25.19 22.2196 23.2673 22.2196 20.07V7.80868C22.2196 4.58868 20.3476 2.66602 17.2116 2.66602ZM7.00897 27.2127C2.81697 27.2127 -0.000366211 24.342 -0.000366211 20.07V7.80868C-0.000366211 3.49802 2.72897 0.696682 6.95297 0.671349L17.2103 0.666016H17.2116C21.4036 0.666016 24.2196 3.53668 24.2196 7.80868V20.07C24.2196 24.3794 21.4903 27.182 17.2663 27.2087L7.00897 27.2127Z"
                          fill="#335FFC"
                        ></path>
                      </g>
                    </svg>
                  </span>
                  <h3 className="article-title">
                    <a href="#">عنوان وبلاگ</a>
                  </h3>
                  <span className="article-date">1400/02/02</span>
                </div>
                <div className="article-body">
                  <p className="article-text">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                    با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه
                    و مجله در ستون و سطرآنچنان که لازم است،
                  </p>
                </div>
                <div className="article-footer">
                  <a href="#" className="article-more">
                    خواندن
                  </a>
                </div>
              </article>
            </div>
            <div className="slide-item">
              <article className="article">
                <div className="article-header">
                  <span className="icon">
                    <svg
                      width="25"
                      height="28"
                      viewBox="0 0 25 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.9544 20.6309H7.32776C6.77576 20.6309 6.32776 20.1829 6.32776 19.6309C6.32776 19.0789 6.77576 18.6309 7.32776 18.6309H16.9544C17.5064 18.6309 17.9544 19.0789 17.9544 19.6309C17.9544 20.1829 17.5064 20.6309 16.9544 20.6309Z"
                        fill="#335FFC"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.9544 15.0488H7.32776C6.77576 15.0488 6.32776 14.6008 6.32776 14.0488C6.32776 13.4968 6.77576 13.0488 7.32776 13.0488H16.9544C17.5064 13.0488 17.9544 13.4968 17.9544 14.0488C17.9544 14.6008 17.5064 15.0488 16.9544 15.0488Z"
                        fill="#335FFC"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.0006 9.48047H7.32727C6.77527 9.48047 6.32727 9.03247 6.32727 8.48047C6.32727 7.92847 6.77527 7.48047 7.32727 7.48047H11.0006C11.5526 7.48047 12.0006 7.92847 12.0006 8.48047C12.0006 9.03247 11.5526 9.48047 11.0006 9.48047Z"
                        fill="#335FFC"
                      ></path>
                      <mask
                        id="mask0_626_194"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="25"
                        height="28"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0 0.666016H24.2196V27.2124H0V0.666016Z"
                          fill="white"
                        ></path>
                      </mask>
                      <g mask="url(#mask0_626_194)">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M17.2116 2.66602L6.95963 2.67135C3.85563 2.69002 1.99963 4.61002 1.99963 7.80868V20.07C1.99963 23.29 3.87297 25.2127 7.00763 25.2127L17.2596 25.2087C20.3636 25.19 22.2196 23.2673 22.2196 20.07V7.80868C22.2196 4.58868 20.3476 2.66602 17.2116 2.66602ZM7.00897 27.2127C2.81697 27.2127 -0.000366211 24.342 -0.000366211 20.07V7.80868C-0.000366211 3.49802 2.72897 0.696682 6.95297 0.671349L17.2103 0.666016H17.2116C21.4036 0.666016 24.2196 3.53668 24.2196 7.80868V20.07C24.2196 24.3794 21.4903 27.182 17.2663 27.2087L7.00897 27.2127Z"
                          fill="#335FFC"
                        ></path>
                      </g>
                    </svg>
                  </span>
                  <h3 className="article-title">
                    <a href="#">عنوان وبلاگ</a>
                  </h3>
                  <span className="article-date">1400/02/02</span>
                </div>
                <div className="article-body">
                  <p className="article-text">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                    با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه
                    و مجله در ستون و سطرآنچنان که لازم است،
                  </p>
                </div>
                <div className="article-footer">
                  <a href="#" className="article-more">
                    خواندن
                  </a>
                </div>
              </article>
            </div>
            <div className="slide-item">
              <article className="article">
                <div className="article-header">
                  <span className="icon">
                    <svg
                      width="25"
                      height="28"
                      viewBox="0 0 25 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.9544 20.6309H7.32776C6.77576 20.6309 6.32776 20.1829 6.32776 19.6309C6.32776 19.0789 6.77576 18.6309 7.32776 18.6309H16.9544C17.5064 18.6309 17.9544 19.0789 17.9544 19.6309C17.9544 20.1829 17.5064 20.6309 16.9544 20.6309Z"
                        fill="#335FFC"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.9544 15.0488H7.32776C6.77576 15.0488 6.32776 14.6008 6.32776 14.0488C6.32776 13.4968 6.77576 13.0488 7.32776 13.0488H16.9544C17.5064 13.0488 17.9544 13.4968 17.9544 14.0488C17.9544 14.6008 17.5064 15.0488 16.9544 15.0488Z"
                        fill="#335FFC"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.0006 9.48047H7.32727C6.77527 9.48047 6.32727 9.03247 6.32727 8.48047C6.32727 7.92847 6.77527 7.48047 7.32727 7.48047H11.0006C11.5526 7.48047 12.0006 7.92847 12.0006 8.48047C12.0006 9.03247 11.5526 9.48047 11.0006 9.48047Z"
                        fill="#335FFC"
                      ></path>
                      <mask
                        id="mask0_626_194"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="25"
                        height="28"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0 0.666016H24.2196V27.2124H0V0.666016Z"
                          fill="white"
                        ></path>
                      </mask>
                      <g mask="url(#mask0_626_194)">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M17.2116 2.66602L6.95963 2.67135C3.85563 2.69002 1.99963 4.61002 1.99963 7.80868V20.07C1.99963 23.29 3.87297 25.2127 7.00763 25.2127L17.2596 25.2087C20.3636 25.19 22.2196 23.2673 22.2196 20.07V7.80868C22.2196 4.58868 20.3476 2.66602 17.2116 2.66602ZM7.00897 27.2127C2.81697 27.2127 -0.000366211 24.342 -0.000366211 20.07V7.80868C-0.000366211 3.49802 2.72897 0.696682 6.95297 0.671349L17.2103 0.666016H17.2116C21.4036 0.666016 24.2196 3.53668 24.2196 7.80868V20.07C24.2196 24.3794 21.4903 27.182 17.2663 27.2087L7.00897 27.2127Z"
                          fill="#335FFC"
                        ></path>
                      </g>
                    </svg>
                  </span>
                  <h3 className="article-title">
                    <a href="#">عنوان وبلاگ</a>
                  </h3>
                  <span className="article-date">1400/02/02</span>
                </div>
                <div className="article-body">
                  <p className="article-text">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                    با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه
                    و مجله در ستون و سطرآنچنان که لازم است،
                  </p>
                </div>
                <div className="article-footer">
                  <a href="#" className="article-more">
                    خواندن
                  </a>
                </div>
              </article>
            </div>
            <div className="slide-item">
              <article className="article">
                <div className="article-header">
                  <span className="icon">
                    <svg
                      width="25"
                      height="28"
                      viewBox="0 0 25 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.9544 20.6309H7.32776C6.77576 20.6309 6.32776 20.1829 6.32776 19.6309C6.32776 19.0789 6.77576 18.6309 7.32776 18.6309H16.9544C17.5064 18.6309 17.9544 19.0789 17.9544 19.6309C17.9544 20.1829 17.5064 20.6309 16.9544 20.6309Z"
                        fill="#335FFC"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.9544 15.0488H7.32776C6.77576 15.0488 6.32776 14.6008 6.32776 14.0488C6.32776 13.4968 6.77576 13.0488 7.32776 13.0488H16.9544C17.5064 13.0488 17.9544 13.4968 17.9544 14.0488C17.9544 14.6008 17.5064 15.0488 16.9544 15.0488Z"
                        fill="#335FFC"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.0006 9.48047H7.32727C6.77527 9.48047 6.32727 9.03247 6.32727 8.48047C6.32727 7.92847 6.77527 7.48047 7.32727 7.48047H11.0006C11.5526 7.48047 12.0006 7.92847 12.0006 8.48047C12.0006 9.03247 11.5526 9.48047 11.0006 9.48047Z"
                        fill="#335FFC"
                      ></path>
                      <mask
                        id="mask0_626_194"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="25"
                        height="28"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0 0.666016H24.2196V27.2124H0V0.666016Z"
                          fill="white"
                        ></path>
                      </mask>
                      <g mask="url(#mask0_626_194)">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M17.2116 2.66602L6.95963 2.67135C3.85563 2.69002 1.99963 4.61002 1.99963 7.80868V20.07C1.99963 23.29 3.87297 25.2127 7.00763 25.2127L17.2596 25.2087C20.3636 25.19 22.2196 23.2673 22.2196 20.07V7.80868C22.2196 4.58868 20.3476 2.66602 17.2116 2.66602ZM7.00897 27.2127C2.81697 27.2127 -0.000366211 24.342 -0.000366211 20.07V7.80868C-0.000366211 3.49802 2.72897 0.696682 6.95297 0.671349L17.2103 0.666016H17.2116C21.4036 0.666016 24.2196 3.53668 24.2196 7.80868V20.07C24.2196 24.3794 21.4903 27.182 17.2663 27.2087L7.00897 27.2127Z"
                          fill="#335FFC"
                        ></path>
                      </g>
                    </svg>
                  </span>
                  <h3 className="article-title">
                    <a href="#">عنوان وبلاگ</a>
                  </h3>
                  <span className="article-date">1400/02/02</span>
                </div>
                <div className="article-body">
                  <p className="article-text">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                    با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه
                    و مجله در ستون و سطرآنچنان که لازم است،
                  </p>
                </div>
                <div className="article-footer">
                  <a href="#" className="article-more">
                    خواندن
                  </a>
                </div>
              </article>
            </div>
            <div className="slide-item">
              <article className="article">
                <div className="article-header">
                  <span className="icon">
                    <svg
                      width="25"
                      height="28"
                      viewBox="0 0 25 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.9544 20.6309H7.32776C6.77576 20.6309 6.32776 20.1829 6.32776 19.6309C6.32776 19.0789 6.77576 18.6309 7.32776 18.6309H16.9544C17.5064 18.6309 17.9544 19.0789 17.9544 19.6309C17.9544 20.1829 17.5064 20.6309 16.9544 20.6309Z"
                        fill="#335FFC"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.9544 15.0488H7.32776C6.77576 15.0488 6.32776 14.6008 6.32776 14.0488C6.32776 13.4968 6.77576 13.0488 7.32776 13.0488H16.9544C17.5064 13.0488 17.9544 13.4968 17.9544 14.0488C17.9544 14.6008 17.5064 15.0488 16.9544 15.0488Z"
                        fill="#335FFC"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.0006 9.48047H7.32727C6.77527 9.48047 6.32727 9.03247 6.32727 8.48047C6.32727 7.92847 6.77527 7.48047 7.32727 7.48047H11.0006C11.5526 7.48047 12.0006 7.92847 12.0006 8.48047C12.0006 9.03247 11.5526 9.48047 11.0006 9.48047Z"
                        fill="#335FFC"
                      ></path>
                      <mask
                        id="mask0_626_194"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="25"
                        height="28"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0 0.666016H24.2196V27.2124H0V0.666016Z"
                          fill="white"
                        ></path>
                      </mask>
                      <g mask="url(#mask0_626_194)">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M17.2116 2.66602L6.95963 2.67135C3.85563 2.69002 1.99963 4.61002 1.99963 7.80868V20.07C1.99963 23.29 3.87297 25.2127 7.00763 25.2127L17.2596 25.2087C20.3636 25.19 22.2196 23.2673 22.2196 20.07V7.80868C22.2196 4.58868 20.3476 2.66602 17.2116 2.66602ZM7.00897 27.2127C2.81697 27.2127 -0.000366211 24.342 -0.000366211 20.07V7.80868C-0.000366211 3.49802 2.72897 0.696682 6.95297 0.671349L17.2103 0.666016H17.2116C21.4036 0.666016 24.2196 3.53668 24.2196 7.80868V20.07C24.2196 24.3794 21.4903 27.182 17.2663 27.2087L7.00897 27.2127Z"
                          fill="#335FFC"
                        ></path>
                      </g>
                    </svg>
                  </span>
                  <h3 className="article-title">
                    <a href="#">عنوان وبلاگ</a>
                  </h3>
                  <span className="article-date">1400/02/02</span>
                </div>
                <div className="article-body">
                  <p className="article-text">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                    با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه
                    و مجله در ستون و سطرآنچنان که لازم است،
                  </p>
                </div>
                <div className="article-footer">
                  <a href="#" className="article-more">
                    خواندن
                  </a>
                </div>
              </article>
            </div>
            <div className="slide-item">
              <article className="article">
                <div className="article-header">
                  <span className="icon">
                    <svg
                      width="25"
                      height="28"
                      viewBox="0 0 25 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.9544 20.6309H7.32776C6.77576 20.6309 6.32776 20.1829 6.32776 19.6309C6.32776 19.0789 6.77576 18.6309 7.32776 18.6309H16.9544C17.5064 18.6309 17.9544 19.0789 17.9544 19.6309C17.9544 20.1829 17.5064 20.6309 16.9544 20.6309Z"
                        fill="#335FFC"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.9544 15.0488H7.32776C6.77576 15.0488 6.32776 14.6008 6.32776 14.0488C6.32776 13.4968 6.77576 13.0488 7.32776 13.0488H16.9544C17.5064 13.0488 17.9544 13.4968 17.9544 14.0488C17.9544 14.6008 17.5064 15.0488 16.9544 15.0488Z"
                        fill="#335FFC"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.0006 9.48047H7.32727C6.77527 9.48047 6.32727 9.03247 6.32727 8.48047C6.32727 7.92847 6.77527 7.48047 7.32727 7.48047H11.0006C11.5526 7.48047 12.0006 7.92847 12.0006 8.48047C12.0006 9.03247 11.5526 9.48047 11.0006 9.48047Z"
                        fill="#335FFC"
                      ></path>
                      <mask
                        id="mask0_626_194"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="25"
                        height="28"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0 0.666016H24.2196V27.2124H0V0.666016Z"
                          fill="white"
                        ></path>
                      </mask>
                      <g mask="url(#mask0_626_194)">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M17.2116 2.66602L6.95963 2.67135C3.85563 2.69002 1.99963 4.61002 1.99963 7.80868V20.07C1.99963 23.29 3.87297 25.2127 7.00763 25.2127L17.2596 25.2087C20.3636 25.19 22.2196 23.2673 22.2196 20.07V7.80868C22.2196 4.58868 20.3476 2.66602 17.2116 2.66602ZM7.00897 27.2127C2.81697 27.2127 -0.000366211 24.342 -0.000366211 20.07V7.80868C-0.000366211 3.49802 2.72897 0.696682 6.95297 0.671349L17.2103 0.666016H17.2116C21.4036 0.666016 24.2196 3.53668 24.2196 7.80868V20.07C24.2196 24.3794 21.4903 27.182 17.2663 27.2087L7.00897 27.2127Z"
                          fill="#335FFC"
                        ></path>
                      </g>
                    </svg>
                  </span>
                  <h3 className="article-title">
                    <a href="#">عنوان وبلاگ</a>
                  </h3>
                  <span className="article-date">1400/02/02</span>
                </div>
                <div className="article-body">
                  <p className="article-text">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                    با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه
                    و مجله در ستون و سطرآنچنان که لازم است،
                  </p>
                </div>
                <div className="article-footer">
                  <a href="#" className="article-more">
                    خواندن
                  </a>
                </div>
              </article>
            </div>
            <div className="slide-item">
              <article className="article">
                <div className="article-header">
                  <span className="icon">
                    <svg
                      width="25"
                      height="28"
                      viewBox="0 0 25 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.9544 20.6309H7.32776C6.77576 20.6309 6.32776 20.1829 6.32776 19.6309C6.32776 19.0789 6.77576 18.6309 7.32776 18.6309H16.9544C17.5064 18.6309 17.9544 19.0789 17.9544 19.6309C17.9544 20.1829 17.5064 20.6309 16.9544 20.6309Z"
                        fill="#335FFC"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.9544 15.0488H7.32776C6.77576 15.0488 6.32776 14.6008 6.32776 14.0488C6.32776 13.4968 6.77576 13.0488 7.32776 13.0488H16.9544C17.5064 13.0488 17.9544 13.4968 17.9544 14.0488C17.9544 14.6008 17.5064 15.0488 16.9544 15.0488Z"
                        fill="#335FFC"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.0006 9.48047H7.32727C6.77527 9.48047 6.32727 9.03247 6.32727 8.48047C6.32727 7.92847 6.77527 7.48047 7.32727 7.48047H11.0006C11.5526 7.48047 12.0006 7.92847 12.0006 8.48047C12.0006 9.03247 11.5526 9.48047 11.0006 9.48047Z"
                        fill="#335FFC"
                      ></path>
                      <mask
                        id="mask0_626_194"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="25"
                        height="28"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0 0.666016H24.2196V27.2124H0V0.666016Z"
                          fill="white"
                        ></path>
                      </mask>
                      <g mask="url(#mask0_626_194)">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M17.2116 2.66602L6.95963 2.67135C3.85563 2.69002 1.99963 4.61002 1.99963 7.80868V20.07C1.99963 23.29 3.87297 25.2127 7.00763 25.2127L17.2596 25.2087C20.3636 25.19 22.2196 23.2673 22.2196 20.07V7.80868C22.2196 4.58868 20.3476 2.66602 17.2116 2.66602ZM7.00897 27.2127C2.81697 27.2127 -0.000366211 24.342 -0.000366211 20.07V7.80868C-0.000366211 3.49802 2.72897 0.696682 6.95297 0.671349L17.2103 0.666016H17.2116C21.4036 0.666016 24.2196 3.53668 24.2196 7.80868V20.07C24.2196 24.3794 21.4903 27.182 17.2663 27.2087L7.00897 27.2127Z"
                          fill="#335FFC"
                        ></path>
                      </g>
                    </svg>
                  </span>
                  <h3 className="article-title">
                    <a href="#">عنوان وبلاگ</a>
                  </h3>
                  <span className="article-date">1400/02/02</span>
                </div>
                <div className="article-body">
                  <p className="article-text">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                    با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه
                    و مجله در ستون و سطرآنچنان که لازم است،
                  </p>
                </div>
                <div className="article-footer">
                  <a href="#" className="article-more">
                    خواندن
                  </a>
                </div>
              </article>
            </div>
            <div className="slide-item">
              <article className="article">
                <div className="article-header">
                  <span className="icon">
                    <svg
                      width="25"
                      height="28"
                      viewBox="0 0 25 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.9544 20.6309H7.32776C6.77576 20.6309 6.32776 20.1829 6.32776 19.6309C6.32776 19.0789 6.77576 18.6309 7.32776 18.6309H16.9544C17.5064 18.6309 17.9544 19.0789 17.9544 19.6309C17.9544 20.1829 17.5064 20.6309 16.9544 20.6309Z"
                        fill="#335FFC"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.9544 15.0488H7.32776C6.77576 15.0488 6.32776 14.6008 6.32776 14.0488C6.32776 13.4968 6.77576 13.0488 7.32776 13.0488H16.9544C17.5064 13.0488 17.9544 13.4968 17.9544 14.0488C17.9544 14.6008 17.5064 15.0488 16.9544 15.0488Z"
                        fill="#335FFC"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.0006 9.48047H7.32727C6.77527 9.48047 6.32727 9.03247 6.32727 8.48047C6.32727 7.92847 6.77527 7.48047 7.32727 7.48047H11.0006C11.5526 7.48047 12.0006 7.92847 12.0006 8.48047C12.0006 9.03247 11.5526 9.48047 11.0006 9.48047Z"
                        fill="#335FFC"
                      ></path>
                      <mask
                        id="mask0_626_194"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="25"
                        height="28"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0 0.666016H24.2196V27.2124H0V0.666016Z"
                          fill="white"
                        ></path>
                      </mask>
                      <g mask="url(#mask0_626_194)">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M17.2116 2.66602L6.95963 2.67135C3.85563 2.69002 1.99963 4.61002 1.99963 7.80868V20.07C1.99963 23.29 3.87297 25.2127 7.00763 25.2127L17.2596 25.2087C20.3636 25.19 22.2196 23.2673 22.2196 20.07V7.80868C22.2196 4.58868 20.3476 2.66602 17.2116 2.66602ZM7.00897 27.2127C2.81697 27.2127 -0.000366211 24.342 -0.000366211 20.07V7.80868C-0.000366211 3.49802 2.72897 0.696682 6.95297 0.671349L17.2103 0.666016H17.2116C21.4036 0.666016 24.2196 3.53668 24.2196 7.80868V20.07C24.2196 24.3794 21.4903 27.182 17.2663 27.2087L7.00897 27.2127Z"
                          fill="#335FFC"
                        ></path>
                      </g>
                    </svg>
                  </span>
                  <h3 className="article-title">
                    <a href="#">عنوان وبلاگ</a>
                  </h3>
                  <span className="article-date">1400/02/02</span>
                </div>
                <div className="article-body">
                  <p className="article-text">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                    با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه
                    و مجله در ستون و سطرآنچنان که لازم است،
                  </p>
                </div>
                <div className="article-footer">
                  <a href="#" className="article-more">
                    خواندن
                  </a>
                </div>
              </article>
            </div>
            <div className="slide-item">
              <article className="article">
                <div className="article-header">
                  <span className="icon">
                    <svg
                      width="25"
                      height="28"
                      viewBox="0 0 25 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.9544 20.6309H7.32776C6.77576 20.6309 6.32776 20.1829 6.32776 19.6309C6.32776 19.0789 6.77576 18.6309 7.32776 18.6309H16.9544C17.5064 18.6309 17.9544 19.0789 17.9544 19.6309C17.9544 20.1829 17.5064 20.6309 16.9544 20.6309Z"
                        fill="#335FFC"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.9544 15.0488H7.32776C6.77576 15.0488 6.32776 14.6008 6.32776 14.0488C6.32776 13.4968 6.77576 13.0488 7.32776 13.0488H16.9544C17.5064 13.0488 17.9544 13.4968 17.9544 14.0488C17.9544 14.6008 17.5064 15.0488 16.9544 15.0488Z"
                        fill="#335FFC"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.0006 9.48047H7.32727C6.77527 9.48047 6.32727 9.03247 6.32727 8.48047C6.32727 7.92847 6.77527 7.48047 7.32727 7.48047H11.0006C11.5526 7.48047 12.0006 7.92847 12.0006 8.48047C12.0006 9.03247 11.5526 9.48047 11.0006 9.48047Z"
                        fill="#335FFC"
                      ></path>
                      <mask
                        id="mask0_626_194"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="25"
                        height="28"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0 0.666016H24.2196V27.2124H0V0.666016Z"
                          fill="white"
                        ></path>
                      </mask>
                      <g mask="url(#mask0_626_194)">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M17.2116 2.66602L6.95963 2.67135C3.85563 2.69002 1.99963 4.61002 1.99963 7.80868V20.07C1.99963 23.29 3.87297 25.2127 7.00763 25.2127L17.2596 25.2087C20.3636 25.19 22.2196 23.2673 22.2196 20.07V7.80868C22.2196 4.58868 20.3476 2.66602 17.2116 2.66602ZM7.00897 27.2127C2.81697 27.2127 -0.000366211 24.342 -0.000366211 20.07V7.80868C-0.000366211 3.49802 2.72897 0.696682 6.95297 0.671349L17.2103 0.666016H17.2116C21.4036 0.666016 24.2196 3.53668 24.2196 7.80868V20.07C24.2196 24.3794 21.4903 27.182 17.2663 27.2087L7.00897 27.2127Z"
                          fill="#335FFC"
                        ></path>
                      </g>
                    </svg>
                  </span>
                  <h3 className="article-title">
                    <a href="#">عنوان وبلاگ</a>
                  </h3>
                  <span className="article-date">1400/02/02</span>
                </div>
                <div className="article-body">
                  <p className="article-text">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                    با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه
                    و مجله در ستون و سطرآنچنان که لازم است،
                  </p>
                </div>
                <div className="article-footer">
                  <a href="#" className="article-more">
                    خواندن
                  </a>
                </div>
              </article>
            </div>
            <div className="slide-item">
              <article className="article">
                <div className="article-header">
                  <span className="icon">
                    <svg
                      width="25"
                      height="28"
                      viewBox="0 0 25 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.9544 20.6309H7.32776C6.77576 20.6309 6.32776 20.1829 6.32776 19.6309C6.32776 19.0789 6.77576 18.6309 7.32776 18.6309H16.9544C17.5064 18.6309 17.9544 19.0789 17.9544 19.6309C17.9544 20.1829 17.5064 20.6309 16.9544 20.6309Z"
                        fill="#335FFC"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.9544 15.0488H7.32776C6.77576 15.0488 6.32776 14.6008 6.32776 14.0488C6.32776 13.4968 6.77576 13.0488 7.32776 13.0488H16.9544C17.5064 13.0488 17.9544 13.4968 17.9544 14.0488C17.9544 14.6008 17.5064 15.0488 16.9544 15.0488Z"
                        fill="#335FFC"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.0006 9.48047H7.32727C6.77527 9.48047 6.32727 9.03247 6.32727 8.48047C6.32727 7.92847 6.77527 7.48047 7.32727 7.48047H11.0006C11.5526 7.48047 12.0006 7.92847 12.0006 8.48047C12.0006 9.03247 11.5526 9.48047 11.0006 9.48047Z"
                        fill="#335FFC"
                      ></path>
                      <mask
                        id="mask0_626_194"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="25"
                        height="28"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0 0.666016H24.2196V27.2124H0V0.666016Z"
                          fill="white"
                        ></path>
                      </mask>
                      <g mask="url(#mask0_626_194)">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M17.2116 2.66602L6.95963 2.67135C3.85563 2.69002 1.99963 4.61002 1.99963 7.80868V20.07C1.99963 23.29 3.87297 25.2127 7.00763 25.2127L17.2596 25.2087C20.3636 25.19 22.2196 23.2673 22.2196 20.07V7.80868C22.2196 4.58868 20.3476 2.66602 17.2116 2.66602ZM7.00897 27.2127C2.81697 27.2127 -0.000366211 24.342 -0.000366211 20.07V7.80868C-0.000366211 3.49802 2.72897 0.696682 6.95297 0.671349L17.2103 0.666016H17.2116C21.4036 0.666016 24.2196 3.53668 24.2196 7.80868V20.07C24.2196 24.3794 21.4903 27.182 17.2663 27.2087L7.00897 27.2127Z"
                          fill="#335FFC"
                        ></path>
                      </g>
                    </svg>
                  </span>
                  <h3 className="article-title">
                    <a href="#">عنوان وبلاگ</a>
                  </h3>
                  <span className="article-date">1400/02/02</span>
                </div>
                <div className="article-body">
                  <p className="article-text">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                    با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه
                    و مجله در ستون و سطرآنچنان که لازم است،
                  </p>
                </div>
                <div className="article-footer">
                  <a href="#" className="article-more">
                    خواندن
                  </a>
                </div>
              </article>
            </div>
            <div className="slide-item">
              <article className="article">
                <div className="article-header">
                  <span className="icon">
                    <svg
                      width="25"
                      height="28"
                      viewBox="0 0 25 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.9544 20.6309H7.32776C6.77576 20.6309 6.32776 20.1829 6.32776 19.6309C6.32776 19.0789 6.77576 18.6309 7.32776 18.6309H16.9544C17.5064 18.6309 17.9544 19.0789 17.9544 19.6309C17.9544 20.1829 17.5064 20.6309 16.9544 20.6309Z"
                        fill="#335FFC"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.9544 15.0488H7.32776C6.77576 15.0488 6.32776 14.6008 6.32776 14.0488C6.32776 13.4968 6.77576 13.0488 7.32776 13.0488H16.9544C17.5064 13.0488 17.9544 13.4968 17.9544 14.0488C17.9544 14.6008 17.5064 15.0488 16.9544 15.0488Z"
                        fill="#335FFC"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.0006 9.48047H7.32727C6.77527 9.48047 6.32727 9.03247 6.32727 8.48047C6.32727 7.92847 6.77527 7.48047 7.32727 7.48047H11.0006C11.5526 7.48047 12.0006 7.92847 12.0006 8.48047C12.0006 9.03247 11.5526 9.48047 11.0006 9.48047Z"
                        fill="#335FFC"
                      ></path>
                      <mask
                        id="mask0_626_194"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="25"
                        height="28"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0 0.666016H24.2196V27.2124H0V0.666016Z"
                          fill="white"
                        ></path>
                      </mask>
                      <g mask="url(#mask0_626_194)">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M17.2116 2.66602L6.95963 2.67135C3.85563 2.69002 1.99963 4.61002 1.99963 7.80868V20.07C1.99963 23.29 3.87297 25.2127 7.00763 25.2127L17.2596 25.2087C20.3636 25.19 22.2196 23.2673 22.2196 20.07V7.80868C22.2196 4.58868 20.3476 2.66602 17.2116 2.66602ZM7.00897 27.2127C2.81697 27.2127 -0.000366211 24.342 -0.000366211 20.07V7.80868C-0.000366211 3.49802 2.72897 0.696682 6.95297 0.671349L17.2103 0.666016H17.2116C21.4036 0.666016 24.2196 3.53668 24.2196 7.80868V20.07C24.2196 24.3794 21.4903 27.182 17.2663 27.2087L7.00897 27.2127Z"
                          fill="#335FFC"
                        ></path>
                      </g>
                    </svg>
                  </span>
                  <h3 className="article-title">
                    <a href="#">عنوان وبلاگ</a>
                  </h3>
                  <span className="article-date">1400/02/02</span>
                </div>
                <div className="article-body">
                  <p className="article-text">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                    با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه
                    و مجله در ستون و سطرآنچنان که لازم است،
                  </p>
                </div>
                <div className="article-footer">
                  <a href="#" className="article-more">
                    خواندن
                  </a>
                </div>
              </article>
            </div>
            <div className="slide-item">
              <article className="article">
                <div className="article-header">
                  <span className="icon">
                    <svg
                      width="25"
                      height="28"
                      viewBox="0 0 25 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.9544 20.6309H7.32776C6.77576 20.6309 6.32776 20.1829 6.32776 19.6309C6.32776 19.0789 6.77576 18.6309 7.32776 18.6309H16.9544C17.5064 18.6309 17.9544 19.0789 17.9544 19.6309C17.9544 20.1829 17.5064 20.6309 16.9544 20.6309Z"
                        fill="#335FFC"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.9544 15.0488H7.32776C6.77576 15.0488 6.32776 14.6008 6.32776 14.0488C6.32776 13.4968 6.77576 13.0488 7.32776 13.0488H16.9544C17.5064 13.0488 17.9544 13.4968 17.9544 14.0488C17.9544 14.6008 17.5064 15.0488 16.9544 15.0488Z"
                        fill="#335FFC"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.0006 9.48047H7.32727C6.77527 9.48047 6.32727 9.03247 6.32727 8.48047C6.32727 7.92847 6.77527 7.48047 7.32727 7.48047H11.0006C11.5526 7.48047 12.0006 7.92847 12.0006 8.48047C12.0006 9.03247 11.5526 9.48047 11.0006 9.48047Z"
                        fill="#335FFC"
                      ></path>
                      <mask
                        id="mask0_626_194"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="25"
                        height="28"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0 0.666016H24.2196V27.2124H0V0.666016Z"
                          fill="white"
                        ></path>
                      </mask>
                      <g mask="url(#mask0_626_194)">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M17.2116 2.66602L6.95963 2.67135C3.85563 2.69002 1.99963 4.61002 1.99963 7.80868V20.07C1.99963 23.29 3.87297 25.2127 7.00763 25.2127L17.2596 25.2087C20.3636 25.19 22.2196 23.2673 22.2196 20.07V7.80868C22.2196 4.58868 20.3476 2.66602 17.2116 2.66602ZM7.00897 27.2127C2.81697 27.2127 -0.000366211 24.342 -0.000366211 20.07V7.80868C-0.000366211 3.49802 2.72897 0.696682 6.95297 0.671349L17.2103 0.666016H17.2116C21.4036 0.666016 24.2196 3.53668 24.2196 7.80868V20.07C24.2196 24.3794 21.4903 27.182 17.2663 27.2087L7.00897 27.2127Z"
                          fill="#335FFC"
                        ></path>
                      </g>
                    </svg>
                  </span>
                  <h3 className="article-title">
                    <a href="#">عنوان وبلاگ</a>
                  </h3>
                  <span className="article-date">1400/02/02</span>
                </div>
                <div className="article-body">
                  <p className="article-text">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                    با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه
                    و مجله در ستون و سطرآنچنان که لازم است،
                  </p>
                </div>
                <div className="article-footer">
                  <a href="#" className="article-more">
                    خواندن
                  </a>
                </div>
              </article>
            </div>
            <div className="slide-item">
              <article className="article">
                <div className="article-header">
                  <span className="icon">
                    <svg
                      width="25"
                      height="28"
                      viewBox="0 0 25 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.9544 20.6309H7.32776C6.77576 20.6309 6.32776 20.1829 6.32776 19.6309C6.32776 19.0789 6.77576 18.6309 7.32776 18.6309H16.9544C17.5064 18.6309 17.9544 19.0789 17.9544 19.6309C17.9544 20.1829 17.5064 20.6309 16.9544 20.6309Z"
                        fill="#335FFC"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.9544 15.0488H7.32776C6.77576 15.0488 6.32776 14.6008 6.32776 14.0488C6.32776 13.4968 6.77576 13.0488 7.32776 13.0488H16.9544C17.5064 13.0488 17.9544 13.4968 17.9544 14.0488C17.9544 14.6008 17.5064 15.0488 16.9544 15.0488Z"
                        fill="#335FFC"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.0006 9.48047H7.32727C6.77527 9.48047 6.32727 9.03247 6.32727 8.48047C6.32727 7.92847 6.77527 7.48047 7.32727 7.48047H11.0006C11.5526 7.48047 12.0006 7.92847 12.0006 8.48047C12.0006 9.03247 11.5526 9.48047 11.0006 9.48047Z"
                        fill="#335FFC"
                      ></path>
                      <mask
                        id="mask0_626_194"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="25"
                        height="28"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0 0.666016H24.2196V27.2124H0V0.666016Z"
                          fill="white"
                        ></path>
                      </mask>
                      <g mask="url(#mask0_626_194)">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M17.2116 2.66602L6.95963 2.67135C3.85563 2.69002 1.99963 4.61002 1.99963 7.80868V20.07C1.99963 23.29 3.87297 25.2127 7.00763 25.2127L17.2596 25.2087C20.3636 25.19 22.2196 23.2673 22.2196 20.07V7.80868C22.2196 4.58868 20.3476 2.66602 17.2116 2.66602ZM7.00897 27.2127C2.81697 27.2127 -0.000366211 24.342 -0.000366211 20.07V7.80868C-0.000366211 3.49802 2.72897 0.696682 6.95297 0.671349L17.2103 0.666016H17.2116C21.4036 0.666016 24.2196 3.53668 24.2196 7.80868V20.07C24.2196 24.3794 21.4903 27.182 17.2663 27.2087L7.00897 27.2127Z"
                          fill="#335FFC"
                        ></path>
                      </g>
                    </svg>
                  </span>
                  <h3 className="article-title">
                    <a href="#">عنوان وبلاگ</a>
                  </h3>
                  <span className="article-date">1400/02/02</span>
                </div>
                <div className="article-body">
                  <p className="article-text">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                    با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه
                    و مجله در ستون و سطرآنچنان که لازم است،
                  </p>
                </div>
                <div className="article-footer">
                  <a href="#" className="article-more">
                    خواندن
                  </a>
                </div>
              </article>
            </div>
            <div className="slide-item">
              <article className="article">
                <div className="article-header">
                  <span className="icon">
                    <svg
                      width="25"
                      height="28"
                      viewBox="0 0 25 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.9544 20.6309H7.32776C6.77576 20.6309 6.32776 20.1829 6.32776 19.6309C6.32776 19.0789 6.77576 18.6309 7.32776 18.6309H16.9544C17.5064 18.6309 17.9544 19.0789 17.9544 19.6309C17.9544 20.1829 17.5064 20.6309 16.9544 20.6309Z"
                        fill="#335FFC"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.9544 15.0488H7.32776C6.77576 15.0488 6.32776 14.6008 6.32776 14.0488C6.32776 13.4968 6.77576 13.0488 7.32776 13.0488H16.9544C17.5064 13.0488 17.9544 13.4968 17.9544 14.0488C17.9544 14.6008 17.5064 15.0488 16.9544 15.0488Z"
                        fill="#335FFC"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.0006 9.48047H7.32727C6.77527 9.48047 6.32727 9.03247 6.32727 8.48047C6.32727 7.92847 6.77527 7.48047 7.32727 7.48047H11.0006C11.5526 7.48047 12.0006 7.92847 12.0006 8.48047C12.0006 9.03247 11.5526 9.48047 11.0006 9.48047Z"
                        fill="#335FFC"
                      ></path>
                      <mask
                        id="mask0_626_194"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="25"
                        height="28"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0 0.666016H24.2196V27.2124H0V0.666016Z"
                          fill="white"
                        ></path>
                      </mask>
                      <g mask="url(#mask0_626_194)">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M17.2116 2.66602L6.95963 2.67135C3.85563 2.69002 1.99963 4.61002 1.99963 7.80868V20.07C1.99963 23.29 3.87297 25.2127 7.00763 25.2127L17.2596 25.2087C20.3636 25.19 22.2196 23.2673 22.2196 20.07V7.80868C22.2196 4.58868 20.3476 2.66602 17.2116 2.66602ZM7.00897 27.2127C2.81697 27.2127 -0.000366211 24.342 -0.000366211 20.07V7.80868C-0.000366211 3.49802 2.72897 0.696682 6.95297 0.671349L17.2103 0.666016H17.2116C21.4036 0.666016 24.2196 3.53668 24.2196 7.80868V20.07C24.2196 24.3794 21.4903 27.182 17.2663 27.2087L7.00897 27.2127Z"
                          fill="#335FFC"
                        ></path>
                      </g>
                    </svg>
                  </span>
                  <h3 className="article-title">
                    <a href="#">عنوان وبلاگ</a>
                  </h3>
                  <span className="article-date">1400/02/02</span>
                </div>
                <div className="article-body">
                  <p className="article-text">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                    با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه
                    و مجله در ستون و سطرآنچنان که لازم است،
                  </p>
                </div>
                <div className="article-footer">
                  <a href="#" className="article-more">
                    خواندن
                  </a>
                </div>
              </article>
            </div>
          </Slider>
          <div className="articles-slider-footer">
            <div>
              <a href="#" className="btn-slider">
                همه وبلاگ ها
              </a>
            </div>
            <div className="articles-slider-navs">
              <button type="button" role="presentation" className="owl-prev">
                <span className="icon">
                  <svg
                    width="56"
                    height="56"
                    viewBox="0 0 56 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="28"
                      cy="28"
                      r="27.25"
                      stroke="#335FFC"
                      stroke-opacity="0.1"
                      stroke-width="1.5"
                    ></circle>
                    <path
                      d="M30.6666 23L36 28L30.6666 33"
                      stroke="#335FFC"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M36 28L20 28"
                      stroke="#335FFC"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </span>
              </button>
              <button type="button" role="presentation" className="owl-prev">
                <span className="icon">
                  <svg
                    width="56"
                    height="56"
                    viewBox="0 0 56 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="28"
                      cy="28"
                      r="27.25"
                      stroke="#335FFC"
                      stroke-opacity="0.1"
                      stroke-width="1.5"
                    ></circle>
                    <path
                      d="M30.6666 23L36 28L30.6666 33"
                      stroke="#335FFC"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M36 28L20 28"
                      stroke="#335FFC"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </span>
              </button>
              <button type="button" role="presentation" className="owl-next">
                <span className="icon">
                  <svg
                    width="56"
                    height="56"
                    viewBox="0 0 56 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="28"
                      cy="28"
                      r="27.25"
                      transform="rotate(-180 28 28)"
                      stroke="#335FFC"
                      stroke-opacity="0.1"
                      stroke-width="1.5"
                    ></circle>
                    <path
                      d="M25.3333 33L19.9999 28L25.3333 23"
                      stroke="#335FFC"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M20 28L36 28"
                      stroke="#335FFC"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </span>
              </button>
              <button type="button" role="presentation" className="owl-next">
                <span className="icon">
                  <svg
                    width="56"
                    height="56"
                    viewBox="0 0 56 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="28"
                      cy="28"
                      r="27.25"
                      transform="rotate(-180 28 28)"
                      stroke="#335FFC"
                      stroke-opacity="0.1"
                      stroke-width="1.5"
                    ></circle>
                    <path
                      d="M25.3333 33L19.9999 28L25.3333 23"
                      stroke="#335FFC"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M20 28L36 28"
                      stroke="#335FFC"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LastBlogs;
