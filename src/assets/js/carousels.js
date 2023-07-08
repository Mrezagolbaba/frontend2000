$(document).ready(function () {
  let navs = {
    chevron: {
      left: `
        <span class="icon">
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.54509 0.534242C7.79347 0.777741 7.81605 1.15878 7.61283 1.42728L7.54509 1.50421L1.93882 7.00002L7.54508 12.4958C7.79347 12.7393 7.81605 13.1204 7.61282 13.3889L7.54508 13.4658C7.2967 13.7093 6.90802 13.7314 6.63413 13.5322L6.55566 13.4658L0.454917 7.485C0.206534 7.2415 0.183953 6.86047 0.387176 6.59196L0.454917 6.51504L6.55566 0.534242C6.82888 0.266393 7.27186 0.266393 7.54509 0.534242Z"
              fill="#03041B" fill-opacity="0.4" />
          </svg>
        </span>
      `,
      right: `
        <span class="icon">
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.454916 13.4658C0.206533 13.2223 0.183953 12.8412 0.387175 12.5727L0.454916 12.4958L6.06118 6.99998L0.454916 1.50417C0.206533 1.26067 0.183953 0.879632 0.387175 0.611126L0.454916 0.5342C0.703299 0.290701 1.09198 0.268564 1.36587 0.467791L1.44434 0.5342L7.54508 6.515C7.79347 6.75849 7.81605 7.13953 7.61282 7.40804L7.54508 7.48496L1.44434 13.4658C1.17112 13.7336 0.728137 13.7336 0.454916 13.4658Z"
              fill="#03041B" fill-opacity="0.4" />
          </svg>
        </span>
      `
    },
    arrow: {
      left: `
        <span class="icon" style="transform: rotate(180deg)">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
            <path d="M9.3335 3.83334L14.0002 8.50001L9.3335 13.1667" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="square"></path>
            <line x1="14" y1="8.58334" x2="2" y2="8.58334" stroke="#1A1A1A" strokeWidth="1.5"></line>
          </svg>
        </span>
      `,
      right: `
        <span class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
            <path d="M9.3335 3.83334L14.0002 8.50001L9.3335 13.1667" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="square"></path>
            <line x1="14" y1="8.58334" x2="2" y2="8.58334" stroke="#1A1A1A" strokeWidth="1.5"></line>
          </svg>
        </span>
      `
    }
  };

  // crypto slider
  let slider = $('.crypto-slider .owl-carousel');
  if (slider.length) {
    slider.owlCarousel({
      loop: true,
      margin: 20,
      nav: true,
      dots: true,
      dotsData: true,
      center: false,
      autoplay: true,
      autoplayTimeout: 7000,
      autoplayHoverPause: true,
      smartSpeed: 1500,
      autoWidth: false,
      navText: [navs.chevron.right, navs.chevron.left],
      rtl: true,
      navContainer: '.crypto-slider .crypto-slider-navs',
      dotsContainer: '.crypto-slider .crypto-slider-dots',
      responsive: {
        0: {
          items: 1,
        },
        575: {
          items: 2,
        },
        768: {
          items: 3,
        },
        1200: {
          items: 2
        },
        1400: {
          items: 3
        },
        1680: {
          items: 4
        },
      }
    });
  }

  // features slider
  let features_slider = $('.features-slider .owl-carousel');
  if (features_slider.length) {
    features_slider.owlCarousel({
      loop: true,
      margin: 24,
      nav: false,
      dots: true,
      center: false,
      autoplay: true,
      autoplayTimeout: 7000,
      autoplayHoverPause: true,
      smartSpeed: 1500,
      autoWidth: false,
      navText: [],
      rtl: true,
      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 2,
        },
        1000: {
          items: 2
        },
      }
    });
  }
});
