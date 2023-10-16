import Slider from "react-slick";

import face003 from "assets/img/people/face003.jpg";
import face002 from "assets/img/people/face002.jpg";

import home from "assets/scss/landing/home.module.scss";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import { useRef } from "react";
import { Container } from "reactstrap";

const commentSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  arrows: false,
  autoPlay: true,
  responsive: [
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const carouselList = [
  {
    img: face003,
    name: "سارا محمدی",
    text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است",
  },
  {
    img: face002,
    name: "سارا محمدی",
    text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است",
  },
  {
    img: face003,
    name: "سارا محمدی",
    text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است",
  },
];

const UserComments = () => {
  const refSlider = useRef<Slider | null>(null);

  return (
    <section className={home.comments}>
      <Container>
        <div className={home["section-title"]}>
          <h3 className={home["section-title__title"]}>
            نظرات <span className="text-primary">کاربران</span>
          </h3>
        </div>
        <div className={home["comments__carousel"]}>
          <Slider {...commentSettings} ref={refSlider}>
            {carouselList.map((item) => (
              <div>
                <div className={home["comments__carousel__item"]}>
                  <div className={home.comment}>
                    <div className={home["comment__header"]}>
                      <div className={home["comment__user"]}>
                        <img src={item.img} className={home.avatar} />
                        <h6 className={home["comment__username"]}>
                          {item.name}{" "}
                        </h6>
                      </div>
                    </div>
                    <div className={home["comment__body"]}>
                      <p className={home["comment__text"]}>{item.text}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className={home["carousel-buttons"]}>
          <button
            type="button"
            role="presentation"
            className={home["carousel-buttons__next"]}
            onClick={() => refSlider.current && refSlider.current.slickNext()}
          >
            <span className="icon">
              <HiOutlineArrowNarrowRight />
            </span>
          </button>
          <button
            type="button"
            role="presentation"
            className={home["carousel-buttons__prev"]}
            onClick={() => refSlider.current && refSlider.current.slickPrev()}
          >
            <span className="icon">
              <HiOutlineArrowNarrowLeft />
            </span>
          </button>
        </div>
      </Container>
    </section>
  );
};

export default UserComments;
