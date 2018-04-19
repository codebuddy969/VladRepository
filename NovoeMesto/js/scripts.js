$( document ).ready(function() {

    
// ДАННЫЙ ФАЙЛ ОТВЕЧАЕТ ЗА ФУНКЦИОНАЛ ВЕБ-СТРАНИЦЫ, РЕКОМЕНДУЕТСЯ СДЕЛАТЬ КОПИЮ ПЕРЕД НАЧАЛОМ РЕДАКТИРОВАНИЯ ДАННОГО ФАЙЛА 
    
    $('.table_internal tr').each(function() {
            var el = $(this).find("td").eq(0);
            var el2 = $(this).find("th").eq(0);
            var h = $(this).height();
            el2.css({
                height: h
            });
            el.css({
                height: h
            })
    });
    
//---------------------------- Программный код который отвечает за появление разного рода Pop up
    
    $(".cb_block3").on("click","button", function () {
        $('.pkm_container_consultancy').modal('toggle');
    });
    
    $(".cb_block4").on("click","button", function () {
        $('.pkm_container_service').modal('toggle');
    });

    $(".map_box").on("click","a", function () {
        $('.pkm_container_discover').modal('toggle');
    });
    
    $(".ssicbrb_links a:first-child").click(function () {
        $('.pkm_container_request').modal('toggle');
    });
    
    
//----------------------------  Данная функция отвечает за прокрутку страница в зависимости от нажатой кнопки в меню "nav" навигация в атрибут href='' прописывается класс элемента к которому будет скролл
    
    $("nav").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
        top = $(id).offset().top;

        $('html, body').animate({
            scrollTop: top
        }, 1500);
    });
    
//----------------------------  Данная функция загружает другие функции в тот момент когда происходит загрузка страницы
    
    $(document).ready(function(){
       Resizefunction();
       Resizefunction2();
       HighestBlock();
       ResizeTable();
       HideMenu();
       centerarrows();
    });
    
//----------------------------  Данная функция загружает другие функции в тот момент когда происходит ресайз окна браузера   
    
    $(window).resize(function(){
        
       Resizefunction();
       Resizefunction2();
       HighestBlock();
       ResizeTable();
       HideMenu();
       centerarrows();
       Yresize();
    });
    
    
    
//----------------------------  Данная функция отвечает за одинаковую высоту блоков в разделе отзывы
    
    
    function HighestBlock() { 
        
        if ($(window).width() < 992){
            var maxHeight = -1;

            $('.tici_block').each(function() {
               $(this).height('auto');
               maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
            });

            $('.tici_block').each(function() {
               $(this).height(maxHeight);
            }); 
        }
        else {
            $('.tici_block').height('auto');
        }
    }
    
//----------------------------  Данная функция отвечает за меню навигации при ширине экрана свыше 992 пикселей и соответственно за прилипания меню к верху при скроллинге
    
    function Resizefunction2() {
        if ($(window).width() > 992) {
            $('nav').show();
            var topBar = $('.top_contacts_bar').height();
            $(window).scroll(function() {
                if ($(this).scrollTop() >= 100) { 
                    $('nav').css({"position": "fixed", "top": "0"});
                }
                else if ($(this).scrollTop() < 100) { 
                    $('nav').css({"position": "absolute", "top": "auto"});
                }
            });
        }
        else {
            $('nav').hide();
        }
    }
    
//----------------------------  Данная функция отвечает за синее меню навигации при ширине экрана ниже 992 пикселей и соответственно за прилипания меню к верху при скроллинге
    
    $(window).scroll(function() {
        if ($(this).scrollTop() > 0) { 
            $('.top_button').css({"position": "fixed", "top": "0"});
        }
    });
    
//----------------------------  Данная функция отвечает за появление синие кнопки возврата а также за саму функцию возврата
    
    $(window).scroll(function() {
        
        var lostOffset = $('.table').offset().top + 30;
        if ($(this).scrollTop() > lostOffset) { 
            $('.ontop_btn').show();
        }
        else if ($(this).scrollTop() < lostOffset) { 
            $('.ontop_btn').hide();
        }
    });
    
    $('.ontop_btn').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 1500);
    });

//----------------------------  Данная функция отвечает за смену позиции блока контактов в разделе карты внизу страницы соответственно при ширине экрана ниже 768 пикселей блок контактов отправляется в Footer и наоборот при ширине экрана свыше 768 пикселей
    
    function Resizefunction() {

        if ($(window).width() <= 576){
            $('.map_box').insertAfter('.contacts_bar_footer .cb_block1');
        }   
        else if ($(window).width() >= 576){
            $('.map_box').prependTo('.map_inner');
        }
    }
    
//----------------------------  Данная функция выравнивает высоту 1 Element TD в разделе таблицы так как этот элемент при ширине экрана ниже 992 пикселеи приобретает свойства Абсолют и уже не регулируется родителем элементом TR таблицы
    
    function ResizeTable() {        
        setTimeout(function () {
            $('.table_internal tr').each(function() {
                var el = $(this).find("td").eq(0);
                var el2 = $(this).find("th").eq(0);
                var h = $(this).height();
                el2.css({
                    height: h
                });
                el.css({
                    height: h
                })
            });
        }, 5000);
    }
    
//----------------------------  Данная функция используется в разделе "выбор решения" когда нажимается кнопка меню ей добавляется класс с зелёным цветом фона и соответственно убирается этот класс у остальных элементов когда прозрачность равна нулю происходит смена контента через атрибут "data-nr-box" который уникален для каждого блока контента
    
    
    $( ".si_bottom li" ).click(function() {
        var index = $(this).index();
        $( ".si_bottom li" ).removeClass('li_active');
        $(this).addClass('li_active');
        $('.sibc_inner').animate({
            opacity: 0,
        }, 500, function() {
            $(".sibc_inner").removeClass('sibc_choose_active');
            $(".sibc_inner[data-nr-box="+ index +"]").addClass("sibc_choose_active");             
        }).animate({
            opacity: 1,
        }, 500);
    });
        
//----------------------------  Данная функция отвечает за открытие меню при нажатии на кнопку меню когда ширина экрана ниже 992 пикселей
    
    $(".top_button" ).fancybox({
        'hideOnContentClick': true,
    });
        
//----------------------------  Данная функция отвечает за скрытие навигации при мобильнои ширине экрана 
    
    function HideMenu() {

        $(window).resize(function() {
            $.fancybox.close();
        });
        
        if ($(window).width() <= 992){
            $("nav").on("click","a", function (event) {
                $("nav").hide();
                $.fancybox.close();
            });
        }
        else if ($(window).width() > 992) {
            $("nav").on("click","a", function (event) {
            });

        }
    }
    
//----------------------------  Открывает первый блок с кнопками в разделе выбор продукта и модели
    
    $(".ssicbl_container[data-nr-box=1]").show();
    
//----------------------------  Данная функция отвечает за открытие блока меню аккордеон где содержится по четыре кнопки, при нажатии на верхнюю зелёную кнопку, также здесь происходит переключение класса который отвечает за вращение стрелочки внутри зелёныой кнопки меню аккордеона
    
    $('.ssicbl_trigger').click(function() {
        $(this).toggleClass('ssicbl_trigger2');
        var number = $(this).data("nr-element");
        $(".ssicbl_container[data-nr-box="+ number +"]").slideToggle( "slow" );
    });
    
//----------------------------  Данная функция отвечает за медленное появление ссылок снизу при наведении курсора на элемент товара в разделе выбор продукта и модели
    
    $('.ssicbr_block').mouseover(function(){
        if($('.ssicbrb_links').hasClass('ssicbrb_links_slided')) {
            console.log('');
        }
        else {
            $(this).find($('.ssicbrb_links')).addClass('ssicbrb_links_slided');
        }
    });
    
    $('.ssicbr_block').mouseleave(function(){
        $(this).find($('.ssicbrb_links')).removeClass('ssicbrb_links_slided');
    });
    
    
    
//----------------------------   Функция которая отвечает за смену контента в разделе выбор продукта и модели также здесь инициализируется 2 Функции слайдера slick первая функция срабатывает при загрузке самой странице вторая функция при клике на кнопку используется также принцип работы через атрибут "data-nr-box"
    
    
    var slickSlider = $('.ssicbl_content').click(function() {
        $('.ssicbl_content').removeClass('ssicbl_active');
        $(this).addClass('ssicbl_active');
        var number = $(this).data("nr-element");
        
        $('.ssicbr_container').animate({
            opacity: 0,
        }, 500, function() {
            $(".ssicbr_container").removeClass('ssicbr_container_disp').slick('unslick');
            $(".ssicbr_container[data-nr-box="+ number +"]").slick({
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: false,
              arrows: true,
              responsive: [
                {
                  breakpoint: 1200,
                  settings: {
                    slidesToShow: 2,
                  }
                },
                {
                  breakpoint: 992,
                  settings: {
                    slidesToShow: 1,
                    draggable: false,
                    swipe: false,
                    touchMove: false
                  }
                }
              ]
            }).addClass('ssicbr_container_disp').slick('setPosition');
        }).delay( 400 ).animate({
            opacity: 1,
        }, 500);
    });
    
    
    $('.ssicbr_container').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: false,
      arrows: true,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 1,
            draggable: false,
            swipe: false,
            touchMove: false
          }
        }
      ]
    });
    
        
    
//----------------------------  Инициализация слайдера для раздела отзывы
    
    var slickSlider = $('.ti_container').slick({
      slidesToShow: 2,
      infinite: false,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            draggable: false,
            swipe: false,
            touchMove: false
          }
        }
      ]
    });
    
//----------------------------  Подключение карт Yandex Maps
    
    function Yresize() {
        if (($(window).width()) < 576){
            myMap.behaviors.disable('multiTouch');
            myMap.behaviors.disable('drag');
        }
        else {
            myMap.behaviors.enable('multiTouch');
            myMap.behaviors.enable('drag');
        }
    }
    
    ymaps.ready(init);
        var myMap, 
            myPlacemark;

    function init(){ 
        myMap = new ymaps.Map("map", {
            center: [55.6998,37.8672],
            zoom: 17,
        }); 
        
        myMap.behaviors.disable('scrollZoom');

        myPlacemark = new ymaps.Placemark([55.6998,37.8672], {
            hintContent: 'Москва!',
            balloonContent: 'Столица России'
        });
        
        var myPlacemark = new ymaps.Placemark([55.6998,37.8672] , {},
        { iconLayout: 'default#image',
          iconImageHref: './img/icons/mark.svg',
          iconImageSize: [40, 51],
          iconImageOffset: [-20, -47] });     
 
        myMap.geoObjects.add(myPlacemark);
    }
    
    $(function($){
        var frm = $('form');
            frm.submit(function (ev) {
            ev.preventDefault();
        });
    });
    
//----------------------------  Функция которая отвечает за автоцентрирование стрелок в разделе отзывы на экранах с разрешением ниже 576px
    
    function centerarrows() { 
        
        var tici_block_height;
        if (parseInt($(window).width()) < 576){
            tici_block_height = $('.slick-active .tici_block:first-child()').height() + 80;
            $('.ti_container > button').css("top", tici_block_height); 

            setTimeout(function() {
                tici_block_height = $('.slick-active .tici_block:first-child()').height() + 80;
                $('.ti_container > button').css("top", tici_block_height); 
            }, 500);
        }

        slickSlider.on('afterChange', function(event, slick, direction){
            if (parseInt($(window).width()) < 576){
                tici_block_height = $('.slick-active .tici_block:first-child()').height() + 80;
                $('.ti_container > button').css("top", tici_block_height);
            }
        });
    }
    
    
    
    
//----------------------------  Маскировка телефона при вводе
    
    $('.header_phone').mask("+7 (999) 999-99-99");
    $('.middle_phone').mask("+7 (999) 999-99-99");
    $('.bottom_phone').mask("+7 (999) 999-99-99");
    $('.pop_phone').mask("+7 (999) 999-99-99");
    $('.pop_request_phone').mask("+7 (999) 999-99-99");
    $('.pop_discover_phone').mask("+7 (999) 999-99-99");
    $('.pop_consultancy_phone').mask("+7 (999) 999-99-99");
    $('.pop_service_phone').mask("+7 (999) 999-99-99");
    
//----------------------------  Функции AJAX для отправки данных через формы веб-сайта
    
    $(".header_send").click(function(){
        if( ($('.header_name').val().length === 0 ) || ($('.header_phone').val().length === 0 ))  {
            $('.header_send').css("background-color", "red").html("Введите данные!");
            setTimeout(function(){ 
                $('.header_send').css("background-color", "#00c3c3").html("оставить заявку");
            }, 3000);
        }else {
            var name = $(".header_name").val();
            var phone = $(".header_phone").val();
                        
            $.ajax({
                type: "POST",
                url: "functions.php",
                data: { name : name, phone : phone },
                success: function(data) {
                    $('.header_send').css("background-color", "#91b60e").html("отправлено!");
                    $('input').val('');
                    setTimeout(function(){ 
                        $('.header_send').css("background-color", "#00c3c3").html("оставить заявку");
                    }, 5000);
                }
            });
        }
    });
    
    $(".middle_send").click(function(){
        if( ($('.middle_name').val().length === 0 ) || ($('.middle_phone').val().length === 0 ))  {
            $('.middle_send').css("background-color", "red").html("Введите данные!");
            setTimeout(function(){ 
                $('.middle_send').css("background-color", "#91b60e").html("оставить заявку");
            }, 3000);
        }else {
            var name = $(".middle_name").val();
            var phone = $(".middle_phone").val();
                        
            $.ajax({
                type: "POST",
                url: "functions.php",
                data: { name : name, phone : phone },
                success: function(data) {
                    $('.middle_send').css("background-color", "#91b60e").html("отправлено!");
                    $('input').val('');
                    setTimeout(function(){ 
                        $('.middle_send').css("background-color", "#91b60e").html("оставить заявку");
                    }, 3000);
                }
            });
        }
    });
    
    $(".bottom_send").click(function(){
        if( ($('.bottom_name').val().length === 0 ) || ($('.bottom_phone').val().length === 0 ))  {
            $('.bottom_send').css("background-color", "red").html("Введите данные!");
            setTimeout(function(){ 
                $('.bottom_send').css("background-color", "#91b60e").html("оставить заявку");
            }, 3000);
        }else {
            var name = $(".bottom_name").val();
            var phone = $(".bottom_phone").val();
                        
            $.ajax({
                type: "POST",
                url: "functions.php",
                data: { name : name, phone : phone },
                success: function(data) {
                    $('.bottom_send').css("background-color", "#91b60e").html("отправлено!");
                    $('input').val('');
                    setTimeout(function(){ 
                        $('.bottom_send').css("background-color", "#91b60e").html("оставить заявку");
                    }, 3000);
                }
            });
        }
    });
    
    $(".pop_send").click(function(){
        if( ($('.pop_name').val().length === 0 ) || ($('.pop_phone').val().length === 0 ) || ($('.pop_email').val().length === 0 ))  {
            $('.pop_send').css("background-color", "red").html("Введите данные!");
            setTimeout(function(){ 
                $('.pop_send').css("background-color", "#91b60e").html("Узнать цену под ключ");
            }, 3000);
        }else {
            var name = $(".pop_name").val();
            var phone = $(".pop_phone").val();
            var email = $(".pop_email").val();
                        
            $.ajax({
                type: "POST",
                url: "functions.php",
                data: { name : name, phone : phone, email : email },
                success: function(data) {
                    $('.pop_send').css("background-color", "#91b60e").html("отправлено!");
                    $('input').val('');
                    setTimeout(function(){ 
                        $('.pop_send').css("background-color", "#91b60e").html("Узнать цену под ключ");
                    }, 3000);
                }
            });
        }
    });
    
    $(".pop_request_send").click(function(){
        if( 
            ($('.pop_request_name').val().length === 0 ) || 
            ($('.pop_request_phone').val().length === 0 ) || 
            ($('.pop_request_textarea').val().length === 0 ) ) { 
                $('.pop_request_send').css("background-color", "red").html("Введите данные!");
                setTimeout(function(){ 
                    $('.pop_request_send').css("background-color", "#91b60e").html("отправить");
                }, 3000);
        }
        else {
            var name = $(".pop_request_name").val();
            var phone = $(".pop_request_phone").val();
            var text = $(".pop_request_textarea").val();
                        
            $.ajax({
                type: "POST",
                url: "functions.php",
                data: { name : name, phone : phone, text : text },
                success: function(data) {
                    $('.pop_request_send').css("background-color", "#91b60e").html("отправлено!");
                    $('input').val('');
                    $('textarea').val('');
                    setTimeout(function(){ 
                        $('.pop_request_send').css("background-color", "#91b60e").html("отправить");
                    }, 3000);
                }
            });
        }
    }); 
    
    $(".pop_discover_send").click(function(){
        if( 
            ($('.pop_discover_name').val().length === 0 ) || 
            ($('.pop_discover_phone').val().length === 0 ) || 
            ($('.pop_discover_textarea').val().length === 0 ) ) { 
                $('.pop_discover_send').css("background-color", "red").html("Введите данные!");
                setTimeout(function(){ 
                    $('.pop_discover_send').css("background-color", "#00c3c3").html("отправить");
                }, 3000);
        }
        else {
            var name = $(".pop_discover_name").val();
            var phone = $(".pop_discover_phone").val();
            var text = $(".pop_discover_textarea").val();
                        
            $.ajax({
                type: "POST",
                url: "functions.php",
                data: { name : name, phone : phone, text : text },
                success: function(data) {
                    $('.pop_discover_send').css("background-color", "#91b60e").html("отправлено!");
                    $('input').val('');
                    $('textarea').val('');
                    setTimeout(function(){ 
                        $('.pop_discover_send').css("background-color", "#00c3c3").html("отправить");
                    }, 3000);
                }
            });
        }
    });
    
    $(".pop_consultancy_send").click(function(){
        if( 
            ($('.pop_consultancy_name').val().length === 0 ) || 
            ($('.pop_consultancy_phone').val().length === 0 ) ) { 
                $('.pop_consultancy_send').css("background-color", "red").html("Введите данные!");
                setTimeout(function(){ 
                    $('.pop_consultancy_send').css("background-color", "#91b60e").html("получить консультацию");
                }, 3000);
        }
        else {
            var name = $(".pop_consultancy_name").val();
            var phone = $(".pop_consultancy_phone").val();
                        
            $.ajax({
                type: "POST",
                url: "functions.php",
                data: { name : name, phone : phone },
                success: function(data) {
                    $('.pop_consultancy_send').css("background-color", "#91b60e").html("отправлено!");
                    $('input').val('');
                    setTimeout(function(){ 
                        $('.pop_consultancy_send').css("background-color", "#91b60e").html("получить консультацию");
                    }, 3000);
                    
                }
            });
        }
    });
    
    $(".pop_service_send").click(function(){
        if( 
            ($('.pop_service_name').val().length === 0 ) || 
            ($('.pop_service_phone').val().length === 0 ) ) { 
                $('.pop_service_send').css("background-color", "red").html("Введите данные!");
                setTimeout(function(){ 
                    $('.pop_service_send').css("background-color", "#00c3c3").html("оставить заявку");
                }, 3000);
        }
        else {
            var name = $(".pop_service_name").val();
            var phone = $(".pop_service_phone").val();
                        
            $.ajax({
                type: "POST",
                url: "functions.php",
                data: { name : name, phone : phone },
                success: function(data) {
                    $('.pop_service_send').css("background-color", "#91b60e").html("отправлено!");
                    $('input').val('');
                    setTimeout(function(){ 
                        $('.pop_service_send').css("background-color", "#00c3c3").html("оставить заявку");
                    }, 3000);
                }
            });
        }
    });

    
//----------------------------  Данная функция отвечает за нажатие кнопки в разделе проблема очевидно
    
    $(".problem_button").click(function() {
    $('html,body').animate({
        scrollTop: $(".top_container").offset().top},
        'slow');
    });
    
//----------------------------  Данная функция отвечает за нажатие на Зелёную кнопку под названием сравнительная таблица
    
    $(".sibcbr_block2 button").click(function() {
    $('html,body').animate({
        scrollTop: $(".table").offset().top},
        'slow');
    });
    
    
//----------------------------  Данная функция отвечает за открытие/закрытие popup элементов
    
    
    $(".ssicbrb_links a:last-child").click(function(event) {
        
        // Get Content from index file
        var title = $(this).closest('.ssicbr_block').find('h3').html();
        var image = $(this).closest('.ssicbr_block').find('img').attr("src");
        var price_green = $(this).closest('.ssicbr_block').find('.price_green').html();
        var price_blue = $(this).closest('.ssicbr_block').find('.price_blue').html();
        var line1 = $(this).closest('.ssicbr_block').find('.line1').html();
        var line2 = $(this).closest('.ssicbr_block').find('.line2').html();
        var line3 = $(this).closest('.ssicbr_block').find('.line3').html();
        var line4 = $(this).closest('.ssicbr_block').find('.line4').html();
        var line5 = $(this).closest('.ssicbr_block').find('.line5').html();
        var line6 = $(this).closest('.ssicbr_block').find('.line6').html();
        var text_data = $(this).closest('.ssicbr_block').find('.text_data').html();
        
        
        // Display content that we get before        
        $(".pkm_container_black").find('.pkmc_block_left h2').html(title);
        $(".pkm_container_black").find('.pkmc_block_left .pkmcbl_img').attr("href", image);
        $(".pkm_container_black").find('.pkmc_block_left img').attr("src", image);
        $(".pkm_container_black").find('.pkmc_block_left .price_green').html(price_green);
        $(".pkm_container_black").find('.pkmc_block_left .price_blue').html(price_blue);
        $(".pkm_container_black").find('.pkmc_block_left .line1').html(line1);
        $(".pkm_container_black").find('.pkmc_block_left .line2').html(line2);
        $(".pkm_container_black").find('.pkmc_block_left .line3').html(line3);
        $(".pkm_container_black").find('.pkmc_block_left .line4').html(line4);
        $(".pkm_container_black").find('.pkmc_block_left .line5').html(line5);
        $(".pkm_container_black").find('.pkmc_block_left .line6').html(line6);
        $(".pkm_container_black").find('.pkmc_block_left .text_data').html(text_data);
        
        $('.pkm_container_black').modal('toggle');
        
        return false;
    });
    
});