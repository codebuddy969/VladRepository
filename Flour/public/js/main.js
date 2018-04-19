/*jslint browser: true*/
/*global document*/
/*global window*/

"use strict";

document.addEventListener("DOMContentLoaded", function() {

    var burger = document.getElementsByClassName('burger')[0];
    var input = document.querySelectorAll('.dropdown-form input');
    var listLi = document.querySelectorAll('.dropdown-form li');

    burger.addEventListener("click", function() {
        var menu = document.getElementsByClassName('navigation')[0];
        menu.classList.toggle('menu-out');
        burger.classList.toggle('burgerchange');
    });

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
    autoScrollTo();

    //    var link = document.querySelectorAll('nav a');
    //
    //    for (var i = 0; i < link.length; i++) {
    //        link[i].addEventListener('click', function(event) {
    //            event.preventDefault();
    //
    //            var el = event.currentTarget;
    //
    //            var to_elem = el.getAttribute("href");
    //            var top = document.getElementsByClassName(to_elem)[0].offsetTop;
    //            console.log(top);
    //
    //            window.scrollTo({
    //                "behavior": "smooth",
    //                "top": top
    //            });
    //
    //        }
    //    )}

    for (var j = 0; j < input.length; j++) {
        input[j].onclick = function(e){

            var El = e.currentTarget;
            var list = document.querySelectorAll('.dropdown-form ul');

            for (var k = 0; k < list.length; k++) {
                list[k].style.display = 'none';
            }

            El.parentElement.getElementsByTagName('ul')[0].style.display = 'block';

        };
    }

    for (var t = 0; t < listLi.length; t++) {
        listLi[t].onclick = function(e){
            var El = e.currentTarget;
            var content = El.innerHTML;
            El.parentElement.parentElement.getElementsByTagName('input')[0].value = content;
            El.parentElement.parentElement.getElementsByTagName('ul')[0].style.display = 'none';
        };
    }

    window.addEventListener('mouseup', function(e){

        var navBlock = document.getElementsByClassName('navigation')[0];
        var dropdownUl = document.querySelectorAll('.dropdown-form ul');

        if (navBlock.contains(e.target) || burger.contains(e.target)){
            null;
        } else if (!navBlock.contains(e.target) || !burger.contains(e.target)){
            navBlock.classList.remove('menu-out');
            burger.classList.remove('burgerchange');
        }

        for (var t = 0; t < dropdownUl.length; t++) {
            if (!dropdownUl[t].contains(e.target)){
                dropdownUl[t].style.display = 'none';
            }
        }
    })

    window.addEventListener('scroll', function(){

        var navLogo = document.getElementsByClassName('logo-row')[0];

        if (document.documentElement.scrollTop >= 40) {
            navLogo.classList.add('logo-row-fixed');
        } else if (document.documentElement.scrollTop <= 40) {
            navLogo.classList.remove('logo-row-fixed');
        }
    });


});
