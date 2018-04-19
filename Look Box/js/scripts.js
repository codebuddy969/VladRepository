$( document ).ready(function() {
            
    $('.examples_container').slick({
        slidesToScroll: 1,
        dots:true,
        arrows: false,
    });
    
    $('.slider_container').slick({
        slidesToScroll: 1,
        dots:false,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 2000,
    });
    
    $(function(){
        $(".masked_input").mask("7(999) 999-99-99");
    });
    
    $(document).ready(ImageWidth);
    $(window).resize(ImageWidth);
    
    function ImageWidth() {

        if ($(window).width() <= 576){
            $('.retina-img').attr("src","img/phone.png");
        }   
        else if ($(window).width() <= 992){
            $('.retina-img').attr("src","img/phone@2x.png");
        }
        else if ($(window).width() > 992){
            $('.retina-img').attr("src","img/phone@3x.png");
        }
    }
      
});