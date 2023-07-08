"use strict";

$(document).ready(function () {
  // tooltip
  $('[data-toggle="tooltip"]').tooltip();

  // auto focus controls
  $('.control-auto-focus').on('keyup', function (e) {
    if (this.value.length == this.maxLength) {
      $(this).next('.control-auto-focus').focus();
    }
  });

  // form control slide
  $('.control-slide button').on('click', function (e) {
    $(this).toggleClass('active').next('.control-slide__wrapper').slideToggle(250);
  });

  // password toggle
  $('.password-control .password-control-btn').on('mousedown', function (e) {
    togglePassword(e);
  });
  $('.password-control .password-control-btn').on('mouseup', function (e) {
    togglePassword(e);
  });

  function togglePassword(event) {
    let input = $(event.target).parent().find('input');
    $(event.target).toggleClass('show');

    if (input.attr('type') == 'password') {
      input.attr('type', 'text');
    } else {
      input.attr('type', 'password');
    }
  }
});

// responsive menu
let respMenu = {
  el: document.querySelector('#respMenu'),
  open: function (e) {
    this.el.classList.toggle('expanded');
    windowOverlay.switchOn();
  },
  dismiss: function (e) {
    this.el.classList.remove('expanded');
    windowOverlay.switchOff();
  }
};

// header navbar
let headerNavbar = {
  el: document.querySelector('#headerNavbar'),
  open: function (e) {
    this.el.classList.toggle('expanded');
    windowOverlay.switchOn();
  },
  dismiss: function (e) {
    this.el.classList.remove('expanded');
    windowOverlay.switchOff();
  }
};

// toggle overlay
let windowOverlay = {
  el: document.querySelector('#menuOverlay'),
  switchOn: function () {
    this.el.classList.add('show');
  },
  switchOff: function () {
    this.el.classList.remove('show');
  },
};

document.addEventListener('click', function (e) {
  if (e.target.id == 'menuOverlay') {
    respMenu.dismiss();
    headerNavbar.dismiss();
  }
});
