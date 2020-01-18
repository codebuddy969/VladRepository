global.$ = global.jQuery = require('jquery');

require('bootstrap');

$('document').ready(function () {
    initBurgerClick();
    triggerSearchField();
    initSliders();
    setMenuInitials();
    adjustMenuElementsOnResize();
});

$(window).resize(function () {
    adjustMenuElementsOnResize();
});

function initBurgerClick() {
    var is_closed = false;
    $('[data-toggle-navigation]').click(function () {
        if (is_closed == true) {
            $(this).removeClass('is-open');
            $(this).addClass('is-closed');
            $('[data-navigation="header"]').stop().slideToggle();
            is_closed = false;
        } else {
            $(this).removeClass('is-closed');
            $(this).addClass('is-open');
            $('[data-navigation="header"]').stop().slideToggle();
            is_closed = true;
        }
    });
}

function triggerSearchField() {
    $('[data-menu-search]').focusin(function () {
        $(this).addClass('js-active');
    });
    $('[data-menu-search]').focusout(function () {
        $(this).removeClass('js-active');
    });
} 

function initSliders() {
    $('[data-header-slider]').slick({
        infinite: false,
        responsive: [{
            breakpoint: 767,
            settings: {
                infinite: true,
                arrows: false,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 2000
            }
        }]
    });

    $('[data-slider="recommendation"]').slick({
        infinite: false,
        slidesToShow: 3,
        responsive: 
        [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 2
                }
            },{
                breakpoint: 991,
                settings: {
                    slidesToShow: 3
                }
            },{
                breakpoint: 767,
                settings: {
                    slidesToShow: 2
                }
            },{
                breakpoint: 575,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
}

function setMenuInitials() {
    $('.en-default-navigation__list-item').each(function() {
        var mobile_element = $(this).parents().eq(1).find('[data-mobile-menu]');
        $(this).clone(true).appendTo(mobile_element).addClass('dropdown-item').hide();
    });
};

function adjustMenuElementsOnResize() {
    $('[data-dynamic-navigation]').each(function() {
        var childrens = $(this).children();
        var gap = 1200 / childrens.length;
        var rest = 1200;
        
        for(var i = 0; i < childrens.length; i++) {
            if (window.matchMedia("(max-width: "+(rest - 1)+"px)").matches) {
                childrens.eq((childrens.length - 1) - i).hide();
                $(this).parent().find('[data-mobile-menu]').children().eq((childrens.length - 1) - i).show();
            }
            if(window.matchMedia("(min-width: "+rest+"px)").matches) {
                childrens.eq((childrens.length - 1) - i).show();
                $(this).parent().find('[data-mobile-menu]').children().eq((childrens.length - 1) - i).hide();
            }
            var rest = rest - gap;
        }
    });
}
