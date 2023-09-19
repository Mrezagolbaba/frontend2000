import React from "react";
import Slider from "react-slick";

import face003 from "assets/img/people/face003.jpg";
import face002 from "assets/img/people/face002.jpg";
const commentSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  rtl: false,
  responsive: [
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      },
    },
  ],
};

const UserComments = () => {
  return (
    <section className="landing-comments">
      <div className="container">
        <div className="section-title">
          <h3 className="section-title__title">
            نظرات <span className="text-primary">کاربران</span>
          </h3>
        </div>
        <div className="comments-slider">
          <Slider {...commentSettings}>
            <div>
              <div>
                <div className="comment">
                  <div className="comment-header">
                    <div className="comment-user">
                      <img src={face003} className="avatar" />
                      <h6 className="comment-username">سارا محمدی</h6>
                    </div>
                  </div>
                  <div className="comment-body">
                    <p className="comment-text">
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ،
                      و با استفاده از طراحان گرافیک است
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div>
                <div className="comment">
                  <div className="comment-header">
                    <div className="comment-user">
                      <img src={face003} className="avatar" />
                      <h6 className="comment-username">سارا محمدی</h6>
                    </div>
                  </div>
                  <div className="comment-body">
                    <p className="comment-text">
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ،
                      و با استفاده از طراحان گرافیک است
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div>
                <div className="comment">
                  <div className="comment-header">
                    <div className="comment-user">
                      <img src={face002} className="avatar" />
                      <h6 className="comment-username">سارا محمدی</h6>
                    </div>
                  </div>
                  <div className="comment-body">
                    <p className="comment-text">
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ،
                      و با استفاده از طراحان گرافیک است
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default UserComments;
