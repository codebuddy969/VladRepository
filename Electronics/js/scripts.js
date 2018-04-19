/*jslint browser: true*/
/*global $*/
/*global document*/
/*global window*/

"use strict";

$('.carousel').slick();

$(document).scroll(function () {
    var $nav = $("nav");
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
});

$(window).resize(function(){
    if ($(window).outerWidth() > 768) {
        $('nav ul').removeAttr("style");
        $('.burger').removeClass('change');
    }
});

$(document).click(function() {
    $('.dropdown ul').fadeOut();
});

$( document ).ready(function() {
    
    $('nav a').on('touchstart click', function (e) {
        e.preventDefault();
        var value = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(value).offset().top
        }, 800);
    });
    
    $('.dropdown .btn').on('touchmove click', function (e) {
        e.stopPropagation();
        $('.dropdown ul').fadeOut();
        $(this).parents().eq(0).find('ul').fadeToggle();
    });
    
    $('.dropdown li').on('touchmove click', function () {
        $('.dropdown ul').fadeOut();
        var value = $(this).text();
        $(this).parents().eq(1).find('.btn').html(value);
    });
    
    $('.burger').on('touchmove click', function () {
        $(this).toggleClass('change');
        $('nav ul').slideToggle();
    });
    
});