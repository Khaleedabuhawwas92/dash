$(function () {
    'use strict';
     /// toggle sidebar smothly
    $(".toggle-sidebar").on("click", function () {

        $(".content-area, .sidebar").toggleClass("no-sidebar");
        
    });
});

var myNew = new myNew()