$(function () {
   "use strict";

});
$(function () {
   $.ajax({
      type: "GET",
      url: "http://localhost:8080/api/calender/published/",
      data: "",
      dataType: "json",
      success: function (response) {
         if (response === null) {
            alert("null");
         } else {
            let data = Object.keys(response[0]);
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
   for (let element of data) {
      let row = table.insertRow();
      for (key in element) {
         let cell = row.insertCell();
         let text = document.createTextNode(element[key]);
         cell.appendChild(text);
      }
   }
}

let table = document.querySelector("#one");
