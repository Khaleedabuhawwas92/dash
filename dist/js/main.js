"use strict";
$.ajax({
   type: "GET",
   url: "http://localhost:5000/all_person",
   data: "",
   dataType: "json",
   success: function (response) {
      if (response == null) {
         alert("null")
      } else {
         tableCreate(response);
      }
      
   },
});

// Funcation To Gen
function tableCreate(res) {
   var body = document.getElementById("intral");
   $.each(res, function (indexInArray, valueOfElement) {
      var tr = document.createElement("tr");
      for (var j = 0; j < 10; j++) {
         if (j == 7) {
            break;
         } else {
            var td = document.createElement("td");
            var td2 = document.createElement("td");
            var td3 = document.createElement("td");
            var td4 = document.createElement("td");
            var edit = document.createElement("i");
            var delet = document.createElement("i");
            edit.classList.add("btn", "btn-info");
            delet.classList.add("btn", "btn-danger");
            var EditText = document.createTextNode("تحرير");
            var DeltetText = document.createTextNode("حذف");
            edit.appendChild(EditText);
            delet.appendChild(DeltetText);
            td2.appendChild(document.createTextNode(valueOfElement.id));
            td.appendChild(document.createTextNode(valueOfElement.gender));
            td3.appendChild(document.createTextNode(valueOfElement.name));
            td4.appendChild(edit);
            td4.appendChild(delet);
         }
      }
      tr.appendChild(td2);
      tr.appendChild(td);
      tr.appendChild(td3);
      tr.appendChild(td4);
      body.appendChild(tr);
   });
}

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
      $("body").removeClass(classesFont.join(" "));
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

   $(".modal-area").click(function () {
      $(this).fadeOut();
   });
   $(".form-contint").click(function (e) {
      e.stopPropagation();
   });
   $(".fc-event").on("click", function () {
      $(this).fadeOut();
   });

   // Form event prevents
   $(".modal-area form").on("click", function (e) {
      e.preventDefault();
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

