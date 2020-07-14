"use strict";
// funcation to Get All Locations
$(function () {
   $.ajax({
      type: "GET",
      url: "http://localhost:8080/api/locations/published",
      data: "",
      dataType: "json",
      success: function (response) {
         if (response === null) {
            alert("null");
         } else {
            tableCreate(response);
         }
      },
   });
});


// request save locations
$("#save").on("click", function () {
   var company_name = $("#company_name").val();
   var city = $("#city_name").val();
   var discription = $("#description").val();
   $.ajax({
      type: "POST",
      dataType: "json",
      url: "http://localhost:8080/api/locations",
      data: { company_name, city, discription },
      success: function (response) {
         window.location.reload()
      },
   });

   $(".modal-area").fadeOut();
});

// Funcation To Genrat table to location
function tableCreate(res) {
   var body = document.getElementById("intral");
   $.each(res, function (indexInArray, valueOfElement) {
      var data = document.createElement("tr");
      var discription = document.createElement("td");
      var company = document.createElement("td");
      var count = document.createElement("td");
      var city = document.createElement("td");
      var btttons = document.createElement("td");
      var copy = document.createElement("i");
      var edit = document.createElement("i");
      var delet = document.createElement("i");
      var index = indexInArray + 1;
      copy.classList.add("btn", "btn-info");
      copy.addEventListener("click", function () {
         copyText();
      });
      edit.classList.add("btn", "btn-warning");
      delet.classList.add("btn", "btn-danger");
      delet.addEventListener("click", function () {
         $.confirm({
            title: "Delete",
            content:
               "Are you Sure Did You Want Delete " +
               "<b>" +
               valueOfElement.company_name +
               "</b>",
            columnClass: "col-md-12",
            buttons: {
               info: {
                  text: "Cansel",
                  btnClass: "btn-blue",
               },
               danger: {
                  text: "Delete",
                  btnClass: "btn-red any-other-class", // multiple classes.
                  action: function () {
                     $.ajax({
                        url:
                           "http://localhost:8080/api/locations/modifiy/" +
                           valueOfElement.id,
                        type: "PUT",
                        success: function (response) {
                           console.log("Detetd is done");
                        },
                     });
                     window.location.reload();
                  },
               },
            },
         });
      });
      var EditText = document.createTextNode(" تعديل");
      var CopyText = document.createTextNode("نسخ ");
      var DeltetText = document.createTextNode("حذف");
      edit.appendChild(EditText);
      copy.appendChild(CopyText);
      delet.appendChild(DeltetText);
      count.appendChild(document.createTextNode(index));
      company.appendChild(document.createTextNode(valueOfElement.company_name));
      discription.appendChild(
         document.createTextNode(valueOfElement.discription)
      );
      city.appendChild(document.createTextNode(valueOfElement.city));
      btttons.appendChild(copy);
      btttons.appendChild(delet);
      btttons.appendChild(edit);
      data.appendChild(count);
      data.appendChild(company);
      data.appendChild(city);
      data.appendChild(discription);
      data.appendChild(btttons);
      body.appendChild(data);
   });
}


//search for input
function searchFunction() {
   var input, filter, table, tr, td, i, txtValue;
   input = document.getElementById("myInput");
   filter = input.value.toUpperCase();
   table = document.getElementById("myTable");
   tr = table.getElementsByTagName("tr");
   for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
         txtValue = td.textContent || td.innerText;
         if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
         } else {
            tr[i].style.display = "none";
         }
      }
   }
}
function copyText(res) {
   selectText(res);
   alert("Color code " + event.target.innerText + " copied in clipboard");
   document.execCommand("copy");
}

function selectText(res) {
   var element = event.target;
   var range;
   if (document.selection) {
      // IE
      range = document.body.createTextRange();
      range.moveToElementText(element);
      range.select();
   } else if (window.getSelection) {
      range = document.createRange();
      range.selectNode(element);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
   }
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

   $("#add-location").on("click", function () {
      $(".modal-area").fadeIn();
      $("#company_name").val("");
      $("#city_name").val("");
      $("#description").val("");
     
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

// To copy location
function copy(res) {
   document.getElementById("myTable").deleteRow(res);
}
