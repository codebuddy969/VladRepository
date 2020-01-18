/*
* Custom-select | v1.0
* by Vlad Secrier.
*/

$(document).ready(function(){
    $( ".mt-select" ).each(function() {
        $( this ).removeClass('mt-select').hide().parent().append('<div class="mt-select"></div>');

        var content_block = $( this ).parent().find(".mt-select");
        
        if($(this).data('placeholder')) {
            var btn_placeholder = $(this).data('placeholder');
        } else {
            var btn_placeholder = '';
        };

        content_block.append(
            '<div class="mt-select__btn">'+
                '<span>'+ btn_placeholder +'</span>'+
                '<div class="mt-select__arrow">'+
                    '<i class="mt-icon">&#xe813;</i>'+
                '</div>'+
            '</div>'
        );
        $( this ).removeClass('mt-select').clone(true).appendTo(content_block);

        var options = $( this ).parent().find('.mt-select option');
        var optgroup = $( this ).parent().find('.mt-select optgroup');
        var select = $( this ).parent().find('.mt-select select');

        options.each(function(){
            var content = $(this).text();
            $(this).replaceWith('<li class="mt-select__option">'+ content +'</li>')
        });

        optgroup.each(function(){
            var label = $(this).attr('label');
            var content = $(this).html();
            $(this).replaceWith(
                '<div class="mt-select__optgroup">' +
                    '<div class="mt-select__label">'+label+'</div>' +
                    '<ul class="mt-select__options">'+content+'</ul>' +
                '</div>'
            );
        });

        select.each(function(){
            var content = $(this).html();
            $(this).replaceWith('<div class="mt-select__content">'+content+'</div>');
        });
    });

    $('.mt-select__btn').on('click', function(){
        
        $(".mt-select__content").slideUp();
        $('.mt-select__arrow').removeClass('active');  

        var next_block = $(this).next('.mt-select__content');
        
        if(!next_block.is(':visible')) {
            $(this).next('.mt-select__content').slideDown();
            $(this).find('.mt-select__arrow').addClass('active');
        } else {
            $(this).next('.mt-select__content').slideUp();
            $(this).find('.mt-select__arrow').removeClass('active');
        }
    });

    $('.mt-select__option').on('click', function(){
        var content = $(this).text();
        $(this).closest('.mt-select').find('.mt-select__btn span').html(content);
        $(this).closest('.mt-select').parent().find('select').val(content);
    });
});

$(document).click(function(e) {
    if($('.mt-select__content').is(':visible')){
        if (!$(e.target).is('.mt-select__btn, .mt-select__btn > span')) {
            $(".mt-select__content").slideUp();
            $('.mt-select__arrow').removeClass('active');
        }  
    }
})