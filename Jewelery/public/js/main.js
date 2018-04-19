/*jslint browser: true*/
/*global document*/
/*global window*/
/*global setTimeout*/

"use strict";

document.addEventListener("DOMContentLoaded", function() {
    
    window.addEventListener('mouseup', function(e){

        var dropdown = document.querySelectorAll('.dropdown');
        var navUl = document.querySelectorAll('.navigation')[0];
        var burger = document.querySelectorAll('.burger')[0];
        
        if(!navUl.contains(e.target)) {
            document.querySelectorAll('.navigation ul')[0].classList.remove('menu');
        }
        if(!burger.contains(e.target)) {
            document.querySelectorAll('.burger')[0].classList.remove('change');
        } 

        for (var t = 0; t < dropdown.length; t++) {
            if (!dropdown[t].contains(e.target)){
                dropdown[t].classList.remove('show');
            }
        }
        
    })
    
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
                
                for (var k = 0; k < dropdown.length; k++) {
                    document.querySelectorAll(".dropdown")[k].classList.remove("show");
                }
                
                this.parentElement.classList.add('show');                
            });
        }
    }
    
    /*----------------------------------------------------------  Dropdowns  */
    
    function dropdown_li() {
    
        var dropdownLinks = document.querySelectorAll('.dropdown li');

        for (var i = 0; i < dropdownLinks.length; i++) {
            dropdownLinks[i].addEventListener('click', function() {
                
                var dropdown = document.querySelectorAll('.dropdown');
                
                for (var k = 0; k < dropdown.length; k++) {
                    document.querySelectorAll(".dropdown")[k].classList.remove("show");
                }
                
                var li_text = this.textContent;
                this.parentNode.parentNode.getElementsByTagName("input")[0].value = li_text;
            }
        )}
    }
    
    function autoScrollTo() {

        var navLink = document.querySelectorAll('nav a');

        for (var i = 0; i < navLink.length; i++) {  

            navLink[i].addEventListener('click', function(e){

                e.preventDefault();

                var dt = 1;

                var toClass = e.currentTarget.getAttribute("href");
                var scrollToElem = document.getElementsByClassName(toClass)[0].offsetTop;

                var scrollFromTopOffset = window.pageYOffset; 

                if(scrollFromTopOffset == scrollToElem) {
                    return;
                }

                var dDist = ((scrollFromTopOffset < scrollToElem) ? 1 : -1) * 50;

                (function foo(){
                    setTimeout(function() {
                        window.scrollTo(0, scrollFromTopOffset);
                        scrollFromTopOffset = scrollFromTopOffset + dDist;

                        if(dDist > 0) { 
                            if(scrollFromTopOffset >= scrollToElem) {
                                window.scrollTo(0, scrollToElem);
                            } else if(scrollFromTopOffset <= scrollToElem) {
                                foo();
                            }
                        } else { 
                            if(scrollFromTopOffset <= scrollToElem) {
                                window.scrollTo(0, scrollToElem);
                            } else if(scrollFromTopOffset >= scrollToElem) {
                                foo();
                            } 
                        }
                    }, dt);
                })();

            });
        }
    }    
    
    burgerMenu ();
    fixedNav();    
    dropdown();
    dropdown_li();
    autoScrollTo();
    
});
