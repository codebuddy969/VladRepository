document.addEventListener("DOMContentLoaded", function (event) {
    'use strict'

    tns({
        container: document.querySelector('.costumer-slide'),
        responsive: {
            320: 1,
        },
        gutter: 0,
        slideBy: 'page',
        dots: false,
        loop: true,
        controls: true,
        controlsContainer: document.querySelector('.custom-controls'),
        nav: true,
        navContainer: false,
    });

    let menuBtn = document.getElementById('menu-btn'),
        menu = document.getElementById('menu'),
        menuWrapper = document.querySelector('.menu-wrapper'),
        alink = document.querySelectorAll('#menu li a');

    menuBtn.addEventListener('click', function () {
        menu.classList.toggle('open');
        menuBtn.classList.toggle('open');
    });

    for (let i = 0; i < alink.length; i++) {
        alink[i].addEventListener('click', function () {
            menu.classList.remove('open');
            menuBtn.classList.remove('open');
        });
    }

    window.onscroll = function () {
        if (document.documentElement.scrollTop >= 40) {
            menuWrapper.classList.add('open');
        }

        if (document.documentElement.scrollTop <= 0) {
            menuWrapper.classList.remove('open');
        }
    }

    /*----------------------------------------------------------  Dropdowns  */
    function dropdown() {

        let dropdown = document.querySelectorAll('.dropdown input');

        for (let i = 0; i < dropdown.length; i++) {
            dropdown[i].addEventListener('click', function (ev) {
                ev.dropdown = true;

                let dropdownul = document.querySelectorAll(".show")[0];

                this.parentNode.getElementsByTagName("ul")[0].classList.toggle("show");

            });
        }
    }

    function dropdown_li() {

        let dropdownLinks = document.querySelectorAll('.row .dropdown li');

        for (let i = 0; i < dropdownLinks.length; i++) {
            dropdownLinks[i].addEventListener('click', function () {
                let dropdownul = document.querySelectorAll(".show")[0];
                dropdownul && dropdownul.classList.remove("show");
                let li_text = this.textContent;
                this.parentNode.parentNode.getElementsByTagName("input")[0].value = li_text;
            });
        }
    }
    dropdown();
    dropdown_li();

    document.getElementsByTagName('body')[0].addEventListener('click', function (ev) {
        if (!ev.dropdown) {
            document.getElementsByClassName('select-items')[0].classList.remove('show');
            document.getElementsByClassName('select-items')[1].classList.remove('show');
            document.getElementsByClassName('select-items')[2].classList.remove('show');
        }

    });

    function onLoad() {

        let itemImage = document.querySelectorAll('.item .item-image');
        let itemButton = document.querySelectorAll('.item .name');

        for (let t = 0; t < itemImage.length; t++) {
            let link = itemImage[t].parentElement.getElementsByClassName('default-btn')[0].getAttribute('href');
            (function (_link) {
                itemImage[t].addEventListener("click", function () {
                    window.location.href = _link;
                });
            })(link);
        }

        for (let s = 0; s < itemButton.length; s++) {
            let link2 = itemButton[s].parentElement.getElementsByClassName('default-btn')[0].getAttribute('href');
            (function (_link) {
                itemButton[s].addEventListener("click", function () {
                    window.location.href = _link;
                });
            })(link2);
        }
    }
    onLoad()
});

