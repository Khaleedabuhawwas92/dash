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
