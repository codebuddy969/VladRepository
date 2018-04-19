$( document ).ready(function() {
        
    var WindowSize = $(this).outerWidth();
    var ChildClick = $('.form_question').click();

    $(window).on('resize', function() {
        WindowSize = $(this).outerWidth();
        $('.sidebar_text').removeClass('expanded');
        
        if ( WindowSize  > 576 ) {
            $('.datepick').datepicker({
                position: 'bottom right',
            }); 
        } else if ( WindowSize  < 576 ) {
            $('.datepick').datepicker({
                position: 'bottom left',
            }); 
        } 
        
    });
    
    //------------------------------------- Burger Button Triggering on screens between 1024 - 768 px.
    
    $('.burger').on( "click", function() {
        $(this).toggleClass("change");
        $(this).toggleClass('move');
        $('.content_container').toggleClass('move');
    });
    
    //-------------------- General Function for hiding diverse elements based on parent container click
    
    $(".content_container").on("click", function () {
        
        // Removing sidebar blue text class
        
        $('.sidebar_text').removeClass('expanded');
        
    });
    
    
    $('.datepick').datepicker({
		startDate: new Date('01.01.1920'),
        position: 'bottom right',
    });
        
    $("body").on("click", function (event) {
        
        // Removing container with search results
        
        var inputTarget   = !$(event.target).is('.select_arrow');
        var inputTarget2   = !$(event.target).is('.form_input');
        
        if(inputTarget && inputTarget2) {
            $('.input_results, .input_results_norm').hide();
            $('.input_block, .input_block_100').removeClass('z_index');
            $('.data_result').removeClass('shadow');
            $('.numb').html(0);
        }
                
        //-------------------- Calendar
        
        $('.datepick').datepicker({
            minDate: new Date(1910,11,1),
            maxDate: new Date(2020,11,1),
        });
        
    });
    
      
    //-------------------- Function for triggering Show hide elements. Same class is added to Html
            
    
    $( ".click_block" ).click(function(){

        // ---- Target Multiple Data Element with one function
        
        if ($(this).data("show-elem")) {
            var replace = $(this).data("show-elem").split(",");
            
            for ( var i = 0, l = replace.length; i < l; i++ ) {
                var replace_each = replace[i];
                
                if( replace_each.indexOf( 'h/' ) != -1 ){
                    var hideElem = replace_each.substr(replace_each.indexOf("/") + 1);
                    $("[data-element="+ hideElem +"]").hide();
                }
                else if( replace_each.indexOf( 's/' ) != -1 ){
                    var showElem = replace_each.substr(replace_each.indexOf("/") + 1);
                    $("[data-element="+ showElem +"]").fadeIn('slow');
                }
            }            
        }
                
    });
    
    //---------------------------------------- Function for changing state of radio boxes
    
    $( ".radio_block" ).click(function(){
        $(this).parents().eq(1).find('.radio_circle').removeClass('radio_active');
        $(this).find('.radio_circle').addClass('radio_active');
    });
    
    //------------------------ Function for triggering rightside tips on screens higher than 1300 px
    
    $('.form_action').on('click', function(e) {
                
        if ( WindowSize  > 1300 ) {
            $('.help_block').removeClass('display');
            $('.form_question').removeClass('form_question_dark');
            $(this).find('.help_block').addClass('display');
            $(this).find('.form_question').addClass('form_question_dark');
        }
    });
    
    //------------------------ Function for triggering checkboxes by clicking on checkbox rows
    
    $('.form_row').on('click', function(event) {
        
        var Target1   = !$(event.target).is('.form_input');
        
        if (Target1){
            $(this).find('.checkbox_quad').toggleClass('checkbox_active');
        }
    });
    
    //------------------------ Function for triggering rightside tips on screens smaller than 1300 px
    
    $('.form_question').click(function(){
        if ( WindowSize  < 1300 ) {
            $('.help_block').removeClass('display');
            $('.form_question').removeClass('form_question_dark');
            $(this).parents().eq(1).find('.help_block').addClass('display');
            $(this).addClass('form_question_dark');
        }
    });
    
    //-------------------- Function for little arrow below tips message on screens smaller than 1300 px
    
    $('.help_block_close').click(function(){
        $('.help_block').removeClass('display');
        $('.form_question').removeClass('form_question_dark');
    });
             
    //-------------------- Function for triggering Checkboxes on input focus
    
    
    $('.row_label input').click(function(){
        $(this).parents().eq(1).find('.checkbox_quad').addClass('checkbox_active');
    });
    
    //-------------------- Function for controlling page scroll on sidebar click
    
    $(".sidebar").on("click","a", function (event) {
        event.preventDefault();

        var id  = $(this).attr('href'),
        top = $(id).offset().top - 100;

        $('html, body').animate({
            scrollTop: top
        }, 500);
        
        $(".sidebar a").removeClass('blue_background');
        $('.sidebar_icon').removeClass('blue_background');
        if ( WindowSize  < 768 ) {
            $('.sidebar_text').removeClass('expanded');
            $(this).find('.sidebar_text').addClass('expanded');
        }
        $(this).addClass("blue_background");
        $(this).find('.sidebar_icon').addClass('blue_background');
        
    });
            
    //-------------------- Function for controlling sidebar while page scrolls

    $(document).on( "scroll", function(event) {

        var blockScroll = $(document).scrollTop();

        $('.sidebar a').each(function () {

            var link = $(this);
            var block = $(link.attr("href"));

            if (block.position().top - 300 <= blockScroll && block.position().top + block.height() > blockScroll) 
            {
                $('.sidebar a').removeClass("blue_background");
                $(".sidebar_icon").removeClass('blue_background');
                link.addClass("blue_background");
                link.find('.sidebar_icon').addClass('blue_background');
                if ( WindowSize  < 768 ) {
                    $('.sidebar_text').removeClass('expanded');
                    $(this).find('.sidebar_text').addClass('expanded');
                }
            }
            else
            {
                link.removeClass("blue_background");
                link.find('.sidebar_icon').removeClass('blue_background');
            }
        });
    });
    
    
    //-------------------- Vorversicherung & Schäden ----- Blue link cloning options on click
    
    $('.link').click(function(){
        $('.help_block').removeClass('help_block_active');
        $('.form_question').removeClass('form_question_dark');
        $('.remove').addClass('display');
        
        $(this).parents().eq(1).find('.form_action:nth-last-child(2)').prev('.form_action').addBack().clone(true).addClass('clone').insertBefore('.form_action_insert').find('.row_label code').addClass('link_value');
        
        var value = parseInt($(".link_value").html(), 10);
        var increased = value + 1;
        
        $('.link_value').last().html(increased);
        
        if ($('.clone').length == 4) {
            $('.link').fadeOut();
        }
    });
    
    //-------------------- Vorversicherung & Schäden ----- Removing Cloned Elements
    
    $('.remove').click(function(){
        $(this).parents().eq(3).find('.clone:nth-last-child(2)').prev('.clone').addBack().remove();
        if ($('.clone').length == 0) {
            $('.remove').removeClass('display');
        }
        $('.link').fadeIn();
    });
        
    $('.change').click(function(){
        $(this).hide();
        $(this).parents().eq(0).find('.status').hide();
        $(this).parents().eq(0).find('.address').hide();
        $(this).parents().eq(0).find('.input_block').fadeIn();
    });
    
    $('.change2').click(function(){
        $(this).parents().eq(0).find('.input_block').fadeIn();
    });
    
    //------------------------------------ This Function is responsible for input Search
        
    $return = [];

    function strInArray(str, strArray) {
        
        for (var j = 0; j < strArray.length; j++) {
            
            if (strArray[j].toLowerCase().match(str.toLowerCase())) {
                var $h = strArray[j];
                $return.push('<li class="Dresults">' + $h + '</li>');
            }
        }
    }

    function allArray(str, strArray) {
                
        for (var i = 0; i < strArray.length; i++) {
            var $h = strArray[i];
            $return.push('<li class="Dresults">' + $h + '</li>');
              
        }
    }


    function nextItem(kp) {

        if ($('.focus').length > 0) {
            var $next = $('.focus').next(),
                $prev = $('.focus').prev();
        }

        if (kp == 38) {

            if ($('.focus').is(':first-child')) {
                $prev = $('.Dresults:first-child');
            }

            $('.Dresults').removeClass('focus');
            $prev.addClass('focus');

        } else if (kp == 40) {

            if ($('.focus').is(':last-child')) {
                $next = $('.Dresults:last-child');
            }

            $('.Dresults').removeClass('focus');
            $next.addClass('focus');


        } else if (kp == 13) {
            var content = $('.focus').text();
            $('.focus').parents().eq(2).find('.form_input').val(content);
            $('.input_results, .input_results_norm').hide();
            $('.data_result').removeClass('shadow');
            $('.input_block, .input_block_100').removeClass('z_index');
        }
    }


    //----------------------------------------------------

    $('.form_input').keyup(function(e) {
        
        var parent = $(this).parent().eq(0).find('.input_results');
        var number = $(this).parent().eq(0).find('.numb');
        var result = $(this).parent().eq(0).find('.data_result');

        //----------------------------------------------------

        var mainparent = $(this).parent().eq(0).find('.sort_data li');

        var $searchArray = $(mainparent).map(function(value) {
            return $(this).text();
        }).sort();

        //----------------------------------------------------

        $key = e.keyCode;
        if ($key == 38 || $key == 40 || $key == 13) {
            nextItem($key);

            if (e.keyCode == 40) {
                                
                var numb = parseInt($(number).html()) + 44;
                $(result).scrollTop(numb);
                var numb = parseInt($(result).scrollTop());
                $(number).html(numb);
            }
            if (e.keyCode == 38) {
                var numb = parseInt($(number).html()) - 44;
                $(result).scrollTop(numb);
                var numb = parseInt($(result).scrollTop());
                $(number).html(numb);
            }

            return;
        }

        var $search = $(this).val();
        $return = [];

        strInArray($search, $searchArray);

        $(this).parent().eq(0).addClass('z_index');


        if ($search == '' || !$('input').val) {
            $('.Dresults').removeClass('focus');
            $(this).parent().eq(0).find('.Dresults:first-child').addClass('focus');
            
        } else {
            $(parent).html($return).show();
        }
        
        $('.Dresults').removeClass('focus');
        $(this).parent().eq(0).find('.Dresults:first-child').addClass('focus');

    });
    
    //-------------------- This Function is responsible for input Click events
    
    
    $('.form_input, .select_arrow' ).click(function(e) {
        
        $(this).val('');
        
        $('.input_results, .input_results_norm').hide();
        
        $(this).parent().eq(0).find('.input_results_norm').show();
        
        //----------------------------------------------------
        
        var mainparent  = $(this).parent().eq(0).find('.sort_data li');

        var $searchArray = $(mainparent).map(function(value) {
            return $(this).text();
        }).sort();
                
        $key = e.keyCode;
        if ($key == 38 || $key == 40 || $key == 13 ) {
            nextItem($key);
            return;
        }
        
        $return = [];
        allArray($searchArray, $searchArray);
        
        $('div').removeClass('z_index');
        $('.data_result').removeClass('shadow');
        $(this).parent().eq(0).addClass('z_index');
        $(this).parent().eq(0).find('.data_result').addClass('shadow');
        
        var parent  = $(this).parent().eq(0).find('.input_results');
        $(parent).html($return).show();
        
        $('.Dresults').removeClass('focus');
        $(this).parent().eq(0).find('.Dresults:first-child').addClass('focus');
        
    });
            
    //-------------------- This Function is responsible for results box below input fields
    
    $('.input_results').on("click", "li", function(){
        
        var content = $(this).text();
        $(this).parents().eq(2).find('input').val(content);
        $('.input_results').hide();
        $('.input_block, .input_block_100').removeClass('z_index');
        $('.numb').html(0);
                
    });
    
    //-------------------- This Function is responsible for arrows behaviour on click
    
    
    $('.data_result').on( "scroll", function() {
        var numb = parseInt($(this).scrollTop());
        var number = $(this).find('.numb');
        $(number).html(numb);
    });
    
    $('.input_results_norm').on("click", "li", function(){
        var content = $(this).text();
        $(this).parents().eq(2).find('input').val(content);
        
        
        //-------------------- Anzahl Kinder ----- cloning elements options
        
        
        var childNumber = $(this).data("kinderval");
        var child = $(this).parents().eq(3).find('.form_child');
        var childcount = $(this).parents().eq(3).find('.form_child').length;        
        
        while (childcount < childNumber) {
            
            var value = parseInt($(".child_value").last().html(), 10);
            var increase = value + 1;
            
            $(child).show().last().clone()
                    .appendTo($(this).parents().eq(3)).find(".child_value").html(increase);              
            childcount++;
            
        }
        
        while (childcount > childNumber && childNumber!=0) {
            
            var childRemove = childcount - childNumber;
            $(child).slice(-childRemove).remove();
            childcount--;
            
        }
        
        var value = parseInt($(".link_value").html(), 10);
        var increased = value + 1;
        
        $('.link_value').last().html(increased);
        
    });
        
    
});