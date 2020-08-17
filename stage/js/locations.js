"use strict";
function generateTableHead1(table1, data) {
   let thead = table1.createTHead();
   let row = thead.insertRow();
   for (let key of data) {
      let th = document.createElement("th");
      let text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
   }
}

function generateTable1(table1, data) {
   for (let element of data) {
      let row = table1.insertRow();
      for (key in element) {
         let cell = row.insertCell();
         let text = document.createTextNode(element[key]);
         cell.appendChild(text);
      }
   }
}

let table1 = document.querySelector("#tow");
// funcation to Get All Locations
$(function () {
   $.ajax({
      type: "GET",
      url: "http://localhost:8080/api/locations/published/",
      data: "",
      dataType: "json",
      success: function (response) {
         if (response === null) {
            alert("null");
         } else {
            let data = Object.keys(response[0]);
            generateTableHead1(table1, data);
            generateTable1(table1, response);
         }
      },
   });
});

// request save locations
$("#save").on("click", function () {
   var company_name = $("#company_name").val();
   var city = $("#city_name").val();
   var discription = $("#description").val();
   var location = $("#location").val();
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
