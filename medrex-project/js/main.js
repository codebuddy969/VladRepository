var tag = document.createElement('script');
tag.src = "http://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubePlayerAPIReady() {
    player = new YT.Player('mt-t2-video__box', {
        height: '100%',
        width: '100%',
        playerVars: {
            'controls': 0, 
            'autohide': 1,
            'showinfo' : 0,
            'wmode': 'opaque',
            'rel': 0,
            'modestbranding': 1
        },
        videoId: 'RH3i7qONrT4',
    });
}

//---------------------------- Init Google maps

function CoordMapType(tileSize) {
    this.tileSize = tileSize;
}

CoordMapType.prototype.getTile = function(coord, zoom, ownerDocument) {
    var div = ownerDocument.createElement('span');
    div.style.display = 'block';
    div.style.width = this.tileSize.width + 'px';
    div.style.height = this.tileSize.height + 'px';
    div.style.backgroundColor = '#000';
    div.style.opacity = 0.5;
    return div;
};

var map;

function initMap() {
    var myLatLng = {lat: 41.875671, lng: -87.634224};

    var icon = {
        url: '../img/icons/google-maps/marker.svg',
        scaledSize: new google.maps.Size(38, 53),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(0, 0)
    };

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: myLatLng
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: icon,
        title: 'Click to open'
    });

    var contentString = 
        "<div class='mt-gmaps'>" +
        "<div class='mt-gmaps__street'>NE Killingsworth St 62</div>" +
        "<div class='mt-gmaps__city'>Hopewell, VA 23860</div>" +
        "</div>";

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });

    map.overlayMapTypes.insertAt(0, new CoordMapType(new google.maps.Size(256, 256)));
}


$(document).ready(function(){
    
    //---------------------------- Function for file uploads buttons

    $('.mt-upload').on('click', function() {

        var file_elem = $(this).find('.mt-upload__file');

        file_elem.trigger( "click" );

        if( !!navigator.userAgent.match(/Trident.*rv\:11\./) ) {
            var str = String(file_elem.val());
            var lastSlash = str.lastIndexOf("\\");
            $(this).next('.mt-upload__message').text('Selected file:' + ' ' + str.substring(lastSlash+1));
        } else {
            file_elem.change(function(){
                var str = String($(this).val());
                var lastSlash = str.lastIndexOf("\\");
                $(this).parent().next('.mt-upload__message').text('Selected file:' + ' ' + str.substring(lastSlash+1));
            });
        }

    });

    $('.mt-upload__file').click(function(event) {
        event.stopPropagation();
    }); 

    //---------------------------- Activate preloader function

    var counter = 0;
    $('html').addClass('mt-overflow-x');

    var interval = setInterval(function(){
        counter = counter + 1;

        $('.mt-t1-preloader__count').text(counter + '%');

        if (counter === 100) {
            clearInterval(interval);
            $('.mt-t1-preloader__spinner').stop( true, true ).fadeOut();
            setTimeout(function(){
                $('.mt-t1-preloader').fadeOut(500);
                $('html').removeClass('mt-overflow-x');
            }, 800);
        }

    }, 2);

    //---------------------------- Activates object fit applied on images for IE browser (ofi plugin)

    objectFitImages();

    //---------------------------- This functions open and close small appointment form

    $('.mt-t1-appointment__cross').on('click', function() {
        $(this).parents().eq(1).toggleClass('active');
    });

    $('.mt-t1-appointment__button').on('click', function() {
        $(this).parent().find('.mt-t1-appointment__overlay').toggleClass('active');
    });

    //---------------------------- This function enable video play on click

    $('.mt-t2-video__play').on('click', function() {
        $(this).parents().eq(1).find('.mt-t2-video__image').fadeOut('slow');
        $(this).parent().addClass('active');
        player.playVideo();
    });

    //---------------------------- Init Slick slider plugin

    $('.mt-t1-gallery__slider').slick({
        dots: false,
        infinite: true,
        speed: 900,
        swipe: true,
        arrows: false,
        centerMode: true,
        centerPadding: '0',
        variableWidth: true,
        responsive: [{
            breakpoint: 768,
            settings: {
                variableWidth: false,
            }
        }]
    });

    $('.mt-t1-testimonials__slider').slick({
        dots: false,
        infinite: true,
        speed: 900,
        arrows: true,
        centerPadding: '0',
        cssEase: 'cubic-bezier(0.800, -0.280, 0.735, 0.845)',
        appendArrows: '.mt-t1-testimonials__arrows',
    });

    $('.mt-t2-testimonials__slider').slick({
        dots: true,
        infinite: true,
        speed: 900,
        arrows: true,
        centerPadding: '0',
        slidesToShow: 2,
        slidesToScroll: 1,
        cssEase: 'cubic-bezier(0.800, -0.280, 0.735, 0.845)',
        appendArrows: '.mt-t2-testimonials__arrows',
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 1
            }
        }]
    });

    //---------------------------- This function activates buttons waves animation effect on mouse hover.

    (function buttons_click_anim() {

        var $btn_elem = $('.mt-button-component');

        $btn_elem.on('mouseenter', function(e) {
            var $this = $(this);
            var $offset = $this.parent().offset();
            var $circle = $this.find('.mt-button-component__elem');
            var x = e.pageX - $offset.left;
            var y = e.pageY - $offset.top;

            $circle.css({
                top: y + 'px',
                left: x + 'px'
            });

            $this.addClass('is-active');
        });

        $btn_elem.on('animationend webkitAnimationEnd oanimationend MSAnimationEnd', function(e) {
            $(this).removeClass('is-active');
        });

    })();

    //---------------------------- Init izi modal plugin

    var resize_event;

    $(window).resize(function() {
        clearTimeout(resize_event);
        resize_event = setTimeout(stop_resize, 50);
    });

    (function check_size() {
        if($(window).outerWidth() < 767) {
            modals_init();
        } else {
            modals_clear();
        }
    })();

    function stop_resize() {
        if($(window).outerWidth() < 767) {
            modals_init();
        } else {
            modals_clear();
        }
    }

    function modals_init() {
        for (var i = 0; i < 10; i++) {

            if( $('.mt-modal-sm-' + i + '[data-izi-width]') ) {
                var modal_w = parseInt($('.mt-modal-sm-' + i).data("izi-width"));
            }
            if( $('.mt-modal-sm-' + i + '[data-izi-title]') ) {
                var modal_title = String($('.mt-modal-sm-' + i).data("izi-title"));
            } else {
                modal_title = ' '
            }

            if($('.mt-modal-sm-' + i).length) {
                var parent = '.' + $('.mt-modal-sm-' + i).parent().attr('class').split(" ")[0];
                $('.mt-modal-sm-' + i).iziModal({
                    title: modal_title,
                    width: modal_w,
                    padding: 15,
                    appendTo: parent
                });
            }
        }
    };

    function modals_clear() {
        for (var i = 0; i < 10; i++) {
            if($('.mt-modal-sm-' + i).length) {
                $('.mt-modal-sm-' + i).iziModal('destroy');
                $('.mt-modal-sm-' + i).removeClass('iziModal');
                $('html').removeClass('iziModal-isAttached');
                $('html').removeClass('iziModal-isOverflow');
            }
        }
    }

    //------- This function is used for scroll down, when round buttons under headers are clicked.

    $("[data-scroll-aim]").on('click', function( event ) {

        event.preventDefault();

        var scroll_aim = String($(this).data('scroll-aim'));

        $("[data-scroll-target]").each(function() {
            var scroll_target = String($(this).data('scroll-target'));
            var top_distance = $(this).offset().top;
            var top_scroll;
            
            var window_position = Math.floor($( window ).height() + 200);

            if(scroll_aim === scroll_target) {
                
                var timing = setInterval(function(){ 
                    var top_scroll = $(document).scrollTop();
                    
                    $(".animated").each(function() {
                        var animation_type = String($(this).data('animation'));
                        if($(this).offset().top < top_scroll + window_position) {
                            $(this).addClass(animation_type);
                        }
                    });
                    
                }, 600);
                
                $("html, body").animate({ scrollTop: top_distance }, 600);
                $("html, body").promise().done(function(){
                    setTimeout(function(){
                        clearInterval(timing);
                    }, 2000);
                });
    
            }
        });
    });

    for (var i = 0; i < 5; i++) {

        //------- Add additional class with padding to header in case if Navbar is fixed in order to compensate height of fixed Navbar block

        if($('.mt-t'+i+'-navbar').hasClass('mt-t'+i+'-navbar--fixed')) {
            $('.mt-t'+i+'-header').addClass('mt-header-padding');
        }

        //------- This function will check burger class and will open navbar with the same class type (for example ".mt-t1-burger" will open ".mt-t1-navbar__nav")

        $('.mt-t'+i+'-burger').attr("order",i);
        $('.mt-t'+i+'-burger').on('click', function() {
            $(this).toggleClass('active');
            var order = $(this).attr('order');
            $('.mt-t'+order+'-navbar__nav').slideToggle('fast');
        });

        //------- Accordeon function ( from Faq Section ), trigger sliding element.

        $('.mt-t'+i+'-trigger').attr("order",i);
        $('.mt-t'+i+'-trigger').on('click', function() {
            var elem = String($(this).data('elem'));
            var order = $(this).attr('order');
            if($(this).data('elem') === 'cross') {
                $(this).toggleClass('active');
            };
            $(this).next('.mt-t'+order+'-trigged').slideToggle();
        });

    }
    
    //------- Momentul plugin function that add`s smooth scrolling to page wrapper original plugin from 'https://github.com/iahnn/jQuery-Momentum-Scroll'

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    var trident = ua.indexOf('Trident/');
    var edge = ua.indexOf('Edge/');
    
    if (msie > 0 || trident > 0 || edge > 0) {
        return false;
    } else {
        var win = $(window)
        , target = $('body')
        , wrapper = target.find('.mt-momentum')
        , header = target.find('header')
        , easing = "ease-out" //css easing
        , duration = "1.1s" //duration ms(millisecond) or s(second)
        , top = 0
        , resizeTimeout
        , jmScroll = {
            _init: function() {
                if( wrapper.length == 1 ) {
                    target.css({
                        margin: '0',
                        padding: '0',
                        width: '100%'
                    });

                    wrapper.css({
                        transition: 'transform ' + duration + ' ' + easing,
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        width: '100%',
                        padding: '0',
                        zIndex: '2',
                        display: 'block',
                        backfaceVisibility: 'hidden'
                    });

                    jmScroll._reFlow(function() {
                        jmScroll._scroll();
                    });
                }
            },

            _scroll: function() {
                top = win.scrollTop();
                wrapper.css('transform', 'translateY(-' + top + 'px)');
            },

            _reFlow: function(callback) {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(function() {
                    target.height(wrapper.height());

                    var getType = {};
                    var isCallback = callback && getType.toString.call(callback) === '[object Function]';

                    if(isCallback) {
                        callback();
                    }
                }, 200);
            }
        };

        if (typeof window.ontouchstart == 'undefined') {
            win.on({
                scroll: function () {
                    jmScroll._scroll();
                }
                , resize: function() {
                    jmScroll._reFlow();
                }
                , load: function() {
                    jmScroll._init();
                }
            });
        }
        
    }    

});

$(document).scroll(function() {

    //------- Call for function responsible for scroll animation.

    animation_on_scroll();

    //------- Function for hiding and displaying back-to-top buttons on scroll.

    var window_height = $( window ).height();

    if($(document).scrollTop() > window_height) {
        for (var i = 0; i < 10; i++) {
            $('.mt-t'+i+'-back').fadeIn();
        }  
    } else {
        for (var i = 0; i < 10; i++) {
            $('.mt-t'+i+'-back').fadeOut();
        } 
    }

});

//------- Function responsible for scroll animation.

function animation_on_scroll() {
    var window_position = Math.floor($( window ).height() + 200);

    $(".animated").each(function() {
        var animation_type = String($(this).data('animation'));

        if($(this).offset().top < $(document).scrollTop() + window_position) {
            $(this).addClass(animation_type);
            $('body').addClass('mt-overflow-x');
        } else {
            $(this).removeClass(animation_type);
        }
    });
}
