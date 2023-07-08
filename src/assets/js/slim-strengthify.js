$(document).ready(function () {
  $('.strengthify').password({
    // custom messages
    enterPass: 'ضعیف',
    shortPass: 'ضعیف',
    containsField: '',
    steps: {
      30: 'ضعیف',
      60: 'متوسط',
      90: 'قوی',
    },

    // show percent
    showPercent: false,

    // show text
    showText: true,

    // enable animation
    animate: true,
    animateSpeed: 'fast',

    // select the match field for better password checks
    field: false,

    // whether to check for partials in field
    fieldPartialMatch: true,

    // minimum length
    minimumLength: 4,

    // closest selector
    closestSelector: 'div',

    // use the old colorbar image
    useColorBarImage: false,

    // set custom rgb color ranges for colorbar
    customColorBarRGB: {
      red: [0, 240],
      green: [0, 240],
      blue: 10
    },
  });
});
