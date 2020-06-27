$(function () {
   "use strict";
   /// toggle sidebar smothly
   $(".toggle-sidebar").on("click", function () {
      $(".content-area, .sidebar").toggleClass("no-sidebar");
   });

   //toggle Submune
   $(".toggle-submune").on("click", function () {
      $(this).find(".icon-angle-right").toggleClass("down");
      $(this).next(".child-links").slideToggle();
   });

   // Full Screen  Funcation
   $(".toggle-fullscreen").on("click", function () {
      $(this).toggleClass("full-screen");
      if ($(this).hasClass("full-screen")) {
         openFullscreen();
      } else {
         closeFullscreen();
      }
   });

   //Setting Options
   $(".toggle-setting").on("click", function () {
      $(this).find("i").toggleClass("icon-spin");
      $(this).parent(".settings-box").toggleClass("hide-sttings");
   });

   // Switch Color Themes
   var classesThemes = [];
   $(".color-option li").each(function () {
      classesThemes.push($(this).data("theme"));
   });

   $(".color-option li").on("click", function () {
      $("body").removeClass(classesThemes.join(" "));
      localStorage.setItem("myColor", $(this).data("theme"));
      var color = localStorage.getItem("myColor");
      $("body").addClass(color);
   });

   // Switch Fonts
   var classesFont = [];
   $(".font-option select option").each(function () {
      classesFont.push($(this).val());
   });
   $(".font-option select").on("change", function () {
      $("body")
         .removeClass(classesFont.join(" "));
         localStorage.setItem("myFont", $(this).find("option:selected").val());
         var font = localStorage.getItem("myFont");
         $("body").addClass(font);
   });

    // Switch BACKGROUND Sidebar
    var classessidebar = [];
    $(".sidebar-option li").each(function () {
      classessidebar.push($(this).data("background"));
    });
 
    $(".sidebar-option li").on("click", function () {
       $("body").removeClass(classessidebar.join(" "));
       localStorage.setItem("mySidebar", $(this).data("background"));
       var sidebar = localStorage.getItem("mySidebar");
       $("body").addClass(sidebar);
    });
});

// Funaction In Loade
$(window).on("load", function (e) {
   var color = localStorage.getItem("myColor");
   var font = localStorage.getItem("myFont");
   var sidebar = localStorage.getItem("mySidebar");
   $("body").addClass(sidebar);
   $("body").addClass(color);
   $("body").addClass(font);
});

var elem = document.documentElement;
/* View in fullscreen */
function openFullscreen() {
   if (elem.requestFullscreen) {
      elem.requestFullscreen();
   } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
   } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
   } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
   }
}

/* Close fullscreen */
function closeFullscreen() {
   if (document.exitFullscreen) {
      document.exitFullscreen();
   } else if (document.mozCancelFullScreen) {
      /* Firefox */
      document.mozCancelFullScreen();
   } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
   } else if (document.msExitFullscreen) {
      /* IE/Edge */
      document.msExitFullscreen();
   }
}
