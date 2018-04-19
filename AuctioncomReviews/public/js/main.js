/*jslint browser: true*/
/*global document*/
/*global window*/
/*global tns*/

"use strict";

document.addEventListener("DOMContentLoaded", function() {
    
    tns({
        container: document.querySelector('.slider'),
        gutter: 0,
        axis: 'vertical',
        dots: false,
        loop: true,
        slideBy: 'page',
        controls: true,
        arrowKeys: true,
        items: 1
    });
    
    tns({
        container: document.querySelector('.sliderTest'),
        gutter: 0,
        axis: 'vertical',
        dots: false,
        loop: true,
        touch: true,
        mouseDrag: true,
        slideBy: 'page',
        controls: true,
        arrowKeys: true,
        items: 1
    });
    
    function burgerMenu () {
        document.getElementsByClassName("burger")[0].onclick = function menu() {
            if (document.querySelector("nav ul").classList.contains("menu")) {
                document.querySelector("nav ul").classList.remove('menu');
                this.classList.remove('change');
            } else {
                document.querySelector("nav ul").classList.add('menu');
                this.classList.add('change');
            }
        }
    }
    
    function nav_links_click() {
        
        var link = document.querySelectorAll("nav a");

        for (var i = 0; i < link.length; i++) {
            link[i].addEventListener('click', function(event) {
                event.preventDefault();

                var to_elem = this.getAttribute("href");
                var top = document.getElementsByClassName(to_elem)[0].offsetTop;

                window.scrollTo({
                    "behavior": "smooth",
                    "top": top
                });

            }
        )}
    }
    
    
    function fixedNav () {
        var topNav = document.querySelectorAll(".navigation")[0];

        document.addEventListener('scroll', makeNavFixed);

        function makeNavFixed() {
            if (document.documentElement.scrollTop >= 40 && !topNav.className.indexOf("fixed") >= 0) {
                if (topNav.className.indexOf('fixed') === -1) {
                  topNav.classList.add('fixed');
                }
            }
            else if (document.documentElement.scrollTop < 40) {
              topNav.classList.remove('fixed');
            }
        }
    }
    
    
    burgerMenu();
    nav_links_click();
    fixedNav();
        
});