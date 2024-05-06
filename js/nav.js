/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*****************************!*\
  !*** ./resources/js/nav.js ***!
  \*****************************/
$(function () {
  $(".menu").on("click", function () {
    var display = $(".nav-wrapper").css("display");

    if (display === "table") {
      display = "none";
      $(".primary-links ul > li").removeClass("show-nav");
      $(".nav-mobile-wrapper").removeClass("open");
      $(this).removeClass("close").addClass("open");
      $("body").removeClass("noscroll");
    } else {
      display = "table";
      $("body").addClass("noscroll");
      $(".primary-links ul > li").addClass("show-nav");
      $(this).addClass("close").removeClass("open");
      $(".nav-mobile-wrapper").addClass("open");
    }

    $(".nav-wrapper").css("display", display);
  });
});
/******/ })()
;