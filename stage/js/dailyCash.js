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
