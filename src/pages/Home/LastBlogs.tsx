import React, { useRef } from "react";
import Slider from "react-slick";
import { Container } from "reactstrap";

import home from "assets/scss/landing/home.module.scss";
import { GiNotebook } from "react-icons/gi";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";

const blogSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  rtl: false,
  arrows: false,
  autoPlay: true,
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
const carouselList = [
  {
    title: "عنوان وبلاگ",
    text: " لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامهو مجله در ستون و سطرآنچنان که لازم است،",
    date: "1400/02/02",
  },
  {
    title: "آخرین اخبار وبلاگ",
    text: " لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامهو مجله در ستون و سطرآنچنان که لازم است،",
    date: "1402/06/06",
  },
  {
    title: "عنوان وبلاگ",
    text: " لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامهو مجله در ستون و سطرآنچنان که لازم است،",
    date: "1400/02/02",
  },
  {
    title: "آخرین اخبار وبلاگ",
    text: " لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامهو مجله در ستون و سطرآنچنان که لازم است،",
    date: "1402/06/06",
  },
];
const LastBlogs = () => {
  const refSlider = useRef<Slider | null>(null);

  return (
    <section className={home.blog}>
      <Container>
        <div className={home["section-title"]}>
          <h3 className={home["section-title__title"]}>
            آخرین <span className="text-primary">مطالب</span>
          </h3>
        </div>
        <div className={home["blog__carousel"]}>
          <Slider {...blogSettings} ref={refSlider}>
            {carouselList.map((slide) => (
              <div className={home["blog__carousel__item"]}>
                <article>
                  <div className={home["blog__carousel__header"]}>
                    <span className="icon">
                      <GiNotebook />
                    </span>
                    <h3 className={home["blog__carousel__title"]}>
                      <a href="#">{slide.title}</a>
                    </h3>
                    <span className={home["blog__carousel__date"]}>
                      {slide.date}
                    </span>
                  </div>
                  <div className={home["blog__carousel__body"]}>
                    <p className={home["blog__carousel__text"]}>{slide.text}</p>
                  </div>
                  <div className={home["blog__carousel__footer"]}>
                    <a href="#">خواندن</a>
                  </div>
                </article>
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
          <div className={home["carousel-buttons__all"]}>
            <a href="#">همه مطالب</a>
          </div>
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

export default LastBlogs;
