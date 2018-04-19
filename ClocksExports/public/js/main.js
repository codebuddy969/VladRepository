/*jslint browser: true*/
/*global alert*/
/*global document*/
/*global window*/

"use strict";


document.addEventListener("DOMContentLoaded", function() {
    
    //-------------------------------------------------------
    
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
    
    //-------------------------------------------------------
    
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
    
    /*----------------------------------------------------------  Dropdowns  */
    
    function dropdown() {
    
        var dropdown = document.querySelectorAll('.dropdown input');

        for (var i = 0; i < dropdown.length; i++) {
            dropdown[i].addEventListener('click', function() {
                this.value='';
            
                var dropdownul = document.querySelectorAll(".show")[0];
                dropdownul && dropdownul.classList.remove("show");
                
                this.parentNode.getElementsByTagName("ul")[0].classList.add("show");

            });
        }
    }
    
    /*----------------------------------------------------------  Dropdowns  */
    
    function dropdown_li() {
    
        var dropdownLinks = document.querySelectorAll('.dropdown li');

        for (var i = 0; i < dropdownLinks.length; i++) {
            dropdownLinks[i].addEventListener('click', function() {
                
                var dropdownul = document.querySelectorAll(".show")[0];
                dropdownul && dropdownul.classList.remove("show");
                
                var li_text = this.textContent;
                this.parentNode.parentNode.getElementsByTagName("input")[0].value = li_text;
            }
        )}
    }
        
    function review_up() {
    
        var boxsize = document.querySelectorAll(".review-container");

        for (var i = 0; i < boxsize.length; i++) {
            boxsize[i].addEventListener('mouseover', function() {
                var review_hover_el = document.querySelectorAll(".review-hover")[0];
                review_hover_el && review_hover_el.classList.remove("review-hover");
                
                this.classList.add('review-hover');
            }
        )}
    }
    
    function review_back() {
    
        var boxsize = document.querySelectorAll(".review-container");

        for (var i = 0; i < boxsize.length; i++) {
            boxsize[i].addEventListener('mouseout', function() {
                this.classList.remove('review-hover');
            }
        )}

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
    
    
    burgerMenu ();
    fixedNav();    
    dropdown();
    dropdown_li();
    review_up();
    review_back();
    nav_links_click();
    
});
