"use strict";
let table = document.getElementById("one");
$(function () {
   var time = new Date().getHours();
   $.ajax({
      type: "GET",
      url: "http://localhost:8080/api/cash/published/",
      data: "",
      dataType: "json",
      success: function (response) {
         if (response === null) {
            alert("null");
         } else {
            let data = ["Amount", "Dicription", "Created At"];
            generateTableHead(table, data);
            generateTable(table, response);
         }
      },
   });
});

function generateTableHead(table, data) {
   let thead = table.createTHead();
   let row = thead.insertRow();
   for (let key of data) {
      let th = document.createElement("th");
      let text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
   }
}

function generateTable(table, data) {
   var sum = 0;
   data.forEach((element) => {
      sum += Number(element.amount);
   });
   for (let element of data) {
      let row = table.insertRow();
      for (let key in element) {
         let cell = row.insertCell();
         let text = document.createTextNode(element[key]);
         cell.appendChild(text);
      }
      var delet = document.createElement("i");
      delet.classList.add("btn", "btn-info");
      var DeltetText = document.createTextNode("حذف");
      delet.appendChild(DeltetText);
      row.appendChild(delet);
      delet.addEventListener("click", function () {
         $.confirm({
            rtl: true,
            columnClass: "col-md-6",
            title: "حذف",
            content: "هل انت متاكد حذف " + "<b>" + element.discrption + "</b>",
            icon: "icon-warning-sign",
            type: "red",
            typeAnimated: true,
            buttons: {
               tryAgain: {
                  text: "حذف",
                  btnClass: "btn-red",
                  action: function () {
                     $.ajax({
                        url:
                           "http://localhost:8080/api/cash/modifiy/" +
                           element.id,
                        type: "PUT",
                        success: function (response) {
                           console.log("Detetd is done");
                        },
                     });
                     window.location.reload();
                  },
               },
               close: function () {},
            },
         });
      });
   }
   let row2 = table.insertRow();
   let cell2 = row2.insertCell();
   cell2.classList.add("sumations");
   let text2 = document.createTextNode("Sumation" + " = " + sum);
   cell2.appendChild(text2);
}
function searchFunction2() {
   var input, filter, table, tr, td, i, txtValue;
   input = document.getElementById("myInput");
   filter = input.value.toUpperCase();
   table = document.getElementById("one");
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
// request save locations
$("#loca").on("click", function () {
   var company_name = $("#company_name").val(),
      city = $("#city_name").val(),
      discription = $("#description").val(),
      location = $("#location").val();
   $.ajax({
      type: "POST",
      dataType: "json",
      url: "http://localhost:8080/api/locations",
      data: { company_name, city, discription, location },
      success: function (response) {
         window.location.reload();
      },
      statusCode: {
         400: function (responseObject, textStatus, jqXHR) {
            $.confirm({
               title: textStatus,
               content: "الرجاء ادخال اسم الشركة",
               type: "red",
               typeAnimated: true,
               buttons: {
                  tryAgain: {
                     text: "Try again",
                     btnClass: "btn-red",
                     action: function () {
                        $("#company_name").val("");
                        $("#city_name").val("");
                        $("#description").val("");
                        $("#location").val("");
                        $(".modal-area").fadeIn();
                     },
                  },
                  close: function () {},
               },
            });
         },
      },
   });

   $(".modal-area").fadeOut();
});

// funcation to Get All Locations
"use strict";
let table1 = document.querySelector("#tow");
$(function () {
   $.ajax({
      type: "GET",
      url: "http://localhost:8080/api/locations/published/",
      data: "",
      dataType: "json",
      success: function (response) {
         console.log(response);
         if (response === null) {
            alert("null");
         } else {
            let data = ["Comany Name", "location", "discription", "ID"];
            generateTableHead(table1, data);
            generateTable2(table1, response);
         }
      },
   });
});
function generateTable2(table, data) {
   for (let element of data) {
      let row = table.insertRow();

      for (let key in element) {
         let cell = row.insertCell();
         let text = document.createTextNode(element[key]);
         cell.appendChild(text);
      }

      var delet = document.createElement("i");
      delet.classList.add("btn", "btn-info");
      var DeltetText = document.createTextNode("حذف");
      delet.appendChild(DeltetText);
      row.appendChild(delet);
      delet.addEventListener("click", function () {
         $.confirm({
            rtl: true,
            columnClass: "col-md-12",
            title: "حذف",
            content:
               "هل انت متاكد حذف " + "<b>" + element.company_name + "</b>",
            icon: "icon-warning-sign",
            type: "red",
            typeAnimated: true,
            buttons: {
               tryAgain: {
                  text: "حذف",
                  btnClass: "btn-red",
                  action: function () {
                     $.ajax({
                        url:
                           "http://localhost:8080/api/locations/modifiy/" +
                           element.id,
                        type: "PUT",
                        success: function (response) {
                           console.log("Detetd is done");
                        },
                     });
                     window.location.reload();
                  },
               },
               close: function () {},
            },
         });
      });
   }
}

// request save locations
$("#save").on("click", function () {
   var company_name = $("#company_name").val(),
      city = $("#city_name").val(),
      discription = $("#description").val(),
      location = $("#location").val();
   $.ajax({
      type: "POST",
      dataType: "json",
      url: "http://localhost:8080/api/locations",
      data: { company_name, city, discription, location },
      success: function (response) {
         window.location.reload();
      },
      statusCode: {
         400: function (responseObject, textStatus, jqXHR) {
            $.confirm({
               title: textStatus,
               content: "الرجاء ادخال اسم الشركة",
               type: "red",
               typeAnimated: true,
               buttons: {
                  tryAgain: {
                     text: "Try again",
                     btnClass: "btn-red",
                     action: function () {
                        $("#company_name").val("");
                        $("#city_name").val("");
                        $("#description").val("");
                        $("#location").val("");
                        $(".modal-area").fadeIn();
                     },
                  },
                  close: function () {},
               },
            });
         },
      },
   });

   $(".modal-area").fadeOut();
});

// Funcation To Genrat table to location
// function tableCreate(res) {
//    var body = document.getElementById("intral");
//    $.each(res, function (indexInArray, valueOfElement) {
//       var data = document.createElement("tr");
//       var discription = document.createElement("td");
//       var company = document.createElement("td");
//       var count = document.createElement("td");
//       var city = document.createElement("td");
//       var btttons = document.createElement("td");
//       var copy = document.createElement("i");
//       var edit = document.createElement("i");
//       var delet = document.createElement("i");
//       var index = indexInArray + 1;
//       copy.classList.add("btn", "btn-info");
//       copy.addEventListener("click", function () {
//          window.open(valueOfElement.location);
//       });
//       edit.classList.add("btn", "btn-warning");
//       edit.addEventListener("click", function () {
//          $.confirm({
//             title: "تعديل",
//             animationSpeed: 500,
//             rtl: true,
//             content:
//                "" +
//                '<form action="" class="edit-form text-right">' +
//                '<div class="form-group">' +
//                "<label>اسم الشركة</label>" +
//                '<input type="text" class="inner-style form-control" id="company" required  />' +
//                "<label>المدينة</label>" +
//                '<input type="text"  class="inner-style form-control"   id="city"/>' +
//                "<label>الوصف</label>" +
//                '<input type="text"  class="inner-style form-control"  id="discription"   />' +
//                "<label>الموقع</label>" +
//                '<input type="text"  class="inner-style form-control"  id="location1"   />' +
//                "</div>" +
//                "</form>",

//             buttons: {
//                formSubmit: {
//                   text: "Update",
//                   btnClass: "btn-blue",

//                   action: function () {
//                      var id = valueOfElement.id;

//                      var data = {
//                         company_name: $("#company").val(),
//                         city: $("#city").val(),
//                         discription: $("#discription").val(),
//                         location: $("#location1").val(),
//                      };
//                      $.ajax({
//                         type: "PUT",
//                         dataType: "json",
//                         url: "http://localhost:8080/api/locations/" + id,
//                         data: data,
//                         success: function (response) {
//                            console.log(response);
//                            window.location.reload();
//                         },
//                      });
//                   },
//                },
//                cancel: function () {
//                   //close
//                },
//             },
//             onContentReady: function () {
//                $("#company").val(valueOfElement.company_name);
//                $("#city").val(valueOfElement.city);
//                $("#discription").val(valueOfElement.discription);
//                $("#location1").val(valueOfElement.location);

//                var jc = this;
//                this.$content.find("form").on("submit", function (e) {
//                   // if the user submits the form by pressing enter in the field.
//                   e.preventDefault();
//                   jc.$$formSubmit.trigger("click"); // reference the button and click it
//                });
//             },
//          });
//       });
//       delet.classList.add("btn", "btn-danger");
//       delet.addEventListener("click", function () {
//          $.confirm({
//             rtl: true,
//             columnClass: "col-md-12",
//             title: "حذف",
//             content:
//                "هل انت متاكد حذف " +
//                "<b>" +
//                valueOfElement.company_name +
//                "</b>",
//             icon: "icon-warning-sign",
//             type: "red",
//             typeAnimated: true,
//             buttons: {
//                tryAgain: {
//                   text: "حذف",
//                   btnClass: "btn-red",
//                   action: function () {
//                      $.ajax({
//                         url:
//                            "http://localhost:8080/api/locations/modifiy/" +
//                            valueOfElement.id,
//                         type: "PUT",
//                         success: function (response) {
//                            console.log("Detetd is done");
//                         },
//                      });
//                      window.location.reload();
//                   },
//                },
//                close: function () {},
//             },
//          });
//       });
//       var EditText = document.createTextNode(" تعديل");
//       var CopyText = document.createTextNode("نسخ ");
//       var DeltetText = document.createTextNode("حذف");
//       edit.appendChild(EditText);
//       copy.appendChild(CopyText);
//       delet.appendChild(DeltetText);
//       count.appendChild(document.createTextNode(index));
//       company.appendChild(document.createTextNode(valueOfElement.company_name));
//       discription.appendChild(
//          document.createTextNode(valueOfElement.discription)
//       );
//       city.appendChild(document.createTextNode(valueOfElement.city));

//       btttons.appendChild(copy);
//       btttons.appendChild(delet);
//       btttons.appendChild(edit);
//       data.appendChild(count);
//       data.appendChild(company);
//       data.appendChild(city);
//       data.appendChild(discription);

//       data.appendChild(btttons);
//       body.appendChild(data);
//    });
// }

//search for input
function searchFunction() {
   var input, filter, table, tr, td, i, txtValue;
   input = document.getElementById("myInput");
   filter = input.value.toUpperCase();
   table = document.getElementById("tow");
   tr = table.getElementsByTagName("tr");
   for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
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
// function copyText(res) {
//    res = document.execCommand("copy");
//    alert(res);
// }

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
      $("#company_name").val("");
      $("#city_name").val("");
      $("#description").val("");
      $("#location").val("");
      $(".modal-area").fadeIn();
   });
   $("#add-cash").on("click", function () {
      $("#company_name").val("");
      $("#city_name").val("");
      $("#description").val("");
      $("#location").val("");
      $(".modal-area").fadeIn();
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
