document.addEventListener("DOMContentLoaded", function (event) {
 'use strict';
  function menu() {
    let menuOpen = document.getElementById('open-menu');
    let menuClose = document.getElementById('closeBtn');

    menuOpen.addEventListener('click', function () {
      document.getElementById('menu').classList.add('activated-menu');
    });

    menuClose.addEventListener('click', function () {
      document.getElementById('menu').classList.remove('activated-menu');
    });
  }
  menu();

  /*-----Menu close on parent click-----*/
  let bodyTag = document.getElementsByTagName('body');
  let element = document.getElementById('menu');

  function clickedOrNot(e) {
    if (e.target !== element) {
      // action in the case of click outside 
      document.getElementById('menu').classList.remove('activated-menu');
    }
  }
  bodyTag[0].addEventListener('click', clickedOrNot, true);

  /*-----Smooth Scroll-----*/
  (function () {

   

    // Feature Test
    if ('querySelector' in document && 'addEventListener' in window && Array.prototype.forEach) {

      // Function to animate the scroll
      let smoothScroll = function (anchor, duration) {

        // Calculate how far and how fast to scroll
        let startLocation = window.pageYOffset;
        let endLocation = anchor.offsetTop;
        let distance = endLocation - startLocation;
        let increments = distance / (duration / 16);
        let stopAnimation;

        // Scroll the page by an increment, and check if it's time to stop
        let animateScroll = function () {
          window.scrollBy(0, increments);
          stopAnimation();
        };

        // If scrolling down
        if (increments >= 0) {
          // Stop animation when you reach the anchor OR the bottom of the page
          stopAnimation = function () {
            let travelled = window.pageYOffset;
            if ((travelled >= (endLocation - increments)) || ((window.innerHeight + travelled) >= document.body.offsetHeight)) {
              clearInterval(runAnimation);
            }
          };
        }
        // If scrolling up
        else {
          // Stop animation when you reach the anchor OR the top of the page
          stopAnimation = function () {
            let travelled = window.pageYOffset;
            if (travelled <= (endLocation || 0)) {
              clearInterval(runAnimation);
            }
          };
        }

        // Loop the animation function
        let runAnimation = setInterval(animateScroll, 16);

      };

      // Define smooth scroll links
      let scrollToggle = document.querySelectorAll('.scroll');

      // For each smooth scroll link
      [].forEach.call(scrollToggle, function (toggle) {

        // When the smooth scroll link is clicked
        toggle.addEventListener('click', function (e) {

          // Prevent the default link behavior
          e.preventDefault();

          // Get anchor link and calculate distance from the top
          let dataID = toggle.getAttribute('href');
          let dataTarget = document.querySelector(dataID);
          let dataSpeed = toggle.getAttribute('data-speed');

          // If the anchor exists
          if (dataTarget) {
            // Scroll to the anchor
            smoothScroll(dataTarget, dataSpeed || 500);
          }

        }, false);

      });

    }

  })();
  /*-----Smooth Scroll End-----*/



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
/*----------------------------------------------------------  Dropdowns  */

function dropdown_li() {

  let dropdownLinks = document.querySelectorAll('.dropdown li');

  for (let i = 0; i < dropdownLinks.length; i++) {
    dropdownLinks[i].addEventListener('click', function () {

      let dropdownul = document.querySelectorAll(".show")[0];
      dropdownul && dropdownul.classList.remove("show");

      let li_text = this.textContent;
      this.parentNode.parentNode.getElementsByTagName("input")[0].value = li_text;
    }
    )
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
  let itemButton = document.querySelectorAll('.item .item-info .name');

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