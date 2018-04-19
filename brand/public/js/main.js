/*jslint browser: true*/
/*global $*/
/*global document*/

"use strict";

document.addEventListener("DOMContentLoaded", function() {
    
    
    function fixedNav() {
        if (document.querySelectorAll(".header-home__navigation")[0]) {
            var topNav = document.querySelectorAll(".header-home__navigation")[0];
        } else if (document.querySelectorAll(".header-about__navigation")[0]) {
            var topNav = document.querySelectorAll(".header-about__navigation")[0];
        } else if (document.querySelectorAll(".header-apply__navigation")[0]) {
            var topNav = document.querySelectorAll(".header-apply__navigation")[0];
        }
        
        
        document.addEventListener('touchmove', makeNavFixed);
        document.addEventListener('scroll', makeNavFixed);

        function makeNavFixed() {
            if (document.body.scrollTop >= 40 || document.documentElement.scrollTop >= 40  && !topNav.className.indexOf("fixed") >= 0 ) {
                if (topNav.className.indexOf('fixed') === -1) {
                  topNav.classList.add('fixed');
                }
            }
            else if (document.body.scrollTop < 40 || document.documentElement.scrollTop < 40) {
              topNav.classList.remove('fixed');
            }
        }
    };
    
    fixedNav();

});
