"use strict";function tableCreate(e){var t=document.getElementById("intral");$.each(e,function(e,n){var o=document.createElement("tr"),l=document.createElement("td"),a=document.createElement("td"),c=document.createElement("td"),i=document.createElement("td"),d=document.createElement("td"),s=document.createElement("i"),r=document.createElement("i"),u=document.createElement("i"),m=e+1;s.classList.add("btn","btn-info"),s.addEventListener("click",function(){copyText()}),r.classList.add("btn","btn-warning"),u.classList.add("btn","btn-danger"),u.addEventListener("click",function(){$.confirm({title:"Delete",content:"Are you Sure Did You Want Delete <b>"+n.company_name+"</b>",columnClass:"col-md-12",buttons:{info:{text:"Cansel",btnClass:"btn-blue"},danger:{text:"Delete",btnClass:"btn-red any-other-class",action:function(){$.ajax({url:"http://localhost:8080/api/locations/modifiy/"+n.id,type:"PUT",success:function(e){console.log("Detetd is done")}}),window.location.reload()}}}})});var p=document.createTextNode(" تعديل"),g=document.createTextNode("نسخ "),f=document.createTextNode("حذف");r.appendChild(p),s.appendChild(g),u.appendChild(f),c.appendChild(document.createTextNode(m)),a.appendChild(document.createTextNode(n.company_name)),l.appendChild(document.createTextNode(n.discription)),i.appendChild(document.createTextNode(n.city)),d.appendChild(s),d.appendChild(u),d.appendChild(r),o.appendChild(c),o.appendChild(a),o.appendChild(i),o.appendChild(l),o.appendChild(d),t.appendChild(o)})}function searchFunction(){var e,t,n,o;for(e=document.getElementById("myInput").value.toUpperCase(),t=document.getElementById("myTable").getElementsByTagName("tr"),o=0;o<t.length;o++)(n=t[o].getElementsByTagName("td")[1])&&((n.textContent||n.innerText).toUpperCase().indexOf(e)>-1?t[o].style.display="":t[o].style.display="none")}function copyText(e){selectText(e),alert("Color code "+event.target.innerText+" copied in clipboard"),document.execCommand("copy")}function selectText(e){var t,n=event.target;document.selection?((t=document.body.createTextRange()).moveToElementText(n),t.select()):window.getSelection&&((t=document.createRange()).selectNode(n),window.getSelection().removeAllRanges(),window.getSelection().addRange(t))}$(function(){$.ajax({type:"GET",url:"http://localhost:8080/api/locations/published",data:"",dataType:"json",success:function(e){null===e?alert("null"):tableCreate(e)}})}),$("#save").on("click",function(){var e=$("#company_name").val(),t=$("#city_name").val(),n=$("#description").val();$.ajax({type:"POST",dataType:"json",url:"http://localhost:8080/api/locations",data:{company_name:e,city:t,discription:n},success:function(e){window.location.reload()}}),$(".modal-area").fadeOut()}),$(function(){$(".toggle-sidebar").on("click",function(){$(".content-area, .sidebar").toggleClass("no-sidebar")}),$(".toggle-submune").on("click",function(){$(this).find(".icon-angle-right").toggleClass("down"),$(this).next(".child-links").slideToggle()}),$(".toggle-fullscreen").on("click",function(){$(this).toggleClass("full-screen"),$(this).hasClass("full-screen")?openFullscreen():closeFullscreen()}),$(".toggle-setting").on("click",function(){$(this).find("i").toggleClass("icon-spin"),$(this).parent(".settings-box").toggleClass("hide-sttings")});var e=[];$(".color-option li").each(function(){e.push($(this).data("theme"))}),$(".color-option li").on("click",function(){$("body").removeClass(e.join(" ")),localStorage.setItem("myColor",$(this).data("theme"));var t=localStorage.getItem("myColor");$("body").addClass(t)});var t=[];$(".font-option select option").each(function(){t.push($(this).val())}),$(".font-option select").on("change",function(){$("body").removeClass(t.join(" ")),localStorage.setItem("myFont",$(this).find("option:selected").val());var e=localStorage.getItem("myFont");$("body").addClass(e)});var n=[];$(".sidebar-option li").each(function(){n.push($(this).data("background"))}),$(".sidebar-option li").on("click",function(){$("body").removeClass(n.join(" ")),localStorage.setItem("mySidebar",$(this).data("background"));var e=localStorage.getItem("mySidebar");$("body").addClass(e)}),$(".modal-area").click(function(){$(this).fadeOut()}),$(".form-contint").click(function(e){e.stopPropagation()}),$(".fc-event").on("click",function(){$(this).fadeOut()}),$(".modal-area form").on("click",function(e){e.preventDefault()}),$("#add-location").on("click",function(){$(".modal-area").fadeIn(),$("#company_name").val(""),$("#city_name").val(""),$("#description").val("")})}),$(window).on("load",function(e){var t=localStorage.getItem("myColor"),n=localStorage.getItem("myFont"),o=localStorage.getItem("mySidebar");$("body").addClass(o),$("body").addClass(t),$("body").addClass(n)});var elem=document.documentElement;function openFullscreen(){elem.requestFullscreen?elem.requestFullscreen():elem.mozRequestFullScreen?elem.mozRequestFullScreen():elem.webkitRequestFullscreen?elem.webkitRequestFullscreen():elem.msRequestFullscreen&&elem.msRequestFullscreen()}function closeFullscreen(){document.exitFullscreen?document.exitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.msExitFullscreen&&document.msExitFullscreen()}function copy(e){document.getElementById("myTable").deleteRow(e)}