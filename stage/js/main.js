$(function () {
   "use strict";
   /// toggle sidebar smothly
   $(".toggle-sidebar").on("click", function () {
      $(".content-area, .sidebar").toggleClass("no-sidebar");
   });

   //toggle Submune
   $(".toggle-submune").on("click", function () {
      $(this).find(".icon-angle-right").toggleClass('down');
      $(this).next(".child-links").slideToggle();
   });
});
