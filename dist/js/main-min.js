$(function(){"use strict";$(".toggle-sidebar").on("click",function(){$(".content-area, .sidebar").toggleClass("no-sidebar")}),$(".toggle-submune").on("click",function(){$(this).find(".icon-angle-right").toggleClass("down"),$(this).next(".child-links").slideToggle()}),$(".toggle-fullscreen").on("click",function(){$(this).toggleClass("full-screen"),$(this).hasClass("full-screen")?openFullscreen():closeFullscreen()}),$(".toggle-setting").on("click",function(){$(this).find("i").toggleClass("icon-spin"),$(this).parent(".settings-box").toggleClass("hide-sttings")});var e=[];$(".color-option li").each(function(){e.push($(this).data("theme"))}),$(".color-option li").on("click",function(){$("body").removeClass(e.join(" ")),localStorage.setItem("myColor",$(this).data("theme"));var t=localStorage.getItem("myColor");$("body").addClass(t)});var t=[];$(".font-option select option").each(function(){t.push($(this).val())}),$(".font-option select").on("change",function(){$("body").removeClass(t.join(" ")),localStorage.setItem("myFont",$(this).find("option:selected").val());var e=localStorage.getItem("myFont");$("body").addClass(e)});var o=[];$(".sidebar-option li").each(function(){o.push($(this).data("background"))}),$(".sidebar-option li").on("click",function(){$("body").removeClass(o.join(" ")),localStorage.setItem("mySidebar",$(this).data("background"));var e=localStorage.getItem("mySidebar");$("body").addClass(e)}),$(".modal-area").click(function(){$(this).fadeOut()}),$(".form-contint").click(function(e){e.stopPropagation()}),$(".fc-event").on("click",function(){$(this).fadeOut()})}),$(window).on("load",function(e){var t=localStorage.getItem("myColor"),o=localStorage.getItem("myFont"),l=localStorage.getItem("mySidebar");$("body").addClass(l),$("body").addClass(t),$("body").addClass(o)});var elem=document.documentElement;function openFullscreen(){elem.requestFullscreen?elem.requestFullscreen():elem.mozRequestFullScreen?elem.mozRequestFullScreen():elem.webkitRequestFullscreen?elem.webkitRequestFullscreen():elem.msRequestFullscreen&&elem.msRequestFullscreen()}function closeFullscreen(){document.exitFullscreen?document.exitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.msExitFullscreen&&document.msExitFullscreen()}