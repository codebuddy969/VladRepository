/*jslint browser: true*/
/*global $*/
/*global document*/
/*global window*/

"use strict";

$(window).resize(function(){
    if ($(window).outerWidth() > 768) {
        $('nav ul').removeAttr("style");
        $('.burger').removeClass('change');
    }
});

$(document).ready(function(){
    
    $('.slider').slick();
        
    $('nav a').on('touchstart click', function (e) {
        e.preventDefault();
        var value = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(value).offset().top
        }, 800);
    });
    
    $('.burger').on('touchmove click', function () {
        $(this).toggleClass('change');
        $('nav ul').slideToggle();
    });
    
    $('.form-group input').on('touchmove click', function () {
        $('.form-group ul').fadeOut();
        $(this).parents().eq(0).find('ul').fadeToggle();
    });
    
    $('input').on('touchmove click', function () {
        $(this).val('');
    });
    
    $('.form-group li').on('touchmove click', function () {
        $('.form-group ul').fadeOut();
        var value = $(this).text();
        $(this).parents().eq(1).find('input').val(value);
    });
    
    
});