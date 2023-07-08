$(document).ready(function () {
  // select2
  var select2 = $(".select2-control");
  if (select2.length) {
    select2.select2({
      language: 'fa',
      dir: "rtl"
    });
  }
});
